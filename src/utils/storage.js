// LocalStorage 工具函数

const STORAGE_KEY = 'cathappy_data';

// 获取今天的日期字符串 (YYYY-MM-DD)
export const getTodayString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// 获取存储的数据
export const getStoredData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : getDefaultData();
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return getDefaultData();
  }
};

// 获取默认数据结构
export const getDefaultData = () => ({
  today: {
    date: getTodayString(),
    pomodoros: 0,
    minutes: 0,
    startTime: null,
  },
  history: [],
  totalPomodoros: 0,
  streak: 0,
  lastStudyDate: null,
});

// 保存数据
export const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

// 更新今日数据
export const updateTodayData = (pomodoros, minutes) => {
  const data = getStoredData();
  const today = getTodayString();

  // 如果是新的一天，保存昨天的数据到历史记录
  if (data.today.date !== today) {
    if (data.today.pomodoros > 0) {
      data.history.push({
        date: data.today.date,
        pomodoros: data.today.pomodoros,
        minutes: data.today.minutes,
      });
    }

    // 重置今日数据
    data.today = {
      date: today,
      pomodoros: 0,
      minutes: 0,
      startTime: new Date().toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit'
      }),
    };

    // 更新连续学习天数
    updateStreak(data, today);
  }

  // 如果是第一次开始学习，记录开始时间
  if (!data.today.startTime) {
    data.today.startTime = new Date().toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // 更新数据
  data.today.pomodoros += pomodoros;
  data.today.minutes += minutes;
  data.totalPomodoros += pomodoros;
  data.lastStudyDate = today;

  saveData(data);
  return data;
};

// 更新连续学习天数
const updateStreak = (data, today) => {
  if (!data.lastStudyDate) {
    data.streak = 1;
    return;
  }

  const lastDate = new Date(data.lastStudyDate);
  const currentDate = new Date(today);
  const diffTime = currentDate - lastDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    // 连续的一天
    data.streak += 1;
  } else if (diffDays > 1) {
    // 中断了
    data.streak = 1;
  }
  // diffDays === 0 表示同一天，不改变streak
};

// 获取历史统计（最近7天）
export const getWeeklyStats = () => {
  const data = getStoredData();
  const history = [...data.history];

  // 包含今天的数据
  if (data.today.pomodoros > 0) {
    history.push(data.today);
  }

  // 只取最近7天
  return history.slice(-7);
};

// 清除所有数据（用于测试或重置）
export const clearAllData = () => {
  localStorage.removeItem(STORAGE_KEY);
};
