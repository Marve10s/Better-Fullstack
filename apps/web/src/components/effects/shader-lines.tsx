import { ShaderCanvas } from "./shader-canvas";

const FRAGMENT = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= u_resolution.x / u_resolution.y;

  float t = u_time * 0.18;

  float lines = 0.0;
  float wash = 0.0;

  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    float angle = 0.62 + fi * 0.07 + sin(t + fi) * 0.03;
    vec2 dir = vec2(cos(angle), sin(angle));
    float d = dot(p, dir);
    float frequency = 6.0 + fi * 1.4;
    float speed = 0.6 + fi * 0.12;
    float v = abs(sin(d * frequency + t * speed + fi * 0.7));
    float thickness = 0.018 + fi * 0.004;
    lines += smoothstep(thickness, 0.0, v) * (0.7 - fi * 0.1);
    wash += (1.0 - v) * 0.04;
  }

  vec3 lime = vec3(0.74, 0.95, 0.39);
  vec3 cyan = vec3(0.40, 0.80, 0.95);
  float mixK = 0.5 + 0.5 * sin(t * 0.4);
  vec3 tint = mix(lime, cyan, mixK);

  vec3 color = tint * lines + tint * wash * 0.35;

  float vig = smoothstep(1.4, 0.5, length(p * vec2(0.85, 1.0)));
  color *= vig;

  float alpha = clamp(lines * 1.1 + wash * 0.5, 0.0, 1.0);
  gl_FragColor = vec4(color, alpha);
}
`;

export function ShaderLines({ className, paused }: { className?: string; paused?: boolean }) {
  return <ShaderCanvas fragmentShader={FRAGMENT} className={className} paused={paused} />;
}
