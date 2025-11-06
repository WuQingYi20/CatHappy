import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, BookOpen, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { getRandomConversationPhrase } from '../utils/japanesePhrases';

const BreakCard = ({ isBreak, onNewPhrase }) => {
  const [phrase, setPhrase] = useState(getRandomConversationPhrase());
  const [flipped, setFlipped] = useState(false);

  const handleRefresh = () => {
    const newPhrase = getRandomConversationPhrase();
    setPhrase(newPhrase);
    setFlipped(false);
    onNewPhrase && onNewPhrase(newPhrase);
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <AnimatePresence>
      {isBreak && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-6"
        >
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 shadow-lg border-2 border-blue-200">
            {/* 标题 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Coffee className="text-blue-500" size={20} />
                <h3 className="text-sm font-bold text-blue-700">休憩タイム - N3口語練習</h3>
              </div>
              <motion.button
                whileHover={{ rotate: 180, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleRefresh}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                title="换一个短语"
              >
                <RefreshCw size={16} />
              </motion.button>
            </div>

            {/* 翻转卡片 */}
            <motion.div
              className="relative h-48 cursor-pointer perspective-1000"
              onClick={handleFlip}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="w-full h-full relative preserve-3d"
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {/* 正面 - 日语 */}
                <div
                  className="absolute w-full h-full backface-hidden bg-white rounded-xl p-6 flex flex-col items-center justify-center shadow-md border-2 border-blue-100"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <BookOpen className="text-blue-400 mb-3" size={24} />
                  <p className="text-2xl font-bold text-gray-800 text-center mb-2">
                    {phrase.japanese}
                  </p>
                  <p className="text-sm text-gray-500 italic text-center">
                    {phrase.romaji}
                  </p>
                  <div className="mt-4 text-xs text-gray-400">
                    点击翻转查看意思 👆
                  </div>
                </div>

                {/* 背面 - 翻译 */}
                <div
                  className="absolute w-full h-full backface-hidden bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl p-6 flex flex-col items-center justify-center shadow-md text-white"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <div className="text-center">
                    <p className="text-xl font-bold mb-3">{phrase.chinese}</p>
                    <div className="w-16 h-1 bg-white/50 mx-auto mb-3" />
                    <p className="text-sm opacity-90 mb-2">{phrase.situation}</p>
                    <p className="text-xs opacity-75 italic">
                      Example situation
                    </p>
                  </div>
                  <div className="mt-4 text-xs opacity-75">
                    点击翻转回日语 👆
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* 提示 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-center"
            >
              <p className="text-xs text-gray-600">
                休息时读一读，轻松学日语 ☕️
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BreakCard;
