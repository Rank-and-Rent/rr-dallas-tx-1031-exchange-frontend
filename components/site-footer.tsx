import Link from "next/link";
import {
  COMPANY_EMAIL,
  COMPANY_NAME,
  COMPANY_PHONE,
  CONTACT_PATH,
  LOCATIONS_PATH,
  SERVICES_PATH,
  PROPERTY_TYPES_PATH,
  BLOG_PATH,
  TOOLS_PATH,
  ABOUT_PATH,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
} from "@/lib/constants";
import { getAllServices } from "@/lib/data/services";
import { getAllLocations } from "@/lib/data/locations";
import { propertyTypesData } from "@/data/property-types";

const allServices = getAllServices();
const allLocations = getAllLocations();

// IRS and official resource links for credibility
const IRS_LINKS = [
  {
    label: "IRS Form 8824 Instructions",
    href: "https://www.irs.gov/forms-pubs/about-form-8824",
  },
  {
    label: "IRS Like-Kind Exchange Overview",
    href: "https://www.irs.gov/businesses/small-businesses-self-employed/like-kind-exchanges-real-estate-tax-tips",
  },
  {
    label: "Texas Comptroller Property Tax",
    href: "https://comptroller.texas.gov/taxes/property-tax/",
  },
];

// Tools for sitemap
const TOOLS = [
  { name: "Boot Calculator", slug: "boot-calculator" },
  { name: "Exchange Cost Estimator", slug: "exchange-cost-estimator" },
  { name: "Identification Rules Checker", slug: "identification-rules-checker" },
  { name: "Depreciation Recapture Estimator", slug: "depreciation-recapture-estimator" },
  { name: "Replacement Property Value Calculator", slug: "replacement-property-value-calculator" },
];

export function SiteFooter() {
  // Get top services (first 8)
  const topServices = allServices.slice(0, 8);
  // Get top locations (first 8)
  const topLocations = allLocations.slice(0, 8);
  // Get top property types (first 6)
  const topPropertyTypes = propertyTypesData.slice(0, 6);

  return (
    <footer className="bg-[#1A3A32] text-white">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 py-16">
        <div className="grid gap-12 lg:grid-cols-6">
          {/* Company Info - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-white font-serif">
                {COMPANY_NAME}
              </h2>
              <p className="mt-4 text-sm text-white/70 leading-relaxed">
                {COMPANY_NAME} guides {PRIMARY_CITY} investors through complex 1031 exchanges 
                with disciplined process control, nationwide property sourcing across all 50 states, 
                and coordination with qualified intermediaries and trusted professional partners.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#E85D24] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Phone</p>
                  <a
                    href={`tel:${COMPANY_PHONE.replace(/\D/g, "")}`}
                    className="text-[#E85D24] hover:text-[#E85D24]/80 transition-colors font-medium"
                  >
                    {COMPANY_PHONE}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#E85D24] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Email</p>
                  <a
                    href={`mailto:${COMPANY_EMAIL}`}
                    className="text-[#E85D24] hover:text-[#E85D24]/80 transition-colors font-medium"
                  >
                    {COMPANY_EMAIL}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#E85D24] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Hours</p>
                  <p className="text-white/80">Monday–Friday, 8:00 AM – 6:00 PM CT</p>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E85D24]">
              Services
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link
                  href={SERVICES_PATH}
                  className="hover:text-[#E85D24] transition-colors font-medium text-white/90"
                >
                  All {allServices.length} Services →
                </Link>
              </li>
              {topServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`${SERVICES_PATH}/${service.slug}`}
                    className="hover:text-[#E85D24] transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E85D24]">
              Service Areas
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link
                  href={LOCATIONS_PATH}
                  className="hover:text-[#E85D24] transition-colors font-medium text-white/90"
                >
                  All {allLocations.length} Locations →
                </Link>
              </li>
              {topLocations.map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`${LOCATIONS_PATH}/${location.slug}`}
                    className="hover:text-[#E85D24] transition-colors"
                  >
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E85D24]">
              Property Types
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link
                  href={PROPERTY_TYPES_PATH}
                  className="hover:text-[#E85D24] transition-colors font-medium text-white/90"
                >
                  All {propertyTypesData.length} Types →
                </Link>
              </li>
              {topPropertyTypes.map((propertyType) => (
                <li key={propertyType.slug}>
                  <Link
                    href={`${PROPERTY_TYPES_PATH}/${propertyType.slug}`}
                    className="hover:text-[#E85D24] transition-colors"
                  >
                    {propertyType.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & Resources */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E85D24]">
              Tools & Resources
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link
                  href={TOOLS_PATH}
                  className="hover:text-[#E85D24] transition-colors font-medium text-white/90"
                >
                  All Tools →
                </Link>
              </li>
              {TOOLS.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`${TOOLS_PATH}/${tool.slug}`}
                    className="hover:text-[#E85D24] transition-colors"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-white/10">
                <Link
                  href={BLOG_PATH}
                  className="hover:text-[#E85D24] transition-colors"
                >
                  Blog & Insights
                </Link>
              </li>
              <li>
                <Link
                  href={ABOUT_PATH}
                  className="hover:text-[#E85D24] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href={CONTACT_PATH}
                  className="hover:text-[#E85D24] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* IRS Resources Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-white/60">
              <strong className="text-white/80">Official IRS Resources:</strong> Educational content only. Consult qualified tax and legal advisors.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              {IRS_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-[#E85D24] transition-colors underline underline-offset-4"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-[#153228]">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
            </p>
            <p className="text-sm text-white/50">
              Serving {PRIMARY_CITY}, {PRIMARY_STATE_ABBR} investors with nationwide 1031 exchange property sourcing.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
