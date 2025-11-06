// 渐进式里程碑奖励系统

export const MILESTONES = {
  1: {
    count: 1,
    title: "踏出第一步",
    titleJp: "最初の一歩",
    badge: "初めて",
    badgeEmoji: "🌱",
    catGift: null,
    n3Reward: null,
    message: "主人来了！让我们开始学习之旅吧！",
    messageJp: "頑張ろう！",
    nextHint: "完成3个番茄钟，猫咪有礼物要送你哦~ (?・ω・)?",
    celebrationLevel: "normal"
  },

  3: {
    count: 3,
    title: "初心者",
    titleJp: "しょしんしゃ",
    badge: "初心者",
    badgeEmoji: "🐟",
    catGift: {
      name: "小鱼干",
      emoji: "🐟",
      message: "这是猫咪最爱的小鱼干，送给努力的主人！"
    },
    n3Reward: {
      category: "日常用语",
      phrases: [
        { jp: "おはようございます", meaning: "早上好", romaji: "ohayou gozaimasu" },
        { jp: "いただきます", meaning: "我开动了", romaji: "itadakimasu" },
        { jp: "お疲れ様でした", meaning: "辛苦了", romaji: "otsukaresama deshita" },
        { jp: "よろしくお願いします", meaning: "请多关照", romaji: "yoroshiku onegaishimasu" },
        { jp: "ありがとうございます", meaning: "非常感谢", romaji: "arigatou gozaimasu" }
      ]
    },
    message: "すごい！完成3个番茄钟了！猫咪送你小礼物~",
    messageJp: "プレゼントだよ！",
    nextHint: "再坚持2个，猫咪会有新变化！(?・ω・)?",
    celebrationLevel: "milestone"
  },

  5: {
    count: 5,
    title: "頑張り屋",
    titleJp: "がんばりや",
    badge: "努力者",
    badgeEmoji: "⭐",
    catGift: {
      name: "小蝴蝶结",
      emoji: "🎀",
      message: "猫咪戴上了你送的蝴蝶结！好开心~ にゃー！"
    },
    n3Reward: {
      category: "学习动词",
      phrases: [
        { jp: "勉強する", meaning: "学习", romaji: "benkyou suru" },
        { jp: "覚える", meaning: "记住", romaji: "oboeru" },
        { jp: "復習する", meaning: "复习", romaji: "fukushuu suru" },
        { jp: "理解する", meaning: "理解", romaji: "rikai suru" },
        { jp: "練習する", meaning: "练习", romaji: "renshuu suru" },
        { jp: "頑張る", meaning: "加油、努力", romaji: "ganbaru" },
        { jp: "集中する", meaning: "集中", romaji: "shuuchuu suru" }
      ]
    },
    message: "よくできました！5个番茄钟！猫咪长大了一点点~",
    messageJp: "成長したよ！",
    nextHint: "完成7个，会有新朋友来访哦！(?・ω・)?",
    celebrationLevel: "milestone"
  },

  7: {
    count: 7,
    title: "努力家",
    titleJp: "どりょくか",
    badge: "努力家",
    badgeEmoji: "🐦",
    catGift: {
      name: "小鸟朋友",
      emoji: "🐦",
      message: "你的努力吸引了小鸟！它也来陪你学习~ ちゅんちゅん♪"
    },
    n3Reward: {
      category: "会话短语",
      phrases: [
        { jp: "そうですね", meaning: "是这样呢", romaji: "sou desu ne" },
        { jp: "本当ですか", meaning: "真的吗", romaji: "hontou desu ka" },
        { jp: "分かりました", meaning: "我明白了", romaji: "wakarimashita" },
        { jp: "すみません", meaning: "不好意思", romaji: "sumimasen" },
        { jp: "大丈夫です", meaning: "没关系", romaji: "daijoubu desu" },
        { jp: "お願いします", meaning: "拜托了", romaji: "onegaishimasu" },
        { jp: "どうぞ", meaning: "请（用）", romaji: "douzo" },
        { jp: "いいですよ", meaning: "可以哦", romaji: "ii desu yo" }
      ]
    },
    message: "素晴らしい！7个番茄钟！你太棒了！",
    messageJp: "仲間が増えたよ！",
    nextHint: "冲刺到10个，解锁终极形态！(?・ω・)?✨",
    celebrationLevel: "milestone"
  },

  10: {
    count: 10,
    title: "N3マスター",
    titleJp: "えぬさんますたー",
    badge: "N3達人",
    badgeEmoji: "👑",
    catGift: {
      name: "金色王冠",
      emoji: "👑",
      message: "你是今天的学霸王！猫咪为你加冕！"
    },
    n3Reward: {
      category: "全部解锁",
      phrases: [
        { jp: "やった！", meaning: "成功了！", romaji: "yatta!" },
        { jp: "最高です！", meaning: "太棒了！", romaji: "saikou desu!" },
        { jp: "おめでとうございます", meaning: "恭喜你", romaji: "omedetou gozaimasu" },
        { jp: "継続は力なり", meaning: "坚持就是力量", romaji: "keizoku wa chikara nari" },
        { jp: "諦めないで", meaning: "不要放弃", romaji: "akiramenaide" },
        { jp: "夢は叶う", meaning: "梦想会实现", romaji: "yume wa kanau" }
      ]
    },
    message: "🌟すごい！🌟 10个番茄钟！你是真正的N3マスター！",
    messageJp: "君は最強だ！",
    nextHint: "继续保持，每完成5个都有新惊喜！",
    celebrationLevel: "mega"
  }
};

