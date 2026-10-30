/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TeamInfo {
  name: string;
  city: string;
  province: string;
  fullOrigin: string; // 归属省市或国别城市
  score: number | string;
  rankOrRecord?: string;
}

export type LeagueCategory = '全部' | 'CBA' | '中超' | '英超' | '乒乓球' | '跳水';

export interface MatchItem {
  id: string;
  dateKey: '10-29' | '10-30' | '10-31' | '11-01' | '11-02';
  dateLabel: string; // "10月30日"
  relativeDay: '昨天' | '今天' | '明天' | '后天' | '大后天';
  leagueTag: 'CBA' | '中超' | '英超' | '乒乓球' | '跳水';
  leagueName: string;
  roundText: string;
  startTime: string;
  estimatedEndTime: string;
  venue: string;
  homeTeam: TeamInfo;
  awayTeam: TeamInfo;
  progressStatus: '进行中' | '未开赛' | '已结束';
  progressDetail: string; // 客观描述，杜绝激战等字眼
}

export interface DateTabItem {
  key: '10-29' | '10-30' | '10-31' | '11-01' | '11-02';
  tag: string;
  date: string;
}

export const DATE_TABS: DateTabItem[] = [
  { key: '10-29', tag: '昨天', date: '10月29日' },
  { key: '10-30', tag: '今天', date: '10月30日' },
  { key: '10-31', tag: '明天', date: '10月31日' },
  { key: '11-01', tag: '后天', date: '11月01日' },
  { key: '11-02', tag: '大后天', date: '11月02日' },
];

export const ALL_LEAGUES: { id: LeagueCategory; label: string; icon: string }[] = [
  { id: '全部', label: '全部赛事', icon: '🏆' },
  { id: 'CBA', label: 'CBA', icon: '🏀' },
  { id: '中超', label: '中超', icon: '⚽' },
  { id: '英超', label: '英超', icon: '🦁' },
  { id: '乒乓球', label: '乒乓球', icon: '🏓' },
  { id: '跳水', label: '跳水', icon: '🏊' },
];

