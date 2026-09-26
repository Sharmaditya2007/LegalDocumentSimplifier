import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Hero3DScene = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030508, 0.035);

    // --- Camera Setup ---
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const goldLight = new THREE.PointLight(0xebb87e, 4, 30);
    goldLight.position.set(5, 5, 5);
    scene.add(goldLight);

    const cyanLight = new THREE.PointLight(0x00d2ff, 4, 30);
    cyanLight.position.set(-5, -3, 6);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0x9b51e0, 3, 25);
    purpleLight.position.set(0, -6, -2);
    scene.add(purpleLight);

    // Cursor mouse tracking light
    const cursorLight = new THREE.PointLight(0xffffff, 2, 20);
    scene.add(cursorLight);

    // --- 3D Objects Group ---
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Holographic Core (Crystal Icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(2.4, 0);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x070d1a,
      emissive: 0x1a2942,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Wireframe lattice overlay on Core
    const wireGeo = new THREE.IcosahedronGeometry(2.42, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xebb87e,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    mainGroup.add(wireMesh);

    // 2. Inner Golden Gyroscope Ring (Torus 1)
    const torus1Geo = new THREE.TorusGeometry(3.6, 0.05, 16, 100);
    const torus1Mat = new THREE.MeshStandardMaterial({
      color: 0xebb87e,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0xd97706,
      emissiveIntensity: 0.4,
    });
    const torus1 = new THREE.Mesh(torus1Geo, torus1Mat);
    torus1.rotation.x = Math.PI / 3;
    mainGroup.add(torus1);

    // 3. Outer Cyan Orbiting Ring (Torus 2)
    const torus2Geo = new THREE.TorusGeometry(4.6, 0.04, 16, 100);
    const torus2Mat = new THREE.MeshStandardMaterial({
      color: 0x00d2ff,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x0088cc,
      emissiveIntensity: 0.5,
    });
    const torus2 = new THREE.Mesh(torus2Geo, torus2Mat);
    torus2.rotation.y = Math.PI / 4;
    mainGroup.add(torus2);

    // 4. Floating Satellites (Crystalline Shards / Polyhedrons)
    const satellites = [];
    const shardCount = 8;
    for (let i = 0; i < shardCount; i++) {
      const shardGeo = new THREE.OctahedronGeometry(0.35 + Math.random() * 0.25, 0);
      const isGold = i % 2 === 0;
      const shardMat = new THREE.MeshStandardMaterial({
        color: isGold ? 0xebb87e : 0x00d2ff,
        metalness: 0.85,
        roughness: 0.2,
        emissive: isGold ? 0xd97706 : 0x0077aa,
        emissiveIntensity: 0.35,
        flatShading: true,
      });
      const shard = new THREE.Mesh(shardGeo, shardMat);
      
      const angle = (i / shardCount) * Math.PI * 2;
      const radius = 5.2 + Math.random() * 2.2;
      const heightOffset = (Math.random() - 0.5) * 4;
      
      shard.position.set(
        Math.cos(angle) * radius,
        heightOffset,
        Math.sin(angle) * radius
      );

      shard.userData = {
        angle,
        radius,
        speed: 0.006 + Math.random() * 0.008,
        rotSpeedX: (Math.random() - 0.5) * 0.04,
        rotSpeedY: (Math.random() - 0.5) * 0.04,
        yBase: heightOffset,
        yFreq: 1 + Math.random() * 2,
      };

      mainGroup.add(shard);
      satellites.push(shard);
    }

    // 5. Surrounding 3D Particle Swarm (Golden & Cyan stardust)
    const particleCount = 650;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0xebb87e);
    const c2 = new THREE.Color(0x00d2ff);
    const c3 = new THREE.Color(0x9b51e0);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      // Spherical distribution
      const r = 4 + Math.random() * 16;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      posArray[idx] = r * Math.sin(phi) * Math.cos(theta);
      posArray[idx + 1] = r * Math.sin(phi) * Math.sin(theta);
      posArray[idx + 2] = r * Math.cos(phi);

      const chosenColor = i % 3 === 0 ? c1 : i % 3 === 1 ? c2 : c3;
      colorArray[idx] = chosenColor.r;
      colorArray[idx + 1] = chosenColor.g;
      colorArray[idx + 2] = chosenColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.09,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // --- Interactive Mouse Dynamics ---
    let targetX = 0;
    let targetY = 0;
    let windowHalfX = width / 2;
    let windowHalfY = height / 2;

    const onMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left - windowHalfX;
      const y = event.clientY - rect.top - windowHalfY;
      targetX = (x / windowHalfX) * 1.5;
      targetY = (y / windowHalfY) * 1.5;

      // Move dynamic cursor spotlight
      cursorLight.position.set(
        (x / windowHalfX) * 8,
        -(y / windowHalfY) * 8,
        8
      );
    };

    const onTouchMove = (event) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const rect = container.getBoundingClientRect();
        targetX = ((touch.clientX - rect.left - windowHalfX) / windowHalfX) * 1.5;
        targetY = ((touch.clientY - rect.top - windowHalfY) / windowHalfY) * 1.5;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // Handle Resize
    const onResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      windowHalfX = newWidth / 2;
      windowHalfY = newHeight / 2;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', onResize);

    // --- Animation Loop (60 FPS with Damping) ---
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax damping
      camera.position.x += (targetX * 2.5 - camera.position.x) * 0.05;
      camera.position.y += (-targetY * 2.5 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Rotate Main Group
      coreMesh.rotation.y = elapsedTime * 0.25;
      coreMesh.rotation.x = Math.sin(elapsedTime * 0.35) * 0.3;
      wireMesh.rotation.y = elapsedTime * 0.25;
      wireMesh.rotation.x = Math.sin(elapsedTime * 0.35) * 0.3;

      // Gyroscope Toruses
      torus1.rotation.z = elapsedTime * 0.45;
      torus1.rotation.y = elapsedTime * 0.2;
      torus2.rotation.x = -elapsedTime * 0.35;
      torus2.rotation.z = elapsedTime * 0.15;

      // Update Floating Satellites
      satellites.forEach((sat) => {
        sat.userData.angle += sat.userData.speed;
        sat.position.x = Math.cos(sat.userData.angle) * sat.userData.radius;
        sat.position.z = Math.sin(sat.userData.angle) * sat.userData.radius;
        sat.position.y = sat.userData.yBase + Math.sin(elapsedTime * sat.userData.yFreq) * 0.7;

        sat.rotation.x += sat.userData.rotSpeedX;
        sat.rotation.y += sat.userData.rotSpeedY;
      });

      // Slowly rotate particle field
      particleSystem.rotation.y = elapsedTime * 0.03;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      torus1Geo.dispose();
      torus1Mat.dispose();
      torus2Geo.dispose();
      torus2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      style={{ minHeight: '100%' }}
    />
  );
};

export default Hero3DScene;
