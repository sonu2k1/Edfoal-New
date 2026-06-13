"use client";

import React, { useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import FloatingTriangles from "./FloatingTriangles";

// ─────────────────────────────────────────────────────────────────────────────
// Brain Mesh Generators — high-res deformed spheres
// ─────────────────────────────────────────────────────────────────────────────

function createCerebrumHalf(isLeft: boolean): THREE.Mesh {
  const geo = new THREE.SphereGeometry(1, 64, 48);
  const pos = geo.attributes.position;
  const xOff = isLeft ? -0.16 : 0.16;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const len = Math.sqrt(x * x + y * y + z * z) || 1;
    let sx = x / len, sy = y / len, sz = z / len;
    let r = 1.0;
    if (sz < 0 && sy < 0) r -= Math.abs(sz) * Math.abs(sy) * 0.42;
    if (sz > 0.1 && sy < 0.1 && sy > -0.4)
      r -= Math.sin(sz * Math.PI) * (0.1 - sy) * 0.18;
    sx *= 0.75 + 0.25 * Math.abs(sx);
    r += Math.sin(sx * 14) * Math.cos(sy * 14) * Math.sin(sz * 14) * 0.055;
    r += Math.sin(sx * 28) * Math.cos(sy * 28) * Math.sin(sz * 28) * 0.020;
    r += Math.sin(sx * 7) * Math.cos(sy * 7) * Math.sin(sz * 7) * 0.030;
    pos.setXYZ(i, xOff + sx * 0.56 * r, 0.15 + sy * 0.50 * r, -0.05 + sz * 0.78 * r);
  }
  geo.computeVertexNormals();
  return new THREE.Mesh(geo, new THREE.MeshBasicMaterial());
}

function createCerebellumHalf(isLeft: boolean): THREE.Mesh {
  const geo = new THREE.SphereGeometry(1, 32, 24);
  const pos = geo.attributes.position;
  const xOff = isLeft ? -0.15 : 0.15;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const len = Math.sqrt(x * x + y * y + z * z) || 1;
    const sx = x / len, sy = y / len, sz = z / len;
    const folds = Math.sin(sy * 38) * 0.045 + Math.cos(sz * 24) * 0.015 + Math.sin(sx * 50) * 0.02;
    const r = 1.0 + folds;
    pos.setXYZ(i, xOff + sx * 0.22 * r, -0.32 + sy * 0.15 * r, -0.38 + sz * 0.22 * r);
  }
  geo.computeVertexNormals();
  return new THREE.Mesh(geo, new THREE.MeshBasicMaterial());
}

function createBrainstem(): THREE.Mesh {
  const geo = new THREE.CylinderGeometry(0.07, 0.055, 0.55, 16, 12, true);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const ny = y - 0.525;
    pos.setXYZ(i, x + Math.sin(ny * 10) * 0.012, ny, z - 0.12 + Math.cos(ny * 10) * 0.012);
  }
  geo.computeVertexNormals();
  return new THREE.Mesh(geo, new THREE.MeshBasicMaterial());
}

// ─────────────────────────────────────────────────────────────────────────────
// Wireframe Triangle Shader — barycentric edge detection, rim brightness
// ─────────────────────────────────────────────────────────────────────────────

