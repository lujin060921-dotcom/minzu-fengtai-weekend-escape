import { useEffect, useRef, useState } from 'react'
import { ESCAPE_ROUTES, PHOTO_LABELS } from '../data/routes'
import { HeartDoodle, Sparkle, StarDoodle } from './Doodles'
import SectionHeading from './SectionHeading'

const THEMES = {
  mint: {
    icon: 'bg-mint',
    tag: 'bg-[#EEFFF7]',
    stripe: 'bg-[#9FE3C6]',
    tape: '#9FE3C6',
  },
  pink: {
    icon: 'bg-pinkie',
    tag: 'bg-[#FFF0F5]',
    stripe: 'bg-[#FFB7CF]',
    tape: '#FFB7CF',
  },
  lilac: {
    icon: 'bg-lilac',
    tag: 'bg-[#F5F0FF]',
    stripe: 'bg-[#C9B6F5]',
    tape: '#D8C8FF',
  },
  coral: {
    icon: 'bg-coral',
    tag: 'bg-[#FFF1EC]',
    stripe: 'bg-[#FFB59E]',
    tape: '#FFB59E',
  },
  butter: {
    icon: 'bg-butter',
    tag: 'bg-[#FFFBE8]',
    stripe: 'bg-[#FFE9A8]',
    tape: '#FFE9A8',
  },
  sky: {
    icon: 'bg-sky',
    tag: 'bg-[#EEF7FF]',
    stripe: 'bg-[#B9DCFF]',
    tape: '#B9DCFF',
  },
}

function StarRating({ value }) {
  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`出片指数 ${value} 分，满分 5 分`}
    >
      {[1, 2, 3, 4, 5].map((index) => (
        <StarDoodle
          key={index}
          className={`h-4 w-4 ${index <= value ? '' : 'opacity-25'}`}
          fill={index <= value ? '#FFD97A' : '#FFFDF8'}
        />
      ))}
    </div>
  )
}

