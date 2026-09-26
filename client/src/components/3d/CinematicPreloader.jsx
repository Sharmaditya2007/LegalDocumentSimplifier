import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * Creates high-res canvas texture for the 3D legal document during Scene 2
 */
const createDocumentTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1400;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#070b16';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 3;
  ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 32px -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';
  ctx.fillText('ENTERPRISE LEGAL MASTER AGREEMENT', 60, 95);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.font = '16px monospace';
  ctx.fillText('QUANTUM AI AUDIT // RECORD 0x8F92A', 60, 130);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.beginPath();
  ctx.moveTo(60, 155);
  ctx.lineTo(canvas.width - 60, 155);
  ctx.stroke();

  // Section 1
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = '18px sans-serif';
  ctx.fillText('SECTION 1: RECITALS & COMMERCIAL TERMS', 60, 205);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.font = '15px sans-serif';
  ctx.fillText('All services provided herein shall conform strictly to the enterprise schedule.', 60, 235);

  // Risk Clause 1
  ctx.fillStyle = 'rgba(244, 63, 94, 0.18)';
  ctx.fillRect(50, 290, canvas.width - 100, 135);
  ctx.strokeStyle = 'rgba(244, 63, 94, 0.8)';
  ctx.lineWidth = 2;
  ctx.strokeRect(50, 290, canvas.width - 100, 135);

  ctx.fillStyle = '#f43f5e';
  ctx.font = 'bold 18px monospace';
  ctx.fillText('[CRITICAL RISK: SECTION 14.2 - UNILATERAL INDEMNITY]', 70, 330);
  ctx.fillStyle = '#ffffff';
  ctx.font = '15px sans-serif';
  ctx.fillText('Contractor shall defend and indemnify Company from any damages without financial limit.', 70, 365);
  ctx.fillText('Liability is uncapped against any statutory defense.', 70, 395);

  // Risk Clause 2
  ctx.fillStyle = 'rgba(245, 158, 11, 0.18)';
  ctx.fillRect(50, 460, canvas.width - 100, 125);
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.8)';
  ctx.strokeRect(50, 460, canvas.width - 100, 125);

  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 18px monospace';
  ctx.fillText('[LIABILITY TRAP: SECTION 18.4 - 180-DAY CERTIFIED NOTICE]', 70, 498);
  ctx.fillStyle = '#ffffff';
  ctx.font = '15px sans-serif';
  ctx.fillText('Agreement automatically renews for 24 months unless non-renewal is received 180 days prior.', 70, 535);

  // Lines
  for (let i = 0; i < 14; i++) {
    const y = 630 + i * 40;
    ctx.fillStyle = `rgba(255, 255, 255, ${0.15 + (i % 3) * 0.08})`;
    ctx.fillRect(60, y, (canvas.width - 120) * (0.65 + Math.sin(i * 1.5) * 0.3), 10);
  }

  return canvas;
};

