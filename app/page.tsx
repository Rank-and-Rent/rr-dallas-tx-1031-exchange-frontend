import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  IBM_Plex_Serif,
  Inter,
  Pinyon_Script,
  Source_Sans_3,
} from "next/font/google";
import ContactFormFields from "@/components/contact/ContactFormFields";
import { MotionDiv } from "@/components/MotionDiv";
import {
  COMPANY_NAME,
  COMPANY_PHONE,
  COMPANY_PHONE_DIGITS,
  SITE_URL,
} from "@/lib/constants";

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-serif",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-source-sans",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const pinyonScript = Pinyon_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pinyon-script",
});

const PHONE_LINK = `tel:+1${COMPANY_PHONE_DIGITS}`;
const PROPERTY_LIST_LINK = "/contact?request=properties";

const VALUE_POINTS = [
  {
    title: "Free Exchange Guidance",
    description: "Talk through the sale and possible next moves before a deadline controls the decision.",
  },
  {
    title: "Direct and Passive Options",
    description: "Compare direct real estate, net-lease properties, and professionally managed DST interests.",
  },
  {
    title: "A Clear Replacement Brief",
    description: "Organize equity, debt, income goals, management preferences, and realistic closing needs.",
  },
  {
    title: "Help Through Closing",
    description: "Keep the owner, qualified intermediary, advisors, lenders, and closing parties aligned.",
  },
];

const SALE_REASONS = [
  {
    title: "Leave Landlord Work Behind",
    description:
      "Move beyond tenant calls, repairs, capital projects, leasing, and day-to-day property decisions.",
  },
  {
    title: "Sell an Inherited Property",
    description:
      "Clarify ownership, property use, timing, co-owner priorities, and replacement choices before the sale advances.",
  },
  {
    title: "Improve the Income Plan",
    description:
      "Compare replacement paths based on income objectives, debt, concentration, workload, risk, and control.",
  },
  {
    title: "Diversify One Large Asset",
    description:
      "Explore whether exchange equity should remain in one property or be divided among multiple replacements.",
  },
  {
    title: "Act While Under Contract",
    description:
      "Bring the sale facts together quickly, engage an independent qualified intermediary, and define the search.",
  },
  {
    title: "Buy Before the Current Sale",
    description:
      "Review reverse-exchange, financing, title, and timing questions when the preferred replacement appears first.",
  },
];

const REPLACEMENT_PATHS = [
  {
    eyebrow: "Control and flexibility",
    title: "Direct Real Estate",
    description:
      "Own and operate a property directly, choose the business plan, arrange financing, and control future leasing and disposition decisions.",
    review:
      "Review title, leases, condition, market, operations, financing, management requirements, and closing feasibility.",
  },
  {
    eyebrow: "Property ownership with a tenant",
    title: "Net-Lease Property",
    description:
      "Own the real estate while a commercial lease assigns specified operating obligations to the tenant.",
    review:
      "Review tenant credit, guaranty, lease terms, property condition, residual value, rent structure, and the reletting market.",
  },
  {
    eyebrow: "Professionally managed",
    title: "DST Interest",
    description:
      "Own a fractional interest in institutional-grade real estate without personally handling tenants, repairs, leasing, or renovations.",
    review:
      "Review offering documents, sponsor experience, fees, leverage, property risks, conflicts, illiquidity, eligibility, and suitability.",
  },
];

const EXCHANGE_PATH = [
  {
    title: "Plan Before the Sale",
    description:
      "Define the reason for selling, expected equity, debt, income needs, management goals, and professionals already involved.",
  },
  {
    title: "Protect the Exchange at Closing",
    description:
      "Engage an independent qualified intermediary before closing and confirm that exchange proceeds will not reach the seller.",
  },
  {
    title: "Compare Replacement Options",
    description:
      "Evaluate primary and backup candidates against the same written criteria for income, risk, control, workload, financing, and timing.",
  },
  {
    title: "Complete Diligence and Close",
    description:
      "Keep inspections, title, financing, insurance, entity documents, advisor questions, and closing instructions moving together.",
  },
];

