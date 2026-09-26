import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * Creates high-res canvas texture for the 3D legal document in Step 1 & 2
 */
const createDocumentTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1400;
  const ctx = canvas.getContext('2d');

  // Translucent dark glass sheet
  ctx.fillStyle = '#080c16';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 3;
  ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

  // Header Title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 30px "SF Pro Display", system-ui, sans-serif';
  ctx.fillText('MASTER COMMERCIAL SERVICES AGREEMENT', 60, 95);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.font = '16px monospace';
  ctx.fillText('LEGAL INTELLIGENCE AUDIT // v4.2', 60, 130);

  // Divider
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.beginPath();
  ctx.moveTo(60, 155);
  ctx.lineTo(canvas.width - 60, 155);
  ctx.stroke();

  // Standard Clauses
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.font = '18px system-ui, sans-serif';
  ctx.fillText('SECTION 1: RECITALS & SCOPE OF SERVICES', 60, 205);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.font = '15px system-ui, sans-serif';
  ctx.fillText('This Agreement is entered into by and between the Client and Enterprise AI.', 60, 235);
  ctx.fillText('All services provided herein shall conform to industry benchmarks.', 60, 260);

  // Risk Clause 1: High Risk Indemnity
  ctx.fillStyle = 'rgba(244, 63, 94, 0.15)';
  ctx.fillRect(50, 310, canvas.width - 100, 130);
  ctx.strokeStyle = 'rgba(244, 63, 94, 0.6)';
  ctx.lineWidth = 2;
  ctx.strokeRect(50, 310, canvas.width - 100, 130);

  ctx.fillStyle = '#f43f5e';
  ctx.font = 'bold 18px monospace';
  ctx.fillText('[CRITICAL RISK DETECTED: SECTION 14.2 - UNILATERAL INDEMNITY]', 70, 345);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.font = '15px system-ui, sans-serif';
  ctx.fillText('Contractor shall defend, indemnify, and hold harmless Company from and against any and all', 70, 380);
  ctx.fillText('damages, liabilities, and legal fees without financial limitation or statutory cap.', 70, 405);

  // Risk Clause 2: Lock-in Renewal
  ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
  ctx.fillRect(50, 470, canvas.width - 100, 120);
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
  ctx.strokeRect(50, 470, canvas.width - 100, 120);

  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 18px monospace';
  ctx.fillText('[LIABILITY TRAP: SECTION 18.4 - 180-DAY CERTIFIED MAIL NOTICE]', 70, 505);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.font = '15px system-ui, sans-serif';
  ctx.fillText('Agreement automatically renews for 24 months unless written notice is delivered', 70, 540);
  ctx.fillText('via physical certified mail at least 180 calendar days prior to expiration.', 70, 565);

  // Risk Clause 3: Restrictive Non-Compete
  ctx.fillStyle = 'rgba(244, 63, 94, 0.15)';
  ctx.fillRect(50, 620, canvas.width - 100, 120);
  ctx.strokeStyle = 'rgba(244, 63, 94, 0.6)';
  ctx.strokeRect(50, 620, canvas.width - 100, 120);

  ctx.fillStyle = '#f43f5e';
  ctx.font = 'bold 18px monospace';
  ctx.fillText('[COMPLIANCE ISSUE: SECTION 22.1 - WORLDWIDE NON-COMPETE]', 70, 655);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.font = '15px system-ui, sans-serif';
  ctx.fillText('Consultant is prohibited from engaging in any competitive technology business', 70, 690);
  ctx.fillText('anywhere worldwide for a period of thirty-six (36) months post-termination.', 70, 715);

  // Procedural text lines
  for (let i = 0; i < 14; i++) {
    const y = 780 + i * 36;
    ctx.fillStyle = `rgba(255, 255, 255, ${0.15 + (i % 3) * 0.08})`;
    ctx.fillRect(60, y, (canvas.width - 120) * (0.6 + Math.sin(i * 1.8) * 0.35), 10);
  }

  return canvas;
};

