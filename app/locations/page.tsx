import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { IBM_Plex_Serif, Inter } from "next/font/google";
import { getAllLocations } from "@/lib/data/locations";
import { getAllServices } from "@/lib/data/services";
import { LocationSearchGrid } from "@/components/locations/location-search-grid";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  COMPANY_NAME,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  CONTACT_PATH,
  LOCATIONS_PATH,
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

const locations = getAllLocations();
const LOCATION_COUNT = locations.length;

export const metadata: Metadata = {
  title: "Dallas 1031 Exchange Locations | Nationwide Property Sourcing",
  description:
    "Dallas 1031 exchange locations. We help Dallas investors find replacement properties in all 50 states. Serving Uptown, Legacy West, Las Colinas, and nationwide.",
  keywords: [
    "Dallas 1031 exchange locations",
    "1031 exchange locations",
    "Dallas replacement property",
    "nationwide 1031 exchange",
    "all 50 states",
  ],
  alternates: {
    canonical: `${SITE_URL}${LOCATIONS_PATH}`,
  },
  openGraph: {
    title: "Dallas 1031 Exchange Locations | Nationwide Property Sourcing",
    description:
      "Dallas 1031 exchange locations. We help Dallas investors find replacement properties in all 50 states.",
    url: `${SITE_URL}${LOCATIONS_PATH}`,
    siteName: COMPANY_NAME,
    images: [
      {
        url: `${SITE_URL}/1031-exchange-dallas-logo.png`,
        width: 1200,
        height: 630,
        alt: "Dallas 1031 Exchange Locations",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dallas 1031 Exchange Locations | Nationwide Property Sourcing",
    description: "Dallas 1031 exchange locations. We help Dallas investors find replacement properties in all 50 states.",
    images: [`${SITE_URL}/1031-exchange-dallas-logo.png`],
  },
};

export default function LocationsPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Dallas 1031 Exchange Locations",
    description: "List of locations where we help Dallas investors find 1031 exchange replacement properties",
    numberOfItems: LOCATION_COUNT,
    itemListElement: locations.map((location, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: location.name,
      url: `${SITE_URL}${LOCATIONS_PATH}/${location.slug}`,
    })),
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Locations", href: "/locations" },
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
            src="/locations/1031-exchange-fort-worth-TX.jpg"
            alt="Dallas 1031 Exchange Locations"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
          <div className="relative z-10 mx-auto max-w-6xl w-full px-4 sm:px-8 lg:px-12 pb-12">
            <Breadcrumbs items={breadcrumbItems} className="mb-4 [&_a]:text-white/80 [&_a:hover]:text-white [&_span]:text-white/60" />
            <p className={`${inter.className} text-sm uppercase tracking-[0.3em] text-[#E85D24] mb-2`}>
              Locations
            </p>
            <h1 className={`${ibmPlexSerif.className} text-4xl text-white sm:text-5xl`}>
              Serving {PRIMARY_CITY} &amp; North Texas
            </h1>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12 py-16 space-y-16">
          <section className="space-y-6">
            <p className="max-w-3xl text-lg text-[#2D2D2D]/80">
              Our team sources replacement properties and coordinates advisors
              across {LOCATION_COUNT} Dallas metro districts. Search by submarket to
              view local opportunities and recommended services.
            </p>
          </section>

          <LocationSearchGrid locations={locations} />

          <section className="bg-white p-8 shadow-lg">
            <div className="flex flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
              <div className="space-y-2">
                <h2 className={`${ibmPlexSerif.className} text-2xl text-[#2D2D2D]`}>
                  Not seeing your target market?
                </h2>
                <p className="text-sm text-[#2D2D2D]/70">
                  We help Dallas investors find 1031 exchange properties in all 50 states. Share the city or district you are
                  pursuing and we will build a search brief within one business day.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
                <Link
                  href={`${CONTACT_PATH}?projectType=Other`}
                  className={`${inter.className} inline-flex items-center bg-[#E85D24] px-6 py-3 text-sm font-medium tracking-[0.1em] text-white uppercase transition hover:bg-[#D14D18]`}
                >
                  Contact exchange desk
                </Link>
                <Link
                  href="/services"
                  className={`${inter.className} inline-flex items-center border-2 border-[#2D2D2D] px-5 py-3 text-sm font-medium tracking-[0.1em] text-[#2D2D2D] uppercase transition hover:bg-[#2D2D2D] hover:text-white`}
                >
                  View all {getAllServices().length} services
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
