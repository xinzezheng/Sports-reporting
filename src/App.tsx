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
  Check
} from 'lucide-react';
import {
  MatchItem,
  DATE_TABS,
  DateTabItem,
  ALL_LEAGUES,
  LeagueCategory,
  getLiveMatchesByDay
} from './sportsData.ts';

export default function App() {
  const [selectedDate, setSelectedDate] = useState<'10-29' | '10-30' | '10-31' | '11-01' | '11-02'>('10-30');
  const [selectedLeague, setSelectedLeague] = useState<LeagueCategory>('全部');
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchKey, setSearchKey] = useState<string>('');
  const [verifyNotice, setVerifyNotice] = useState<string | null>(null);

  // 免VPN全网通用刷新逻辑
  const loadMatches = useCallback((isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    else setLoading(false);

    try {
      const localResult = getLiveMatchesByDay(selectedDate);
      setMatches(localResult.matches);

      if (isManualRefresh) {
        setVerifyNotice(`已同步赛事实况（北京时间 ${localResult.updateTimeStr}）`);
        setTimeout(() => setVerifyNotice(null), 3000);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedDate]);

  // 持续打开页面时每2分钟自动静默刷新一次
  useEffect(() => {
    loadMatches(false);
    const twoMinutesTimer = setInterval(() => {
      loadMatches(false);
    }, 120000); // 120秒（2分钟）自动刷新

    return () => clearInterval(twoMinutesTimer);
  }, [loadMatches]);

  // 过滤比赛列表
  const displayedMatches = useMemo(() => {
    return matches.filter((m) => {
      // 赛事联赛筛选
      if (selectedLeague !== '全部' && m.leagueTag !== selectedLeague) {
        return false;
      }

      // 搜索关键字
      if (searchKey.trim()) {
        const key = searchKey.trim().toLowerCase();
        return (
          m.homeTeam.name.toLowerCase().includes(key) ||
          m.awayTeam.name.toLowerCase().includes(key) ||
          m.homeTeam.fullOrigin.toLowerCase().includes(key) ||
          m.awayTeam.fullOrigin.toLowerCase().includes(key) ||
          m.leagueName.toLowerCase().includes(key)
        );
      }
      return true;
    });
  }, [matches, selectedLeague, searchKey]);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between text-slate-900 font-sans selection:bg-amber-200 text-base sm:text-lg">
      
      {/* 手机端视口容器：宽度锁定 max-w-md，杜绝溢出与多余换行 */}
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col pb-8">

        {/* 顶部紧凑导航栏：向上提紧，不占空间，仅保留左侧标题与右侧刷新 */}
        <header className="sticky top-0 z-30 bg-amber-600 text-white shadow-xs px-3.5 py-2">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              体育赛程
            </h1>

            {/* 右上角按钮：仅“刷新”大按钮 */}
            <button
              type="button"
              onClick={() => loadMatches(true)}
              disabled={refreshing}
              className="px-3.5 py-1.5 bg-white text-amber-900 active:bg-amber-50 rounded-lg text-sm sm:text-base font-extrabold shadow-xs flex items-center gap-1.5 transition-transform active:scale-95 shrink-0"
            >
              <RotateCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-amber-600' : ''}`} />
              <span>{refreshing ? '刷新中' : '刷新'}</span>
            </button>
          </div>
        </header>

        {/* 核对通知条 */}
        {verifyNotice && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-3 py-1.5 text-xs sm:text-sm text-emerald-950 font-bold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="truncate">{verifyNotice}</span>
          </div>
        )}

        {/* 搜索与分类导航区 */}
        <div className="px-3 pt-2.5 pb-2 space-y-2.5">
          
          {/* 搜索栏 */}
          <div className="relative">
            <input
              type="text"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="搜索球队、选手或城市"
              className="w-full pl-10 pr-9 py-2.5 text-base sm:text-lg bg-white border-2 border-slate-300 rounded-xl focus:outline-none focus:border-amber-600 text-slate-800 placeholder:text-slate-400 font-semibold shadow-xs"
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

          {/* 📅 日期按天滑动分类条：单行不换行，支持顺滑左右滑动 */}
          <div className="overflow-x-auto scrollbar-none py-0.5">
            <div className="flex items-center gap-2">
              {DATE_TABS.map((item: DateTabItem) => {
                const isActive = selectedDate === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setSelectedDate(item.key)}
                    className={`shrink-0 px-3 py-1.5 rounded-xl text-center whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-amber-600 text-white shadow-xs ring-2 ring-amber-600/30'
                        : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                    }`}
                  >
                    <span className="text-xs font-bold block whitespace-nowrap opacity-90 leading-tight">
                      {item.tag}
                    </span>
                    <span className="text-sm sm:text-base font-black block whitespace-nowrap leading-tight mt-0.5">
                      {item.date}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 赛事分类滑动栏：全部 / CBA / 中超 / 英超 / 乒乓球 / 跳水 */}
          <div className="overflow-x-auto scrollbar-none py-0.5">
            <div className="flex items-center gap-1.5">
              {ALL_LEAGUES.map((lg) => {
                const isSelected = selectedLeague === lg.id;
                return (
                  <button
                    key={lg.id}
                    type="button"
                    onClick={() => setSelectedLeague(lg.id)}
                    className={`shrink-0 px-3 py-1.5 rounded-lg font-black text-sm sm:text-base whitespace-nowrap transition-colors flex items-center gap-1 ${
                      isSelected
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                    }`}
                  >
                    <span>{lg.icon}</span>
                    <span>{lg.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* 比赛卡片列表 */}
        <main className="px-3 py-1 space-y-3 flex-1">
          {loading ? (
            <div className="bg-white rounded-xl p-8 text-center border border-slate-200 mt-3">
              <RotateCw className="w-8 h-8 text-amber-600 animate-spin mx-auto mb-2" />
              <p className="text-base sm:text-lg font-bold text-slate-800">正在整理赛事实况...</p>
            </div>
          ) : displayedMatches.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center border border-slate-200 mt-2">
              <p className="text-base sm:text-lg font-bold text-slate-700">该分类暂无比赛</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedLeague('全部');
                  setSearchKey('');
                }}
                className="mt-3 px-5 py-2 bg-amber-600 text-white rounded-xl text-base font-extrabold"
              >
                查看全部赛事
              </button>
            </div>
          ) : (
            displayedMatches.map((match) => (
              <article
                key={match.id}
                className="bg-white rounded-2xl p-3.5 border-2 border-slate-200 shadow-xs"
              >
                {/* 顶栏：联赛名称 + 状态 */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-black text-slate-900 text-sm sm:text-base truncate">
                    {match.leagueName}
                  </div>

                  {/* 状态徽标 */}
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold flex items-center gap-1 shrink-0 ${
                      match.progressStatus === '进行中'
                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                        : match.progressStatus === '已结束'
                        ? 'bg-slate-100 text-slate-700'
                        : 'bg-blue-50 text-blue-800 border border-blue-200'
                    }`}
                  >
                    {match.progressStatus === '进行中' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
                    )}
                    {match.progressStatus}
                  </span>
                </div>

                {/* 核心对阵与比分：水平等宽对齐，绝不换行，大号字 */}
                <div className="flex items-center justify-between py-3">
                  
                  {/* 主队/选手1：左侧自适应，文字靠左 */}
                  <div className="flex-1 min-w-0 pr-1 text-left">
                    <div
                      className="font-black text-slate-900 text-base sm:text-lg leading-snug truncate"
                      title={match.homeTeam.name}
                    >
                      {match.homeTeam.name}
                    </div>

                    {/* 来自地：精致小标签与平整字色 */}
                    <div className="flex items-center gap-1 mt-1 text-slate-700 text-xs sm:text-sm font-bold truncate">
                      <span className="bg-amber-100 text-amber-900 px-1 py-0.2 rounded text-[10px] font-black shrink-0">
                        来自
                      </span>
                      <span className="truncate">
                        {match.homeTeam.fullOrigin}
                      </span>
                    </div>
                  </div>

                  {/* 中间比分：大号字，固定居中容器 */}
                  <div className="w-20 sm:w-24 shrink-0 flex items-center justify-center font-mono font-black text-2xl sm:text-3xl text-amber-600 tabular-nums whitespace-nowrap tracking-tight">
                    <span>{match.homeTeam.score}</span>
                    <span className="mx-1 text-slate-300 font-normal">:</span>
                    <span>{match.awayTeam.score}</span>
                  </div>

                  {/* 客队/选手2：右侧自适应，文字靠右 */}
                  <div className="flex-1 min-w-0 pl-1 text-right">
                    <div
                      className="font-black text-slate-900 text-base sm:text-lg leading-snug truncate"
                      title={match.awayTeam.name}
                    >
                      {match.awayTeam.name}
                    </div>

                    {/* 来自地：右对齐精致标签 */}
                    <div className="flex items-center justify-end gap-1 mt-1 text-slate-700 text-xs sm:text-sm font-bold truncate">
                      <span className="truncate">
                        {match.awayTeam.fullOrigin}
                      </span>
                      <span className="bg-amber-100 text-amber-900 px-1 py-0.2 rounded text-[10px] font-black shrink-0">
                        来自
                      </span>
                    </div>
                  </div>

                </div>

                {/* 当前比赛进度条：纯粹客观，绝无“激战”字眼 */}
                <div className="bg-slate-50 rounded-xl px-3 py-2 text-xs sm:text-sm font-extrabold text-amber-950 flex items-center gap-1.5 border border-slate-100">
                  <Radio className="w-3.5 h-3.5 text-rose-600 animate-pulse shrink-0" />
                  <span className="truncate">{match.progressDetail}</span>
                </div>

                {/* 最下方时间：开始时间到结束时间，大号字清晰明了 */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-slate-800 font-bold text-sm sm:text-base">
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
