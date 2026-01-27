import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href.startsWith("http") ? item.href : `${SITE_URL}${item.href}`,
    })),
  };

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className={`text-sm mb-8 ${className}`}
      >
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && (
                <span className="text-[#2D2D2D]/40" aria-hidden="true">
                  /
                </span>
              )}
              {index === items.length - 1 ? (
                <span className="text-[#2D2D2D]/60" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-[#E85D24] hover:text-[#D14D18] transition-colors underline underline-offset-4"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

export default Breadcrumbs;