const CinematicPreloader = ({ onComplete }) => {
  const mountRef = useRef(null);
  const [currentScene, setCurrentScene] = useState(1);
  const [percent, setPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Three.js Setup ---
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x0a1020, 1.5);
    scene.add(ambientLight);

    const coreLight = new THREE.PointLight(0x818cf8, 4.0, 25);
    coreLight.position.set(0, 0, 4);
    scene.add(coreLight);

    const cyanRim = new THREE.DirectionalLight(0x38bdf8, 3.5);
    cyanRim.position.set(-5, 4, 6);
    scene.add(cyanRim);

    // =========================================================================
    // SCENE 1: Glowing AI Plasma Core
    // =========================================================================
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    const coreGeo = new THREE.SphereGeometry(1.6, 32, 32);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x4338ca,
      emissive: 0x6366f1,
      emissiveIntensity: 2.2,
      roughness: 0.15,
      metalness: 0.1,
      transmission: 0.7,
      transparent: true,
      opacity: 0, // Starts 0, fades in
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    const coreHaloGeo = new THREE.IcosahedronGeometry(2.0, 1);
    const coreHaloMat = new THREE.MeshBasicMaterial({
      color: 0xa5b4fc,
      wireframe: true,
      transparent: true,
      opacity: 0,
    });
    const coreHalo = new THREE.Mesh(coreHaloGeo, coreHaloMat);
    coreGroup.add(coreHalo);

    // =========================================================================
    // SCENE 2: 3D Legal Document & Scanning Beam
    // =========================================================================
    const docGroup = new THREE.Group();
    docGroup.scale.set(0.001, 0.001, 0.001);
    scene.add(docGroup);

    const docWidth = 4.2;
    const docHeight = 5.8;
    const docGeo = new THREE.PlaneGeometry(docWidth, docHeight, 32, 32);
    const docCanvas = createDocumentTexture();
    const docTexture = new THREE.CanvasTexture(docCanvas);

    const docMat = new THREE.MeshPhysicalMaterial({
      map: docTexture,
      transparent: true,
      opacity: 0,
      roughness: 0.15,
      transmission: 0.5,
      side: THREE.DoubleSide,
    });
    const docMesh = new THREE.Mesh(docGeo, docMat);
    docGroup.add(docMesh);

    const laserGeo = new THREE.PlaneGeometry(docWidth * 1.05, 0.05);
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const laserBeam = new THREE.Mesh(laserGeo, laserMat);
    laserBeam.position.set(0, 2.8, 0.05);
    docGroup.add(laserBeam);

    // =========================================================================
    // SCENE 3 & 4: 3,200 Dissolving / Morphing Swarm Particles
    // =========================================================================
    const particleCount = 3200;
    const particleGeo = new THREE.BufferGeometry();
    const currentPositions = new Float32Array(particleCount * 3);
    const docGridPositions = new Float32Array(particleCount * 3);
    const vortexPositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const u = (i % 60) / 60;
      const v = Math.floor(i / 60) / 60;

      const gx = (u - 0.5) * docWidth;
      const gy = (0.5 - v) * docHeight;
      const gz = (Math.random() - 0.5) * 0.1;

      docGridPositions[idx] = gx;
      docGridPositions[idx + 1] = gy;
      docGridPositions[idx + 2] = gz;

      currentPositions[idx] = gx;
      currentPositions[idx + 1] = gy;
      currentPositions[idx + 2] = gz;

      const theta = Math.random() * Math.PI * 2;
      const rad = 2.0 + Math.random() * 5.5;
      vortexPositions[idx] = Math.cos(theta) * rad;
      vortexPositions[idx + 1] = (Math.random() - 0.5) * 5.0;
      vortexPositions[idx + 2] = Math.sin(theta) * rad;

      const isAlert = i % 8 === 0;
      particleColors[idx] = isAlert ? 0.95 : 0.9;
      particleColors[idx + 1] = isAlert ? 0.3 : 0.95;
      particleColors[idx + 2] = isAlert ? 0.45 : 1.0;
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
    // GSAP 5-SCENE MASTER TIMELINE (4.8 Seconds Total)
    // =========================================================================
    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }
    });

    // SCENE 1 (0.0s - 1.2s): AI Core Glow + Percent Counter (0% -> 100%)
    tl.to(coreMat, { opacity: 0.95, duration: 0.5 }, 0.1);
    tl.to(coreHaloMat, { opacity: 0.6, duration: 0.5 }, 0.1);

    const counterObj = { val: 0 };
    tl.to(counterObj, {
      val: 100,
      duration: 1.1,
      ease: 'power2.inOut',
      onUpdate: () => setPercent(Math.round(counterObj.val))
    }, 0.1);

    // SCENE 2 (1.2s - 2.4s): Document Appears & AI Scanning Beam Sweeps
    tl.call(() => setCurrentScene(2), null, 1.2);
    tl.to(coreGroup.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 0.4 }, 1.2);
    tl.to(docGroup.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: 'power2.out' }, 1.3);
    tl.to(docMat, { opacity: 0.95, duration: 0.5 }, 1.3);

    tl.set(laserMat, { opacity: 0.95 }, 1.5);
    tl.to(laserBeam.position, { y: -2.8, duration: 0.8, ease: 'power1.inOut' }, 1.5);
    tl.to(laserMat, { opacity: 0, duration: 0.2 }, 2.3);

    // SCENE 3 (2.4s - 3.4s): Document Dissolves into 3,200 Glowing Particles
    tl.call(() => setCurrentScene(3), null, 2.4);
    tl.to(docMat, { opacity: 0, duration: 0.3 }, 2.4);
    tl.to(particleMat, { opacity: 0.95, duration: 0.2 }, 2.4);

    const morphObj = { progress: 0 };
    tl.to(morphObj, {
      progress: 1,
      duration: 0.9,
      ease: 'power2.out',
      onUpdate: () => {
        const pArr = particleGeo.attributes.position.array;
        const p = morphObj.progress;
        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          pArr[idx] = THREE.MathUtils.lerp(docGridPositions[idx], vortexPositions[idx], p);
          pArr[idx + 1] = THREE.MathUtils.lerp(docGridPositions[idx + 1], vortexPositions[idx + 1], p);
          pArr[idx + 2] = THREE.MathUtils.lerp(docGridPositions[idx + 2], vortexPositions[idx + 2], p);
        }
        particleGeo.attributes.position.needsUpdate = true;
      }
    }, 2.4);

    // SCENE 4 (3.4s - 4.3s): Particles Assemble into CONTRACTS. CLARIFIED.
    tl.call(() => setCurrentScene(4), null, 3.4);
    tl.to(particleSystem.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 0.8, ease: 'power2.out' }, 3.4);

    // SCENE 5 (4.3s - 4.8s): Camera Rapidly Punches Forward (Hyperspace Dive into App)
    tl.call(() => setCurrentScene(5), null, 4.3);
    tl.to(camera.position, { z: -3, duration: 0.55, ease: 'power3.in' }, 4.3);
    tl.to(particleMat, { opacity: 0, duration: 0.4 }, 4.3);

    // Render loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      coreGroup.rotation.y = elapsed * 0.4;
      coreHalo.rotation.x = -elapsed * 0.3;
      docGroup.rotation.y = Math.sin(elapsed * 0.6) * 0.08;
      particleSystem.rotation.y = elapsed * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      tl.kill();
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      coreHaloGeo.dispose();
      coreHaloMat.dispose();
      docGeo.dispose();
      docMat.dispose();
      laserGeo.dispose();
      laserMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-[#030305] flex items-center justify-center select-none overflow-hidden transition-opacity duration-700">
      
      {/* 3D WebGL Canvas for Preloader */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Skip Button */}
      <button
        onClick={() => {
          setIsVisible(false);
          if (onComplete) onComplete();
        }}
        className="absolute top-8 right-8 z-50 text-xs font-mono tracking-widest text-slate-400 hover:text-white px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all hover:bg-white/10"
      >
        SKIP INTRO →
      </button>

      {/* Overlay UI Texts by Scene */}
      <div className="relative z-10 flex flex-col items-center text-center pointer-events-none max-w-2xl px-6">
        
        {/* SCENE 1 Text: LEGALEASE AI & Percentage */}
        {currentScene === 1 && (
          <div className="flex flex-col items-center animate-fade-in">
            <h2 className="text-sm font-mono tracking-[0.3em] uppercase text-indigo-300 font-bold mb-2">
              LEGALEASE AI
            </h2>
            <p className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-8">
              INITIALIZING LEGAL INTELLIGENCE
            </p>
            <div className="text-4xl sm:text-5xl font-mono font-bold tracking-tight text-white">
              {percent}%
            </div>
          </div>
        )}

        {/* SCENE 2 Text: Scanning Active */}
        {currentScene === 2 && (
          <div className="flex items-center gap-2.5 px-5 py-2 rounded-full bg-black/60 border border-white/10 backdrop-blur-xl animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-mono tracking-widest text-slate-200 uppercase">
              AI SCANNING CLAUSES & LIABILITY TRAPS...
            </span>
          </div>
        )}

        {/* SCENE 4 Text: Large Cinematic Typography */}
        {currentScene === 4 && (
          <div className="animate-fade-in flex flex-col items-center">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05]">
              CONTRACTS. <br />
              <span className="text-metallic">CLARIFIED.</span>
            </h1>
          </div>
        )}

      </div>
    </div>
  );
};

export default CinematicPreloader;