const CinematicOpeningHero = ({ onSequenceComplete }) => {
  const containerRef = useRef(null);
  const [animationStep, setAnimationStep] = useState(1); // 1: Doc appear -> 2: Scanning -> 3: Dissolve -> 4: Text form -> 5: Crystal Hero
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene & Camera ---
    const width = container.clientWidth;
    const height = container.clientHeight || 650;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, 15); // Starts further away and dollies in

    // --- High-Performance Renderer ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // --- Studio Lighting ---
    const ambientLight = new THREE.AmbientLight(0x0a101f, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5ea, 3.5);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 4.0);
    rimLight.position.set(-6, -4, -4);
    scene.add(rimLight);

    const mouseLight = new THREE.PointLight(0xffffff, 2.0, 15);
    mouseLight.position.set(0, 0, 5);
    scene.add(mouseLight);

    // =========================================================================
    // STEP 1 & 2: Floating 3D Legal Document & Scanning Beam
    // =========================================================================
    const documentGroup = new THREE.Group();
    scene.add(documentGroup);

    const docWidth = 4.2;
    const docHeight = 5.8;
    const docGeo = new THREE.PlaneGeometry(docWidth, docHeight, 32, 32);

    const docCanvas = createDocumentTexture();
    const docTexture = new THREE.CanvasTexture(docCanvas);

    const docMat = new THREE.MeshPhysicalMaterial({
      map: docTexture,
      transparent: true,
      opacity: 0, // Starts at 0, fades in
      roughness: 0.15,
      metalness: 0.05,
      transmission: 0.6,
      side: THREE.DoubleSide,
    });
    const documentMesh = new THREE.Mesh(docGeo, docMat);
    documentGroup.add(documentMesh);

    // Glowing document edge wireframe
    const docEdgeGeo = new THREE.EdgesGeometry(docGeo);
    const docEdgeMat = new THREE.LineBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0
    });
    const docEdges = new THREE.LineSegments(docEdgeGeo, docEdgeMat);
    documentMesh.add(docEdges);

    // Intelligent AI Scanning Laser Beam
    const laserGeo = new THREE.PlaneGeometry(docWidth * 1.05, 0.04);
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const laserBeam = new THREE.Mesh(laserGeo, laserMat);
    laserBeam.position.set(0, 2.8, 0.05);
    documentGroup.add(laserBeam);

    // Soft laser curtain flare
    const laserCurtainGeo = new THREE.PlaneGeometry(docWidth * 1.05, 0.5);
    const laserCurtainMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const laserCurtain = new THREE.Mesh(laserCurtainGeo, laserCurtainMat);
    laserCurtain.position.set(0, 2.55, 0.05);
    documentGroup.add(laserCurtain);

    // =========================================================================
    // STEP 3 & 4: 3,000 Glowing Swirling Dissolve Particles
    // =========================================================================
    const particleCount = 2800;
    const particleGeo = new THREE.BufferGeometry();
    const currentPositions = new Float32Array(particleCount * 3);
    const targetPositions = new Float32Array(particleCount * 3);
    const startPositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    // Initialize particles on the grid of the legal document
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const u = (i % 55) / 55;
      const v = Math.floor(i / 55) / 55;

      const startX = (u - 0.5) * docWidth;
      const startY = (0.5 - v) * docHeight;
      const startZ = (Math.random() - 0.5) * 0.1;

      startPositions[idx] = startX;
      startPositions[idx + 1] = startY;
      startPositions[idx + 2] = startZ;

      currentPositions[idx] = startX;
      currentPositions[idx + 1] = startY;
      currentPositions[idx + 2] = startZ;

      // Dispersed swirl target
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.5 + Math.random() * 5.0;
      targetPositions[idx] = Math.cos(angle) * radius;
      targetPositions[idx + 1] = (Math.random() - 0.5) * 4.5;
      targetPositions[idx + 2] = Math.sin(angle) * radius;

      // Pearl & subtle amber/rose energy particle colors
      const isTrap = i % 7 === 0;
      const isCyan = i % 4 === 0;
      particleColors[idx] = isTrap ? 0.95 : isCyan ? 0.6 : 1.0;
      particleColors[idx + 1] = isTrap ? 0.35 : isCyan ? 0.8 : 1.0;
      particleColors[idx + 2] = isTrap ? 0.45 : isCyan ? 1.0 : 1.0;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // =========================================================================
    // STEP 5: Luxury Translucent Glass Crystal (Settled Centerpiece)
    // =========================================================================
    const crystalGroup = new THREE.Group();
    crystalGroup.scale.set(0.001, 0.001, 0.001); // Scales up smoothly as particles settle
    scene.add(crystalGroup);

    const outerGeo = new THREE.IcosahedronGeometry(2.2, 0);
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
      flatShading: true,
    });
    const outerCrystal = new THREE.Mesh(outerGeo, outerMat);
    crystalGroup.add(outerCrystal);

    const edgeGeo = new THREE.EdgesGeometry(outerGeo);
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
    });
    const crystalEdges = new THREE.LineSegments(edgeGeo, edgeMat);
    crystalGroup.add(crystalEdges);

    // Inner Luminous Core
    const innerGeo = new THREE.SphereGeometry(1.0, 32, 32);
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

    const coreLight = new THREE.PointLight(0x818cf8, 3.5, 8);
    crystalGroup.add(coreLight);

    const ringGeo = new THREE.TorusGeometry(1.35, 0.02, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xe0e7ff,
      transparent: true,
      opacity: 0.6,
    });
    const innerRing = new THREE.Mesh(ringGeo, ringMat);
    innerRing.rotation.x = Math.PI / 3;
    crystalGroup.add(innerRing);

    // =========================================================================
    // MASTER GSAP TIMELINE (Cinematic 4.5s Opening Sequence)
    // =========================================================================
    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => {
        setAnimationStep(5);
        if (onSequenceComplete) onSequenceComplete();
      }
    });

    // STEP 1 (0.0s - 1.0s): Document appears in dark space + Camera approaches
    tl.to(camera.position, { z: 10, duration: 1.2, ease: 'power2.out' }, 0);
    tl.to(docMat, { opacity: 0.95, duration: 0.8 }, 0.2);
    tl.to(docEdgeMat, { opacity: 0.6, duration: 0.8 }, 0.2);

    // STEP 2 (1.0s - 2.2s): AI Laser sweeps down the document revealing risk clauses
    tl.set(laserMat, { opacity: 0.95 }, 1.0);
    tl.set(laserCurtainMat, { opacity: 0.35 }, 1.0);
    tl.call(() => setAnimationStep(2), null, 1.0);
    tl.to(laserBeam.position, { y: -2.8, duration: 1.2, ease: 'power1.inOut' }, 1.0);
    tl.to(laserCurtain.position, { y: -2.55, duration: 1.2, ease: 'power1.inOut' }, 1.0);
    tl.to([laserMat, laserCurtainMat], { opacity: 0, duration: 0.3 }, 2.1);

    // STEP 3 (2.2s - 3.4s): Document dissolves into swirling glowing particles
    tl.call(() => setAnimationStep(3), null, 2.2);
    tl.to(docMat, { opacity: 0, duration: 0.4 }, 2.2);
    tl.to(docEdgeMat, { opacity: 0, duration: 0.4 }, 2.2);
    tl.to(particleMat, { opacity: 0.9, duration: 0.3 }, 2.2);

    // Interpolate particles expanding outward
    const particleProgress = { val: 0 };
    tl.to(particleProgress, {
      val: 1,
      duration: 1.4,
      ease: 'power2.out',
      onUpdate: () => {
        const pArr = particleGeo.attributes.position.array;
        const progress = particleProgress.val;
        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          pArr[idx] = THREE.MathUtils.lerp(startPositions[idx], targetPositions[idx], progress);
          pArr[idx + 1] = THREE.MathUtils.lerp(startPositions[idx + 1], targetPositions[idx + 1], progress);
          pArr[idx + 2] = THREE.MathUtils.lerp(startPositions[idx + 2], targetPositions[idx + 2], progress);
        }
        particleGeo.attributes.position.needsUpdate = true;
      }
    }, 2.2);

    // STEP 4 & 5 (3.4s - 4.5s): Particles coalesce into crystal core & Hero reveals
    tl.call(() => setAnimationStep(4), null, 3.4);
    tl.to(crystalGroup.scale, { x: 1, y: 1, z: 1, duration: 1.2, ease: 'elastic.out(1, 0.75)' }, 3.4);
    tl.to(particleMat, { opacity: 0.25, duration: 1.0 }, 3.6);

    // --- Mouse Parallax & Animation Loop ---
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

    // Handle Resize
    const onResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 650;
      windowHalfX = newW / 2;
      windowHalfY = newH / 2;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', onResize);

    // Render loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Camera parallax damping
      camera.position.x += (targetMouseX * 1.2 - camera.position.x) * 0.04;
      camera.position.y += (-targetMouseY * 0.9 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Document subtle floating
      documentGroup.rotation.y = Math.sin(elapsed * 0.5) * 0.05 + (targetMouseX * 0.1);
      documentGroup.position.y = Math.sin(elapsed * 1.2) * 0.08;

      // Particle system swirling vortex rotation
      particleSystem.rotation.y = elapsed * 0.15;
      particleSystem.rotation.z = Math.sin(elapsed * 0.1) * 0.1;

      // Luxury Crystal slow rotation & inner pulse
      outerCrystal.rotation.y = elapsed * 0.15;
      outerCrystal.rotation.x = Math.sin(elapsed * 0.12) * 0.2;
      crystalEdges.rotation.y = outerCrystal.rotation.y;
      crystalEdges.rotation.x = outerCrystal.rotation.x;

      innerCore.rotation.y = -elapsed * 0.25;
      const pulse = 1.0 + Math.sin(elapsed * 1.5) * 0.06;
      innerCore.scale.set(pulse, pulse, pulse);

      innerRing.rotation.z = elapsed * 0.3;
      innerRing.rotation.y = elapsed * 0.2;

      crystalGroup.position.y = Math.sin(elapsed * 0.8) * 0.18;

      renderer.render(scene, camera);
    };

    animate();

    // Fast skip function on user click
    const handleInstantSkip = () => {
      tl.progress(1);
      setAnimationStep(5);
      setIsSkipped(true);
      if (onSequenceComplete) onSequenceComplete();
    };

    container.addEventListener('click', handleInstantSkip);

    return () => {
      cancelAnimationFrame(animId);
      tl.kill();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('click', handleInstantSkip);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      docGeo.dispose();
      docMat.dispose();
      docEdgeGeo.dispose();
      docEdgeMat.dispose();
      laserGeo.dispose();
      laserMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      edgeGeo.dispose();
      edgeMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[520px] sm:h-[620px] lg:h-[700px] flex items-center justify-center pointer-events-none select-none">
      {/* 3D WebGL Canvas */}
      <div ref={containerRef} className="w-full h-full pointer-events-auto cursor-pointer" />

      {/* Subtle Step 1 & 2 Scanning Indicator */}
      {animationStep <= 2 && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-500 flex items-center gap-2.5 px-4 py-1.5 rounded-full pill-luxury bg-black/60 backdrop-blur-xl border border-white/10">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-mono tracking-widest text-slate-300 uppercase">
            {animationStep === 1 ? 'Auditing Agreement Structure' : 'AI Risk Sentinel Scanning Clauses...'}
          </span>
        </div>
      )}

      {/* Soft Luminous Backlight Aura */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10">
        <div className="w-[360px] h-[360px] bg-indigo-500/15 blur-[130px] rounded-full" />
        <div className="w-[280px] h-[280px] bg-sky-400/10 blur-[100px] rounded-full" />
      </div>
    </div>
  );
};

export default CinematicOpeningHero;
