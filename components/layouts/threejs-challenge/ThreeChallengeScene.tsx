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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
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
    controls.dampingFactor = 0.12;
    controls.rotateSpeed = 1.0;
    controls.enableZoom = false; // Zoom in / zoom out disabled: ball stays fixed in scale
    controls.enablePan = false;  // Pan disabled: ball stays anchored
    controls.enableRotate = true;// Drag/swipe to rotate the ball
    controls.autoRotate = true;  // Big ball rotates smoothly and steadily
    controls.autoRotateSpeed = 1.5; // Ambient rotation speed adjusted to 1.5 as requested

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
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
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
          value: new THREE.Color().setRGB(1.0, 1.0, 1.0, THREE.LinearSRGBColorSpace),
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
    const coreGeo = new THREE.SphereGeometry(1.5, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({ color: "#E2E8F0" });
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
    const baseCapsuleGeo = new THREE.CapsuleGeometry(1, 4, 4, 16);
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
    const colorArray = new Float32Array(Mx * 3);
    colorArray.fill(1.0); // Default all capsules to crisp white (1, 1, 1)

    // 11 Golden accent dots using the heading gradient colors (#D97706, #F59E0B, #FFB330)
    const goldGradientPalette = [
      [1.0, 0.702, 0.188],  // #FFB330 (Saffron Highlight)
      [0.961, 0.620, 0.043], // #F59E0B (Vibrant 24K Gold)
      [0.851, 0.467, 0.024], // #D97706 (Rich Amber Gold)
    ];

    const goldDotIndices = [240, 580, 890, 1180, 1420, 1650, 1920, 2180, 2450, 2680, 2850];
    goldDotIndices.forEach((idx, i) => {
      const c = idx * 3;
      const col = goldGradientPalette[i % goldGradientPalette.length];
      colorArray[c] = col[0];
      colorArray[c + 1] = col[1];
      colorArray[c + 2] = col[2];
    });

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
    instancedGeo.setAttribute("a_instanceColor", new THREE.InstancedBufferAttribute(colorArray, 3));

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
    const orbGeo = new THREE.SphereGeometry(0.3, 32, 32);

    const glassUniforms = THREE.UniformsUtils.merge([
      THREE.UniformsLib.lights,
      {
        u_lightPosition: { value: lightDir },
        u_noiseTexture: { value: bnoiseTexture },
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

    // --- 10. Kinetic Bouncing Glass Orbs Simulation ---
    // 4 orbital circles across the sphere surface with dynamic collision bounce
    const orbTracks = [
      {
        angle: 0.0,
        speed: 1.05,
        dir: 1.0,
        cooldown: 0,
        u: new THREE.Vector3(1, 0, 0),
        v: new THREE.Vector3(0, Math.cos(0.45), Math.sin(0.45)), // inclined ~26 deg
      },
      {
        angle: Math.PI * 0.45,
        speed: 0.95,
        dir: -1.0,
        cooldown: 0,
        u: new THREE.Vector3(0, 1, 0),
        v: new THREE.Vector3(Math.cos(-0.55), 0, Math.sin(-0.55)), // inclined ~32 deg
      },
      {
        angle: Math.PI * 1.10,
        speed: 1.10,
        dir: 1.0,
        cooldown: 0,
        u: new THREE.Vector3(0, 0, 1),
        v: new THREE.Vector3(Math.cos(0.65), Math.sin(0.65), 0), // inclined ~37 deg
      },
      {
        angle: Math.PI * 1.65,
        speed: 1.0,
        dir: -1.0,
        cooldown: 0,
        u: new THREE.Vector3(1, 0, 1).normalize(),
        v: new THREE.Vector3(-1, 2, 1).normalize(), // diagonal polar incline
      },
    ];

    const orbitRadius = 1.9;
    const orbsList = [orb1, orb2, orb3, orb4];
    const COLLISION_DIST = 0.65; // Each orb radius = 0.3 (0.60 is contact threshold)
    const COLLISION_DIST_SQ = COLLISION_DIST * COLLISION_DIST;

    let shadowFrames = 0;

    // --- 11. Resize Handler ---
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

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(width, height);
      shadowFrames = 0; // Refresh shadow buffer on viewport shift
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // --- 12. Animation Loop ---
    let animId: number;
    let prevTime = performance.now();

    const animate = (time: number) => {
      animId = requestAnimationFrame(animate);

      // Clamp delta time to avoid large jumps if tab is backgrounded
      const dt = Math.min(0.04, (time - prevTime) * 0.001);
      prevTime = time;

      // 1. Advance each orb along its orbital track
      for (let i = 0; i < 4; i++) {
        const track = orbTracks[i];
        track.angle += track.dir * track.speed * dt;
        track.cooldown = Math.max(0, track.cooldown - dt);

        const c = Math.cos(track.angle) * orbitRadius;
        const s = Math.sin(track.angle) * orbitRadius;
        orbsList[i].position.set(
          track.u.x * c + track.v.x * s,
          track.u.y * c + track.v.y * s,
          track.u.z * c + track.v.z * s
        );
      }

      // 2. Dynamic Kinetic Bounce: When two small balls touch, they bounce and reverse direction!
      for (let i = 0; i < 4; i++) {
        for (let j = i + 1; j < 4; j++) {
          const pA = orbsList[i].position;
          const pB = orbsList[j].position;
          const dx = pA.x - pB.x;
          const dy = pA.y - pB.y;
          const dz = pA.z - pB.z;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < COLLISION_DIST_SQ) {
            const trackA = orbTracks[i];
            const trackB = orbTracks[j];

            if (trackA.cooldown <= 0 && trackB.cooldown <= 0) {
              // Elastic bounce: reverse orbital travel directions!
              trackA.dir = -trackA.dir;
              trackB.dir = -trackB.dir;

              // Step angles apart to immediately separate from collision point
              trackA.angle += trackA.dir * trackA.speed * 0.04;
              trackB.angle += trackB.dir * trackB.speed * 0.04;

              // Cooldown prevents chattering / sticking during bounce
              trackA.cooldown = 0.35;
              trackB.cooldown = 0.35;
            }

            // Visual separation push: guarantee they never clip or penetrate each other
            const dist = Math.sqrt(distSq);
            if (dist > 0.0001) {
              const overlap = (COLLISION_DIST - dist) * 0.5;
              const invDist = 1.0 / dist;
              const nx = dx * invDist;
              const ny = dy * invDist;
              const nz = dz * invDist;

              pA.x += nx * overlap;
              pA.y += ny * overlap;
              pA.z += nz * overlap;
              pB.x -= nx * overlap;
              pB.y -= ny * overlap;
              pB.z -= nz * overlap;

              pA.normalize().multiplyScalar(orbitRadius);
              pB.normalize().multiplyScalar(orbitRadius);
            }
          }
        }
      }

      // Directly update the shader uniforms with the live sphere coordinates
      instancedUniforms.u_sphere1Position.value.copy(orb1.position);
      instancedUniforms.u_sphere2Position.value.copy(orb2.position);
      instancedUniforms.u_sphere3Position.value.copy(orb3.position);
      instancedUniforms.u_sphere4Position.value.copy(orb4.position);

      // Keep noise coordinate static for calm, non-flickering, non-tearing smooth shadows
      instancedUniforms.u_noiseCoordOffset.value.set(0, 0);
      glassUniforms.u_noiseCoordOffset.value.set(0, 0);

      // OrbitControls update for smooth momentum damping
      controls.update();

      // Static directional light shadow map: render once on startup/resize to avoid 60fps depth thrashing
      if (shadowFrames < 2) {
        renderer.shadowMap.needsUpdate = true;
        shadowFrames++;
      }

      // Single-pass buttery 60fps render with native hardware 4x MSAA anti-aliasing
      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // --- 13. Cleanup ---
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

