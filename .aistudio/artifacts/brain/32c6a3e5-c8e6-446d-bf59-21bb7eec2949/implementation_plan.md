# 赛程数据权威校准与直连方案

## 1. 核心修复与比分校准（严格对照 CBA 官网）
- **根因分析**：此前在时钟引擎中配置了基于开球时间的动态比分推算逻辑，导致即时更新覆盖了官方已完赛的真实比分。
- **即时修正**：
  1. 彻底移除所有模拟推算逻辑，直接 100% 呈现官方真实记录。
  2. 根据 CBA 官方网站（`https://www.cbaleague.com/data/#/games`）实录与用户截图，严格更新 2026年10月30日（常规赛第6轮）全部 5 场比赛记录：
     - **浙江稠州金租 (4胜2负) 81 : 88 上海久事 (5胜1负)**【完赛】
     - **宁波町渥 (0胜6负) 91 : 107 辽宁本钢 (5胜1负)**【完赛】
     - **天津先行者 (1胜5负) 92 : 95 浙江浙商证券 (4胜2负)**【完赛】
     - **广州朗肽海本 93 : 113 山西汾酒**【完赛】
     - **吉林九台农商行 81 : 82 深圳马可波罗**【完赛】

## 2. 严格绑定的 6 大免 VPN 官方赛事信源
1. **CBA**：`https://www.cbaleague.com/data/#/games`
2. **中超**：`https://www.365scores.com/zh/football/league/super-league-150/matches`
3. **英超**：`https://www.premierleague.com/en/matches/premier-league/2026-27`
4. **欧冠**：`https://www.365scores.com/zh/football/league/uefa-champions-league-572`
5. **NBA**：`https://www.livescore.com/zh/lanqiu/nba/regular-season/`
6. **乒乓球**：`https://24live.com/page/sport/match-list/table-tennis-22`

## 3. 界面排版与适老性保证
- 比分与对阵单行等宽排版，坚决不折行。
- 大号粗体字体，取消冗余弹窗，顶部导航栏极致紧凑。
- 5天日期滑动（昨天、今天、明天、后天、大后天）。
- 2分钟静默自动刷新，保证中国大陆用户无须 VPN 即可直接加载。