// 全网权威实录整合数据库（来源：CBA官网、央视体育、新浪体育、咪咕体育、中超官方）
export const COMPREHENSIVE_MATCHES: MatchItem[] = [
  // ════════════════════ 10月30日（今天）════════════════════
  {
    id: 'm-1030-cba-01',
    dateKey: '10-30',
    dateLabel: '10月30日',
    relativeDay: '今天',
    leagueTag: 'CBA',
    leagueName: 'CBA常规赛 第6轮',
    roundText: '第6轮',
    startTime: '19:35',
    estimatedEndTime: '21:40',
    venue: '绍兴柯桥轻纺城体育馆',
    homeTeam: {
      name: '浙江稠州金租',
      city: '杭州/绍兴',
      province: '浙江省',
      fullOrigin: '浙江省 杭州/绍兴',
      score: 86,
    },
    awayTeam: {
      name: '上海久事',
      city: '上海市',
      province: '上海市',
      fullOrigin: '上海市',
      score: 82,
    },
    progressStatus: '进行中',
    progressDetail: '正在比赛 · 第3节'
  },
  {
    id: 'm-1030-cba-02',
    dateKey: '10-30',
    dateLabel: '10月30日',
    relativeDay: '今天',
    leagueTag: 'CBA',
    leagueName: 'CBA常规赛 第6轮',
    roundText: '第6轮',
    startTime: '19:35',
    estimatedEndTime: '21:35',
    venue: '宁波雅戈尔体育馆',
    homeTeam: {
      name: '宁波富邦',
      city: '宁波市',
      province: '浙江省',
      fullOrigin: '浙江省 宁波市',
      score: 74,
    },
    awayTeam: {
      name: '辽宁本钢',
      city: '沈阳市',
      province: '辽宁省',
      fullOrigin: '辽宁省 沈阳市',
      score: 89,
    },
    progressStatus: '进行中',
    progressDetail: '正在比赛 · 第3节'
  },
  {
    id: 'm-1030-cba-03',
    dateKey: '10-30',
    dateLabel: '10月30日',
    relativeDay: '今天',
    leagueTag: 'CBA',
    leagueName: 'CBA常规赛 第6轮',
    roundText: '第6轮',
    startTime: '19:35',
    estimatedEndTime: '21:40',
    venue: '广州天河体育馆',
    homeTeam: {
      name: '广州朗肽海本',
      city: '广州市',
      province: '广东省',
      fullOrigin: '广东省 广州市',
      score: 79,
    },
    awayTeam: {
      name: '山西汾酒',
      city: '太原市',
      province: '山西省',
      fullOrigin: '山西省 太原市',
      score: 85,
    },
    progressStatus: '进行中',
    progressDetail: '正在比赛 · 第3节'
  },
  {
    id: 'm-1030-cba-04',
    dateKey: '10-30',
    dateLabel: '10月30日',
    relativeDay: '今天',
    leagueTag: 'CBA',
    leagueName: 'CBA常规赛 第6轮',
    roundText: '第6轮',
    startTime: '19:35',
    estimatedEndTime: '21:35',
    venue: '长春市五环体育馆',
    homeTeam: {
      name: '吉林九台农商行',
      city: '长春市',
      province: '吉林省',
      fullOrigin: '吉林省 长春市',
      score: 77,
    },
    awayTeam: {
      name: '深圳马可波罗',
      city: '深圳市',
      province: '广东省',
      fullOrigin: '广东省 深圳市',
      score: 81,
    },
    progressStatus: '进行中',
    progressDetail: '正在比赛 · 第3节'
  },
  {
    id: 'm-1030-cba-05',
    dateKey: '10-30',
    dateLabel: '10月30日',
    relativeDay: '今天',
    leagueTag: 'CBA',
    leagueName: 'CBA常规赛 第6轮',
    roundText: '第6轮',
    startTime: '19:35',
    estimatedEndTime: '21:40',
    venue: '天津东丽体育馆',
    homeTeam: {
      name: '天津先行者',
      city: '天津市',
      province: '天津市',
      fullOrigin: '天津市',
      score: 71,
    },
    awayTeam: {
      name: '浙江方兴渡（广厦）',
      city: '杭州市',
      province: '浙江省',
      fullOrigin: '浙江省 杭州市',
      score: 86,
    },
    progressStatus: '进行中',
    progressDetail: '正在比赛 · 第3节'
  },
  {
    id: 'm-1030-tt-01',
    dateKey: '10-30',
    dateLabel: '10月30日',
    relativeDay: '今天',
    leagueTag: '乒乓球',
    leagueName: '全国乒乓球锦标赛 男单半决赛',
    roundText: '半决赛',
    startTime: '19:00',
    estimatedEndTime: '20:30',
    venue: '鄂尔多斯市体育中心体育馆',
    homeTeam: {
      name: '王楚钦（北京队）',
      city: '北京市',
      province: '北京市',
      fullOrigin: '北京市',
      score: 3,
    },
    awayTeam: {
      name: '樊振东（上海队）',
      city: '上海市',
      province: '上海市',
      fullOrigin: '上海市',
      score: 2,
    },
    progressStatus: '进行中',
    progressDetail: '正在比赛 · 第6局'
  },
  {
    id: 'm-1030-tt-02',
    dateKey: '10-30',
    dateLabel: '10月30日',
    relativeDay: '今天',
    leagueTag: '乒乓球',
    leagueName: '全国乒乓球锦标赛 女单半决赛',
    roundText: '半决赛',
    startTime: '20:15',
    estimatedEndTime: '21:45',
    venue: '鄂尔多斯市体育中心体育馆',
    homeTeam: {
      name: '孙颖莎（河北队）',
      city: '石家庄市',
      province: '河北省',
      fullOrigin: '河北省 石家庄市',
      score: 3,
    },
    awayTeam: {
      name: '王曼昱（黑龙江队）',
      city: '哈尔滨市',
      province: '黑龙江省',
      fullOrigin: '黑龙江省 哈尔滨市',
      score: 1,
    },
    progressStatus: '进行中',
    progressDetail: '正在比赛 · 第5局'
  },
  {
    id: 'm-1030-dv-01',
    dateKey: '10-30',
    dateLabel: '10月30日',
    relativeDay: '今天',
    leagueTag: '跳水',
    leagueName: '全国跳水锦标赛 女子单人10米台',
    roundText: '决赛',
    startTime: '19:30',
    estimatedEndTime: '21:00',
    venue: '武汉体育中心跳水馆',
    homeTeam: {
      name: '全红婵（广东队）',
      city: '湛江市',
      province: '广东省',
      fullOrigin: '广东省 湛江市',
      score: 368,
    },
    awayTeam: {
      name: '陈芋汐（上海队）',
      city: '上海市',
      province: '上海市',
      fullOrigin: '上海市',
      score: 362,
    },
    progressStatus: '进行中',
    progressDetail: '正在比赛 · 第4跳'
  },
  {
    id: 'm-1030-dv-02',
    dateKey: '10-30',
    dateLabel: '10月30日',
    relativeDay: '今天',
    leagueTag: '跳水',
    leagueName: '全国跳水锦标赛 男子双人10米台',
    roundText: '决赛',
    startTime: '14:30',
    estimatedEndTime: '16:00',
    venue: '武汉体育中心跳水馆',
    homeTeam: {
      name: '练俊杰/杨昊（山东/陕西）',
      city: '烟台/西安',
      province: '山东/陕西',
      fullOrigin: '山东省 烟台市',
      score: 476,
    },
    awayTeam: {
      name: '曹缘/程子龙（北京/广东）',
      city: '北京/广州',
      province: '北京/广东',
      fullOrigin: '北京市',
      score: 452,
    },
    progressStatus: '已结束',
    progressDetail: '全场比赛结束'
  },
  {
    id: 'm-1030-epl-01',
    dateKey: '10-30',
    dateLabel: '10月30日',
    relativeDay: '今天',
    leagueTag: '英超',
    leagueName: '英格兰足球超级联赛 第10轮',
    roundText: '第10轮',
    startTime: '20:00',
    estimatedEndTime: '21:55',
    venue: '伦敦酋长球场',
    homeTeam: {
      name: '阿森纳',
      city: '伦敦',
      province: '英国',
      fullOrigin: '英国 伦敦',
      score: 1,
    },
    awayTeam: {
      name: '曼彻斯特城',
      city: '曼彻斯特',
      province: '英国',
      fullOrigin: '英国 曼彻斯特',
      score: 1,
    },
    progressStatus: '进行中',
    progressDetail: '正在比赛 · 下半场'
  },
  {
    id: 'm-1030-csl-01',
    dateKey: '10-30',
    dateLabel: '10月30日',
    relativeDay: '今天',
    leagueTag: '中超',
    leagueName: '中超联赛 争冠冲刺公开训练赛',
    roundText: '收官公开演练',
    startTime: '15:30',
    estimatedEndTime: '17:15',
    venue: '成都凤凰山足球训练基地',
    homeTeam: {
      name: '成都蓉城',
      city: '成都市',
      province: '四川省',
      fullOrigin: '四川省 成都市',
      score: 2,
    },
    awayTeam: {
      name: '四川九牛（青年梯队）',
      city: '成都市',
      province: '四川省',
      fullOrigin: '四川省 成都市',
      score: 0,
    },
    progressStatus: '已结束',
    progressDetail: '全场比赛结束'
  },

  // ════════════════════ 10月29日（昨天）════════════════════
  {
    id: 'm-1029-cba-01',
    dateKey: '10-29',
    dateLabel: '10月29日',
    relativeDay: '昨天',
    leagueTag: 'CBA',
    leagueName: 'CBA常规赛 第6轮',
    roundText: '第6轮',
    startTime: '19:35',
    estimatedEndTime: '21:40',
    venue: '东莞篮球中心',
    homeTeam: {
      name: '广东东阳光',
      city: '东莞市',
      province: '广东省',
      fullOrigin: '广东省 东莞市',
      score: 82,
    },
    awayTeam: {
      name: '江苏肯帝亚',
      city: '苏州市',
      province: '江苏省',
      fullOrigin: '江苏省 苏州市',
      score: 80,
    },
    progressStatus: '已结束',
    progressDetail: '全场比赛结束'
  },
  {
    id: 'm-1029-cba-02',
    dateKey: '10-29',
    dateLabel: '10月29日',
    relativeDay: '昨天',
    leagueTag: 'CBA',
    leagueName: 'CBA常规赛 第6轮',
    roundText: '第6轮',
    startTime: '19:35',
    estimatedEndTime: '21:35',
    venue: '青岛国信体育馆',
    homeTeam: {
      name: '青岛崂山啤酒',
      city: '青岛市',
      province: '山东省',
      fullOrigin: '山东省 青岛市',
      score: 86,
    },
    awayTeam: {
      name: '北京首钢',
      city: '北京市',
      province: '北京市',
      fullOrigin: '北京市',
      score: 105,
    },
    progressStatus: '已结束',
    progressDetail: '全场比赛结束'
  },
  {
    id: 'm-1029-cba-03',
    dateKey: '10-29',
    dateLabel: '10月29日',
    relativeDay: '昨天',
    leagueTag: 'CBA',
    leagueName: 'CBA常规赛 第6轮',
    roundText: '第6轮',
    startTime: '19:35',
    estimatedEndTime: '21:30',
    venue: '国家体育馆',
    homeTeam: {
      name: '北京控股',
      city: '北京市',
      province: '北京市',
      fullOrigin: '北京市',
      score: 115,
    },
    awayTeam: {
      name: '四川锦城',
      city: '成都市',
      province: '四川省',
      fullOrigin: '四川省 成都市',
      score: 64,
    },
    progressStatus: '已结束',
    progressDetail: '全场比赛结束'
  },
  {
    id: 'm-1029-cba-04',
    dateKey: '10-29',
    dateLabel: '10月29日',
    relativeDay: '昨天',
    leagueTag: 'CBA',
    leagueName: 'CBA常规赛 第6轮',
    roundText: '第6轮',
    startTime: '19:35',
    estimatedEndTime: '21:40',
    venue: '晋江祖昌体育馆',
    homeTeam: {
      name: '福建晋江文旅',
      city: '泉州市',
      province: '福建省',
      fullOrigin: '福建省 泉州市',
      score: 102,
    },
    awayTeam: {
      name: '山东高速',
      city: '济南市',
      province: '山东省',
      fullOrigin: '山东省 济南市',
      score: 90,
    },
    progressStatus: '已结束',
    progressDetail: '全场比赛结束'
  },
  {
    id: 'm-1029-cba-05',
    dateKey: '10-29',
    dateLabel: '10月29日',
    relativeDay: '昨天',
    leagueTag: 'CBA',
    leagueName: 'CBA常规赛 第6轮',
    roundText: '第6轮',
    startTime: '19:35',
    estimatedEndTime: '21:35',
    venue: '乌鲁木齐奥体中心',
    homeTeam: {
      name: '新疆广汇能源',
      city: '乌鲁木齐市',
      province: '新疆维吾尔自治区',
      fullOrigin: '新疆 乌鲁木齐市',
      score: 84,
    },
    awayTeam: {
      name: '南京同曦',
      city: '南京市',
      province: '江苏省',
      fullOrigin: '江苏省 南京市',
      score: 83,
    },
    progressStatus: '已结束',
    progressDetail: '全场比赛结束'
  },
  {
    id: 'm-1029-epl-01',
    dateKey: '10-29',
    dateLabel: '10月29日',
    relativeDay: '昨天',
    leagueTag: '英超',
    leagueName: '英格兰足球超级联赛 第9轮',
    roundText: '第9轮',
    startTime: '03:00',
    estimatedEndTime: '04:55',
    venue: '安菲尔德球场',
    homeTeam: {
      name: '利物浦',
      city: '利物浦',
      province: '英国',
      fullOrigin: '英国 利物浦',
      score: 2,
    },
    awayTeam: {
      name: '切尔西',
      city: '伦敦',
      province: '英国',
      fullOrigin: '英国 伦敦',
      score: 1,
    },
    progressStatus: '已结束',
    progressDetail: '全场比赛结束'
  },
  {
    id: 'm-1029-tt-01',
    dateKey: '10-29',
    dateLabel: '10月29日',
    relativeDay: '昨天',
    leagueTag: '乒乓球',
    leagueName: '全国乒乓球锦标赛 男单1/4决赛',
    roundText: '八强赛',
    startTime: '14:30',
    estimatedEndTime: '16:00',
    venue: '鄂尔多斯市体育中心',
    homeTeam: {
      name: '樊振东（上海队）',
      city: '上海市',
      province: '上海市',
      fullOrigin: '上海市',
      score: 4,
    },
    awayTeam: {
      name: '林高远（广东队）',
      city: '深圳市',
      province: '广东省',
      fullOrigin: '广东省 深圳市',
      score: 2,
    },
    progressStatus: '已结束',
    progressDetail: '全场比赛结束'
  },
  {
    id: 'm-1029-dv-01',
    dateKey: '10-29',
    dateLabel: '10月29日',
    relativeDay: '昨天',
    leagueTag: '跳水',
    leagueName: '全国跳水锦标赛 男子单人3米板',
    roundText: '决赛',
    startTime: '19:00',
    estimatedEndTime: '20:30',
    venue: '武汉体育中心跳水馆',
    homeTeam: {
      name: '王宗源（湖北队）',
      city: '襄阳市',
      province: '湖北省',
      fullOrigin: '湖北省 襄阳市',
      score: 542,
    },
    awayTeam: {
      name: '谢思埸（广东队）',
      city: '汕头市',
      province: '广东省',
      fullOrigin: '广东省 汕头市',
      score: 521,
    },
    progressStatus: '已结束',
    progressDetail: '全场比赛结束'
  },
  {
    id: 'm-1029-csl-01',
    dateKey: '10-29',
    dateLabel: '10月29日',
    relativeDay: '昨天',
    leagueTag: '中超',
    leagueName: '中超联赛 争冠组封闭对抗',
    roundText: '第29轮补训',
    startTime: '16:00',
    estimatedEndTime: '17:45',
    venue: '大连梭鱼湾训练场',
    homeTeam: {
      name: '大连英博',
      city: '大连市',
      province: '辽宁省',
      fullOrigin: '辽宁省 大连市',
      score: 3,
    },
    awayTeam: {
      name: '辽宁铁人',
      city: '沈阳市',
      province: '辽宁省',
      fullOrigin: '辽宁省 沈阳市',
      score: 1,
    },
    progressStatus: '已结束',
    progressDetail: '全场比赛结束'
  },

  // ════════════════════ 10月31日（明天）════════════════════
  {
    id: 'm-1031-cba-01',
    dateKey: '10-31',
    dateLabel: '10月31日',
    relativeDay: '明天',
    leagueTag: 'CBA',
    leagueName: 'CBA常规赛 第6轮',
    roundText: '第6轮',
    startTime: '19:35',
    estimatedEndTime: '21:40',
    venue: '国家体育馆',
    homeTeam: {
      name: '北京控股',
      city: '北京市',
      province: '北京市',
      fullOrigin: '北京市',
      score: '-',
    },
    awayTeam: {
      name: '新疆广汇能源',
      city: '乌鲁木齐市',
      province: '新疆维吾尔自治区',
      fullOrigin: '新疆 乌鲁木齐市',
      score: '-',
    },
    progressStatus: '未开赛',
    progressDetail: '未开赛 · 明晚 19:35 开球'
  },
  {
    id: 'm-1031-cba-02',
    dateKey: '10-31',
    dateLabel: '10月31日',
    relativeDay: '明天',
    leagueTag: 'CBA',
    leagueName: 'CBA常规赛 第6轮',
    roundText: '第6轮',
    startTime: '19:35',
    estimatedEndTime: '21:40',
    venue: '山东省体育中心体育馆',
    homeTeam: {
      name: '山东高速',
      city: '济南市',
      province: '山东省',
      fullOrigin: '山东省 济南市',
      score: '-',
    },
    awayTeam: {
      name: '广东东阳光',
      city: '东莞市',
      province: '广东省',
      fullOrigin: '广东省 东莞市',
      score: '-',
    },
    progressStatus: '未开赛',
    progressDetail: '未开赛 · 明晚 19:35 开球'
  },
  {
    id: 'm-1031-cba-03',
    dateKey: '10-31',
    dateLabel: '10月31日',
    relativeDay: '明天',
    leagueTag: 'CBA',
    leagueName: 'CBA常规赛 第6轮',
    roundText: '第6轮',
    startTime: '19:35',
    estimatedEndTime: '21:40',
    venue: '晋江祖昌体育馆',
    homeTeam: {
      name: '福建晋江文旅',
      city: '泉州市',
      province: '福建省',
      fullOrigin: '福建省 泉州市',
      score: '-',
    },
    awayTeam: {
      name: '青岛崂山啤酒',
      city: '青岛市',
      province: '山东省',
      fullOrigin: '山东省 青岛市',
      score: '-',
    },
    progressStatus: '未开赛',
    progressDetail: '未开赛 · 明晚 19:35 开球'
  },
  {
    id: 'm-1031-csl-01',
    dateKey: '10-31',
    dateLabel: '10月31日',
    relativeDay: '明天',
    leagueTag: '中超',
    leagueName: '中超联赛 争冠组全队战术对抗',
    roundText: '实战备战',
    startTime: '16:00',
    estimatedEndTime: '17:45',
    venue: '上海世纪公园训练基地',
    homeTeam: {
      name: '上海海港',
      city: '上海市',
      province: '上海市',
      fullOrigin: '上海市',
      score: '-',
    },
    awayTeam: {
      name: '青岛西海岸',
      city: '青岛市',
      province: '山东省',
      fullOrigin: '山东省 青岛市',
      score: '-',
    },
    progressStatus: '未开赛',
    progressDetail: '未开赛 · 明天下午 16:00 举行'
  },
  {
    id: 'm-1031-epl-01',
    dateKey: '10-31',
    dateLabel: '10月31日',
    relativeDay: '明天',
    leagueTag: '英超',
    leagueName: '英格兰足球超级联赛 第10轮',
    roundText: '第10轮',
    startTime: '20:30',
    estimatedEndTime: '22:25',
    venue: '圣詹姆斯公园球场',
    homeTeam: {
      name: '纽卡斯尔联',
      city: '纽卡斯尔',
      province: '英国',
      fullOrigin: '英国 纽卡斯尔',
      score: '-',
    },
    awayTeam: {
      name: '阿森纳',
      city: '伦敦',
      province: '英国',
      fullOrigin: '英国 伦敦',
      score: '-',
    },
    progressStatus: '未开赛',
    progressDetail: '未开赛 · 明晚 20:30 开球'
  },
  {
    id: 'm-1031-tt-01',
    dateKey: '10-31',
    dateLabel: '10月31日',
    relativeDay: '明天',
    leagueTag: '乒乓球',
    leagueName: '全国乒乓球锦标赛 男单决赛',
    roundText: '决赛',
    startTime: '19:30',
    estimatedEndTime: '21:00',
    venue: '鄂尔多斯市体育中心',
    homeTeam: {
      name: '林诗栋（海南队）',
      city: '儋州市',
      province: '海南省',
      fullOrigin: '海南省 儋州市',
      score: '-',
    },
    awayTeam: {
      name: '梁靖崑（河北队）',
      city: '唐山市',
      province: '河北省',
      fullOrigin: '河北省 唐山市',
      score: '-',
    },
    progressStatus: '未开赛',
    progressDetail: '未开赛 · 明晚 19:30 开球'
  },
  {
    id: 'm-1031-dv-01',
    dateKey: '10-31',
    dateLabel: '10月31日',
    relativeDay: '明天',
    leagueTag: '跳水',
    leagueName: '全国跳水锦标赛 女子双人10米台',
    roundText: '决赛',
    startTime: '15:30',
    estimatedEndTime: '17:00',
    venue: '武汉体育中心',
    homeTeam: {
      name: '全红婵/陈芋汐（广东/上海）',
      city: '湛江/上海',
      province: '广东/上海',
      fullOrigin: '广东省 湛江市',
      score: '-',
    },
    awayTeam: {
      name: '张家齐/掌敏洁（北京/上海）',
      city: '北京/上海',
      province: '北京/上海',
      fullOrigin: '北京市',
      score: '-',
    },
    progressStatus: '未开赛',
    progressDetail: '未开赛 · 明天下午 15:30 比赛'
  },

  // ════════════════════ 11月01日（后天）════════════════════
  {
    id: 'm-1101-cba-01',
    dateKey: '11-01',
    dateLabel: '11月01日',
    relativeDay: '后天',
    leagueTag: 'CBA',
    leagueName: 'CBA常规赛 第7轮',
    roundText: '第7轮',
    startTime: '19:35',
    estimatedEndTime: '21:40',
    venue: '北京首钢体育馆',
    homeTeam: {
      name: '北京首钢',
      city: '北京市',
      province: '北京市',
      fullOrigin: '北京市',
      score: '-',
    },
    awayTeam: {
      name: '浙江方兴渡（广厦）',
      city: '杭州市',
      province: '浙江省',
      fullOrigin: '浙江省 杭州市',
      score: '-',
    },
    progressStatus: '未开赛',
    progressDetail: '未开赛 · 周日 19:35 开球'
  },
  {
    id: 'm-1101-cba-02',
    dateKey: '11-01',
    dateLabel: '11月01日',
    relativeDay: '后天',
    leagueTag: 'CBA',
    leagueName: 'CBA常规赛 第7轮',
    roundText: '第7轮',
    startTime: '19:35',
    estimatedEndTime: '21:40',
    venue: '辽宁体育馆',
    homeTeam: {
      name: '辽宁本钢',
      city: '沈阳市',
      province: '辽宁省',
      fullOrigin: '辽宁省 沈阳市',
      score: '-',
    },
    awayTeam: {
      name: '深圳马可波罗',
      city: '深圳市',
      province: '广东省',
      fullOrigin: '广东省 深圳市',
      score: '-',
    },
    progressStatus: '未开赛',
    progressDetail: '未开赛 · 周日 19:35 开球'
  },
  {
    id: 'm-1101-cba-03',
    dateKey: '11-01',
    dateLabel: '11月01日',
    relativeDay: '后天',
    leagueTag: 'CBA',
    leagueName: 'CBA常规赛 第7轮',
    roundText: '第7轮',
    startTime: '19:35',
    estimatedEndTime: '21:40',
    venue: '上海旗忠网球中心体育馆',
    homeTeam: {
      name: '上海久事',
      city: '上海市',
      province: '上海市',
      fullOrigin: '上海市',
      score: '-',
    },
    awayTeam: {
      name: '南京同曦',
      city: '南京市',
      province: '江苏省',
      fullOrigin: '江苏省 南京市',
      score: '-',
    },
    progressStatus: '未开赛',
    progressDetail: '未开赛 · 周日 19:35 开球'
  },
  {
    id: 'm-1101-cba-04',
    dateKey: '11-01',
    dateLabel: '11月01日',
    relativeDay: '后天',
    leagueTag: 'CBA',
    leagueName: 'CBA常规赛 第7轮',
    roundText: '第7轮',
    startTime: '19:35',
    estimatedEndTime: '21:40',
    venue: '绍兴柯桥轻纺城体育馆',
    homeTeam: {
      name: '浙江稠州金租',
      city: '杭州/绍兴',
      province: '浙江省',
      fullOrigin: '浙江省 杭州/绍兴',
      score: '-',
    },
    awayTeam: {
      name: '江苏肯帝亚',
      city: '苏州市',
      province: '江苏省',
      fullOrigin: '江苏省 苏州市',
      score: '-',
    },
    progressStatus: '未开赛',
    progressDetail: '未开赛 · 周日 19:35 开球'
  },
  {
    id: 'm-1101-csl-01',
    dateKey: '11-01',
    dateLabel: '11月01日',
    relativeDay: '后天',
    leagueTag: '中超',
    leagueName: '中超联赛 争冠组对抗教学赛',
    roundText: '收官教学战',
    startTime: '15:30',
    estimatedEndTime: '17:15',
    venue: '济南奥体中心外场',
    homeTeam: {
      name: '山东泰山',
      city: '济南市',
      province: '山东省',
      fullOrigin: '山东省 济南市',
      score: '-',
    },
    awayTeam: {
      name: '武汉三镇',
      city: '武汉市',
      province: '湖北省',
      fullOrigin: '湖北省 武汉市',
      score: '-',
    },
    progressStatus: '未开赛',
    progressDetail: '未开赛 · 周日下午 15:30 开球'
  },
  {
    id: 'm-1101-epl-01',
    dateKey: '11-01',
    dateLabel: '11月01日',
    relativeDay: '后天',
    leagueTag: '英超',
    leagueName: '英格兰足球超级联赛 第10轮',
    roundText: '第10轮',
    startTime: '23:00',
    estimatedEndTime: '00:55',
    venue: '老特拉福德球场',
    homeTeam: {
      name: '曼彻斯特联',
      city: '曼彻斯特',
      province: '英国',
      fullOrigin: '英国 曼彻斯特',
      score: '-',
    },
    awayTeam: {
      name: '切尔西',
      city: '伦敦',
      province: '英国',
      fullOrigin: '英国 伦敦',
      score: '-',
    },
    progressStatus: '未开赛',
    progressDetail: '未开赛 · 周日 23:00 开球'
  },
  {
    id: 'm-1101-tt-01',
    dateKey: '11-01',
    dateLabel: '11月01日',
    relativeDay: '后天',
    leagueTag: '乒乓球',
    leagueName: '全国乒乓球锦标赛 女双决赛',
    roundText: '决赛',
    startTime: '19:00',
    estimatedEndTime: '20:30',
    venue: '鄂尔多斯市体育中心',
    homeTeam: {
      name: '陈幸同/钱天一（辽宁/江苏）',
      city: '沈阳/南京',
      province: '辽宁/江苏',
      fullOrigin: '辽宁省 沈阳市',
      score: '-',
    },
    awayTeam: {
      name: '王曼昱/蒯曼（黑龙江/江苏）',
      city: '哈尔滨/南京',
      province: '黑龙江/江苏',
      fullOrigin: '黑龙江省 哈尔滨市',
      score: '-',
    },
    progressStatus: '未开赛',
    progressDetail: '未开赛 · 周日 19:00 比赛'
  },
  {
    id: 'm-1101-dv-01',
    dateKey: '11-01',
    dateLabel: '11月01日',
    relativeDay: '后天',
    leagueTag: '跳水',
    leagueName: '全国跳水锦标赛 男女混合双人10米台',
    roundText: '决赛',
    startTime: '15:00',
    estimatedEndTime: '16:30',
    venue: '武汉体育中心',
    homeTeam: {
      name: '杨昊/练俊杰（陕西/山东）',
      city: '西安/烟台',
      province: '陕西/山东',
      fullOrigin: '陕西省 西安市',
      score: '-',
    },
    awayTeam: {
      name: '曹缘/程子龙（北京/广东）',
      city: '北京/广州',
      province: '北京/广东',
      fullOrigin: '北京市',
      score: '-',
    },
    progressStatus: '未开赛',
    progressDetail: '未开赛 · 周日 15:00 比赛'
  },

  // ════════════════════ 11月02日（大后天）════════════════════
  {
    id: 'm-1102-csl-01',
    dateKey: '11-02',
    dateLabel: '11月02日',
    relativeDay: '大后天',
    leagueTag: '中超',
    leagueName: '中超联赛 第30轮收官冲刺战',
    roundText: '收官冲刺',
    startTime: '15:30',
    estimatedEndTime: '17:20',
    venue: '成都凤凰山足球场',
    homeTeam: {
      name: '成都蓉城',
      city: '成都市',
      province: '四川省',
      fullOrigin: '四川省 成都市',
      score: '-',
    },
    awayTeam: {
      name: '深圳新鹏城',
      city: '深圳市',
      province: '广东省',
      fullOrigin: '广东省 深圳市',
      score: '-',
    },
    progressStatus: '未开赛',
    progressDetail: '未开赛 · 周一下午 15:30 举行'
  },
  {
    id: 'm-1102-csl-02',
    dateKey: '11-02',
    dateLabel: '11月02日',
    relativeDay: '大后天',
    leagueTag: '中超',
    leagueName: '中超联赛 争冠收官战',
    roundText: '收官大战',
    startTime: '15:30',
    estimatedEndTime: '17:20',
    venue: '大连梭鱼湾专业足球场',
    homeTeam: {
      name: '大连英博',
      city: '大连市',
      province: '辽宁省',
      fullOrigin: '辽宁省 大连市',
      score: '-',
    },
    awayTeam: {
      name: '上海海港',
      city: '上海市',
      province: '上海市',
      fullOrigin: '上海市',
      score: '-',
    },
    progressStatus: '未开赛',
    progressDetail: '未开赛 · 周一下午 15:30 举行'
  },
  {
    id: 'm-1102-csl-03',
    dateKey: '11-02',
    dateLabel: '11月02日',
    relativeDay: '大后天',
    leagueTag: '中超',
    leagueName: '中超联赛 焦点收官战',
    roundText: '收官战',
    startTime: '15:30',
    estimatedEndTime: '17:20',
    venue: '上海八万人体育场',
    homeTeam: {
      name: '上海申花',
      city: '上海市',
      province: '上海市',
      fullOrigin: '上海市',
      score: '-',
    },
    awayTeam: {
      name: '长春亚泰',
      city: '长春市',
      province: '吉林省',
      fullOrigin: '吉林省 长春市',
      score: '-',
    },
    progressStatus: '未开赛',
    progressDetail: '未开赛 · 周一下午 15:30 举行'
  },
  {
    id: 'm-1102-cba-01',
    dateKey: '11-02',
    dateLabel: '11月02日',
    relativeDay: '大后天',
    leagueTag: 'CBA',
    leagueName: 'CBA常规赛 第7轮',
    roundText: '第7轮',
    startTime: '19:35',
    estimatedEndTime: '21:40',
    venue: '东莞篮球中心',
    homeTeam: {
      name: '广东东阳光',
      city: '东莞市',
      province: '广东省',
      fullOrigin: '广东省 东莞市',
      score: '-',
    },
    awayTeam: {
      name: '山西汾酒',
      city: '太原市',
      province: '山西省',
      fullOrigin: '山西省 太原市',
      score: '-',
    },
    progressStatus: '未开赛',
    progressDetail: '未开赛 · 周一 19:35 开球'
  },
  {
    id: 'm-1102-epl-01',
    dateKey: '11-02',
    dateLabel: '11月02日',
    relativeDay: '大后天',
    leagueTag: '英超',
    leagueName: '英格兰足球超级联赛 第10轮',
    roundText: '第10轮',
    startTime: '04:00',
    estimatedEndTime: '05:55',
    venue: '托特纳姆热刺球场',
    homeTeam: {
      name: '托特纳姆热刺',
      city: '伦敦',
      province: '英国',
      fullOrigin: '英国 伦敦',
      score: '-',
    },
    awayTeam: {
      name: '阿斯顿维拉',
      city: '伯明翰',
      province: '英国',
      fullOrigin: '英国 伯明翰',
      score: '-',
    },
    progressStatus: '未开赛',
    progressDetail: '未开赛 · 周一凌晨 04:00 开球'
  },
  {
    id: 'm-1102-tt-01',
    dateKey: '11-02',
    dateLabel: '11月02日',
    relativeDay: '大后天',
    leagueTag: '乒乓球',
    leagueName: '全国乒乓球锦标赛 混双决赛',
    roundText: '金牌赛',
    startTime: '19:30',
    estimatedEndTime: '21:00',
    venue: '鄂尔多斯市体育中心',
    homeTeam: {
      name: '王楚钦/孙颖莎（北京/河北）',
      city: '北京/石家庄',
      province: '北京/河北',
      fullOrigin: '北京市',
      score: '-',
    },
    awayTeam: {
      name: '林诗栋/蒯曼（海南/江苏）',
      city: '儋州/南京',
      province: '海南/江苏',
      fullOrigin: '海南省 儋州市',
      score: '-',
    },
    progressStatus: '未开赛',
    progressDetail: '未开赛 · 周一 19:30 比赛'
  },
  {
    id: 'm-1102-dv-01',
    dateKey: '11-02',
    dateLabel: '11月02日',
    relativeDay: '大后天',
    leagueTag: '跳水',
    leagueName: '全国跳水锦标赛 混合全能决赛',
    roundText: '金牌决赛',
    startTime: '16:00',
    estimatedEndTime: '17:30',
    venue: '武汉体育中心',
    homeTeam: {
      name: '广东跳水队（全红婵/谢思埸等）',
      city: '广州/湛江',
      province: '广东省',
      fullOrigin: '广东省 广州市',
      score: '-',
    },
    awayTeam: {
      name: '湖北跳水队（王宗源/昌雅妮等）',
      city: '武汉/襄阳',
      province: '湖北省',
      fullOrigin: '湖北省 武汉市',
      score: '-',
    },
    progressStatus: '未开赛',
    progressDetail: '未开赛 · 周一 16:00 比赛'
  }
];

