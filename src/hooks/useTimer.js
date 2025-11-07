import { useState, useEffect, useRef } from 'react';

export const useTimer = (initialDuration = 1500) => {
  const [duration, setDuration] = useState(initialDuration); // 总时长（秒）
  const [remaining, setRemaining] = useState(initialDuration); // 剩余时间（秒）
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('work'); // 'work' | 'break'
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null); // 记录开始时间戳
  const elapsedRef = useRef(0); // 记录已经过的时间

  // 计时器逻辑 - 使用时间戳确保后台运行时准确
  useEffect(() => {
    if (isRunning && remaining > 0) {
      // 记录开始时间
      startTimeRef.current = Date.now();

      intervalRef.current = setInterval(() => {
        // 计算实际经过的时间（毫秒）
        const now = Date.now();
        const actualElapsed = Math.floor((now - startTimeRef.current) / 1000);

        // 重置开始时间用于下一次计算
        startTimeRef.current = now;

        setRemaining((prev) => {
          const newRemaining = prev - actualElapsed;

          if (newRemaining <= 0) {
            setIsRunning(false);
            return 0;
          }
          return newRemaining;
        });

        elapsedRef.current += actualElapsed;
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, remaining]);

  // 开始计时
  const start = () => {
    elapsedRef.current = 0; // 重置已过时间
    setIsRunning(true);
  };

  // 暂停计时
  const pause = () => {
    setIsRunning(false);
  };

  // 重置计时器
  const reset = () => {
    setIsRunning(false);
    setRemaining(duration);
    elapsedRef.current = 0;
  };

  // 设置新的时长
  const setNewDuration = (newDuration) => {
    setDuration(newDuration);
    setRemaining(newDuration);
    setIsRunning(false);
  };

  // 切换模式
  const switchMode = (newMode) => {
    setMode(newMode);
    if (newMode === 'work') {
      setNewDuration(1500); // 25分钟
    } else {
      setNewDuration(300); // 5分钟
    }
  };

  // 格式化时间显示 (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // 计算进度百分比
  const progress = ((duration - remaining) / duration) * 100;

  return {
    remaining,
    isRunning,
    mode,
    duration,
    progress,
    start,
    pause,
    reset,
    setNewDuration,
    switchMode,
    formatTime,
  };
};
