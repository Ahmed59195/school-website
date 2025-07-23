// app/contact/page.tsx

import ContactSection from "@/components/ContactSection";

export default function ContactPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p>
        Have questions? Reach out to us for any inquiries or support.
        <br />
        <span className="font-noto">
          کوئی سوال ہے؟ کسی بھی معلومات یا تعاون کے لیے ہم سے رابطہ کریں۔
        </span>
      </p>
      <ContactSection />
    </div>
  );
}
