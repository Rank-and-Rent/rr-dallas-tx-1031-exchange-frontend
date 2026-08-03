import { CONTACT_PATH } from "@/lib/constants";

type StickyCallProps = {
  phone: string;
};

export default function StickyCall({ phone }: StickyCallProps) {
  const telHref = `tel:${phone.replace(/\D/g, "")}`;

  return (
    <div className="fixed bottom-4 right-4 z-[9998] flex flex-col gap-3">
      <a
        href={CONTACT_PATH}
        className="hidden min-w-[200px] items-center justify-center rounded-full bg-[#E85D24] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-[#D14D18] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E85D24] md:inline-flex"
      >
        Start My Exchange
      </a>
      <a
        href={telHref}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-[#E85D24] text-white shadow-xl shadow-black/25 transition hover:bg-[#D14D18] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E85D24] md:hidden"
        aria-label={`Call ${phone}`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
        </svg>
        <span className="sr-only">Call {phone}</span>
      </a>
    </div>
  );
}
