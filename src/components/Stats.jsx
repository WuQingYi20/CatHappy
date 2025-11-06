import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Target, Flame, TrendingUp, Award, Zap } from 'lucide-react';
import { useState } from 'react';

const Stats = ({ todayStats, totalStats }) => {
  const { pomodoros, minutes, startTime } = todayStats;
  const { totalPomodoros, streak } = totalStats;
  const [showEncouragement, setShowEncouragement] = useState(false);

  // 计算学习等级
  const getLevel = () => {
    if (pomodoros >= 10) return { name: '学习达人', color: 'from-purple-500 to-pink-500', emoji: '🌟' };
    if (pomodoros >= 5) return { name: '努力之星', color: 'from-orange-500 to-yellow-500', emoji: '⭐' };
    if (pomodoros >= 3) return { name: '进步中', color: 'from-green-500 to-emerald-500', emoji: '🌱' };
    if (pomodoros >= 1) return { name: '开始啦', color: 'from-blue-500 to-cyan-500', emoji: '🎯' };
    return { name: '加油', color: 'from-gray-400 to-gray-500', emoji: '💪' };
  };

  const level = getLevel();

  // 计算今日目标进度
  const dailyGoal = 5;
  const goalProgress = Math.min((pomodoros / dailyGoal) * 100, 100);
  const goalMet = pomodoros >= dailyGoal;

  // 获取鼓励语
  const getEncouragementText = () => {
    if (pomodoros === 0) return "开始第一个番茄钟吧！ファイト！";
    if (pomodoros < 3) return "很棒的开始！继续保持！";
    if (pomodoros < 5) return "すごい！已经很努力了！";
    if (pomodoros < 10) return "太棒了！今天表现卓越！";
    return "最強です！你是今日学霸！";
  };

  const statItems = [
    {
      icon: Target,
      label: '今日完成',
      value: `${pomodoros}个`,
      subValue: `${minutes}分钟`,
      color: 'text-tomato-red',
      bgColor: 'bg-red-50',
      ringColor: 'ring-tomato-red',
      highlight: pomodoros > 0
    },
    {
      icon: Flame,
      label: '连续学习',
      value: `${streak}天`,
      subValue: streak > 0 ? '保持住！' : '今天开始',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      ringColor: 'ring-orange-500',
      highlight: streak >= 7
    },
    {
      icon: Award,
      label: '累计完成',
      value: `${totalPomodoros}个`,
      subValue: `${Math.floor(totalPomodoros * 25 / 60)}小时`,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      ringColor: 'ring-purple-500',
      highlight: totalPomodoros >= 50
    }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* 今日等级卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative overflow-hidden bg-gradient-to-r ${level.color} rounded-2xl p-6 text-white shadow-lg`}
      >
        {/* 背景装饰 */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-3xl -mr-16 -mt-16" />

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl">{level.emoji}</span>
              <h3 className="text-2xl font-bold">今日等级</h3>
            </div>
            <p className="text-4xl font-black mb-1">{level.name}</p>
            <p className="text-sm opacity-90">{getEncouragementText()}</p>
          </div>

          {/* 今日番茄钟大数字 */}
          <motion.div
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="text-6xl font-black"
              key={pomodoros}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {pomodoros}
            </motion.div>
            <div className="text-sm opacity-90">番茄钟</div>
          </motion.div>
        </div>
      </motion.div>

      {/* 统计卡片网格 */}
      <div className="grid grid-cols-3 gap-3">
        {statItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`
                relative bg-white rounded-xl p-4 text-center shadow-md
                ${item.highlight ? `ring-2 ${item.ringColor} shadow-lg` : ''}
                transition-all duration-300
              `}
            >
              {/* 高亮闪光效果 */}
              {item.highlight && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                  animate={{
                    x: ['-100%', '200%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                />
              )}

              <div className={`${item.bgColor} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2`}>
                <Icon className={item.color} size={24} />
              </div>

              <div className="text-xs text-gray-500 mb-1">{item.label}</div>
              <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
              <div className="text-xs text-gray-400 mt-1">{item.subValue}</div>
            </motion.div>
          );
        })}
      </div>

      {/* 每日目标进度条 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl p-5 shadow-md"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap className="text-happy-yellow" size={20} />
            <span className="font-semibold text-gray-700">今日目标</span>
          </div>
          <div className="flex items-center gap-1">
            {goalMet ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-success-green font-bold"
              >
                ✨ 已完成！
              </motion.span>
            ) : (
              <span className="text-sm text-gray-500">
                {pomodoros}/{dailyGoal} 个
              </span>
            )}
          </div>
        </div>

        {/* 进度条 */}
        <div className="relative w-full bg-gray-100 rounded-full h-4 overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${
              goalMet
                ? 'bg-gradient-to-r from-success-green to-emerald-400'
                : 'bg-gradient-to-r from-tomato-red to-orange-400'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${goalProgress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          {/* 进度文字 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-white drop-shadow">
              {Math.round(goalProgress)}%
            </span>
          </div>
        </div>

        {/* 目标节点标记 */}
        <div className="relative mt-2 px-2">
          <div className="flex justify-between text-xs text-gray-400">
            {[1, 2, 3, 4, 5].map(num => (
              <motion.div
                key={num}
                className={`
                  flex flex-col items-center
                  ${pomodoros >= num ? 'text-success-green' : 'text-gray-300'}
                `}
                whileHover={{ scale: 1.2 }}
              >
                <div className={`
                  w-2 h-2 rounded-full mb-1
                  ${pomodoros >= num ? 'bg-success-green' : 'bg-gray-300'}
                `} />
                <span className="text-[10px]">{num}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 学习时间线 */}
      {startTime && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <Clock className="text-blue-500" size={20} />
            </div>
            <div>
              <div className="text-sm text-gray-600">今日开始时间</div>
              <div className="text-lg font-bold text-gray-800">{startTime}</div>
            </div>
          </div>

          {minutes > 0 && (
            <div className="text-right">
              <div className="text-sm text-gray-600">已学习</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {minutes}分
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* 激励语气泡 */}
      <AnimatePresence>
        {pomodoros > 0 && pomodoros % 3 === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="bg-gradient-to-r from-happy-yellow to-orange-300 rounded-2xl p-4 text-center shadow-lg"
          >
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="text-white" size={24} />
              <p className="text-white font-bold text-lg">
                太棒了！你已经完成 {pomodoros} 个番茄钟！🎉
              </p>
            </div>
            <p className="text-white text-sm mt-1 opacity-90">
              継続は力なり！坚持就是力量！
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Stats;
