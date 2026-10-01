import React, { useEffect, useRef } from "react";

interface ShaderGradientProps {
  className?: string;
  speed?: number;
  intensity?: number;
}

export default function ShaderGradient({ className = "", speed = 0.003, intensity = 1.0 }: ShaderGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl") || (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return;

    // Vertex shader
    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment shader with Camel, Mist, and Saffron fluid blending
    const fsSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;

      // Color Palette: Camel, Mist, Saffron
      // Camel: #C49A6C (196, 154, 108)
      // Mist: #F4F3EE (244, 243, 238)
      // Saffron: #FF6F1E (255, 111, 30)
      const vec3 c_camel = vec3(0.77, 0.60, 0.42);
      const vec3 c_mist = vec3(0.96, 0.95, 0.93);
      const vec3 c_saffron = vec3(1.0, 0.435, 0.12);
      const vec3 c_warm_sand = vec3(0.88, 0.78, 0.67);

      // Simplex-inspired 2D noise
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        st.x *= u_resolution.x / u_resolution.y;

        float t = u_time * 0.4;
        vec2 mouse = u_mouse / u_resolution.xy;

        // Domain warping for organic liquid gradient flow
        vec2 q = vec2(0.0);
        q.x = snoise(st + vec2(0.0, t * 0.2));
        q.y = snoise(st + vec2(t * 0.3, 0.0));

        vec2 r = vec2(0.0);
        r.x = snoise(st + 1.2 * q + vec2(1.7, 9.2) + 0.15 * t + mouse * 0.3);
        r.y = snoise(st + 1.4 * q + vec2(8.3, 2.8) + 0.12 * t);

        float f = snoise(st + r * 1.5);

        // Harmonious color interpolation: Mist baseline -> Camel warmth -> Saffron bloom
        float w1 = smoothstep(-0.4, 0.6, f);
        float w2 = smoothstep(0.1, 0.9, f + r.x * 0.3);
        float w3 = smoothstep(0.3, 1.2, f * 1.3);

        vec3 color = mix(c_mist, c_warm_sand, w1);
        color = mix(color, c_camel, w2 * 0.85);
        color = mix(color, c_saffron, w3 * 0.55);

        // Add subtle film grain for Basement Studio feel
        float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
        color += (grain - 0.5) * 0.035;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    const positionLoc = gl.getAttribLocation(program, "position");
    const resLoc = gl.getUniformLocation(program, "u_resolution");
    const timeLoc = gl.getUniformLocation(program, "u_time");
    const mouseLoc = gl.getUniformLocation(program, "u_mouse");

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    let animationFrameId: number;
    let startTime = performance.now();
    let mouse = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = rect.height - (e.clientY - rect.top);
    };

    window.addEventListener("mousemove", handleMouseMove);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resize);
    resize();

    const render = () => {
      const currentTime = (performance.now() - startTime) * speed;

      gl.useProgram(program);
      gl.enableVertexAttribArray(positionLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, currentTime);
      gl.uniform2f(mouseLoc, mouse.x, mouse.y);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [speed]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block pointer-events-none"
      />
    </div>
  );
}
