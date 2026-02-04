"use client";

import React, { useEffect, useRef, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

type ArcPosition = "top" | "bottom" | "left" | "right" | "both";

interface ArcDefaults {
  radius: number;
  thickness: number;
  speed: number;
  offset: number;
  opacity: number;
  blur: number;
  waveAmp: number;
  segments: number;
  glowRadius: number;
  glowIntensity: number;
}

interface ArcData extends ArcDefaults {
  color: string;
}

const waveBackgroundVariants = cva(
  "relative w-full h-full transition-colors duration-300",
  {
    variants: {
      variant: {
        violet: "bg-white dark:bg-black",
        ocean: "bg-white dark:bg-[#000a0f]",
        ember: "bg-white dark:bg-[#0f0000]",
        emerald: "bg-white dark:bg-[#000f05]",
        aurora: "bg-white dark:bg-[#050510]",
      },
    },
    defaultVariants: { variant: "violet" },
  }
);

const ARC_COLORS: Record<string, string[]> = {
  violet: ["#8B7AFF", "#A593FF", "#6B5AEF", "#7B6AFF", "#5B4ADF", "#9B8AFF"],
  ocean: ["#00B4D8", "#48CAE4", "#0096C7", "#0077B6", "#90E0EF", "#ADE8F4"],
  ember: ["#FF6B35", "#FF8C42", "#E84855", "#D62828", "#F4A261", "#E76F51"],
  emerald: ["#2D6A4F", "#40916C", "#52B788", "#74C69D", "#1B4332", "#95D5B2"],
  aurora: ["#7209B7", "#3A0CA3", "#4CC9F0", "#00B4D8", "#F72585", "#B5179E"],
};

const CENTER_GLOW_COLORS: Record<string, string> = {
  violet: "#6B5AEF",
  ocean: "#0096C7",
  ember: "#E84855",
  emerald: "#40916C",
  aurora: "#4CC9F0",
};

const DEFAULT_ARC_PARAMS: ArcDefaults[] = [
  {
    radius: 250,
    thickness: 12,
    speed: 0.8,
    offset: 0,
    opacity: 1.0,
    blur: 30,
    waveAmp: 20,
    segments: 80,
    glowRadius: 15,
    glowIntensity: 0.3,
  },
  {
    radius: 280,
    thickness: 8,
    speed: 0.85,
    offset: 0.5,
    opacity: 0.85,
    blur: 25,
    waveAmp: 20,
    segments: 80,
    glowRadius: 12,
    glowIntensity: 0.25,
  },
  {
    radius: 310,
    thickness: 6,
    speed: 0.75,
    offset: 1.0,
    opacity: 0.75,
    blur: 20,
    waveAmp: 18,
    segments: 70,
    glowRadius: 10,
    glowIntensity: 0.2,
  },
  {
    radius: 340,
    thickness: 4,
    speed: 0.7,
    offset: 1.5,
    opacity: 0.65,
    blur: 18,
    waveAmp: 18,
    segments: 70,
    glowRadius: 8,
    glowIntensity: 0.15,
  },
  {
    radius: 370,
    thickness: 3,
    speed: 0.65,
    offset: 2.0,
    opacity: 0.55,
    blur: 15,
    waveAmp: 15,
    segments: 60,
    glowRadius: 6,
    glowIntensity: 0.1,
  },
  {
    radius: 400,
    thickness: 2,
    speed: 0.6,
    offset: 2.5,
    opacity: 0.45,
    blur: 12,
    waveAmp: 15,
    segments: 60,
    glowRadius: 5,
    glowIntensity: 0.08,
  },
];

const MAX_ARCS = 6;
const SEGMENTS = 80;

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function hexToRGB(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16) / 255,
    parseInt(hex.slice(3, 5), 16) / 255,
    parseInt(hex.slice(5, 7), 16) / 255,
  ];
}

