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
import Confetti from './components/Confetti';
import GiftBox from './components/GiftBox';
import ProgressTracker from './components/ProgressTracker';
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
import { checkMilestoneReached } from './utils/milestones';

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
  const [confettiActive, setConfettiActive] = useState(false);
  const [confettiIntensity, setConfettiIntensity] = useState('normal');
  const [currentMilestone, setCurrentMilestone] = useState(null); // 新增：里程碑礼物盒

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

      // 🎁 检查是否达到里程碑（新系统）
      const pomodoros = newStats.today.pomodoros;
      const milestoneReached = checkMilestoneReached(pomodoros);

      // 🎉 触发五彩纸屑庆祝！
      let intensity = 'normal';

      // 根据番茄钟数量决定庆祝强度
      if (milestoneReached) {
        intensity = milestoneReached.celebrationLevel || 'milestone';
      } else if (pomodoros >= 10) {
        intensity = 'mega';
      } else if (milestone || pomodoros % 5 === 0) {
        intensity = 'milestone';
      }

      setConfettiIntensity(intensity);
      setConfettiActive(true);

      // 如果达到里程碑，3秒后显示礼物盒
      if (milestoneReached) {
        setTimeout(() => {
          setCurrentMilestone(milestoneReached);
        }, 3000);
      }

      // 检查成就解锁（旧系统，可以共存）
      const achievements = checkAchievement(
        newStats.today.pomodoros,
        newStats.streak
      );

      if (achievements.length > 0 && !milestoneReached) {
        // 只有在没有里程碑时才显示旧成就
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

  // 关闭里程碑礼物盒
  const handleCloseMilestone = () => {
    setCurrentMilestone(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-bg via-warm-light to-warm-bg py-6 md:py-10 px-4">
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-40 h-40 bg-happy-yellow opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-happy-pink opacity-10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
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

        {/* 五彩纸屑庆祝 */}
        <Confetti
          isActive={confettiActive}
          intensity={confettiIntensity}
          onComplete={() => setConfettiActive(false)}
        />

        {/* 里程碑礼物盒 */}
        <GiftBox
          milestone={currentMilestone}
          onClose={handleCloseMilestone}
        />

        {/* 主界面 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showWelcome ? 0 : 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* 标题 */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6 md:mb-10"
          >
            <motion.h1
              className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cat-orange via-happy-yellow to-happy-pink bg-clip-text text-transparent mb-3"
              animate={{
                backgroundPosition: ['0%', '100%', '0%']
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ backgroundSize: '200% auto' }}
            >
              🐱 专业要饭猫
            </motion.h1>
            <p className="text-gray-600 font-medium">
              N3備考陪伴 · 让学习充满快乐
            </p>
          </motion.div>

          {/* 每日日语短语 */}
          <DailyPhrase />

          {/* 猫咪区域 */}
          <div className="flex justify-center mb-4">
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
          <div className="mb-6">
            <Timer
              remaining={remaining}
              formatTime={formatTime}
              mode={mode}
              progress={progress}
            />
          </div>

          {/* 控制按钮 */}
          <div className="mb-10">
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

          {/* 里程碑进度追踪 */}
          <div className="mb-8">
            <ProgressTracker currentCount={getTodayStats().pomodoros} />
          </div>

          {/* 音效控制和提示 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-6"
          >
            {/* 音效控制 */}
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMute}
                className="flex items-center gap-2 px-5 py-3 bg-white rounded-xl shadow-md hover:shadow-lg text-gray-700 transition-all"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                <span className="text-sm font-medium">
                  {isMuted ? '音効オフ' : '音効オン'}
                </span>
              </motion.button>
            </div>

            {/* 温馨提示卡片 */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100">
              <div className="flex items-start gap-2">
                <span className="text-xl">💝</span>
                <div className="flex-1 text-xs text-gray-600 space-y-1.5">
                  <p className="flex items-center gap-1.5">
                    <span className="text-purple-500">🐱</span>
                    <span>点击猫咪听日语鼓励</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <span className="text-purple-500">📚</span>
                    <span>每天新日语短语自动更新</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <span className="text-purple-500">🎯</span>
                    <span>完成番茄钟解锁成就称号</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <span className="text-purple-500">✨</span>
                    <span>每3个番茄钟有惊喜</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
