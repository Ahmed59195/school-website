import Image from 'next/image';

const teachers = [
  { name: 'Miss Shazia Samad', className: 'ECE' },
  { name: 'Miss Bushra Bano', className: 'ECE' },
  { name: 'Miss Nazneen Jamal', className: 'Class I' },
  { name: 'Miss Maryam Khan', className: 'Class II' },
  { name: 'Miss Rashma Khatoon', className: 'Class III' },
  { name: 'Sir Muhammad Masood ur Rehman Nasir', className: 'Class IV' },
  { name: 'Miss Urooj Fatima', className: 'Class V' },
];

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">About GBPS D-1 Area</h1>
      <p className="text-lg mb-8 text-center">
        GBPS D-1 Area is committed to providing quality education with a focus on character-building,
        creativity, and community service. Our team of dedicated educators ensures a nurturing environment
        for young learners.
      </p>

      <h2 className="text-2xl font-semibold mb-6 mt-10">Headmaster</h2>
      <div className="flex items-center gap-4 border p-4 rounded-md shadow-sm mb-10">
        <Image
          src="/placeholder.jpg"
          alt="Headmaster"
          width={100}
          height={100}
          className="rounded-full object-cover"
        />
        <div>
          <p className="text-xl font-semibold">Ahmed Ali</p>
          <p className="text-gray-600">Headmaster</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Our Teaching Staff</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {teachers.map((teacher, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <Image
              src="/placeholder.jpg"
              alt={teacher.name}
              width={100}
              height={100}
              className="rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-bold text-center">{teacher.name}</h3>
            <p className="text-center text-gray-600">{teacher.className}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