function compileShader(
  gl: WebGLRenderingContext,
  src: string,
  type: number
): WebGLShader | null {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

function linkProgram(
  gl: WebGLRenderingContext,
  vs: WebGLShader,
  fs: WebGLShader
): WebGLProgram | null {
  const p = gl.createProgram();
  if (!p) return null;
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(p));
    gl.deleteProgram(p);
    return null;
  }
  return p;
}

function buildVertexShader(): string {
  const names = [
    "radius",
    "thickness",
    "speed",
    "offset",
    "opacity",
    "waveAmp",
    "glowRadius",
    "glowIntensity",
  ];
  let accessors = "";
  names.forEach((name) => {
    accessors += `float get_${name}(int i) {\n`;
    for (let i = 0; i < MAX_ARCS; i++) {
      accessors +=
        i === 0
          ? `  if      (i == ${i}) return u_${name}[${i}];\n`
          : `  else if (i == ${i}) return u_${name}[${i}];\n`;
    }
    accessors += `  return 0.0;\n}\n`;
  });

  return `
    attribute vec2 a_pos;

    uniform float u_radius[${MAX_ARCS}];
    uniform float u_thickness[${MAX_ARCS}];
    uniform float u_speed[${MAX_ARCS}];
    uniform float u_offset[${MAX_ARCS}];
    uniform float u_opacity[${MAX_ARCS}];
    uniform float u_waveAmp[${MAX_ARCS}];
    uniform float u_glowRadius[${MAX_ARCS}];
    uniform float u_glowIntensity[${MAX_ARCS}];

    uniform int   u_arcIndex;
    uniform float u_time;
    uniform vec2  u_resolution;
    uniform vec3  u_color;
    uniform float u_side;
    uniform float u_centerX;
    uniform float u_centerY;
    uniform float u_arcSpacing;

    varying float v_alpha;
    varying vec3  v_color;
    varying float v_edge;
    varying float v_glowRadius;
    varying float v_glowIntensity;

    ${accessors}

    void main(void) {
        float progress = a_pos.x;
        float edge     = a_pos.y;

        float radius        = get_radius(u_arcIndex);
        float thickness     = get_thickness(u_arcIndex);
        float spd           = get_speed(u_arcIndex);
        float offset        = get_offset(u_arcIndex);
        float opacity       = get_opacity(u_arcIndex);
        float waveAmp       = get_waveAmp(u_arcIndex);
        float glowRadius    = get_glowRadius(u_arcIndex);
        float glowIntensity = get_glowIntensity(u_arcIndex);

        float wave = sin(progress * 5.0 + u_time * spd + offset) * waveAmp;
        float r    = radius + wave;
        r += mix(-thickness * 0.5, thickness * 0.5, edge);

        float startAngle = 3.1415926535 * 0.3;
        float endAngle   = 3.1415926535 * 0.7;
        float angle      = startAngle + (endAngle - startAngle) * progress;

        float localX =  cos(angle) * r;
        float localY = -sin(angle) * r;

        float pixX = 0.0;
        float pixY = 0.0;

        if (u_side < 0.5) {
            pixX = -localY + u_centerX - u_arcSpacing;
            pixY =  localX + u_centerY;
        } else if (u_side < 1.5) {
            pixX =  localY + u_centerX + u_arcSpacing;
            pixY = -localX + u_centerY;
        } else if (u_side < 2.5) {
            pixX = localX + u_centerX;
            pixY = localY + u_centerY;
        } else {
            pixX =  localX + u_centerX;
            pixY = -localY + u_centerY;
        }

        float clipX =  (pixX / u_resolution.x) * 2.0 - 1.0;
        float clipY = -(pixY / u_resolution.y) * 2.0 + 1.0;

        gl_Position = vec4(clipX, clipY, 0.0, 1.0);

        float fade = sin(progress * 3.1415926535);
        v_alpha    = opacity * fade;
        v_color    = u_color;
        v_edge     = edge;
        v_glowRadius    = glowRadius;
        v_glowIntensity = glowIntensity;
    }
  `;
}

