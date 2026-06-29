"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3, Group, Quaternion } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Canvas, extend, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import countries from "@/data/globe.json";
declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: ThreeElements["mesh"] & {
      new (): ThreeGlobe;
    };
  }
}

extend({ ThreeGlobe: ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  cameraZ?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

let numbersOfRings = [0];

export function Globe({ globeConfig, data }: WorldProps) {
  const globeRef = useRef<ThreeGlobe | null>(null);
  const groupRef = useRef<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const defaultProps = {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#1d072e",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    ...globeConfig,
  };

  // Initialize globe only once
  useEffect(() => {
    if (!globeRef.current && groupRef.current) {
      globeRef.current = new ThreeGlobe();
      (groupRef.current as any).add(globeRef.current);
      setIsInitialized(true);
    }
  }, []);

  // Build material when globe is initialized or when relevant props change
  useEffect(() => {
    if (!globeRef.current || !isInitialized) return;

    const globeMaterial = globeRef.current.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
    };
    globeMaterial.color = new Color(globeConfig.globeColor);
    globeMaterial.emissive = new Color(globeConfig.emissive);
    globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
    globeMaterial.shininess = globeConfig.shininess || 0.9;
  }, [
    isInitialized,
    globeConfig.globeColor,
    globeConfig.emissive,
    globeConfig.emissiveIntensity,
    globeConfig.shininess,
  ]);

  // Build data when globe is initialized or when data changes
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;

    const arcs = data;
    let points = [];
    for (let i = 0; i < arcs.length; i++) {
      const arc = arcs[i];
      const rgb = hexToRgb(arc.color) as { r: number; g: number; b: number };
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.startLat,
        lng: arc.startLng,
      });
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.endLat,
        lng: arc.endLng,
      });
    }

    // remove duplicates for same lat and lng
    const filteredPoints = points.filter(
      (v, i, a) =>
        a.findIndex((v2) =>
          ["lat", "lng"].every(
            (k) => v2[k as "lat" | "lng"] === v[k as "lat" | "lng"],
          ),
        ) === i,
    );

    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(defaultProps.showAtmosphere)
      .atmosphereColor(defaultProps.atmosphereColor)
      .atmosphereAltitude(defaultProps.atmosphereAltitude)
      .hexPolygonColor(() => defaultProps.polygonColor);

    globeRef.current
      .arcsData(data)
      .arcStartLat((d) => (d as { startLat: number }).startLat * 1)
      .arcStartLng((d) => (d as { startLng: number }).startLng * 1)
      .arcEndLat((d) => (d as { endLat: number }).endLat * 1)
      .arcEndLng((d) => (d as { endLng: number }).endLng * 1)
      .arcColor((e: any) => (e as { color: string }).color)
      .arcAltitude((e) => (e as { arcAlt: number }).arcAlt * 1)
      .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
      .arcDashLength(defaultProps.arcLength)
      .arcDashInitialGap((e) => (e as { order: number }).order * 1)
      .arcDashGap(15)
      .arcDashAnimateTime(() => defaultProps.arcTime);

    globeRef.current
      .pointsData(filteredPoints)
      .pointColor((e) => (e as { color: string }).color)
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(0.4);

    globeRef.current
      .ringsData([])
      .ringColor(() => defaultProps.polygonColor)
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod(
        (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings,
      );
  }, [
    isInitialized,
    data,
    defaultProps.pointSize,
    defaultProps.showAtmosphere,
    defaultProps.atmosphereColor,
    defaultProps.atmosphereAltitude,
    defaultProps.polygonColor,
    defaultProps.arcLength,
    defaultProps.arcTime,
    defaultProps.rings,
    defaultProps.maxRings,
  ]);

  // Handle rings animation with cleanup
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;

    const interval = setInterval(() => {
      if (!globeRef.current) return;

      const newNumbersOfRings = genRandomNumbers(
        0,
        data.length,
        Math.floor((data.length * 4) / 5),
      );

      const ringsData = data
        .filter((d, i) => newNumbersOfRings.includes(i))
        .map((d) => ({
          lat: d.startLat,
          lng: d.startLng,
          color: d.color,
        }));

      globeRef.current.ringsData(ringsData);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [isInitialized, data]);

  return <group ref={groupRef} />;
}

