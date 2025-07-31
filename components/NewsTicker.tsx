// app/components/NewsTicker.tsx
'use client'

import { useEffect, useState } from 'react'

const newsList = [
  "Admission Open for 2025-26!",
  "Schools will be re-opened from August 1, 2025",
  "Independence Day celebrations starting from August 1",
  "Mid-Term Exams will be held in October",
  "Textbooks distribution completed",
]

export default function NewsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newsList.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-yellow-100 text-black p-2 rounded-md shadow-md overflow-hidden h-12 w-full">
      <div className="animate-slide-vertical">
        <p className="text-center font-semibold">{newsList[currentIndex]}</p>
      </div>
    </div>
  )
}
