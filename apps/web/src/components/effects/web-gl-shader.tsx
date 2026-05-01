import { ShaderCanvas } from "./shader-canvas";

const FRAGMENT = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;

void main() {
  float xScale = 1.0;
  float yScale = 0.5;
  float distortion = 0.05;

  vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);

  float d = length(p) * distortion;

  float rx = p.x * (1.0 + d);
  float gx = p.x;
  float bx = p.x * (1.0 - d);

  float t = u_time * 0.6;

  float r = 0.05 / abs(p.y + sin((rx + t) * xScale) * yScale);
  float g = 0.05 / abs(p.y + sin((gx + t) * xScale) * yScale);
  float b = 0.05 / abs(p.y + sin((bx + t) * xScale) * yScale);

  gl_FragColor = vec4(r, g, b, 1.0);
}
`;

export function WebGLShader({ className, paused }: { className?: string; paused?: boolean }) {
  return <ShaderCanvas fragmentShader={FRAGMENT} className={className} paused={paused} />;
}