export function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio);
    gl.setSize(size.width, size.height);
    gl.setClearColor(0xffaaff, 0);
  }, []);

  return null;
}

function latLngToVector3(lat: number, lng: number, radius: number): Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new Vector3(x, y, z);
}

const GLOBE_LABELS = [
  {
    text: "MENA",
    lat: 25.0,
    lng: 43.0,
  },
  {
    text: "ASIA",
    lat: 41.0,
    lng: 105.0,
  },
  {
    text: "APAC",
    lat: -25.0,
    lng: 133.0,
  },
];

interface GlobeLabelProps {
  text: string;
  lat: number;
  lng: number;
}

function GlobeLabel({ text, lat, lng }: GlobeLabelProps) {
  const [isVisible, setIsVisible] = useState(true);
  const { camera } = useThree();

  const surfacePos = useMemo(() => latLngToVector3(lat, lng, 101.5), [lat, lng]);
  const labelPos = useMemo(() => latLngToVector3(lat, lng, 108), [lat, lng]);

  const direction = useMemo(() => surfacePos.clone().normalize(), [surfacePos]);

  const { lineCenter, lineQuaternion } = useMemo(() => {
    const center = surfacePos.clone().lerp(labelPos, 0.5);
    const dir = labelPos.clone().sub(surfacePos).normalize();
    const quat = new Quaternion();
    quat.setFromUnitVectors(new Vector3(0, 1, 0), dir);
    return { lineCenter: center, lineQuaternion: quat };
  }, [surfacePos, labelPos]);

  useFrame(() => {
    const cameraDir = camera.position.clone().normalize();
    const dot = direction.dot(cameraDir);
    setIsVisible(dot > 0.15);
  });

  return (
    <group>
      {/* Small dark navy pin dot on the surface */}
      <mesh position={surfacePos}>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshBasicMaterial color="#0b2559" />
      </mesh>

      {/* Thin line pointing radially outwards */}
      <mesh position={lineCenter} quaternion={lineQuaternion}>
        <cylinderGeometry args={[0.08, 0.08, surfacePos.distanceTo(labelPos), 8]} />
        <meshBasicMaterial color="#0b2559" transparent opacity={0.6} />
      </mesh>

      {/* The HTML Label Badge */}
      <group position={labelPos}>
        <Html
          transform
          center
          sprite
          distanceFactor={180}
          style={{
            pointerEvents: isVisible ? "auto" : "none",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.2s ease-out",
          }}
        >
          <div className="bg-[#0f172a] text-white px-2.5 py-1 rounded-md text-[9px] font-extrabold tracking-wider font-sans shadow-lg select-none border border-[#1e293b] text-center whitespace-nowrap min-w-[55px] uppercase">
            {text}
          </div>
        </Html>
      </group>
    </group>
  );
}

export function World(props: WorldProps) {
  const { globeConfig } = props;
  const scene = new Scene();
  scene.fog = new Fog(0xffffff, 400, 2000);
  const currentCameraZ = globeConfig.cameraZ || cameraZ;
  return (
    <Canvas scene={scene} camera={new PerspectiveCamera(50, aspect, 0.1, 2000)}>
        <WebGLRendererConfig />
        <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
        <directionalLight
          color={globeConfig.directionalLeftLight}
          position={new Vector3(-400, 100, 400)}
        />
        <directionalLight
          color={globeConfig.directionalTopLight}
          position={new Vector3(-200, 500, 200)}
        />
        <pointLight
          color={globeConfig.pointLight}
          position={new Vector3(-200, 500, 200)}
          intensity={0.8}
        />
        <Globe {...props} />
        {GLOBE_LABELS.map((label, idx) => (
          <GlobeLabel key={idx} text={label.text} lat={label.lat} lng={label.lng} />
        ))}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minDistance={currentCameraZ}
          maxDistance={currentCameraZ}
          autoRotateSpeed={1}
          autoRotate={true}
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI - Math.PI / 3}
        />
      </Canvas>
  );
}

export function hexToRgb(hex: string) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function genRandomNumbers(min: number, max: number, count: number) {
  const arr = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }

  return arr;
}
