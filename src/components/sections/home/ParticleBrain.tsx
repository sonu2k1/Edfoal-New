"use client";

import React, { useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useInView } from "framer-motion";
import FloatingTriangles from "./FloatingTriangles";

// ─────────────────────────────────────────────────────────────────────────────
// Barycentric area-weighted mesh sampler for loading GLTF model
// ─────────────────────────────────────────────────────────────────────────────

interface TriangleInfo {
  v0: THREE.Vector3; v1: THREE.Vector3; v2: THREE.Vector3;
  n0: THREE.Vector3; n1: THREE.Vector3; n2: THREE.Vector3;
  area: number;
}

function getTrianglesFromGeometry(geom: THREE.BufferGeometry): {
  triangles: TriangleInfo[];
  totalArea: number;
} {
  const positionAttribute = geom.getAttribute("position");
  const normalAttribute = geom.getAttribute("normal");
  const indexAttribute = geom.getIndex();

  const triangles: TriangleInfo[] = [];
  let totalArea = 0;

  if (!positionAttribute) return { triangles, totalArea };

  const positions = positionAttribute.array;
  const normals = normalAttribute ? normalAttribute.array : null;

  if (indexAttribute) {
    const indices = indexAttribute.array;
    for (let i = 0; i < indices.length; i += 3) {
      const idx0 = indices[i];
      const idx1 = indices[i+1];
      const idx2 = indices[i+2];

      const v0 = new THREE.Vector3(positions[idx0*3], positions[idx0*3+1], positions[idx0*3+2]);
      const v1 = new THREE.Vector3(positions[idx1*3], positions[idx1*3+1], positions[idx1*3+2]);
      const v2 = new THREE.Vector3(positions[idx2*3], positions[idx2*3+1], positions[idx2*3+2]);

      const n0 = normals ? new THREE.Vector3(normals[idx0*3], normals[idx0*3+1], normals[idx0*3+2]) : new THREE.Vector3(0, 1, 0);
      const n1 = normals ? new THREE.Vector3(normals[idx1*3], normals[idx1*3+1], normals[idx1*3+2]) : new THREE.Vector3(0, 1, 0);
      const n2 = normals ? new THREE.Vector3(normals[idx2*3], normals[idx2*3+1], normals[idx2*3+2]) : new THREE.Vector3(0, 1, 0);

      const edge1 = new THREE.Vector3().subVectors(v1, v0);
      const edge2 = new THREE.Vector3().subVectors(v2, v0);
      const cross = new THREE.Vector3().crossVectors(edge1, edge2);
      const area = 0.5 * cross.length();

      triangles.push({ v0, v1, v2, n0, n1, n2, area });
      totalArea += area;
    }
  } else {
    for (let i = 0; i < positionAttribute.count; i += 3) {
      const idx0 = i;
      const idx1 = i + 1;
      const idx2 = i + 2;

      const v0 = new THREE.Vector3(positions[idx0*3], positions[idx0*3+1], positions[idx0*3+2]);
      const v1 = new THREE.Vector3(positions[idx1*3], positions[idx1*3+1], positions[idx1*3+2]);
      const v2 = new THREE.Vector3(positions[idx2*3], positions[idx2*3+1], positions[idx2*3+2]);

      const n0 = normals ? new THREE.Vector3(normals[idx0*3], normals[idx0*3+1], normals[idx0*3+2]) : new THREE.Vector3(0, 1, 0);
      const n1 = normals ? new THREE.Vector3(normals[idx1*3], normals[idx1*3+1], normals[idx1*3+2]) : new THREE.Vector3(0, 1, 0);
      const n2 = normals ? new THREE.Vector3(normals[idx2*3], normals[idx2*3+1], normals[idx2*3+2]) : new THREE.Vector3(0, 1, 0);

      const edge1 = new THREE.Vector3().subVectors(v1, v0);
      const edge2 = new THREE.Vector3().subVectors(v2, v0);
      const cross = new THREE.Vector3().crossVectors(edge1, edge2);
      const area = 0.5 * cross.length();

      triangles.push({ v0, v1, v2, n0, n1, n2, area });
      totalArea += area;
    }
  }

  return { triangles, totalArea };
}

// ─────────────────────────────────────────────────────────────────────────────
// Shader
// ─────────────────────────────────────────────────────────────────────────────

const brainShaderMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector3(0, 0, 0) },
    uMouseActive: { value: 0 },
    uDistortionStrength: { value: 0.15 },
    uDistortionRadius: { value: 0.35 },
    uJitterStrength: { value: 0.03 },
    uJitterSpeed: { value: 4.0 },
  },
  vertexShader: `
    uniform float uTime;
    uniform vec3 uMouse;
    uniform float uMouseActive;
    uniform float uDistortionStrength;
    uniform float uDistortionRadius;
    uniform float uJitterStrength;
    uniform float uJitterSpeed;

    attribute vec3 aInstancePos;
    attribute vec3 aColor;
    attribute vec3 aNormal;
    attribute float aSeed;
    attribute float aSpeed;
    attribute float aDepth;
    attribute vec3 aBarycentric;

    varying vec3 vBarycentric;
    varying vec3 vColor;
    varying float vAlpha;
    varying float vSeed;
    varying float vDepth;
    varying vec3 vSurfaceNormal;

    mat3 rotationMatrix(vec3 axis, float angle) {
      axis = normalize(axis);
      float s = sin(angle); float c = cos(angle); float oc = 1.0 - c;
      return mat3(
        oc*axis.x*axis.x+c,        oc*axis.x*axis.y-axis.z*s, oc*axis.z*axis.x+axis.y*s,
        oc*axis.x*axis.y+axis.z*s, oc*axis.y*axis.y+c,        oc*axis.y*axis.z-axis.x*s,
        oc*axis.z*axis.x-axis.y*s, oc*axis.y*axis.z+axis.x*s, oc*axis.z*axis.z+c
      );
    }

    void main() {
      vBarycentric = aBarycentric;
      vColor  = aColor;
      vSeed   = aSeed;
      vDepth  = aDepth;

      // Surface particles fully opaque, interior slightly transparent
      vAlpha  = 0.65 + aDepth * 0.35;

      vec3 N = normalize(aNormal);
      vec3 T = abs(N.y) > 0.99
        ? normalize(cross(N, vec3(0,0,1)))
        : normalize(cross(N, vec3(0,1,0)));
      vec3 B = normalize(cross(N, T));
      mat3 alignMat = mat3(T, N, B);

      float spinAngle = uTime * (0.10 + aSeed * 0.15) * aSpeed + aSeed * 6.28318;
      mat3  spinMat   = rotationMatrix(vec3(0,1,0), spinAngle);

      float facing    = abs(-N.x * 0.9757 + N.z * 0.2190);
      float sizeFactor = (0.8 + aDepth * 0.4) * (1.0 + 0.35 * pow(1.0 - facing, 2.0));
      float scale      = (0.38 + aSeed * 0.28) * sizeFactor;

      vec3 localPos = alignMat * (spinMat * (position * scale));

      float breath = 1.0 + 0.009 * sin(uTime * 0.5 + aSeed * 6.28318);
      vec3 wPos = aInstancePos * breath + localPos;

      float t = uTime * 0.08;
      wPos.x += sin(t + aInstancePos.z*1.1 + aSeed*5.0) * 0.005;
      wPos.y += cos(t*0.7 + aInstancePos.x*1.1 + aSeed*11.0) * 0.004;
      wPos.z += sin(t + aInstancePos.y*1.1 + aSeed*21.0) * 0.005;

      // --- MOUSE HOVER DISTORTION MECHANICS ---
      vec3 toMouse = wPos - uMouse;
      float dist = length(toMouse);
      
      float sigma = max(0.01, uDistortionRadius * 0.5);
      float falloff = exp(-(dist * dist) / (2.0 * sigma * sigma));
      float influence = falloff * uMouseActive;

      if (influence > 0.0005) {
        // Swirl distortion (rotate around local Z axis centered at uMouse)
        float swirlAngle = uDistortionStrength * 0.8 * influence;
        float cosS = cos(swirlAngle);
        float sinS = sin(swirlAngle);
        vec2 dXY = wPos.xy - uMouse.xy;
        vec2 rXY = vec2(
          cosS * dXY.x - sinS * dXY.y,
          sinS * dXY.x + cosS * dXY.y
        );
        wPos.xy = uMouse.xy + rXY;

        // Subtle 3D repel away from mouse
        vec3 repelDir = normalize(toMouse + vec3(0.0001));
        wPos += repelDir * (uDistortionStrength * 0.15) * influence;

        // Jitter distortion
        if (uJitterStrength > 0.0) {
          float k = aSeed * 43758.5453;
          float tJit = uTime * uJitterSpeed;
          wPos.x += sin(tJit + k) * uJitterStrength * influence;
          wPos.y += cos(tJit + k * 1.13) * uJitterStrength * influence;
        }
      }

      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(wPos, 1.0);
      vSurfaceNormal = normalize(normalMatrix * N);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    varying vec3  vBarycentric;
    varying vec3  vColor;
    varying float vAlpha;
    varying float vSeed;
    varying float vDepth;
    varying vec3  vSurfaceNormal;

    void main() {
      // Crisp triangle outlines
      float ef    = min(min(vBarycentric.x, vBarycentric.y), vBarycentric.z);
      float delta = fwidth(ef);
      float lw    = 1.6 + vSeed * 1.2;
      float edge  = 1.0 - smoothstep(0.0, delta * lw, ef);
      if (edge < 0.12) discard;

      // Dynamic view-space facing factor (1.0 = points at camera, 0.0 = sideways silhouette edge)
      float facing    = abs(normalize(vSurfaceNormal).z);
      
      // Rim glow strictly confined to silhouette edges (higher power = sharper border)
      float rim       = pow(1.0 - facing, 4.5);
      float edgeBright = 0.55 + 1.55 * rim;

      // Subtle shimmer
      float shimmer = 0.88 + 0.12 * sin(uTime * 2.0 + vSeed * 75.0);
      float flicker = 1.0 - step(0.988, fract(sin(vSeed*12345.6789 + uTime*0.3)*43758.5453)) * 0.28;

      // Interior particles slightly dimmer to create depth
      float depthDim = 0.55 + vDepth * 0.45;

      vec3  baseColor = vColor * edgeBright * shimmer * flicker * depthDim;
      
      // Blend base color with a brilliant golden yellow outline on the silhouette edge
      vec3 gold = vec3(0.129, 0.588, 0.953); // #2196F3
      vec3 finalColor = mix(baseColor * 1.5, gold * edgeBright * 1.6, rim * 0.85);

      float a   = vAlpha * edge * 0.85;
      gl_FragColor = vec4(finalColor, a);
    }
  `,
  transparent: true,
  depthWrite: false,
  depthTest: true,
  side: THREE.DoubleSide,
  blending: THREE.AdditiveBlending,
});

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface AnimStateProps {
  brainX: number; brainY: number; brainZ: number;
  brainScale: number; rotYOffset: number;
  cameraZ: number; cameraX: number; cameraY: number;
  lookAtX: number;
}

