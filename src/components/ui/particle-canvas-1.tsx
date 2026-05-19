"use client";

import { useEffect, useRef, useState } from "react";

type WebGLRefs = {
  shaderProgram?: WebGLProgram;
  attribLocs?: { position: number; color: number };
  buffers?: { position: WebGLBuffer | null; color: WebGLBuffer | null };
  uniformLocs?: { resolution: WebGLUniformLocation | null; tick: WebGLUniformLocation | null };
  data: { triangles: number[]; colors: number[] };
  clear?: () => void;
  draw?: () => void;
};

type Dimensions = { width: number; height: number; cx: number; cy: number };

const Helper = {
  createShader: (gl: WebGLRenderingContext, type: number, source: string): WebGLShader => {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  },
  createProgram: (
    gl: WebGLRenderingContext,
    vertexShader: WebGLShader,
    fragmentShader: WebGLShader
  ): WebGLProgram => {
    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    return program;
  },
  pixel2DVertexVaryingShader: `
    attribute vec2 a_position;
    uniform vec2 u_resolution;
    attribute vec2 a_color;
    varying vec2 v_color;
    void main(){
      gl_Position = vec4( vec2( 1, -1 ) * ( ( a_position / u_resolution ) * 2.0 - 1.0 ), 0, 1 );
      v_color = a_color;
    }
  `,
  uniform2DFragmentVaryingShader: `
    precision mediump float;
    varying vec2 v_color;
    uniform float u_tick;
    float frac = 1.0/6.0;
    void main(){
      float hue = v_color.x + u_tick;
      hue = abs(hue - floor(hue));
      vec4 color = vec4( 0, 0, 0, 1 );
      if( hue < frac ){
        color.r = 1.0;
        color.g = hue / frac;
        color.b = 0.0;
      } else if( hue < frac * 2.0 ){
        color.r = 1.0 - ( hue - frac ) / frac;
        color.g = 1.0;
        color.b = 0.0;
      } else if( hue < frac * 3.0 ){
        color.r = 0.0;
        color.g = 1.0;
        color.b = ( hue - frac * 2.0 ) / frac;
      } else if( hue < frac * 4.0 ){
        color.r = 0.0;
        color.g = 1.0 - ( hue - frac * 3.0 ) / frac;
        color.b = 1.0;
      } else if( hue < frac * 5.0 ){
        color.r = ( hue - frac * 4.0 ) / frac;
        color.g = 0.0;
        color.b = 1.0;
      } else {
        color.r = 1.0;
        color.g = 0.0;
        color.b = 1.0 - ( hue - frac * 5.0 ) / frac;
      }
      color = vec4( color.rgb * v_color.y, 1.0 );
      gl_FragColor = color;
    }
  `,
};

interface ParticleCanvasProps {
  maxParticles?: number;
  particleSizeMin?: number;
  particleSizeMax?: number;
  speedScale?: number;
}

interface Particle {
  size: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  time: number;
  reset: () => void;
  step: () => void;
}

