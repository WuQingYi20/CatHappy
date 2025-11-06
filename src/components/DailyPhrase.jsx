import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Sparkles, Volume2 } from 'lucide-react';
import { getRandomDailyMotivation } from '../utils/japanesePhrases';

const DailyPhrase = () => {
  const [phrase, setPhrase] = useState(null);
  const [showTranslation, setShowTranslation] = useState(false);

  useEffect(() => {
    // 每天更换一次短语
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('dailyPhraseDate');
    const savedPhrase = localStorage.getItem('dailyPhrase');

    if (savedDate === today && savedPhrase) {
      setPhrase(JSON.parse(savedPhrase));
    } else {
      const newPhrase = getRandomDailyMotivation();
      setPhrase(newPhrase);
      localStorage.setItem('dailyPhraseDate', today);
      localStorage.setItem('dailyPhrase', JSON.stringify(newPhrase));
    }
  }, []);

  // 简单的语音合成（如果浏览器支持）
  const speakJapanese = () => {
    if ('speechSynthesis' in window && phrase) {
      const utterance = new SpeechSynthesisUtterance(phrase.japanese);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!phrase) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-lg border-2 border-purple-200 relative overflow-hidden">
        {/* 装饰性背景 */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-30 -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-200 rounded-full blur-3xl opacity-30 -ml-16 -mb-16" />

        {/* 标题 */}
        <div className="flex items-center gap-2 mb-4 relative z-10">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="text-purple-500" size={20} />
          </motion.div>
          <h3 className="text-sm font-bold text-purple-700">今日のフレーズ (Daily Phrase)</h3>
        </div>

        {/* 日语短语 */}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <motion.p
                className="text-2xl font-bold text-gray-800 mb-1 leading-relaxed"
                whileHover={{ scale: 1.02 }}
              >
                {phrase.japanese}
              </motion.p>
              <p className="text-sm text-gray-500 italic mb-2">{phrase.romaji}</p>
            </div>

            {/* 发音按钮 */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={speakJapanese}
              className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
              title="听发音"
            >
              <Volume2 size={16} />
            </motion.button>
          </div>

          {/* 翻译切换 */}
          <motion.button
            onClick={() => setShowTranslation(!showTranslation)}
            className="text-sm text-purple-600 hover:text-purple-700 font-medium mb-2"
            whileHover={{ x: 3 }}
          >
            {showTranslation ? '隐藏翻译 ▲' : '显示翻译 ▼'}
          </motion.button>

          {/* 翻译内容 */}
          <motion.div
            initial={false}
            animate={{
              height: showTranslation ? 'auto' : 0,
              opacity: showTranslation ? 1 : 0
            }}
            className="overflow-hidden"
          >
            <div className="pt-2 border-t border-purple-200">
              <p className="text-gray-700 mb-1">
                <span className="font-medium">中文：</span>{phrase.chinese}
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-medium">English：</span>{phrase.english}
              </p>
            </div>
          </motion.div>

          {/* 分类标签 */}
          <div className="mt-3">
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
              {phrase.category}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DailyPhrase;