function ResultCard({ route, onRedraw }) {
  const theme = THEMES[route.theme] ?? THEMES.pink
  const confetti = Array.from({ length: 12 }, (_, index) => {
    const angle = (index / 12) * Math.PI * 2
    const distance = 80 + (index % 4) * 26
    return {
      id: index,
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance,
      delay: index * 18,
      char: ['✨', '💗', '⭐', '🎉'][index % 4],
    }
  })

  return (
    <article
      className="relative overflow-hidden rounded-[30px] border-[3px] border-ink bg-cream shadow-[8px_9px_0_rgba(51,70,160,0.18)]"
      aria-live="polite"
    >
      <div className={`h-2.5 border-b-2 border-ink/25 ${theme.stripe}`} aria-hidden="true" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-40" aria-hidden="true">
        {confetti.map((piece) => (
          <span
            key={piece.id}
            className="sparkle-burst absolute left-1/2 top-16 text-lg"
            style={{
              '--dx': `${piece.dx}px`,
              '--dy': `${piece.dy}px`,
              animationDelay: `${piece.delay}ms`,
            }}
          >
            {piece.char}
          </span>
        ))}
      </div>

      <div className="relative p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <span
              className={`grid h-16 w-16 shrink-0 -rotate-3 place-items-center rounded-[20px] border-[3px] border-ink text-4xl shadow-[3px_4px_0_rgba(51,70,160,0.2)] ${theme.icon}`}
              aria-hidden="true"
            >
              {route.emoji}
            </span>
            <div className="min-w-0">
              <p className="font-chunky text-[10px] font-bold tracking-[0.24em] text-ink/45">
                TODAY&apos;S ESCAPE · 随机掉落
              </p>
              <h3 className="font-puffy text-[1.65rem] leading-tight sm:text-[1.9rem]">
                {route.title}
              </h3>
              <p className="mt-0.5 text-xs leading-relaxed text-ink/60 sm:text-sm">
                {route.subtitle}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {route.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-full border border-ink/15 px-2 py-0.5 text-[10px] font-bold text-ink/70 ${theme.tag}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onRedraw}
            className="press-btn inline-flex shrink-0 items-center gap-1.5 rounded-2xl border-2 border-ink bg-white px-3 py-2 font-doodle text-xs text-ink transition sm:text-sm"
          >
            <span aria-hidden="true">🎲</span>
            再抽一个
          </button>
        </div>

        <div className="mt-5">
          <div className="flex items-center gap-2">
            <h4 className="font-doodle text-base sm:text-lg">组合路线</h4>
            <span className="h-0 flex-1 border-t-2 border-dashed border-ink/15" aria-hidden="true" />
            <span className="rounded-full bg-babyblue px-2 py-0.5 text-[10px] font-bold text-ink/60">
              {route.stages.length} 段
            </span>
          </div>

          <ol className="mt-3">
            {route.stages.map((stage, index) => (
              <li key={stage.phase} className="relative flex gap-3 pb-3 last:pb-0">
                {index < route.stages.length - 1 ? (
                  <span
                    className="absolute bottom-0 left-[17px] top-9 border-l-2 border-dashed border-ink/25"
                    aria-hidden="true"
                  />
                ) : null}
                <span className="relative z-[1] grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-ink bg-butter font-chunky text-sm shadow-[2px_2px_0_rgba(51,70,160,0.18)]">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1 rounded-2xl border-2 border-ink/15 bg-white/85 p-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                        index === 0 ? 'bg-pinkie/60' : 'bg-babyblue'
                      }`}
                    >
                      {stage.phase}
                    </span>
                    <span className="font-chunky text-sm tabular-nums">{stage.time}</span>
                    <span className="ml-auto text-[9px] font-bold text-ink/45">
                      {stage.meta}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-bold leading-snug">{stage.title}</p>
                  <p className="text-[11px] leading-relaxed text-ink/55">{stage.detail}</p>
                </div>
              </li>
            ))}
          </ol>

          {route.walk ? (
            <p className="mt-1 flex items-start gap-2 rounded-xl bg-[#FFF7CC] px-3 py-2 text-[11px] leading-relaxed text-ink/70">
              <span aria-hidden="true">🚶</span>
              {route.walk}
            </p>
          ) : null}
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="rounded-2xl border-2 border-ink/15 bg-white p-3">
            <p className="text-[10px] font-bold text-ink/45">⏳ 总耗时</p>
            <p className="mt-0.5 font-doodle text-base leading-tight sm:text-lg">
              {route.duration}
            </p>
          </div>
          <div className="rounded-2xl border-2 border-ink/15 bg-white p-3">
            <p className="text-[10px] font-bold text-ink/45">💸 预算</p>
            <p className="mt-0.5 font-doodle text-base leading-tight sm:text-lg">
              {route.budget}
            </p>
          </div>
          <div className="rounded-2xl border-2 border-ink bg-[#FFF7CC] p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[10px] font-bold text-ink/45">📸 出片指数</p>
              <span className="font-chunky text-[11px] font-bold">{route.photo}/5</span>
            </div>
            <StarRating value={route.photo} />
            <p className="mt-0.5 text-[10px] leading-tight text-ink/55">
              {PHOTO_LABELS[route.photo] ?? route.photoNote}
            </p>
          </div>
        </div>

        <div className="relative mt-4 -rotate-[0.35deg] rounded-2xl border-2 border-ink/60 bg-[#FFF8CC] p-3.5 pt-5">
          <span
            className="tape absolute -top-2 left-7 h-5 w-16 -rotate-3"
            style={{ '--tape': theme.tape }}
            aria-hidden="true"
          />
          <p className="font-doodle text-sm">🎒 必备贴士</p>
          <ul className="mt-1.5 space-y-1 text-[11px] leading-relaxed text-ink/75 sm:text-xs">
            {route.tips.map((tip) => (
              <li key={tip} className="flex gap-1.5">
                <span className="text-ink/40" aria-hidden="true">
                  ✿
                </span>
                {tip}
              </li>
            ))}
          </ul>
          <p className="mt-2.5 border-t border-dashed border-ink/20 pt-2 text-[10px] leading-relaxed text-ink/55">
            🚌 {route.returnInfo}
          </p>
        </div>

        <p className="mt-3 text-right text-[10px] text-ink/35">
          路线为随机推荐，出发前请再确认一次实时班次。
        </p>
      </div>

      <HeartDoodle
        className="pointer-events-none absolute bottom-4 right-4 w-7 rotate-12 opacity-30"
        fill="#FFB7CF"
      />
    </article>
  )
}

export default function EscapePicker() {
  const [result, setResult] = useState(null)
  const [ticker, setTicker] = useState(null)
  const [drawing, setDrawing] = useState(false)
  const timerRef = useRef(null)
  const lastIdRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const pickRoute = () => {
    let picked = ESCAPE_ROUTES[Math.floor(Math.random() * ESCAPE_ROUTES.length)]
    if (picked.id === lastIdRef.current) {
      picked = ESCAPE_ROUTES[(ESCAPE_ROUTES.indexOf(picked) + 1) % ESCAPE_ROUTES.length]
    }
    lastIdRef.current = picked.id
    return picked
  }

  const drawRoute = () => {
    if (drawing) return

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      setResult(pickRoute())
      setTicker(null)
      return
    }

    setDrawing(true)
    setResult(null)
    let step = 0
    const totalSteps = 14

    timerRef.current = setInterval(() => {
      setTicker(ESCAPE_ROUTES[Math.floor(Math.random() * ESCAPE_ROUTES.length)])
      step += 1
      if (step >= totalSteps) {
        clearInterval(timerRef.current)
        timerRef.current = null
        setResult(pickRoute())
        setTicker(null)
        setDrawing(false)
      }
    }, 70)
  }

  return (
    <section id="escape" aria-labelledby="escape-heading" className="scroll-mt-6">
      <SectionHeading
        num="02"
        kicker="ESCAPE BLIND BOX"
        title="一键出逃 · 路线盲盒"
        titleId="escape-heading"
        note="选择困难症福音"
      />

      <div className="relative overflow-hidden rounded-[30px] border-[3px] border-ink bg-cream p-4 shadow-[7px_8px_0_rgba(51,70,160,0.17)] sm:p-6">
        <StarDoodle
          className="pointer-events-none absolute -left-6 -top-7 w-24 -rotate-12 opacity-20"
          fill="#D8C8FF"
        />
        <div className="relative flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="font-doodle text-lg sm:text-xl">选择困难？让盲盒替你决定。</p>
            <p className="mt-1 text-[11px] leading-relaxed text-ink/55 sm:text-sm">
              {ESCAPE_ROUTES.length} 条路线已装进盒子里：校区段 + 市区段一次排好，抽到哪条走哪条。
            </p>
          </div>
          <div className="flex items-center gap-1 text-ink/30" aria-hidden="true">
            <Sparkle className="w-5" fill="#FFE9A8" />
            <Sparkle className="w-4 -rotate-12" fill="#FFB7CF" />
            <Sparkle className="w-3 rotate-6" fill="#B9DCFF" />
          </div>
        </div>

        <button
          type="button"
          onClick={drawRoute}
          disabled={drawing}
          aria-busy={drawing}
          className="press-btn press-btn-lg candy-stripes relative mt-5 flex w-full items-center gap-3 overflow-hidden rounded-[28px] border-[3px] border-ink bg-pinkie px-4 py-5 text-left transition sm:gap-4 sm:px-6 sm:py-6"
        >
          <span
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-ink bg-cream text-2xl shadow-[2px_3px_0_rgba(51,70,160,0.2)] sm:h-14 sm:w-14 sm:text-3xl"
            aria-hidden="true"
          >
            <span className={drawing ? 'animate-wiggle inline-block' : 'animate-wiggle inline-block'}>
              {drawing ? '🗺️' : '🎁'}
            </span>
          </span>
          <span className="relative min-w-0">
            <span className="block font-doodle text-lg leading-tight text-ink sm:text-2xl">
              {drawing ? '正在翻找逃跑地图…' : '✨ 帮我抽一个出逃路线！'}
            </span>
            <span className="mt-1 block text-[10px] font-bold text-ink/55 sm:text-xs">
              {drawing ? '搓搓手，马上开奖' : '随机 · 丰台出发 · 说走就走'}
            </span>
          </span>
          <span
            className="ml-auto hidden shrink-0 text-3xl sm:block sm:text-4xl"
            aria-hidden="true"
          >
            {drawing ? <span className="animate-drive inline-block">🚌</span> : '🎲'}
          </span>
        </button>

        <div className="mt-4">
          {drawing && ticker ? (
            <div
              className="animate-slide-down rounded-[26px] border-[3px] border-dashed border-ink/30 bg-white/70 px-4 py-8 text-center"
              aria-live="polite"
            >
              <span className="text-4xl" aria-hidden="true">
                {ticker.emoji}
              </span>
              <p className="mt-2 font-doodle text-xl">{ticker.title}</p>
              <p className="mt-1 text-xs font-bold text-ink/45">
                正在拼接校区段 + 市区段…
              </p>
            </div>
          ) : result ? (
            <div key={result.id} className="animate-pop-in">
              <ResultCard route={result} onRedraw={drawRoute} />
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-[26px] border-[3px] border-dashed border-ink/30 bg-white/55 px-4 py-9 text-center sm:py-12">
              <StarDoodle
                className="pointer-events-none absolute -bottom-8 -left-8 w-32 rotate-12 opacity-10"
                fill="#FFB7CF"
              />
              <HeartDoodle
                className="pointer-events-none absolute -right-3 top-5 w-16 rotate-12 opacity-10"
                fill="#FF8FB4"
              />
              <div className="blob-c relative mx-auto grid h-20 w-20 -rotate-6 place-items-center border-[3px] border-ink bg-lilac shadow-[4px_5px_0_rgba(51,70,160,0.18)] sm:h-24 sm:w-24">
                <span className="font-chunky text-5xl sm:text-6xl">?</span>
                <Sparkle className="absolute -right-4 -top-3 w-6 rotate-12" fill="#FFE9A8" />
              </div>
              <p className="relative mt-4 font-doodle text-xl sm:text-2xl">
                盲盒还没开，今天想去哪儿？
              </p>
              <p className="relative mt-1 text-xs leading-relaxed text-ink/55 sm:text-sm">
                点上面的粉色按钮，让命运替你安排一个不费脑子的周末。
              </p>
              <div className="relative mt-3 flex flex-wrap justify-center gap-1.5">
                {['不费脑子', '不用查攻略', '说走就走'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-ink/15 bg-white/80 px-2.5 py-1 text-[10px] font-bold text-ink/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
