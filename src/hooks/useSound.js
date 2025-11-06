import { useState, useRef } from 'react';

// 简单的音效 hook（使用 Web Audio API）
export const useSound = () => {
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef(null);

  // 初始化 AudioContext
  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  // 播放简单的提示音（使用振荡器）
  const playBeep = (frequency = 800, duration = 0.2) => {
    if (isMuted) return;

    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  // 播放完成音效（两个音符的旋律）
  const playComplete = () => {
    if (isMuted) return;

    playBeep(659, 0.15); // E5
    setTimeout(() => playBeep(784, 0.3), 150); // G5
  };

  // 播放点击音效
  const playClick = () => {
    if (isMuted) return;
    playBeep(1000, 0.05);
  };

  // 播放猫叫音效（模拟）
  const playMeow = () => {
    if (isMuted) return;

    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // 模拟"喵~"的音调变化
      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.3);
      oscillator.type = 'triangle';

      gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.3);
    } catch (error) {
      console.error('Error playing meow:', error);
    }
  };

  // 切换静音
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return {
    isMuted,
    playComplete,
    playClick,
    playMeow,
    toggleMute,
  };
};
