import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { NeuralCoreVertexShader, NeuralCoreFragmentShader } from './shaders/neuralCoreShader';
import { EnergyStreamVertexShader, EnergyStreamFragmentShader } from './shaders/energyStreamShader';

const Cinematic3DWorld = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- 1. Master Scene & Camera Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030508, 0.022);

    const width = window.innerWidth;
    const height = window.innerHeight;
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 16);

    // --- 2. WebGL Renderer with High-Performance Settings ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // --- 3. Dynamic Lighting Setup ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const goldPoint = new THREE.PointLight(0xebb87e, 5, 40);
    goldPoint.position.set(8, 6, 8);
    scene.add(goldPoint);

    const cyanPoint = new THREE.PointLight(0x00d2ff, 5, 40);
    cyanPoint.position.set(-8, -4, 8);
    scene.add(cyanPoint);

    const purplePoint = new THREE.PointLight(0x9b51e0, 4, 30);
    purplePoint.position.set(0, -8, -4);
    scene.add(purplePoint);

    // Cursor tracking spotlight
    const cursorLight = new THREE.PointLight(0xffffff, 2.5, 25);
    scene.add(cursorLight);

    // --- 4. World Space Nodes Group ---
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // 4A. GLSL Holographic Neural Core
    const coreGeometry = new THREE.IcosahedronGeometry(2.5, 32);
    const coreUniforms = {
      uTime: { value: 0 },
      uDistortion: { value: 0.38 },
      uMouse: { value: new THREE.Vector3(0, 0, 0) },
      uColorGold: { value: new THREE.Color(0xebb87e) },
      uColorCyan: { value: new THREE.Color(0x00d2ff) },
      uColorPurple: { value: new THREE.Color(0x9b51e0) },
    };

    const coreMaterial = new THREE.ShaderMaterial({
      vertexShader: NeuralCoreVertexShader,
      fragmentShader: NeuralCoreFragmentShader,
      uniforms: coreUniforms,
      transparent: true,
      depthWrite: true,
      wireframe: false,
    });

    const neuralCore = new THREE.Mesh(coreGeometry, coreMaterial);
    worldGroup.add(neuralCore);

    // Wireframe Cage overlay
    const cageGeometry = new THREE.IcosahedronGeometry(2.58, 2);
    const cageMaterial = new THREE.MeshBasicMaterial({
      color: 0xebb87e,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreCage = new THREE.Mesh(cageGeometry, cageMaterial);
    worldGroup.add(coreCage);

    // 4B. Dual Orbiting Gyroscope Energy Rings
    const ring1Geo = new THREE.TorusGeometry(3.8, 0.05, 16, 120);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xebb87e,
      metalness: 0.95,
      roughness: 0.1,
      emissive: 0xd97706,
      emissiveIntensity: 0.5,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    worldGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(4.8, 0.04, 16, 120);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x00d2ff,
      metalness: 0.9,
      roughness: 0.15,
      emissive: 0x0088cc,
      emissiveIntensity: 0.6,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    worldGroup.add(ring2);

    // 4C. 16 Floating Cyber Monoliths & Legal Crystalline Shards
    const monoliths = [];
    const shardGeometries = [
      new THREE.OctahedronGeometry(0.55, 0),
      new THREE.DodecahedronGeometry(0.65, 0),
      new THREE.TetrahedronGeometry(0.7, 0),
      new THREE.BoxGeometry(0.4, 1.2, 0.4),
    ];

    for (let i = 0; i < 16; i++) {
      const geo = shardGeometries[i % shardGeometries.length];
      const isGold = i % 2 === 0;
      const mat = new THREE.MeshStandardMaterial({
        color: isGold ? 0xebb87e : 0x00d2ff,
        metalness: 0.9,
        roughness: 0.15,
        emissive: isGold ? 0xd97706 : 0x0077aa,
        emissiveIntensity: 0.4,
        flatShading: true,
      });
      const mesh = new THREE.Mesh(geo, mat);

      const angle = (i / 16) * Math.PI * 2;
      const radius = 6.0 + (i % 4) * 2.2;
      const yOffset = (Math.random() - 0.5) * 8.0;

      mesh.position.set(
        Math.cos(angle) * radius,
        yOffset,
        Math.sin(angle) * radius
      );

      mesh.userData = {
        angle,
        radius,
        speed: 0.004 + (i % 3) * 0.003,
        rotSpeedX: (Math.random() - 0.5) * 0.03,
        rotSpeedY: (Math.random() - 0.5) * 0.03,
        baseY: yOffset,
        yFreq: 1 + Math.random() * 2,
      };

      worldGroup.add(mesh);
      monoliths.push(mesh);
    }

    // 4D. GLSL Energy Stream / Particle Vortex
    const streamCount = 1200;
    const streamGeo = new THREE.BufferGeometry();
    const streamPos = new Float32Array(streamCount * 3);
    const streamScales = new Float32Array(streamCount);
    const streamRandom = new Float32Array(streamCount * 3);

    for (let i = 0; i < streamCount; i++) {
      const idx = i * 3;
      const r = 2.5 + Math.random() * 22;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 30;

      streamPos[idx] = Math.cos(theta) * r;
      streamPos[idx + 1] = y;
      streamPos[idx + 2] = Math.sin(theta) * r;

      streamScales[i] = 0.5 + Math.random() * 1.5;
      streamRandom[idx] = (Math.random() - 0.5) * 2;
      streamRandom[idx + 1] = Math.random();
      streamRandom[idx + 2] = (Math.random() - 0.5) * 2;
    }

    streamGeo.setAttribute('position', new THREE.BufferAttribute(streamPos, 3));
    streamGeo.setAttribute('aScale', new THREE.BufferAttribute(streamScales, 1));
    streamGeo.setAttribute('aRandomness', new THREE.BufferAttribute(streamRandom, 3));

    const streamUniforms = {
      uTime: { value: 0 },
      uSpeed: { value: 0.8 },
    };

    const streamMaterial = new THREE.ShaderMaterial({
      vertexShader: EnergyStreamVertexShader,
      fragmentShader: EnergyStreamFragmentShader,
      uniforms: streamUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const energyStream = new THREE.Points(streamGeo, streamMaterial);
    worldGroup.add(energyStream);

    // 4E. Holographic Infinite Horizon Grid
    const gridHelper = new THREE.GridHelper(80, 50, 0x00d2ff, 0x1e293b);
    gridHelper.position.y = -8;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.22;
    worldGroup.add(gridHelper);

    // 4F. Interactive Expanding Shockwave Rings
    const shockwaves = [];
    const createShockwave = (x, y) => {
      const ringGeo = new THREE.RingGeometry(0.2, 0.35, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00d2ff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(x, y, 2);
      scene.add(ring);

      gsap.to(ring.scale, {
        x: 35,
        y: 35,
        duration: 1.6,
        ease: 'power2.out',
      });

      gsap.to(ringMat, {
        opacity: 0,
        duration: 1.6,
        ease: 'power2.out',
        onComplete: () => {
          scene.remove(ring);
          ringGeo.dispose();
          ringMat.dispose();
        },
      });
    };

    // --- 5. User Interaction & Camera Dolly Timeline ---
    let mouseTargetX = 0;
    let mouseTargetY = 0;

    const handleMouseMove = (e) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseTargetX = normX;
      mouseTargetY = normY;

      coreUniforms.uMouse.value.set(normX, -normY, 0);

      cursorLight.position.set(normX * 12, -normY * 8, 8);
    };

    const handleClick = (e) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 14;
      const normY = -(e.clientY / window.innerHeight - 0.5) * 10;
      createShockwave(normX, normY);

      // Pulse neural distortion on click
      gsap.to(coreUniforms.uDistortion, {
        value: 0.75,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      });
    };

    // Camera Dolly on Scroll
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
      const scrollProgress = window.scrollY / maxScroll;

      // Dynamic Camera Curved Path along 3D Space
      const targetZ = 16 - scrollProgress * 10; // Zoom through space
      const targetY = scrollProgress * 6;
      const targetRotX = scrollProgress * 0.35;
      const targetRotZ = scrollProgress * 0.2;

      gsap.to(camera.position, {
        z: targetZ,
        y: targetY,
        duration: 0.8,
        ease: 'power1.out',
        overwrite: 'auto',
      });

      gsap.to(worldGroup.rotation, {
        y: scrollProgress * Math.PI * 1.5,
        x: targetRotX,
        z: targetRotZ,
        duration: 1.0,
        ease: 'power1.out',
        overwrite: 'auto',
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle Resize
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // --- 6. Master Render Loop (Locked 60 FPS Engine) ---
    let animId;
    const clock = new THREE.Clock();

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const elapsed = clock.getElapsedTime();

      // Update shader uniforms
      coreUniforms.uTime.value = elapsed;
      streamUniforms.uTime.value = elapsed;

      // Mouse camera parallax damping
      camera.position.x += (mouseTargetX * 2.2 - camera.position.x) * 0.04;
      camera.position.y += (-mouseTargetY * 1.8 + (window.scrollY / (document.documentElement.scrollHeight || 1)) * 6 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Rotate Cages & Gyroscopes
      coreCage.rotation.y = elapsed * 0.2;
      coreCage.rotation.x = Math.sin(elapsed * 0.25) * 0.3;

      ring1.rotation.z = elapsed * 0.4;
      ring1.rotation.y = elapsed * 0.18;
      ring2.rotation.x = -elapsed * 0.3;
      ring2.rotation.z = elapsed * 0.12;

      // Update Floating Monoliths
      monoliths.forEach((m) => {
        m.userData.angle += m.userData.speed;
        m.position.x = Math.cos(m.userData.angle) * m.userData.radius;
        m.position.z = Math.sin(m.userData.angle) * m.userData.radius;
        m.position.y = m.userData.baseY + Math.sin(elapsed * m.userData.yFreq) * 0.8;

        m.rotation.x += m.userData.rotSpeedX;
        m.rotation.y += m.userData.rotSpeedY;
      });

      // Horizon grid wave
      gridHelper.position.z = (elapsed * 3) % 2;

      renderer.render(scene, camera);
    };

    renderLoop();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      cageGeometry.dispose();
      cageMaterial.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      streamGeo.dispose();
      streamMaterial.dispose();
      gridHelper.geometry.dispose();
      gridHelper.material.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      style={{ minHeight: '100vh' }}
    />
  );
};

export default Cinematic3DWorld;
