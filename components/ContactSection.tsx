'use client';

export default function ContactSection() {
  return (
    <section className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8" id="contact">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          📞 Contact Us / ہم سے رابطہ کریں
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Contact Info */}
          <div className="space-y-4 text-gray-700">
            <p><strong>🏫 School Name:</strong> GBPS D-1 Area</p>
            <p><strong>📍 Address:</strong> D-1 Area, Khokhrapar Malir, Karachi</p>
            <p className="text-right font-urdu text-xl">
              ڈی-1 ایریا، کراچی
            </p>
            <p>
              <strong>📞 Phone:</strong>{' '}
              <a href="tel:03422560406" className="text-blue-600 underline">
                0342-2560406
              </a>
            </p>
            <p>
              <strong>📧 Email:</strong>{' '}
              <a href="mailto:gbpsd1area@gmail.com" className="text-blue-600 underline">
                gbpsd1area@gmail.com
              </a>
            </p>
            <p>
              <strong>🕒 Timings:</strong> Monday to Saturday – 8:00 AM to 1:00 PM
            </p>
            <p className="text-right font-urdu text-xl">
              سوموار تا ہفتہ – صبح 8 بجے تا 1 بجے
            </p>

            <a
              href="https://wa.me/923422560406" // Replace with your school's WhatsApp number
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            >
              💬 Chat on WhatsApp
            </a>
          </div>

          {/* Google Map */}
          <div className="w-full h-64 md:h-full">
            <iframe
              title="School Location"
              src="https://maps.google.com/maps?q=D-1%20Area,%20Karachi&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