const FRAGMENT_SHADER_SRC = `
  precision mediump float;
  varying float v_alpha;
  varying vec3  v_color;
  varying float v_edge;
  varying float v_glowRadius;
  varying float v_glowIntensity;
  
  void main(void) {
      float dist = abs(v_edge - 0.5) * 2.0;
      float glow = 1.0 - smoothstep(0.0, v_glowRadius, dist * 100.0);
      float glowAlpha = glow * v_glowIntensity;
      float finalAlpha = v_alpha + glowAlpha;
      gl_FragColor = vec4(v_color, finalAlpha);
  }
`;

const GLOW_VS_SRC = `
  attribute vec2 a_pos;
  void main(void) {
      gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

const GLOW_FS_SRC = `
  precision mediump float;
  uniform vec2  u_resolution;
  uniform vec3  u_glowColor;
  uniform float u_glowRadius;
  uniform float u_glowIntensity;
  void main(void) {
      vec2 center = u_resolution * 0.5;
      vec2 pixel  = gl_FragCoord.xy;
      float dist  = length(pixel - center);
      float t     = clamp(dist / u_glowRadius, 0.0, 1.0);
      float alpha = u_glowIntensity * (1.0 - t * t);
      gl_FragColor = vec4(u_glowColor, alpha);
  }
