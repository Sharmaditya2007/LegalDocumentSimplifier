/**
 * GLSL Shaders for 2035 Quantum Energy Streams & Warp Particles
 */

export const EnergyStreamVertexShader = `
  uniform float uTime;
  uniform float uSpeed;
  attribute float aScale;
  attribute vec3 aRandomness;
  
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 pos = position;

    // Spiral vortex wave
    float angle = pos.y * 0.2 + uTime * uSpeed;
    pos.x += cos(angle) * aRandomness.x * 1.5;
    pos.z += sin(angle) * aRandomness.z * 1.5;

    // Pulse scale
    float pulse = sin(uTime * 3.0 + aRandomness.y * 10.0) * 0.5 + 0.5;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Perspective point attenuation
    gl_PointSize = (aScale * 35.0 * (0.8 + 0.4 * pulse)) / -mvPosition.z;

    // Assign color based on position height
    float heightFactor = smoothstep(-15.0, 15.0, pos.y);
    vec3 cGold = vec3(0.92, 0.72, 0.49);
    vec3 cCyan = vec3(0.0, 0.82, 1.0);
    vColor = mix(cGold, cCyan, heightFactor);
    vAlpha = smoothstep(35.0, 5.0, -mvPosition.z) * 0.85;
  }
`;

export const EnergyStreamFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Soft circular particle with falloff
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    float intensity = pow(1.0 - (dist * 2.0), 2.2);
    gl_FragColor = vec4(vColor, intensity * vAlpha);
  }
`;
