import { ContactFormWrapper } from "./contact-form";
import { COMPANY_PHONE, COMPANY_PHONE_DIGITS } from "@/lib/constants";

export const metadata = {
  title: "Free 1031 Exchange Guidance | Dallas",
  description: "Talk with a Dallas 1031 exchange expert or submit the short form for free exchange guidance and replacement-property information.",
};

export default function ContactPage() {
  return (
    <main className="bg-brand-dark text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
        <div className="mb-16 text-center">
          <span className="subheading mb-4 block">Free Exchange Guidance</span>
          <h1 className="heading-display text-white">
            Talk Through Your Dallas Property Sale
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/85">
            Share the planned sale, request a free property list, or ask what needs to happen next. The form is intentionally short.
          </p>
          <a
            href={`tel:+1${COMPANY_PHONE_DIGITS}`}
            className="mt-7 inline-flex items-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-fg transition hover:bg-[#B68531]"
          >
            Call {COMPANY_PHONE}
          </a>
        </div>
        <ContactFormWrapper />
      </div>
    </main>
  );
}
