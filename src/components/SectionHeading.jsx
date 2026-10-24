export default function SectionHeading({ num, kicker, title, note, titleId }) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3 sm:mb-5">
      <div className="flex items-center gap-3">
        <span className="section-num blob-b grid h-11 w-11 -rotate-6 place-items-center border-[3px] border-ink bg-butter font-chunky text-xl shadow-[3px_4px_0_rgba(51,70,160,0.2)] sm:h-12 sm:w-12">
          {num}
        </span>
        <div>
          <p className="font-chunky text-[10px] font-bold tracking-[0.28em] text-ink/45">
            {kicker}
          </p>
          <h2 id={titleId} className="font-puffy text-2xl leading-tight sm:text-[1.75rem]">
            {title}
          </h2>
        </div>
      </div>
      {note ? (
        <p className="rounded-full border-2 border-dashed border-ink/25 bg-white/60 px-3 py-1 text-[11px] font-bold text-ink/55">
          {note}
        </p>
      ) : null}
    </div>
  )
}
