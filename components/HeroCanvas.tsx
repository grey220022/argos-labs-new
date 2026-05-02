"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, OrbitControls } from "@react-three/drei";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useMemo, useRef } from "react";
import {
  Color,
  Vector2,
  type Group,
  type Points,
  type ShaderMaterial,
} from "three";

const HUES = {
  agents: "#7c85ff",
  cloud: "#26f2d5",
  growth: "#ff7d36",
  chain: "#b7ff54",
} as const;

const BG = "#252423";

const INNER_LIGHTS = [
  { hue: HUES.agents, pos: [0, 0.85, 0] },
  { hue: HUES.cloud, pos: [0.85, 0, 0] },
  { hue: HUES.growth, pos: [0, -0.85, 0] },
  { hue: HUES.chain, pos: [-0.85, 0, 0] },
] as const;

function GlassSphere() {
  return (
    <mesh>
      <icosahedronGeometry args={[1.4, 14]} />
      <MeshTransmissionMaterial
        transmission={1}
        thickness={0.6}
        roughness={0.05}
        chromaticAberration={0.45}
        anisotropy={0.3}
        distortion={0.18}
        distortionScale={0.4}
        temporalDistortion={0.08}
        ior={1.4}
        backside
        samples={6}
        resolution={512}
      />
    </mesh>
  );
}

function InnerLights() {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.18;
      ref.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.09) * 0.3;
    }
  });

  return (
    <group ref={ref}>
      {INNER_LIGHTS.map(({ hue, pos }, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshBasicMaterial color={hue} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

const PARTICLE_COUNT = 6000;

const PILLAR_AXES = [
  { axis: "y" as const, sign: 1, hue: HUES.agents }, // top
  { axis: "x" as const, sign: 1, hue: HUES.cloud }, // right
  { axis: "y" as const, sign: -1, hue: HUES.growth }, // bottom
  { axis: "x" as const, sign: -1, hue: HUES.chain }, // left
];

// Ashima Arts simplex noise (public domain, well-known reference impl)
const noiseChunk = /* glsl */ `
  vec4 mod289(vec4 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 mod289v3(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289v3(i);
    vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 xx = x_ * ns.x + ns.yyyy;
    vec4 yy = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(xx) - abs(yy);
    vec4 b0 = vec4(xx.xy, yy.xy);
    vec4 b1 = vec4(xx.zw, yy.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  vec3 snoiseVec3(vec3 x){
    return vec3(
      snoise(x),
      snoise(x + vec3(31.416, -47.853, 12.679)),
      snoise(x - vec3(8.124, 15.927, -23.561))
    );
  }

  vec3 curlNoise(vec3 p){
    const float e = 0.1;
    vec3 px = snoiseVec3(p + vec3(e, 0.0, 0.0)) - snoiseVec3(p - vec3(e, 0.0, 0.0));
    vec3 py = snoiseVec3(p + vec3(0.0, e, 0.0)) - snoiseVec3(p - vec3(0.0, e, 0.0));
    vec3 pz = snoiseVec3(p + vec3(0.0, 0.0, e)) - snoiseVec3(p - vec3(0.0, 0.0, e));
    return vec3(py.z - pz.y, pz.x - px.z, px.y - py.x) / (2.0 * e);
  }
`;

const particleVertexShader = /* glsl */ `
  attribute float aSeed;
  attribute vec3 aColor;
  uniform float uTime;
  varying vec3 vColor;
  varying float vAlpha;

  ${noiseChunk}

  void main(){
    float cycle = 6.0;
    float t = mod(uTime + aSeed * cycle, cycle);

    vec3 flow = curlNoise(position * 0.45 + vec3(0.0, uTime * 0.04, 0.0));
    vec3 pos = position + flow * t * 0.42;

    vAlpha = smoothstep(0.0, 0.6, t) * (1.0 - smoothstep(4.5, cycle, t));
    vColor = aColor;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = 3.5 * (300.0 / -mv.z);
  }
`;

const particleFragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main(){
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float falloff = 1.0 - smoothstep(0.0, 0.5, d);
    gl_FragColor = vec4(vColor * 1.3, falloff * vAlpha * 0.75);
  }
`;

function CurlParticles() {
  const matRef = useRef<ShaderMaterial>(null);
  const pointsRef = useRef<Points>(null);

  const { positions, seeds, colors } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const seedArr = new Float32Array(PARTICLE_COUNT);
    const colArr = new Float32Array(PARTICLE_COUNT * 3);

    const HUE_COLORS = PILLAR_AXES.map((p) => new Color(p.hue));

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const pillarIdx = i % 4;
      const pillar = PILLAR_AXES[pillarIdx];

      // Random origin clustered along the pillar axis, with small perpendicular spread
      const angle = Math.random() * Math.PI * 2;
      const spread = Math.random() * 0.4;
      const along = 1.7 + Math.random() * 0.6;

      let ox: number, oy: number, oz: number;
      if (pillar.axis === "y") {
        ox = Math.cos(angle) * spread;
        oy = pillar.sign * along;
        oz = Math.sin(angle) * spread;
      } else {
        ox = pillar.sign * along;
        oy = Math.cos(angle) * spread;
        oz = Math.sin(angle) * spread;
      }

      pos[i * 3] = ox;
      pos[i * 3 + 1] = oy;
      pos[i * 3 + 2] = oz;
      seedArr[i] = Math.random();

      const c = HUE_COLORS[pillarIdx];
      colArr[i * 3] = c.r;
      colArr[i * 3 + 1] = c.g;
      colArr[i * 3 + 2] = c.b;
    }
    return { positions: pos, seeds: seedArr, colors: colArr };
  }, []);

  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aSeed"
          count={PARTICLE_COUNT}
          array={seeds}
          itemSize={1}
          args={[seeds, 1]}
        />
        <bufferAttribute
          attach="attributes-aColor"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 42 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
    >
      <color attach="background" args={[BG]} />
      <ambientLight intensity={0.25} />
      <InnerLights />
      <GlassSphere />
      <CurlParticles />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.35}
        rotateSpeed={0.4}
        target={[0, 0, 0]}
      />
      <EffectComposer>
        <Bloom
          intensity={1.25}
          luminanceThreshold={0.25}
          luminanceSmoothing={0.6}
          mipmapBlur
        />
        <ChromaticAberration
          offset={new Vector2(0.0008, 0.0008)}
          radialModulation={false}
          modulationOffset={0}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    </Canvas>
  );
}
