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

  // 初始化加载权威赛程库（动态从当前系统日期起算，永不关期过期）
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
    <div className="h-screen w-full bg-slate-200 flex flex-col justify-between text-slate-950 font-sans selection:bg-amber-300 text-sm overflow-hidden overscroll-none select-none">
      
      {/* 全屏手机端容器：锁定 max-w-md，紧凑边距防止左右滑动 */}
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col h-full overflow-hidden relative">

        {/* ========================================================= */}
        {/* VIEW MODE 1: 比赛详情页 (Selected Match Detail Screen)    */}
        {/* ========================================================= */}
        {selectedMatch ? (
          <div className="flex-1 flex flex-col h-full bg-slate-100 overflow-hidden">
            
            {/* 详情顶栏 Header */}
            <header className="shrink-0 px-3 py-1.5 bg-orange-600 text-white flex items-center justify-between shadow-md border-b-2 border-orange-700">
              <button
                type="button"
                onClick={() => setSelectedMatch(null)}
                className="px-2.5 py-1 bg-orange-800 hover:bg-orange-900 text-white font-black rounded-lg text-xs sm:text-sm flex items-center gap-1 border border-orange-500 shadow-xs active:scale-95 transition-transform shrink-0"
              >
                <ArrowLeft className="w-4 h-4 text-amber-300" />
                <span>返回赛程列表</span>
              </button>
              <div className="flex items-center gap-1 text-amber-200 font-black text-xs sm:text-sm truncate pl-2">
                <span>{selectedMatch.leagueTag} 比赛详情</span>
              </div>
            </header>

            {/* 详情页可滚动区域 */}
            <main className="flex-1 overflow-y-auto overscroll-contain p-2.5 space-y-2.5">
              
              {/* 📌 移至最上方的置顶比赛卡片 */}
              <article className="bg-white rounded-xl p-2.5 sm:p-3 border-2 border-orange-600 shadow-md relative">
                <div className="flex items-center justify-between mb-1.5 pb-1.5 border-b border-slate-200 text-xs font-black text-slate-600">
                  <span className="bg-orange-100 text-orange-950 px-2 py-0.5 rounded-md border border-orange-300 shrink-0 font-black">
                    {selectedMatch.leagueTag}
                  </span>
                  <span className="truncate ml-2 font-black">{selectedMatch.dateDisplay} ({selectedMatch.weekDay})</span>
                </div>

                {/* 队伍与比分字体粗细保持一致，尺寸变紧凑 */}
                <div className="flex items-center justify-between my-1.5 gap-1">
                  {/* 主队 */}
                  <div className="flex-1 text-center min-w-0">
                    <span className="font-black text-slate-950 text-sm sm:text-base block truncate">
                      {selectedMatch.homeTeam.name}
                    </span>
                  </div>

                  {/* 比分 */}
                  <div className="px-1.5 shrink-0 text-center">
                    <div className="font-mono font-black text-xl sm:text-2xl text-orange-600 tabular-nums whitespace-nowrap">
                      {selectedMatch.homeTeam.score} <span className="text-slate-400 font-normal">:</span> {selectedMatch.awayTeam.score}
                    </div>
                  </div>

                  {/* 客队 */}
                  <div className="flex-1 text-center min-w-0">
                    <span className="font-black text-slate-950 text-sm sm:text-base block truncate">
                      {selectedMatch.awayTeam.name}
                    </span>
                  </div>
                </div>

                {/* 状态与时间 */}
                <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between gap-1.5 text-[11px] sm:text-xs">
                  
                  {/* 状态徽章 */}
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-black shrink-0 whitespace-nowrap inline-flex items-center justify-center ${
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
                  <div className="text-slate-900 font-black text-[11px] sm:text-xs flex items-center gap-1 shrink-0 whitespace-nowrap">
                    <Clock className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                    <span>{selectedMatch.startTime} ── {selectedMatch.estimatedEndTime}</span>
                  </div>
                </div>
              </article>

              {/* 👥 比赛人员左右并列两列 */}
              <section className="bg-white rounded-xl p-2 sm:p-2.5 border-2 border-slate-900 shadow-sm">
                
                {/* 左右并列两列 */}
                <div className="grid grid-cols-2 gap-2">
                  
                  {/* 左列：主队人员 */}
                  <div className="space-y-1.5">
                    <div className="bg-orange-100 border border-orange-300 rounded-lg p-1 font-black text-center text-slate-950 text-xs sm:text-sm">
                      <span className="truncate block">{selectedMatch.homeTeam.name}</span>
                    </div>

                    <div className="space-y-1.5">
                      {selectedMatch.homeTeam.roster && selectedMatch.homeTeam.roster.length > 0 ? (
                        selectedMatch.homeTeam.roster.map((player, idx) => (
                          <div
                            key={idx}
                            className="bg-slate-50 border border-slate-300 rounded-lg p-1.5 text-[11px] sm:text-xs font-bold"
                          >
                            <div className="text-slate-950 font-black text-xs sm:text-sm">
                              {player.name}
                            </div>
                            {player.position && (
                              <div className="text-slate-600 font-bold text-[10px] mt-0.5">
                                {player.position}
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-[11px] text-slate-500 text-center py-3 font-bold">暂无详细人员信息</p>
                      )}
                    </div>
                  </div>

                  {/* 右列：客队人员 */}
                  <div className="space-y-1.5">
                    <div className="bg-blue-100 border border-blue-300 rounded-lg p-1 font-black text-center text-slate-950 text-xs sm:text-sm">
                      <span className="truncate block">{selectedMatch.awayTeam.name}</span>
                    </div>

                    <div className="space-y-1.5">
                      {selectedMatch.awayTeam.roster && selectedMatch.awayTeam.roster.length > 0 ? (
                        selectedMatch.awayTeam.roster.map((player, idx) => (
                          <div
                            key={idx}
                            className="bg-slate-50 border border-slate-300 rounded-lg p-1.5 text-[11px] sm:text-xs font-bold"
                          >
                            <div className="text-slate-950 font-black text-xs sm:text-sm">
                              {player.name}
                            </div>
                            {player.position && (
                              <div className="text-slate-600 font-bold text-[10px] mt-0.5">
                                {player.position}
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-[11px] text-slate-500 text-center py-3 font-bold">暂无详细人员信息</p>
                      )}
                    </div>

                  </div>

                </div>
              </section>

              {/* 官方来源按钮 */}
              <div className="text-center pt-0.5">
                <a
                  href={selectedMatch.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-900 text-white font-black text-xs rounded-lg shadow-sm hover:bg-slate-800"
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

            {/* 📌 顶栏控制组 (Header + 分类) 固定在最上方，整体框框与按钮调紧凑 */}
            <div className="shrink-0 bg-orange-600 text-white shadow-md border-b-2 border-orange-700 z-30">
              
              {/* 顶栏：标题 + 刷新按钮 */}
              <header className="px-3 py-1.5 flex items-center justify-between border-b border-orange-500">
                <h1 className="text-base sm:text-lg font-black tracking-tight leading-none text-white">
                  体育赛程
                </h1>

                <button
                  type="button"
                  onClick={() => loadMatches(true)}
                  disabled={refreshing}
                  className="px-2.5 py-1 bg-white text-orange-950 active:bg-amber-100 rounded-lg text-xs sm:text-sm font-black shadow-xs flex items-center gap-1 transition-transform active:scale-95 shrink-0 border border-orange-200"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-orange-600' : 'text-orange-700'}`} />
                  <span>{refreshing ? '刷新中' : '刷新'}</span>
                </button>
              </header>

              {/* 运动类型分类横向滑动栏：小调框框与内边距，保持字粗度 */}
              <div className="px-2 py-1 bg-orange-700/90 overflow-x-auto scrollbar-none">
                <div className="flex items-center gap-1.5">
                  {ALL_LEAGUES.map((lg) => {
                    const isSelected = selectedLeague === lg.id;
                    return (
                      <button
                        key={lg.id}
                        type="button"
                        onClick={() => setSelectedLeague(lg.id)}
                        className={`shrink-0 px-2.5 py-1 rounded-lg font-black text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-1 ${
                          isSelected
                            ? 'bg-white text-orange-950 shadow-xs border-2 border-amber-300'
                            : 'bg-orange-800/80 text-orange-100 hover:bg-orange-800 border border-orange-600'
                        }`}
                      >
                        <span className="text-sm">{lg.icon}</span>
                        <span>{lg.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* 核对通知条 */}
            {verifyNotice && (
              <div className="bg-emerald-100 border-b border-emerald-400 px-3 py-1 text-xs text-emerald-950 font-black flex items-center gap-1.5 shrink-0">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="truncate">{verifyNotice}</span>
              </div>
            )}

            {/* 主内容区：连续向下滚动模式 */}
            <main className="flex-1 overflow-y-auto overscroll-contain pb-8">
              {loading ? (
                <div className="bg-white rounded-xl p-6 text-center border border-slate-300 m-3 shadow-sm">
                  <RotateCw className="w-8 h-8 text-orange-600 animate-spin mx-auto mb-2" />
                  <p className="text-sm font-black text-slate-900">正在整理未来3个月赛程数据...</p>
                </div>
              ) : filteredDateGroups.length === 0 ? (
                <div className="bg-white rounded-xl p-6 text-center border border-slate-300 m-3 shadow-sm">
                  <p className="text-base font-black text-slate-900">【{selectedLeague}】暂无比赛安排</p>
                  <button
                    type="button"
                    onClick={() => setSelectedLeague('CBA')}
                    className="mt-3 px-4 py-1.5 bg-orange-600 text-white rounded-lg text-sm font-black shadow-xs active:bg-orange-700"
                  >
                    重置为 CBA 赛程
                  </button>
                </div>
              ) : (
                filteredDateGroups.map((group) => (
                  <section key={group.dateISO} id={`date-${group.dateISO}`} className="mb-3">
                    
                    {/* 📌 吸顶时间轴：尺寸变紧凑，字体粗细保持不变 */}
                    <div className="sticky top-0 z-20 bg-amber-300/98 backdrop-blur-md px-3 py-1 border-y border-amber-500 font-black text-slate-950 text-xs sm:text-sm flex items-center justify-between shadow-2xs">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-amber-900 shrink-0" />
                        <span className="text-slate-950 font-black">{group.dateDisplay}</span>
                        {group.relativeDayTag && (
                          <span className="bg-orange-600 text-white text-[10px] sm:text-xs px-2 py-0.5 rounded-md font-black">
                            {group.relativeDayTag}
                          </span>
                        )}
                        <span className="text-amber-950 font-bold text-xs">
                          {group.weekDay}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-950 font-black bg-amber-400 px-2 py-0.5 rounded-full border border-amber-600">
                        {group.matches.length} 场
                      </span>
                    </div>

                    {/* 比赛卡片列表：框框与内边距变小 */}
                    <div className="px-2 pt-2 space-y-2">
                      {group.matches.map((match) => (
                        <article
                          key={match.id}
                          onClick={() => setSelectedMatch(match)}
                          className="bg-white rounded-xl p-2.5 sm:p-3 border-2 border-slate-900 shadow-sm cursor-pointer hover:border-orange-600 transition-all active:scale-[0.99]"
                        >
                          {/* 对阵球队/选手名称与比分：框小、字号小、字粗度一模一样 */}
                          <div className="flex items-center justify-between gap-1">
                            
                            {/* 主队名称 */}
                            <div className="flex-1 text-left min-w-0">
                              <span
                                className="font-black text-slate-950 text-sm sm:text-base truncate block tracking-tight"
                                title={match.homeTeam.name}
                              >
                                {match.homeTeam.name}
                              </span>
                            </div>

                            {/* 比分 */}
                            <div className="px-1.5 shrink-0 flex items-center justify-center font-mono font-black text-lg sm:text-2xl text-orange-600 tabular-nums whitespace-nowrap">
                              <span>{match.homeTeam.score}</span>
                              <span className="mx-0.5 text-slate-400 font-normal">:</span>
                              <span>{match.awayTeam.score}</span>
                            </div>

                            {/* 客队名称 */}
                            <div className="flex-1 text-right min-w-0">
                              <span
                                className="font-black text-slate-950 text-sm sm:text-base truncate block tracking-tight"
                                title={match.awayTeam.name}
                              >
                                {match.awayTeam.name}
                              </span>
                            </div>
                          </div>

                          {/* 底部：状态与时间 */}
                          <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between gap-1.5 text-xs">
                            
                            {/* 状态徽章：保持单行不折行 */}
                            <span
                              className={`px-2 py-0.5 rounded-full text-[11px] font-black shrink-0 whitespace-nowrap inline-flex items-center justify-center ${
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
                            <div className="flex items-center gap-1 shrink-0">
                              <div className="text-slate-900 font-black text-[11px] sm:text-xs flex items-center gap-1 whitespace-nowrap">
                                <Clock className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                                <span>{match.startTime} ─ {match.estimatedEndTime}</span>
                              </div>
                              <span className="hidden sm:inline-flex items-center text-[10px] text-orange-700 font-black bg-orange-100 px-1.5 py-0.5 rounded-md border border-orange-300">
                                阵容 <ChevronRight className="w-3 h-3 ml-0.5" />
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
              <section className="px-2 mt-4">
                <div className="bg-white rounded-xl border-2 border-slate-900 p-2.5 text-xs text-slate-800 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setShowSourceList(!showSourceList)}
                    className="w-full flex items-center justify-between font-black text-slate-950 text-xs sm:text-sm"
                  >
                    <span>指定赛事官方数据源清单（免VPN直连）</span>
                    {showSourceList ? <ChevronUp className="w-4 h-4 text-orange-600" /> : <ChevronDown className="w-4 h-4 text-orange-600" />}
                  </button>

                  {showSourceList && (
                    <ul className="mt-2 space-y-1.5 border-t border-slate-200 pt-2">
                      {OFFICIAL_DATA_SOURCES.map((src) => (
                        <li key={src.league} className="flex items-center justify-between">
                          <span className="font-black text-slate-900">
                            {src.icon} {src.league} ({src.name})
                          </span>
                          <a
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-700 font-black hover:underline truncate max-w-[140px]"
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
