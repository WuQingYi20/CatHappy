// 猫咪装饰品配置系统
// 根据累计番茄钟数解锁，永久显示在猫咪身上

export const CAT_DECORATIONS = {
  // 3个番茄钟：小鱼干
  fish: {
    id: 'fish',
    name: '小鱼干',
    nameJp: 'おさかな',
    emoji: '🐟',
    unlockAt: 3,
    position: 'beside', // 位置：旁边
    description: '猫咪最爱的小鱼干，永远陪伴在身边',
    descriptionJp: '猫ちゃんの大好物'
  },

  // 5个番茄钟：蝴蝶结
  ribbon: {
    id: 'ribbon',
    name: '粉色蝴蝶结',
    nameJp: 'リボン',
    emoji: '🎀',
    unlockAt: 5,
    position: 'head', // 位置：头上
    description: '可爱的蝴蝶结，让猫咪更加优雅',
    descriptionJp: 'かわいいリボン'
  },

  // 7个番茄钟：小鸟朋友
  bird: {
    id: 'bird',
    name: '小鸟朋友',
    nameJp: 'ことり',
    emoji: '🐦',
    unlockAt: 7,
    position: 'shoulder', // 位置：肩膀
    description: '被你的努力感动的小鸟，愿意陪伴你学习',
    descriptionJp: '一緒に勉強する仲間'
  },

  // 10个番茄钟：金色王冠（会替换蝴蝶结）
  crown: {
    id: 'crown',
    name: '学霸王冠',
    nameJp: '王冠',
    emoji: '👑',
    unlockAt: 10,
    position: 'head', // 位置：头上（替换ribbon）
    description: '今日学霸的象征，闪闪发光的荣耀',
    descriptionJp: '今日の学習王',
    replacesDecoration: 'ribbon' // 会替换蝴蝶结
  },

  // 15个番茄钟：星星光环
  stars: {
    id: 'stars',
    name: '星星光环',
    nameJp: '星のオーラ',
    emoji: '✨',
    unlockAt: 15,
    position: 'aura', // 位置：周围光环
    description: '努力的光芒，照亮前进的道路',
    descriptionJp: '努力の輝き'
  },

  // 20个番茄钟：特殊背景
  sakura: {
    id: 'sakura',
    name: '樱花背景',
    nameJp: '桜の背景',
    emoji: '🌸',
    unlockAt: 20,
    position: 'background', // 位置：背景
    description: '春天的樱花为你绽放',
    descriptionJp: '桜が咲く'
  },

  // 25个番茄钟：彩虹尾巴
  rainbowTail: {
    id: 'rainbowTail',
    name: '彩虹尾巴',
    nameJp: '虹のしっぽ',
    emoji: '🌈',
    unlockAt: 25,
    position: 'tail', // 位置：尾巴
    description: '传说中的彩虹尾巴，代表最高荣誉',
    descriptionJp: '伝説の尾'
  },

  // 30个番茄钟：书本
  book: {
    id: 'book',
    name: 'N3宝典',
    nameJp: 'N3の本',
    emoji: '📚',
    unlockAt: 30,
    position: 'beside', // 位置：旁边
    description: 'N3学习的见证，知识的积累',
    descriptionJp: '知識の証'
  }
};

// 获取已解锁的装饰品
export const getUnlockedDecorations = (totalPomodoros) => {
  const unlocked = [];

  Object.values(CAT_DECORATIONS).forEach(decoration => {
    if (totalPomodoros >= decoration.unlockAt) {
      // 检查是否被其他装饰替换
      const isReplaced = Object.values(CAT_DECORATIONS).some(
        other => other.replacesDecoration === decoration.id && totalPomodoros >= other.unlockAt
      );

      if (!isReplaced) {
        unlocked.push(decoration);
      }
    }
  });

  return unlocked.sort((a, b) => a.unlockAt - b.unlockAt);
};

// 获取下一个待解锁的装饰品
export const getNextDecoration = (totalPomodoros) => {
  const allDecorations = Object.values(CAT_DECORATIONS).sort((a, b) => a.unlockAt - b.unlockAt);

  for (let decoration of allDecorations) {
    if (totalPomodoros < decoration.unlockAt) {
      return {
        decoration,
        remaining: decoration.unlockAt - totalPomodoros
      };
    }
  }

  return null; // 已经全部解锁
};

// 按位置分组装饰品
export const getDecorationsByPosition = (totalPomodoros) => {
  const unlocked = getUnlockedDecorations(totalPomodoros);

  const byPosition = {
    head: [],
    beside: [],
    shoulder: [],
    tail: [],
    aura: [],
    background: []
  };

  unlocked.forEach(decoration => {
    if (byPosition[decoration.position]) {
      byPosition[decoration.position].push(decoration);
    }
  });

  return byPosition;
};

// 检查是否刚解锁新装饰
export const checkNewDecoration = (previousCount, currentCount) => {
  const previousUnlocked = getUnlockedDecorations(previousCount);
  const currentUnlocked = getUnlockedDecorations(currentCount);

  if (currentUnlocked.length > previousUnlocked.length) {
    // 找到新解锁的装饰
    const newDecorations = currentUnlocked.filter(
      current => !previousUnlocked.some(prev => prev.id === current.id)
    );
    return newDecorations;
  }

  return [];
};

// 获取装饰品总数
export const getTotalDecorationsCount = () => {
  return Object.keys(CAT_DECORATIONS).length;
};

// 获取收集进度百分比
export const getCollectionProgress = (totalPomodoros) => {
  const unlocked = getUnlockedDecorations(totalPomodoros);
  const total = getTotalDecorationsCount();
  return Math.floor((unlocked.length / total) * 100);
};
