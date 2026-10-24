import { useState } from 'react'
import { CAMPUS_SCHEDULE, METRO_LINES, TRAVEL_NOTES } from '../data/schedule'
import {
  addDays,
  atTime,
  countdownParts,
  findNextDeparture,
  formatClock,
  isPastTimeToday,
  isWeekend,
  relativeDayLabel,
  startOfDay,
} from '../lib/time'
import { Sparkle, StarDoodle } from './Doodles'
import SectionHeading from './SectionHeading'

const TABS = [
  { id: 'campus', emoji: '🚌', label: '海淀-丰台 跨校区班车' },
  { id: 'metro', emoji: '🚇', label: '地铁站接驳车 / 公交' },
]

function getNextCampusDeparture(direction, now) {
  for (let offset = 0; offset < 21; offset += 1) {
    const day = addDays(startOfDay(now), offset)
    const mode = isWeekend(day) ? 'weekend' : 'weekday'
    for (const item of CAMPUS_SCHEDULE[mode][direction]) {
      const target = atTime(day, item.time)
      if (target.getTime() > now.getTime()) {
        return { ...item, target, mode, dayOffset: offset }
      }
    }
  }
  return null
}

function SegButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-[11px] font-bold transition sm:text-xs ${
        active
          ? 'border-ink bg-butter text-ink shadow-[2px_3px_0_rgba(51,70,160,0.22)]'
          : 'border-ink/20 bg-white/60 text-ink/60 hover:border-ink/45 hover:bg-white'
      }`}
    >
      {children}
    </button>
  )
}

function CampusTimeChip({ item, isNext, isPast }) {
  return (
    <li
      aria-label={`${item.time} ${item.type}班次${isNext ? '，下一班' : ''}`}
      className={`relative flex flex-col items-center justify-center rounded-xl border-2 px-1 py-2 transition ${
        isNext
          ? '-rotate-2 border-ink bg-butter shadow-[2px_3px_0_#3346a0]'
          : isPast
            ? 'border-ink/15 bg-white/60 text-ink/45'
            : 'border-ink/25 bg-white text-ink'
      }`}
    >
      <span className="font-chunky text-[15px] leading-none tabular-nums">{item.time}</span>
      <span
        className={`mt-1 text-[9px] font-bold ${isNext ? 'text-ink' : 'text-ink/45'}`}
      >
        {item.type}
      </span>
      {item.isNew ? (
        <span className="absolute -right-1.5 -top-2 rounded-full border border-ink bg-pinkie-deep px-1 text-[8px] font-bold text-white">
          新
        </span>
      ) : null}
    </li>
  )
}

function MetroTimePill({ time, isNext, isPast }) {
  return (
    <li
      aria-label={`${time}${isNext ? '，下一班' : ''}`}
      className={`rounded-lg border-2 px-2 py-1.5 text-center font-chunky text-[13px] leading-none tabular-nums ${
        isNext
          ? 'border-ink bg-butter shadow-[2px_2px_0_#3346a0]'
          : isPast
            ? 'border-ink/15 bg-white/60 text-ink/45'
            : 'border-ink/20 bg-white text-ink'
      }`}
    >
      {time}
    </li>
  )
}

function CampusTable({ title, items, next, now }) {
  const nextIsToday = next?.dayOffset === 0

  return (
    <div className="rounded-2xl border-2 border-ink/20 bg-white p-3.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="font-doodle text-base">{title}</h4>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
            nextIsToday ? 'bg-butter text-ink' : 'bg-ink/5 text-ink/45'
          }`}
        >
          {nextIsToday ? `下一班 ${next.time}` : '今日已收车'}
        </span>
      </div>
      <ul className="mt-4 grid grid-cols-3 gap-x-2 gap-y-4 sm:grid-cols-4">
        {items.map((item) => (
          <CampusTimeChip
            key={item.time}
            item={item}
            isNext={nextIsToday && next.time === item.time}
            isPast={isPastTimeToday(item.time, now)}
          />
        ))}
      </ul>
    </div>
  )
}

