import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const PortalBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();
  const timeRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const staticShader = {
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2() }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        varying vec2 vUv;

        float random(vec2 p) {
          vec2 k1 = vec2(
            23.14069263277926,
            2.665144142690225
          );
          return fract(cos(dot(p, k1)) * 12345.6789);
        }

        // Improved noise function for sharper static
        float staticNoise(vec2 uv, float t) {
          vec2 noise = vec2(
            random(uv + t * vec2(1.0, 1.0)),
            random(uv + t * vec2(-1.0, -1.0))
          );
          return (noise.x + noise.y) * 0.65;
        }

        void main() {
          vec2 uv = vUv;
          
          // Create much finer-grained noise
          vec2 blockSize = vec2(1.0) / (resolution.xy * 0.3); // Reduced block size for sharper static
          vec2 block = floor(uv / blockSize);
          
          // Layer multiple noise patterns for more detail
          float noise1 = staticNoise(block * 1.0, time * 15.0);
          float noise2 = staticNoise(block * 2.0, time * 20.0) * 0.5;
          float noise3 = staticNoise(block * 4.0, time * 25.0) * 0.25;
          
          float noise = (noise1 + noise2 + noise3) / 1.75; // Combine layers with normalization
          
          // Add sharp vertical distortion lines
          float line = step(0.99, random(vec2(block.y * 2.0 + time * 8.0, time)));
          noise = mix(noise, 1.0, line * 0.7);
          
          // Add thin horizontal interference bands
          float band = step(0.995, random(vec2(time * 5.0, block.x * 3.0)));
          noise = mix(noise, 0.1, band * 0.8);
          
          // Create thin scanlines
          float scanline = sin(uv.y * 1200.0 + time * 15.0) * 0.5 + 0.5;
          noise *= 0.95 + scanline * 0.05;
          
          // Create cold, monochromatic color palette
          vec3 darkBlue = vec3(1.05, 0.05, 0.15);  // Dark blue-black
          vec3 midGray = vec3(0.5, 0.5, 0.6);      // Cool gray
          vec3 brightWhite = vec3(0.9, 0.9, 1.0);  // Slightly blue-tinted white
          
          // Mix colors based on noise value
          vec3 color;
          if (noise < 0.3) {
            color = mix(darkBlue, midGray, noise * 3.33);
          } else if (noise < 0.9) {
            color = mix(midGray, brightWhite, (noise - 0.3) * 3.33);
          } else {
            color = brightWhite;
          }
          
          // Add subtle color variation for more visual interest
          float variation = random(block + time) * 0.1 - 0.05;
          color += vec3(variation * 0.8, variation * 0.8, variation);
          
          gl_FragColor = vec4(color, 1.0);
        }
      `
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: staticShader.uniforms,
      vertexShader: staticShader.vertexShader,
      fragmentShader: staticShader.fragmentShader
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      renderer.setSize(width, height);
      staticShader.uniforms.resolution.value.set(width, height);
    };

    const animate = (time: number) => {
      const deltaTime = time - lastTimeRef.current;
      lastTimeRef.current = time;
      timeRef.current += deltaTime * 0.001;
      
      staticShader.uniforms.time.value = timeRef.current;
      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}; 