import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Sparkles, Heart, Zap, Star } from 'lucide-react';

const Message = ({ message, type = 'default' }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
    }
  }, [message]);

  const getMessageConfig = () => {
    switch (type) {
      case 'milestone':
        return {
          bgClass: 'bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400',
          icon: Star,
          borderColor: 'border-yellow-300',
          shadowClass: 'shadow-glow'
        };
      case 'complete':
        return {
          bgClass: 'bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400',
          icon: Sparkles,
          borderColor: 'border-green-300',
          shadowClass: 'shadow-lg'
        };
      case 'break':
        return {
          bgClass: 'bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400',
          icon: Heart,
          borderColor: 'border-blue-300',
          shadowClass: 'shadow-lg'
        };
      default:
        return {
          bgClass: 'bg-gradient-to-r from-cat-orange to-yellow-400',
          icon: Zap,
          borderColor: 'border-orange-200',
          shadowClass: 'shadow-happy'
        };
    }
  };

  const config = getMessageConfig();
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {show && message && (
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
          className="mb-6"
        >
          <div className={`
            relative overflow-hidden
            ${config.bgClass}
            border-2 ${config.borderColor}
            px-6 py-5 rounded-2xl ${config.shadowClass}
            text-white text-center
            font-medium text-base md:text-lg
            max-w-2xl mx-auto
          `}>
            {/* 背景装饰 - 流动的光点 */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-20 h-20 bg-white rounded-full blur-2xl opacity-20"
                  animate={{
                    x: ['-10%', '110%'],
                    y: ['0%', '100%', '0%']
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut"
                  }}
                  style={{
                    top: `${i * 30}%`,
                    left: `${i * 20}%`
                  }}
                />
              ))}
            </div>

            {/* 内容 */}
            <div className="relative z-10 flex items-center justify-center gap-3">
              {/* 图标 */}
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Icon size={28} className="drop-shadow-md" />
              </motion.div>

              {/* 文字 */}
              <motion.p
                className="leading-relaxed drop-shadow-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                {message}
              </motion.p>

              {/* 猫耳朵装饰 */}
              <motion.span
                className="text-2xl drop-shadow-md"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🐱
              </motion.span>
            </div>

            {/* 底部小星星装饰 */}
            {type === 'milestone' && (
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="text-yellow-200"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: [0, 1, 0], y: [10, 0, -10] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeOut"
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </div>
            )}

            {/* 爱心装饰（休息时） */}
            {type === 'break' && (
              <div className="absolute top-2 right-2">
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 15, -15, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-pink-200"
                >
                  💙
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Message;