// 获取下一个里程碑
export const getNextMilestone = (currentCount) => {
  const milestoneNumbers = Object.keys(MILESTONES).map(Number).sort((a, b) => a - b);

  for (let milestone of milestoneNumbers) {
    if (currentCount < milestone) {
      return {
        count: milestone,
        remaining: milestone - currentCount,
        data: MILESTONES[milestone]
      };
    }
  }

  // 如果超过10个，下一个里程碑是15, 20, 25...
  if (currentCount >= 10) {
    const nextMilestone = Math.ceil((currentCount + 1) / 5) * 5;
    return {
      count: nextMilestone,
      remaining: nextMilestone - currentCount,
      data: {
        title: "継続の達人",
        titleJp: "けいぞくのたつじん",
        badge: `${nextMilestone}個達成`,
        badgeEmoji: "🏆",
        celebrationLevel: nextMilestone % 10 === 0 ? "mega" : "milestone"
      }
    };
  }

  return null;
};

// 检查是否达到里程碑
export const checkMilestoneReached = (count) => {
  if (MILESTONES[count]) {
    return MILESTONES[count];
  }

  // 检查10个以后的里程碑 (15, 20, 25...)
  if (count > 10 && count % 5 === 0) {
    return {
      count,
      title: "継続の達人",
      titleJp: "けいぞくのたつじん",
      badge: `${count}個達成`,
      badgeEmoji: "🏆",
      message: `信じられない！${count}个番茄钟！你是真正的学霸！`,
      messageJp: "すごすぎる！",
      celebrationLevel: count % 10 === 0 ? "mega" : "milestone",
      catGift: {
        name: "特别奖励",
        emoji: "🎁",
        message: `完成${count}个番茄钟的奖励！继续加油！`
      }
    };
  }

  return null;
};

// 获取所有已解锁的里程碑
export const getUnlockedMilestones = (totalPomodoros) => {
  return Object.values(MILESTONES)
    .filter(m => totalPomodoros >= m.count)
    .sort((a, b) => a.count - b.count);
};

// 获取所有N3短语（已解锁）
export const getUnlockedPhrases = (totalPomodoros) => {
  const unlocked = getUnlockedMilestones(totalPomodoros);
  const allPhrases = [];

  unlocked.forEach(milestone => {
    if (milestone.n3Reward && milestone.n3Reward.phrases) {
      allPhrases.push({
        category: milestone.n3Reward.category,
        phrases: milestone.n3Reward.phrases,
        unlockedAt: milestone.count
      });
    }
  });

  return allPhrases;
};
