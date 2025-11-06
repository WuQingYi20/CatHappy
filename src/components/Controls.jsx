import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

const Controls = ({ isRunning, onStart, onPause, onReset }) => {
  const buttonVariants = {
    hover: { scale: 1.05, y: -2 },
    tap: { scale: 0.95 }
  };

  return (
    <div className="flex justify-center items-center gap-3 md:gap-4">
      {/* 开始/暂停按钮 */}
      {!isRunning ? (
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={onStart}
          className="relative overflow-hidden flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-tomato-red to-orange-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl transition-shadow group"
        >
          {/* 闪光效果 */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
            animate={{
              x: ['-100%', '200%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
          />

          <motion.div
            animate={{
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Play size={24} fill="white" />
          </motion.div>
          <span className="relative z-10">开始学习</span>

          {/* 装饰圆点 */}
          <div className="absolute -right-1 -top-1 w-3 h-3 bg-happy-yellow rounded-full animate-ping" />
        </motion.button>
      ) : (
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={onPause}
          className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl transition-shadow"
        >
          <Pause size={24} fill="white" />
          <span>暂停</span>
        </motion.button>
      )}

      {/* 重置按钮 */}
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={onReset}
        className="flex items-center gap-2 px-6 py-4 bg-white text-gray-700 rounded-2xl font-semibold shadow-md hover:shadow-lg border-2 border-gray-200 transition-all"
      >
        <motion.div
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.3 }}
        >
          <RotateCcw size={20} />
        </motion.div>
        <span className="hidden sm:inline">重置</span>
      </motion.button>
    </div>
  );
};

export default Controls;
