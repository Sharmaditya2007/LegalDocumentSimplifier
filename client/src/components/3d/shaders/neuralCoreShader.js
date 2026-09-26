/**
 * Custom GLSL Shader for 2035 Holographic Neural Core
 * Features:
 * - 3D Simplex noise vertex displacement for organic pulsating energy
 * - Iridescent Fresnel edge glow transitioning across Gold (#EBB87E), Cyber Cyan (#00D2FF), and Deep Violet (#9B51E0)
 * - Holographic scanline and chromatic pulse uniforms
 */

export const NeuralCoreVertexShader = `
  uniform float uTime;
  uniform float uDistortion;
  uniform vec3 uMouse;
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying float vNoise;

  // Classic 3D Perlin Noise Implementation in GLSL
  vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;

    // Organic multi-harmonic noise displacement
    float noise = snoise(position * 0.85 + vec3(uTime * 0.35));
    float highFreqNoise = snoise(position * 2.2 - vec3(uTime * 0.6)) * 0.35;
    float totalNoise = noise + highFreqNoise;
    vNoise = totalNoise;

    // Displace vertex along surface normal
    vec3 newPosition = position + normal * (totalNoise * uDistortion);

    // Subtle cursor magnetic displacement
    float mouseDist = distance(newPosition.xy, uMouse.xy * 3.0);
    if (mouseDist < 4.0) {
      newPosition += normal * (sin((4.0 - mouseDist) * 3.1415) * 0.25);
    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

export const NeuralCoreFragmentShader = `
  uniform float uTime;
  uniform vec3 uColorGold;
  uniform vec3 uColorCyan;
  uniform vec3 uColorPurple;
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying float vNoise;

  void main() {
    // Calculate View Direction and Fresnel Refraction Rim
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = dot(viewDir, vNormal);
    fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
    fresnel = pow(fresnel, 2.5);

    // Color gradient modulation based on noise and fresnel
    vec3 baseColor = mix(uColorPurple, uColorCyan, vNoise * 0.5 + 0.5);
    vec3 finalColor = mix(baseColor, uColorGold, fresnel * 1.2);

    // Holographic Scanlines
    float scanline = sin(vPosition.y * 35.0 - uTime * 6.0) * 0.5 + 0.5;
    finalColor += vec3(scanline * 0.15 * uColorCyan);

    // Core internal glow
    float coreGlow = smoothstep(0.2, 0.8, vNoise) * 0.35;
    finalColor += uColorGold * coreGlow;

    // Specular highlight burst
    float specular = pow(max(dot(reflect(-viewDir, vNormal), vec3(0.0, 1.0, 1.0)), 0.0), 32.0);
    finalColor += vec3(specular * 0.6);

    gl_FragColor = vec4(finalColor, 0.88);
  }
`;
