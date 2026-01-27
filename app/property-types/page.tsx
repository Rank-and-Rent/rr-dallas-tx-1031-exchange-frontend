import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { IBM_Plex_Serif, Inter } from "next/font/google";
import { propertyTypesData } from "@/data/property-types";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  COMPANY_NAME,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  PROPERTY_TYPES_PATH,
  SITE_URL,
  CONTACT_PATH,
} from "@/lib/constants";
import { getPropertyTypeImagePath } from "@/lib/utils/images";

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "1031 Exchange Property Types | Dallas Nationwide",
  description: `Explore replacement property types for 1031 exchanges. Multifamily, office, retail, industrial properties. We help Dallas investors find properties in all 50 states.`,
  keywords: [
    "1031 exchange property types",
    "replacement property types",
    "multifamily 1031 exchange",
    "office 1031 exchange",
    "retail 1031 exchange",
    "industrial 1031 exchange",
  ],
  alternates: {
    canonical: `${SITE_URL}${PROPERTY_TYPES_PATH}`,
  },
  openGraph: {
    title: "1031 Exchange Property Types | Dallas Nationwide",
    description: `Explore replacement property types for 1031 exchanges. We help Dallas investors find properties in all 50 states.`,
    url: `${SITE_URL}${PROPERTY_TYPES_PATH}`,
    siteName: COMPANY_NAME,
    images: [
      {
        url: `${SITE_URL}/1031-exchange-dallas-logo.png`,
        width: 1200,
        height: 630,
        alt: "1031 Exchange Property Types",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "1031 Exchange Property Types | Dallas Nationwide",
    description: "Explore replacement property types for 1031 exchanges. We help Dallas investors find properties in all 50 states.",
    images: [`${SITE_URL}/1031-exchange-dallas-logo.png`],
  },
};

export default function PropertyTypesPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "1031 Exchange Property Types",
    description: "List of property types available for 1031 exchanges. We help Dallas investors find these property types in all 50 states",
    numberOfItems: propertyTypesData.length,
    itemListElement: propertyTypesData.map((propertyType, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: propertyType.name,
      url: `${SITE_URL}${PROPERTY_TYPES_PATH}/${propertyType.slug}`,
    })),
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Property Types", href: "/property-types" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <div className="bg-[#F5F3EE] min-h-screen">
        {/* Hero Banner - Same style as Services and Locations */}
        <section className="relative h-[40vh] min-h-[300px] flex items-end">
          <Image
            src="/locations/1031-exchange-dallas-TX.webp"
            alt="1031 Exchange Property Types in Dallas"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
          <div className="relative z-10 mx-auto max-w-6xl w-full px-4 sm:px-8 lg:px-12 pb-12">
            <Breadcrumbs items={breadcrumbItems} className="mb-4 [&_a]:text-white/80 [&_a:hover]:text-white [&_span]:text-white/60" />
            <p className={`${inter.className} text-sm uppercase tracking-[0.3em] text-[#E85D24] mb-2`}>
              Property Types
            </p>
            <h1 className={`${ibmPlexSerif.className} text-4xl text-white sm:text-5xl`}>
              1031 Exchange Property Types
            </h1>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12 py-16 space-y-16">
          <section className="space-y-6">
            <p className="max-w-3xl text-lg text-[#2D2D2D]/80">
              Explore replacement property types for your 1031 exchange in{" "}
              {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}. We help identify like-kind
              properties across {propertyTypesData.length} property categories that
              meet IRS requirements and align with your exchange timeline.
            </p>
          </section>

          {/* Property Types Grid */}
          <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {propertyTypesData.map((propertyType) => {
              const imagePath = getPropertyTypeImagePath(propertyType.slug);
              return (
                <Link
                  key={propertyType.slug}
                  href={`${PROPERTY_TYPES_PATH}/${propertyType.slug}`}
                  className="group relative aspect-[4/3] overflow-hidden"
                >
                  {imagePath ? (
                    <Image
                      src={imagePath}
                      alt={`${propertyType.name} properties in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#153243] to-[#1A3A32]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute inset-6 border border-white/30 transition-all group-hover:inset-5" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <h2 className={`${inter.className} text-xl tracking-[0.3em] text-white uppercase font-light text-center px-4`}>
                      {propertyType.name}
                    </h2>
                    <span className={`${inter.className} text-xs tracking-[0.2em] text-white/70 uppercase opacity-0 group-hover:opacity-100 transition-opacity`}>
                      Explore →
                    </span>
                  </div>
                </Link>
              );
            })}
          </section>

          {/* CTA Section */}
          <section className="bg-white p-8 shadow-lg">
            <div className="flex flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
              <div className="space-y-2">
                <h2 className={`${ibmPlexSerif.className} text-2xl text-[#2D2D2D]`}>
                  Need help finding replacement properties?
                </h2>
                <p className="text-sm text-[#2D2D2D]/70">
                  Share your exchange details and timeline. Our team helps identify
                  like-kind properties that meet IRS requirements in {PRIMARY_CITY},{" "}
                  {PRIMARY_STATE_ABBR}.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
                <Link
                  href={CONTACT_PATH}
                  className={`${inter.className} inline-flex items-center bg-[#E85D24] px-6 py-3 text-sm font-medium tracking-[0.1em] text-white uppercase transition hover:bg-[#D14D18]`}
                >
                  Contact Our Team
                </Link>
                <Link
                  href="/services"
                  className={`${inter.className} inline-flex items-center border-2 border-[#2D2D2D] px-5 py-3 text-sm font-medium tracking-[0.1em] text-[#2D2D2D] uppercase transition hover:bg-[#2D2D2D] hover:text-white`}
                >
                  View All Services
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

