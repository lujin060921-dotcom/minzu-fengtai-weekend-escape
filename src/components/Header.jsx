import { formatClock, formatDateCN } from '../lib/time'
import { BusMascot, HeartDoodle, Sparkle, StarDoodle } from './Doodles'

const infoChips = [
  { icon: '🚏', label: '丰台出发' },
  { icon: '🎲', label: '8 条随机路线' },
  { icon: '⏱', label: '实时倒计时' },
]

export default function Header({ now }) {
  return (
    <header className="relative pt-3 sm:pt-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex -rotate-1 items-center gap-1.5 rounded-full border-2 border-ink bg-cream px-3 py-1 text-[11px] font-bold shadow-[2px_3px_0_rgba(51,70,160,0.16)] sm:text-xs">
          🐻 中央民族大学 · 丰台校区
        </span>
        <span className="inline-flex rotate-1 items-center gap-1.5 rounded-full border-2 border-ink bg-babyblue px-3 py-1 text-[11px] font-bold shadow-[2px_3px_0_rgba(51,70,160,0.16)] sm:text-xs">
          📍 北京 · 丰台王佐
        </span>
        <span className="ml-auto hidden items-center gap-1.5 rounded-full bg-white/50 px-3 py-1 text-xs font-bold text-ink/60 backdrop-blur-sm md:inline-flex">
          <span className="live-dot" />
          {formatDateCN(now)} · {formatClock(now)}
        </span>
      </div>

      <div className="mt-6 grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
        <div className="relative">
          <h1 className="sticker-title font-puffy pb-3 text-[clamp(2.6rem,6.4vw,4.6rem)] leading-[1.34] sm:leading-[1.26]">
            <span className="block whitespace-nowrap">
              民大丰台<span className="text-butter">·</span>周末
            </span>
            <span className="block whitespace-nowrap">
              出逃指南
              <span className="ml-1 inline-block -rotate-6 align-middle text-[0.72em]">🚀</span>
            </span>
          </h1>

          <p className="mt-5 inline-flex -rotate-[0.6deg] items-center gap-2 rounded-full border-[3px] border-ink bg-cream px-4 py-2 text-sm font-bold shadow-[0_5px_0_#ffb7cf] sm:text-base">
            搞定接驳车，轻松破结界！
            <span className="text-lg">🧸</span>
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {infoChips.map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-1 rounded-full border-2 border-ink/20 bg-white/55 px-2.5 py-1 text-[11px] font-bold text-ink/65 backdrop-blur-sm sm:text-xs"
              >
                <span aria-hidden="true">{chip.icon}</span>
                {chip.label}
              </span>
            ))}
          </div>

          <p className="mt-4 flex items-center gap-1.5 text-xs font-bold text-ink/55 md:hidden">
            <span className="live-dot" />
            {formatDateCN(now)} · {formatClock(now)}
          </p>

          <div className="pointer-events-none absolute -left-2 bottom-0 hidden h-16 w-20 rotate-[18deg] text-ink/25 lg:block">
            <svg viewBox="0 0 100 80" fill="none" aria-hidden="true">
              <path
                d="M8 58C22 20 52 12 78 30C88 37 91 49 88 64"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="9 8"
              />
              <path
                d="M78 56L88 66L96 52"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="relative mx-auto mt-1 w-[232px] shrink-0 sm:w-[280px] lg:mt-0">
          <div className="blob-a absolute inset-x-0 top-4 bottom-0 rotate-2 border-[3px] border-ink bg-butter shadow-[7px_8px_0_rgba(51,70,160,0.16)]" />
          <div className="relative px-2 pb-2 pt-5">
            <BusMascot className="w-full animate-floaty" />
          </div>

          <span
            className="absolute -right-3 -top-3 inline-block rotate-6 rounded-xl border-2 border-ink bg-cream px-2.5 py-1 font-doodle text-xs leading-tight shadow-[2px_3px_0_rgba(51,70,160,0.25)] sm:-right-5"
            aria-hidden="true"
          >
            周末不宅
            <br />
            出发！
          </span>
          <StarDoodle
            className="absolute -bottom-3 -left-3 w-10 animate-floaty sm:w-12"
            fill="#FFE9A8"
            face
          />
          <HeartDoodle className="absolute -left-4 top-12 w-6 -rotate-12 sm:w-7" fill="#FF8FB4" />
          <Sparkle className="absolute -right-5 bottom-12 w-7 rotate-12 text-butter sm:w-8" />
        </div>
      </div>

      <div className="mt-8 flex items-center gap-3" aria-hidden="true">
        <span className="h-0.5 flex-1 border-t-2 border-dashed border-ink/20" />
        <span className="font-chunky text-[10px] tracking-[0.3em] text-ink/35">
          WEEKEND ESCAPE CLUB
        </span>
        <span className="h-0.5 flex-1 border-t-2 border-dashed border-ink/20" />
      </div>
    </header>
  )
}
