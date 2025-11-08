import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Unlock, Award } from 'lucide-react';
import { CAT_DECORATIONS, getUnlockedDecorations, getCollectionProgress } from '../utils/catDecorations';

const DecorationGallery = ({ totalPomodoros, isOpen, onClose }) => {
  const unlockedDecorations = getUnlockedDecorations(totalPomodoros);
  const progress = getCollectionProgress(totalPomodoros);
  const allDecorations = Object.values(CAT_DECORATIONS).sort((a, b) => a.unlockAt - b.unlockAt);

  const isUnlocked = (decorationId) => {
    return unlockedDecorations.some(d => d.id === decorationId);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* 背景遮罩 */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={onClose}
          />

          {/* 主内容 */}
          <motion.div
            className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-warm-light via-white to-happy-yellow/20 rounded-3xl shadow-2xl p-8"
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            {/* 关闭按钮 */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X size={24} />
            </button>

            {/* 标题 */}
            <div className="text-center mb-8">
              <motion.div
                className="inline-block text-6xl mb-4"
                animate={{
                  rotate: [-5, 5, -5],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🎨
              </motion.div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-cat-orange via-happy-yellow to-happy-pink bg-clip-text text-transparent mb-2">
                猫咪装饰品图鉴
              </h2>
              <p className="text-gray-600">コレクション · Collection</p>
            </div>

            {/* 进度条 */}
            <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Award className="text-cat-orange" size={24} />
                  <span className="font-bold text-gray-800">收集进度</span>
                </div>
                <span className="text-2xl font-black bg-gradient-to-r from-cat-orange to-happy-yellow bg-clip-text text-transparent">
                  {progress}%
                </span>
              </div>

              {/* 进度条 */}
              <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cat-orange via-happy-yellow to-happy-pink"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>

              <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                <span>已解锁 {unlockedDecorations.length} / {allDecorations.length}</span>
                <span>{allDecorations.length - unlockedDecorations.length} 个待解锁</span>
              </div>
            </div>

            {/* 装饰品网格 */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {allDecorations.map((decoration, index) => {
                const unlocked = isUnlocked(decoration.id);
                const replaced = decoration.replacesDecoration && isUnlocked(decoration.replacesDecoration);

                return (
                  <motion.div
                    key={decoration.id}
                    className={`relative rounded-2xl p-5 transition-all ${
                      unlocked
                        ? 'bg-gradient-to-br from-white to-happy-yellow/20 shadow-lg border-2 border-happy-yellow'
                        : 'bg-gray-100 opacity-60'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: unlocked ? 1.05 : 1 }}
                  >
                    {/* 锁定/解锁图标 */}
                    <div className="absolute top-2 right-2">
                      {unlocked ? (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          <Unlock className="text-green-500" size={20} />
                        </motion.div>
                      ) : (
                        <Lock className="text-gray-400" size={20} />
                      )}
                    </div>

                    {/* Emoji */}
                    <motion.div
                      className={`text-5xl mb-3 text-center ${!unlocked && 'grayscale'}`}
                      animate={unlocked ? {
                        y: [0, -5, 0],
                        rotate: [-3, 3, -3]
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {unlocked ? decoration.emoji : '❓'}
                    </motion.div>

                    {/* 名称 */}
                    <div className="text-center mb-2">
                      <div className={`font-bold ${unlocked ? 'text-gray-800' : 'text-gray-400'}`}>
                        {unlocked ? decoration.name : '???'}
                      </div>
                      <div className={`text-sm ${unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                        {unlocked ? decoration.nameJp : '???'}
                      </div>
                    </div>

                    {/* 描述 */}
                    <div className={`text-xs text-center mb-3 min-h-[40px] ${unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                      {unlocked ? decoration.description : '完成更多番茄钟解锁'}
                    </div>

                    {/* 解锁条件 */}
                    <div className={`text-center py-1.5 px-3 rounded-full text-xs font-bold ${
                      unlocked
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {unlocked ? (
                        <>✓ 已解锁</>
                      ) : (
                        <>需要 {decoration.unlockAt} 个番茄钟</>
                      )}
                    </div>

                    {/* 替换提示 */}
                    {decoration.replacesDecoration && (
                      <div className="mt-2 text-xs text-center text-purple-600">
                        ⚠️ 会替换 {CAT_DECORATIONS[decoration.replacesDecoration]?.name}
                      </div>
                    )}

                    {/* 已解锁的光效 */}
                    {unlocked && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        animate={{
                          boxShadow: [
                            '0 0 0px rgba(255, 217, 61, 0)',
                            '0 0 20px rgba(255, 217, 61, 0.4)',
                            '0 0 0px rgba(255, 217, 61, 0)'
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* 提示信息 */}
            <motion.div
              className="mt-8 bg-gradient-to-r from-happy-pink/20 to-celebrate-purple/20 rounded-2xl p-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-gray-700 font-medium">
                💡 完成更多番茄钟，让猫咪变得更漂亮！
              </p>
              <p className="text-sm text-gray-600 mt-1">
                装饰品会永久显示在猫咪身上~ もっと頑張ろう！
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DecorationGallery;