`;

export interface WaveBackgroundProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof waveBackgroundVariants> {
  position?: ArcPosition;
  arcCount?: number;
  arcRadii?: number[];
  arcThicknesses?: number[];
  arcSpeeds?: number[];
  arcOffsets?: number[];
  arcOpacities?: number[];
  arcBlurs?: number[];
  arcWaveAmps?: number[];
  arcGlowRadii?: number[];
  arcGlowIntensities?: number[];
  centerGlowRadius?: number;
  centerGlowIntensity?: number;
  speed?: number;
  arcSpacing?: number;
}

const WaveBackground = forwardRef<HTMLDivElement, WaveBackgroundProps>(
  (
    {
      variant = "violet",
      position = "both",
      arcCount,
      arcRadii,
      arcThicknesses,
      arcSpeeds,
      arcOffsets,
      arcOpacities,
      arcBlurs,
      arcWaveAmps,
      arcGlowRadii,
      arcGlowIntensities,
      centerGlowRadius = 300,
      centerGlowIntensity = 0.08,
      speed = 1,
      arcSpacing = 480,
      children,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isVisibleRef = useRef(true);
    const animIdRef = useRef<number>();

    const colors = ARC_COLORS[variant || "violet"];
    const count =
      arcCount !== undefined ? clamp(arcCount, 1, MAX_ARCS) : colors.length;
    const glowColor = CENTER_GLOW_COLORS[variant || "violet"];

    useEffect(() => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          isVisibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting && !animIdRef.current) {
            animate();
          }
        },
        { threshold: 0 }
      );

      observer.observe(container);

      const gl = canvas.getContext("webgl", {
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: false,
      }) as WebGLRenderingContext | null;
      if (!gl) {
        canvas.style.display = "none";
        observer.disconnect();
        return;
      }

      const vs = compileShader(gl, buildVertexShader(), gl.VERTEX_SHADER);
      const fs = compileShader(gl, FRAGMENT_SHADER_SRC, gl.FRAGMENT_SHADER);
      if (!vs || !fs) {
        observer.disconnect();
        return;
      }

      const prog = linkProgram(gl, vs, fs);
      if (!prog) {
        observer.disconnect();
        return;
      }

      const glowVs = compileShader(gl, GLOW_VS_SRC, gl.VERTEX_SHADER);
      const glowFs = compileShader(gl, GLOW_FS_SRC, gl.FRAGMENT_SHADER);
      if (!glowVs || !glowFs) {
        observer.disconnect();
        return;
      }
      const glowProg = linkProgram(gl, glowVs, glowFs);
      if (!glowProg) {
        observer.disconnect();
        return;
      }

      gl.useProgram(prog);
      const verts = new Float32Array((SEGMENTS + 1) * 2 * 2);
      for (let i = 0, vi = 0; i <= SEGMENTS; i++) {
        const t = i / SEGMENTS;
        verts[vi++] = t;
        verts[vi++] = 0;
        verts[vi++] = t;
        verts[vi++] = 1;
      }
      const arcBuf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, arcBuf);
      gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

      const aPos = gl.getAttribLocation(prog, "a_pos");
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      const glowVerts = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
      const glowBuf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, glowBuf);
      gl.bufferData(gl.ARRAY_BUFFER, glowVerts, gl.STATIC_DRAW);

      const loc = (n: string) => gl.getUniformLocation(prog, n);
      const uRadius = loc("u_radius");
      const uThickness = loc("u_thickness");
      const uSpeed = loc("u_speed");
      const uOffset = loc("u_offset");
      const uOpacity = loc("u_opacity");
      const uWaveAmp = loc("u_waveAmp");
      const uGlowRadius = loc("u_glowRadius");
      const uGlowIntensity = loc("u_glowIntensity");
      const uArcIndex = loc("u_arcIndex");
      const uTime = loc("u_time");
      const uRes = loc("u_resolution");
      const uColor = loc("u_color");
      const uSide = loc("u_side");
      const uCenterX = loc("u_centerX");
      const uCenterY = loc("u_centerY");
      const uArcSpacing = loc("u_arcSpacing");

      const glowLoc = (n: string) => gl.getUniformLocation(glowProg, n);
      const uGlowRes = glowLoc("u_resolution");
      const uGlowColor = glowLoc("u_glowColor");
      const uGlowRadius2 = glowLoc("u_glowRadius");
      const uGlowIntensity2 = glowLoc("u_glowIntensity");
      const aGlowPos = gl.getAttribLocation(glowProg, "a_pos");

      const arcs: ArcData[] = [];
      for (let i = 0; i < count; i++) {
        const d = DEFAULT_ARC_PARAMS[i];
        arcs.push({
          color: colors[i] ?? "#ffffff",
          radius: arcRadii?.[i] ?? d.radius,
          thickness: arcThicknesses?.[i] ?? d.thickness,
          speed: (arcSpeeds?.[i] ?? d.speed) * speed,
          offset: arcOffsets?.[i] ?? d.offset,
          opacity: arcOpacities?.[i] ?? d.opacity,
          blur: arcBlurs?.[i] ?? d.blur,
          waveAmp: arcWaveAmps?.[i] ?? d.waveAmp,
          glowRadius: arcGlowRadii?.[i] ?? d.glowRadius,
          glowIntensity: arcGlowIntensities?.[i] ?? d.glowIntensity,
          segments: d.segments,
        });
      }

      const pad = (fn: (a: ArcData) => number) => {
        const arr = new Float32Array(MAX_ARCS);
        arcs.forEach((a, i) => {
          arr[i] = fn(a);
        });
        return arr;
      };
      const offsetArr = pad((a) => a.offset);
      const mirroredOffsetArr = pad((a) => a.offset + 3.14);
      const arcColors = arcs.map((a) => hexToRGB(a.color));
      const glowRGB = hexToRGB(glowColor);

      gl.useProgram(prog);
      gl.uniform1fv(
        uRadius,
        pad((a) => a.radius)
      );
      gl.uniform1fv(
        uThickness,
        pad((a) => a.thickness)
      );
      gl.uniform1fv(
        uSpeed,
        pad((a) => a.speed)
      );
      gl.uniform1fv(
        uOpacity,
        pad((a) => a.opacity)
      );
      gl.uniform1fv(
        uWaveAmp,
        pad((a) => a.waveAmp)
      );
      gl.uniform1fv(
        uGlowRadius,
        pad((a) => a.glowRadius)
      );
      gl.uniform1fv(
        uGlowIntensity,
        pad((a) => a.glowIntensity)
      );
      gl.uniform1f(uArcSpacing, arcSpacing);

      gl.useProgram(glowProg);
      gl.uniform3fv(uGlowColor, glowRGB);
      gl.uniform1f(uGlowRadius2, centerGlowRadius);
      gl.uniform1f(uGlowIntensity2, centerGlowIntensity);

      let w = 0,
        h = 0;

      const setSize = () => {
        const rect = container.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        w = rect.width;
        h = rect.height;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        gl.viewport(0, 0, canvas.width, canvas.height);

        gl.useProgram(prog);
        gl.uniform2f(uRes, w, h);
        gl.uniform1f(uCenterX, w / 2);
        gl.uniform1f(uCenterY, h / 2);

        gl.useProgram(glowProg);
        gl.uniform2f(uGlowRes, w, h);
      };
      setSize();

      const resizeObs = new ResizeObserver(setSize);
      resizeObs.observe(container);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

      let time = 0;
      const fpsInterval = 1000 / 30;
      let lastFrameTime = Date.now();

      const drawSide = (sideCode: number, offsets: Float32Array) => {
        gl.uniform1f(uSide, sideCode);
        gl.uniform1fv(uOffset, offsets);
        for (let i = 0; i < count; i++) {
          gl.uniform1i(uArcIndex, i);
          gl.uniform3fv(uColor, arcColors[i]);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, (SEGMENTS + 1) * 2);
        }
      };

      const animate = () => {
        if (!isVisibleRef.current) {
          animIdRef.current = undefined;
          return;
        }

        const now = Date.now();
        const elapsed = now - lastFrameTime;

        if (elapsed > fpsInterval) {
          lastFrameTime = now - (elapsed % fpsInterval);

          gl.clearColor(0, 0, 0, 0);
          gl.clear(gl.COLOR_BUFFER_BIT);

          gl.useProgram(glowProg);
          gl.bindBuffer(gl.ARRAY_BUFFER, glowBuf);
          gl.enableVertexAttribArray(aGlowPos);
          gl.vertexAttribPointer(aGlowPos, 2, gl.FLOAT, false, 0, 0);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

          gl.useProgram(prog);
          gl.bindBuffer(gl.ARRAY_BUFFER, arcBuf);
          gl.enableVertexAttribArray(aPos);
          gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
          gl.uniform1f(uTime, time);

          if (position === "both") {
            drawSide(0, offsetArr);
            drawSide(1, mirroredOffsetArr);
          } else if (position === "top") {
            drawSide(2, offsetArr);
          } else if (position === "bottom") {
            drawSide(3, offsetArr);
          } else if (position === "left") {
            drawSide(0, offsetArr);
          } else if (position === "right") {
            drawSide(1, offsetArr);
          }

          time += 0.016;
        }

        animIdRef.current = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        observer.disconnect();
        resizeObs.disconnect();
        if (animIdRef.current) {
          cancelAnimationFrame(animIdRef.current);
        }
        gl.deleteBuffer(arcBuf);
        gl.deleteBuffer(glowBuf);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteShader(glowVs);
        gl.deleteShader(glowFs);
        gl.deleteProgram(prog);
        gl.deleteProgram(glowProg);
      };
    }, [
      variant,
      position,
      arcCount,
      arcRadii,
      arcThicknesses,
      arcSpeeds,
      arcOffsets,
      arcOpacities,
      arcBlurs,
      arcWaveAmps,
      arcGlowRadii,
      arcGlowIntensities,
      centerGlowRadius,
      centerGlowIntensity,
      speed,
      arcSpacing,
      glowColor,
      colors,
      count,
    ]);

    const setRefs = (el: HTMLDivElement | null) => {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current =
        el;
      if (typeof ref === "function") ref(el);
      else if (ref)
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
    };

    return (
      <div
        ref={setRefs}
        className={cn(waveBackgroundVariants({ variant }), className)}
        style={style}
        {...rest}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
        {children}
      </div>
    );
  }
);

WaveBackground.displayName = "WaveBackground";
export default WaveBackground;
