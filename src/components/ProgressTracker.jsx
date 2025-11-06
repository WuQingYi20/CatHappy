import { motion } from 'framer-motion';
import { Target, Lock, Unlock } from 'lucide-react';
import { getNextMilestone } from '../utils/milestones';

const ProgressTracker = ({ currentCount }) => {
  const nextMilestone = getNextMilestone(currentCount);

  if (!nextMilestone) return null;

  const progress = ((currentCount / nextMilestone.count) * 100).toFixed(0);

  return (
    <motion.div
      className="bg-gradient-to-r from-warm-light to-white rounded-2xl p-5 shadow-lg border-2 border-happy-yellow/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      {/* 标题 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Target className="text-cat-orange" size={24} />
          <h3 className="text-lg font-bold text-gray-800">
            下一个里程碑
          </h3>
        </div>

        <motion.div
          className="flex items-center gap-2 bg-happy-yellow/20 px-3 py-1 rounded-full"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <span className="text-2xl">{nextMilestone.data.badgeEmoji}</span>
          <span className="text-sm font-bold text-gray-700">
            还需 {nextMilestone.remaining} 个
          </span>
        </motion.div>
      </div>

      {/* 进度条 */}
      <div className="relative mb-3">
        {/* 背景轨道 */}
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          {/* 进度填充 */}
          <motion.div
            className="h-full bg-gradient-to-r from-cat-orange via-happy-yellow to-happy-pink"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>

        {/* 里程碑标记点 */}
        <div className="absolute top-0 left-0 w-full h-3 flex items-center justify-between px-1">
          {/* 当前位置指示器 */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2"
            initial={{ left: 0 }}
            animate={{ left: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <motion.div
              className="w-5 h-5 bg-white border-3 border-cat-orange rounded-full shadow-lg -ml-2.5"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* 提示信息 */}
      <div className="flex items-start gap-3 bg-gradient-to-r from-happy-pink/10 to-celebrate-purple/10 rounded-xl p-3">
        <div className="flex-shrink-0 mt-0.5">
          <motion.div
            animate={{
              rotate: [0, -10, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            <Lock className="text-gray-400" size={20} />
          </motion.div>
        </div>

        <div className="flex-1">
          <p className="text-sm font-medium text-gray-700 mb-1">
            🎁 神秘奖励
          </p>
          <p className="text-xs text-gray-600">
            完成 <span className="font-bold text-cat-orange">{nextMilestone.count}</span> 个番茄钟解锁
            {nextMilestone.data.badge && (
              <>
                <span className="font-bold text-celebrate-purple">「{nextMilestone.data.badge}」</span>
                徽章
              </>
            )}
            (?・ω・)?
          </p>
        </div>

        <motion.div
          className="text-2xl"
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          ✨
        </motion.div>
      </div>

      {/* 已解锁指示器（当完成至少1个里程碑时） */}
      {currentCount >= 1 && (
        <motion.div
          className="mt-3 flex items-center gap-2 text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Unlock className="text-green-500" size={16} />
          <span>已解锁 {currentCount >= 10 ? '4+' : currentCount >= 7 ? '4' : currentCount >= 5 ? '3' : currentCount >= 3 ? '2' : '1'} 个成就</span>
          <motion.span
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            🏆
          </motion.span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProgressTracker;
