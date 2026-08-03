import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  COMPANY_NAME,
  COMPANY_PHONE,
  COMPANY_PHONE_DIGITS,
  CONTACT_PATH,
  SITE_URL,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Our Dallas 1031 Exchange Solutions",
  description:
    "Learn how 1031 Exchange Dallas helps property owners plan a sale, compare direct and passive replacement options, and move toward closing.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "About Our Dallas 1031 Exchange Solutions",
    description:
      "Free guidance for Dallas property owners comparing direct real estate, net-lease property, and passive DST replacement options.",
    url: `${SITE_URL}/about`,
    siteName: COMPANY_NAME,
    images: [
      {
        url: `${SITE_URL}/1031-exchange-dallas-tx.webp`,
        width: 1200,
        height: 630,
        alt: "About 1031 Exchange Dallas",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

const reasons = [
  {
    title: "The current property takes too much work",
    description:
      "Tenants, repairs, capital projects, leasing, and management demands may no longer fit the owner’s life or investment plan.",
  },
  {
    title: "The sale creates a replacement decision",
    description:
      "The owner may want another direct property, a net-lease acquisition, a professionally managed DST interest, or a combination of alternatives.",
  },
  {
    title: "The exchange is already moving",
    description:
      "A contract or closing date may make it urgent to engage an independent qualified intermediary and define realistic replacement criteria.",
  },
  {
    title: "An inherited property no longer fits",
    description:
      "Ownership, basis, qualifying use, family priorities, and timing need to be organized with the owner’s tax and legal advisors before the sale advances.",
  },
];

const approach = [
  {
    title: "Start with the planned sale",
    description:
      "Clarify the property, ownership, closing window, expected equity, debt, income goals, management preferences, and the reason for selling.",
  },
  {
    title: "Build the replacement brief",
    description:
      "Place direct property, net-lease real estate, and passive DST possibilities beside the same priorities for income, control, risk, workload, liquidity, and timing.",
  },
  {
    title: "Bring in the right professionals",
    description:
      "Connect the owner with the independent qualified intermediary and other appropriately licensed professionals the transaction requires.",
  },
  {
    title: "Keep open questions visible",
    description:
      "Follow title, financing, inspections, identification, documents, advisor questions, and closing requirements through the replacement acquisition.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#F5F3EE] text-[#2D2D2D]">
      <section className="relative overflow-hidden pb-24 pt-36 text-white">
        <Image
          src="/locations/1031-exchange-dallas-TX.webp"
          alt="Dallas skyline"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/65 to-black/35" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <p className="text-sm tracking-[0.24em] text-[#E85D24] uppercase">About {COMPANY_NAME}</p>
          <h1 className="mt-5 max-w-4xl font-[family-name:var(--font-ibm-plex-serif)] text-4xl leading-tight text-white sm:text-6xl">
            A clearer route from the Dallas property sale to what comes next.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/85">
            {COMPANY_NAME} helps investment-property owners understand their choices, organize the moving parts, and compare direct and passive replacement paths before time-sensitive decisions take over.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`tel:+1${COMPANY_PHONE_DIGITS}`} className="inline-flex items-center bg-[#E85D24] px-7 py-3 text-sm font-semibold tracking-[0.08em] text-white uppercase transition hover:bg-[#D14D18]">
              Call {COMPANY_PHONE}
            </a>
            <Link href={`${CONTACT_PATH}?request=properties`} className="inline-flex items-center border-2 border-white px-7 py-3 text-sm font-semibold tracking-[0.08em] text-white uppercase transition hover:bg-white hover:text-[#2D2D2D]">
              Get a Free Property List
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-sm tracking-[0.24em] text-[#E85D24] uppercase">Why Owners Call</p>
            <h2 className="mt-4 font-[family-name:var(--font-ibm-plex-serif)] text-3xl sm:text-5xl">
              A 1031 exchange usually begins with a life or property problem.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#2D2D2D]/75">
              Rules matter, but owners normally begin by asking what to do with a property that no longer serves its purpose. The exchange should be built around that answer.
            </p>
          </div>
          <div className="mt-12 grid gap-7 md:grid-cols-2">
            {reasons.map((reason) => (
              <article key={reason.title} className="border-t-2 border-[#E85D24] pt-5">
                <h3 className="text-xl font-semibold">{reason.title}</h3>
                <p className="mt-3 leading-relaxed text-[#2D2D2D]/70">{reason.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
          <div className="text-center">
            <p className="text-sm tracking-[0.24em] text-[#E85D24] uppercase">How We Help</p>
            <h2 className="mt-4 font-[family-name:var(--font-ibm-plex-serif)] text-3xl sm:text-5xl">
              One organized exchange solution
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {approach.map((item) => (
              <article key={item.title} className="bg-white p-7 shadow-[0_16px_44px_rgba(45,45,45,0.07)] sm:p-8">
                <h3 className="font-[family-name:var(--font-ibm-plex-serif)] text-2xl">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-[#2D2D2D]/70">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1A3A32] py-20 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
          <div>
            <p className="text-sm tracking-[0.24em] text-[#E85D24] uppercase">Direct, Net Lease, or DST</p>
            <h2 className="mt-4 font-[family-name:var(--font-ibm-plex-serif)] text-3xl text-white sm:text-5xl">
              The right replacement depends on the ownership experience you want.
            </h2>
            <p className="mt-5 leading-relaxed text-white/75">
              Direct property offers control. A net-lease property shifts specified responsibilities to a tenant. A DST can remove day-to-day landlord decisions while introducing sponsor, fee, leverage, property, control, and liquidity considerations. The job is to make those differences clear before a selection is made.
            </p>
          </div>
          <div className="border border-white/20 bg-white/10 p-7">
            <h3 className="font-[family-name:var(--font-ibm-plex-serif)] text-2xl text-white">Free guidance, independent professional work</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Tax and legal conclusions belong to the property owner’s CPA and counsel. Qualified-intermediary, brokerage, lending, and securities work must be handled by the appropriate independent professionals. DST interests are securities and require offering-document, fee, risk, eligibility, availability, and suitability review through an appropriately licensed professional.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 text-center sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:text-left">
          <div>
            <h2 className="font-[family-name:var(--font-ibm-plex-serif)] text-3xl sm:text-4xl">Talk through the planned Dallas sale.</h2>
            <p className="mt-3 text-[#2D2D2D]/70">Get free exchange guidance or request current direct and passive property information.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 lg:justify-end">
            <a href={`tel:+1${COMPANY_PHONE_DIGITS}`} className="inline-flex items-center bg-[#1A3A32] px-7 py-3 text-sm font-semibold tracking-[0.08em] text-white uppercase transition hover:bg-[#E85D24]">Call {COMPANY_PHONE}</a>
            <Link href={CONTACT_PATH} className="inline-flex items-center border-2 border-[#2D2D2D] px-7 py-3 text-sm font-semibold tracking-[0.08em] text-[#2D2D2D] uppercase transition hover:bg-[#2D2D2D] hover:text-white">Start My Exchange</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
