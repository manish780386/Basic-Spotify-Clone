import { useEffect, useRef } from "react";

export default function useAudioVisualizer(audioRef, canvasRef) {
  const animationRef = useRef();

  useEffect(() => {
    if (!audioRef?.current || !canvasRef?.current) return;

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaElementSource(audioRef.current);
    const analyser = audioCtx.createAnalyser();

    analyser.fftSize = 128;
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = canvas.width / bufferLength;
      let x = 0;

      dataArray.forEach((value) => {
        const barHeight = value / 2;
        ctx.fillStyle = "#22c55e"; // green
        ctx.fillRect(
          x,
          canvas.height - barHeight,
          barWidth - 1,
          barHeight
        );
        x += barWidth;
      });
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
      audioCtx.close();
    };
  }, [audioRef, canvasRef]);
}