const SOLUTIONS = [
  {
    title: "1031 Exchange Solutions",
    description:
      "Start with a planned sale or an urgent contract and build a practical route from relinquished property to replacement closing.",
    href: "/services/dallas-timeline-45-180-day-control",
  },
  {
    title: "Replacement Property Search",
    description:
      "Define the acquisition brief and compare direct, net-lease, and passive opportunities that fit the exchange.",
    href: "/services/dallas-multifamily-replacement-identification",
  },
  {
    title: "DST Property Options",
    description:
      "Request current passive property information and review professionally managed real estate with an appropriately licensed professional.",
    href: PROPERTY_LIST_LINK,
  },
  {
    title: "Qualified Intermediary Introduction",
    description:
      "Connect with an independent qualified intermediary before the relinquished-property sale closes.",
    href: "/services/the-qualified-intermediary-role",
  },
  {
    title: "Inherited Property Planning",
    description:
      "Organize ownership, basis questions, qualifying use, family priorities, and sale timing with the appropriate tax and legal advisors.",
    href: "/services/inherited-property-capital-gains",
  },
  {
    title: "Reverse Exchange Questions",
    description:
      "Explore the structure and financing issues involved when the replacement opportunity must be acquired before the current property sells.",
    href: "/services/dallas-reverse-exchange-control",
  },
];

const FEATURED_LOCATIONS = [
  { name: "Dallas", slug: "dallas-tx", image: "/locations/1031-exchange-dallas-TX.webp" },
  { name: "Fort Worth", slug: "fort-worth-tx", image: "/locations/1031-exchange-fort-worth-TX.jpg" },
  { name: "Plano", slug: "plano-tx", image: "/locations/1031-exchange-plano-TX.jpg" },
  { name: "Frisco", slug: "frisco-tx", image: "/locations/1031-exchange-frisco-TX.jpg" },
];

