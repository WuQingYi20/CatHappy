import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Cat = ({ mode, onInteract, isCompleted }) => {
  const [animation, setAnimation] = useState('idle');

  // 根据模式改变猫咪动画
  useEffect(() => {
    if (isCompleted) {
      setAnimation('celebrate');
      setTimeout(() => setAnimation(getAnimationForMode(mode)), 2000);
    } else {
      setAnimation(getAnimationForMode(mode));
    }
  }, [mode, isCompleted]);

  const getAnimationForMode = (currentMode) => {
    if (currentMode === 'work') return 'study';
    if (currentMode === 'break') return 'rest';
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
    celebrate: {
      y: [0, -30, 0],
      rotate: [0, 360],
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.8,
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

  // 简单的猫咪SVG图形
  return (
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
        <ellipse cx="100" cy="120" rx="50" ry="45" fill="#FF9F66" />

        {/* 头 */}
        <circle cx="100" cy="70" r="40" fill="#FF9F66" />

        {/* 白色肚子 */}
        <ellipse cx="100" cy="125" rx="35" ry="30" fill="#FFFFFF" />
        <ellipse cx="100" cy="75" rx="25" ry="20" fill="#FFFFFF" opacity="0.8" />

        {/* 耳朵 */}
        <path d="M 70 50 L 60 20 L 80 45 Z" fill="#FF9F66" />
        <path d="M 130 50 L 140 20 L 120 45 Z" fill="#FF9F66" />
        <path d="M 70 45 L 65 28 L 78 43 Z" fill="#FFB894" />
        <path d="M 130 45 L 135 28 L 122 43 Z" fill="#FFB894" />

        {/* 眼睛 */}
        {animation === 'study' ? (
          // 专注的眼睛
          <>
            <ellipse cx="85" cy="70" rx="8" ry="6" fill="#2C3E50" />
            <ellipse cx="115" cy="70" rx="8" ry="6" fill="#2C3E50" />
            <circle cx="87" cy="69" r="2" fill="#FFFFFF" />
            <circle cx="117" cy="69" r="2" fill="#FFFFFF" />
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

        {/* 鼻子 */}
        <path d="M 100 82 L 97 88 L 103 88 Z" fill="#FF6B9D" />

        {/* 嘴巴 */}
        <path d="M 100 88 Q 95 92 90 90" stroke="#2C3E50" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 100 88 Q 105 92 110 90" stroke="#2C3E50" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* 胡须 */}
        <line x1="60" y1="75" x2="40" y2="72" stroke="#2C3E50" strokeWidth="1.5" opacity="0.6" />
        <line x1="60" y1="80" x2="35" y2="80" stroke="#2C3E50" strokeWidth="1.5" opacity="0.6" />
        <line x1="140" y1="75" x2="160" y2="72" stroke="#2C3E50" strokeWidth="1.5" opacity="0.6" />
        <line x1="140" y1="80" x2="165" y2="80" stroke="#2C3E50" strokeWidth="1.5" opacity="0.6" />

        {/* 尾巴 */}
        <motion.path
          d="M 140 130 Q 170 140 180 120"
          stroke="#FF9F66"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          animate={{
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
        <ellipse cx="80" cy="160" rx="12" ry="8" fill="#FF9F66" />
        <ellipse cx="120" cy="160" rx="12" ry="8" fill="#FF9F66" />

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
      </svg>
    </motion.div>
  );
};

export default Cat;