const brainShaderMaterial = new THREE.ShaderMaterial({
  uniforms: { uTime: { value: 0 } },
  vertexShader: `
    uniform float uTime;
    attribute vec3 aInstancePos;
    attribute vec3 aColor;
    attribute vec3 aNormal;
    attribute float aSeed;
    attribute float aSpeed;
    attribute vec3 aBarycentric;

    varying vec3 vBarycentric;
    varying vec3 vColor;
    varying float vAlpha;
    varying float vSeed;
    varying vec3 vViewDir;
    varying vec3 vSurfaceNormal;
    varying float vFacing;

    mat3 rotationMatrix(vec3 axis, float angle) {
      axis = normalize(axis);
      float s = sin(angle); float c = cos(angle); float oc = 1.0 - c;
      return mat3(
        oc*axis.x*axis.x+c,       oc*axis.x*axis.y-axis.z*s, oc*axis.z*axis.x+axis.y*s,
        oc*axis.x*axis.y+axis.z*s, oc*axis.y*axis.y+c,       oc*axis.y*axis.z-axis.x*s,
        oc*axis.z*axis.x-axis.y*s, oc*axis.y*axis.z+axis.x*s, oc*axis.z*axis.z+c
      );
    }

    void main() {
      vBarycentric = aBarycentric;
      vColor = aColor;
      vSeed = aSeed;
      vAlpha = 0.50 + aSeed * 0.50;

      // Align triangle to brain surface normal
      vec3 N = normalize(aNormal);
      vec3 T;
      if (abs(N.y) > 0.99) T = normalize(cross(N, vec3(0.0, 0.0, 1.0)));
      else T = normalize(cross(N, vec3(0.0, 1.0, 0.0)));
      vec3 B = normalize(cross(N, T));
      mat3 alignMat = mat3(T, N, B);

      // Very slow spin around surface normal
      float spinAngle = uTime * (0.1 + aSeed * 0.2) * aSpeed + aSeed * 6.28;
      mat3 spinMat = rotationMatrix(vec3(0.0, 1.0, 0.0), spinAngle);

      // Facing factor relative to local view direction (rotated Y)
      float facing = abs(-N.x * 0.9757 + N.z * 0.2190);
      float sizeFactor = 1.0 + 0.5 * pow(1.0 - facing, 2.0);

      // Scale variation (1.5px - 4px on screen)
      float scale = (0.5 + aSeed * 0.7) * sizeFactor;
      vec3 localPos = alignMat * (spinMat * (position * scale));

      // Gentle breathing
      float breath = 1.0 + 0.015 * sin(uTime * 0.6 + aSeed * 6.28);
      vec3 wPos = aInstancePos * breath + localPos;

      // Tiny noise
      float t = uTime * 0.12;
      wPos.x += sin(t + aInstancePos.z * 1.5 + aSeed * 5.0) * 0.010;
      wPos.y += cos(t * 0.7 + aInstancePos.x * 1.5 + aSeed * 12.0) * 0.008;
      wPos.z += sin(t + aInstancePos.y * 1.5 + aSeed * 22.0) * 0.010;

      vec4 modelPos = modelMatrix * vec4(wPos, 1.0);
      vec4 viewPos = viewMatrix * modelPos;
      gl_Position = projectionMatrix * viewPos;

      vViewDir = cameraPosition - modelPos.xyz;
      vSurfaceNormal = normalize(normalMatrix * N);
      vFacing = facing;
    }
  `,
  fragmentShader: `
    uniform float uTime;

    varying vec3 vBarycentric;
    varying vec3 vColor;
    varying float vAlpha;
    varying float vSeed;
    varying vec3 vViewDir;
    varying vec3 vSurfaceNormal;
    varying float vFacing;

    void main() {
      // Wireframe edge detection
      float edgeFactor = min(min(vBarycentric.x, vBarycentric.y), vBarycentric.z);
      float delta = fwidth(edgeFactor);
      float edge = 1.0 - smoothstep(0.0, delta * 1.0, edgeFactor);
      if (edge < 0.1) discard;

      // Silhouette contour brighter (rim enhancement)
      float rim = pow(1.0 - vFacing, 2.0);
      float edgeBright = 0.60 + 0.90 * rim;

      // Subtle shimmer
      float shimmer = 0.88 + 0.12 * sin(uTime * 1.5 + vSeed * 80.0);

      // Tiny random flicker
      float flicker = 1.0 - step(0.97, fract(sin(vSeed * 12345.6789 + uTime * 0.3) * 43758.5453)) * 0.4;

      vec3 finalColor = vColor * edgeBright * shimmer * flicker;

      gl_FragColor = vec4(finalColor * 0.95, vAlpha * edge * 0.75);
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
  brainX: number;
  brainY: number;
  brainZ: number;
  brainScale: number;
  rotYOffset: number;
  cameraZ: number;
  cameraX: number;
  cameraY: number;
  lookAtX: number;
}

interface ParticleBrainProps {
  animState: React.MutableRefObject<AnimStateProps>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Brain Particles — InstancedBufferGeometry + MeshSurfaceSampler
// ─────────────────────────────────────────────────────────────────────────────

function BrainParticles({ animState }: ParticleBrainProps) {
  const groupRef = useRef<THREE.Group>(null);
  const count = 11500;

  const { positions, colors, normals, seeds, speeds } = useMemo(() => {
    const posArr = new Float32Array(count * 3);
    const colArr = new Float32Array(count * 3);
    const normArr = new Float32Array(count * 3);
    const seedArr = new Float32Array(count);
    const speedArr = new Float32Array(count);

    const cWhite  = new THREE.Color("#ffffff");
    const cAmber  = new THREE.Color("#ffb829");
    const cPurple = new THREE.Color("#8052ff");
    const cCyan   = new THREE.Color("#00d4ff");

    const cerebrumLeft = createCerebrumHalf(true);
    const cerebrumRight = createCerebrumHalf(false);
    const cerebellumLeft = createCerebellumHalf(true);
    const cerebellumRight = createCerebellumHalf(false);
    const stem = createBrainstem();

    const regions: { mesh: THREE.Mesh; samples: number; type: string }[] = [
      { mesh: cerebrumLeft,    samples: 4200, type: "cerebrum" },
      { mesh: cerebrumRight,   samples: 4200, type: "cerebrum" },
      { mesh: cerebellumLeft,  samples: 1150, type: "cerebellum" },
      { mesh: cerebellumRight, samples: 1150, type: "cerebellum" },
      { mesh: stem,            samples: 800,  type: "stem" },
    ];

    const _p = new THREE.Vector3();
    const _n = new THREE.Vector3();
    let idx = 0;

    // Spatial grid for spacing check
    const minDistance = 0.014;
    const grid = new Map<string, THREE.Vector3>();

    const getGridKey = (x: number, y: number, z: number): string => {
      const gx = Math.floor(x / minDistance);
      const gy = Math.floor(y / minDistance);
      const gz = Math.floor(z / minDistance);
      return `${gx},${gy},${gz}`;
    };

    const checkOverlap = (p: THREE.Vector3): boolean => {
      const gx = Math.floor(p.x / minDistance);
      const gy = Math.floor(p.y / minDistance);
      const gz = Math.floor(p.z / minDistance);

      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          for (let dz = -1; dz <= 1; dz++) {
            const key = `${gx + dx},${gy + dy},${gz + dz}`;
            const other = grid.get(key);
            if (other && p.distanceTo(other) < minDistance) {
              return true;
            }
          }
        }
      }
      return false;
    };

    for (const { mesh, samples, type } of regions) {
      const sampler = new MeshSurfaceSampler(mesh).build();
      for (let s = 0; s < samples; s++) {
        let accepted = false;
        let tries = 0;

        while (!accepted && tries < 150) {
          sampler.sample(_p, _n);
          tries++;

          // Dynamic silhouette weight based on side-view angle
          const facing = Math.abs(-_n.x * Math.sin(1.35) + _n.z * Math.cos(1.35));
          const isSilhouette = facing < 0.28;
          
          let weight = 0.08; // Base density for inner regions

          if (type === "cerebrum") {
            const xOff = mesh === cerebrumLeft ? -0.16 : 0.16;
            const sx = (_p.x - xOff) / 0.56;
            const sy = (_p.y - 0.15) / 0.50;
            const sz = (_p.z + 0.05) / 0.78;
            const len = Math.sqrt(sx * sx + sy * sy + sz * sz) || 1;
            const nsx = sx / len;
            const nsy = sy / len;
            const nsz = sz / len;
            const noise = Math.sin(nsx * 14) * Math.cos(nsy * 14) * Math.sin(nsz * 14) * 0.055 +
                          Math.sin(nsx * 28) * Math.cos(nsy * 28) * Math.sin(nsz * 28) * 0.020 +
                          Math.sin(nsx * 7) * Math.cos(nsy * 7) * Math.sin(nsz * 7) * 0.030;
            
            const isFold = noise < -0.01;
            weight = isSilhouette ? Math.pow(1.0 - facing, 1.2) : (isFold ? 0.32 : 0.08);
          } else if (type === "cerebellum") {
            const xOff = mesh === cerebellumLeft ? -0.15 : 0.15;
            const sx = (_p.x - xOff) / 0.22;
            const sy = (_p.y + 0.32) / 0.15;
            const sz = (_p.z + 0.38) / 0.22;
            const len = Math.sqrt(sx * sx + sy * sy + sz * sz) || 1;
            const nsx = sx / len;
            const nsy = sy / len;
            const nsz = sz / len;
            const noise = Math.sin(nsy * 38) * 0.045 + Math.cos(nsz * 24) * 0.015 + Math.sin(nsx * 50) * 0.02;

            const isFold = noise < -0.01;
            weight = isSilhouette ? Math.pow(1.0 - facing, 1.2) : (isFold ? 0.32 : 0.08);
          } else {
            // Brainstem
            weight = isSilhouette ? Math.pow(1.0 - facing, 1.2) : 0.15;
          }

          if (Math.random() < weight) {
            let tooClose = checkOverlap(_p);
            if (tooClose && tries > 80) {
              tooClose = false; // Relax constraint
            }
            if (!tooClose) {
              accepted = true;
              grid.set(getGridKey(_p.x, _p.y, _p.z), _p.clone());
            }
          }
        }

        posArr[idx * 3]     = _p.x;
        posArr[idx * 3 + 1] = _p.y;
        posArr[idx * 3 + 2] = _p.z;
        normArr[idx * 3]     = _n.x;
        normArr[idx * 3 + 1] = _n.y;
        normArr[idx * 3 + 2] = _n.z;

        const rv = Math.random();
        // 40% White, 35% Amber, 15% Purple, 10% Cyan
        const c = rv < 0.40 ? cWhite : rv < 0.75 ? cAmber : rv < 0.90 ? cPurple : cCyan;
        colArr[idx * 3]     = c.r;
        colArr[idx * 3 + 1] = c.g;
        colArr[idx * 3 + 2] = c.b;

        seedArr[idx] = Math.random();
        speedArr[idx] = 0.4 + Math.random() * 0.8;
        idx++;
      }
      mesh.geometry.dispose();
    }

    return { positions: posArr, colors: colArr, normals: normArr, seeds: seedArr, speeds: speedArr };
  }, []);

  // Build InstancedBufferGeometry — flat triangle with per-instance attributes
  const instancedGeometry = useMemo(() => {
    const s = 0.005;
    const verts = new Float32Array([
       0,          0, -s * 1.15,
      -s * 0.866,  0,  s * 0.577,
       s * 0.866,  0,  s * 0.577,
    ]);
    const norms = new Float32Array([0, 1, 0, 0, 1, 0, 0, 1, 0]);
    const bary  = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);

    const geom = new THREE.InstancedBufferGeometry();
    geom.setAttribute("position",    new THREE.BufferAttribute(verts, 3));
    geom.setAttribute("normal",      new THREE.BufferAttribute(norms, 3));
    geom.setAttribute("aBarycentric", new THREE.BufferAttribute(bary, 3));
    geom.setIndex(new THREE.BufferAttribute(new Uint16Array([0, 1, 2]), 1));

    geom.setAttribute("aInstancePos", new THREE.InstancedBufferAttribute(positions, 3));
    geom.setAttribute("aColor",       new THREE.InstancedBufferAttribute(colors, 3));
    geom.setAttribute("aNormal",      new THREE.InstancedBufferAttribute(normals, 3));
    geom.setAttribute("aSeed",        new THREE.InstancedBufferAttribute(seeds, 1));
    geom.setAttribute("aSpeed",       new THREE.InstancedBufferAttribute(speeds, 1));

    geom.instanceCount = count;
    return geom;
  }, [positions, colors, normals, seeds, speeds]);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const current = animState.current;

    brainShaderMaterial.uniforms.uTime.value = elapsed;

    if (groupRef.current) {
      const cam = state.camera as THREE.PerspectiveCamera;
      const h3d = 2 * Math.tan((cam.fov * Math.PI) / 360) * cam.position.z;
      const w3d = h3d * state.viewport.aspect;

      const scH = (0.60 * h3d) / 1.45;
      const scW = (0.45 * w3d) / 1.44;
      const base = Math.min(scH, scW);
      const finalScale = base * current.brainScale;

      const tX = current.brainX * w3d;
      const tY = current.brainY + Math.sin(elapsed * 0.3) * 0.025;

      groupRef.current.position.set(tX, tY, current.brainZ);
      groupRef.current.scale.setScalar(finalScale);

      // Very slow rotation + mouse parallax
      const rotY = 1.35 + current.rotYOffset + elapsed * 0.03 + state.pointer.x * 0.15;
      const rotX = 0.12 + Math.sin(elapsed * 0.04) * 0.03 - state.pointer.y * 0.12;
      const rotZ = -0.04 + Math.sin(elapsed * 0.05) * 0.02;

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

function ParticleBrainInner({ animState }: ParticleBrainProps) {
  return (
    <div className="w-full h-full relative overflow-visible select-none pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 3.6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", overflow: "visible", width: "100%", height: "100%" }}
      >
        <FloatingTriangles />
        <BrainParticles animState={animState} />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.3}
            luminanceSmoothing={0.9}
            height={200}
            intensity={0.5}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

export default dynamic(() => Promise.resolve(ParticleBrainInner), {
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
