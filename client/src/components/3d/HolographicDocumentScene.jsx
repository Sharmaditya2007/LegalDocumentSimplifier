import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { Layers, ShieldAlert, FileText, Sparkles, CheckCircle2, AlertTriangle, Eye, RotateCw } from 'lucide-react';

/**
 * Procedural Canvas Texture Generator for Holographic Legal Document Layers
 */
const createDocumentTexture = (layerType, scanProgress = 0, activeClause = null) => {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1440;
  const ctx = canvas.getContext('2d');

  // Background base
  ctx.fillStyle = '#050a14';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Border & Grid
  ctx.strokeStyle = layerType === 'summary' ? 'rgba(235, 184, 126, 0.4)' : layerType === 'risk' ? 'rgba(244, 63, 94, 0.4)' : 'rgba(0, 210, 255, 0.3)';
  ctx.lineWidth = 4;
  ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

  // Corner reticles
  const drawReticle = (x, y) => {
    ctx.strokeStyle = layerType === 'summary' ? '#ebb87e' : layerType === 'risk' ? '#f43f5e' : '#00d2ff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x - 15, y); ctx.lineTo(x + 15, y);
    ctx.moveTo(x, y - 15); ctx.lineTo(x, y + 15);
    ctx.stroke();
  };
  drawReticle(45, 45);
  drawReticle(canvas.width - 45, 45);
  drawReticle(45, canvas.height - 45);
  drawReticle(canvas.width - 45, canvas.height - 45);

  // Header
  ctx.fillStyle = layerType === 'summary' ? '#ebb87e' : layerType === 'risk' ? '#f43f5e' : '#00d2ff';
  ctx.font = 'bold 26px "Space Grotesk", sans-serif';
  
  const titles = {
    original: 'ORIGINAL LEGAL CONTRACT // ARCHIVE v4.2',
    neural: 'AI NEURAL VECTOR PARSER // CLAUSE TOKENS',
    risk: 'RISK SENTINEL // THREAT DETECTION MATRIX',
    summary: 'SYNTHESIS // PLAIN-ENGLISH EXECUTIVE BRIEF',
  };
  ctx.fillText(titles[layerType] || 'LEGAL INTELLIGENCE', 60, 90);

  // Subheader status
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.font = '14px monospace';
  ctx.fillText(`SYSTEM_STATUS: ACTIVE | QUANTUM_HASH: 0x9F4C...B210 | TIMESTAMP: ${new Date().toISOString().slice(0, 10)}`, 60, 120);

  // Divider
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(60, 140);
  ctx.lineTo(canvas.width - 60, 140);
  ctx.stroke();

  // Draw Specific Layer Content
  if (layerType === 'original') {
    // --- LAYER 1: ORIGINAL CONTRACT ---
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('MASTER CLOUD & ARTIFICIAL INTELLIGENCE SERVICES AGREEMENT', 60, 190);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '15px sans-serif';
    ctx.fillText('This Agreement is entered into by and between Enterprise Cloud Inc. ("Company") and', 60, 230);
    ctx.fillText('the Client identified on the applicable Order Form ("Subscriber").', 60, 255);

    // Clause 1
    ctx.fillStyle = 'rgba(0, 210, 255, 0.9)';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('SECTION 4.1: INTELLECTUAL PROPERTY ASSIGNMENT & RETENTION', 60, 310);
    ctx.fillStyle = 'rgba(220, 230, 245, 0.8)';
    ctx.font = '14px sans-serif';
    ctx.fillText('Subscriber retains all right, title, and interest in and to Customer Data provided to the Service.', 60, 340);
    ctx.fillText('Company shall have no ownership stake in proprietary datasets uploaded for processing.', 60, 365);

    // Clause 2 (RISKY)
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('SECTION 14.2: UNILATERAL INDEMNIFICATION & UNCAPPED LIABILITY', 60, 430);
    ctx.fillStyle = 'rgba(220, 230, 245, 0.8)';
    ctx.font = '14px sans-serif';
    ctx.fillText('Subscriber shall indemnify, defend, and hold harmless Company and all parent affiliates from', 60, 460);
    ctx.fillText('and against any and all claims, liabilities, losses, costs (including attorneys fees) arising out of', 60, 485);
    ctx.fillText('any alleged breach or non-performance, notwithstanding any statutory limitations of damages.', 60, 510);

    // Clause 3 (LOCK-IN)
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('SECTION 18.4: AUTOMATIC RENEWAL & 180-DAY CERTIFIED NOTICE', 60, 580);
    ctx.fillStyle = 'rgba(220, 230, 245, 0.8)';
    ctx.font = '14px sans-serif';
    ctx.fillText('This Agreement automatically renews for successive 24-month terms unless formal written notice', 60, 610);
    ctx.fillText('is delivered via certified registered mail no later than 180 calendar days prior to expiration.', 60, 635);

    // Clause 4 (JURISDICTION)
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('SECTION 22.1: BINDING ARBITRATION & JURISDICTION WAIVER', 60, 705);
    ctx.fillStyle = 'rgba(220, 230, 245, 0.8)';
    ctx.font = '14px sans-serif';
    ctx.fillText('All disputes arising out of or related to this Agreement shall be resolved via confidential', 60, 735);
    ctx.fillText('arbitration in Dover, Delaware. Subscriber explicitly waives all rights to jury trial.', 60, 760);

    // Fake lines at bottom representing dense legal text
    for (let i = 0; i < 14; i++) {
      const y = 820 + i * 32;
      ctx.fillStyle = `rgba(255, 255, 255, ${0.15 + (i % 3) * 0.08})`;
      ctx.fillRect(60, y, (canvas.width - 120) * (0.6 + Math.sin(i * 1.5) * 0.35), 10);
    }

    // Signature stamp
    ctx.strokeStyle = 'rgba(0, 210, 255, 0.5)';
    ctx.strokeRect(60, 1300, 240, 70);
    ctx.fillStyle = 'rgba(0, 210, 255, 0.8)';
    ctx.font = '12px monospace';
    ctx.fillText('AUTHORIZED SIGNATURE', 70, 1325);
    ctx.fillText('VERIFIED VIA QUANTUM-KEY', 70, 1350);

  } else if (layerType === 'neural') {
    // --- LAYER 2: AI NEURAL ANALYSIS MATRIX ---
    // Background vector grid
    ctx.strokeStyle = 'rgba(0, 210, 255, 0.1)';
    for (let x = 60; x < canvas.width - 60; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 150); ctx.lineTo(x, canvas.height - 60); ctx.stroke();
    }
    for (let y = 150; y < canvas.height - 60; y += 40) {
      ctx.beginPath(); ctx.moveTo(60, y); ctx.lineTo(canvas.width - 60, y); ctx.stroke();
    }

    // Neural bounding boxes around parsed tokens
    const boxes = [
      { y: 290, h: 90, color: 'rgba(34, 197, 94, 0.3)', border: '#22c55e', text: 'ENTITY_TAG: IP_ASSIGNMENT [CONFIDENCE: 99.8%]' },
      { y: 410, h: 120, color: 'rgba(244, 63, 94, 0.35)', border: '#f43f5e', text: 'ANOMALY_DETECTED: UNILATERAL_INDEMNITY [THREAT: 94/100]' },
      { y: 560, h: 95, color: 'rgba(245, 158, 11, 0.35)', border: '#f59e0b', text: 'TRAP_DETECTED: SNEAKY_AUTORENEWAL [NOTICE: 180_DAYS]' },
      { y: 685, h: 95, color: 'rgba(0, 210, 255, 0.3)', border: '#00d2ff', text: 'JURISDICTION: DELAWARE_ARBITRATION [STANDARD]' },
    ];

    boxes.forEach((b) => {
      ctx.fillStyle = b.color;
      ctx.fillRect(60, b.y, canvas.width - 120, b.h);
      ctx.strokeStyle = b.border;
      ctx.lineWidth = 2;
      ctx.strokeRect(60, b.y, canvas.width - 120, b.h);

      ctx.fillStyle = b.border;
      ctx.font = 'bold 13px monospace';
      ctx.fillText(b.text, 75, b.y + 25);
    });

    // Embedding Vectors Visualizer
    ctx.fillStyle = 'rgba(0, 210, 255, 0.7)';
    ctx.font = '12px monospace';
    ctx.fillText('EMBEDDING_TENSORS: [0.892, -0.142, 0.998, 0.041, -0.652, 0.418, 0.771, 0.309]', 60, 840);
    ctx.fillText('LATENT_SPACE_DISTANCE: 0.0487 (Cosine Match to FTC Restrictive Covenant Benchmark)', 60, 870);

    // Neural node points inside document
    for (let i = 0; i < 30; i++) {
      const nx = 80 + (i * 29) % (canvas.width - 160);
      const ny = 920 + Math.floor(i / 6) * 70;
      ctx.fillStyle = i % 4 === 0 ? '#f43f5e' : i % 3 === 0 ? '#f59e0b' : '#00d2ff';
      ctx.beginPath();
      ctx.arc(nx, ny, 4, 0, Math.PI * 2);
      ctx.fill();

      // Connecting lines
      if (i > 0) {
        ctx.strokeStyle = 'rgba(0, 210, 255, 0.2)';
        ctx.beginPath();
        ctx.moveTo(nx, ny);
        ctx.lineTo(80 + ((i - 1) * 29) % (canvas.width - 160), 920 + Math.floor((i - 1) / 6) * 70);
        ctx.stroke();
      }
    }

  } else if (layerType === 'risk') {
    // --- LAYER 3: RISK DETECTION MATRIX ---
    // Red Alert Banner
    ctx.fillStyle = 'rgba(244, 63, 94, 0.2)';
    ctx.fillRect(60, 170, canvas.width - 120, 80);
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 2;
    ctx.strokeRect(60, 170, canvas.width - 120, 80);

    ctx.fillStyle = '#f43f5e';
    ctx.font = 'bold 22px monospace';
    ctx.fillText('CRITICAL RISK LEVEL: 84 / 100 // 2 HIGH SEVERITY TRAPS', 80, 215);

    // Card 1: Critical Risk
    ctx.fillStyle = 'rgba(244, 63, 94, 0.15)';
    ctx.fillRect(60, 280, canvas.width - 120, 190);
    ctx.strokeStyle = '#f43f5e';
    ctx.strokeRect(60, 280, canvas.width - 120, 190);

    ctx.fillStyle = '#f43f5e';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('⚠️ SEVERITY: HIGH (SCORE 94/100) - SECTION 14.2', 80, 315);
    ctx.fillStyle = '#ffffff';
    ctx.font = '15px sans-serif';
    ctx.fillText('RISK: Unilateral uncapped liability forces you to pay unlimited damages and legal', 80, 350);
    ctx.fillText('fees for any third-party claims without any mutual indemnity protections.', 80, 375);
    ctx.fillStyle = '#ebb87e';
    ctx.font = 'bold 14px monospace';
    ctx.fillText('RECOMMENDED ACTION: Insert mutual liability cap equal to 12 months fees ($50k).', 80, 420);

    // Card 2: Moderate Trap
    ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
    ctx.fillRect(60, 500, canvas.width - 120, 180);
    ctx.strokeStyle = '#f59e0b';
    ctx.strokeRect(60, 500, canvas.width - 120, 180);

    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('⚡ SEVERITY: MEDIUM (SCORE 68/100) - SECTION 18.4', 80, 535);
    ctx.fillStyle = '#ffffff';
    ctx.font = '15px sans-serif';
    ctx.fillText('RISK: 180-day certified mail notice window causes automatic 24-month lock-in.', 80, 570);
    ctx.fillText('Missing this 6-month deadline binds your organization for 2 additional years.', 80, 595);
    ctx.fillStyle = '#ebb87e';
    ctx.font = 'bold 14px monospace';
    ctx.fillText('RECOMMENDED ACTION: Reduce notice window to 30 days via email notice.', 80, 640);

    // Card 3: Safe Clause
    ctx.fillStyle = 'rgba(34, 197, 94, 0.15)';
    ctx.fillRect(60, 710, canvas.width - 120, 140);
    ctx.strokeStyle = '#22c55e';
    ctx.strokeRect(60, 710, canvas.width - 120, 140);

    ctx.fillStyle = '#22c55e';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('✓ SEVERITY: SAFE (SCORE 12/100) - SECTION 4.1', 80, 745);
    ctx.fillStyle = '#ffffff';
    ctx.font = '15px sans-serif';
    ctx.fillText('CONFIRMATION: Standard customer data retention terms. Intellectual property', 80, 780);
    ctx.fillText('remains 100% owned by Subscriber without unpermitted derivative licensing.', 80, 805);

    // Risk Meter Graph
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(60, 880, canvas.width - 120, 30);
    ctx.fillStyle = 'linear-gradient(90deg, #22c55e, #f59e0b, #f43f5e)';
    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(60, 880, (canvas.width - 120) * 0.84, 30);

  } else if (layerType === 'summary') {
    // --- LAYER 4: SIMPLIFIED EXECUTIVE SUMMARY ---
    ctx.fillStyle = 'rgba(235, 184, 126, 0.15)';
    ctx.fillRect(60, 170, canvas.width - 120, 110);
    ctx.strokeStyle = '#ebb87e';
    ctx.lineWidth = 2;
    ctx.strokeRect(60, 170, canvas.width - 120, 110);

    ctx.fillStyle = '#ebb87e';
    ctx.font = 'bold 20px "Space Grotesk", sans-serif';
    ctx.fillText('EXECUTIVE SUMMARY: DO NOT SIGN WITHOUT REDLINES', 80, 210);
    ctx.fillStyle = '#ffffff';
    ctx.font = '15px sans-serif';
    ctx.fillText('This contract contains high financial exposure risks. Total liability is unlimited, and you are', 80, 245);
    ctx.fillText('subject to an aggressive 6-month non-renewal trap that extends lock-in by 24 months.', 80, 268);

    // Key Takeaways
    const takeaways = [
      { title: '1. Liability Cap Missing', desc: 'You are exposed to 100% uncapped damages for any third-party claims.', icon: '✕' },
      { title: '2. 6-Month Trapdoor', desc: 'You must cancel 180 days before expiration by physical certified mail.', icon: '!' },
      { title: '3. IP Ownership Intact', desc: 'Your proprietary algorithms and customer data are properly protected.', icon: '✓' },
      { title: '4. Delaware Arbitration', desc: 'Disputes are held under Delaware rules without class action rights.', icon: 'ℹ' }
    ];

    takeaways.forEach((t, idx) => {
      const y = 310 + idx * 110;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
      ctx.fillRect(60, y, canvas.width - 120, 95);
      ctx.strokeStyle = idx < 2 ? 'rgba(244, 63, 94, 0.5)' : 'rgba(235, 184, 126, 0.4)';
      ctx.strokeRect(60, y, canvas.width - 120, 95);

      ctx.fillStyle = idx === 0 ? '#f43f5e' : idx === 1 ? '#f59e0b' : idx === 2 ? '#22c55e' : '#00d2ff';
      ctx.font = 'bold 16px monospace';
      ctx.fillText(`[${t.icon}] ${t.title}`, 80, y + 35);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = '14px sans-serif';
      ctx.fillText(t.desc, 80, y + 68);
    });

    // Action checklist box
    ctx.fillStyle = 'rgba(0, 210, 255, 0.1)';
    ctx.fillRect(60, 780, canvas.width - 120, 160);
    ctx.strokeStyle = '#00d2ff';
    ctx.strokeRect(60, 780, canvas.width - 120, 160);

    ctx.fillStyle = '#00d2ff';
    ctx.font = 'bold 17px monospace';
    ctx.fillText('LEGAL COPILOT ACTION PLAN', 80, 815);

    ctx.fillStyle = '#ffffff';
    ctx.font = '14px sans-serif';
    ctx.fillText('• Export Automated Redline Diff to Word / PDF', 80, 850);
    ctx.fillText('• Request Clause 14.2 Mutual Indemnity Modification', 80, 880);
    ctx.fillText('• Set Calendar Notification for 30-Day Contract Notice', 80, 910);
  }

  // Scanline overlay across all textures
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  for (let y = 0; y < canvas.height; y += 4) {
    ctx.fillRect(0, y, canvas.width, 2);
  }

  return canvas;
};

