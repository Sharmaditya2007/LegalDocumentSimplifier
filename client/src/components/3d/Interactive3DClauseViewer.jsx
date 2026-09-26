import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

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
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    const centerLight = new THREE.PointLight(0xebb87e, 3, 20);
    centerLight.position.set(0, 0, 4);
    scene.add(centerLight);

    // --- Central Rotating Hub ---
    const hubGroup = new THREE.Group();
    scene.add(hubGroup);

    const hubGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const hubMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a101f,
      emissive: 0x1e293b,
      roughness: 0.1,
      metalness: 0.9,
      clearcoat: 1.0,
      wireframe: false,
    });
    const hubMesh = new THREE.Mesh(hubGeo, hubMat);
    hubGroup.add(hubMesh);

    const hubWire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.22, 1),
      new THREE.MeshBasicMaterial({ color: 0x00d2ff, wireframe: true, transparent: true, opacity: 0.35 })
    );
    hubGroup.add(hubWire);

    // --- 3D Orbital Nodes (Clauses) ---
    const clauseNodes = [
      { name: 'Indemnity Trap', color: 0xf43f5e, radius: 4.2, speed: 0.008, angle: 0 },
      { name: 'Auto-Renewal', color: 0xf59e0b, radius: 4.2, speed: 0.008, angle: (Math.PI * 2) / 3 },
      { name: 'Non-Compete', color: 0xf43f5e, radius: 4.2, speed: 0.008, angle: (Math.PI * 4) / 3 },
    ];

    const nodeMeshes = [];
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    clauseNodes.forEach((data, index) => {
      const nodeGeo = new THREE.DodecahedronGeometry(0.55, 0);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: data.color,
        emissive: data.color,
        emissiveIntensity: 0.4,
        roughness: 0.2,
        metalness: 0.8,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.userData = { index, data, originalScale: 1 };
      hubGroup.add(nodeMesh);
      nodeMeshes.push(nodeMesh);

      // Connecting energetic line to central hub
      const lineMat = new THREE.LineBasicMaterial({ color: data.color, transparent: true, opacity: 0.4 });
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(Math.cos(data.angle) * data.radius, 0, Math.sin(data.angle) * data.radius)
      ]);
      const line = new THREE.Line(lineGeo, lineMat);
      nodeMesh.userData.line = line;
      hubGroup.add(line);
    });

    // --- Mouse Raycasting for Interactive Selection ---
    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes);

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
      const intersects = raycaster.intersectObjects(nodeMeshes);

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
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Rotate central hub
      hubMesh.rotation.y = elapsed * 0.4;
      hubWire.rotation.x = elapsed * 0.25;

      // Update orbital nodes
      nodeMeshes.forEach((mesh, idx) => {
        const d = mesh.userData.data;
        const currentAngle = d.angle + elapsed * 0.35;
        const x = Math.cos(currentAngle) * d.radius;
        const z = Math.sin(currentAngle) * d.radius;
        const y = Math.sin(elapsed * 1.5 + idx) * 0.6;

        mesh.position.set(x, y, z);
        mesh.rotation.x += 0.02;
        mesh.rotation.y += 0.03;

        // Scale up active or hovered node
        const isCurrentActive = idx === activeClauseIndex;
        const targetScale = isCurrentActive ? 1.35 : 1.0;
        mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

        // Update line coordinates
        const line = mesh.userData.line;
        const linePos = line.geometry.attributes.position.array;
        linePos[3] = x;
        linePos[4] = y;
        linePos[5] = z;
        line.geometry.attributes.position.needsUpdate = true;
      });

      // Gentle group rotation
      hubGroup.rotation.x = Math.sin(elapsed * 0.2) * 0.15;

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
      hubGeo.dispose();
      hubMat.dispose();
    };
  }, [activeClauseIndex]);

  return (
    <div className="relative w-full h-80 rounded-3xl overflow-hidden glass-panel border border-white/10 flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full" />
      <div className="absolute top-3 left-4 pointer-events-none z-10 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span className="text-[10px] font-mono uppercase text-slate-300 font-bold tracking-wider">
          3D Risk Lattice {hoveredNode ? `• [${hoveredNode}]` : '• Click Node to Inspect'}
        </span>
      </div>
    </div>
  );
};

export default Interactive3DClauseViewer;
