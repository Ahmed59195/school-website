export default function CareerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center">Careers at GBPS D-1 Area</h1>
      
      <p className="text-lg mb-4">
        GBPS D-1 Area is a Government Boys Primary School under the School Education & Literacy Department, Government of Sindh.
      </p>
      
      <p className="text-lg mb-4">
        As a government institution, we do not conduct direct hiring. All teaching and staff positions are filled through a merit-based process overseen by the department.
      </p>

      <p className="text-lg mb-4">
        The School Education & Literacy Department recruits qualified candidates through competitive examinations conducted by recognized testing services such as:
      </p>

      <ul className="list-disc pl-6 mb-4 text-lg">
        <li>STS (Sindh Testing Service)</li>
        <li>NTS (National Testing Service)</li>
        <li>SPSC (Sindh Public Service Commission)</li>
      </ul>

      <p className="text-lg">
        For the latest job openings and application procedures, please visit the official website of the
        <a
          href="https://www.sindheducation.gov.pk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline ml-1"
        >
          School Education & Literacy Department, Sindh.
        </a>
      </p>
    </div>
  );
}
