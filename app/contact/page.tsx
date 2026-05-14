import ContactSection from "@/components/ContactSection";

export default function ContactPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="bg-green-900 text-white py-14 px-4 text-center">
        <h1 className="text-4xl font-extrabold mb-3">Contact Us</h1>
        <p className="text-white/70 max-w-xl mx-auto text-sm">
          Have questions? Reach out to us for any inquiries or support.{' '}
          <span className="block mt-1">
            کوئی سوال ہے؟ کسی بھی معلومات یا تعاون کے لیے ہم سے رابطہ کریں۔
          </span>
        </p>
      </div>
      <ContactSection />
    </div>
  );
}
