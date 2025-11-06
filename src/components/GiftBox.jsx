import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Gift, Sparkles, BookOpen, Award } from 'lucide-react';

const GiftBox = ({ milestone, onClose }) => {
  const [isOpened, setIsOpened] = useState(false);

  if (!milestone) return null;

  const handleOpen = () => {
    setIsOpened(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* 背景遮罩 */}
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => isOpened && onClose()}
        />

        {/* 主内容 */}
        <motion.div
          className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-warm-light via-white to-happy-yellow/20 rounded-3xl shadow-2xl"
          initial={{ scale: 0.5, y: 100, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          {!isOpened ? (
            // 未打开的礼物盒
            <div className="p-8 text-center">
              {/* 猫咪头像 */}
              <motion.div
                className="text-8xl mb-6"
                animate={{
                  y: [0, -10, 0],
                  rotate: [-5, 5, -5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                🐱
              </motion.div>

              {/* 提示文字 */}
              <motion.p
                className="text-2xl font-bold text-gray-700 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {milestone.message}
              </motion.p>

              <motion.p
                className="text-xl text-cat-orange font-bold mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {milestone.messageJp}
              </motion.p>

              {/* 礼物盒 */}
              <motion.div
                className="inline-block cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleOpen}
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <div className="relative">
                  {/* 闪光效果 */}
                  <motion.div
                    className="absolute -inset-4"
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  >
                    <Sparkles className="text-happy-yellow absolute top-0 left-0" size={24} />
                    <Sparkles className="text-happy-pink absolute top-0 right-0" size={20} />
                    <Sparkles className="text-celebrate-purple absolute bottom-0 left-0" size={18} />
                    <Sparkles className="text-cat-orange absolute bottom-0 right-0" size={22} />
                  </motion.div>

                  <div className="text-9xl">
                    🎁
                  </div>
                </div>
              </motion.div>

              <motion.p
                className="text-lg text-gray-600 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                点击礼物盒打开惊喜~ ✨
              </motion.p>
            </div>
          ) : (
            // 已打开 - 显示奖励内容
            <motion.div
              className="p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* 顶部徽章 */}
              <motion.div
                className="text-center mb-8"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
              >
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-happy-yellow via-cat-orange to-happy-pink p-4 rounded-2xl shadow-glow">
                  <span className="text-4xl">{milestone.badgeEmoji}</span>
                  <div className="text-left">
                    <div className="text-2xl font-black text-white">{milestone.badge}</div>
                    <div className="text-sm text-white/90">{milestone.titleJp}</div>
                  </div>
                  <Award className="text-white" size={32} />
                </div>
              </motion.div>

              {/* 猫咪礼物 */}
              {milestone.catGift && (
                <motion.div
                  className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-2xl p-6 mb-6"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-5xl">{milestone.catGift.emoji}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <Gift className="text-cat-orange" size={20} />
                        <h3 className="text-xl font-bold text-gray-800">猫咪的礼物</h3>
                      </div>
                      <p className="text-lg font-bold text-cat-orange">{milestone.catGift.name}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{milestone.catGift.message}</p>
                </motion.div>
              )}

              {/* N3学习奖励 */}
              {milestone.n3Reward && milestone.n3Reward.phrases && (
                <motion.div
                  className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="text-celebrate-purple" size={24} />
                    <h3 className="text-xl font-bold text-gray-800">
                      解锁N3短语：{milestone.n3Reward.category}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {milestone.n3Reward.phrases.map((phrase, index) => (
                      <motion.div
                        key={index}
                        className="bg-white/70 rounded-xl p-3 hover:bg-white/90 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="font-bold text-lg text-gray-800">{phrase.jp}</div>
                            <div className="text-sm text-gray-500">{phrase.romaji}</div>
                          </div>
                          <div className="text-gray-700 font-medium">{phrase.meaning}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 下一个目标提示 */}
              {milestone.nextHint && (
                <motion.div
                  className="bg-gradient-to-r from-happy-pink/20 to-celebrate-purple/20 rounded-2xl p-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <p className="text-gray-700 font-medium">
                    💡 {milestone.nextHint}
                  </p>
                </motion.div>
              )}

              {/* 关闭按钮 */}
              <motion.button
                className="w-full mt-6 bg-gradient-to-r from-cat-orange to-happy-yellow text-white font-bold py-4 px-6 rounded-xl hover:shadow-glow transition-shadow"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                太棒了！继续加油！がんばろう！
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* 周围的装饰星星 */}
        {isOpened && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl pointer-events-none"
                initial={{
                  x: '50vw',
                  y: '50vh',
                  scale: 0,
                  opacity: 0
                }}
                animate={{
                  x: `${50 + Math.cos((i / 12) * Math.PI * 2) * 40}vw`,
                  y: `${50 + Math.sin((i / 12) * Math.PI * 2) * 40}vh`,
                  scale: 1,
                  opacity: [0, 1, 0],
                  rotate: 360
                }}
                transition={{
                  duration: 2,
                  delay: 0.2 + i * 0.05,
                  ease: 'easeOut'
                }}
              >
                {['⭐', '✨', '🌟'][i % 3]}
              </motion.div>
            ))}
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default GiftBox;
