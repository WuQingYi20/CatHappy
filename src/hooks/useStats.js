import { useState, useEffect } from 'react';
import { getStoredData, updateTodayData, getWeeklyStats } from '../utils/storage';

export const useStats = () => {
  const [stats, setStats] = useState(getStoredData());

  // 完成一个番茄钟
  const completePomodoro = (minutes = 25) => {
    const newData = updateTodayData(1, minutes);
    setStats(newData);
    return newData;
  };

  // 获取今日统计
  const getTodayStats = () => {
    return stats.today;
  };

  // 获取总统计
  const getTotalStats = () => {
    return {
      totalPomodoros: stats.totalPomodoros,
      streak: stats.streak,
    };
  };

  // 刷新数据
  const refreshStats = () => {
    setStats(getStoredData());
  };

  // 检查是否达到里程碑
  const checkMilestone = () => {
    const count = stats.today.pomodoros;
    if ([3, 5, 10].includes(count)) {
      return count;
    }
    return null;
  };

  // 检查是否是第一个番茄钟
  const isFirstPomodoro = () => {
    return stats.totalPomodoros === 0;
  };

  return {
    stats,
    completePomodoro,
    getTodayStats,
    getTotalStats,
    refreshStats,
    checkMilestone,
    isFirstPomodoro,
    getWeeklyStats,
  };
};
