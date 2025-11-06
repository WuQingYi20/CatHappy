import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Timer = ({ remaining, formatTime, mode, progress }) => {
  const isWork = mode === 'work';
  const [isAlmostDone, setIsAlmostDone] = useState(false);

  // 检测是否即将完成（剩余5分钟以内）
  useEffect(() => {
    setIsAlmostDone(remaining > 0 && remaining <= 300);
  }, [remaining]);

  // 计算当前百分比
  const percentage = Math.round(progress);

  // 进度环的渐变ID
  const gradientId = isWork ? 'workGradient' : 'breakGradient';

  // 脉搏动画（即将完成时）
  const pulseAnimation = isAlmostDone ? {
    scale: [1, 1.02, 1],
    filter: [
      'drop-shadow(0 0 0px rgba(255, 107, 107, 0))',
      'drop-shadow(0 0 20px rgba(255, 107, 107, 0.6))',
      'drop-shadow(0 0 0px rgba(255, 107, 107, 0))'
    ],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  } : {};

  return (
    <div className="w-full max-w-md mx-auto">
      {/* 进度环 */}
      <motion.div
        className="relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-6"
        animate={pulseAnimation}
      >
        {/* 外层光晕（仅在工作模式且即将完成时显示） */}
        {isWork && isAlmostDone && (
          <motion.div
            className="absolute inset-0 rounded-full blur-xl opacity-30"
            style={{ background: `radial-gradient(circle, ${isWork ? '#FF6B6B' : '#74C0FC'} 0%, transparent 70%)` }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}

        <svg className="w-full h-full transform -rotate-90 relative z-10">
          {/* 定义渐变 */}
          <defs>
            {/* 工作模式渐变 */}
            <linearGradient id="workGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="50%" stopColor="#FF8E53" />
              <stop offset="100%" stopColor="#FFA94D" />
            </linearGradient>

            {/* 休息模式渐变 */}
            <linearGradient id="breakGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#74C0FC" />
              <stop offset="50%" stopColor="#4DABF7" />
              <stop offset="100%" stopColor="#339AF0" />
            </linearGradient>

            {/* 阴影滤镜 */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* 背景圆环 - 带内阴影效果 */}
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="#E5E7EB"
            strokeWidth="10"
            fill="none"
            opacity="0.3"
          />

          {/* 背景装饰圆环 */}
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="#F3F4F6"
            strokeWidth="10"
            fill="none"
            strokeDasharray="2 8"
            opacity="0.5"
          />

          {/* 进度圆环 - 使用渐变 */}
          <motion.circle
            cx="96"
            cy="96"
            r="88"
            stroke={`url(#${gradientId})`}
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 88}
            strokeDashoffset={2 * Math.PI * 88 * (1 - progress / 100)}
            initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
            animate={{
              strokeDashoffset: 2 * Math.PI * 88 * (1 - progress / 100)
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            filter="url(#glow)"
            style={{
              filter: isAlmostDone ? 'drop-shadow(0 0 8px rgba(255, 107, 107, 0.5))' : 'none'
            }}
          />
        </svg>

        {/* 时间显示 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* 主时间显示 */}
          <motion.div
            className="font-mono text-5xl md:text-6xl font-bold tabular-nums"
            style={{
              color: isWork ? "#FF6B6B" : "#74C0FC",
              textShadow: isWork
                ? '0 2px 10px rgba(255, 107, 107, 0.3)'
                : '0 2px 10px rgba(116, 192, 252, 0.3)'
            }}
            key={remaining}
            initial={{ scale: 1.1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {formatTime(remaining)}
          </motion.div>

          {/* 模式标签 */}
          <motion.div
            className="text-sm font-medium mt-2 px-3 py-1 rounded-full"
            style={{
              color: isWork ? "#FF6B6B" : "#74C0FC",
              backgroundColor: isWork ? "rgba(255, 107, 107, 0.1)" : "rgba(116, 192, 252, 0.1)",
              border: `1px solid ${isWork ? "rgba(255, 107, 107, 0.3)" : "rgba(116, 192, 252, 0.3)"}`
            }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {isWork ? "📚 专注学习" : "☕ 休息时间"}
          </motion.div>

          {/* 百分比显示 */}
          <motion.div
            className="text-xs text-gray-400 mt-1 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.3 }}
          >
            {percentage}%
          </motion.div>
        </div>

        {/* 装饰性的小点 */}
        <motion.div
          className="absolute top-0 left-1/2 w-3 h-3 rounded-full -translate-x-1/2"
          style={{
            backgroundColor: isWork ? "#FF6B6B" : "#74C0FC",
            boxShadow: `0 0 10px ${isWork ? "rgba(255, 107, 107, 0.6)" : "rgba(116, 192, 252, 0.6)"}`
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* 改进的模式指示器 */}
      <div className="flex justify-center items-center gap-4">
        {/* 工作模式指示 */}
        <motion.div
          className="flex items-center gap-2"
          animate={{
            scale: isWork ? 1.1 : 1,
            opacity: isWork ? 1 : 0.5
          }}
        >
          <div className="relative">
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              isWork ? 'bg-tomato-red' : 'bg-gray-300'
            }`} />
            {isWork && (
              <motion.div
                className="absolute inset-0 w-3 h-3 rounded-full bg-tomato-red"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            )}
          </div>
          <span className="text-xs text-gray-600 font-medium">工作</span>
        </motion.div>

        {/* 分隔线 */}
        <div className="w-8 h-px bg-gray-300" />

        {/* 休息模式指示 */}
        <motion.div
          className="flex items-center gap-2"
          animate={{
            scale: !isWork ? 1.1 : 1,
            opacity: !isWork ? 1 : 0.5
          }}
        >
          <div className="relative">
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              !isWork ? 'bg-rest-blue' : 'bg-gray-300'
            }`} />
            {!isWork && (
              <motion.div
                className="absolute inset-0 w-3 h-3 rounded-full bg-rest-blue"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            )}
          </div>
          <span className="text-xs text-gray-600 font-medium">休息</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Timer;
