import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const createMiniClauseTexture = (title, riskLevel, colorHex) => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#070f1e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Border
  ctx.strokeStyle = colorHex;
  ctx.lineWidth = 4;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

  // Header tag
  ctx.fillStyle = colorHex;
  ctx.font = 'bold 22px monospace';
  ctx.fillText(`[${riskLevel.toUpperCase()}]`, 25, 45);

  // Title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px sans-serif';
  ctx.fillText(title, 25, 90);

  // Fake legal lines
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.fillRect(25, 125 + i * 28, canvas.width - 50, 10);
  }

  // Scanline overlay
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  for (let y = 0; y < canvas.height; y += 4) {
    ctx.fillRect(0, y, canvas.width, 2);
  }

  return canvas;
};

const Interactive3DClauseViewer = ({ activeClauseIndex = 0, onSelectClause }) => {
  const mountRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight || 340;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambient = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambient);

    const redLight = new THREE.PointLight(0xf43f5e, 3, 15);
    redLight.position.set(-3, 2, 4);
    scene.add(redLight);

    const cyanLight = new THREE.PointLight(0x00d2ff, 3, 15);
    cyanLight.position.set(3, -2, 4);
    scene.add(cyanLight);

    // --- 3D Holographic Clause Tablets ---
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    const clauseData = [
      { name: 'Indemnity Trap', risk: 'Critical Risk (94/100)', color: '#f43f5e', colorNum: 0xf43f5e, x: -2.8, y: 0.2, z: 0 },
      { name: 'Auto-Renewal Lock-In', risk: 'High Risk (68/100)', color: '#f59e0b', colorNum: 0xf59e0b, x: 0, y: -0.2, z: 0.6 },
      { name: 'Worldwide Non-Compete', risk: 'Critical Risk (89/100)', color: '#f43f5e', colorNum: 0xf43f5e, x: 2.8, y: 0.2, z: 0 },
    ];

    const cardGeo = new THREE.PlaneGeometry(2.3, 1.45);
    const cardMeshes = [];

    clauseData.forEach((data, index) => {
      const canvas = createMiniClauseTexture(data.name, data.risk, data.color);
      const texture = new THREE.CanvasTexture(canvas);

      const mat = new THREE.MeshPhysicalMaterial({
        map: texture,
        transparent: true,
        opacity: 0.95,
        roughness: 0.2,
        metalness: 0.2,
        transmission: 0.5,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(cardGeo, mat);
      mesh.position.set(data.x, data.y, data.z);
      mesh.userData = { index, data, baseX: data.x, baseY: data.y, baseZ: data.z };

      // Glowing outer rim
      const edgeGeo = new THREE.EdgesGeometry(cardGeo);
      const edgeMat = new THREE.LineBasicMaterial({ color: data.colorNum, transparent: true, opacity: 0.8 });
      const wire = new THREE.LineSegments(edgeGeo, edgeMat);
      mesh.add(wire);

      mainGroup.add(mesh);
      cardMeshes.push(mesh);
    });

    // Connecting laser line between clauses
    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-2.8, 0.2, 0),
      new THREE.Vector3(0, -0.2, 0.6),
      new THREE.Vector3(2.8, 0.2, 0),
    ]);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00d2ff, transparent: true, opacity: 0.45 });
    const beam = new THREE.Line(lineGeo, lineMat);
    mainGroup.add(beam);

    // --- Mouse Interactivity ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cardMeshes);

      if (intersects.length > 0) {
        container.style.cursor = 'pointer';
        const hit = intersects[0].object;
        setHoveredNode(hit.userData.data.name);
      } else {
        container.style.cursor = 'default';
        setHoveredNode(null);
      }
    };

    const handlePointerClick = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cardMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (onSelectClause) {
          onSelectClause(hit.userData.index);
        }
      }
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('click', handlePointerClick);

    // --- Animation Loop ---
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Subtle floating rotation
      mainGroup.rotation.y = Math.sin(elapsed * 0.4) * 0.12;
      mainGroup.rotation.x = Math.cos(elapsed * 0.3) * 0.05;

      cardMeshes.forEach((mesh, idx) => {
        const isActive = idx === activeClauseIndex;
        const targetScale = isActive ? 1.18 : 0.95;
        const targetZ = isActive ? mesh.userData.baseZ + 0.6 : mesh.userData.baseZ;

        mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        mesh.position.z = THREE.MathUtils.lerp(mesh.position.z, targetZ, 0.1);
        mesh.position.y = mesh.userData.baseY + Math.sin(elapsed * 1.5 + idx) * 0.08;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('click', handlePointerClick);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      cardGeo.dispose();
    };
  }, [activeClauseIndex]);

  return (
    <div className="relative w-full h-80 rounded-3xl overflow-hidden glass-panel border border-cyan-500/20 flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full" />
      <div className="absolute top-3 left-4 pointer-events-none z-10 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span className="text-[10px] font-mono uppercase text-slate-300 font-bold tracking-wider">
          3D Clause Hologram HUD {hoveredNode ? `• [${hoveredNode}]` : '• Click Hologram to Inspect'}
        </span>
      </div>
    </div>
  );
};

export default Interactive3DClauseViewer;