const FAQ_ITEMS = [
  {
    question: "Can a DST eliminate day-to-day property management?",
    answer:
      "A DST is professionally managed, so the investor does not personally handle tenants, repairs, leasing, or property operations. The sponsor controls the real estate, and the investor must consider fees, risks, leverage, illiquidity, reduced control, eligibility, and suitability before investing.",
  },
  {
    question: "What can a Dallas investor acquire in a 1031 exchange?",
    answer:
      "Qualifying investment real estate can generally be exchanged for other qualifying U.S. investment real estate. Depending on the owner’s goals, the replacement path may include direct property, net-lease real estate, or an eligible DST interest.",
  },
  {
    question: "What if the Dallas property is already under contract?",
    answer:
      "Begin immediately. An independent qualified intermediary generally must be engaged before the relinquished-property closing, and the replacement search should be organized around the actual closing date, equity, debt, and acquisition requirements.",
  },
  {
    question: "Can inherited investment property qualify for an exchange?",
    answer:
      "It may, depending on ownership, use, sale facts, and the taxpayer’s intent to hold the property for investment or business use. Basis and estate questions should be reviewed with the owner’s CPA and attorney before a strategy is chosen.",
  },
  {
    question: "How much is generally required for a DST investment?",
    answer:
      "Some DST offerings may accept investments around $100,000, but minimums vary. Availability, projected income, fees, financing, property risk, sponsor risk, investor eligibility, and suitability are specific to each offering.",
  },
  {
    question: "Can exchange proceeds be divided among several properties?",
    answer:
      "An owner may be able to acquire more than one replacement property, subject to identification requirements and the transaction facts. The exchange plan should account for equity, debt, closing probability, diversification, and backup choices.",
  },
  {
    question: "What are the tradeoffs between direct property and a DST?",
    answer:
      "Direct ownership provides more control but usually requires more management and individual-property diligence. A DST offers professional management and fractional ownership, while also limiting control and liquidity and introducing sponsor, fee, financing, and offering-specific risks.",
  },
  {
    question: "When should an owner begin planning a 1031 exchange?",
    answer:
      "Before the relinquished property closes—and ideally before it is listed. Early planning gives the owner more time to engage an independent qualified intermediary, clarify replacement criteria, examine financing, and compare direct and passive alternatives.",
  },
];

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: COMPANY_NAME,
  url: SITE_URL,
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export const metadata: Metadata = {
  title: "1031 Exchange Dallas | Turnkey Exchange & DST Help",
  description:
    "Selling Dallas investment property? Get free 1031 exchange guidance, compare direct and passive DST options, and request a free property list.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "1031 Exchange Dallas | Turnkey Exchange & DST Help",
    description:
      "Get free Dallas 1031 exchange guidance, compare direct real estate and passive DST options, and request a free property list.",
    url: SITE_URL,
    siteName: COMPANY_NAME,
    images: [
      {
        url: `${SITE_URL}/1031-exchange-dallas-tx.webp`,
        width: 1200,
        height: 630,
        alt: "Turnkey 1031 exchange solutions in Dallas, Texas",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "1031 Exchange Dallas | Turnkey Exchange & DST Help",
    description:
      "Free Dallas 1031 exchange guidance, replacement-property options, and passive DST information.",
    images: [`${SITE_URL}/1031-exchange-dallas-tx.webp`],
  },
};

export default function Home() {
  return (
    <div
      className={`${sourceSans.className} ${ibmPlexSerif.variable} ${inter.variable} ${pinyonScript.variable} bg-[#F5F3EE] text-[#2D2D2D]`}
    >
      <main className="flex min-h-screen w-full flex-col">
        <section
          className="relative flex min-h-screen items-center overflow-hidden pt-20"
          aria-labelledby="hero-heading"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden="true"
          >
            <source src="/dtownnnn.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
            <MotionDiv delay={0.1} className="max-w-3xl">
              <div className="mb-7 flex items-center gap-5">
                <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-full border border-white/40 bg-black/20 backdrop-blur-sm">
                  <span className="font-[family-name:var(--font-pinyon-script)] text-4xl leading-none text-[#E85D24]">
                    1031
                  </span>
                  <span className="font-[family-name:var(--font-pinyon-script)] text-2xl leading-none text-[#E85D24]">
                    Exchange
                  </span>
                </div>
                <p className={`${inter.className} text-xs tracking-[0.28em] text-white/85 uppercase sm:text-sm`}>
                  Selling Investment Property in Dallas?
                </p>
              </div>
              <h1
                id="hero-heading"
                className={`${ibmPlexSerif.className} max-w-3xl text-4xl leading-[1.06] text-white sm:text-5xl lg:text-6xl`}
              >
                Turnkey 1031 Exchange Solutions in Dallas, Texas
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
                Get free guidance from the planned sale through replacement closing. Compare direct real estate, net-lease properties, and passive DST opportunities—including professionally managed properties without day-to-day landlord responsibilities.
              </p>
              <ul className="mt-5 grid max-w-2xl gap-x-8 gap-y-2.5 text-sm text-white/90 sm:grid-cols-2 sm:text-base">
                <li className="flex items-center gap-3"><span className="h-px w-7 bg-[#E85D24]" />Free exchange guidance</li>
                <li className="flex items-center gap-3"><span className="h-px w-7 bg-[#E85D24]" />Free property list</li>
                <li className="flex items-center gap-3"><span className="h-px w-7 bg-[#E85D24]" />No-management DST options</li>
                <li className="flex items-center gap-3"><span className="h-px w-7 bg-[#E85D24]" />Help through replacement closing</li>
              </ul>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={PHONE_LINK}
                  className={`${inter.className} inline-flex min-h-12 items-center justify-center bg-[#E85D24] px-7 py-3 text-sm font-semibold tracking-[0.09em] text-white uppercase transition hover:bg-[#D14D18]`}
                >
                  Call {COMPANY_PHONE}
                </a>
                <Link
                  href={PROPERTY_LIST_LINK}
                  className={`${inter.className} inline-flex min-h-12 items-center justify-center border-2 border-white px-7 py-3 text-sm font-semibold tracking-[0.09em] text-white uppercase transition hover:bg-white hover:text-[#2D2D2D]`}
                >
                  Get a Free Property List
                </Link>
                <Link
                  href="/contact"
                  className={`${inter.className} inline-flex min-h-12 items-center justify-center px-5 py-3 text-sm font-semibold tracking-[0.09em] text-white underline decoration-white/50 underline-offset-8 uppercase transition hover:text-[#E85D24]`}
                >
                  Start My Exchange
                </Link>
              </div>
            </MotionDiv>
          </div>
        </section>

        <section className="bg-white py-14" aria-label="Dallas exchange assistance">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12">
            {VALUE_POINTS.map((item) => (
              <article key={item.title} className="border-l-2 border-[#E85D24] pl-5">
                <h2 className={`${inter.className} text-base font-semibold text-[#2D2D2D]`}>{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#2D2D2D]/70">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#F5F3EE] py-20" aria-labelledby="complete-solution-heading">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <MotionDiv delay={0.1} className="relative">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/locations/1031-exchange-dallas-TX.webp"
                    alt="Dallas skyline representing local 1031 exchange solutions"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </MotionDiv>
              <MotionDiv delay={0.2} className="relative lg:-ml-24">
                <div className="bg-white/95 p-8 shadow-xl backdrop-blur-sm sm:p-10 lg:p-12">
                  <p className={`${inter.className} mb-4 text-sm tracking-[0.26em] text-[#E85D24] uppercase`}>
                    One Sale. A Complete Solution.
                  </p>
                  <h2
                    id="complete-solution-heading"
                    className={`${ibmPlexSerif.className} text-3xl text-[#2D2D2D] sm:text-4xl`}
                  >
                    You do not have to figure out the exchange alone.
                  </h2>
                  <p className="mt-6 leading-relaxed text-[#2D2D2D]/80">
                    A Dallas owner may be selling apartments, industrial property, land, retail, or a long-held commercial asset. The first question is not which rule applies—it is what the owner wants life and the portfolio to look like after the sale.
                  </p>
                  <p className="mt-4 leading-relaxed text-[#2D2D2D]/80">
                    We help turn that objective, expected equity, debt, income needs, and management preferences into one practical exchange plan. When the facts call for outside expertise, the appropriate independent qualified intermediary, CPA, attorney, lender, broker, or licensed securities professional remains responsible for that regulated work.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a href={PHONE_LINK} className={`${inter.className} inline-flex items-center bg-[#E85D24] px-7 py-3 text-sm font-semibold tracking-[0.08em] text-white uppercase transition hover:bg-[#D14D18]`}>
                      Talk to an Expert
                    </a>
                    <Link href={PROPERTY_LIST_LINK} className={`${inter.className} inline-flex items-center border-2 border-[#2D2D2D] px-7 py-3 text-sm font-semibold tracking-[0.08em] text-[#2D2D2D] uppercase transition hover:bg-[#2D2D2D] hover:text-white`}>
                      See Property Options
                    </Link>
                  </div>
                </div>
              </MotionDiv>
            </div>
          </div>
        </section>

        <section className="bg-white py-24" aria-labelledby="selling-reason-heading">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
            <MotionDiv delay={0.1} className="max-w-3xl">
              <p className={`${inter.className} mb-3 text-sm tracking-[0.26em] text-[#E85D24] uppercase`}>
                Start With the Real Reason
              </p>
              <h2 id="selling-reason-heading" className={`${ibmPlexSerif.className} text-3xl text-[#2D2D2D] sm:text-5xl`}>
                Why are you selling the Dallas property?
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[#2D2D2D]/75">
                The strongest replacement search begins with the problem the current property no longer solves—not a generic list of rules or available listings.
              </p>
            </MotionDiv>
            <div className="mt-12 grid gap-x-10 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
              {SALE_REASONS.map((reason, index) => (
                <MotionDiv key={reason.title} delay={0.15 + index * 0.04} className="border-t-2 border-[#E85D24] pt-5">
                  <h3 className={`${inter.className} text-lg font-semibold text-[#2D2D2D]`}>{reason.title}</h3>
                  <p className="mt-3 leading-relaxed text-[#2D2D2D]/70">{reason.description}</p>
                </MotionDiv>
              ))}
            </div>
            <MotionDiv delay={0.45} className="mt-12 flex flex-wrap gap-3">
              <a href={PHONE_LINK} className={`${inter.className} inline-flex items-center bg-[#1A3A32] px-7 py-3 text-sm font-semibold tracking-[0.08em] text-white uppercase transition hover:bg-[#E85D24]`}>
                Call {COMPANY_PHONE}
              </a>
              <Link href="/contact" className={`${inter.className} inline-flex items-center border-2 border-[#2D2D2D] px-7 py-3 text-sm font-semibold tracking-[0.08em] text-[#2D2D2D] uppercase transition hover:bg-[#2D2D2D] hover:text-white`}>
                Discuss the Planned Sale
              </Link>
            </MotionDiv>
          </div>
        </section>

        <section className="bg-[#F5F3EE] py-24" aria-labelledby="replacement-path-heading">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <MotionDiv delay={0.1} className="text-center">
              <p className={`${inter.className} mb-3 text-sm tracking-[0.26em] text-[#E85D24] uppercase`}>Choose the Ownership Experience</p>
              <h2 id="replacement-path-heading" className={`${ibmPlexSerif.className} text-3xl text-[#2D2D2D] sm:text-5xl`}>
                Compare each path against the same Dallas sale objective.
              </h2>
            </MotionDiv>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {REPLACEMENT_PATHS.map((path, index) => (
                <MotionDiv key={path.title} delay={0.15 + index * 0.08} className="flex h-full flex-col bg-white p-8 shadow-[0_18px_50px_rgba(45,45,45,0.08)]">
                  <p className={`${inter.className} text-xs tracking-[0.2em] text-[#E85D24] uppercase`}>{path.eyebrow}</p>
                  <h3 className={`${ibmPlexSerif.className} mt-4 text-3xl text-[#2D2D2D]`}>{path.title}</h3>
                  <p className="mt-5 leading-relaxed text-[#2D2D2D]/75">{path.description}</p>
                  <div className="mt-6 border-t border-[#2D2D2D]/10 pt-5">
                    <p className={`${inter.className} text-xs font-semibold tracking-[0.14em] text-[#2D2D2D]/55 uppercase`}>What to review</p>
                    <p className="mt-2 text-sm leading-relaxed text-[#2D2D2D]/70">{path.review}</p>
                  </div>
                </MotionDiv>
              ))}
            </div>
            <MotionDiv delay={0.45} className="mt-10 flex flex-wrap justify-center gap-3">
              <Link href={PROPERTY_LIST_LINK} className={`${inter.className} inline-flex items-center bg-[#E85D24] px-7 py-3 text-sm font-semibold tracking-[0.08em] text-white uppercase transition hover:bg-[#D14D18]`}>
                Get a Free Property List
              </Link>
              <a href={PHONE_LINK} className={`${inter.className} inline-flex items-center border-2 border-[#2D2D2D] px-7 py-3 text-sm font-semibold tracking-[0.08em] text-[#2D2D2D] uppercase transition hover:bg-[#2D2D2D] hover:text-white`}>
                Talk Through the Options
              </a>
            </MotionDiv>
          </div>
        </section>

        <section className="relative py-28" aria-labelledby="dst-heading">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/locations/1031-exchange-downtown-dallas-TX.avif"
              alt=""
              fill
              className="scale-105 object-cover blur-[2px]"
              sizes="100vw"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-[#1A3A32]/85" />
          </div>
          <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-5 text-white sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-12">
            <MotionDiv delay={0.1}>
              <p className={`${inter.className} mb-3 text-sm tracking-[0.26em] text-[#E85D24] uppercase`}>Passive Replacement Properties</p>
              <h2 id="dst-heading" className={`${ibmPlexSerif.className} text-4xl leading-tight text-white sm:text-5xl`}>
                Move beyond tenants, toilets, and trash.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
                A DST may provide access to professionally managed, institutional-grade real estate without personally handling tenants, maintenance, leasing, renovations, or emergency calls. Some current offerings may accept investments beginning around $100,000.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65">
                Availability, projected income, sponsor and property risk, fees, leverage, transfer restrictions, illiquidity, investor eligibility, and suitability vary by offering and require review through an appropriately licensed professional.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={PROPERTY_LIST_LINK} className={`${inter.className} inline-flex items-center bg-[#E85D24] px-7 py-3 text-sm font-semibold tracking-[0.08em] text-white uppercase transition hover:bg-[#D14D18]`}>
                  See Current DST Properties
                </Link>
                <a href={PHONE_LINK} className={`${inter.className} inline-flex items-center border-2 border-white px-7 py-3 text-sm font-semibold tracking-[0.08em] text-white uppercase transition hover:bg-white hover:text-[#1A3A32]`}>
                  Free Consultation: {COMPANY_PHONE}
                </a>
              </div>
            </MotionDiv>
            <MotionDiv delay={0.25} className="border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
              <h3 className={`${ibmPlexSerif.className} text-2xl text-white`}>A different kind of ownership experience</h3>
              <ul className="mt-6 space-y-5 text-white/85">
                <li className="border-b border-white/15 pb-5"><strong className="block text-white">No daily management</strong><span className="mt-1 block text-sm">The sponsor and property management team handle operations.</span></li>
                <li className="border-b border-white/15 pb-5"><strong className="block text-white">Institutional-grade assets</strong><span className="mt-1 block text-sm">Fractional ownership may provide access to properties that would be difficult to acquire individually.</span></li>
                <li><strong className="block text-white">Income-focused possibilities</strong><span className="mt-1 block text-sm">Compare projected distributions alongside fees, risk, leverage, concentration, and liquidity constraints.</span></li>
              </ul>
            </MotionDiv>
          </div>
        </section>

        <section className="bg-white py-24" aria-labelledby="process-heading">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
            <MotionDiv delay={0.1} className="text-center">
              <p className={`${inter.className} mb-3 text-sm tracking-[0.26em] text-[#E85D24] uppercase`}>From Planned Sale to Replacement Closing</p>
              <h2 id="process-heading" className={`${ibmPlexSerif.className} text-3xl text-[#2D2D2D] sm:text-5xl`}>
                How a 1031 exchange moves forward
              </h2>
            </MotionDiv>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {EXCHANGE_PATH.map((step, index) => (
                <MotionDiv key={step.title} delay={0.15 + index * 0.06} className="border border-[#2D2D2D]/10 bg-[#F5F3EE] p-7 sm:p-8">
                  <h3 className={`${ibmPlexSerif.className} text-2xl text-[#2D2D2D]`}>{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-[#2D2D2D]/70">{step.description}</p>
                </MotionDiv>
              ))}
            </div>
            <MotionDiv delay={0.45} className="mt-10 bg-[#1A3A32] p-8 text-center text-white sm:p-10">
              <h3 className={`${ibmPlexSerif.className} text-3xl text-white`}>Is this your first 1031 exchange?</h3>
              <p className="mx-auto mt-3 max-w-2xl text-white/80">Get free guidance through the sale, intermediary handoff, replacement search, identification period, diligence, and closing.</p>
              <a href={PHONE_LINK} className={`${inter.className} mt-6 inline-flex items-center bg-[#E85D24] px-7 py-3 text-sm font-semibold tracking-[0.08em] text-white uppercase transition hover:bg-[#D14D18]`}>
                Call a 1031 Expert: {COMPANY_PHONE}
              </a>
            </MotionDiv>
          </div>
        </section>

        <section className="bg-[#F5F3EE] py-24" aria-labelledby="solutions-heading">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
            <MotionDiv delay={0.1} className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <p className={`${inter.className} mb-3 text-sm tracking-[0.26em] text-[#E85D24] uppercase`}>Free Guidance. Practical Next Steps.</p>
                <h2 id="solutions-heading" className={`${ibmPlexSerif.className} text-3xl text-[#2D2D2D] sm:text-5xl`}>Dallas 1031 exchange solutions</h2>
              </div>
              <a href={PHONE_LINK} className={`${inter.className} text-sm font-semibold tracking-[0.08em] text-[#E85D24] underline underline-offset-4 uppercase`}>Call {COMPANY_PHONE}</a>
            </MotionDiv>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {SOLUTIONS.map((solution, index) => (
                <MotionDiv key={solution.title} delay={0.15 + index * 0.04}>
                  <Link href={solution.href} className="group flex h-full flex-col bg-white p-7 shadow-[0_14px_40px_rgba(45,45,45,0.06)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(45,45,45,0.1)]">
                    <h3 className={`${ibmPlexSerif.className} text-2xl text-[#2D2D2D] transition group-hover:text-[#E85D24]`}>{solution.title}</h3>
                    <p className="mt-3 flex-1 leading-relaxed text-[#2D2D2D]/70">{solution.description}</p>
                    <span className={`${inter.className} mt-6 text-sm font-semibold tracking-[0.08em] text-[#E85D24] uppercase`}>Learn more →</span>
                  </Link>
                </MotionDiv>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-24" aria-labelledby="locations-heading">
          <div className="mx-auto max-w-6xl px-5 text-center sm:px-8 lg:px-12">
            <MotionDiv delay={0.1}>
              <p className={`${inter.className} mb-3 text-sm tracking-[0.26em] text-[#E85D24] uppercase`}>Local Sale. Broader Replacement Search.</p>
              <h2 id="locations-heading" className={`${ibmPlexSerif.className} text-3xl text-[#2D2D2D] sm:text-5xl`}>Dallas-Fort Worth exchange assistance</h2>
            </MotionDiv>
          </div>
          <MotionDiv delay={0.2} className="mt-12">
            <div className="grid md:grid-cols-2">
              {FEATURED_LOCATIONS.map((location) => (
                <Link key={location.slug} href={`/locations/${location.slug}`} className="group relative aspect-[4/3] overflow-hidden">
                  <Image src={location.image} alt={`${location.name} 1031 exchange solutions`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-black/35 transition group-hover:bg-black/45" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className={`${ibmPlexSerif.className} text-3xl tracking-[0.08em] text-white uppercase`}>{location.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </MotionDiv>
          <div className="mt-10 flex flex-wrap justify-center gap-3 px-5">
            <Link href="/locations" className={`${inter.className} inline-flex items-center border-2 border-[#2D2D2D] px-7 py-3 text-sm font-semibold tracking-[0.08em] text-[#2D2D2D] uppercase transition hover:bg-[#2D2D2D] hover:text-white`}>View All Locations</Link>
            <Link href={PROPERTY_LIST_LINK} className={`${inter.className} inline-flex items-center bg-[#E85D24] px-7 py-3 text-sm font-semibold tracking-[0.08em] text-white uppercase transition hover:bg-[#D14D18]`}>Get a Free Property List</Link>
          </div>
        </section>

        <section className="bg-[#1A3A32] py-20 text-white" aria-labelledby="tools-heading">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
            <MotionDiv delay={0.1} className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className={`${inter.className} mb-3 text-sm tracking-[0.26em] text-[#E85D24] uppercase`}>Useful When the Basics Are Clear</p>
                <h2 id="tools-heading" className={`${ibmPlexSerif.className} text-3xl text-white sm:text-4xl`}>Exchange tools and calculators</h2>
                <p className="mt-4 text-white/75">Estimate potential boot, exchange costs, or replacement value after the sale facts and ownership goals have been organized.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <Link href="/tools/boot-calculator" className="border border-white/20 p-5 text-white transition hover:border-[#E85D24] hover:bg-white/5">Boot Calculator</Link>
                <Link href="/tools/exchange-cost-estimator" className="border border-white/20 p-5 text-white transition hover:border-[#E85D24] hover:bg-white/5">Cost Estimator</Link>
                <Link href="/tools/replacement-property-value-calculator" className="border border-white/20 p-5 text-white transition hover:border-[#E85D24] hover:bg-white/5">Replacement Value</Link>
              </div>
            </MotionDiv>
          </div>
        </section>

        <section className="bg-white py-24" aria-labelledby="faq-heading">
          <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-12">
            <MotionDiv delay={0.1} className="text-center">
              <p className={`${inter.className} mb-3 text-sm tracking-[0.26em] text-[#E85D24] uppercase`}>Questions Dallas Owners Ask</p>
              <h2 id="faq-heading" className={`${ibmPlexSerif.className} text-3xl text-[#2D2D2D] sm:text-5xl`}>1031 exchange and DST questions</h2>
            </MotionDiv>
            <MotionDiv delay={0.2} className="mt-10 space-y-2">
              {FAQ_ITEMS.map((item) => (
                <details key={item.question} className="group border-b border-[#2D2D2D]/15 py-2">
                  <summary className={`${inter.className} flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-lg font-medium text-[#2D2D2D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E85D24]`}>
                    {item.question}
                    <span aria-hidden="true" className="text-2xl font-light text-[#E85D24] transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-3xl pb-6 leading-relaxed text-[#2D2D2D]/70">{item.answer}</p>
                </details>
              ))}
            </MotionDiv>
          </div>
        </section>

        <section id="request-assistance" className="bg-[#F5F3EE] py-24" aria-labelledby="form-heading">
          <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
            <MotionDiv delay={0.1} className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
              <div className="lg:pt-8">
                <p className={`${inter.className} mb-3 text-sm tracking-[0.26em] text-[#E85D24] uppercase`}>Start Here</p>
                <h2 id="form-heading" className={`${ibmPlexSerif.className} text-3xl text-[#2D2D2D] sm:text-5xl`}>Get free 1031 exchange guidance</h2>
                <p className="mt-5 leading-relaxed text-[#2D2D2D]/75">Share the planned sale or the question that needs attention. The form is intentionally short.</p>
                <a href={PHONE_LINK} className={`${inter.className} mt-7 inline-flex items-center bg-[#1A3A32] px-7 py-3 text-sm font-semibold tracking-[0.08em] text-white uppercase transition hover:bg-[#E85D24]`}>Call {COMPANY_PHONE}</a>
              </div>
              <div className="bg-white p-7 shadow-xl sm:p-10">
                <ContactFormFields showHeading={false} />
              </div>
            </MotionDiv>
          </div>
        </section>
      </main>
      {[websiteJsonLd, faqJsonLd].map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </div>
  );
}