const ParticleCanvas = ({
  maxParticles = 1000,
  particleSizeMin = 2,
  particleSizeMax = 5,
  speedScale = 2,
}: ParticleCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webglRef = useRef<WebGLRefs>({ data: { triangles: [], colors: [] } });
  const particlesRef = useRef<Particle[]>([]);
  const tickRef = useRef(0);
  const dimensionsRef = useRef<Dimensions>({ width: 0, height: 0, cx: 0, cy: 0 });
  const [isAnimating] = useState(true);
  const animationFrameIdRef = useRef<number | null>(null);

  function getCircleTriangles(x: number, y: number, r: number): number[] {
    const triangles: number[] = [];
    const inc = (Math.PI * 2) / 6;
    let px = x + r;
    let py = y;
    for (let i = 0; i <= Math.PI * 2 + inc; i += inc) {
      const nx = x + r * Math.cos(i);
      const ny = y + r * Math.sin(i);
      triangles.push(x, y, px, py, nx, ny);
      px = nx;
      py = ny;
    }
    return triangles;
  }

  function createParticle(): Particle {
    const p: Particle = {
      size: 0,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      time: 1,
      reset() {
        this.size = particleSizeMin + (particleSizeMax - particleSizeMin) * Math.random();
        this.x = dimensionsRef.current.cx;
        this.y = dimensionsRef.current.cy;
        this.vx = (Math.random() - 0.5) * 2 * speedScale;
        this.vy = -2 - speedScale * Math.random();
        this.time = 1;
      },
      step() {
        this.x += (this.vx *= 0.995);
        this.y += (this.vy += 0.05);
        this.time *= 0.99;
        const triangles = getCircleTriangles(this.x, this.y, this.size * this.time);
        const hue = this.vy / 10;
        for (let i = 0; i < triangles.length; i += 2) {
          webglRef.current.data.triangles.push(triangles[i], triangles[i + 1]);
          webglRef.current.data.colors.push(hue, this.time);
        }
        if (this.y - this.size > dimensionsRef.current.height) {
          this.reset();
        }
      },
    };
    p.reset();
    return p;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true });
    if (!gl) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    dimensionsRef.current = { width: w, height: h, cx: w / 2, cy: h / 2 };

    webglRef.current.shaderProgram = Helper.createProgram(
      gl,
      Helper.createShader(gl, gl.VERTEX_SHADER, Helper.pixel2DVertexVaryingShader),
      Helper.createShader(gl, gl.FRAGMENT_SHADER, Helper.uniform2DFragmentVaryingShader)
    );
    const prog = webglRef.current.shaderProgram;
    webglRef.current.attribLocs = {
      position: gl.getAttribLocation(prog, "a_position"),
      color: gl.getAttribLocation(prog, "a_color"),
    };
    webglRef.current.buffers = {
      position: gl.createBuffer(),
      color: gl.createBuffer(),
    };
    webglRef.current.uniformLocs = {
      resolution: gl.getUniformLocation(prog, "u_resolution"),
      tick: gl.getUniformLocation(prog, "u_tick"),
    };
    webglRef.current.data = { triangles: [], colors: [] };

    gl.viewport(0, 0, w, h);
    gl.useProgram(prog);
    gl.enableVertexAttribArray(webglRef.current.attribLocs.position);
    gl.enableVertexAttribArray(webglRef.current.attribLocs.color);
    gl.bindBuffer(gl.ARRAY_BUFFER, webglRef.current.buffers.position);
    gl.vertexAttribPointer(webglRef.current.attribLocs.position, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, webglRef.current.buffers.color);
    gl.vertexAttribPointer(webglRef.current.attribLocs.color, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2f(webglRef.current.uniformLocs.resolution, w, h);
    gl.clearColor(0, 0, 0, 0);

    webglRef.current.clear = () => {
      gl.clear(gl.COLOR_BUFFER_BIT);
      webglRef.current.data.triangles = [];
      webglRef.current.data.colors = [];
    };

    webglRef.current.draw = () => {
      gl.bindBuffer(gl.ARRAY_BUFFER, webglRef.current.buffers!.position);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(webglRef.current.data.triangles),
        gl.STATIC_DRAW
      );
      gl.bindBuffer(gl.ARRAY_BUFFER, webglRef.current.buffers!.color);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(webglRef.current.data.colors),
        gl.STATIC_DRAW
      );
      gl.drawArrays(
        gl.TRIANGLES,
        0,
        webglRef.current.data.triangles.length / 2
      );
    };

    const animate = () => {
      if (!isAnimating) return;
      webglRef.current.clear!();
      tickRef.current++;
      if (particlesRef.current.length < maxParticles) {
        particlesRef.current.push(createParticle(), createParticle());
      }
      particlesRef.current.sort((a, b) => a.time - b.time);
      particlesRef.current.forEach((p) => p.step());
      gl.uniform1f(webglRef.current.uniformLocs!.tick, tickRef.current / 100);
      webglRef.current.draw!();
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      dimensionsRef.current.cx = e.clientX;
      dimensionsRef.current.cy = e.clientY;
    };

    const handleResize = () => {
      const nw = window.innerWidth;
      const nh = window.innerHeight;
      canvas.width = nw;
      canvas.height = nh;
      dimensionsRef.current.width = nw;
      dimensionsRef.current.height = nh;
      gl.viewport(0, 0, nw, nh);
      gl.uniform2f(webglRef.current.uniformLocs!.resolution, nw, nh);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnimating, maxParticles, particleSizeMin, particleSizeMax, speedScale]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
};

export { ParticleCanvas };
