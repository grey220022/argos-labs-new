"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import { Color, type Points, type ShaderMaterial } from "three";

const HUES = {
  agents: "#7c85ff",
  cloud: "#26f2d5",
  growth: "#ff7d36",
  chain: "#b7ff54",
} as const;

const BG = "#252423";

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uAgents;
  uniform vec3 uCloud;
  uniform vec3 uGrowth;
  uniform vec3 uChain;
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    float fresnel = pow(1.0 - max(0.0, dot(vNormal, viewDir)), 2.6);

    vec3 dir = normalize(vWorldPos);
    float top    = pow(max(0.0, dir.y), 1.4);
    float right  = pow(max(0.0, dir.x), 1.4);
    float bottom = pow(max(0.0, -dir.y), 1.4);
    float left   = pow(max(0.0, -dir.x), 1.4);

    vec3 base = uAgents * top + uCloud * right + uGrowth * bottom + uChain * left;
    vec3 color = base * (0.35 + fresnel * 1.9);

    float pulse = 0.5 + 0.5 * sin(uTime * 0.6);
    color += fresnel * pulse * 0.45;

    float alpha = fresnel * 0.85 + 0.04;
    gl_FragColor = vec4(color, alpha);
  }
`;

function ArgosSphere() {
  const ref = useRef<ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAgents: { value: new Color(HUES.agents) },
      uCloud: { value: new Color(HUES.cloud) },
      uGrowth: { value: new Color(HUES.growth) },
      uChain: { value: new Color(HUES.chain) },
    }),
    []
  );

  useFrame((state) => {
    if (ref.current) ref.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh>
      <icosahedronGeometry args={[1.25, 12]} />
      <shaderMaterial
        ref={ref}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

const PARTICLE_COUNT = 3500;

function ArgosParticles() {
  const ref = useRef<Points>(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const ag = new Color(HUES.agents);
    const cl = new Color(HUES.cloud);
    const gr = new Color(HUES.growth);
    const ch = new Color(HUES.chain);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = 1.45 + Math.random() * 0.55;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      const ax = Math.abs(x);
      const ay = Math.abs(y);
      let hue;
      if (ay >= ax) hue = y >= 0 ? ag : gr;
      else hue = x >= 0 ? cl : ch;

      col[i * 3] = hue.r;
      col[i * 3 + 1] = hue.g;
      col[i * 3 + 2] = hue.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.045;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.025) * 0.12;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.014}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
    >
      <color attach="background" args={[BG]} />
      <ArgosSphere />
      <ArgosParticles />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.45}
        rotateSpeed={0.4}
        target={[0, 0, 0]}
      />
      <EffectComposer>
        <Bloom
          intensity={1.35}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.55}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
