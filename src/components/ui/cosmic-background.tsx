'use client';
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface CosmicBackgroundProps {
  variant?: 'aurora' | 'cosmic' | 'neon';
  intensity?: number;
  speed?: number;
  interactive?: boolean;
  quality?: 'low' | 'medium' | 'high' | 'ultra';
  overlay?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const checkWebGLSupport = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    return !!gl;
  } catch (e) {
    return false;
  }
};

const CosmicBackground: React.FC<CosmicBackgroundProps> = ({
  variant = 'aurora',
  intensity = 1.0,
  speed = 1.0,
  interactive = true,
  quality = 'high',
  overlay = false,
  className = '',
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0.5, 0.5));
  const targetMouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0.5, 0.5));
  const timeRef = useRef<number>(0);
  const [webGLSupported] = useState<boolean>(() =>
    typeof window !== 'undefined' ? checkWebGLSupport() : true,
  );

  const variantConfigs = {
    aurora: {
      colors: ['#0a1628', '#1a3a52', '#2d5f7e', '#45a29e', '#66fcf1'],
      flowSpeed: 0.15,
      complexity: 3.5,
      waveCount: 4,
      glowIntensity: 1.8,
    },
    cosmic: {
      colors: ['#0d0221', '#240046', '#3c096c', '#5a189a', '#9d4edd'],
      flowSpeed: 0.08,
      complexity: 5.0,
      waveCount: 6,
      glowIntensity: 2.2,
    },
    neon: {
      colors: ['#000000', '#ff006e', '#fb5607', '#ffbe0b', '#8338ec'],
      flowSpeed: 0.2,
      complexity: 4.2,
      waveCount: 5,
      glowIntensity: 2.5,
    },
  };

  const config = variantConfigs[variant];

  useEffect(() => {
    if (!containerRef.current || !webGLSupported) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
    const isLowEndDevice =
      isMobile ||
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);

    let effectiveQuality = quality;
    if (isLowEndDevice && quality === 'ultra') effectiveQuality = 'medium';
    if (isMobile && quality !== 'low') effectiveQuality = 'low';

    const qualitySettings = {
      low: { pixelRatio: 0.5, precision: 'mediump' as const, octaves: 3 },
      medium: { pixelRatio: 0.75, precision: 'mediump' as const, octaves: 4 },
      high: {
        pixelRatio: Math.min(window.devicePixelRatio, 1.5),
        precision: 'highp' as const,
        octaves: 5,
      },
      ultra: {
        pixelRatio: Math.min(window.devicePixelRatio, 2),
        precision: 'highp' as const,
        octaves: 6,
      },
    };

    const settings = qualitySettings[effectiveQuality];

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    cameraRef.current = camera;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: effectiveQuality === 'ultra',
        alpha: true,
        powerPreference:
          effectiveQuality === 'low' ? 'low-power' : 'high-performance',
        precision: settings.precision,
        stencil: false,
        depth: false,
      });
    } catch (error) {
      console.error('WebGL initialization failed:', error);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(settings.pixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision ${settings.precision} float;
      
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform vec3 uColors[5];
      uniform float uIntensity;
      uniform float uSpeed;
      uniform float uComplexity;
      uniform int uWaveCount;
      uniform float uGlowIntensity;
      uniform bool uInteractive;
      varying vec2 vUv;

      const float PI = 3.14159265359;
      const float TAU = 6.28318530718;

      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m; m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      float fbm(vec2 p, int octaves) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;
        
        for(int i = 0; i < ${settings.octaves}; i++) {
          if(i >= octaves) break;
          value += amplitude * snoise(p * frequency);
          frequency *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      vec2 domainWarp(vec2 p, float time) {
        float warp1 = fbm(p + time * 0.1, ${settings.octaves});
        float warp2 = fbm(p + vec2(warp1 * 4.0) + time * 0.15, ${settings.octaves});
        return p + vec2(warp1, warp2) * 0.3;
      }

      vec3 palette(float t) {
        vec3 a = uColors[0];
        vec3 b = uColors[1];
        vec3 c = uColors[2];
        vec3 d = uColors[3];
        vec3 e = uColors[4];
        
        float step1 = smoothstep(0.0, 0.25, t);
        float step2 = smoothstep(0.25, 0.5, t);
        float step3 = smoothstep(0.5, 0.75, t);
        float step4 = smoothstep(0.75, 1.0, t);
        
        vec3 color = mix(a, b, step1);
        color = mix(color, c, step2);
        color = mix(color, d, step3);
        color = mix(color, e, step4);
        
        return color;
      }

      void main() {
        vec2 uv = vUv;
        vec2 p = (uv - 0.5) * 2.0;
        p.x *= uResolution.x / uResolution.y;

        vec2 mouseInfluence = vec2(0.0);
        if(uInteractive) {
          vec2 mousePos = (uMouse - 0.5) * 2.0;
          mousePos.x *= uResolution.x / uResolution.y;
          float mouseDist = length(p - mousePos);
          mouseInfluence = (mousePos - p) * (0.3 / (mouseDist + 0.5));
        }

        vec2 warpedP = domainWarp(p + mouseInfluence, uTime * uSpeed);
        
        float pattern = 0.0;
        float amplitude = 1.0;
        
        for(int i = 0; i < 6; i++) {
          if(i >= uWaveCount) break;
          
          float freq = pow(2.0, float(i));
          float timeOffset = uTime * uSpeed * (0.3 + float(i) * 0.1);
          
          vec2 offset = vec2(
            cos(timeOffset + float(i)),
            sin(timeOffset * 1.3 + float(i))
          ) * 0.5;
          
          float wave = fbm((warpedP + offset) * freq * uComplexity, ${settings.octaves});
          pattern += wave * amplitude;
          amplitude *= 0.6;
        }

        pattern = pattern * 0.5 + 0.5;
        
        float radialGrad = 1.0 - length(p) * 0.4;
        pattern *= radialGrad;

        vec3 color = palette(pattern);
        
        float glow = pow(pattern, 2.0) * uGlowIntensity;
        color += glow * 0.5;

        color *= uIntensity;

        float grain = fract(sin(dot(uv * uTime, vec2(12.9898, 78.233))) * 43758.5453);
        color -= grain * 0.03;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const parseColor = (hex: string): THREE.Vector3 => {
      const color = new THREE.Color(hex);
      return new THREE.Vector3(color.r, color.g, color.b);
    };

    const colorArray = config.colors.map(parseColor);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(width, height) },
        uMouse: { value: mouseRef.current },
        uColors: { value: colorArray },
        uIntensity: { value: intensity },
        uSpeed: { value: config.flowSpeed * speed },
        uComplexity: { value: config.complexity },
        uWaveCount: { value: config.waveCount },
        uGlowIntensity: { value: config.glowIntensity },
        uInteractive: { value: interactive },
      },
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });
    materialRef.current = material;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleMouseMove = (event: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1.0 - (event.clientY - rect.top) / rect.height;
      targetMouseRef.current.set(x, y);
    };

    if (interactive) {
      container.addEventListener('mousemove', handleMouseMove, {
        passive: true,
      });
    }

    let lastTime = performance.now();
    const targetFPS = effectiveQuality === 'low' ? 30 : 60;
    const frameTime = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (
        !materialRef.current ||
        !rendererRef.current ||
        !sceneRef.current ||
        !cameraRef.current
      )
        return;

      const deltaTime = currentTime - lastTime;

      if (deltaTime >= frameTime) {
        timeRef.current += 0.016;
        materialRef.current.uniforms.uTime.value = timeRef.current;

        mouseRef.current.lerp(targetMouseRef.current, 0.1);
        materialRef.current.uniforms.uMouse.value = mouseRef.current;

        rendererRef.current.render(sceneRef.current, cameraRef.current);
        lastTime = currentTime - (deltaTime % frameTime);
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    let resizeTimeout: number | null = null;
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        if (
          !rendererRef.current ||
          !materialRef.current ||
          !containerRef.current
        )
          return;
        const newWidth = containerRef.current.clientWidth;
        const newHeight = containerRef.current.clientHeight;
        rendererRef.current.setSize(newWidth, newHeight);
        materialRef.current.uniforms.uResolution.value.set(newWidth, newHeight);
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.forceContextLoss();
        if (container.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement);
        }
      }
      if (materialRef.current) {
        materialRef.current.dispose();
      }
      geometry.dispose();
    };
  }, [
    variant,
    intensity,
    speed,
    interactive,
    quality,
    webGLSupported,
    config.colors,
    config.complexity,
    config.flowSpeed,
    config.glowIntensity,
    config.waveCount,
  ]);

  if (!webGLSupported) {
    return (
      <div
        className={`w-full h-full flex items-center justify-center bg-linear-to-br from-gray-900 to-gray-800 ${className}`}
      >
        <div className='text-gray-400 text-sm'>WebGL not supported</div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={containerRef} className='absolute inset-0 w-full h-full' />
      {children && <div className='relative z-10'>{children}</div>}
    </div>
  );
};

export { CosmicBackground };
