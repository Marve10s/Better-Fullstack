import { ShaderCanvas } from "./shader-canvas";

const FRAGMENT = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = uv;
  p.x *= u_resolution.x / u_resolution.y;

  float t = u_time * 0.12;

  vec2 q = vec2(fbm(p + t), fbm(p - t * 0.5));
  vec2 r = vec2(
    fbm(p + 2.0 * q + vec2(t * 0.3, t * 0.7)),
    fbm(p + 2.0 * q + vec2(-t * 0.4, t * 0.2))
  );
  float n = fbm(p * 1.4 + r);

  vec3 dark = vec3(0.04, 0.02, 0.06);
  vec3 mid = vec3(0.45, 0.18, 0.55);
  vec3 hot = vec3(0.95, 0.62, 0.32);

  vec3 color = mix(dark, mid, n);
  color = mix(color, hot, smoothstep(0.55, 0.85, n) * 0.8);

  float alpha = smoothstep(0.0, 0.55, n);

  float bottom = smoothstep(0.0, 0.6, uv.y);
  alpha *= bottom;

  gl_FragColor = vec4(color, alpha);
}
`;

export function SpookySmoke({ className, paused }: { className?: string; paused?: boolean }) {
  return <ShaderCanvas fragmentShader={FRAGMENT} className={className} paused={paused} />;
}
