import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const Confetti = ({ isActive, intensity = 'normal', onComplete }) => {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    if (isActive) {
      generateConfetti();
      // 3秒后自动完成
      const timer = setTimeout(() => {
        onComplete?.();
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setConfetti([]);
    }
  }, [isActive]);

  const generateConfetti = () => {
    // 根据强度调整数量
    const counts = {
      normal: 50,      // 普通完成
      milestone: 100,  // 里程碑 (3, 5, 10...)
      mega: 150        // 超级里程碑 (10+)
    };

    const count = counts[intensity] || counts.normal;

    // Happy色系
    const colors = [
      '#FFD93D', // happy-yellow
      '#FF9ECD', // happy-pink
      '#BC78FF', // celebrate-purple
      '#FF9F66', // cat-orange
      '#FF6B6B', // tomato-red
      '#4ECDC4', // cyan
      '#95E1D3', // mint
      '#FFA94D', // orange
    ];

    const shapes = ['circle', 'square', 'triangle'];

    const newConfetti = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // 0-100%
      y: -20, // 从屏幕上方开始
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      size: Math.random() * 10 + 8, // 8-18px
      delay: Math.random() * 0.5, // 0-0.5s延迟
      duration: Math.random() * 2 + 2, // 2-4s落下
      wobble: Math.random() * 40 - 20, // -20 到 20 的横向摆动
    }));

    setConfetti(newConfetti);
  };

  const getShape = (shape, color, size) => {
    const style = { width: size, height: size, backgroundColor: color };

    switch (shape) {
      case 'circle':
        return <div className="rounded-full" style={style} />;
      case 'square':
        return <div className="rounded-sm" style={style} />;
      case 'triangle':
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${size / 2}px solid transparent`,
              borderRight: `${size / 2}px solid transparent`,
              borderBottom: `${size}px solid ${color}`,
            }}
          />
        );
      default:
        return <div style={style} />;
    }
  };

  const getCelebrationText = () => {
    switch (intensity) {
      case 'mega':
        return '🌟 すごい！Amazing！🌟';
      case 'milestone':
        return '🎉 よくできました！🎉';
      default:
        return '✨ 完成！✨';
    }
  };

  return (
    <AnimatePresence>
      {isActive && (
        <>
          {/* 五彩纸屑 */}
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {confetti.map((piece) => (
              <motion.div
                key={piece.id}
                className="absolute"
                initial={{
                  x: `${piece.x}vw`,
                  y: `${piece.y}vh`,
                  rotate: 0,
                  opacity: 1,
                }}
                animate={{
                  y: '120vh', // 落到屏幕外
                  x: [`${piece.x}vw`, `${piece.x + piece.wobble}vw`, `${piece.x}vw`], // 摆动
                  rotate: [0, piece.rotation, piece.rotation * 2], // 旋转
                  opacity: [1, 1, 0.5, 0],
                }}
                transition={{
                  duration: piece.duration,
                  delay: piece.delay,
                  ease: 'easeIn',
                }}
              >
                {getShape(piece.shape, piece.color, piece.size)}
              </motion.div>
            ))}
          </div>

          {/* 大号庆祝文字 */}
          <motion.div
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <motion.div
              className="text-center"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [-2, 2, -2],
              }}
              transition={{
                duration: 0.5,
                repeat: 5,
                ease: 'easeInOut',
              }}
            >
              <div
                className="text-6xl md:text-8xl font-black bg-gradient-to-r from-happy-yellow via-happy-pink to-celebrate-purple bg-clip-text text-transparent"
                style={{
                  textShadow: '0 4px 20px rgba(255, 217, 61, 0.5)',
                  WebkitTextStroke: '2px rgba(255, 255, 255, 0.8)',
                  paintOrder: 'stroke fill',
                }}
              >
                {getCelebrationText()}
              </div>

              {/* 副标题 */}
              <motion.div
                className="text-2xl md:text-3xl font-bold text-gray-700 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {intensity === 'mega' && '你是今日学霸！'}
                {intensity === 'milestone' && '又解锁新成就！'}
                {intensity === 'normal' && '继续保持！がんばって！'}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* 背景光效 */}
          <motion.div
            className="fixed inset-0 pointer-events-none z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-happy-yellow via-happy-pink to-celebrate-purple blur-3xl" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Confetti;
