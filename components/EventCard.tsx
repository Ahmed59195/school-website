import React from 'react';

interface EventCardProps {
  title: string;
  date: string;
  description: string;
}

export default function EventCard({ title, date, description }: EventCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm text-gray-500 mb-2">{date}</p>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}
