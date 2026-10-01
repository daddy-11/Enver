import { useEffect, useRef } from 'react';

interface ThreadsProps {
  color?: [number, number, number];
  amplitude?: number;
  distance?: number;
  enableMouseInteraction?: boolean;
  className?: string;
}

export default function Threads({
  color = [0.9019607843137255, 0.396078431372549, 0.047058823529411764],
  amplitude = 1,
  distance = 0,
  enableMouseInteraction = true,
  className = ''
}: ThreadsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform vec3 u_color;
      uniform float u_amplitude;
      uniform float u_distance;

      float hash(float n) { return fract(sin(n) * 43758.5453123); }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        float aspect = u_resolution.x / u_resolution.y;
        uv.x *= aspect;

        vec2 mouse = u_mouse;
        mouse.x *= aspect;

        float lines = 0.0;
        float totalLines = 30.0;

        for (float i = 0.0; i < 30.0; i++) {
          float t = i / totalLines;
          float baseY = t;
          float freq = 2.0 + hash(i) * 3.0;
          float amp = 0.02 * u_amplitude * (0.5 + hash(i * 7.0) * 0.5);
          float speed = 0.5 + hash(i * 13.0) * 0.5;
          
          float wave = sin(uv.x * freq * 3.14159 + u_time * speed + i) * amp;
          
          if (u_distance > 0.0) {
            float dist = length(vec2(uv.x - mouse.x, (uv.y - mouse.y)));
            wave += sin(dist * 10.0 - u_time * 2.0) * 0.01 * u_distance;
          }

          float mouseInfluence = 0.0;
          if (u_amplitude > 0.0) {
            float mouseDist = abs(uv.y - mouse.y);
            mouseInfluence = exp(-mouseDist * 8.0) * (mouse.x - 0.5 * aspect) * 0.1;
          }

          float y = baseY + wave + mouseInfluence;
          float line = smoothstep(0.003, 0.0, abs(uv.y - y));
          
          float alpha = 0.3 + 0.4 * (1.0 - t);
          lines += line * alpha;
        }

        vec3 col = u_color * lines;
        gl_FragColor = vec4(col, lines * 0.8);
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const resolutionLoc = gl.getUniformLocation(program, 'u_resolution');
    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const mouseLoc = gl.getUniformLocation(program, 'u_mouse');
    const colorLoc = gl.getUniformLocation(program, 'u_color');
    const amplitudeLoc = gl.getUniformLocation(program, 'u_amplitude');
    const distanceLoc = gl.getUniformLocation(program, 'u_distance');

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const startTime = performance.now();

    const render = () => {
      const time = (performance.now() - startTime) / 1000;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, time);
      gl.uniform2f(mouseLoc, mouseRef.current.x, mouseRef.current.y);
      gl.uniform3f(colorLoc, color[0], color[1], color[2]);
      gl.uniform1f(amplitudeLoc, amplitude);
      gl.uniform1f(distanceLoc, distance);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationRef.current = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableMouseInteraction) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: 1.0 - (e.clientY - rect.top) / rect.height
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [color, amplitude, distance, enableMouseInteraction]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ display: 'block' }}
    />
  );
}