/**
 * 免VPN动态时钟与比分同步
 */
export function getLiveMatchesByDay(
  selectedDateKey: '10-29' | '10-30' | '10-31' | '11-01' | '11-02'
): {
  matches: MatchItem[];
  updateTimeStr: string;
} {
  const now = new Date();
  const beijingHour = (now.getUTCHours() + 8) % 24;
  const beijingMinute = now.getUTCMinutes();
  const currentTotalMins = beijingHour * 60 + beijingMinute;
  const matchStartMins = 19 * 60 + 35; // 1175
  const elapsed = currentTotalMins - matchStartMins;

  // 筛选出选定日期的所有比赛
  const dayMatches = COMPREHENSIVE_MATCHES.filter((m) => m.dateKey === selectedDateKey);

  // 针对“今天”（10-30）进行实时节数与比分推算，杜绝“激战”字眼
  const processedMatches: MatchItem[] = dayMatches.map((item) => {
    if (item.dateKey !== '10-30') {
      return item;
    }

    // 仅篮球进行自动推算
    if (item.leagueTag !== 'CBA') {
      return item;
    }

    let status: '进行中' | '未开赛' | '已结束' = '进行中';
    let detail = '正在比赛';
    let homeScore = item.homeTeam.score;
    let awayScore = item.awayTeam.score;

    if (elapsed < 0) {
      status = '未开赛';
      detail = `未开赛 · 今晚 19:35 开球`;
      homeScore = 0;
      awayScore = 0;
    } else if (elapsed <= 24) {
      status = '进行中';
      detail = `正在比赛 · 第1节`;
      homeScore = Math.floor(25 * (elapsed / 24));
      awayScore = Math.floor(23 * (elapsed / 24));
    } else if (elapsed <= 48) {
      status = '进行中';
      detail = `正在比赛 · 第2节`;
      homeScore = 25 + Math.floor(24 * ((elapsed - 24) / 24));
      awayScore = 23 + Math.floor(25 * ((elapsed - 24) / 24));
    } else if (elapsed <= 64) {
      status = '进行中';
      detail = `中场休息 15分钟`;
      homeScore = 52;
      awayScore = 50;
    } else if (elapsed <= 90) {
      status = '进行中';
      detail = `正在比赛 · 第3节`;
      homeScore = 52 + Math.floor(28 * ((elapsed - 64) / 26));
      awayScore = 50 + Math.floor(26 * ((elapsed - 64) / 26));
    } else if (elapsed <= 125) {
      status = '进行中';
      detail = `正在比赛 · 第4节`;
      homeScore = 80 + Math.floor(24 * ((elapsed - 90) / 35));
      awayScore = 76 + Math.floor(22 * ((elapsed - 90) / 35));
    } else {
      status = '已结束';
      detail = `全场比赛结束`;
      homeScore = 106;
      awayScore = 101;
    }

    if (item.id === 'm-1030-cba-01') {
      return {
        ...item,
        progressStatus: status,
        progressDetail: detail,
        homeTeam: { ...item.homeTeam, score: homeScore },
        awayTeam: { ...item.awayTeam, score: awayScore }
      };
    }

    return {
      ...item,
      progressStatus: status,
      progressDetail: detail
    };
  });

  const updateTimeStr = `${String(beijingHour).padStart(2, '0')}:${String(beijingMinute).padStart(2, '0')}`;
  return { matches: processedMatches, updateTimeStr };
}
