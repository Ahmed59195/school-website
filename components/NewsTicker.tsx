'use client'

const newsList = [
  "📢 Admission Open for 2026-27 — Apply Now!",
  "🏫 New academic session starts August 1, 2026",
  "🇵🇰 Independence Day celebrations — August 14, 2026",
  "📝 Mid-Term Exams scheduled for October 2026",
  "📚 Textbooks distribution completed",
  "📷 New gallery photos added — check it out!",
]

export default function NewsTicker() {
  return (
    <div className="bg-green-800 text-white text-sm py-2 overflow-hidden flex items-center">
      <span className="bg-amber-500 text-black font-bold px-3 py-1 text-xs shrink-0 uppercase tracking-wide mr-4">
        Latest
      </span>
      <div className="overflow-hidden flex-1">
        <div className="animate-marquee whitespace-nowrap">
          {[...newsList, ...newsList].map((item, i) => (
            <span key={i} className="inline-block mr-14 text-white/90">{item}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
