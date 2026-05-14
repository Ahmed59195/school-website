const teachers = [
  { name: 'Miss Shazia Samad', className: 'ECE' },
  { name: 'Miss Bushra Bano', className: 'ECE' },
  { name: 'Miss Nazneen Jamal', className: 'Class I' },
  { name: 'Miss Maryam Khan', className: 'Class II' },
  { name: 'Miss Rashma Khatoon', className: 'Class III' },
  { name: 'Sir Muhammad Masood ur Rehman Nasir', className: 'Class IV' },
  { name: 'Miss Urooj Fatima', className: 'Class V' },
];

function Avatar({ name, size = 80 }: { name: string; size?: number }) {
  const initials = name
    .split(' ')
    .filter((w) => w.length > 1)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
  return (
    <div
      style={{ width: size, height: size, fontSize: size * 0.35 }}
      className="rounded-full bg-green-700 text-white flex items-center justify-center font-bold select-none shrink-0"
    >
      {initials}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="bg-green-900 text-white py-14 px-4 text-center">
        <h1 className="text-4xl font-extrabold mb-3">About GBPS D-1 Area</h1>
        <p className="text-white/70 max-w-xl mx-auto text-sm">
          Government Boys Primary School D-1 Area — Malir Town, Karachi
        </p>
      </div>

      {/* Mission Statement */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-green-700 bg-green-50 px-3 py-1 rounded-full">
          Our Mission
        </span>
        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
          GBPS D-1 Area is committed to providing quality education with a focus on character-building,
          creativity, and community service. Our team of dedicated educators ensures a nurturing environment
          for every young learner in the D-1 Area community.
        </p>
      </section>

      {/* Headmaster */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="w-1 h-7 bg-green-700 rounded-full inline-block" />
          Headmaster
        </h2>
        <div className="flex items-center gap-6 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <Avatar name="Ahmed Ali" size={80} />
          <div>
            <p className="text-xl font-bold text-gray-800">Ahmed Ali</p>
            <p className="text-green-700 font-medium text-sm mt-0.5">Headmaster</p>
            <p className="text-gray-500 text-sm mt-2">
              Leading GBPS D-1 Area with a commitment to academic excellence and community development.
            </p>
          </div>
        </div>
      </section>

      {/* Teaching Staff */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            <span className="w-1 h-7 bg-green-700 rounded-full inline-block" />
            Our Teaching Staff
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {teachers.map((teacher, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-5 flex flex-col items-center text-center"
              >
                <Avatar name={teacher.name} size={72} />
                <h3 className="text-base font-bold text-gray-800 mt-4 leading-snug">{teacher.name}</h3>
                <span className="mt-1.5 text-xs font-semibold text-green-700 bg-green-50 px-3 py-0.5 rounded-full">
                  {teacher.className}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
