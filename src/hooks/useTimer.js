import { useState, useEffect, useRef } from 'react';

export const useTimer = (initialDuration = 1500) => {
  const [duration, setDuration] = useState(initialDuration); // 总时长（秒）
  const [remaining, setRemaining] = useState(initialDuration); // 剩余时间（秒）
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('work'); // 'work' | 'break'
  const intervalRef = useRef(null);

  // 计时器逻辑
  useEffect(() => {
    if (isRunning && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
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
