import { motion } from 'framer-motion';
import { Clock, Target, Flame } from 'lucide-react';

const Stats = ({ todayStats, totalStats }) => {
  const { pomodoros, minutes, startTime } = todayStats;
  const { totalPomodoros, streak } = totalStats;

  const statItems = [
    {
      icon: Target,
      label: '今日番茄钟',
      value: `${pomodoros}个`,
      color: 'text-tomato-red'
    },
    {
      icon: Clock,
      label: '今日学习',
      value: `${minutes}分钟`,
      color: 'text-cat-orange'
    },
    {
      icon: Flame,
      label: '连续学习',
      value: `${streak}天`,
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        {/* 统计标题 */}
        <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
          📊 学习统计
        </h3>

        {/* 统计卡片 */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {statItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className={`${item.color} mb-2`}>
                  <Icon size={24} />
                </div>
                <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                <div className="text-lg font-bold text-gray-800">{item.value}</div>
              </motion.div>
            );
          })}
        </div>

        {/* 分隔线 */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* 额外信息 */}
        <div className="flex justify-between text-sm text-gray-600">
          <div>
            {startTime && (
              <span>开始时间: {startTime}</span>
            )}
          </div>
          <div>
            总计: {totalPomodoros}个番茄钟
          </div>
        </div>

        {/* 猫咪吃饱程度指示器 */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">猫咪满足度</span>
            <span className="text-sm font-medium text-cat-orange">
              {Math.min(pomodoros * 20, 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-cat-orange to-yellow-400 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(pomodoros * 20, 100)}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1 text-center">
            {pomodoros === 0 && "猫咪饿了喵~ 开始学习吧！"}
            {pomodoros >= 1 && pomodoros < 3 && "猫咪有点饱了~"}
            {pomodoros >= 3 && pomodoros < 5 && "猫咪很满足！"}
            {pomodoros >= 5 && "猫咪吃饱啦！主人真棒！"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
