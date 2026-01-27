import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  IBM_Plex_Serif,
  Inter,
  Source_Sans_3,
  Pinyon_Script,
} from "next/font/google";
import { ServiceSearchGrid } from "@/components/services/service-search-grid";
import { getAllServices } from "@/lib/data/services";
import { MotionDiv } from "@/components/MotionDiv";
import { RotatingBenefits } from "@/components/RotatingBenefits";
import ContactFormFields from "@/components/contact/ContactFormFields";
import { COMPANY_NAME, COMPANY_PHONE, COMPANY_PHONE_DIGITS, COMPANY_EMAIL, SITE_URL, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/constants";
import { getPropertyTypeImagePath } from "@/lib/utils/images";

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

const PHONE_DISPLAY = COMPANY_PHONE;
const PHONE_LINK = `tel:+1${COMPANY_PHONE_DIGITS}`;

const TX_TAX_LINKS = [
  {
    label: "Texas Comptroller Property Tax Resources",
    href: "https://comptroller.texas.gov/taxes/property-tax/",
  },
  {
    label: "Dallas County Tax Office Guidelines",
    href: "https://www.dallascounty.org/departments/tax/property-tax/index.php",
  },
];

const IRS_LINKS = [
  {
    label: "IRS Form 8824 Instructions",
    href: "https://www.irs.gov/forms-pubs/about-form-8824",
  },
  {
    label: "IRS Like-Kind Exchange Overview",
    href: "https://www.irs.gov/businesses/small-businesses-self-employed/like-kind-exchanges-real-estate-tax-tips",
  },
];

const TOP_SERVICES = [
  {
    name: "Delayed 1031 Exchange Coordination",
    description:
      "Structure a compliant delayed exchange with timelines and escrow controls tailored to Texas transactions.",
    slug: "delayed-1031-exchange",
  },
  {
    name: "Reverse Exchange Structuring",
    description:
      "Secure your replacement asset first while we manage exchange accommodation and QI requirements.",
    slug: "reverse-1031-exchange",
  },
  {
    name: "Build-to-Suit Exchange Support",
    description:
      "Coordinate construction or improvement exchanges with disciplined draw schedules and documentation.",
    slug: "build-to-suit-1031-exchange",
  },
  {
    name: "Multi-Property Portfolio Planning",
    description:
      "Align multiple dispositions and acquisitions with Texas market insight and investor objectives.",
    slug: "portfolio-1031-planning",
  },
  {
    name: "Qualified Intermediary Placement",
    description:
      "Access vetted Texas-qualified intermediaries with secure handling of exchange proceeds.",
    slug: "qualified-intermediary-placement",
  },
  {
    name: "Trusted Advisor Coordination",
    description:
      "Coordinate with attorneys, CPAs, and lenders to keep every stakeholder aligned through closing.",
    slug: "advisor-coordination",
  },
];

const PROPERTY_TYPES = [
  {
    name: "Multifamily Communities",
    description:
      "Stabilize and upgrade multifamily portfolios with replacement assets across major Texas metros.",
    slug: "multifamily",
  },
  {
    name: "Industrial and Flex",
    description:
      "Defer gains while moving into logistics, warehouse, and light manufacturing properties.",
    slug: "industrial",
  },
  {
    name: "Office and Medical",
    description:
      "Exchange into professional office, medical office, and specialized clinical facilities.",
    slug: "office-medical",
  },
  {
    name: "Retail and Mixed-Use",
    description:
      "Reposition capital into street retail, neighborhood centers, and mixed-use developments.",
    slug: "retail-mixed-use",
  },
  {
    name: "Land and Development Parcels",
    description:
      "Secure entitled land or infill redevelopment opportunities within IRS timing rules.",
    slug: "land-development",
  },
  {
    name: "Hospitality Assets",
    description:
      "Transition between hotel, extended stay, or resort holdings with precise QI coordination.",
    slug: "hospitality",
  },
];

const TX_CITIES_SLUGS = [
  { name: "Dallas", slug: "dallas-tx" },
  { name: "Fort Worth", slug: "fort-worth-tx" },
  { name: "Plano", slug: "plano-tx" },
  { name: "Frisco", slug: "frisco-tx" },
  { name: "Arlington", slug: "arlington-tx" },
  { name: "Irving", slug: "irving-tx" },
  { name: "Austin", slug: "austin" },
  { name: "Houston", slug: "houston" },
  { name: "San Antonio", slug: "san-antonio" },
];

// Locations with images for the grid
const FEATURED_LOCATIONS = [
  { name: "Dallas", slug: "dallas-tx", image: "/locations/1031-exchange-dallas-TX.webp" },
  { name: "Fort Worth", slug: "fort-worth-tx", image: "/locations/1031-exchange-fort-worth-TX.jpg" },
  { name: "Plano", slug: "plano-tx", image: "/locations/1031-exchange-plano-TX.jpg" },
  { name: "Frisco", slug: "frisco-tx", image: "/locations/1031-exchange-frisco-TX.jpg" },
  { name: "Arlington", slug: "arlington-tx", image: "/locations/1031-exchange-arlington-TX.jpg" },
  { name: "Irving", slug: "irving-tx", image: "/locations/1031-exchange-irving-TX.jpg" },
];

const FAQ_ITEMS = [
  {
    question: "What are the 45 and 180 day deadlines?",
    answer:
      "You must identify replacement property within 45 calendar days of the sale and complete all closings within 180 calendar days or by the due date of your federal return, whichever comes first.",
  },
  {
    question: "What qualifies as like-kind property?",
    answer:
      "Real property held for investment or productive use in a trade or business qualifies as like-kind to other real property with the same use, regardless of asset class, as long as both properties are within the United States.",
  },
  {
    question: "What is taxable boot?",
    answer:
      "Boot is any non-like-kind value received in the exchange, including cash, debt relief, or personal property. Boot is generally taxable in the year of the exchange.",
  },
  {
    question: "How do state and county taxes apply?",
    answer:
      "A 1031 exchange defers federal and Texas income tax on qualifying real property. County and municipal transfer taxes, filing fees, and documentary stamp taxes still apply where assessed.",
  },
  {
    question: "Can I complete a reverse exchange?",
    answer:
      "Reverse exchanges are permitted when you acquire the replacement property before selling the relinquished property, using an exchange accommodation titleholder and compliant documentation.",
  },
  {
    question: "How is Form 8824 filed?",
    answer:
      "Form 8824 is filed with your federal return for the tax year in which the relinquished property was transferred. It reports timelines, property details, and the calculation of deferred gain.",
  },
];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "@id": `${SITE_URL}#organization`,
  name: COMPANY_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/1031-exchange-dallas-logo.png`,
  image: `${SITE_URL}/1031-exchange-dallas-logo.png`,
  telephone: `+1-${COMPANY_PHONE_DIGITS.slice(0, 3)}-${COMPANY_PHONE_DIGITS.slice(3, 6)}-${COMPANY_PHONE_DIGITS.slice(6)}`,
  email: COMPANY_EMAIL,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: `+1-${COMPANY_PHONE_DIGITS.slice(0, 3)}-${COMPANY_PHONE_DIGITS.slice(3, 6)}-${COMPANY_PHONE_DIGITS.slice(6)}`,
      contactType: "customer service",
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
      availableLanguage: ["English"],
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "9101 Lyndon B Johnson Fwy",
    addressLocality: PRIMARY_CITY,
    addressRegion: PRIMARY_STATE_ABBR,
    postalCode: "75243",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  serviceType: "1031 Exchange Services",
  description: "1031 exchange services helping Dallas investors find replacement properties in all 50 states",
  sameAs: [],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": COMPANY_NAME,
  "url": SITE_URL,
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${SITE_URL}search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const jsonLdBlocks = [
  { id: "organization", data: organizationJsonLd },
  { id: "website", data: websiteJsonLd },
  { id: "faq", data: faqJsonLd },
];

const isStaffedOffice = false;

export const metadata: Metadata = {
  title: "Dallas 1031 Exchange Services | Nationwide Property Sourcing",
  description:
    "Dallas 1031 exchange services. Help Dallas investors find replacement properties in all 50 states. Compliant exchanges, expert coordination, timeline control.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Dallas 1031 Exchange Services | Nationwide Property Sourcing",
    description:
      "Dallas 1031 exchange services. Help Dallas investors find replacement properties in all 50 states. Compliant exchanges, expert coordination.",
    url: SITE_URL,
    siteName: COMPANY_NAME,
    images: [
      {
        url: `${SITE_URL}/1031-exchange-dallas-logo.png`,
        width: 1200,
        height: 630,
        alt: `${COMPANY_NAME} - Dallas 1031 Exchange Services`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dallas 1031 Exchange Services | Nationwide Property Sourcing",
    description:
      "Dallas 1031 exchange services. Help Dallas investors find replacement properties in all 50 states.",
    images: [`${SITE_URL}/1031-exchange-dallas-logo.png`],
  },
};

type HomeProps = {
  searchParams?: {
    status?: string;
    message?: string;
  };
};

export default function Home({ searchParams }: HomeProps) {
  const status = searchParams?.status;
  const statusMessage =
    status === "success"
      ? "Thank you. A 1031 exchange specialist will respond shortly."
      : status === "error"
        ? searchParams?.message ??
          "We could not submit your request. Please call us or try again."
        : null;

  return (
    <div
      className={`${sourceSans.className} ${ibmPlexSerif.variable} ${inter.variable} ${pinyonScript.variable} bg-[#F5F3EE] text-[#2D2D2D]`}
    >
      <link rel="canonical" href={SITE_URL} />
      <main className="flex min-h-screen w-full flex-col">
        {/* Hero Section - Full width video background with centered logo badge */}
        <section
          className="relative flex min-h-screen items-center justify-center overflow-hidden"
          aria-labelledby="hero-heading"
        >
          {/* Video Background */}
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
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Centered Content - Circular Badge Style */}
          <div className="relative z-10 flex flex-col items-center text-center px-4">
            <MotionDiv delay={0.1} className="flex flex-col items-center">
              {/* Circular Badge with rotating text */}
              <div className="relative mb-8">
                {/* Outer rotating text - complete circle */}
                <svg className="h-72 w-72 animate-spin-slow" viewBox="0 0 200 200">
                  <defs>
                    <path
                      id="circlePath"
                      d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                    />
                  </defs>
                  <text className="fill-white text-[9px] uppercase tracking-[0.35em]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <textPath href="#circlePath">
                      SERVING DALLAS • SINCE 2020 • NATIONWIDE COVERAGE • 1031 EXPERTS •
                    </textPath>
                  </text>
                </svg>
                {/* Center logo text - Elegant script like Buse Agency */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`font-[family-name:var(--font-pinyon-script)] text-6xl text-[#E85D24]`}>
                    1031
                  </span>
                  <span className={`font-[family-name:var(--font-pinyon-script)] text-5xl text-[#E85D24] -mt-2`}>
                    Exchange
                  </span>
                </div>
              </div>

              <p className={`${inter.className} mb-6 text-sm tracking-[0.3em] text-white/90 uppercase`}>
                Bespoke 1031 Exchange Services
              </p>

              <Link
                href="/services"
                className={`${inter.className} group inline-flex items-center border-b-2 border-white pb-2 text-sm tracking-[0.2em] text-white transition-colors hover:border-[#E85D24] hover:text-[#E85D24]`}
              >
                SEARCH ALL SERVICES
              </Link>
            </MotionDiv>
          </div>
          <div className="sr-only">
            <h1 id="hero-heading">Dallas 1031 Exchange Specialists - Serving Dallas Investors Nationwide</h1>
          </div>
        </section>

        {/* Trusted Experts Section - Stats */}
        <section className="bg-white py-24" aria-labelledby="trusted-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12">
            <MotionDiv delay={0.1} className="text-center">
              <p className={`${inter.className} mb-4 text-sm tracking-[0.3em] text-[#E85D24] uppercase`}>
                Let Us Guide Your Exchange
              </p>
              <h2
                id="trusted-heading"
                className={`${ibmPlexSerif.className} mb-6 text-4xl text-[#2D2D2D] sm:text-5xl`}
              >
                Trusted Real Estate Experts
              </h2>
              <p className="mx-auto mb-16 max-w-3xl text-lg text-[#2D2D2D]/80">
                {COMPANY_NAME} offers the highest level of knowledge and outstanding representation to clients.
                Our team&apos;s perspective, acute discretion, and highly productive representation are unparalleled.
              </p>
            </MotionDiv>

            <MotionDiv delay={0.2}>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="text-center">
                  <p className={`${ibmPlexSerif.className} mb-2 text-4xl font-light tracking-wide text-[#2D2D2D]`}>
                    5 STARS
                  </p>
                  <p className={`${inter.className} text-sm tracking-[0.15em] text-[#2D2D2D]/60 uppercase`}>
                    On All Reviews
                  </p>
                </div>
                <div className="text-center">
                  <p className={`${ibmPlexSerif.className} mb-2 text-4xl font-light tracking-wide text-[#2D2D2D]`}>
                    TOP 1%
                  </p>
                  <p className={`${inter.className} text-sm tracking-[0.15em] text-[#2D2D2D]/60 uppercase`}>
                    Of Exchange Coordinators
                  </p>
                </div>
                <div className="text-center">
                  <p className={`${ibmPlexSerif.className} mb-2 text-4xl font-light tracking-wide text-[#2D2D2D]`}>
                    50 STATES
                  </p>
                  <p className={`${inter.className} text-sm tracking-[0.15em] text-[#2D2D2D]/60 uppercase`}>
                    Nationwide Coverage
                  </p>
                </div>
              </div>
            </MotionDiv>
          </div>
        </section>

        {/* Get To Know Section - Overlapping image with card */}
        <section className="bg-[#F5F3EE] py-16" aria-labelledby="about-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              {/* Image side */}
              <MotionDiv delay={0.1} className="relative">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/locations/1031-exchange-dallas-TX.webp"
                    alt="Dallas skyline - 1031 Exchange Services"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </MotionDiv>

              {/* Content card - overlapping */}
              <MotionDiv delay={0.2} className="relative lg:-ml-24">
                <div className="bg-white/95 p-10 shadow-lg backdrop-blur-sm lg:p-12">
                  <p className={`${inter.className} mb-4 text-sm tracking-[0.3em] text-[#E85D24] uppercase`}>
                    Get To Know
                  </p>
                  <h2
                    id="about-heading"
                    className={`${ibmPlexSerif.className} mb-6 text-3xl text-[#2D2D2D] sm:text-4xl`}
                  >
                    {COMPANY_NAME}
                  </h2>
                  <p className="mb-8 text-[#2D2D2D]/80 leading-relaxed">
                    Our clients trust our upfront approach and value our input when addressing all aspects of a transaction.
                    We strive to negotiate the best terms for our clients. When met with a tough challenge we are creative,
                    strategic, and skillful in working through issues.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/services"
                      className={`${inter.className} inline-flex items-center border-2 border-[#2D2D2D] px-8 py-3 text-sm tracking-[0.15em] text-[#2D2D2D] transition-colors hover:bg-[#2D2D2D] hover:text-white uppercase`}
                    >
                      Learn More
                    </Link>
                    <Link
                      href="/contact"
                      className={`${inter.className} inline-flex items-center bg-[#E85D24] px-8 py-3 text-sm tracking-[0.15em] text-white transition-colors hover:bg-[#D14D18] uppercase`}
                    >
                      Inquire Now
                    </Link>
                  </div>
                </div>
              </MotionDiv>
            </div>
          </div>
        </section>

        {/* Benefits Section - Rotating benefits instead of testimonials */}
        <section className="relative bg-[#F5F3EE] py-24" aria-labelledby="benefits-heading">
          {/* Decorative accent shape */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
            <div className="h-64 w-32 rounded-full bg-[#E8C8A0]/30" />
          </div>

          <div className="mx-auto max-w-4xl px-4 text-center sm:px-8 lg:px-12">
            <MotionDiv delay={0.1}>
              <h2 id="benefits-heading" className="sr-only">Benefits of 1031 Exchanges</h2>
              <RotatingBenefits />
            </MotionDiv>
          </div>
        </section>

        {/* Three Card Portfolio Section */}
        <section className="bg-[#F5F3EE] py-20" aria-labelledby="portfolio-heading">
          <h2 id="portfolio-heading" className="sr-only">Explore Our Services</h2>
          <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
            <MotionDiv delay={0.1}>
              <div className="grid gap-4 md:grid-cols-3">
                {/* Our Services Card - with Dallas skyline image */}
                <Link
                  href="/services"
                  className="group relative aspect-[4/5] overflow-hidden"
                >
                  <Image
                    src="/locations/1031-exchange-downtown-dallas-TX.avif"
                    alt="Our Services - Dallas 1031 Exchange"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute inset-6 border border-white/40 transition-all group-hover:inset-5" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <span className={`${inter.className} text-xl tracking-[0.4em] text-white uppercase font-light`}>
                      Our Services
                    </span>
                    <span className={`${inter.className} text-xs tracking-[0.2em] text-white/70 uppercase opacity-0 group-hover:opacity-100 transition-opacity`}>
                      Explore →
                    </span>
                  </div>
                </Link>

                {/* Service Areas Card - with Fort Worth image */}
                <Link
                  href="/locations"
                  className="group relative aspect-[4/5] overflow-hidden"
                >
                  <Image
                    src="/locations/1031-exchange-fort-worth-TX.jpg"
                    alt="Service Areas - Texas Locations"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute inset-6 border border-white/40 transition-all group-hover:inset-5" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <span className={`${inter.className} text-xl tracking-[0.4em] text-white uppercase font-light`}>
                      Service Areas
                    </span>
                    <span className={`${inter.className} text-xs tracking-[0.2em] text-white/70 uppercase opacity-0 group-hover:opacity-100 transition-opacity`}>
                      Explore →
                    </span>
                  </div>
                </Link>

                {/* Property Types Card - with multifamily image */}
                <Link
                  href="/property-types"
                  className="group relative aspect-[4/5] overflow-hidden"
                >
                  <Image
                    src="/property-types/1031-exchange-multifamily-Dallas-TX.jpg"
                    alt="Property Types - Investment Properties"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute inset-6 border border-white/40 transition-all group-hover:inset-5" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <span className={`${inter.className} text-xl tracking-[0.4em] text-white uppercase font-light`}>
                      Property Types
                    </span>
                    <span className={`${inter.className} text-xs tracking-[0.2em] text-white/70 uppercase opacity-0 group-hover:opacity-100 transition-opacity`}>
                      Explore →
                    </span>
                  </div>
                </Link>
              </div>
            </MotionDiv>
          </div>
        </section>

        {/* Locations We Serve Section - Full Width Grid */}
        <section aria-labelledby="locations-heading" className="bg-white py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12 text-center">
            <MotionDiv delay={0.1}>
              <h2
                id="locations-heading"
                className={`${ibmPlexSerif.className} mb-12 text-3xl text-[#2D2D2D] sm:text-4xl`}
              >
                Locations We Serve
              </h2>
            </MotionDiv>
          </div>
          <MotionDiv delay={0.2}>
            <div className="grid md:grid-cols-2">
              {FEATURED_LOCATIONS.map((location) => (
                <Link
                  key={location.slug}
                  href={`/locations/${location.slug}`}
                  className="group relative aspect-[4/3] overflow-hidden"
                >
                  <Image
                    src={location.image}
                    alt={location.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <h3 className={`${ibmPlexSerif.className} text-3xl tracking-[0.15em] text-white uppercase`}>
                      {location.name}
                    </h3>
                    <span className={`${inter.className} border border-white px-6 py-3 text-sm tracking-[0.2em] text-white uppercase transition-colors group-hover:bg-white group-hover:text-[#2D2D2D]`}>
                      Learn More
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </MotionDiv>
          <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12 text-center mt-12">
            <Link
              href="/locations"
              className={`${inter.className} inline-flex items-center border-2 border-[#2D2D2D] px-8 py-3 text-sm tracking-[0.15em] text-[#2D2D2D] transition-colors hover:bg-[#2D2D2D] hover:text-white uppercase`}
            >
              View All Locations
            </Link>
          </div>
        </section>

        {/* Property Types Section */}
        <section aria-labelledby="property-heading" className="bg-[#F5F3EE] py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12">
            <MotionDiv delay={0.1}>
              <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className={`${inter.className} mb-2 text-sm tracking-[0.3em] text-[#E85D24] uppercase`}>
                    Investment Options
                  </p>
                  <h2
                    id="property-heading"
                    className={`${ibmPlexSerif.className} text-3xl text-[#2D2D2D] sm:text-4xl`}
                  >
                    Qualifying Property Types
                  </h2>
                </div>
                <Link
                  href="/property-types"
                  className={`${inter.className} text-sm tracking-[0.1em] text-[#E85D24] underline underline-offset-4 transition hover:text-[#D14D18] uppercase`}
                >
                  Explore property types
                </Link>
              </div>
            </MotionDiv>
            <MotionDiv delay={0.2}>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {PROPERTY_TYPES.map((property) => {
                  const slugMap: Record<string, string> = {
                    'office-medical': 'office',
                    'retail-mixed-use': 'retail',
                    'land-development': 'land',
                  };
                  const actualSlug = slugMap[property.slug] || property.slug;
                  const imagePath = getPropertyTypeImagePath(actualSlug);

                  return (
                    <article
                      key={property.slug}
                      className="group overflow-hidden bg-white"
                    >
                      {imagePath && (
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={imagePath}
                            alt={`${property.name} properties in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3
                          className={`${inter.className} mb-2 text-lg font-semibold text-[#2D2D2D]`}
                        >
                          {property.name}
                        </h3>
                        <p className="mb-4 text-sm text-[#2D2D2D]/70">
                          {property.description}
                        </p>
                        <Link
                          href={`/property-types/${property.slug}`}
                          className={`${inter.className} text-sm text-[#E85D24] underline underline-offset-4 transition hover:text-[#D14D18]`}
                          aria-label={`Learn about ${property.name} exchanges`}
                        >
                          Learn more
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </MotionDiv>
          </div>
        </section>

        {/* Let's Connect CTA Section - Blurred Background Style */}
        <section className="relative py-32" aria-labelledby="connect-heading">
          {/* Background with blur effect */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/locations/1031-exchange-dallas-TX.webp"
              alt=""
              fill
              className="object-cover blur-sm scale-105"
              sizes="100vw"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-[#6B7B3D]/60" />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-8 lg:px-12">
            <MotionDiv delay={0.1} className="flex flex-col items-center">
              {/* Circular Badge */}
              <div className="relative mb-8">
                <svg className="h-48 w-48 animate-spin-slow" viewBox="0 0 200 200">
                  <defs>
                    <path
                      id="connectCirclePath"
                      d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                    />
                  </defs>
                  <text className="fill-white text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <textPath href="#connectCirclePath">
                      SERVING DALLAS • SINCE 2020 • NATIONWIDE COVERAGE • 1031 EXPERTS •
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`font-[family-name:var(--font-pinyon-script)] text-5xl text-[#E85D24]`}>
                    1031
                  </span>
                  <span className={`font-[family-name:var(--font-pinyon-script)] text-4xl text-[#E85D24] -mt-1`}>
                    Exchange
                  </span>
                </div>
              </div>

              <p className="mb-8 max-w-2xl text-lg text-white/90">
                Specializing in investment properties, commercial real estate, and land exchanges,
                {COMPANY_NAME} sets itself apart by providing an exceptional 1031 exchange experience.
              </p>

              <Link
                href="/contact"
                className={`${inter.className} inline-flex items-center border-2 border-white px-10 py-4 text-sm tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-[#2D2D2D] uppercase`}
              >
                Let&apos;s Connect
              </Link>
            </MotionDiv>
          </div>
          <h2 id="connect-heading" className="sr-only">Connect with {COMPANY_NAME}</h2>
        </section>

        {/* Why Choose Us Section */}
        <section aria-labelledby="why-heading" className="bg-white py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12">
            <MotionDiv delay={0.1}>
              <p className={`${inter.className} mb-4 text-center text-sm tracking-[0.3em] text-[#E85D24] uppercase`}>
                Unparalleled
              </p>
              <h2
                id="why-heading"
                className={`${ibmPlexSerif.className} mb-16 text-center text-3xl text-[#2D2D2D] sm:text-4xl`}
              >
                Why Texas Investors Choose {COMPANY_NAME}
              </h2>
            </MotionDiv>
            <MotionDiv delay={0.2}>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Nationwide Property Sourcing",
                    description: "We help Dallas investors find replacement properties in all 50 states.",
                  },
                  {
                    title: "IRS-Compliant Process",
                    description:
                      "All documentation and deadlines managed.",
                  },
                  {
                    title: "Qualified Intermediary Network",
                    description:
                      "Secure funds with vetted partners.",
                  },
                  {
                    title: "Attorney and CPA Coordination",
                    description:
                      "Local professionals available on request.",
                  },
                  {
                    title: "Timeline Discipline",
                    description:
                      "Structured milestones from sale to close.",
                  },
                ].map((feature) => (
                  <div
                    key={feature.title}
                    className="group border-t-2 border-[#E85D24] pt-6"
                  >
                    <h3
                      className={`${inter.className} mb-3 text-lg font-semibold tracking-wide text-[#2D2D2D]`}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-[#2D2D2D]/70">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </MotionDiv>
            <MotionDiv delay={0.3} className="mt-12">
              <p className="text-sm text-[#2D2D2D]/70">
                A 1031 exchange defers federal and Texas income tax on qualifying real
                property. It does not remove county or state transfer taxes.{" "}
                {TX_TAX_LINKS.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-medium text-[#E85D24] underline underline-offset-4 transition hover:text-[#D14D18]"
                  >
                    {link.label}
                    {index < TX_TAX_LINKS.length - 1 ? ", " : "."}
                  </Link>
                ))}
              </p>
            </MotionDiv>
          </div>
        </section>

        {/* Process Section */}
        <section aria-labelledby="process-heading" className="bg-[#F5F3EE] py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12">
            <MotionDiv delay={0.1}>
              <h2
                id="process-heading"
                className={`${ibmPlexSerif.className} mb-16 text-center text-3xl text-[#2D2D2D] sm:text-4xl`}
              >
                How the 1031 Exchange Process Works
              </h2>
            </MotionDiv>
            <div className="grid gap-8 lg:grid-cols-3">
              {[
                {
                  title: "Sell the Relinquished Property",
                  description:
                    "Proceeds go to a qualified intermediary.",
                },
                {
                  title: "Identify Replacements Within 45 Days",
                  description:
                    "Submit formal identification list.",
                },
                {
                  title: "Close Within 180 Days",
                  description:
                    "Acquire your new property under IRS timelines.",
                },
              ].map((step, index) => (
                <MotionDiv
                  key={step.title}
                  delay={0.2 + index * 0.1}
                  className="relative bg-white p-8"
                >
                  <span
                    className={`${ibmPlexSerif.className} absolute -top-4 left-8 text-6xl font-light text-[#E85D24]/20`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="relative pt-8">
                    <h3
                      className={`${inter.className} mb-3 text-lg font-semibold text-[#2D2D2D]`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[#2D2D2D]/70">
                      {step.description}
                    </p>
                  </div>
                </MotionDiv>
              ))}
            </div>
            <MotionDiv delay={0.5} className="mt-12">
              <div className="bg-[#1A3A32] p-8 text-white">
                <p className={`${inter.className} mb-4 font-medium`}>
                  Learn more with IRS Form 8824 and Like-Kind Property guidelines.
                </p>
                <ul className="flex flex-wrap gap-6">
                  {IRS_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/80 underline underline-offset-4 transition hover:text-[#E85D24]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </MotionDiv>
          </div>
        </section>

        {/* Services Section */}
        <section aria-labelledby="services-heading" className="bg-white py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12">
            <MotionDiv delay={0.1}>
              <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className={`${inter.className} mb-2 text-sm tracking-[0.3em] text-[#E85D24] uppercase`}>
                    What We Offer
                  </p>
                  <h2
                    id="services-heading"
                    className={`${ibmPlexSerif.className} text-3xl text-[#2D2D2D] sm:text-4xl`}
                  >
                    Exchange Services for Texas Investors
                  </h2>
                </div>
                <Link
                  href="/services"
                  className={`${inter.className} text-sm tracking-[0.1em] text-[#E85D24] underline underline-offset-4 transition hover:text-[#D14D18] uppercase`}
                >
                  View all {getAllServices().length} services
                </Link>
              </div>
            </MotionDiv>
            <MotionDiv delay={0.2}>
              <ServiceSearchGrid services={getAllServices().slice(0, 6)} compact />
            </MotionDiv>
          </div>
        </section>

        {/* Tools Section */}
        <section
          aria-labelledby="tools-heading"
          className="bg-[#1A3A32] py-24 text-white"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12">
            <MotionDiv delay={0.1}>
              <p className={`${inter.className} mb-2 text-sm tracking-[0.3em] text-[#E85D24] uppercase`}>
                Resources
              </p>
              <h2
                id="tools-heading"
                className={`${ibmPlexSerif.className} mb-6 text-3xl text-white sm:text-4xl`}
              >
                Exchange Tools and Calculators
              </h2>
            </MotionDiv>
            <MotionDiv delay={0.2}>
              <p className="mb-12 max-w-3xl text-white/80">
                Use our interactive calculators to estimate costs, calculate boot, validate
                identification rules, estimate depreciation recapture, and calculate replacement property values.
              </p>
            </MotionDiv>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <MotionDiv delay={0.3}>
                <Link
                  href="/tools/boot-calculator"
                  className="group block bg-white/10 p-8 transition-colors hover:bg-white/20"
                >
                  <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#E85D24] text-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M9 9h6v6H9z" />
                    </svg>
                  </span>
                  <h3 className={`${ibmPlexSerif.className} mb-2 text-xl text-white`}>
                    Boot Calculator
                  </h3>
                  <p className="mb-4 text-sm text-white/70">
                    Calculate boot including cash received and mortgage relief.
                  </p>
                  <span className={`${inter.className} text-sm text-[#E85D24]`}>
                    Open calculator →
                  </span>
                </Link>
              </MotionDiv>
              <MotionDiv delay={0.35}>
                <Link
                  href="/tools/exchange-cost-estimator"
                  className="group block bg-white/10 p-8 transition-colors hover:bg-white/20"
                >
                  <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#E85D24] text-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </span>
                  <h3 className={`${ibmPlexSerif.className} mb-2 text-xl text-white`}>
                    Exchange Cost Estimator
                  </h3>
                  <p className="mb-4 text-sm text-white/70">
                    Estimate QI fees, escrow costs, title insurance, and recording fees.
                  </p>
                  <span className={`${inter.className} text-sm text-[#E85D24]`}>
                    Open estimator →
                  </span>
                </Link>
              </MotionDiv>
              <MotionDiv delay={0.4}>
                <Link
                  href="/tools/identification-rules-checker"
                  className="group block bg-white/10 p-8 transition-colors hover:bg-white/20"
                >
                  <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#E85D24] text-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </span>
                  <h3 className={`${ibmPlexSerif.className} mb-2 text-xl text-white`}>
                    Identification Rules Checker
                  </h3>
                  <p className="mb-4 text-sm text-white/70">
                    Validate your identification against the three property, 200 percent, or 95 percent rules.
                  </p>
                  <span className={`${inter.className} text-sm text-[#E85D24]`}>
                    Open checker →
                  </span>
                </Link>
              </MotionDiv>
            </div>
            <MotionDiv delay={0.55} className="mt-8">
              <Link
                href="/tools"
                className={`${inter.className} text-sm tracking-[0.1em] text-[#E85D24] underline underline-offset-4 transition hover:text-white uppercase`}
              >
                View all tools
              </Link>
            </MotionDiv>
          </div>
        </section>

        {/* FAQ Section */}
        <section aria-labelledby="faq-heading" className="bg-white py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-8 lg:px-12">
            <MotionDiv delay={0.1}>
              <p className={`${inter.className} mb-2 text-center text-sm tracking-[0.3em] text-[#E85D24] uppercase`}>
                Common Questions
              </p>
              <h2
                id="faq-heading"
                className={`${ibmPlexSerif.className} mb-12 text-center text-3xl text-[#2D2D2D] sm:text-4xl`}
              >
                Frequently Asked Questions
              </h2>
            </MotionDiv>
            <MotionDiv delay={0.2}>
              <div className="space-y-4">
                {FAQ_ITEMS.map((item, index) => (
                  <details
                    key={item.question}
                    className="group border-b border-[#2D2D2D]/10 pb-4"
                  >
                    <summary
                      className={`${inter.className} cursor-pointer py-4 text-lg font-medium text-[#2D2D2D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E85D24]`}
                    >
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}.{" "}
                      {item.question}
                    </summary>
                    <p className="pb-4 text-[#2D2D2D]/70">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </MotionDiv>
          </div>
        </section>

        {/* Contact Form Section */}
        <section
          id="request-assistance"
          aria-labelledby="form-heading"
          className="bg-[#F5F3EE] py-24"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-8 lg:px-12">
            <MotionDiv delay={0.1}>
              <p className={`${inter.className} mb-2 text-center text-sm tracking-[0.3em] text-[#E85D24] uppercase`}>
                Get Started
              </p>
              <h2
                id="form-heading"
                className={`${ibmPlexSerif.className} mb-12 text-center text-3xl text-[#2D2D2D] sm:text-4xl`}
              >
                Request 1031 Exchange Assistance
              </h2>
            </MotionDiv>
            <MotionDiv delay={0.25}>
              <div className="bg-white p-8 shadow-lg sm:p-12">
                <ContactFormFields showHeading={false} />
              </div>
            </MotionDiv>
          </div>
        </section>

        {/* NO FOOTER HERE - Footer is in layout.tsx via SiteFooter component */}
      </main>
      {jsonLdBlocks.map((script) => (
        <script
          key={script.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(script.data) }}
        />
      ))}
    </div>
  );
}
