import Header from './components/Header'
import ScheduleBoard from './components/ScheduleBoard'
import EscapePicker from './components/EscapePicker'
import NoteWall from './components/NoteWall'
import { HeartDoodle, Sparkle, StarDoodle, Squiggle } from './components/Doodles'
import { useNow } from './lib/useNow'

function Scene() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="gingham-pink absolute inset-0" />

      <div className="absolute inset-x-0 bottom-0 h-[48%]">
        <svg
          className="absolute -top-16 left-0 h-20 w-full sm:-top-20 sm:h-24"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,54C130,14 248,88 380,68C528,46 624,90 776,64C934,36 1042,82 1206,54C1308,36 1388,54 1440,36L1440,100L0,100Z"
            fill="#E6F0FA"
          />
          <path
            d="M0,54C130,14 248,88 380,68C528,46 624,90 776,64C934,36 1042,82 1206,54C1308,36 1388,54 1440,36"
            fill="none"
            stroke="#3346A0"
            strokeOpacity="0.16"
            strokeWidth="2.5"
            strokeDasharray="14 12"
          />
        </svg>
        <div className="polka-blue absolute inset-0 bg-babyblue opacity-80" />
      </div>

      <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#FFD7E5] opacity-70 blur-2xl" />
      <div className="absolute -right-24 top-10 h-64 w-64 rounded-full bg-[#DCEBFF] opacity-70 blur-2xl" />

      <StarDoodle
        className="absolute left-[4%] top-[13%] hidden w-16 animate-floaty opacity-70 md:block"
        fill="#FFB7CF"
        face
      />
      <HeartDoodle
        className="absolute right-[5%] top-[31%] hidden w-10 rotate-12 opacity-55 md:block"
        fill="#FF8FB4"
      />
      <Squiggle
        className="absolute bottom-[16%] left-[2%] hidden w-24 opacity-35 lg:block"
        color="#FF8FB4"
      />
      <Sparkle
        className="absolute bottom-[9%] right-[7%] w-8 opacity-50"
        fill="#FFE9A8"
      />
      <StarDoodle
        className="absolute bottom-[5%] left-[8%] w-10 -rotate-12 opacity-40 sm:w-12"
        fill="#B9DCFF"
      />
    </div>
  )
}

function Footer() {
  return (
    <footer className="mt-14 pb-4 sm:mt-20">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-3 flex items-center justify-center gap-1.5" aria-hidden="true">
          <StarDoodle className="w-5 -rotate-12" fill="#FFE9A8" />
          <HeartDoodle className="w-5" fill="#FF8FB4" />
          <StarDoodle className="w-5 rotate-12" fill="#B9DCFF" />
        </div>
        <p className="font-doodle text-xl sm:text-2xl">祝你顺利破结界，周末快乐！</p>
        <p className="mx-auto mt-2 max-w-md text-[10px] leading-relaxed text-ink/40 sm:text-[11px]">
          时刻信息整理自校园班车表与接驳车指南，具体班次以学校最新通知为准。
        </p>
        <div className="mx-auto mt-4 flex w-40 items-center gap-2" aria-hidden="true">
          <span className="flex-1 border-t-2 border-dashed border-ink/15" />
          <span className="text-[9px] text-ink/30">♥</span>
          <span className="flex-1 border-t-2 border-dashed border-ink/15" />
        </div>
        <p className="mt-2 font-chunky text-[9px] tracking-[0.24em] text-ink/25">
          MADE FOR 民大丰台人
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  const now = useNow()

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <Scene />
      <div className="page-frame" aria-hidden="true" />
      <a href="#main" className="skip-link">
        跳到主要内容
      </a>

      <main
        id="main"
        className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-12 pt-6 sm:px-6 sm:pt-10 lg:px-8"
      >
        <Header now={now} />

        <div className="mt-10 sm:mt-14">
          <ScheduleBoard now={now} />
        </div>

        <div className="mt-12 sm:mt-16">
          <EscapePicker />
        </div>

        <div className="mt-12 sm:mt-16">
          <NoteWall />
        </div>

        <Footer />
      </main>
    </div>
  )
}
