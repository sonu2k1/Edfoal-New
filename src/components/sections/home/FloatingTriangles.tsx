"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function FloatingTriangles() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 120;

  // Define color palette matching Edfoal design (Purple, Gold, White, Cyan)
  const colors = useMemo(() => [
    new THREE.Color("#e91e63"), // Purple
    new THREE.Color("#2196F3"), // Gold
    new THREE.Color("#64B5F6"), // White
    new THREE.Color("#06b6d4"), // Cyan
  ], []);

  // Generate initial particle data
  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        // Spread particles across depth
        x: (Math.random() - 0.5) * 12,
        y: (Math.random() - 0.5) * 8,
        z: -2.0 - Math.random() * 8.0, // Z between -2 and -10 for parallax
        scale: 0.3 + Math.random() * 0.8,
        vx: (Math.random() - 0.5) * 0.005,
        vy: 0.002 + Math.random() * 0.006, // Drift upwards slowly
        rotX: Math.random() * Math.PI,
        rotY: Math.random() * Math.PI,
        rotZ: Math.random() * Math.PI,
        spinX: (Math.random() - 0.5) * 0.008,
        spinY: (Math.random() - 0.5) * 0.008,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.05 + Math.random() * 0.2, // very faint, premium background elements
      });
    }
    return data;
  }, [colors]);

  // Temporary variable to perform matrix operations
  const tempMatrix = useMemo(() => new THREE.Matrix4(), []);
  const tempPosition = useMemo(() => new THREE.Vector3(), []);
  const tempRotation = useMemo(() => new THREE.Euler(), []);
  const tempQuaternion = useMemo(() => new THREE.Quaternion(), []);
  const tempScale = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    // 1. Drifting coordinates and matrix update
    particles.forEach((p, i) => {
      // Apply speed drift
      p.y += p.vy;
      p.x += p.vx;
      p.rotX += p.spinX;
      p.rotY += p.spinY;

      // Wrap-around boundary check
      if (p.y > 5.5) {
        p.y = -5.5;
        p.x = (Math.random() - 0.5) * 12;
      }
      if (p.x < -6.5 || p.x > 6.5) {
        p.vx = -p.vx;
      }

      // Configure local transformation matrices
      tempPosition.set(p.x, p.y, p.z);
      tempRotation.set(p.rotX, p.rotY, p.rotZ);
      tempQuaternion.setFromEuler(tempRotation);
      tempScale.set(p.scale, p.scale, p.scale);

      tempMatrix.compose(tempPosition, tempQuaternion, tempScale);
      mesh.setMatrixAt(i, tempMatrix);
      mesh.setColorAt(i, p.color);
    });

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    // 2. Mouse parallax effect (shift coordinates slightly based on pointer position)
    if (groupRef.current) {
      const targetX = state.pointer.x * 0.4;
      const targetY = state.pointer.y * 0.3;
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[null as any, null as any, count]}>
        {/* 3-sided cone geometry = a wireframe pyramid */}
        <coneGeometry args={[0.12, 0.3, 3]} />
        <meshBasicMaterial 
          wireframe
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>
    </group>
  );
}
