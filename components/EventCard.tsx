import { HiCalendar } from 'react-icons/hi';

interface EventCardProps {
  title: string;
  date: string;
  description: string;
}

export default function EventCard({ title, date, description }: EventCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-green-600 to-emerald-400" />
      <div className="p-5">
        <div className="flex items-center gap-2 text-green-700 text-xs font-semibold uppercase tracking-wide mb-3">
          <HiCalendar size={14} />
          <span>{date}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2 leading-snug">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
