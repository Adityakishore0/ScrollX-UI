"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { Renderer, Transform, Vec3, Color, Polyline, Program } from "ogl";

const vertexShader = `
    precision highp float;

    attribute vec3 position;
    attribute vec3 next;
    attribute vec3 prev;
    attribute vec2 uv;
    attribute float side;

    uniform vec2 uResolution;
    uniform float uDPR;
    uniform float uThickness;
    uniform float uTime;

    vec4 getPosition() {
        vec4 current = vec4(position, 1);

        vec2 aspect = vec2(uResolution.x / uResolution.y, 1);
        vec2 nextScreen = next.xy * aspect;
        vec2 prevScreen = prev.xy * aspect;

        
        vec2 tangent = normalize(nextScreen - prevScreen);

        
        vec2 normal = vec2(-tangent.y, tangent.x);
        normal /= aspect;

        
        float noise = sin(position.x * 100.0 + uTime * 2.0) * 0.1;
        normal *= 1.0 + noise;

        
        float taper = smoothstep(0.0, 0.3, uv.y) * (1.0 - smoothstep(0.7, 1.0, uv.y));
        normal *= taper;

        
        float dist = length(nextScreen - prevScreen);
        normal *= smoothstep(0.0, 0.02, dist);

        float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);
        float pixelWidth = current.w * pixelWidthRatio;
        normal *= pixelWidth * uThickness;
        current.xy -= normal * side;

        return current;
    }

    void main() {
        gl_Position = getPosition();
    }
`;

const fragmentShader = `
    precision highp float;
    
    uniform vec3 uColor;
    uniform float uTime;
    uniform float uIntensity;
    
    void main() {
        
        vec3 color = uColor * (0.9 + 0.1 * sin(uTime * 0.5));
        
        
        float glow = uIntensity * 0.5;
        color += glow * vec3(1.0, 1.0, 1.0);
        
        gl_FragColor = vec4(color, 1.0);
    }
`;

interface PolylineConfig {
  color: string;
  thickness: number;
  count: number;
  spring: number;
  friction: number;
  offset: Vec3;
}

interface PolylineItem extends PolylineConfig {
  points: Vec3[];
  polyline: Polyline;
  program: Program;
  velocity: Vec3;
  targetIntensity: number;
}

interface FollowCursorProps {
  className?: string;
  style?: React.CSSProperties;
  colors?: string[];
  thickness?: { min: number; max: number };
  count?: { min: number; max: number };
  bgColor?: string;
}

