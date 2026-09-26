import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const LuxuryCrystalHero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- 1. Scene Setup ---
    const scene = new THREE.Scene();

    const width = container.clientWidth;
    const height = container.clientHeight || 580;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, 10);

    // --- 2. High-Fidelity WebGL Renderer ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // --- 3. Soft Studio Lighting (Luxury Product Photography) ---
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.4);
    scene.add(ambientLight);

    // Warm Studio Key Light
    const keyLight = new THREE.DirectionalLight(0xfff5ea, 3.5);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    // Cool Rim Light
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 4.0);
    rimLight.position.set(-6, -4, -4);
    scene.add(rimLight);

    // Top Soft Fill
    const topLight = new THREE.PointLight(0xe0e7ff, 2.5, 20);
    topLight.position.set(0, 6, 2);
    scene.add(topLight);

    // Dynamic Mouse Specular Follower
    const mouseLight = new THREE.PointLight(0xffffff, 2.0, 15);
    mouseLight.position.set(0, 0, 5);
    scene.add(mouseLight);

    // --- 4. Luxury Glass Crystal Sculpture ---
    const crystalGroup = new THREE.Group();
    scene.add(crystalGroup);

    // Outer Translucent Glass Crystal (Beveled Icosahedron / Octahedron Prism)
    const outerGeo = new THREE.IcosahedronGeometry(2.3, 0); // Faceted crystal sculpture
    
    // Apple Vision Pro Optical Glass Material
    const outerMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.02,
      metalness: 0.05,
      transmission: 0.94,
      ior: 1.54,
      thickness: 2.4,
      specularIntensity: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      reflectivity: 0.9,
      attenuationColor: new THREE.Color(0xa5b4fc),
      attenuationDistance: 4.0,
      transparent: true,
      opacity: 0.95,
      flatShading: true, // Diamond-cut crisp facets
    });
    const outerCrystal = new THREE.Mesh(outerGeo, outerMat);
    crystalGroup.add(outerCrystal);

    // Ultra-fine Chamfered Crystal Wireframe (Pure Luxury Gold/Silver edge sheen)
    const edgeGeo = new THREE.EdgesGeometry(outerGeo);
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
    });
    const crystalEdges = new THREE.LineSegments(edgeGeo, edgeMat);
    crystalGroup.add(crystalEdges);

    // --- 5. Inner Animated AI Energy Core ---
    // Smooth inner luminous plasma core
    const innerGeo = new THREE.SphereGeometry(1.05, 32, 32);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0x6366f1,
      emissive: 0x3b82f6,
      emissiveIntensity: 1.8,
      roughness: 0.2,
      metalness: 0.1,
      transmission: 0.6,
      transparent: true,
      opacity: 0.85,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    crystalGroup.add(innerCore);

    // Inner Luminous Core Light
    const corePointLight = new THREE.PointLight(0x818cf8, 3.5, 8);
    crystalGroup.add(corePointLight);

    // Inner orbiting subtle iridescent ring
    const ringGeo = new THREE.TorusGeometry(1.4, 0.02, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xe0e7ff,
      transparent: true,
      opacity: 0.6,
    });
    const innerRing = new THREE.Mesh(ringGeo, ringMat);
    innerRing.rotation.x = Math.PI / 3;
    crystalGroup.add(innerRing);

    // --- 6. Minimal Ambient Stardust (Only 40 gentle particles, zero clutter) ---
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const radius = 3.5 + Math.random() * 6.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[idx] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[idx + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[idx + 2] = radius * Math.cos(phi);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xe0e7ff,
      size: 0.05,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- 7. Smooth Mouse Parallax Tracking ---
    let targetMouseX = 0;
    let targetMouseY = 0;
    let windowHalfX = width / 2;
    let windowHalfY = height / 2;

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - windowHalfX;
      const y = e.clientY - rect.top - windowHalfY;
      targetMouseX = x / windowHalfX;
      targetMouseY = y / windowHalfY;

      mouseLight.position.x = targetMouseX * 5;
      mouseLight.position.y = -targetMouseY * 4;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 580;
      windowHalfX = newW / 2;
      windowHalfY = newH / 2;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', onResize);

    // --- 8. Animation Engine (Smooth Luxury Motion) ---
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Camera inertia damping
      camera.position.x += (targetMouseX * 1.2 - camera.position.x) * 0.04;
      camera.position.y += (-targetMouseY * 0.9 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Slow, majestic crystal rotation
      outerCrystal.rotation.y = elapsed * 0.15;
      outerCrystal.rotation.x = Math.sin(elapsed * 0.12) * 0.2;
      crystalEdges.rotation.y = outerCrystal.rotation.y;
      crystalEdges.rotation.x = outerCrystal.rotation.x;

      // Inner Core Pulse & Counter-Rotation
      innerCore.rotation.y = -elapsed * 0.25;
      innerCore.rotation.z = elapsed * 0.18;
      const pulse = 1.0 + Math.sin(elapsed * 1.5) * 0.06;
      innerCore.scale.set(pulse, pulse, pulse);

      // Ring Orbit
      innerRing.rotation.z = elapsed * 0.3;
      innerRing.rotation.y = elapsed * 0.2;

      // Vertical Floating levitation
      crystalGroup.position.y = Math.sin(elapsed * 0.8) * 0.18;

      // Ambient particle slow drift
      particles.rotation.y = elapsed * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      edgeGeo.dispose();
      edgeMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[480px] sm:h-[560px] lg:h-[640px] flex items-center justify-center pointer-events-none select-none">
      <div ref={containerRef} className="w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing" />
      
      {/* Soft Luminous Backlight Aura */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[340px] h-[340px] bg-indigo-500/15 blur-[120px] rounded-full" />
        <div className="w-[260px] h-[260px] bg-sky-400/10 blur-[90px] rounded-full" />
      </div>
    </div>
  );
};

export default LuxuryCrystalHero;
