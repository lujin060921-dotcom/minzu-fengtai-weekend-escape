export const WEEKDAY_NAMES = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

export function isWeekend(date) {
  const day = date.getDay()
  return day === 0 || day === 6
}

export function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function addDays(date, amount) {
  const next = new Date(date)
  next.setDate(next.getDate() + amount)
  return next
}

export function atTime(day, timeString) {
  const [hours, minutes] = timeString.split(':').map(Number)
  return new Date(day.getFullYear(), day.getMonth(), day.getDate(), hours, minutes, 0, 0)
}

/**
 * 在给定的时间列表里，找到下一个满足运营日条件的班次。
 * shouldRun(day) 用来判断某一天是否发车（例如接驳车只在周末开）。
 */
export function findNextDeparture(times, shouldRun, now = new Date(), maxDays = 21) {
  const sorted = [...times].sort()
  for (let offset = 0; offset < maxDays; offset += 1) {
    const day = addDays(startOfDay(now), offset)
    if (!shouldRun(day)) continue
    for (const time of sorted) {
      const target = atTime(day, time)
      if (target.getTime() > now.getTime()) {
        return { time, target, dayOffset: offset }
      }
    }
  }
  return null
}

export function countdownParts(target, now = new Date()) {
  const diff = Math.max(0, target.getTime() - now.getTime())
  const totalSeconds = Math.floor(diff / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

const pad = (value) => String(value).padStart(2, '0')

export function countdownText(target, now = new Date()) {
  const { days, hours, minutes, seconds } = countdownParts(target, now)
  const clock = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
  return days > 0 ? `${days} 天 ${clock}` : clock
}

export function relativeDayLabel(target, now = new Date()) {
  const diff = Math.round(
    (startOfDay(target).getTime() - startOfDay(now).getTime()) / 86400000,
  )
  if (diff === 0) return '今天'
  if (diff === 1) return '明天'
  if (diff === 2) return '后天'
  return `${WEEKDAY_NAMES[target.getDay()]} ${target.getMonth() + 1}.${target.getDate()}`
}

export function formatClock(date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

export function formatDateCN(date) {
  return `${date.getMonth() + 1} 月 ${date.getDate()} 日 · ${WEEKDAY_NAMES[date.getDay()]}`
}

export function isPastTimeToday(timeString, now) {
  return atTime(startOfDay(now), timeString).getTime() <= now.getTime()
}
