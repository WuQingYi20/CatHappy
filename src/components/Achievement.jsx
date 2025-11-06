import { motion, AnimatePresence } from 'framer-motion';
import { Award, X, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

const Achievement = ({ achievement, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (achievement) {
      setShow(true);
      // 5秒后自动关闭
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [achievement]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      onClose && onClose();
    }, 300);
  };

  return (
    <AnimatePresence>
      {show && achievement && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        >
          <motion.div
            initial={{ scale: 0.5, rotate: -10, y: 50 }}
            animate={{ scale: 1, rotate: 0, y: 0 }}
            exit={{ scale: 0.5, rotate: 10, y: 50 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-8 max-w-md shadow-2xl border-4 border-yellow-300 relative"
          >
            {/* 关闭按钮 */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </motion.button>

            {/* 烟花效果 */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                  initial={{
                    x: '50%',
                    y: '50%',
                    scale: 0,
                    opacity: 1
                  }}
                  animate={{
                    x: `${50 + (Math.cos(i * 60 * Math.PI / 180) * 100)}%`,
                    y: `${50 + (Math.sin(i * 60 * Math.PI / 180) * 100)}%`,
                    scale: [0, 1, 0],
                    opacity: [1, 1, 0]
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.2,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>

            {/* 标题 */}
            <div className="text-center mb-6">
              <motion.div
                animate={{
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.3
                }}
                className="inline-block mb-3"
              >
                <Award className="text-yellow-500" size={48} />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                🎉 新成就解锁！
              </h2>
              <p className="text-sm text-gray-600">Achievement Unlocked!</p>
            </div>

            {/* 成就内容 */}
            <div className="bg-white rounded-2xl p-6 mb-4 shadow-lg border-2 border-yellow-200">
              {/* 日语称号 */}
              <div className="text-center mb-4">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="relative inline-block"
                >
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mb-1">
                    {achievement.japanese}
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-2 -right-2"
                  >
                    <Sparkles className="text-yellow-400" size={20} />
                  </motion.div>
                </motion.div>
                <p className="text-sm text-gray-500 italic mb-2">{achievement.romaji}</p>
                <p className="text-lg text-gray-700 font-medium">{achievement.chinese}</p>
              </div>

              {/* 分隔线 */}
              <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mb-4 rounded-full" />

              {/* 描述 */}
              <p className="text-center text-gray-600 text-sm">
                {achievement.description}
              </p>
            </div>

            {/* 底部鼓励 */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center text-sm text-gray-700 font-medium"
            >
              太棒了！继续加油 (๑•̀ㅂ•́)و✧
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Achievement;
