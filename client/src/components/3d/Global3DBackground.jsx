import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Global3DBackground = () => {
  const canvasContainerRef = useRef(null);

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    // --- Scene & Camera Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030508, 0.025);

    const width = window.innerWidth;
    const height = window.innerHeight;
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 25;

    // --- WebGL Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // --- 3D Floating Cyber Objects Group ---
    const objectGroup = new THREE.Group();
    scene.add(objectGroup);

    // Create 12 ambient floating wireframe 3D geometric shapes
    const geometries = [
      new THREE.IcosahedronGeometry(1.2, 0),
      new THREE.OctahedronGeometry(1.0, 0),
      new THREE.TetrahedronGeometry(1.1, 0),
      new THREE.DodecahedronGeometry(0.9, 0),
      new THREE.TorusGeometry(1.4, 0.04, 12, 48)
    ];

    const materials = [
      new THREE.MeshBasicMaterial({ color: 0xebb87e, wireframe: true, transparent: true, opacity: 0.18 }),
      new THREE.MeshBasicMaterial({ color: 0x00d2ff, wireframe: true, transparent: true, opacity: 0.15 }),
      new THREE.MeshBasicMaterial({ color: 0x9b51e0, wireframe: true, transparent: true, opacity: 0.14 })
    ];

    const floatingMeshes = [];
    for (let i = 0; i < 14; i++) {
      const geo = geometries[i % geometries.length];
      const mat = materials[i % materials.length];
      const mesh = new THREE.Mesh(geo, mat);

      mesh.position.set(
        (Math.random() - 0.5) * 45,
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 25
      );

      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      mesh.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.012,
        rotSpeedY: (Math.random() - 0.5) * 0.012,
        floatSpeed: 0.005 + Math.random() * 0.008,
        floatRange: 1 + Math.random() * 2,
        baseY: mesh.position.y,
      };

      objectGroup.add(mesh);
      floatingMeshes.push(mesh);
    }

    // --- 3D Particle Constellation (WebGL Points & Connecting Neural Lines) ---
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = [];

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      particlePositions[idx] = (Math.random() - 0.5) * 55;
      particlePositions[idx + 1] = (Math.random() - 0.5) * 40;
      particlePositions[idx + 2] = (Math.random() - 0.5) * 25;

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.01
      });
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x00d2ff,
      size: 0.12,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Dynamic Connecting Lines
    const maxLineConnections = 250;
    const linePositions = new Float32Array(maxLineConnections * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.14,
      blending: THREE.AdditiveBlending
    });
    
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // --- Mouse & Scroll Tracking ---
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      targetCameraX = mouseX * 2.5;
      targetCameraY = -mouseY * 2.5;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      objectGroup.rotation.y = scrollY * 0.0006;
      objectGroup.position.y = scrollY * 0.008;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle Resize
    const handleResize = () => {
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // --- Render Loop (Adaptive 60 FPS) ---
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Camera lerp
      camera.position.x += (targetCameraX - camera.position.x) * 0.03;
      camera.position.y += (targetCameraY - camera.position.y) * 0.03;

      // Update floating 3D objects
      floatingMeshes.forEach((mesh) => {
        mesh.rotation.x += mesh.userData.rotSpeedX;
        mesh.rotation.y += mesh.userData.rotSpeedY;
        mesh.position.y = mesh.userData.baseY + Math.sin(elapsed * mesh.userData.floatSpeed * 60) * mesh.userData.floatRange;
      });

      // Update particles
      const positions = particleGeo.attributes.position.array;
      let lineIdx = 0;

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        positions[idx] += particleVelocities[i].x;
        positions[idx + 1] += particleVelocities[i].y;
        positions[idx + 2] += particleVelocities[i].z;

        // Bounce boundaries
        if (Math.abs(positions[idx]) > 30) particleVelocities[i].x *= -1;
        if (Math.abs(positions[idx + 1]) > 22) particleVelocities[i].y *= -1;
        if (Math.abs(positions[idx + 2]) > 15) particleVelocities[i].z *= -1;

        // Form connections between near particles
        for (let j = i + 1; j < particleCount; j++) {
          if (lineIdx >= maxLineConnections * 6) break;
          const jdx = j * 3;
          const dx = positions[idx] - positions[jdx];
          const dy = positions[idx + 1] - positions[jdx + 1];
          const dz = positions[idx + 2] - positions[jdx + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 6.5) {
            linePositions[lineIdx++] = positions[idx];
            linePositions[lineIdx++] = positions[idx + 1];
            linePositions[lineIdx++] = positions[idx + 2];
            linePositions[lineIdx++] = positions[jdx];
            linePositions[lineIdx++] = positions[jdx + 1];
            linePositions[lineIdx++] = positions[jdx + 2];
          }
        }
      }

      particleGeo.attributes.position.needsUpdate = true;

      // Clear remaining line coordinates
      for (let k = lineIdx; k < maxLineConnections * 6; k++) {
        linePositions[k] = 0;
      }
      lineGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      geometries.forEach(g => g.dispose());
      materials.forEach(m => m.dispose());
    };
  }, []);

  return (
    <div
      ref={canvasContainerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    />
  );
};

export default Global3DBackground;