const HolographicDocumentScene = () => {
  const containerRef = useRef(null);
  const [viewMode, setViewMode] = useState('exploded'); // 'exploded' | 'stacked' | 'risk_focus' | 'summary_focus'
  const [activeLayer, setActiveLayer] = useState('all');
  const [isScanning, setIsScanning] = useState(true);
  const [telemetry, setTelemetry] = useState({
    clausesScanned: 128,
    riskScore: 84,
    threatsFound: 2,
    safeClauses: 11,
    neuralConfidence: '99.4%',
    throughput: '4.8 GB/s',
    activeNodeInsight: 'Hover over 3D Neural Nodes to inspect real-time legal vector embeddings.'
  });

  const sceneRef = useRef(null);
  const layersRef = useRef([]);
  const laserRef = useRef(null);
  const networkNodesRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const width = container.clientWidth;
    const height = container.clientHeight;
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x020611, 0.032);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0.5, 13.5);

    // 2. High-Performance WebGL Renderer
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

    // 3. Dynamic Lighting & Hologram Glow
    const ambientLight = new THREE.AmbientLight(0x0c1e3d, 1.2);
    scene.add(ambientLight);

    const cyanPoint = new THREE.PointLight(0x00d2ff, 4.5, 30);
    cyanPoint.position.set(-6, 4, 8);
    scene.add(cyanPoint);

    const goldPoint = new THREE.PointLight(0xebb87e, 4, 25);
    goldPoint.position.set(6, -3, 6);
    scene.add(goldPoint);

    const redPoint = new THREE.PointLight(0xf43f5e, 3.5, 20);
    redPoint.position.set(0, 5, 4);
    scene.add(redPoint);

    // Mouse tracking spotlight
    const mouseLight = new THREE.PointLight(0xffffff, 2, 18);
    scene.add(mouseLight);

    // 4. Command Center Floor Grid & Hologram Pedestal
    const gridHelper = new THREE.GridHelper(40, 40, 0x00d2ff, 0x0a2540);
    gridHelper.position.y = -5.5;
    gridHelper.material.opacity = 0.4;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Circular Holographic Radar Ring on Floor
    const radarGeo = new THREE.RingGeometry(4, 4.08, 64);
    const radarMat = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6
    });
    const radarRing = new THREE.Mesh(radarGeo, radarMat);
    radarRing.rotation.x = Math.PI / 2;
    radarRing.position.y = -5.48;
    scene.add(radarRing);

    const radarInnerGeo = new THREE.RingGeometry(7, 7.06, 64);
    const radarInnerRing = new THREE.Mesh(radarInnerGeo, radarMat.clone());
    radarInnerRing.rotation.x = Math.PI / 2;
    radarInnerRing.position.y = -5.48;
    scene.add(radarInnerRing);

    // 5. Main 3D Holographic Legal Document Group
    const documentGroup = new THREE.Group();
    scene.add(documentGroup);

    // Plane geometry for legal document sheets
    const docWidth = 5.2;
    const docHeight = 7.3;
    const docGeo = new THREE.PlaneGeometry(docWidth, docHeight, 32, 32);

    // Layer definitions
    const layerConfigs = [
      { id: 'original', name: 'Original Contract', zOffset: -1.8, rotY: -0.08, color: 0x00d2ff },
      { id: 'neural', name: 'AI Neural Matrix', zOffset: -0.6, rotY: -0.03, color: 0x38bdf8 },
      { id: 'risk', name: 'Risk Detection', zOffset: 0.6, rotY: 0.03, color: 0xf43f5e },
      { id: 'summary', name: 'Simplified Summary', zOffset: 1.8, rotY: 0.08, color: 0xebb87e },
    ];

    const documentMeshes = [];

    layerConfigs.forEach((cfg, index) => {
      const canvas = createDocumentTexture(cfg.id);
      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      const mat = new THREE.MeshPhysicalMaterial({
        map: texture,
        transparent: true,
        opacity: 0.92,
        roughness: 0.15,
        metalness: 0.1,
        transmission: 0.65,
        ior: 1.2,
        reflectivity: 0.8,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.NormalBlending,
      });

      const mesh = new THREE.Mesh(docGeo, mat);
      mesh.position.set(0, 0, cfg.zOffset);
      mesh.rotation.y = cfg.rotY;
      mesh.userData = {
        baseZ: cfg.zOffset,
        baseRotY: cfg.rotY,
        id: cfg.id,
        index
      };

      // Glowing outer rim
      const edgeGeo = new THREE.EdgesGeometry(docGeo);
      const edgeMat = new THREE.LineBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.8
      });
      const wireframe = new THREE.LineSegments(edgeGeo, edgeMat);
      mesh.add(wireframe);

      documentGroup.add(mesh);
      documentMeshes.push(mesh);
    });

    layersRef.current = documentMeshes;

    // 6. Holographic AI Laser Scanning Beam
    const laserWidth = docWidth * 1.08;
    const laserGeo = new THREE.PlaneGeometry(laserWidth, 0.06);
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const laserMesh = new THREE.Mesh(laserGeo, laserMat);
    laserMesh.position.set(0, 0, 0.8);
    documentGroup.add(laserMesh);

    // Laser glow beam curtain
    const beamCurtainGeo = new THREE.PlaneGeometry(laserWidth, 0.8);
    const beamCurtainMat = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const beamCurtain = new THREE.Mesh(beamCurtainGeo, beamCurtainMat);
    beamCurtain.position.set(0, -0.4, 0.8);
    documentGroup.add(beamCurtain);

    laserRef.current = { laserMesh, beamCurtain };

    // 7. Surrounding Neural Intelligence Network (Thousands of Nodes & Connections)
    const nodeCount = 180;
    const nodeGeo = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeColors = new Float32Array(nodeCount * 3);
    const nodeData = [];

    const redColor = new THREE.Color(0xf43f5e);
    const cyanColor = new THREE.Color(0x00d2ff);
    const goldColor = new THREE.Color(0xebb87e);

    for (let i = 0; i < nodeCount; i++) {
      const idx = i * 3;
      // Orbit around the document in 3D ellipsoid space
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 5.2 + Math.random() * 4.5;
      const sinPhi = Math.sin(phi);

      const x = r * sinPhi * Math.cos(theta) * 1.3;
      const y = r * sinPhi * Math.sin(theta) * 0.8;
      const z = r * Math.cos(phi);

      nodePositions[idx] = x;
      nodePositions[idx + 1] = y;
      nodePositions[idx + 2] = z;

      // Assign type: risk (red), safe (cyan), executive (gold)
      const isRisk = i % 5 === 0;
      const isGold = i % 7 === 0;
      const color = isRisk ? redColor : isGold ? goldColor : cyanColor;

      nodeColors[idx] = color.r;
      nodeColors[idx + 1] = color.g;
      nodeColors[idx + 2] = color.b;

      nodeData.push({
        baseX: x,
        baseY: y,
        baseZ: z,
        speed: 0.2 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        isRisk,
        insight: isRisk
          ? `[HIGH RISK NODE #${i}]: Uncapped $2.4M indemnification exposure detected in Clause 14.2`
          : isGold
          ? `[SYNTHESIS NODE #${i}]: Executive summary generated with 99.4% neural confidence`
          : `[VERIFIED SAFE NODE #${i}]: Standard IP ownership clause compliant with industry standards`
      });
    }

    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    nodeGeo.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));

    const nodeMat = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const neuralNetworkPoints = new THREE.Points(nodeGeo, nodeMat);
    scene.add(neuralNetworkPoints);

    // Neural Network Laser Interconnect Lines
    const lineCount = 140;
    const linePositions = new Float32Array(lineCount * 6);
    const lineColors = new Float32Array(lineCount * 6);

    for (let i = 0; i < lineCount; i++) {
      const idx = i * 6;
      const nodeA = Math.floor(Math.random() * nodeCount);
      let nodeB = Math.floor(Math.random() * nodeCount);
      if (nodeA === nodeB) nodeB = (nodeB + 1) % nodeCount;

      linePositions[idx] = nodePositions[nodeA * 3];
      linePositions[idx + 1] = nodePositions[nodeA * 3 + 1];
      linePositions[idx + 2] = nodePositions[nodeA * 3 + 2];

      linePositions[idx + 3] = nodePositions[nodeB * 3];
      linePositions[idx + 4] = nodePositions[nodeB * 3 + 1];
      linePositions[idx + 5] = nodePositions[nodeB * 3 + 2];

      const isRiskLine = nodeData[nodeA].isRisk || nodeData[nodeB].isRisk;
      const c = isRiskLine ? redColor : cyanColor;

      lineColors[idx] = c.r;
      lineColors[idx + 1] = c.g;
      lineColors[idx + 2] = c.b;
      lineColors[idx + 3] = c.r;
      lineColors[idx + 4] = c.g;
      lineColors[idx + 5] = c.b;
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending
    });
    const neuralNetworkLines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(neuralNetworkLines);

    networkNodesRef.current = { nodeData, nodeGeo, neuralNetworkPoints };

    // 8. Mouse & Interactive Raycasting
    let targetMouseX = 0;
    let targetMouseY = 0;
    let windowHalfX = width / 2;
    let windowHalfY = height / 2;

    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const onMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left - windowHalfX;
      const y = event.clientY - rect.top - windowHalfY;
      targetMouseX = (x / windowHalfX);
      targetMouseY = (y / windowHalfY);

      mouseLight.position.set(
        (x / windowHalfX) * 7,
        -(y / windowHalfY) * 6,
        6
      );

      // Raycasting for node hover
      mouseVector.x = ((event.clientX - rect.left) / width) * 2 - 1;
      mouseVector.y = -((event.clientY - rect.top) / height) * 2 + 1;

      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects([neuralNetworkPoints]);

      if (intersects.length > 0 && intersects[0].index !== undefined) {
        const pointIdx = intersects[0].index;
        if (nodeData[pointIdx]) {
          setTelemetry((prev) => ({
            ...prev,
            activeNodeInsight: nodeData[pointIdx].insight
          }));
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      windowHalfX = newW / 2;
      windowHalfY = newH / 2;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', onResize);

    // 9. Animation Engine (60 FPS Locked)
    let animId;
    const clock = new THREE.Clock();
    let scanY = 3.2;
    let scanDir = -1;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Camera Parallax & Inertia
      camera.position.x += (targetMouseX * 1.8 - camera.position.x) * 0.04;
      camera.position.y += (-targetMouseY * 1.2 + 0.4 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Subtle Document Floating Motion
      documentGroup.rotation.y = Math.sin(elapsedTime * 0.4) * 0.06 + (targetMouseX * 0.12);
      documentGroup.rotation.x = Math.cos(elapsedTime * 0.3) * 0.04 + (-targetMouseY * 0.08);
      documentGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.12;

      // Laser Scanner Motion
      if (isScanning && laserRef.current) {
        scanY += scanDir * 0.045;
        if (scanY < -3.4) {
          scanY = -3.4;
          scanDir = 1;
        } else if (scanY > 3.4) {
          scanY = 3.4;
          scanDir = -1;
        }

        laserRef.current.laserMesh.position.y = scanY;
        laserRef.current.beamCurtain.position.y = scanY + (scanDir > 0 ? 0.4 : -0.4);
      }

      // Radar rings rotation
      radarRing.rotation.z = elapsedTime * 0.15;
      radarInnerRing.rotation.z = -elapsedTime * 0.1;

      // Rotate Neural Network
      neuralNetworkPoints.rotation.y = elapsedTime * 0.04;
      neuralNetworkLines.rotation.y = elapsedTime * 0.04;

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
      docGeo.dispose();
      radarGeo.dispose();
      nodeGeo.dispose();
      lineGeo.dispose();
    };
  }, [isScanning]);

  // Handle Layer View Mode Changes with 3D interpolation
  useEffect(() => {
    if (!layersRef.current.length) return;

    layersRef.current.forEach((mesh) => {
      const { id, baseZ, baseRotY } = mesh.userData;
      let targetZ = baseZ;
      let targetRotY = baseRotY;
      let targetOpacity = 0.92;
      let targetScale = 1;

      if (viewMode === 'stacked') {
        targetZ = (mesh.userData.index - 1.5) * 0.12;
        targetRotY = 0;
        targetOpacity = 0.95;
      } else if (viewMode === 'exploded') {
        targetZ = baseZ * 1.5;
        targetRotY = baseRotY * 1.8;
      } else if (viewMode === 'risk_focus') {
        if (id === 'risk') {
          targetZ = 2.2;
          targetScale = 1.08;
          targetOpacity = 1.0;
        } else {
          targetZ = baseZ - 2.0;
          targetOpacity = 0.35;
          targetScale = 0.92;
        }
      } else if (viewMode === 'summary_focus') {
        if (id === 'summary') {
          targetZ = 2.2;
          targetScale = 1.08;
          targetOpacity = 1.0;
        } else {
          targetZ = baseZ - 2.0;
          targetOpacity = 0.35;
          targetScale = 0.92;
        }
      }

      // Smooth transition via JS interpolation / direct update
      mesh.position.z = targetZ;
      mesh.rotation.y = targetRotY;
      mesh.scale.set(targetScale, targetScale, targetScale);
      mesh.material.opacity = targetOpacity;
    });
  }, [viewMode, activeLayer]);

  return (
    <div className="relative w-full h-full min-h-[640px] lg:min-h-[740px] flex items-center justify-center overflow-hidden">
      {/* 3D WebGL Canvas */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0" />

      {/* Top Holographic Telemetry HUD Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="glass-cyber px-4 py-2 rounded-xl flex items-center gap-3 pointer-events-auto border border-cyan-500/30 shadow-[0_0_20px_rgba(0,210,255,0.2)]">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
              3D AI COMMAND CENTER // ONLINE
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              QUANTUM SCANNER: 60 FPS // NEURAL LATENCY: 1.2ms
            </div>
          </div>
        </div>

        {/* 3D Layer View Controls */}
        <div className="glass-cyber px-3 py-1.5 rounded-xl flex items-center gap-2 pointer-events-auto border border-amberAccent-500/30">
          <button
            onClick={() => setViewMode('exploded')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              viewMode === 'exploded'
                ? 'bg-gradient-to-r from-amberAccent-500 to-amber-600 text-slate-950 font-bold shadow-[0_0_15px_rgba(235,184,126,0.4)]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            3D EXPLODED VIEW
          </button>

          <button
            onClick={() => setViewMode('stacked')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              viewMode === 'stacked'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-[0_0_15px_rgba(0,210,255,0.4)]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            STACKED CONTRACT
          </button>

          <button
            onClick={() => setViewMode('risk_focus')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              viewMode === 'risk_focus'
                ? 'bg-rose-500 text-white font-bold shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            RISK ISOLATION
          </button>

          <button
            onClick={() => setViewMode('summary_focus')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              viewMode === 'summary_focus'
                ? 'bg-amberAccent-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(235,184,126,0.4)]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            EXECUTIVE BRIEF
          </button>

          <button
            onClick={() => setIsScanning(!isScanning)}
            title="Toggle Continuous Laser Scanner"
            className={`p-1.5 rounded-lg text-xs font-mono transition-all ${
              isScanning ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Floating 3D Layer Indicators & Legend on Left */}
      <div className="absolute left-4 bottom-8 z-20 hidden md:flex flex-col gap-2 max-w-[280px] pointer-events-none">
        <div className="glass-cyber p-3.5 rounded-2xl border border-slate-700/60 pointer-events-auto backdrop-blur-xl">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-between">
            <span>SPATIAL LAYERS (4)</span>
            <span className="text-cyan-400">DEPTH MAPPED</span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between p-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30">
              <span className="flex items-center gap-2 text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00d2ff]"></span>
                Layer 1: Original Legalese
              </span>
              <span className="text-[10px] text-slate-400">Raw Text</span>
            </div>

            <div className="flex items-center justify-between p-1.5 rounded-lg bg-sky-950/40 border border-sky-500/30">
              <span className="flex items-center gap-2 text-sky-300">
                <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]"></span>
                Layer 2: Neural Vectors
              </span>
              <span className="text-[10px] text-slate-400">Embeddings</span>
            </div>

            <div className="flex items-center justify-between p-1.5 rounded-lg bg-rose-950/40 border border-rose-500/40">
              <span className="flex items-center gap-2 text-rose-300">
                <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e] animate-pulse"></span>
                Layer 3: Risk Sentinel
              </span>
              <span className="text-[10px] text-rose-400 font-bold">Score 84/100</span>
            </div>

            <div className="flex items-center justify-between p-1.5 rounded-lg bg-amber-950/40 border border-amberAccent-500/40">
              <span className="flex items-center gap-2 text-amberAccent-300">
                <span className="w-2 h-2 rounded-full bg-amberAccent-400 shadow-[0_0_8px_#ebb87e]"></span>
                Layer 4: Plain English
              </span>
              <span className="text-[10px] text-amberAccent-400">Executive</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Real-Time AI Telemetry Radar on Right */}
      <div className="absolute right-4 bottom-8 z-20 hidden md:flex flex-col gap-2 max-w-[320px] pointer-events-none">
        <div className="glass-cyber p-4 rounded-2xl border border-cyan-500/40 pointer-events-auto backdrop-blur-xl shadow-[0_0_30px_rgba(0,210,255,0.15)]">
          <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest mb-2 flex items-center justify-between">
            <span>NEURAL RADAR TELEMETRY</span>
            <span className="flex items-center gap-1 text-emerald-400 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              LIVE STREAM
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400">CLAUSES AUDITED</div>
              <div className="text-lg font-mono font-bold text-white">{telemetry.clausesScanned}</div>
            </div>
            <div className="p-2 rounded-xl bg-rose-950/40 border border-rose-500/40">
              <div className="text-[10px] font-mono text-rose-300">RISK INDEX</div>
              <div className="text-lg font-mono font-bold text-rose-400">{telemetry.riskScore} / 100</div>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400">CONFIDENCE</div>
              <div className="text-lg font-mono font-bold text-cyan-400">{telemetry.neuralConfidence}</div>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400">BANDWIDTH</div>
              <div className="text-lg font-mono font-bold text-amberAccent-400">{telemetry.throughput}</div>
            </div>
          </div>

          {/* Dynamic Node Hover Telemetry Readout */}
          <div className="p-2.5 rounded-xl bg-slate-950/90 border border-cyan-500/30 text-[11px] font-mono text-slate-300 leading-relaxed">
            <span className="text-cyan-400 font-bold block mb-1">INTERACTIVE NODE INSPECTOR:</span>
            {telemetry.activeNodeInsight}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolographicDocumentScene;
