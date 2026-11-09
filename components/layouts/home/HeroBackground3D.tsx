"use client";

import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import * as THREE from "three";
import gsap from "gsap";
import { Colors } from "@/utils/enum";

export default function HeroBackground3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // --- 1. Scene, Camera & Renderer Setup ---
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0c, 0.08);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // --- 2. Master Group for Parallax Tilt ---
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // --- 3. Central Dark Core Sphere ---
    const coreGeo = new THREE.SphereGeometry(1.28, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x050507,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    masterGroup.add(coreMesh);

    // --- 4. Central Instanced Fibonacci Shards (threejs-challenge-0 inspired) ---
    // Detect mobile for optimized particle count
    const isMobile = width < 768;
    const count = isMobile ? 650 : 1200;
    const sphereRadius = isMobile ? 1.45 : 1.62;

    // Base geometry for each shard: diamond / elongated bevel shard
    const shardGeo = new THREE.ConeGeometry(0.038, 0.22, 4);
    shardGeo.rotateX(Math.PI / 2);

    // High-end metallic / frosted material
    const shardMat = new THREE.MeshStandardMaterial({
      color: 0xe0e6eb,
      metalness: 0.92,
      roughness: 0.18,
      envMapIntensity: 1.5,
    });

    const instancedMesh = new THREE.InstancedMesh(shardGeo, shardMat, count);
    instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    // Golden angle (Fibonacci distribution on sphere)
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const baseTransforms: {
      position: THREE.Vector3;
      quaternion: THREE.Quaternion;
      scale: THREE.Vector3;
      phase: number;
    }[] = [];

    const dummy = new THREE.Object3D();
    const upVector = new THREE.Vector3(0, 1, 0);

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;

      const x = Math.cos(theta) * radiusAtY * sphereRadius;
      const z = Math.sin(theta) * radiusAtY * sphereRadius;
      const pos = new THREE.Vector3(x, y * sphereRadius, z);

      // Orientation: point outward from center
      const normal = pos.clone().normalize();
      const quat = new THREE.Quaternion().setFromUnitVectors(upVector, normal);

      const baseScale = new THREE.Vector3(1, 1, 1);
      baseTransforms.push({
        position: pos,
        quaternion: quat,
        scale: baseScale,
        phase: theta * 2 + y * 4,
      });

      dummy.position.copy(pos);
      dummy.quaternion.copy(quat);
      dummy.scale.copy(baseScale);
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
    }
    instancedMesh.instanceMatrix.needsUpdate = true;
    masterGroup.add(instancedMesh);

    // --- 5. Orbiting Satellites / Glowing Light Orbs ---
    const orbCount = 4;
    const orbMeshes: THREE.Mesh[] = [];
    const orbLights: THREE.PointLight[] = [];

    const orbConfigs = [
      { speed: 0.85, phase: 0, plane: "xy", radius: 2.2, color: 0xffffff, lightIntensity: 8 },
      { speed: 0.65, phase: Math.PI / 2.5, plane: "xz", radius: 2.45, color: 0x8399ff, lightIntensity: 10 },
      { speed: 0.5, phase: Math.PI / 1.3, plane: "yz", radius: 2.3, color: 0xe0c080, lightIntensity: 7 },
      { speed: 1.05, phase: Math.PI * 1.2, plane: "xy", radius: 2.6, color: 0x0099ff, lightIntensity: 9 },
    ];

    const orbGeo = new THREE.SphereGeometry(0.048, 16, 16);

    orbConfigs.forEach((cfg) => {
      const orbMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
      });
      const orbMesh = new THREE.Mesh(orbGeo, orbMat);

      const pointLight = new THREE.PointLight(cfg.color, cfg.lightIntensity, 7, 2);
      orbMesh.add(pointLight);

      masterGroup.add(orbMesh);
      orbMeshes.push(orbMesh);
      orbLights.push(pointLight);
    });

    // --- 6. Ambient and Rim Lighting ---
    const ambientLight = new THREE.AmbientLight(0x22242a, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.4);
    dirLight1.position.set(-3, 4, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x8399ff, 1.8);
    dirLight2.position.set(4, -3, -2);
    scene.add(dirLight2);

    // --- 7. Subtle Floating Background Dust / Ambient Starfield ---
    const starCount = 350;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 14;
      starPos[i + 1] = (Math.random() - 0.5) * 14;
      starPos[i + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.022,
      color: 0x738399,
      transparent: true,
      opacity: 0.65,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // --- 8. GSAP Interactive Mouse Parallax ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x;
      mouse.targetY = y;

      gsap.to(mouse, {
        x: mouse.targetX,
        y: mouse.targetY,
        duration: 1.4,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // --- 9. Resize Handling ---
    const handleResize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // --- 10. Animation Loop ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Slow master rotation
      masterGroup.rotation.y = elapsedTime * 0.12 + mouse.x * 0.35;
      masterGroup.rotation.x = Math.sin(elapsedTime * 0.08) * 0.15 + mouse.y * 0.25;

      // Stars slow counter-drift
      starField.rotation.y = -elapsedTime * 0.02;

      // Animate Orbiting Satellites
      orbConfigs.forEach((cfg, idx) => {
        const angle = elapsedTime * cfg.speed + cfg.phase;
        const mesh = orbMeshes[idx];
        const r = cfg.radius;

        if (cfg.plane === "xy") {
          mesh.position.set(Math.cos(angle) * r, Math.sin(angle) * r, Math.sin(angle * 0.5) * 0.4);
        } else if (cfg.plane === "xz") {
          mesh.position.set(Math.cos(angle) * r, Math.cos(angle * 0.5) * 0.4, Math.sin(angle) * r);
        } else if (cfg.plane === "yz") {
          mesh.position.set(Math.sin(angle * 0.5) * 0.4, Math.cos(angle) * r, Math.sin(angle) * r);
        }
      });

      // Subtle breathing wave through the Fibonacci shards
      for (let i = 0; i < count; i++) {
        const t = baseTransforms[i];
        // Radial wave pulsation
        const wave = Math.sin(elapsedTime * 1.8 + t.phase) * 0.08;
        const scaleFactor = 1 + wave * 0.7;

        dummy.position.copy(t.position).multiplyScalar(1 + wave * 0.12);
        dummy.quaternion.copy(t.quaternion);
        dummy.scale.set(scaleFactor, scaleFactor, 1 + wave * 1.2);
        dummy.updateMatrix();

        instancedMesh.setMatrixAt(i, dummy.matrix);
      }
      instancedMesh.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // --- 11. Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      // Dispose three.js resources to prevent memory leaks
      shardGeo.dispose();
      shardMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      orbGeo.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        bgcolor: "transparent",
      }}
    >
      {/* Three.js WebGL Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          outline: "none",
        }}
      />

      {/* Radial Vignette & Lighting Blend with Page Background */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 65% 65% at 50% 50%, rgba(10, 10, 12, 0.2) 0%, rgba(10, 10, 12, 0.75) 70%, ${Colors.BG_PAGE} 100%),
            linear-gradient(180deg, rgba(10, 10, 12, 0.4) 0%, transparent 20%, transparent 80%, ${Colors.BG_PAGE} 100%)
          `,
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}

