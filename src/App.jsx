import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import Cat from './components/Cat';
import Timer from './components/Timer';
import Controls from './components/Controls';
import Message from './components/Message';
import Stats from './components/Stats';
import DailyPhrase from './components/DailyPhrase';
import BreakCard from './components/BreakCard';
import Achievement from './components/Achievement';
import { useTimer } from './hooks/useTimer';
import { useStats } from './hooks/useStats';
import { useSound } from './hooks/useSound';
import {
  getRandomMessage,
  getMilestoneMessage,
  getSpecialTimeMessage,
  getCatReaction
} from './utils/messages';
import { checkAchievement } from './utils/japanesePhrases';

function App() {
  const {
    remaining,
    isRunning,
    mode,
    duration,
    progress,
    start,
    pause,
    reset,
    switchMode,
    formatTime
  } = useTimer();

  const {
    stats,
    completePomodoro,
    getTodayStats,
    getTotalStats,
    checkMilestone,
    isFirstPomodoro
  } = useStats();

  const { isMuted, playComplete, playClick, playMeow, toggleMute } = useSound();

  const [message, setMessage] = useState("喵~ 我是专业要饭猫，来陪主人学习的！");
  const [messageType, setMessageType] = useState('default');
  const [isCompleted, setIsCompleted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentAchievement, setCurrentAchievement] = useState(null);

  // 欢迎动画
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // 监听计时器完成
  useEffect(() => {
    if (remaining === 0 && !isRunning) {
      handleTimerComplete();
    }
  }, [remaining, isRunning]);

  // 处理计时器完成
  const handleTimerComplete = () => {
    if (mode === 'work') {
      // 工作模式完成
      playComplete();
      setIsCompleted(true);
      setTimeout(() => setIsCompleted(false), 2000);

      // 更新统计
      const newStats = completePomodoro(duration / 60);
      const milestone = checkMilestone();

      // 检查成就解锁
      const achievements = checkAchievement(
        newStats.today.pomodoros,
        newStats.streak
      );

      if (achievements.length > 0) {
        // 显示成就
        setTimeout(() => {
          setCurrentAchievement(achievements[0]);
        }, 2000);
      }

      // 显示消息
      if (milestone) {
        setMessage(getMilestoneMessage(milestone));
        setMessageType('milestone');
      } else if (isFirstPomodoro()) {
        setMessage(getRandomMessage('firstPomodoro'));
        setMessageType('complete');
      } else {
        setMessage(getRandomMessage('complete'));
        setMessageType('complete');
      }

      // 切换到休息模式
      setTimeout(() => {
        switchMode('break');
        setMessage(getRandomMessage('break'));
        setMessageType('break');
      }, 3000);
    } else {
      // 休息模式完成
      playComplete();
      setMessage("休息完啦！要继续学习吗？がんばろう！");
      setMessageType('default');
      switchMode('work');
    }
  };

  // 开始计时
  const handleStart = () => {
    playClick();
    start();

    // 显示鼓励消息
    const specialMsg = getSpecialTimeMessage();
    if (specialMsg) {
      setMessage(specialMsg);
    } else {
      setMessage(getRandomMessage('start'));
    }
    setMessageType('default');
  };

  // 暂停计时
  const handlePause = () => {
    playClick();
    pause();
    setMessage("主人要休息一下吗？ちょっと休憩？");
    setMessageType('default');
  };

  // 重置计时
  const handleReset = () => {
    playClick();
    reset();
    setMessage("重新开始！もう一度！主人加油！");
    setMessageType('default');
  };

  // 猫咪互动
  const handleCatInteract = () => {
    playMeow();
    const catMsg = getCatReaction();
    setMessage(catMsg);
    setMessageType('default');
  };

  // 关闭成就弹窗
  const handleCloseAchievement = () => {
    setCurrentAchievement(null);
  };

  return (
    <div className="min-h-screen bg-warm-bg py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* 欢迎动画 */}
        <AnimatePresence>
          {showWelcome && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 flex items-center justify-center bg-warm-bg z-50"
            >
              <div className="text-center">
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                >
                  <Cat mode="idle" />
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-3xl font-bold text-gray-800 mt-4"
                >
                  🐱 专业要饭猫陪读器
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-gray-600 mt-2"
                >
                  喵~ 准备好一起学习了吗？
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-sm text-purple-600 mt-2"
                >
                  一緒に頑張ろう！(Let's do our best together!)
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 成就弹窗 */}
        <Achievement
          achievement={currentAchievement}
          onClose={handleCloseAchievement}
        />

        {/* 主界面 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showWelcome ? 0 : 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* 标题 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              🐱 专业要饭猫
            </h1>
            <p className="text-gray-600">N3備考陪伴 · 番茄钟学习法</p>
          </div>

          {/* 每日日语短语 */}
          <DailyPhrase />

          {/* 猫咪区域 */}
          <div className="flex justify-center mb-6">
            <Cat
              mode={mode}
              onInteract={handleCatInteract}
              isCompleted={isCompleted}
              todayPomodoros={getTodayStats().pomodoros}
              streak={getTotalStats().streak}
            />
          </div>

          {/* 消息区域 */}
          <Message message={message} type={messageType} />

          {/* 休息时间的日语学习卡片 */}
          <BreakCard isBreak={mode === 'break' && !isRunning} />

          {/* 计时器 */}
          <div className="mb-8">
            <Timer
              remaining={remaining}
              formatTime={formatTime}
              mode={mode}
              progress={progress}
            />
          </div>

          {/* 控制按钮 */}
          <div className="mb-8">
            <Controls
              isRunning={isRunning}
              onStart={handleStart}
              onPause={handlePause}
              onReset={handleReset}
            />
          </div>

          {/* 统计面板 */}
          <div className="mb-8">
            <Stats
              todayStats={getTodayStats()}
              totalStats={getTotalStats()}
            />
          </div>

          {/* 音效控制 */}
          <div className="flex justify-center mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMute}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              <span className="text-sm">{isMuted ? '音効オフ' : '音効オン'}</span>
            </motion.button>
          </div>

          {/* 小提示 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center text-xs text-gray-500 space-y-1"
          >
            <p>💡 点击猫咪会有可爱的反应哦~</p>
            <p>📚 每天都有新的日语短语等你学习</p>
            <p>🎯 完成番茄钟解锁日语成就称号</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