function MetroLineTable({ line, now }) {
  const next = findNextDeparture(line.fromCampus, isWeekend, now)
  const nextIsToday = next?.dayOffset === 0

  return (
    <div className="rounded-2xl border-2 border-ink/20 bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="flex items-center gap-2 font-doodle text-base">
          {line.name}
          <span className="rounded-full bg-babyblue px-2 py-0.5 font-body text-[10px] font-bold text-ink/55">
            {line.metroLine}
          </span>
        </h4>
        <span className="inline-flex items-center gap-1 rounded-full border-2 border-ink bg-butter px-2 py-0.5 text-[11px] font-bold">
          单程 ¥{line.price}
        </span>
      </div>

      <div className="mt-2 grid gap-1 text-[11px] leading-relaxed text-ink/60 sm:grid-cols-2 sm:gap-3">
        <p>📍 校内上车：{line.campusStop}</p>
        <p>📍 地铁上车：{line.metroStop}</p>
      </div>

      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 flex items-center justify-between text-[10px] font-bold text-ink/55">
            丰台校区 → 地铁站
            {nextIsToday ? <span className="text-ink">下一班 {next.time}</span> : null}
          </p>
          <ul className="grid grid-cols-4 gap-1.5">
            {line.fromCampus.map((time) => (
              <MetroTimePill
                key={time}
                time={time}
                isNext={nextIsToday && next.time === time}
                isPast={isPastTimeToday(time, now)}
              />
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-[10px] font-bold text-ink/55">地铁站 → 丰台校区</p>
          <ul className="grid grid-cols-4 gap-1.5">
            {line.fromMetro.map((time) => (
              <MetroTimePill
                key={time}
                time={time}
                isPast={isPastTimeToday(time, now)}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function ScheduleBoard({ now }) {
  const [tab, setTab] = useState('campus')
  const [campusDirection, setCampusDirection] = useState('toHaidian')
  const [metroLineId, setMetroLineId] = useState(METRO_LINES[0].id)
  const [expanded, setExpanded] = useState(false)

  const weekend = isWeekend(now)
  const scheduleMode = weekend ? 'weekend' : 'weekday'
  const campusTable = CAMPUS_SCHEDULE[scheduleMode]
  const selectedLine = METRO_LINES.find((line) => line.id === metroLineId) ?? METRO_LINES[0]

  const campusNext = getNextCampusDeparture(campusDirection, now)
  const metroNext = findNextDeparture(selectedLine.fromCampus, isWeekend, now)
  const next = tab === 'campus' ? campusNext : metroNext

  const cd = next ? countdownParts(next.target, now) : null
  const clockText = cd
    ? `${String(cd.hours).padStart(2, '0')}:${String(cd.minutes).padStart(2, '0')}:${String(
        cd.seconds,
      ).padStart(2, '0')}`
    : '--:--:--'

  const nextDayLabel = next ? relativeDayLabel(next.target, now) : ''

  const originLabel =
    tab === 'campus'
      ? campusDirection === 'toHaidian'
        ? '丰台校区出发'
        : '海淀校区出发'
      : '丰台校区出发'

  const destinationLabel =
    tab === 'campus'
      ? campusDirection === 'toHaidian'
        ? '海淀校区'
        : '丰台校区'
      : `${selectedLine.metroLine} · ${selectedLine.name}`

  const nextTag =
    tab === 'campus'
      ? campusNext
        ? CAMPUS_SCHEDULE[campusNext.mode].name
        : '暂无班次'
      : weekend
        ? '周末接驳车'
        : '周末才发车'

  const panelTone = tab === 'campus' ? 'bg-babyblue' : 'bg-[#EAFBF4]'

  return (
    <section id="schedule" aria-labelledby="schedule-heading" className="scroll-mt-6">
      <SectionHeading
        num="01"
        kicker="BUS RADAR"
        title="校车雷达 · 实时时刻表"
        titleId="schedule-heading"
        note="实时刷新 · 自动倒计时"
      />
      <div className="relative">
        <span
          className="tape absolute -top-2.5 left-8 z-10 h-6 w-20 -rotate-3"
          style={{ '--tape': '#FFB7CF' }}
          aria-hidden="true"
        />
        <div className="relative overflow-hidden rounded-[28px] border-[3px] border-ink bg-cream p-4 shadow-[7px_8px_0_rgba(51,70,160,0.17)] sm:p-6">
          <StarDoodle
            className="pointer-events-none absolute -right-5 -top-6 w-24 rotate-12 opacity-20"
            fill="#FFE9A8"
          />
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <p className="flex items-center gap-2 text-[11px] font-bold text-ink/55">
              <span className="live-dot" />
              实时刷新 · {formatClock(now)}
            </p>
            <p className="rounded-full bg-[#FFF7CC] px-2.5 py-1 text-[10px] font-bold text-ink/70">
              🚌 周末破结界的第一站
            </p>
          </div>

          <div
            role="tablist"
            aria-label="校内交通方式"
            className="grid grid-cols-2 gap-2 sm:gap-3"
          >
            {TABS.map((item) => {
              const active = tab === item.id
              return (
                <button
                  key={item.id}
                  id={`schedule-tab-${item.id}`}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  aria-controls="schedule-panel"
                  tabIndex={active ? 0 : -1}
                  onClick={() => {
                    setTab(item.id)
                    setExpanded(false)
                  }}
                  onKeyDown={(event) => {
                    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
                    event.preventDefault()
                    const targetId = item.id === 'campus' ? 'metro' : 'campus'
                    setTab(targetId)
                    document.getElementById(`schedule-tab-${targetId}`)?.focus()
                  }}
                  className={`flex items-center justify-center gap-2 rounded-2xl border-[3px] px-2 py-3 text-left transition sm:px-4 ${
                    active
                      ? '-rotate-1 border-ink bg-pinkie shadow-[4px_5px_0_#3346a0]'
                      : 'border-ink/25 bg-white/65 text-ink/55 hover:border-ink/45 hover:bg-white'
                  }`}
                >
                  <span className="text-xl sm:text-2xl" aria-hidden="true">
                    {item.emoji}
                  </span>
                  <span className="font-doodle text-[13px] leading-tight sm:text-base">
                    {item.label}
                  </span>
                </button>
              )
            })}
          </div>

          <div
            id="schedule-panel"
            role="tabpanel"
            aria-labelledby={`schedule-tab-${tab}`}
            className="mt-4 animate-slide-down"
            key={tab}
          >
            <div
              className={`relative overflow-hidden rounded-[24px] border-[3px] border-ink ${panelTone} p-4 sm:p-5`}
            >
              <div
                className="pointer-events-none absolute -right-10 -top-14 h-40 w-40 rounded-full bg-white/40"
                aria-hidden="true"
              />
              <StarDoodle
                className="pointer-events-none absolute -bottom-5 right-8 w-20 rotate-12 opacity-25"
                fill="#FFFDF8"
              />

              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold sm:text-[11px]">
                    <span className="rounded-full bg-white/75 px-2 py-1">下一班 · {originLabel}</span>
                    <span className="rounded-full bg-ink px-2 py-1 text-white">{nextTag}</span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-end gap-2">
                    <p className="font-chunky text-[clamp(3.5rem,9vw,5.2rem)] leading-[0.85] tabular-nums">
                      {next?.time ?? '--:--'}
                    </p>
                    <span className="mb-1.5 rounded-full border-2 border-ink bg-cream px-2.5 py-1 text-[11px] font-bold">
                      {next ? nextDayLabel : '暂无班次'}
                    </span>
                  </div>

                  <p className="mt-2 text-xs font-bold text-ink/65 sm:text-sm">
                    开往 {destinationLabel}
                    {tab === 'campus' && campusNext ? ` · ${campusNext.type}班次` : ''}
                  </p>
                </div>

                <div className="shrink-0 rounded-2xl border-[3px] border-ink bg-cream px-4 py-3 shadow-[4px_5px_0_#3346a0] sm:min-w-[205px]">
                  <p className="text-[9px] font-bold tracking-[0.22em] text-ink/45">
                    COUNTDOWN · 距离发车
                  </p>
                  {cd && cd.days > 0 ? (
                    <div className="mt-1 flex items-end gap-1">
                      <span className="font-chunky text-3xl leading-none">{cd.days}</span>
                      <span className="mb-1 text-xs font-bold">天</span>
                      <span className="font-chunky text-xl leading-none tabular-nums">{clockText}</span>
                    </div>
                  ) : (
                    <p className="mt-1 font-chunky text-[clamp(1.55rem,4vw,2rem)] leading-none tabular-nums">
                      {clockText}
                    </p>
                  )}
                  <p className="mt-1.5 text-[10px] text-ink/45">每秒刷新 · 仅供参考</p>
                </div>
              </div>

              <div className="relative mt-4 flex flex-wrap items-center gap-1.5 border-t-2 border-dashed border-ink/15 pt-3 text-[10px] font-bold text-ink/60 sm:text-[11px]">
                <span className="rounded-full bg-white/70 px-2 py-1">
                  🗓 {tab === 'campus' ? campusTable.days : '周六、周日及法定节假日'}
                </span>
                <span className="rounded-full bg-white/70 px-2 py-1">
                  🎫 {tab === 'campus' ? '校园卡乘车 · 免费' : `单程 ¥${selectedLine.price}`}
                </span>
                <span className="rounded-full bg-white/70 px-2 py-1">
                  ⏱ {tab === 'campus' ? '单程约 45–60 分钟' : selectedLine.ride}
                </span>
                {tab === 'metro' ? (
                  <span className="rounded-full bg-white/70 px-2 py-1">📱 民大通提前预约</span>
                ) : null}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {tab === 'campus' ? (
                <>
                  <span className="text-[10px] font-bold tracking-widest text-ink/40">方向</span>
                  <SegButton
                    active={campusDirection === 'toHaidian'}
                    onClick={() => setCampusDirection('toHaidian')}
                  >
                    丰台 → 海淀
                  </SegButton>
                  <SegButton
                    active={campusDirection === 'toFengtai'}
                    onClick={() => setCampusDirection('toFengtai')}
                  >
                    海淀 → 丰台
                  </SegButton>
                </>
              ) : (
                <>
                  <span className="text-[10px] font-bold tracking-widest text-ink/40">线路</span>
                  {METRO_LINES.map((line) => (
                    <SegButton
                      key={line.id}
                      active={metroLineId === line.id}
                      onClick={() => setMetroLineId(line.id)}
                    >
                      {line.name}
                      <span className="text-[10px] font-bold text-ink/45">¥{line.price}</span>
                    </SegButton>
                  ))}
                </>
              )}
            </div>

            {tab === 'metro' && !weekend ? (
              <div className="mt-3 flex items-start gap-2 rounded-2xl border-2 border-dashed border-ink/25 bg-white/70 px-3 py-2.5 text-[11px] leading-relaxed text-ink/70">
                <span className="text-base" aria-hidden="true">
                  💤
                </span>
                <p>
                  今天是工作日，地铁接驳车休息中。上面显示的是
                  <strong className="text-ink"> {next ? relativeDayLabel(next.target, now) : '下个周末'} </strong>
                  的下一班车；周末班次记得周五 09:00 在「民大通」抢预约。
                </p>
              </div>
            ) : null}

            {tab === 'campus' && campusNext && campusNext.mode !== scheduleMode ? (
              <p className="mt-3 rounded-2xl border-2 border-dashed border-ink/20 bg-white/60 px-3 py-2 text-[11px] font-bold text-ink/60">
                今天的班次已收车，下一班按「{CAMPUS_SCHEDULE[campusNext.mode].name}」运行。
              </p>
            ) : null}

            <div className="mt-4">
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls="full-schedule"
                onClick={() => setExpanded((value) => !value)}
                className="flex w-full items-center justify-between gap-3 rounded-2xl border-2 border-dashed border-ink/30 bg-white/60 px-4 py-2.5 text-left text-xs font-bold text-ink/75 transition hover:border-ink/50 hover:bg-white sm:text-sm"
              >
                <span>📖 {expanded ? '收起完整时刻表' : '展开完整时刻表'}</span>
                <svg
                  viewBox="0 0 20 20"
                  className={`h-4 w-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 7.5L10 13.5L16 7.5"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {expanded ? (
                <div id="full-schedule" className="mt-3 animate-slide-down">
                  {tab === 'campus' ? (
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                        <p className="font-doodle text-sm">
                          今天运行：{campusTable.days}
                        </p>
                        <span className="rounded-full bg-babyblue px-2 py-1 text-[10px] font-bold">
                          {campusTable.name}
                        </span>
                      </div>
                      <div className="grid gap-3 md:grid-cols-2">
                        <CampusTable
                          title="丰台校区 → 海淀校区"
                          items={campusTable.toHaidian}
                          next={getNextCampusDeparture('toHaidian', now)}
                          now={now}
                        />
                        <CampusTable
                          title="海淀校区 → 丰台校区"
                          items={campusTable.toFengtai}
                          next={getNextCampusDeparture('toFengtai', now)}
                          now={now}
                        />
                      </div>
                      <p className="rounded-xl border-2 border-dashed border-ink/20 bg-[#FFF8DD] px-3 py-2.5 text-[11px] leading-relaxed text-ink/70">
                        💡 {TRAVEL_NOTES.campus}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                        <p className="font-doodle text-sm">周末接驳 · 两条线路</p>
                        <span className="rounded-full bg-[#EAFBF4] px-2 py-1 text-[10px] font-bold">
                          单程 ¥3 / ¥5
                        </span>
                      </div>
                      {METRO_LINES.map((line) => (
                        <MetroLineTable key={line.id} line={line} now={now} />
                      ))}
                      <p className="rounded-xl border-2 border-dashed border-ink/20 bg-[#FFF8DD] px-3 py-2.5 text-[11px] leading-relaxed text-ink/70">
                        💡 {TRAVEL_NOTES.metro}
                      </p>
                    </div>
                  )}
                  <p className="mt-3 px-1 text-[10px] leading-relaxed text-ink/40">
                    {TRAVEL_NOTES.source}
                  </p>
                </div>
              ) : null}
            </div>

            <p className="sr-only" aria-live="polite">
              {next
                ? `下一班 ${nextDayLabel} ${next.time}，开往 ${destinationLabel}`
                : '当前没有可用的班次'}
            </p>
          </div>

          <Sparkle
            className="pointer-events-none absolute bottom-5 left-3 w-5 opacity-30"
            fill="#FF8FB4"
          />
        </div>
      </div>
    </section>
  )
}
