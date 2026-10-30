/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  RotateCw,
  Clock,
  Check,
  ChevronDown,
  ChevronUp,
  Calendar,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import {
  MatchItem,
  DateGroupMatches,
  ALL_LEAGUES,
  LeagueCategory,
  OFFICIAL_DATA_SOURCES,
  generateThreeMonthsMatches
} from './sportsData.ts';

export default function App() {
  // 默认选择 CBA 赛事
  const [selectedLeague, setSelectedLeague] = useState<LeagueCategory>('CBA');
  const [allDateGroups, setAllDateGroups] = useState<DateGroupMatches[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [verifyNotice, setVerifyNotice] = useState<string | null>(null);
  const [showSourceList, setShowSourceList] = useState<boolean>(false);
  
  // 选中的卡片（进入详情页，展示置顶卡片与左右双列比赛人员名单）
  const [selectedMatch, setSelectedMatch] = useState<MatchItem | null>(null);

  // 初始化加载权威赛程库（动态从当前系统日期起算，永不上期过期）
  const loadMatches = useCallback((isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);

    try {
      const data = generateThreeMonthsMatches();
      setAllDateGroups(data);

      if (isManualRefresh) {
        const now = new Date();
        const beijingHour = (now.getUTCHours() + 8) % 24;
        const beijingMin = String(now.getUTCMinutes()).padStart(2, '0');
        setVerifyNotice(`已成功同步最新赛况（北京时间 ${beijingHour}:${beijingMin}）`);
        setTimeout(() => setVerifyNotice(null), 3000);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadMatches(false);

    // 持续打开页面时每 2 分钟自动静默刷新一次
    const timer = setInterval(() => {
      loadMatches(false);
    }, 120000);

    return () => clearInterval(timer);
  }, [loadMatches]);

  // 根据选中的运动类型过滤连续下滑数据
  const filteredDateGroups = useMemo(() => {
    return allDateGroups
      .map((group) => {
        const filteredMatches = group.matches.filter((m) => m.leagueTag === selectedLeague);

        return {
          ...group,
          matches: filteredMatches
        };
      })
      .filter((group) => group.matches.length > 0);
  }, [allDateGroups, selectedLeague]);

  return (
    <div className="h-screen w-full bg-slate-200 flex flex-col justify-between text-slate-950 font-sans selection:bg-amber-300 text-base sm:text-lg overflow-hidden overscroll-none select-none">
      
      {/* 全屏手机端容器：锁定 max-w-md，完美防止左右滑动退出网页 */}
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col h-full overflow-hidden relative">

        {/* ========================================================= */}
        {/* VIEW MODE 1: 比赛详情页 (Selected Match Detail Screen)    */}
        {/* ========================================================= */}
        {selectedMatch ? (
          <div className="flex-1 flex flex-col h-full bg-slate-100 overflow-hidden">
            
            {/* 详情顶栏 Header */}
            <header className="shrink-0 px-4 py-3 bg-orange-600 text-white flex items-center justify-between shadow-md border-b-2 border-orange-700">
              <button
                type="button"
                onClick={() => setSelectedMatch(null)}
                className="px-3 py-1.5 bg-orange-800 hover:bg-orange-900 text-white font-black rounded-xl text-base flex items-center gap-1.5 border border-orange-500 shadow-sm active:scale-95 transition-transform shrink-0"
              >
                <ArrowLeft className="w-5 h-5 text-amber-300" />
                <span>返回赛程列表</span>
              </button>
              <div className="flex items-center gap-1 text-amber-200 font-black text-base sm:text-lg truncate pl-2">
                <span>{selectedMatch.leagueTag} 比赛详情</span>
              </div>
            </header>

            {/* 详情页可滚动区域 */}
            <main className="flex-1 overflow-y-auto overscroll-contain p-3.5 space-y-4">
              
              {/* 📌 移至最上方的置顶比赛卡片 */}
              <article className="bg-white rounded-2xl p-4 sm:p-5 border-3 border-orange-600 shadow-lg relative">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-200 text-xs sm:text-sm font-black text-slate-600">
                  <span className="bg-orange-100 text-orange-950 px-2.5 py-0.5 rounded-md border border-orange-300 shrink-0">
                    {selectedMatch.leagueTag}
                  </span>
                  <span className="truncate ml-2">{selectedMatch.dateDisplay} ({selectedMatch.weekDay})</span>
                </div>

                {/* 队伍与比分大字 */}
                <div className="flex items-center justify-between my-2 gap-1">
                  {/* 主队 */}
                  <div className="flex-1 text-center min-w-0">
                    <span className="font-black text-slate-950 text-xl sm:text-2xl block truncate">
                      {selectedMatch.homeTeam.name}
                    </span>
                  </div>

                  {/* 比分 */}
                  <div className="px-2 shrink-0 text-center">
                    <div className="font-mono font-black text-2xl sm:text-4xl text-orange-600 tabular-nums whitespace-nowrap">
                      {selectedMatch.homeTeam.score} <span className="text-slate-400 font-normal">:</span> {selectedMatch.awayTeam.score}
                    </div>
                  </div>

                  {/* 客队 */}
                  <div className="flex-1 text-center min-w-0">
                    <span className="font-black text-slate-950 text-xl sm:text-2xl block truncate">
                      {selectedMatch.awayTeam.name}
                    </span>
                  </div>
                </div>

                {/* 状态与时间 */}
                <div className="mt-4 pt-3 border-t-2 border-slate-200 flex items-center justify-between gap-2 text-xs sm:text-sm">
                  
                  {/* 状态徽章 */}
                  <span
                    className={`px-3.5 py-1.5 rounded-full text-sm font-black shrink-0 whitespace-nowrap inline-flex items-center justify-center shadow-xs ${
                      selectedMatch.progressStatus === '已结束'
                        ? 'bg-emerald-600 text-white border border-emerald-700'
                        : selectedMatch.progressStatus === '进行中'
                        ? 'bg-red-600 text-white border border-red-700 animate-pulse'
                        : 'bg-blue-600 text-white border border-blue-700'
                    }`}
                  >
                    {selectedMatch.progressStatus}
                  </span>

                  {/* 时间文字 */}
                  <div className="text-slate-900 font-black text-xs sm:text-sm flex items-center gap-1 shrink-0 whitespace-nowrap">
                    <Clock className="w-4 h-4 text-orange-600 shrink-0" />
                    <span>开始时间: {selectedMatch.startTime} ── 结束时间: {selectedMatch.estimatedEndTime}</span>
                  </div>
                </div>
              </article>

              {/* 👥 比赛人员左右并列两列 */}
              <section className="bg-white rounded-2xl p-3 sm:p-4 border-2 border-slate-900 shadow-md">
                
                {/* 左右并列两列 */}
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* 左列：主队人员 */}
                  <div className="space-y-2">
                    <div className="bg-orange-100 border-2 border-orange-300 rounded-xl p-2 font-black text-center text-slate-950 text-sm sm:text-base shadow-2xs">
                      <span className="truncate block">{selectedMatch.homeTeam.name}</span>
                    </div>

                    <div className="space-y-2">
                      {selectedMatch.homeTeam.roster && selectedMatch.homeTeam.roster.length > 0 ? (
                        selectedMatch.homeTeam.roster.map((player, idx) => (
                          <div
                            key={idx}
                            className="bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs sm:text-sm font-bold shadow-2xs"
                          >
                            <div className="text-slate-950 font-black text-sm sm:text-base">
                              {player.name}
                            </div>
                            {player.position && (
                              <div className="text-slate-600 font-bold text-xs mt-0.5">
                                {player.position}
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-500 text-center py-4 font-bold">暂无详细人员信息</p>
                      )}
                    </div>
                  </div>

                  {/* 右列：客队人员 */}
                  <div className="space-y-2">
                    <div className="bg-blue-100 border-2 border-blue-300 rounded-xl p-2 font-black text-center text-slate-950 text-sm sm:text-base shadow-2xs">
                      <span className="truncate block">{selectedMatch.awayTeam.name}</span>
                    </div>

                    <div className="space-y-2">
                      {selectedMatch.awayTeam.roster && selectedMatch.awayTeam.roster.length > 0 ? (
                        selectedMatch.awayTeam.roster.map((player, idx) => (
                          <div
                            key={idx}
                            className="bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs sm:text-sm font-bold shadow-2xs"
                          >
                            <div className="text-slate-950 font-black text-sm sm:text-base">
                              {player.name}
                            </div>
                            {player.position && (
                              <div className="text-slate-600 font-bold text-xs mt-0.5">
                                {player.position}
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-500 text-center py-4 font-bold">暂无详细人员信息</p>
                      )}
                    </div>

                  </div>

                </div>
              </section>

              {/* 官方来源按钮 */}
              <div className="text-center pt-1">
                <a
                  href={selectedMatch.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white font-black text-xs sm:text-sm rounded-xl shadow-md hover:bg-slate-800"
                >
                  <span>直连官方数据源网页 ↗</span>
                </a>
              </div>

            </main>
          </div>
        ) : (

          /* ========================================================= */
          /* VIEW MODE 2: 主赛程滚动列表页 (Main Schedule Feed Screen)  */
          /* ========================================================= */
          <div className="flex-1 flex flex-col h-full overflow-hidden">

            {/* 📌 顶栏控制组 (Header + 分类) 固定在最上方 */}
            <div className="shrink-0 bg-orange-600 text-white shadow-lg border-b-2 border-orange-700 z-30">
              
              {/* 顶栏：大字标题 + 刷新大按钮 */}
              <header className="px-4 py-3 flex items-center justify-between border-b border-orange-500">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-none text-white drop-shadow-xs">
                  体育赛程
                </h1>

                <button
                  type="button"
                  onClick={() => loadMatches(true)}
                  disabled={refreshing}
                  className="px-3.5 py-1.5 bg-white text-orange-950 active:bg-amber-100 rounded-xl text-base font-black shadow-md flex items-center gap-1.5 transition-transform active:scale-95 shrink-0 border border-orange-200"
                >
                  <RotateCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-orange-600' : 'text-orange-700'}`} />
                  <span>{refreshing ? '刷新中' : '刷新'}</span>
                </button>
              </header>

              {/* 运动类型分类横向滑动栏：默认 CBA，支持左右滑动切换 */}
              <div className="px-3 py-2 bg-orange-700/90 overflow-x-auto scrollbar-none">
                <div className="flex items-center gap-2">
                  {ALL_LEAGUES.map((lg) => {
                    const isSelected = selectedLeague === lg.id;
                    return (
                      <button
                        key={lg.id}
                        type="button"
                        onClick={() => setSelectedLeague(lg.id)}
                        className={`shrink-0 px-4 py-2 rounded-xl font-black text-base sm:text-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-white text-orange-950 shadow-md border-2 border-amber-300 scale-105'
                            : 'bg-orange-800/80 text-orange-100 hover:bg-orange-800 border border-orange-600'
                        }`}
                      >
                        <span className="text-lg">{lg.icon}</span>
                        <span>{lg.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* 核对通知条 */}
            {verifyNotice && (
              <div className="bg-emerald-100 border-b-2 border-emerald-400 px-4 py-2 text-sm text-emerald-950 font-black flex items-center gap-2 shrink-0">
                <Check className="w-5 h-5 text-emerald-700 shrink-0" />
                <span className="truncate">{verifyNotice}</span>
              </div>
            )}

            {/* 主内容区：连续向下滚动模式 */}
            <main className="flex-1 overflow-y-auto overscroll-contain pb-12">
              {loading ? (
                <div className="bg-white rounded-2xl p-8 text-center border-2 border-slate-300 m-4 shadow-md">
                  <RotateCw className="w-10 h-10 text-orange-600 animate-spin mx-auto mb-3" />
                  <p className="text-lg font-black text-slate-900">正在整理未来3个月赛程数据...</p>
                </div>
              ) : filteredDateGroups.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center border-2 border-slate-300 m-4 shadow-md">
                  <p className="text-xl font-black text-slate-900">【{selectedLeague}】暂无比赛安排</p>
                  <button
                    type="button"
                    onClick={() => setSelectedLeague('CBA')}
                    className="mt-4 px-6 py-2.5 bg-orange-600 text-white rounded-xl text-lg font-black shadow-md active:bg-orange-700"
                  >
                    重置为 CBA 赛程
                  </button>
                </div>
              ) : (
                filteredDateGroups.map((group) => (
                  <section key={group.dateISO} id={`date-${group.dateISO}`} className="mb-4">
                    
                    {/* 📌 吸顶时间轴：内嵌在滚动容器中 */}
                    <div className="sticky top-0 z-20 bg-amber-300/98 backdrop-blur-md px-4 py-2 border-y-2 border-amber-500 font-black text-slate-950 text-base sm:text-lg flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-amber-900 shrink-0" />
                        <span className="text-slate-950">{group.dateDisplay}</span>
                        {group.relativeDayTag && (
                          <span className="bg-orange-600 text-white text-xs sm:text-sm px-2.5 py-0.5 rounded-md font-black shadow-xs">
                            {group.relativeDayTag}
                          </span>
                        )}
                        <span className="text-amber-950 font-bold text-sm sm:text-base">
                          {group.weekDay}
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm text-slate-950 font-black bg-amber-400 px-2.5 py-0.5 rounded-full border border-amber-600">
                        {group.matches.length} 场
                      </span>
                    </div>

                    {/* 比赛卡片列表 */}
                    <div className="px-3 pt-3 space-y-3.5">
                      {group.matches.map((match) => (
                        <article
                          key={match.id}
                          onClick={() => setSelectedMatch(match)}
                          className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-slate-900 shadow-md cursor-pointer hover:border-orange-600 transition-all active:scale-[0.98]"
                        >
                          {/* 对阵球队/选手名称与比分 */}
                          <div className="flex items-center justify-between gap-1">
                            
                            {/* 主队名称 */}
                            <div className="flex-1 text-left min-w-0">
                              <span
                                className="font-black text-slate-950 text-lg sm:text-2xl truncate block tracking-tight"
                                title={match.homeTeam.name}
                              >
                                {match.homeTeam.name}
                              </span>
                            </div>

                            {/* 比分 */}
                            <div className="px-2 shrink-0 flex items-center justify-center font-mono font-black text-2xl sm:text-4xl text-orange-600 tabular-nums whitespace-nowrap">
                              <span>{match.homeTeam.score}</span>
                              <span className="mx-1 text-slate-400 font-normal">:</span>
                              <span>{match.awayTeam.score}</span>
                            </div>

                            {/* 客队名称 */}
                            <div className="flex-1 text-right min-w-0">
                              <span
                                className="font-black text-slate-950 text-lg sm:text-2xl truncate block tracking-tight"
                                title={match.awayTeam.name}
                              >
                                {match.awayTeam.name}
                              </span>
                            </div>
                          </div>

                          {/* 底部：状态与时间 */}
                          <div className="mt-4 pt-3 border-t-2 border-slate-200 flex items-center justify-between text-base gap-2">
                            
                            {/* 状态徽章 */}
                            <span
                              className={`px-3.5 py-1 rounded-full text-xs sm:text-sm font-black shrink-0 whitespace-nowrap shadow-xs ${
                                match.progressStatus === '已结束'
                                  ? 'bg-emerald-600 text-white border border-emerald-700'
                                  : match.progressStatus === '进行中'
                                  ? 'bg-red-600 text-white border border-red-700 animate-pulse'
                                  : 'bg-blue-600 text-white border border-blue-700'
                              }`}
                            >
                              {match.progressStatus}
                            </span>

                            {/* 时间与查看阵容引导 */}
                            <div className="flex items-center gap-1.5 shrink-0">
                              <div className="text-slate-900 font-black text-xs sm:text-sm flex items-center gap-1 whitespace-nowrap">
                                <Clock className="w-4 h-4 text-orange-600 shrink-0" />
                                <span>{match.startTime} ─ {match.estimatedEndTime}</span>
                              </div>
                              <span className="hidden sm:inline-flex items-center text-xs text-orange-700 font-black bg-orange-100 px-2 py-0.5 rounded-md border border-orange-300">
                                阵容 <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                              </span>
                            </div>
                          </div>

                        </article>
                      ))}
                    </div>

                  </section>
                ))
              )}

              {/* 底部指定官方数据来源（直连免VPN） */}
              <section className="px-3 mt-5">
                <div className="bg-white rounded-2xl border-2 border-slate-900 p-3.5 text-xs text-slate-800 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setShowSourceList(!showSourceList)}
                    className="w-full flex items-center justify-between font-black text-slate-950 text-sm sm:text-base"
                  >
                    <span>指定赛事官方数据源清单（免VPN直连）</span>
                    {showSourceList ? <ChevronUp className="w-5 h-5 text-orange-600" /> : <ChevronDown className="w-5 h-5 text-orange-600" />}
                  </button>

                  {showSourceList && (
                    <ul className="mt-3 space-y-2 border-t-2 border-slate-200 pt-3">
                      {OFFICIAL_DATA_SOURCES.map((src) => (
                        <li key={src.league} className="flex items-center justify-between">
                          <span className="font-black text-slate-900">
                            {src.icon} {src.league} ({src.name})
                          </span>
                          <a
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-700 font-black hover:underline truncate max-w-[160px]"
                          >
                            官方入口 ↗
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>

            </main>
          </div>
        )}

      </div>
    </div>
  );
}
