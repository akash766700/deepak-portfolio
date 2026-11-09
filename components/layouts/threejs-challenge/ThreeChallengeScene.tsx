"use client";

import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  AX_VERTEX_SHADER,
  INSTANCED_FRAGMENT_SHADER,
  BACKGROUND_VERTEX_SHADER,
  BACKGROUND_FRAGMENT_SHADER,
  GLASS_VERTEX_SHADER,
  GLASS_FRAGMENT_SHADER,
  GROUND_VERTEX_SHADER,
  GROUND_FRAGMENT_SHADER,
  CUSTOM_DEPTH_FRAGMENT_SHADER,
} from "./shaders";

interface ThreeChallengeSceneProps {
  sx?: any;
}

export default function ThreeChallengeScene({ sx }: ThreeChallengeSceneProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // --- 1. Scene, Camera & Renderer ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 30);
    camera.position.set(0, 0, 6.7);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: "high-performance",
      stencil: false,
      alpha: true,
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    renderer.shadowMap.autoUpdate = false;
    renderer.shadowMap.needsUpdate = true;
    // Prevent double-gamma: shader already does pow(rgb, 1.0 / 2.2)
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;

    // --- 2. OrbitControls ---
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // Zoom in / zoom out disabled: ball stays fixed in scale
    controls.enablePan = false;  // Pan disabled: ball stays anchored
    controls.enableRotate = true;// Drag/swipe to rotate the ball

    // --- 3. Textures (Exact reference assets) ---
    const textureLoader = new THREE.TextureLoader();
    const bnoiseTexture = textureLoader.load("/bnoise.png");
    bnoiseTexture.wrapS = THREE.RepeatWrapping;
    bnoiseTexture.wrapT = THREE.RepeatWrapping;
    bnoiseTexture.colorSpace = THREE.NoColorSpace;

    const glassMatcapTexture = textureLoader.load("/glass.png");
    glassMatcapTexture.colorSpace = THREE.LinearSRGBColorSpace;

    // --- 4. Directional Light & Shadow Setup ---
    const lightDir = new THREE.Vector3(-1, 0.8, 0.25).normalize().multiplyScalar(5);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.copy(lightDir);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.bias = -0.0002;
    directionalLight.shadow.normalBias = 0.02;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 20;
    directionalLight.shadow.camera.left = -3;
    directionalLight.shadow.camera.right = 3;
    directionalLight.shadow.camera.top = 3;
    directionalLight.shadow.camera.bottom = -3;
    scene.add(directionalLight);

    // Shared uniforms across instanced mesh and ground shadow plane
    const sphere1Pos = new THREE.Vector3();
    const sphere2Pos = new THREE.Vector3();
    const sphere3Pos = new THREE.Vector3();
    const sphere4Pos = new THREE.Vector3();

    const instancedUniforms = THREE.UniformsUtils.merge([
      THREE.UniformsLib.lights,
      {
        u_scale: { value: 0.06 },
        u_lightPosition: { value: lightDir },
        u_noiseTexture: { value: bnoiseTexture },
        u_noiseTexelSize: { value: new THREE.Vector2(1 / 128, 1 / 128) },
        u_noiseCoordOffset: { value: new THREE.Vector2(0, 0) },
        u_color: {
          value: new THREE.Color().setRGB(250 / 255, 252 / 255, 255 / 255, THREE.LinearSRGBColorSpace),
        },
        u_sphere1Position: { value: sphere1Pos },
        u_sphere2Position: { value: sphere2Pos },
        u_sphere3Position: { value: sphere3Pos },
        u_sphere4Position: { value: sphere4Pos },
      },
    ]);

    // --- 5. Fullscreen Background Plane (Omitted for transparent background overlay) ---
    // Scene background is transparent so Constellation Field shines through behind the 3D ball
    // const bgMesh = new THREE.Mesh(bgGeo, bgMat);
    // scene.add(bgMesh);

    // --- 6. Central Core Sphere ---
    const coreGeo = new THREE.SphereGeometry(1.5, 64, 64);
    const coreMat = new THREE.MeshBasicMaterial({ color: "#25282E" });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.renderOrder = -1;
    scene.add(coreMesh);

    // --- 7. Ground Shadow Plane ---
    const groundGeo = new THREE.PlaneGeometry(8, 8);
    const groundMat = new THREE.ShaderMaterial({
      vertexShader: GROUND_VERTEX_SHADER,
      fragmentShader: GROUND_FRAGMENT_SHADER,
      uniforms: instancedUniforms,
      lights: true,
      transparent: true,
      depthWrite: false,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.set(4, -3, -1.5);
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // --- 8. 3000 Fibonacci Instanced Capsules ---
    const Mx = 3000;
    const baseCapsuleGeo = new THREE.CapsuleGeometry(1, 4, 8, 32);
    baseCapsuleGeo.computeBoundingBox();

    const instancedGeo = new THREE.InstancedBufferGeometry();
    instancedGeo.instanceCount = Mx;
    for (const attrName in baseCapsuleGeo.attributes) {
      instancedGeo.setAttribute(attrName, baseCapsuleGeo.attributes[attrName]);
    }
    if (baseCapsuleGeo.index) {
      instancedGeo.setIndex(baseCapsuleGeo.index);
    }

    const posArray = new Float32Array(Mx * 3);
    const quatArray = new Float32Array(Mx * 4);
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const upVector = new THREE.Vector3(0, 1, 0);
    const sVec = new THREE.Vector3();
    const qObj = new THREE.Quaternion();

    for (let l = 0, c = 0, u = 0; l < Mx; l++, c += 3, u += 4) {
      const e = 1 - (l / (Mx - 1)) * 2;
      const t = Math.sqrt(1 - e * e);
      const d = goldenAngle * l;
      const h = Math.cos(d) * t * 1.5;
      const f = Math.sin(d) * t * 1.5;
      const p = 1.5 * e;
      posArray[c] = h;
      posArray[c + 1] = p;
      posArray[c + 2] = f;
      sVec.set(-h, -p, -f).normalize();
      qObj.setFromUnitVectors(upVector, sVec);
      quatArray[u] = qObj.x;
      quatArray[u + 1] = qObj.y;
      quatArray[u + 2] = qObj.z;
      quatArray[u + 3] = qObj.w;
    }

    instancedGeo.setAttribute("a_instancePos", new THREE.InstancedBufferAttribute(posArray, 3));
    instancedGeo.setAttribute("a_instanceQuaternions", new THREE.InstancedBufferAttribute(quatArray, 4));

    const instancedMat = new THREE.ShaderMaterial({
      vertexShader: AX_VERTEX_SHADER,
      fragmentShader: INSTANCED_FRAGMENT_SHADER,
      uniforms: instancedUniforms,
      lights: true,
    });

    const customDepthMat = new THREE.ShaderMaterial({
      vertexShader: AX_VERTEX_SHADER,
      fragmentShader: CUSTOM_DEPTH_FRAGMENT_SHADER,
      uniforms: instancedUniforms,
      defines: { IS_DEPTH: true },
    });

    const instancedMesh = new THREE.Mesh(instancedGeo, instancedMat);
    instancedMesh.customDepthMaterial = customDepthMat;
    instancedMesh.castShadow = true;
    instancedMesh.receiveShadow = true;
    instancedMesh.renderOrder = 0;
    scene.add(instancedMesh);

    // --- 9. 4 Orbiting Glass Spheres ---
    const orbGeo = new THREE.SphereGeometry(0.3, 64, 64);

    const glassUniforms = THREE.UniformsUtils.merge([
      THREE.UniformsLib.lights,
      {
        u_lightPosition: { value: lightDir },
        u_noiseTexture: { value: bnoiseTexture },
        u_sceneTexture: { value: null },
        u_resolution: { value: new THREE.Vector2(width, height) },
        u_matcap: { value: glassMatcapTexture },
        u_noiseTexelSize: { value: new THREE.Vector2(1 / 128, 1 / 128) },
        u_noiseCoordOffset: { value: new THREE.Vector2(0, 0) },
      },
    ]);

    const glassMat = new THREE.ShaderMaterial({
      vertexShader: GLASS_VERTEX_SHADER,
      fragmentShader: GLASS_FRAGMENT_SHADER,
      uniforms: glassUniforms,
      lights: true,
    });

    const orb1 = new THREE.Mesh(orbGeo, glassMat);
    const orb2 = new THREE.Mesh(orbGeo, glassMat);
    const orb3 = new THREE.Mesh(orbGeo, glassMat);
    const orb4 = new THREE.Mesh(orbGeo, glassMat);

    [orb1, orb2, orb3, orb4].forEach((m) => {
      m.receiveShadow = true;
      m.renderOrder = 1;
    });

    const orbsGroup = new THREE.Group();
    orbsGroup.add(orb1, orb2, orb3, orb4);
    scene.add(orbsGroup);

    // --- 10. Refraction Render Target for Scene Texture ---
    const halfWidth = Math.floor(width / 2);
    const halfHeight = Math.floor(height / 2);
    const sceneRenderTarget = new THREE.WebGLRenderTarget(halfWidth, halfHeight, {
      depthBuffer: true,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
    });
    glassUniforms.u_sceneTexture.value = sceneRenderTarget.texture;

    // --- 11. Orbit Paths Calculation ---
    const orbits = [
      { speed: 1.0, phase: Math.PI / 1.1, plane: "yz", dir: 1 },
      { speed: 0.75, phase: Math.PI / 3.4, plane: "xz", dir: -1 },
      { speed: 0.5, phase: Math.PI / 2.2, plane: "yz", dir: 1 },
      { speed: 1.2, phase: Math.PI / 1.7, plane: "xy", dir: -1 },
    ];
    // Exact radius from reference bundle: r = 1.9 (capsule tips are at 1.9 when uncompressed)
    const orbitRadius = 1.9;

    function calcOrbPos(t: number, o: (typeof orbits)[0]): [number, number, number] {
      const angle = o.dir * o.speed * t + o.phase;
      if (o.plane === "xy") return [Math.cos(angle) * orbitRadius, Math.sin(angle) * orbitRadius, 0];
      if (o.plane === "xz") return [Math.cos(angle) * orbitRadius, 0, Math.sin(angle) * orbitRadius];
      if (o.plane === "yz") return [0, Math.cos(angle) * orbitRadius, Math.sin(angle) * orbitRadius];
      return [Math.cos(angle) * orbitRadius, Math.sin(angle) * orbitRadius, 0];
    }

    // --- 12. Resize Handler ---
    const handleResize = () => {
      if (!container || !renderer) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;

      camera.aspect = width / height;

      // On desktop, project the ball cleanly onto the right side (NO card/box, free floating)
      if (width >= 960) {
        camera.setViewOffset(width, height, -width * 0.28, 0, width, height);
      } else if (width >= 768) {
        camera.setViewOffset(width, height, -width * 0.16, 0, width, height);
      } else {
        camera.clearViewOffset();
      }
      camera.updateProjectionMatrix();

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
      renderer.setSize(width, height);

      const rW = Math.floor(width / 2);
      const rH = Math.floor(height / 2);
      sceneRenderTarget.setSize(rW, rH);
      glassUniforms.u_resolution.value.set(rW, rH);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // --- 13. Animation Loop ---
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Compute 4 orb positions
      const p1 = calcOrbPos(elapsedTime, orbits[0]);
      const p2 = calcOrbPos(elapsedTime, orbits[1]);
      const p3 = calcOrbPos(elapsedTime, orbits[2]);
      const p4 = calcOrbPos(elapsedTime, orbits[3]);

      orb1.position.set(p1[0], p1[1], p1[2]);
      orb2.position.set(p2[0], p2[1], p2[2]);
      orb3.position.set(p3[0], p3[1], p3[2]);
      orb4.position.set(p4[0], p4[1], p4[2]);

      // Directly update the shader uniforms with the live sphere coordinates
      instancedUniforms.u_sphere1Position.value.copy(orb1.position);
      instancedUniforms.u_sphere2Position.value.copy(orb2.position);
      instancedUniforms.u_sphere3Position.value.copy(orb3.position);
      instancedUniforms.u_sphere4Position.value.copy(orb4.position);

      // Keep noise coordinate static for calm, non-flickering, non-tearing smooth shadows
      instancedUniforms.u_noiseCoordOffset.value.set(0, 0);
      glassUniforms.u_noiseCoordOffset.value.set(0, 0);

      // OrbitControls update
      controls.update();

      // Pass 1: Render refraction texture pass (hide orbs so they don't refract themselves)
      // autoUpdate is false and needsUpdate is false, skipping the shadow map depth render!
      orbsGroup.visible = false;
      renderer.setRenderTarget(sceneRenderTarget);
      renderer.render(scene, camera);
      renderer.setRenderTarget(null);
      orbsGroup.visible = true;

      // Pass 2: Main screen render with native hardware 4x MSAA anti-aliasing
      // needsUpdate = true triggers a single shadow map update for this frame
      renderer.shadowMap.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    // --- 14. Cleanup ---
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      controls.dispose();

      coreGeo.dispose();
      coreMat.dispose();
      groundGeo.dispose();
      groundMat.dispose();
      baseCapsuleGeo.dispose();
      instancedGeo.dispose();
      instancedMat.dispose();
      customDepthMat.dispose();
      orbGeo.dispose();
      glassMat.dispose();
      sceneRenderTarget.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        ...sx,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          outline: "none",
        }}
      />
    </Box>
  );
}

