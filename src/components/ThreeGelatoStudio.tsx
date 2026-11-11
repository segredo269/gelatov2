import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { FLAVORS_3D, Flavor3D, TOPPING_OPTIONS } from '../data/iceCreamData';
import { Sparkles, Eye, RotateCw, Layers, Check, ShoppingBag, ChevronDown, ChevronUp } from 'lucide-react';

interface ThreeGelatoStudioProps {
  onAddCustomGelato?: (gelatoItem: {
    name: string;
    flavor1: string;
    flavor2: string;
    toppings: string[];
    price: number;
  }) => void;
}

export function ThreeGelatoStudio({ onAddCustomGelato }: ThreeGelatoStudioProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  // Studio Interactive State
  const [selectedBottomFlavor, setSelectedBottomFlavor] = useState<Flavor3D>(FLAVORS_3D[0]); // Pistache
  const [selectedTopFlavor, setSelectedTopFlavor] = useState<Flavor3D>(FLAVORS_3D[1]); // Chocolate Belga
  const [activeToppings, setActiveToppings] = useState<string[]>(['fudge', 'pistachio-crunch', 'wafer-straw']);
  const [explodedView, setExplodedView] = useState<number>(0); // 0 to 1
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  // Three.js mutable state refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const partsRef = useRef<{
    bottomScoop?: THREE.Mesh;
    topScoop?: THREE.Mesh;
    coneGroup?: THREE.Group;
    sauceMesh?: THREE.Mesh;
    nutsGroup?: THREE.Group;
    waferMesh?: THREE.Mesh;
    berryMesh?: THREE.Group;
  }>({});

  const explodedValRef = useRef(0);
  explodedValRef.current = explodedView;

  // Toggle Topping
  const toggleTopping = (id: string) => {
    setActiveToppings(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  // Calculate customized gelato price
  const basePrice = 18.00;
  const toppingsPrice = activeToppings.reduce((acc, tId) => {
    const found = TOPPING_OPTIONS.find(t => t.id === tId);
    return acc + (found?.extra || 0);
  }, 0);
  const totalPrice = basePrice + toppingsPrice;

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (onAddCustomGelato) {
      onAddCustomGelato({
        name: `Cone Mestre 3D: ${selectedBottomFlavor.name} & ${selectedTopFlavor.name}`,
        flavor1: selectedBottomFlavor.name,
        flavor2: selectedTopFlavor.name,
        toppings: activeToppings.map(t => TOPPING_OPTIONS.find(o => o.id === t)?.name || t),
        price: totalPrice
      });
      setAddedNotice(true);
      setTimeout(() => setAddedNotice(false), 2400);
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Detect Software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 2. Setup Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x1a1512); // Deep rich cocoa artisanal background
    scene.fog = new THREE.FogExp2(0x1a1512, 0.04);

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 1.8, 4.6);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.replaceChildren(renderer.domElement);

    // 3. Mandatory Studio Room Environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Studio Lighting Rig (Warm Key + Cool Fill + Rim)
    const keyLight = new THREE.DirectionalLight(0xfff5ea, 2.2);
    keyLight.position.set(3, 5, 4);
    keyLight.castShadow = !isSoftwareGl;
    if (!isSoftwareGl) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 15;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const hemiLight = new THREE.HemisphereLight(0xffedd5, 0x443322, 0.9);
    scene.add(hemiLight);

    const rimLight = new THREE.DirectionalLight(0xfdba74, 1.4);
    rimLight.position.set(-3, 3, -4);
    scene.add(rimLight);

    // 5. Procedural Texture Helpers (Zero external files / 0 broken URLs)
    // Procedural Waffle Grid Texture
    const createWaffleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d')!;

      // Baked golden base
      ctx.fillStyle = '#c58b43';
      ctx.fillRect(0, 0, 256, 256);

      // Grid diamond pattern
      ctx.strokeStyle = '#85511b';
      ctx.lineWidth = 4;
      for (let i = -256; i <= 512; i += 24) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + 256, 256);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(i, 256);
        ctx.lineTo(i + 256, 0);
        ctx.stroke();
      }

      // Highlights inside cells
      ctx.fillStyle = '#e4ab5d';
      for (let x = 12; x < 256; x += 24) {
        for (let y = 12; y < 256; y += 24) {
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(4, 6);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return texture;
    };

    // Procedural Wafer Spiral Straw Texture
    const createWaferStrawTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 256;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#f3ca87';
      ctx.fillRect(0, 0, 128, 256);

      ctx.fillStyle = '#7a3c10';
      for (let y = -256; y <= 512; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(128, y + 64);
        ctx.lineTo(128, y + 80);
        ctx.lineTo(0, y + 16);
        ctx.closePath();
        ctx.fill();
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 2);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };

    // Procedural Radial Contact Shadow Texture
    const createShadowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d')!;
      const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
      grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.35)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);

      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    const waffleTex = createWaffleTexture();
    const waferStrawTex = createWaferStrawTexture();
    const shadowTex = createShadowTexture();

    // 6. BUILD PROCEDURAL 3–12 PART ARTISAN GELATO CONE (Group)
    const gelatoMasterGroup = new THREE.Group();
    gelatoMasterGroup.position.set(0, -0.1, 0);
    scene.add(gelatoMasterGroup);

    // Part 1 & 2: Waffle Cone & Waffle Collar
    const coneGroup = new THREE.Group();
    partsRef.current.coneGroup = coneGroup;
    gelatoMasterGroup.add(coneGroup);

    // Cone main body (Lathe geometry for organic handcrafted taper)
    const conePoints = [
      new THREE.Vector2(0.04, -1.1),
      new THREE.Vector2(0.2, -0.6),
      new THREE.Vector2(0.38, 0.0),
      new THREE.Vector2(0.44, 0.3),
      new THREE.Vector2(0.45, 0.34)
    ];
    const coneGeo = new THREE.LatheGeometry(conePoints, 32);
    coneGeo.computeVertexNormals();

    const coneMat = new THREE.MeshStandardMaterial({
      map: waffleTex,
      roughness: 0.72,
      metalness: 0.04,
      bumpMap: waffleTex,
      bumpScale: 0.02
    });
    const coneMesh = new THREE.Mesh(coneGeo, coneMat);
    coneMesh.castShadow = !isSoftwareGl;
    coneMesh.receiveShadow = !isSoftwareGl;
    coneGroup.add(coneMesh);

    // Cone decorative rolled rim collar
    const rimGeo = new THREE.TorusGeometry(0.44, 0.035, 16, 32);
    rimGeo.rotateX(Math.PI / 2);
    rimGeo.translate(0, 0.33, 0);
    const rimMesh = new THREE.Mesh(rimGeo, coneMat);
    rimMesh.castShadow = !isSoftwareGl;
    coneGroup.add(rimMesh);

    // Helper: Sculpted Artisan Gelato Scoop Geometry (Sphere with noise ripples)
    const createScoopGeometry = (radius: number, segments: number) => {
      const geo = new THREE.SphereGeometry(radius, segments, segments);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const z = pos.getZ(i);
        // Organic gelato ripples & natural scoop swirl
        const displacement =
          Math.sin(x * 9.0) * Math.cos(z * 9.0) * 0.025 +
          Math.sin(y * 12.0) * 0.015 +
          Math.cos(x * 15.0 + y * 8.0) * 0.012;
        pos.setXYZ(i, x * (1 + displacement), y * (1 + displacement), z * (1 + displacement));
      }
      geo.computeVertexNormals();
      return geo;
    };

    // Part 3: Bottom Scoop (e.g. Pistache)
    const bottomScoopGeo = createScoopGeometry(0.46, 32);
    const bottomScoopMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(selectedBottomFlavor.hex),
      roughness: selectedBottomFlavor.roughness,
      metalness: selectedBottomFlavor.metalness,
      clearcoat: 0.3,
      clearcoatRoughness: 0.4
    });
    const bottomScoopMesh = new THREE.Mesh(bottomScoopGeo, bottomScoopMat);
    bottomScoopMesh.position.set(0, 0.58, 0);
    bottomScoopMesh.castShadow = !isSoftwareGl;
    bottomScoopMesh.receiveShadow = !isSoftwareGl;
    partsRef.current.bottomScoop = bottomScoopMesh;
    gelatoMasterGroup.add(bottomScoopMesh);

    // Bottom scoop melted skirt fringe
    const skirtGeo = new THREE.TorusGeometry(0.42, 0.06, 12, 28);
    skirtGeo.rotateX(Math.PI / 2);
    const skirtMesh = new THREE.Mesh(skirtGeo, bottomScoopMat);
    skirtMesh.position.set(0, 0.4, 0);
    bottomScoopMesh.add(skirtMesh);

    // Part 4: Top Scoop (e.g. Chocolate Belga)
    const topScoopGeo = createScoopGeometry(0.40, 32);
    const topScoopMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(selectedTopFlavor.hex),
      roughness: selectedTopFlavor.roughness,
      metalness: selectedTopFlavor.metalness,
      clearcoat: 0.4,
      clearcoatRoughness: 0.3
    });
    const topScoopMesh = new THREE.Mesh(topScoopGeo, topScoopMat);
    topScoopMesh.position.set(0.04, 1.15, 0.02);
    topScoopMesh.castShadow = !isSoftwareGl;
    topScoopMesh.receiveShadow = !isSoftwareGl;
    partsRef.current.topScoop = topScoopMesh;
    gelatoMasterGroup.add(topScoopMesh);

    // Part 5: Rich Ganache / Chocolate Fudge Drip (shiny liquid clearcoat)
    const sauceCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.05, 1.48, 0.0),
      new THREE.Vector3(0.18, 1.36, 0.18),
      new THREE.Vector3(0.32, 1.15, 0.22),
      new THREE.Vector3(0.38, 0.95, 0.21),
      new THREE.Vector3(0.36, 0.78, 0.18),
      new THREE.Vector3(0.38, 0.65, 0.15)
    ]);
    const sauceGeo = new THREE.TubeGeometry(sauceCurve, 24, 0.04, 8, false);
    const sauceMat = new THREE.MeshPhysicalMaterial({
      color: 0x220c06,
      roughness: 0.12,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08
    });
    const sauceMesh = new THREE.Mesh(sauceGeo, sauceMat);
    sauceMesh.castShadow = !isSoftwareGl;
    partsRef.current.sauceMesh = sauceMesh;
    gelatoMasterGroup.add(sauceMesh);

    // Additional drip droplet at bottom of scoop
    const dropGeo = new THREE.SphereGeometry(0.05, 12, 12);
    dropGeo.scale(1, 1.4, 1);
    const dropMesh = new THREE.Mesh(dropGeo, sauceMat);
    dropMesh.position.set(0.38, 0.61, 0.15);
    sauceMesh.add(dropMesh);

    // Part 6: Roasted Pistachio / Nut Nibs Group (Scatter on top scoop)
    const nutsGroup = new THREE.Group();
    const nutGeo = new THREE.DodecahedronGeometry(0.024, 0);
    const nutMat = new THREE.MeshStandardMaterial({
      color: 0x98b843,
      roughness: 0.85,
      metalness: 0.02
    });
    const nutChocolateMat = new THREE.MeshStandardMaterial({
      color: 0x482414,
      roughness: 0.75,
      metalness: 0.05
    });

    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2 + (Math.random() * 0.4);
      const rad = 0.22 + Math.random() * 0.15;
      const heightOffset = 1.35 + Math.random() * 0.14 - (rad * 0.4);
      const piece = new THREE.Mesh(nutGeo, i % 2 === 0 ? nutMat : nutChocolateMat);
      piece.position.set(Math.cos(angle) * rad, heightOffset, Math.sin(angle) * rad);
      piece.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
      piece.scale.set(1 + Math.random() * 0.5, 0.8 + Math.random() * 0.5, 1);
      piece.castShadow = !isSoftwareGl;
      nutsGroup.add(piece);
    }
    partsRef.current.nutsGroup = nutsGroup;
    gelatoMasterGroup.add(nutsGroup);

    // Part 7: Wafer Straw / Rolled Biscuit
    const waferGeo = new THREE.CylinderGeometry(0.038, 0.038, 0.85, 16);
    const waferMat = new THREE.MeshStandardMaterial({
      map: waferStrawTex,
      roughness: 0.65,
      metalness: 0.02
    });
    const waferMesh = new THREE.Mesh(waferGeo, waferMat);
    waferMesh.position.set(-0.25, 1.35, 0.15);
    waferMesh.rotation.set(0.35, 0.2, 0.45);
    waferMesh.castShadow = !isSoftwareGl;
    partsRef.current.waferMesh = waferMesh;
    gelatoMasterGroup.add(waferMesh);

    // Part 8: Fresh Strawberry Berry Accent
    const berryGroup = new THREE.Group();
    const berryGeo = new THREE.ConeGeometry(0.09, 0.18, 16);
    berryGeo.rotateX(Math.PI);
    const berryMat = new THREE.MeshPhysicalMaterial({
      color: 0xdf1c3d,
      roughness: 0.35,
      clearcoat: 0.7,
      clearcoatRoughness: 0.25
    });
    const berryBody = new THREE.Mesh(berryGeo, berryMat);
    berryGroup.add(berryBody);

    // Leaf cap on strawberry
    const leafGeo = new THREE.CylinderGeometry(0.06, 0.01, 0.015, 6);
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x228b22, roughness: 0.6 });
    const leafMesh = new THREE.Mesh(leafGeo, leafMat);
    leafMesh.position.set(0, 0.09, 0);
    berryGroup.add(leafMesh);

    berryGroup.position.set(0.18, 1.48, -0.12);
    berryGroup.rotation.set(0.2, 0.4, -0.3);
    berryGroup.castShadow = !isSoftwareGl;
    partsRef.current.berryMesh = berryGroup;
    gelatoMasterGroup.add(berryGroup);

    // Part 9: Grounding Radial Contact Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(2.4, 2.4);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.55
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.11;
    scene.add(shadowMesh);

    // 7. Orbit Controls & Camera Interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2.4;
    controls.maxDistance = 6.5;
    controls.maxPolarAngle = Math.PI / 2 + 0.1; // Don't flip under the floor
    controls.target.set(0, 0.5, 0);
    controlsRef.current = controls;

    let isUserInteracting = false;
    controls.addEventListener('start', () => {
      isUserInteracting = true;
    });
    controls.addEventListener('end', () => {
      isUserInteracting = false;
    });

    // 8. Animation Render Loop with Lossless Pacing & Damping
    let frameId = 0;
    const clock = new THREE.Clock();

    function tick() {
      const delta = clock.getDelta();

      // Exponential damping on exploded view positions
      const curExploded = explodedValRef.current;

      if (partsRef.current.coneGroup) {
        partsRef.current.coneGroup.position.y = THREE.MathUtils.damp(
          partsRef.current.coneGroup.position.y,
          -curExploded * 0.45,
          8,
          delta
        );
      }
      if (partsRef.current.bottomScoop) {
        partsRef.current.bottomScoop.position.y = THREE.MathUtils.damp(
          partsRef.current.bottomScoop.position.y,
          0.58 + curExploded * 0.15,
          8,
          delta
        );
      }
      if (partsRef.current.topScoop) {
        partsRef.current.topScoop.position.y = THREE.MathUtils.damp(
          partsRef.current.topScoop.position.y,
          1.15 + curExploded * 0.65,
          8,
          delta
        );
      }
      if (partsRef.current.sauceMesh) {
        partsRef.current.sauceMesh.position.y = THREE.MathUtils.damp(
          partsRef.current.sauceMesh.position.y,
          curExploded * 0.72,
          8,
          delta
        );
      }
      if (partsRef.current.nutsGroup) {
        partsRef.current.nutsGroup.position.y = THREE.MathUtils.damp(
          partsRef.current.nutsGroup.position.y,
          curExploded * 0.85,
          8,
          delta
        );
      }
      if (partsRef.current.waferMesh) {
        partsRef.current.waferMesh.position.y = THREE.MathUtils.damp(
          partsRef.current.waferMesh.position.y,
          1.35 + curExploded * 0.95,
          8,
          delta
        );
      }
      if (partsRef.current.berryMesh) {
        partsRef.current.berryMesh.position.y = THREE.MathUtils.damp(
          partsRef.current.berryMesh.position.y,
          1.48 + curExploded * 1.1,
          8,
          delta
        );
      }

      // Smooth auto-rotation if enabled and user is not actively dragging
      if (autoRotate && !isUserInteracting) {
        gelatoMasterGroup.rotation.y += delta * 0.35;
      }

      controls.update();
      renderer.render(scene, camera);

      frameId = requestAnimationFrame(tick);
    }

    tick();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 10. Clean Cleanup on Unmount
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      coneGeo.dispose();
      bottomScoopGeo.dispose();
      topScoopGeo.dispose();
      waffleTex.dispose();
      waferStrawTex.dispose();
      shadowTex.dispose();
    };
  }, []);

  // Update materials when flavor states change
  useEffect(() => {
    if (partsRef.current.bottomScoop) {
      const mat = partsRef.current.bottomScoop.material as THREE.MeshPhysicalMaterial;
      if (mat) {
        mat.color.set(selectedBottomFlavor.hex);
        mat.roughness = selectedBottomFlavor.roughness;
        mat.metalness = selectedBottomFlavor.metalness;
        mat.needsUpdate = true;
      }
    }
  }, [selectedBottomFlavor]);

  useEffect(() => {
    if (partsRef.current.topScoop) {
      const mat = partsRef.current.topScoop.material as THREE.MeshPhysicalMaterial;
      if (mat) {
        mat.color.set(selectedTopFlavor.hex);
        mat.roughness = selectedTopFlavor.roughness;
        mat.metalness = selectedTopFlavor.metalness;
        mat.needsUpdate = true;
      }
    }
  }, [selectedTopFlavor]);

  // Update Toppings visibility
  useEffect(() => {
    if (partsRef.current.sauceMesh) {
      partsRef.current.sauceMesh.visible = activeToppings.includes('fudge') || activeToppings.includes('caramel');
    }
    if (partsRef.current.nutsGroup) {
      partsRef.current.nutsGroup.visible = activeToppings.includes('pistachio-crunch');
    }
    if (partsRef.current.waferMesh) {
      partsRef.current.waferMesh.visible = activeToppings.includes('wafer-straw');
    }
    if (partsRef.current.berryMesh) {
      partsRef.current.berryMesh.visible = activeToppings.includes('strawberry-fresh');
    }
  }, [activeToppings]);

  return (
    <section id="studio-3d" className="relative w-full bg-[#181412] text-amber-50 py-16 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
          <span>Studio 3D Interativo</span>
          <span aria-hidden="true">·</span>
          <span>Fórmula Balanceada</span>
          <span aria-hidden="true">·</span>
          <span>Tradição Mestre Sorveteiro</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-amber-50 tracking-tight mb-4">
          Monte & Inspecione Seu Gelato em 3D
        </h2>
        <p className="max-w-2xl mx-auto text-stone-300 text-sm md:text-base">
          Gire 360°, escolha a combinação de bolas artesanais, caldas e toppings crocantes, ou ative a visão explodida para conferir o balanceamento de cada camada.
        </p>
      </div>

      {/* Main 3D Viewport Box */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative w-full h-[620px] md:h-[680px] rounded-3xl overflow-hidden border border-amber-900/40 shadow-2xl bg-[#14100e]">
          {/* Stable WebGL Ref Container */}
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Minimal Specs Badge (Top-Left) */}
          <div className="absolute top-6 left-6 pointer-events-none flex flex-col gap-1.5 z-10">
            <div className="bg-stone-900/90 text-stone-200 border border-stone-800 rounded-xl px-4 py-2.5 backdrop-blur-none shadow-lg">
              <div className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold">
                Composição do Gelato
              </div>
              <div className="text-sm font-semibold text-stone-100 flex items-center gap-2">
                <span>{selectedTopFlavor.name}</span>
                <span className="text-stone-500">+</span>
                <span>{selectedBottomFlavor.name}</span>
              </div>
              <div className="text-xs text-stone-400 flex items-center gap-3 mt-1 font-mono tabular-nums">
                <span>Gordura: {selectedTopFlavor.fatPercent}</span>
                <span>·</span>
                <span>Açúcares: {selectedTopFlavor.sugarPercent}</span>
                <span>·</span>
                <span>Cascão Waffle 100% Artesanal</span>
              </div>
            </div>
          </div>

          {/* Quick Turntable / Camera Action (Top-Right) */}
          <div className="absolute top-6 right-6 flex items-center gap-2 z-10">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              aria-label="Alternar rotação 360 graus"
              className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                autoRotate
                  ? 'bg-amber-600 text-white border-amber-500 shadow-md'
                  : 'bg-stone-900/90 text-stone-300 border-stone-800 hover:text-white'
              }`}
              title="Girar 360°"
            >
              <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            </button>
          </div>

          {/* Collapsible Ergonomic Bottom Control Dock (Compliant with <= 15% footprint & solid rgba surfaces) */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 z-20 pointer-events-auto">
            {/* Collapse / Expand Toggle Button */}
            <div className="flex justify-center mb-2">
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium bg-stone-900 text-stone-200 border border-stone-800 hover:bg-stone-800 transition-colors shadow-lg"
              >
                {isCollapsed ? (
                  <>
                    <ChevronUp className="w-3.5 h-3.5 text-amber-400" />
                    <span>Expandir Controles do Studio</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3.5 h-3.5 text-amber-400" />
                    <span>Ocultar Painel para Ver Gelato</span>
                  </>
                )}
              </button>
            </div>

            {/* Dock Content Panel */}
            {!isCollapsed && (
              <div className="bg-[#1c1714] border border-amber-900/50 rounded-2xl p-4 md:p-5 shadow-2xl text-stone-200 transition-all">
                {/* 3 Columns / Tabs inside Dock */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4">
                  {/* Column 1: Bola de Cima */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-amber-400 font-semibold mb-2">
                      1. Bola Superior
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {FLAVORS_3D.map(f => (
                        <button
                          key={`top-${f.id}`}
                          onClick={() => setSelectedTopFlavor(f)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                            selectedTopFlavor.id === f.id
                              ? 'bg-amber-600 text-white shadow-sm ring-1 ring-amber-400'
                              : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700 hover:text-white'
                          }`}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/30"
                            style={{ backgroundColor: f.hex }}
                          />
                          <span className="truncate max-w-[110px]">{f.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Column 2: Bola de Baixo */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-amber-400 font-semibold mb-2">
                      2. Bola da Base
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {FLAVORS_3D.map(f => (
                        <button
                          key={`bottom-${f.id}`}
                          onClick={() => setSelectedBottomFlavor(f)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                            selectedBottomFlavor.id === f.id
                              ? 'bg-amber-600 text-white shadow-sm ring-1 ring-amber-400'
                              : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700 hover:text-white'
                          }`}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/30"
                            style={{ backgroundColor: f.hex }}
                          />
                          <span className="truncate max-w-[110px]">{f.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Column 3: Toppings & Finalização */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-amber-400 font-semibold mb-2">
                      3. Coberturas & Toppings
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {TOPPING_OPTIONS.map(top => {
                        const active = activeToppings.includes(top.id);
                        return (
                          <button
                            key={top.id}
                            onClick={() => toggleTopping(top.id)}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                              active
                                ? 'bg-amber-700/80 text-amber-100 ring-1 ring-amber-500'
                                : 'bg-stone-800/60 text-stone-400 hover:text-stone-200'
                            }`}
                          >
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: top.color }}
                            />
                            <span>{top.name}</span>
                            {active && <Check className="w-3 h-3 text-amber-300 ml-0.5" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Bottom Dock Control Strip */}
                <div className="pt-3 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  {/* Exploded View Slider */}
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <span className="text-xs text-stone-400 flex items-center gap-1.5 whitespace-nowrap">
                      <Layers className="w-3.5 h-3.5 text-amber-400" />
                      Visão Explodida:
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={explodedView}
                      onChange={e => setExplodedView(parseFloat(e.target.value))}
                      className="w-28 sm:w-36 accent-amber-500 h-1.5 bg-stone-700 rounded-lg cursor-pointer"
                      title="Deslize para separar as camadas da receita"
                    />
                    <span className="text-xs font-mono text-amber-300 tabular-nums">
                      {Math.round(explodedView * 100)}%
                    </span>
                  </div>

                  {/* Price & Add to Cart Action */}
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                    <div className="text-right">
                      <div className="text-[10px] uppercase text-stone-400">Total do Cascão</div>
                      <div className="text-lg font-bold text-amber-400 font-mono tabular-nums">
                        R$ {totalPrice.toFixed(2).replace('.', ',')}
                      </div>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md active:scale-95 whitespace-nowrap"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>{addedNotice ? 'Adicionado ao Pedido!' : 'Quero Este Gelato'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