export default function FollowCursor({
  className = "",
  style = {},
  colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFBE0B",
    "#FB5607",
    "#8338EC",
    "#3A86FF",
    "#FF006E",
    "#A5FFD6",
    "#FF9E00",
  ],
  thickness = { min: 30, max: 100 },
  count = { min: 15, max: 25 },
  bgColor = "rgba(26, 26, 38, 1)",
}: FollowCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const sceneRef = useRef<Transform | null>(null);
  const linesRef = useRef<PolylineItem[]>([]);
  const mouseRef = useRef(new Vec3());
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const isSetupCompleteRef = useRef(false);
  const [isMounted, setIsMounted] = useState(false);

  const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;

  const generateConfigs = useCallback((): PolylineConfig[] => {
    return colors.map((color) => ({
      color,
      thickness:
        thickness.min + Math.random() * (thickness.max - thickness.min),
      count: count.min + Math.floor(Math.random() * (count.max - count.min)),
      spring: 0.1 + Math.random() * 0.15,
      friction: 0.85 + Math.random() * 0.1,
      offset: new Vec3(
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05,
        0
      ),
    }));
  }, [colors, thickness, count]);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const getCanvasPosition = () => {
    if (!canvasRef.current) return { left: 0, top: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    return { left: rect.left, top: rect.top };
  };

  useEffect(() => {
    if (!isMounted || !canvasRef.current || !containerRef.current) return;

    if (isSetupCompleteRef.current && rendererRef.current) return;

    let isComponentMounted = true;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const renderer = new Renderer({
      canvas: canvas,
      dpr: Math.min(window.devicePixelRatio, 2),
      antialias: true,
    });
    const gl = renderer.gl;
    rendererRef.current = renderer;

    const bgColorObj = new Color(bgColor);
    gl.clearColor(bgColorObj.r, bgColorObj.g, bgColorObj.b, 1);

    const scene = new Transform();
    sceneRef.current = scene;

    const configs = generateConfigs();
    const lines: PolylineItem[] = [];

    try {
      for (const config of configs) {
        const points = Array.from({ length: config.count }, (_, i) => {
          const offset = i * 0.01;
          return new Vec3(offset, offset, 0);
        });

        const polyline = new Polyline(gl, {
          points,
          vertex: vertexShader,
          fragment: fragmentShader,
          uniforms: {
            uColor: { value: new Color(config.color) },
            uThickness: { value: config.thickness },
            uTime: { value: 0 },
            uIntensity: { value: 0 },
          },
        });

        polyline.mesh.setParent(scene);

        lines.push({
          ...config,
          points,
          polyline,
          program: polyline.mesh.program,
          velocity: new Vec3(),
          targetIntensity: 0,
        });
      }

      linesRef.current = lines;
    } catch (error) {
      console.error("Failed to create polylines:", error);
      return;
    }

    isSetupCompleteRef.current = true;

    const handleResize = () => {
      if (!isComponentMounted || !renderer || !container) return;

      try {
        renderer.setSize(container.clientWidth, container.clientHeight);

        if (lines && Array.isArray(lines)) {
          lines.forEach((line) => {
            if (
              line &&
              line.polyline &&
              typeof line.polyline.resize === "function"
            ) {
              line.polyline.resize();
            }
          });
        }
      } catch (error) {
        console.error("Failed to resize:", error);
      }
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isComponentMounted || !renderer || !canvas) return;

      const event = "touches" in e ? e.touches[0] : e;

      const canvasPos = getCanvasPosition();

      const x = event.clientX - canvasPos.left;
      const y = event.clientY - canvasPos.top;

      mouseRef.current.set(
        (x / canvas.width) * 2 - 1,
        (y / canvas.height) * -2 + 1,
        0
      );

      if (lines && Array.isArray(lines)) {
        lines.forEach((line) => {
          line.targetIntensity = 0.7 + Math.random() * 0.3;

          if (line.points && line.points.length > 0) {
            const firstPoint = line.points[0];
            if (firstPoint) {
              firstPoint.lerp(mouseRef.current.clone().add(line.offset), 0.6);
            }
          }
        });
      }
    };

    resizeObserverRef.current = new ResizeObserver(() => {
      handleResize();
    });

    if (container) {
      resizeObserverRef.current.observe(container);
    }

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove);

    mouseRef.current.set(0, 0, 0);

    handleResize();

    const animate = (time: number) => {
      if (!isComponentMounted || !isSetupCompleteRef.current) {
        return;
      }

      timeRef.current = time * 0.001;
      const tmp = new Vec3();

      try {
        const currentLines = linesRef.current;
        if (
          currentLines &&
          Array.isArray(currentLines) &&
          currentLines.length > 0
        ) {
          for (const line of currentLines) {
            for (let i = line.points.length - 1; i >= 0; i--) {
              if (i === 0) {
                tmp
                  .copy(mouseRef.current)
                  .add(line.offset)
                  .sub(line.points[i])
                  .multiply(line.spring * 6.0);

                line.velocity.add(tmp).multiply(0.92);
                line.points[i].add(line.velocity);

                line.points[i].lerp(
                  mouseRef.current.clone().add(line.offset),
                  0.4
                );
              } else {
                line.points[i].lerp(
                  line.points[i - 1],
                  0.88 + Math.sin(timeRef.current + i) * 0.05
                );
              }
            }

            if (line.program && line.program.uniforms) {
              if (line.program.uniforms.uTime) {
                line.program.uniforms.uTime.value = timeRef.current;
              }

              if (line.program.uniforms.uIntensity) {
                line.program.uniforms.uIntensity.value = lerp(
                  line.program.uniforms.uIntensity.value || 0,
                  line.targetIntensity,
                  0.1
                );
              }
            }

            line.targetIntensity *= 0.9;

            line.polyline.updateGeometry();
          }
        }

        if (rendererRef.current && sceneRef.current) {
          rendererRef.current.render({ scene: sceneRef.current });
        }
      } catch (error) {
        console.error("Animation error:", error);
      }

      if (isComponentMounted) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      isComponentMounted = false;
      isSetupCompleteRef.current = false;

      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }

      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (gl && typeof gl.getExtension === "function") {
        try {
          const extension = gl.getExtension("WEBGL_lose_context");
          if (extension) {
            extension.loseContext();
          }
        } catch (error) {
          console.error("Error losing WebGL context:", error);
        }
      }
    };
  }, [isMounted, bgColor]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={style}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
