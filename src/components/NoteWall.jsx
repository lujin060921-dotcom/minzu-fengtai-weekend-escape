import { useEffect, useState } from 'react'
import { HeartDoodle, StarDoodle } from './Doodles'
import SectionHeading from './SectionHeading'

const STORAGE_KEY = 'minzu-fengtai-wish-notes-v1'

const NOTE_STYLES = [
  { bg: 'bg-[#FFF8CC]', tape: '#FFB7CF' },
  { bg: 'bg-[#FFEFF5]', tape: '#B9DCFF' },
  { bg: 'bg-[#EDF8FF]', tape: '#FFE9A8' },
  { bg: 'bg-[#F1FFF7]', tape: '#D8C8FF' },
  { bg: 'bg-[#F7F0FF]', tape: '#9FE3C6' },
]

const SEED_NOTES = [
  {
    id: 'seed-1',
    text: '想去环球影城看小黄人，谁懂啊！',
    name: '小林',
    date: '10.24',
    style: 0,
    rotate: -2,
  },
  {
    id: 'seed-2',
    text: '求搭子一起去园博园野餐拍照 📷',
    name: '阿满',
    date: '10.24',
    style: 1,
    rotate: 1.6,
  },
  {
    id: 'seed-3',
    text: '丽泽天街的舒芙蕾等我，下课就冲！',
    name: '圆圆',
    date: '10.24',
    style: 3,
    rotate: -1,
  },
]

function loadNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed)) return parsed
    }
  } catch {
    // localStorage 不可用时直接展示种子便签
  }
  return SEED_NOTES
}

export default function NoteWall() {
  const [notes, setNotes] = useState(loadNotes)
  const [text, setText] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
    } catch {
      // 忽略隐私模式下的存储失败
    }
  }, [notes])

  const handleSubmit = (event) => {
    event.preventDefault()
    const value = text.trim()
    if (!value) return

    const now = new Date()
    const note = {
      id:
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `note-${Date.now()}`,
      text: value,
      name: '匿名同学',
      date: `${now.getMonth() + 1}.${now.getDate()}`,
      style: Math.floor(Math.random() * NOTE_STYLES.length),
      rotate: Math.round((Math.random() * 5 - 2.5) * 10) / 10,
    }

    setNotes((current) => [note, ...current])
    setText('')
  }

  return (
    <section id="notes" aria-labelledby="notes-heading" className="scroll-mt-6">
      <SectionHeading
        num="03"
        kicker="WISH NOTE WALL"
        title="涂鸦便签墙"
        titleId="notes-heading"
        note={`${notes.length} 张心愿便利贴`}
      />

      <form
        onSubmit={handleSubmit}
        className="relative overflow-hidden rounded-[28px] border-[3px] border-ink bg-cream p-4 shadow-[7px_8px_0_rgba(51,70,160,0.17)] sm:p-5"
      >
        <span
          className="tape absolute -top-2 right-10 h-5 w-16 rotate-3"
          style={{ '--tape': '#FFE9A8' }}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute -bottom-8 -right-8 text-6xl opacity-10" aria-hidden="true">
          ✎
        </div>

        <div className="relative grid gap-3 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-end">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 -rotate-3 place-items-center rounded-[16px] border-2 border-ink bg-butter text-xl shadow-[2px_3px_0_rgba(51,70,160,0.18)] sm:h-12 sm:w-12">
              📝
            </span>
            <div>
              <label htmlFor="wish-input" className="font-doodle text-lg leading-tight sm:text-xl">
                你想逃去哪儿？
              </label>
              <p className="mt-0.5 text-[11px] leading-relaxed text-ink/55">
                写下来贴在墙上，说不定下个周末就成行了。
              </p>
            </div>
          </div>

          <div className="min-w-0">
            <input
              id="wish-input"
              type="text"
              maxLength={40}
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="例：想去环球影城看小黄人！"
              aria-describedby="wish-hint wish-count"
              className="w-full rounded-2xl border-[3px] border-ink/70 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/30 focus:border-ink focus:bg-[#FFFDF0] focus:outline-none"
            />
            <div className="mt-1 flex justify-between gap-2 text-[10px] font-bold text-ink/40">
              <span id="wish-hint">✿ 匿名发布 · 最多 40 个字</span>
              <span id="wish-count">{text.length}/40</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={!text.trim()}
            className="press-btn inline-flex h-[50px] items-center justify-center gap-2 rounded-2xl border-[3px] border-ink bg-pinkie px-5 font-doodle text-sm text-ink sm:text-base"
          >
            <span aria-hidden="true">📌</span>
            贴上墙
          </button>
        </div>
      </form>

      <div className="relative mt-5 rounded-[30px] border-2 border-dashed border-ink/20 bg-white/25 p-3 sm:p-5">
        <StarDoodle
          className="pointer-events-none absolute -left-4 top-6 w-14 -rotate-12 opacity-20"
          fill="#FFB7CF"
        />
        <HeartDoodle
          className="pointer-events-none absolute -right-2 bottom-4 w-10 rotate-12 opacity-20"
          fill="#FF8FB4"
        />

        <p className="sr-only" aria-live="polite">
          心愿墙上现有 {notes.length} 张便签
        </p>

        {notes.length === 0 ? (
          <div className="px-4 py-10 text-center">
            <span className="text-4xl" aria-hidden="true">
              🧻
            </span>
            <p className="mt-2 font-doodle text-lg">墙上还空着，来贴第一张吧！</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => {
              const style = NOTE_STYLES[note.style % NOTE_STYLES.length]
              return (
                <div
                  key={note.id}
                  className="relative pt-3"
                  style={{ transform: `rotate(${note.rotate}deg)` }}
                >
                  <span
                    className="tape absolute left-1/2 top-0 z-10 h-6 w-20 -translate-x-1/2 -rotate-3"
                    style={{ '--tape': style.tape }}
                    aria-hidden="true"
                  />
                  <div
                    className={`${style.bg} relative flex min-h-[150px] flex-col justify-between overflow-hidden rounded-[4px] border-2 border-ink/45 p-4 pt-6 shadow-[4px_5px_0_rgba(51,70,160,0.13)] transition-transform duration-300 hover:-translate-y-1`}
                  >
                    <span
                      className="absolute right-3 top-2 text-lg text-ink/25"
                      aria-hidden="true"
                    >
                      ✿
                    </span>
                    <p className="break-words font-doodle text-[17px] leading-relaxed text-ink">
                      “{note.text}”
                    </p>
                    <div className="mt-3 flex items-end justify-between gap-2 text-[10px] font-bold text-ink/45">
                      <span>— {note.name}</span>
                      <span>{note.date}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <p className="mt-3 px-2 text-[10px] leading-relaxed text-ink/35">
        便签会保存在你的浏览器里，换台设备就看不到啦。
      </p>
    </section>
  )
}
