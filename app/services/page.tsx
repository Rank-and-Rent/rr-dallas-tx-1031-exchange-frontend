import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { IBM_Plex_Serif, Inter } from "next/font/google";
import { getAllServices } from "@/lib/data/services";
import { getAllLocations } from "@/lib/data/locations";
import { Breadcrumbs } from "@/components/breadcrumbs";

const services = getAllServices();
import { ServiceSearchGrid } from "@/components/services/service-search-grid";
import { DeadlineCalculator } from "@/components/widgets/deadline-calculator";
import { IdentificationRulesExplainer } from "@/components/widgets/identification-rules";
import { IdentificationLetterHelper } from "@/components/widgets/identification-letter-helper";
import { TimelineTracker } from "@/components/widgets/timeline-tracker";
import {
  COMPANY_NAME,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  SERVICES_PATH,
  SITE_URL,
} from "@/lib/constants";

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Dallas 1031 Exchange Services | Nationwide Property Sourcing",
  description:
    "Dallas 1031 exchange services. Replacement property sourcing, timelines, financing, compliance. We help Dallas investors find properties in all 50 states.",
  keywords: [
    "1031 exchange services",
    "Dallas 1031 exchange",
    "replacement property sourcing",
    "1031 exchange coordination",
    "nationwide property sourcing",
  ],
  alternates: {
    canonical: `${SITE_URL}${SERVICES_PATH}`,
  },
  openGraph: {
    title: "Dallas 1031 Exchange Services | Nationwide Property Sourcing",
    description:
      "Dallas 1031 exchange services. Replacement property sourcing, timelines, financing, compliance. We help Dallas investors find properties in all 50 states.",
    url: `${SITE_URL}${SERVICES_PATH}`,
    siteName: COMPANY_NAME,
    images: [
      {
        url: `${SITE_URL}/1031-exchange-dallas-logo.png`,
        width: 1200,
        height: 630,
        alt: "Dallas 1031 Exchange Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dallas 1031 Exchange Services | Nationwide Property Sourcing",
    description: "Dallas 1031 exchange services. We help Dallas investors find properties in all 50 states.",
    images: [`${SITE_URL}/1031-exchange-dallas-logo.png`],
  },
};

export default function ServicesPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Dallas 1031 Exchange Services",
    description: "List of 1031 exchange services we provide to help Dallas investors find replacement properties in all 50 states",
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.name,
      url: `${SITE_URL}${SERVICES_PATH}/${service.slug}`,
    })),
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <div className="bg-[#F5F3EE] min-h-screen">
        {/* Hero Banner */}
        <section className="relative h-[40vh] min-h-[300px] flex items-end">
          <Image
            src="/locations/1031-exchange-downtown-dallas-TX.avif"
            alt="Dallas 1031 Exchange Services"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
          <div className="relative z-10 mx-auto max-w-6xl w-full px-4 sm:px-8 lg:px-12 pb-12">
            <Breadcrumbs items={breadcrumbItems} className="mb-4 [&_a]:text-white/80 [&_a:hover]:text-white [&_span]:text-white/60" />
            <p className={`${inter.className} text-sm uppercase tracking-[0.3em] text-[#E85D24] mb-2`}>
              Services
            </p>
            <h1 className={`${ibmPlexSerif.className} text-4xl text-white sm:text-5xl`}>
              1031 Exchange Services
            </h1>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12 py-16 space-y-20">
          <section className="space-y-6">
            <p className="max-w-3xl text-lg text-[#2D2D2D]/80">
              Redeploy capital with confidence. Our {services.length} service tracks
              cover replacement property discovery, underwriting, financing, and
              compliance. We help Dallas investors find replacement properties in all 50 states. Filter by
              timeline or asset type to find the program that fits your exchange.
            </p>
          </section>

          <ServiceSearchGrid services={services} />

          <section className="grid gap-8 lg:grid-cols-2">
            <DeadlineCalculator />
            <TimelineTracker />
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            <IdentificationRulesExplainer />
            <IdentificationLetterHelper />
          </section>

          <section className="bg-white p-8 shadow-lg">
            <div className="flex flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
              <div className="space-y-2">
                <h2 className={`${ibmPlexSerif.className} text-2xl text-[#2D2D2D]`}>
                  Need a curated replacement list?
                </h2>
                <p className="text-sm text-[#2D2D2D]/70">
                  Tell us what you are selling and we will prepare a Three Property
                  or 200 Percent identification package built for your timeline.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
                <Link
                  href="/contact?projectType=Custom%20Identification%20Plan"
                  className={`${inter.className} inline-flex items-center bg-[#E85D24] px-6 py-3 text-sm font-medium tracking-[0.1em] text-white uppercase transition hover:bg-[#D14D18]`}
                >
                  Request a plan
                </Link>
                <Link
                  href="/locations"
                  className={`${inter.className} inline-flex items-center border-2 border-[#2D2D2D] px-5 py-3 text-sm font-medium tracking-[0.1em] text-[#2D2D2D] uppercase transition hover:bg-[#2D2D2D] hover:text-white`}
                >
                  View all {getAllLocations().length} locations
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
