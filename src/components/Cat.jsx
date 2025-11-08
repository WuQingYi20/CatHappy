import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getDecorationsByPosition } from '../utils/catDecorations';

const Cat = ({ mode, onInteract, isCompleted, todayPomodoros = 0, streak = 0, totalPomodoros = 0 }) => {
  // 获取已解锁的装饰品
  const decorations = getDecorationsByPosition(totalPomodoros);
  const [animation, setAnimation] = useState('idle');
  const [mood, setMood] = useState('normal');
  const [randomAction, setRandomAction] = useState(null);

  // 根据进展确定猫咪心情
  useEffect(() => {
    if (todayPomodoros >= 10) {
      setMood('super_happy');
    } else if (todayPomodoros >= 5) {
      setMood('very_happy');
    } else if (todayPomodoros >= 3) {
      setMood('happy');
    } else if (todayPomodoros >= 1) {
      setMood('satisfied');
    } else {
      setMood('normal');
    }
  }, [todayPomodoros]);

  // 随机动作（每30-60秒）
  useEffect(() => {
    const randomActions = ['blink', 'tail_wag', 'stretch', 'yawn', 'look_around'];

    const interval = setInterval(() => {
      if (animation === 'study' || animation === 'idle') {
        const action = randomActions[Math.floor(Math.random() * randomActions.length)];
        setRandomAction(action);
        setTimeout(() => setRandomAction(null), 1000);
      }
    }, Math.random() * 30000 + 30000); // 30-60秒

    return () => clearInterval(interval);
  }, [animation]);

  // 根据模式改变猫咪动画
  useEffect(() => {
    if (isCompleted) {
      // 根据累计番茄钟数决定庆祝动画
      if (todayPomodoros >= 10) {
        setAnimation('super_celebrate');
      } else if (todayPomodoros >= 5) {
        setAnimation('big_celebrate');
      } else {
        setAnimation('celebrate');
      }
      setTimeout(() => setAnimation(getAnimationForMode(mode)), 2000);
    } else {
      setAnimation(getAnimationForMode(mode));
    }
  }, [mode, isCompleted, todayPomodoros]);

  const getAnimationForMode = (currentMode) => {
    if (currentMode === 'work') return 'study';
    if (currentMode === 'break') {
      // 根据心情决定休息动画
      if (mood === 'super_happy') return 'play';
      return 'rest';
    }
    return 'idle';
  };

  // 猫咪动画变体
  const catVariants = {
    idle: {
      y: [0, -5, 0],
      rotate: [0, -2, 2, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    study: {
      y: 0,
      rotate: 0,
      scale: [1, 1.02, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    rest: {
      rotate: [-5, 5, -5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    play: {
      y: [0, -10, 0],
      rotate: [0, 15, -15, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    celebrate: {
      y: [0, -30, 0],
      rotate: [0, 360],
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    big_celebrate: {
      y: [0, -40, -20, 0],
      rotate: [0, 180, 360],
      scale: [1, 1.3, 1.1, 1],
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    },
    super_celebrate: {
      y: [0, -50, -30, -10, 0],
      rotate: [0, 360, 720],
      scale: [1, 1.4, 1.2, 1.1, 1],
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    },
    interact: {
      scale: [1, 1.1, 1],
      rotate: [0, -10, 10, 0],
      transition: {
        duration: 0.5
      }
    }
  };

  const handleClick = () => {
    setAnimation('interact');
    setTimeout(() => setAnimation(getAnimationForMode(mode)), 500);
    onInteract && onInteract();
  };

  // 眼睛眨眼动画
  const eyeAnimation = randomAction === 'blink' ? {
    scaleY: [1, 0.1, 1],
    transition: { duration: 0.3 }
  } : {};

  // 尾巴摇动
  const tailAnimation = randomAction === 'tail_wag' ? {
    rotate: [0, 20, -20, 0],
    transition: { duration: 0.5 }
  } : {};

  // 获取猫咪颜色（根据心情）
  const getCatColor = () => {
    switch (mood) {
      case 'super_happy': return '#FFB347'; // 更亮的橙色
      case 'very_happy': return '#FFA94D';
      case 'happy': return '#FF9F66';
      default: return '#FF9F66';
    }
  };

  // 简单的猫咪SVG图形
  return (
    <div className="relative">
      <motion.div
        className="cursor-pointer select-none w-64 h-64 md:w-80 md:h-80"
        variants={catVariants}
        animate={animation}
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
      >
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-lg"
        >
          {/* 身体 */}
          <ellipse cx="100" cy="120" rx="50" ry="45" fill={getCatColor()} />

          {/* 头 */}
          <circle cx="100" cy="70" r="40" fill={getCatColor()} />

          {/* 白色肚子 */}
          <ellipse cx="100" cy="125" rx="35" ry="30" fill="#FFFFFF" />
          <ellipse cx="100" cy="75" rx="25" ry="20" fill="#FFFFFF" opacity="0.8" />

          {/* 耳朵 */}
          <path d="M 70 50 L 60 20 L 80 45 Z" fill={getCatColor()} />
          <path d="M 130 50 L 140 20 L 120 45 Z" fill={getCatColor()} />
          <path d="M 70 45 L 65 28 L 78 43 Z" fill="#FFB894" />
          <path d="M 130 45 L 135 28 L 122 43 Z" fill="#FFB894" />

          {/* 眼睛 - 根据心情和随机动作变化 */}
          <motion.g animate={eyeAnimation}>
            {animation === 'study' ? (
              // 专注的眼睛
              <>
                <ellipse cx="85" cy="70" rx="8" ry="6" fill="#2C3E50" />
                <ellipse cx="115" cy="70" rx="8" ry="6" fill="#2C3E50" />
                <circle cx="87" cy="69" r="2" fill="#FFFFFF" />
                <circle cx="117" cy="69" r="2" fill="#FFFFFF" />
              </>
            ) : mood === 'super_happy' ? (
              // 超开心的眯眯眼
              <>
                <path d="M 78 70 Q 85 75 92 70" stroke="#2C3E50" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 108 70 Q 115 75 122 70" stroke="#2C3E50" strokeWidth="3" fill="none" strokeLinecap="round" />
              </>
            ) : (
              // 普通的眼睛
              <>
                <circle cx="85" cy="70" r="6" fill="#2C3E50" />
                <circle cx="115" cy="70" r="6" fill="#2C3E50" />
                <circle cx="87" cy="68" r="2" fill="#FFFFFF" />
                <circle cx="117" cy="68" r="2" fill="#FFFFFF" />
              </>
            )}
          </motion.g>

          {/* 鼻子 */}
          <path d="M 100 82 L 97 88 L 103 88 Z" fill="#FF6B9D" />

          {/* 嘴巴 - 根据心情变化 */}
          {mood === 'super_happy' || mood === 'very_happy' ? (
            // 大笑的嘴巴
            <>
              <path d="M 100 88 Q 90 95 85 90" stroke="#2C3E50" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M 100 88 Q 110 95 115 90" stroke="#2C3E50" strokeWidth="2" fill="none" strokeLinecap="round" />
            </>
          ) : (
            // 普通嘴巴
            <>
              <path d="M 100 88 Q 95 92 90 90" stroke="#2C3E50" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M 100 88 Q 105 92 110 90" stroke="#2C3E50" strokeWidth="2" fill="none" strokeLinecap="round" />
            </>
          )}

          {/* 胡须 */}
          <line x1="60" y1="75" x2="40" y2="72" stroke="#2C3E50" strokeWidth="1.5" opacity="0.6" />
          <line x1="60" y1="80" x2="35" y2="80" stroke="#2C3E50" strokeWidth="1.5" opacity="0.6" />
          <line x1="140" y1="75" x2="160" y2="72" stroke="#2C3E50" strokeWidth="1.5" opacity="0.6" />
          <line x1="140" y1="80" x2="165" y2="80" stroke="#2C3E50" strokeWidth="1.5" opacity="0.6" />

          {/* 尾巴 */}
          <motion.path
            d="M 140 130 Q 170 140 180 120"
            stroke={getCatColor()}
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            animate={tailAnimation.rotate ? tailAnimation : {
              d: [
                "M 140 130 Q 170 140 180 120",
                "M 140 130 Q 170 135 180 125",
                "M 140 130 Q 170 140 180 120"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* 爪子 */}
          <ellipse cx="80" cy="160" rx="12" ry="8" fill={getCatColor()} />
          <ellipse cx="120" cy="160" rx="12" ry="8" fill={getCatColor()} />

          {/* 学习时的书本（仅在学习模式显示） */}
          {animation === 'study' && (
            <g>
              <rect x="60" y="145" width="35" height="25" fill="#74C0FC" rx="2" />
              <rect x="62" y="147" width="31" height="21" fill="#FFFFFF" opacity="0.8" />
              <line x1="67" y1="152" x2="88" y2="152" stroke="#74C0FC" strokeWidth="1" />
              <line x1="67" y1="157" x2="88" y2="157" stroke="#74C0FC" strokeWidth="1" />
              <line x1="67" y1="162" x2="85" y2="162" stroke="#74C0FC" strokeWidth="1" />
            </g>
          )}

          {/* 玩耍时的球（休息且心情好时） */}
          {animation === 'play' && (
            <motion.g
              animate={{
                x: [0, 20, -20, 0],
                y: [0, -10, -5, 0]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <circle cx="50" cy="150" r="8" fill="#FF6B6B" />
              <circle cx="48" cy="148" r="2" fill="#FFFFFF" opacity="0.7" />
            </motion.g>
          )}
        </svg>
      </motion.div>

      {/* 心情指示器 */}
      {(mood === 'very_happy' || mood === 'super_happy') && (
        <motion.div
          className="absolute top-0 right-0"
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="text-2xl">
            {mood === 'super_happy' ? '🌟' : '✨'}
          </div>
        </motion.div>
      )}

      {/* 连续天数成就徽章 */}
      {streak >= 7 && (
        <motion.div
          className="absolute bottom-0 left-0 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          🔥 {streak}日连续
        </motion.div>
      )}

      {/* ========== 持久化装饰品系统 ========== */}

      {/* 背景装饰 */}
      {decorations.background.map((deco, index) => (
        <motion.div
          key={deco.id}
          className="absolute inset-0 -z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1 }}
        >
          {deco.id === 'sakura' && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-3xl"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, 10, -10, 0],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                >
                  🌸
                </motion.div>
              ))}
            </>
          )}
        </motion.div>
      ))}

      {/* 光环装饰（周围） */}
      {decorations.aura.map((deco, index) => (
        <motion.div
          key={deco.id}
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {deco.id === 'stars' && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl"
                  style={{
                    left: `${50 + Math.cos((i / 6) * Math.PI * 2) * 45}%`,
                    top: `${50 + Math.sin((i / 6) * Math.PI * 2) * 45}%`
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </>
          )}
        </motion.div>
      ))}

      {/* 头部装饰（蝴蝶结/王冠） */}
      {decorations.head.map((deco, index) => (
        <motion.div
          key={deco.id}
          className="absolute top-0 left-1/2 -translate-x-1/2 text-4xl"
          initial={{ scale: 0, y: -20, rotate: -45 }}
          animate={{ scale: 1, y: 0, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <motion.div
            animate={{
              y: [0, -3, 0],
              rotate: [-2, 2, -2]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {deco.emoji}
          </motion.div>
          {/* 提示文字 */}
          <motion.div
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs bg-black/70 text-white px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity"
            initial={{ opacity: 0 }}
          >
            {deco.nameJp}
          </motion.div>
        </motion.div>
      ))}

      {/* 肩膀装饰（小鸟） */}
      {decorations.shoulder.map((deco, index) => (
        <motion.div
          key={deco.id}
          className="absolute top-[20%] right-[10%] text-3xl"
          initial={{ scale: 0, x: 50, opacity: 0 }}
          animate={{ scale: 1, x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <motion.div
            animate={{
              y: [0, -5, 0],
              rotate: [-5, 5, -5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {deco.emoji}
          </motion.div>
        </motion.div>
      ))}

      {/* 旁边装饰（小鱼干、书本等） */}
      <div className="absolute left-[-60px] top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {decorations.beside.map((deco, index) => (
          <motion.div
            key={deco.id}
            className="text-3xl"
            initial={{ scale: 0, x: -30, opacity: 0 }}
            animate={{ scale: 1, x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: index * 0.2 }}
          >
            <motion.div
              animate={{
                rotate: [-10, 10, -10],
                y: [0, -3, 0]
              }}
              transition={{
                duration: 2 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative group cursor-help"
            >
              {deco.emoji}
              {/* 提示文字 */}
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 text-xs bg-black/70 text-white px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {deco.nameJp}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* 尾巴装饰 */}
      {decorations.tail.map((deco, index) => (
        <motion.div
          key={deco.id}
          className="absolute bottom-[20%] right-[-40px] text-3xl"
          initial={{ scale: 0, rotate: -90, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <motion.div
            animate={{
              rotate: [0, 15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {deco.emoji}
          </motion.div>
        </motion.div>
      ))}

      {/* 装饰品数量提示 */}
      {totalPomodoros >= 3 && (
        <motion.div
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
        >
          {Object.values(decorations).flat().length}个装饰品已解锁
        </motion.div>
      )}
    </div>
  );
};

export default Cat;
