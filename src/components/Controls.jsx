import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Settings as SettingsIcon } from 'lucide-react';

const Controls = ({ isRunning, onStart, onPause, onReset, onSettings }) => {
  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <div className="flex justify-center items-center gap-4">
      {/* 开始/暂停按钮 */}
      {!isRunning ? (
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={onStart}
          className="flex items-center gap-2 px-6 py-3 bg-tomato-red text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
        >
          <Play size={20} fill="white" />
          <span>开始</span>
        </motion.button>
      ) : (
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={onPause}
          className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
        >
          <Pause size={20} fill="white" />
          <span>暂停</span>
        </motion.button>
      )}

      {/* 重置按钮 */}
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={onReset}
        className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
      >
        <RotateCcw size={20} />
        <span>重置</span>
      </motion.button>

      {/* 设置按钮（可选） */}
      {onSettings && (
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={onSettings}
          className="p-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          title="设置"
        >
          <SettingsIcon size={20} />
        </motion.button>
      )}
    </div>
  );
};

export default Controls;
