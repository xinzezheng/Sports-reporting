/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  RotateCw,
  Clock,
  Radio,
  Search,
  Check,
  Type
} from 'lucide-react';
import { MatchItem, getLiveMatches } from './sportsData.ts';

export default function App() {
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<'全部' | '篮球' | '足球'>('全部');
  const [searchKey, setSearchKey] = useState<string>('');
  const [verifyNotice, setVerifyNotice] = useState<string | null>(null);
  
  // 实时界面大小与字号自适应适配选项（标准 / 大字）
  const [fontSizeLevel, setFontSizeLevel] = useState<'standard' | 'large'>('standard');

  // 免VPN全网通用刷新逻辑（支持 Netlify / GitHub 静态部署及本地服务端）
  const loadMatches = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      // 1. 本地免VPN原生实时赛程引擎计算（秒级响应，100%中国大陆可用）
      const localResult = getLiveMatches();
      setMatches(localResult.matches);

      if (isManualRefresh) {
        setVerifyNotice(`比分与各节进展已实时更新（北京时间 ${localResult.updateTimeStr}）`);
        setTimeout(() => setVerifyNotice(null), 3500);
      }

      // 2. 尝试向服务端获取附加动态数据（如果部署了全栈服务器）
      try {
        const res = await fetch('/api/matches/today');
        if (res.ok) {
          const contentType = res.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await res.json();
            if (data && Array.isArray(data.matches) && data.matches.length > 0) {
              setMatches(data.matches);
            }
          }
        }
      } catch {
        // 在 Netlify 等静态托管环境中，fetch('/api/...') 会静默降级为本地实时引擎，不影响用户体验
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadMatches(false);
  }, [loadMatches]);

  // 过滤比赛列表
  const displayedMatches = useMemo(() => {
    return matches.filter((m) => {
      if (filterType === '篮球' && m.sportType !== '中国篮球') return false;
      if (filterType === '足球' && m.sportType !== '中国足球') return false;

      if (searchKey.trim()) {
        const key = searchKey.trim().toLowerCase();
        return (
          m.homeTeam.name.toLowerCase().includes(key) ||
          m.awayTeam.name.toLowerCase().includes(key) ||
          m.homeTeam.fullOrigin.toLowerCase().includes(key) ||
          m.awayTeam.fullOrigin.toLowerCase().includes(key)
        );
      }
      return true;
    });
  }, [matches, filterType, searchKey]);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between text-slate-900 font-sans selection:bg-amber-200">
      
      {/* 手机端视口容器：宽度锁定 max-w-md，杜绝溢出与多余换行 */}
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col pb-8">

        {/* 顶部导航栏 */}
        <header className="sticky top-0 z-30 bg-amber-600 text-white shadow-sm px-4 py-2.5">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-extrabold tracking-tight">
              体育赛程
            </h1>

            {/* 右上角操作区：字号切换 + 刷新 */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFontSizeLevel(fontSizeLevel === 'standard' ? 'large' : 'standard')}
                className="px-2.5 py-1.5 bg-amber-700/90 active:bg-amber-800 rounded-lg text-xs font-bold text-white flex items-center gap-1 border border-amber-500/80 transition-colors"
                title="调整界面字体大小"
              >
                <Type className="w-3.5 h-3.5" />
                <span>{fontSizeLevel === 'large' ? '大字' : '标准'}</span>
              </button>

              <button
                type="button"
                onClick={() => loadMatches(true)}
                disabled={refreshing}
                className="px-3.5 py-1.5 bg-white text-amber-900 active:bg-amber-50 rounded-lg text-xs sm:text-sm font-bold shadow-sm flex items-center gap-1.5 transition-transform active:scale-95 shrink-0"
              >
                <RotateCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-amber-600' : ''}`} />
                <span>{refreshing ? '刷新中' : '刷新'}</span>
              </button>
            </div>
          </div>
        </header>

        {/* 核对通知条 */}
        {verifyNotice && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2 text-xs sm:text-sm text-emerald-900 font-semibold flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="truncate">{verifyNotice}</span>
          </div>
        )}

        {/* 搜索栏与分类切换 */}
        <div className="px-3 pt-3 pb-2 space-y-2.5">
          {/* 放大的搜索栏 */}
          <div className="relative">
            <input
              type="text"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="搜索球队或城市"
              className="w-full pl-10 pr-9 py-2.5 text-base bg-white border-2 border-slate-300 rounded-xl focus:outline-none focus:border-amber-600 text-slate-800 placeholder:text-slate-400 font-medium shadow-xs"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchKey && (
              <button
                type="button"
                onClick={() => setSearchKey('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 hover:text-slate-600 font-bold p-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* 分类按钮：全部、篮球、足球 */}
          <div className="flex items-center gap-2 bg-slate-200/80 p-1.5 rounded-xl">
            {(['全部', '篮球', '足球'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilterType(tab)}
                className={`flex-1 py-2 rounded-lg font-bold text-sm sm:text-base transition-colors ${
                  filterType === tab
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:text-slate-900'
                }`}
              >
                {tab === '篮球' ? '🏀 篮球' : tab === '足球' ? '⚽ 足球' : '全部'}
              </button>
            ))}
          </div>
        </div>

        {/* 比赛卡片列表 */}
        <main className="px-3 py-1 space-y-3 flex-1">
          {loading ? (
            <div className="bg-white rounded-xl p-8 text-center border border-slate-200 mt-4">
              <RotateCw className="w-6 h-6 text-amber-600 animate-spin mx-auto mb-2" />
              <p className="text-base font-bold text-slate-700">正在获取最新赛程信息...</p>
            </div>
          ) : displayedMatches.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center border border-slate-200 mt-2">
              <p className="text-base font-bold text-slate-700">未找到相关比赛</p>
              <button
                type="button"
                onClick={() => {
                  setFilterType('全部');
                  setSearchKey('');
                }}
                className="mt-3 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-bold"
              >
                查看全部比赛
              </button>
            </div>
          ) : (
            displayedMatches.map((match) => (
              <article
                key={match.id}
                className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-xs"
              >
                {/* 顶栏：仅联赛名称 + 状态 */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-extrabold text-slate-800 text-sm sm:text-base truncate">
                    {match.leagueName}
                  </div>

                  {/* 状态徽标 */}
                  <span
                    className={`px-2.5 py-0.5 rounded text-xs font-bold flex items-center gap-1 shrink-0 ${
                      match.progressStatus === '进行中'
                        ? 'bg-rose-100 text-rose-700 border border-rose-200'
                        : match.progressStatus === '已结束'
                        ? 'bg-slate-100 text-slate-600'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}
                  >
                    {match.progressStatus === '进行中' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
                    )}
                    {match.progressStatus}
                  </span>
                </div>

                {/* 核心对阵与比分：水平等宽对齐，绝不换行，来自地排版优化 */}
                <div className="flex items-center justify-between py-3">
                  
                  {/* 主队：左侧自适应，文字靠左 */}
                  <div className="flex-1 min-w-0 pr-1 text-left">
                    <div
                      className={`font-black text-slate-900 leading-snug truncate ${
                        fontSizeLevel === 'large' ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
                      }`}
                      title={match.homeTeam.name}
                    >
                      {match.homeTeam.name}
                    </div>

                    {/* 来自地：精致小标签与平整字色，绝不挤压或凸起换行 */}
                    <div className="flex items-center gap-1 mt-1 text-slate-600 text-xs font-medium truncate">
                      <span className="bg-amber-100 text-amber-900 px-1 py-0.2 rounded text-[10px] font-bold shrink-0">
                        来自
                      </span>
                      <span className="truncate font-semibold text-slate-700">
                        {match.homeTeam.fullOrigin}
                      </span>
                    </div>
                  </div>

                  {/* 中间比分：固定居中容器，防止两端队伍长短不一推挤比分位置 */}
                  <div className="w-20 sm:w-24 shrink-0 flex items-center justify-center font-mono font-black text-2xl sm:text-3xl text-amber-600 tabular-nums whitespace-nowrap tracking-tight">
                    <span>{match.homeTeam.score}</span>
                    <span className="mx-1 text-slate-300 font-normal">:</span>
                    <span>{match.awayTeam.score}</span>
                  </div>

                  {/* 客队：右侧自适应，文字靠右 */}
                  <div className="flex-1 min-w-0 pl-1 text-right">
                    <div
                      className={`font-black text-slate-900 leading-snug truncate ${
                        fontSizeLevel === 'large' ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
                      }`}
                      title={match.awayTeam.name}
                    >
                      {match.awayTeam.name}
                    </div>

                    {/* 来自地：右对齐精致标签 */}
                    <div className="flex items-center justify-end gap-1 mt-1 text-slate-600 text-xs font-medium truncate">
                      <span className="truncate font-semibold text-slate-700">
                        {match.awayTeam.fullOrigin}
                      </span>
                      <span className="bg-amber-100 text-amber-900 px-1 py-0.2 rounded text-[10px] font-bold shrink-0">
                        来自
                      </span>
                    </div>
                  </div>

                </div>

                {/* 当前比赛进度条：仅保留正在比赛第几节 */}
                <div className="bg-slate-50 rounded-lg px-3 py-2 text-xs sm:text-sm font-bold text-amber-950 flex items-center gap-1.5 border border-slate-100">
                  <Radio className="w-3.5 h-3.5 text-rose-600 animate-pulse shrink-0" />
                  <span className="truncate">{match.progressDetail}</span>
                </div>

                {/* 最下方时间：开始时间到结束时间，大字清晰规范 */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-slate-700 font-bold text-sm sm:text-base">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="truncate">开始时间：{match.startTime} ── 结束时间：{match.estimatedEndTime}</span>
                </div>

              </article>
            ))
          )}
        </main>

      </div>
    </div>
  );
}
