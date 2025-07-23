'use client';

export default function AdmissionsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-10" dir="rtl" lang="ur">
      <h1 className="text-4xl font-bold text-center mb-6">📚 داخلے جاری ہیں</h1>

      <div className="bg-green-100 border-r-4 border-green-500 p-6 rounded-lg shadow-md text-right">
        <h2 className="text-xl font-semibold mb-4">ضروری ہدایات:</h2>
        <p className="text-lg mb-4">
          گورنمنٹ بوائز پرائمری اسکول D-1 ایریا میں بچوں کے داخلے جاری ہیں۔
        </p>
        <p className="text-lg font-semibold mb-2">درخواست کے وقت درج ذیل دستاویزات ساتھ لائیں:</p>
        <ul className="list-decimal list-inside space-y-2 text-lg pr-4">
          <li>بچے کا پیدائشی سرٹیفکیٹ</li>
          <li>ب فارم (نادرا سے جاری کردہ)</li>
          <li>والد کا قومی شناختی کارڈ (CNIC)</li>
        </ul>
      </div>

      <div className="text-lg text-right text-gray-700">
        مزید معلومات کے لیے صبح 8:00 بجے سے دوپہر 1:00 بجے تک اسکول آفس سے رابطہ کریں۔
        <br />
        ہم آپ کے بچوں کے روشن مستقبل کے لیے پُرعزم ہیں۔
      </div>

      {/* WhatsApp Button */}
      <div className="flex justify-end mt-8">
        <a
          href="https://wa.me/923422560406" // 👈 Replace with your school's WhatsApp number
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-green-500 text-white px-5 py-3 rounded-lg shadow hover:bg-green-600 transition"
        >
          📱 واٹس ایپ پر رابطہ کریں
        </a>
      </div>
    </main>
  );
}