interface ParticleBrainProps {
  animState?: React.MutableRefObject<AnimStateProps>;
}

const defaultAnim: AnimStateProps = {
  brainX: 0.22, brainY: 0.0, brainZ: 0.0,
  brainScale: 1.0, rotYOffset: 0.0,
  cameraZ: 3.6, cameraX: 0.0, cameraY: 0.0, lookAtX: 0.0,
};

// ─────────────────────────────────────────────────────────────────────────────
// Brain Particles — volumetric SDF sampling
// ─────────────────────────────────────────────────────────────────────────────

function BrainParticles({ animState }: ParticleBrainProps) {
  const groupRef = useRef<THREE.Group>(null);
  const COUNT    = 12000;

  const mouseRef = useRef({ x: 0, y: 0, active: 0 });
  const smoothMouseRef = useRef({ x: 0, y: 0, active: 0 });

  React.useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.active = 1;
    };
    const handlePointerLeave = () => {
      mouseRef.current.active = 0;
    };
    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  const { scene } = useGLTF("/brain.glb");

  const { positions, colors, normals, seeds, speeds, depths } = useMemo(() => {
    const posArr   = new Float32Array(COUNT * 3);
    const colArr   = new Float32Array(COUNT * 3);
    const normArr  = new Float32Array(COUNT * 3);
    const seedArr  = new Float32Array(COUNT);
    const speedArr = new Float32Array(COUNT);
    const depthArr = new Float32Array(COUNT);

    let brainMesh: THREE.Mesh | null = null;
    scene.traverse((node) => {
      if ((node as any).isMesh && !brainMesh) {
        brainMesh = node as THREE.Mesh;
      }
    });

    if (!brainMesh) {
      return {
        positions: posArr, colors: colArr, normals: normArr,
        seeds: seedArr, speeds: speedArr, depths: depthArr,
      };
    }

    scene.updateMatrixWorld(true);
    const geom = (brainMesh as THREE.Mesh).geometry.clone();
    geom.applyMatrix4((brainMesh as THREE.Mesh).matrixWorld);
    geom.center();
    geom.computeBoundingBox();
    let bbox = geom.boundingBox!;
    const size = new THREE.Vector3();
    bbox.getSize(size);
    const maxDim = Math.max(size.x, Math.max(size.y, size.z));
    geom.scale(1.2 / maxDim, 1.2 / maxDim, 1.2 / maxDim);
    geom.computeBoundingBox();
    bbox = geom.boundingBox!;

    const { triangles, totalArea } = getTrianglesFromGeometry(geom);

    const cumulativeAreas = new Float32Array(triangles.length);
    let sum = 0;
    for (let i = 0; i < triangles.length; i++) {
      sum += triangles[i].area;
      cumulativeAreas[i] = sum;
    }

    const sampleTriangleIndex = (target: number): number => {
      let low = 0;
      let high = cumulativeAreas.length - 1;
      while (low < high) {
        const mid = (low + high) >> 1;
        if (cumulativeAreas[mid] < target) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }
      return low;
    };

    const cWhite  = new THREE.Color("#64B5F6");
    const cAmber  = new THREE.Color("#2196F3");
    const cPurple = new THREE.Color("#e91e63");
    const cCyan   = new THREE.Color("#00d4ff");
    const rng = () => Math.random();

    for (let i = 0; i < COUNT; i++) {
      const r = rng() * totalArea;
      const triIdx = sampleTriangleIndex(r);
      const tri = triangles[triIdx];

      let r1 = rng();
      let r2 = rng();
      if (r1 + r2 > 1.0) {
        r1 = 1.0 - r1;
        r2 = 1.0 - r2;
      }
      const r0 = 1.0 - r1 - r2;

      const pos = new THREE.Vector3()
        .addScaledVector(tri.v0, r0)
        .addScaledVector(tri.v1, r1)
        .addScaledVector(tri.v2, r2);

      const norm = new THREE.Vector3()
        .addScaledVector(tri.n0, r0)
        .addScaledVector(tri.n1, r1)
        .addScaledVector(tri.n2, r2)
        .normalize();

      const isSurface = rng() < 0.70;
      const depth = isSurface ? 1.0 : Math.max(0, 1.0 - rng() * 0.5);

      const pt = pos.clone();
      if (!isSurface) {
        pt.addScaledVector(norm, -rng() * 0.12);
      }

      let w = 0.35, a = 0.0, pu = 0.40, cy = 0.25;

      const relativeY = (pt.y - bbox.min.y) / (bbox.max.y - bbox.min.y);
      const relativeZ = (pt.z - bbox.min.z) / (bbox.max.z - bbox.min.z);

      if (relativeY < 0.30 && relativeZ < 0.45) {
        a = 0.80; w = 0.10; pu = 0.05; cy = 0.05;
      } else if (relativeZ < 0.35) {
        pu = 0.70; w = 0.15; a = 0.0; cy = 0.15;
      } else if (relativeZ > 0.65 && relativeY > 0.40) {
        w = 0.50; cy = 0.40; a = 0.0; pu = 0.10;
      }

      const t = w + a + pu + cy;
      const rv = rng();
      let c = cCyan;
      if (rv < w / t) c = cWhite;
      else if (rv < (w + a) / t) c = cAmber;
      else if (rv < (w + a + pu) / t) c = cPurple;

      posArr[i * 3] = pt.x;
      posArr[i * 3 + 1] = pt.y;
      posArr[i * 3 + 2] = pt.z;

      normArr[i * 3] = norm.x;
      normArr[i * 3 + 1] = norm.y;
      normArr[i * 3 + 2] = norm.z;

      colArr[i * 3] = c.r;
      colArr[i * 3 + 1] = c.g;
      colArr[i * 3 + 2] = c.b;

      seedArr[i] = rng();
      speedArr[i] = 0.35 + rng() * 0.9;
      depthArr[i] = depth;
    }

    return {
      positions: posArr, colors: colArr, normals: normArr,
      seeds: seedArr, speeds: speedArr, depths: depthArr,
    };
  }, [scene]);

  const instancedGeometry = useMemo(() => {
    // Triangle size matching reference image
    const s = 0.0125;
    const verts = new Float32Array([
       0,        0, -s * 1.15,
      -s*0.866,  0,  s * 0.577,
       s*0.866,  0,  s * 0.577,
    ]);
    const norms = new Float32Array([0,1,0, 0,1,0, 0,1,0]);
    const bary  = new Float32Array([1,0,0, 0,1,0, 0,0,1]);

    const geom = new THREE.InstancedBufferGeometry();
    geom.setAttribute("position",     new THREE.BufferAttribute(verts, 3));
    geom.setAttribute("normal",       new THREE.BufferAttribute(norms, 3));
    geom.setAttribute("aBarycentric", new THREE.BufferAttribute(bary,  3));
    geom.setIndex(new THREE.BufferAttribute(new Uint16Array([0,1,2]), 1));

    geom.setAttribute("aInstancePos", new THREE.InstancedBufferAttribute(positions, 3));
    geom.setAttribute("aColor",       new THREE.InstancedBufferAttribute(colors,    3));
    geom.setAttribute("aNormal",      new THREE.InstancedBufferAttribute(normals,   3));
    geom.setAttribute("aSeed",        new THREE.InstancedBufferAttribute(seeds,     1));
    geom.setAttribute("aSpeed",       new THREE.InstancedBufferAttribute(speeds,    1));
    geom.setAttribute("aDepth",       new THREE.InstancedBufferAttribute(depths,    1));
    geom.instanceCount = COUNT;
    return geom;
  }, [positions, colors, normals, seeds, speeds, depths]);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const current = animState ? animState.current : defaultAnim;
    brainShaderMaterial.uniforms.uTime.value = elapsed;

    // Smooth pointer variables (lerp)
    const followSpeed = 0.08;
    const currentMouse = mouseRef.current;
    smoothMouseRef.current.x += (currentMouse.x - smoothMouseRef.current.x) * followSpeed;
    smoothMouseRef.current.y += (currentMouse.y - smoothMouseRef.current.y) * followSpeed;

    const fadeSpeed = 0.05;
    smoothMouseRef.current.active += (currentMouse.active - smoothMouseRef.current.active) * fadeSpeed;

    if (groupRef.current) {
      const cam = state.camera as THREE.PerspectiveCamera;
      const h3d = 2 * Math.tan((cam.fov * Math.PI) / 360) * cam.position.z;
      const w3d = h3d * state.viewport.aspect;

      // Scale so brain fills ~50% of screen width (matching reference)
      const scH = (0.95 * h3d) / 1.45;
      const scW = (0.75 * w3d) / 1.44;
      const finalScale = Math.min(scH, scW) * current.brainScale;

      const tX = current.brainX * w3d;
      const tY = current.brainY + Math.sin(elapsed * 0.3) * 0.022;

      groupRef.current.position.set(tX, tY, current.brainZ);
      groupRef.current.scale.setScalar(finalScale);

      // Unproject mouse coordinates to find intersection with brain plane
      const mouse3D = new THREE.Vector3(smoothMouseRef.current.x, smoothMouseRef.current.y, 0);
      mouse3D.unproject(cam);
      const dir = mouse3D.clone().sub(cam.position).normalize();
      
      const groupWorldPos = new THREE.Vector3();
      groupRef.current.getWorldPosition(groupWorldPos);
      
      const distToPlane = dir.z !== 0 ? (groupWorldPos.z - cam.position.z) / dir.z : 0;
      const worldMouse = cam.position.clone().add(dir.multiplyScalar(distToPlane));
      
      const localMouse = worldMouse.clone();
      groupRef.current.worldToLocal(localMouse);
      
      brainShaderMaterial.uniforms.uMouse.value.copy(localMouse);
      brainShaderMaterial.uniforms.uMouseActive.value = smoothMouseRef.current.active;

      // Rotations driven by mouse position and automatic animation
      const rotY = 1.35 + current.rotYOffset + Math.sin(elapsed * 0.08) * 0.22 + smoothMouseRef.current.x * 0.14;
      const rotX = 0.10 + Math.sin(elapsed * 0.04) * 0.03 - smoothMouseRef.current.y * 0.10;
      const rotZ = -0.03 + Math.sin(elapsed * 0.05) * 0.018;

      groupRef.current.rotation.y += (rotY - groupRef.current.rotation.y) * 0.04;
      groupRef.current.rotation.x += (rotX - groupRef.current.rotation.x) * 0.04;
      groupRef.current.rotation.z += (rotZ - groupRef.current.rotation.z) * 0.04;
    }

    state.camera.position.set(0, 0, 3.6);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={groupRef}>
      <mesh frustumCulled={false}>
        <primitive object={instancedGeometry} attach="geometry" />
        <primitive object={brainShaderMaterial} attach="material" />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Canvas Wrapper
// ─────────────────────────────────────────────────────────────────────────────

function CanvasBrainInner({ animState }: ParticleBrainProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "200px" });

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-visible select-none pointer-events-none">
      <Canvas
        frameloop={isInView ? "always" : "never"}
        camera={{ position: [0, 0, 3.6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", overflow: "visible", width: "100%", height: "100%" }}
      >
        <FloatingTriangles />
        <BrainParticles animState={animState} />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.08}
            luminanceSmoothing={0.75}
            height={300}
            intensity={0.7}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

export default dynamic(() => Promise.resolve(CanvasBrainInner), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-purple-400 text-xs font-semibold tracking-widest uppercase">
          Initializing 3D Engine...
        </span>
      </div>
    </div>
  ),
});

useGLTF.preload("/brain.glb");
