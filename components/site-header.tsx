'use client';

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CONTACT_PATH, SERVICES_PATH, LOCATIONS_PATH, TOOLS_PATH, ABOUT_PATH, BLOG_PATH } from "@/lib/constants";
import { services } from "@/lib/data/services";
import { locationsData } from "@/data/locations";

type MenuKey = "services" | "locations" | "tools" | null;

// Get main location (Dallas) first, then most populous locations
const getTopLocations = () => {
  const mainLocation = locationsData.find(loc => loc.slug === 'dallas-tx');
  const otherLocations = locationsData
    .filter(loc => loc.slug !== 'dallas-tx')
    .sort((a, b) => {
      const typeOrder: Record<string, number> = { city: 1, suburb: 2, neighborhood: 3, district: 4, remote: 5 };
      return (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99);
    })
    .slice(0, 7);

  const topLocations = mainLocation
    ? [mainLocation, ...otherLocations]
    : otherLocations.slice(0, 8);

  return topLocations.map((location) => ({
    href: `${LOCATIONS_PATH}/${location.slug}`,
    label: location.name,
  }));
};

// Get main services
const getTopServices = () => {
  const identificationServices = services
    .filter(service =>
      service.slug.includes('identification') ||
      service.slug.includes('replacement') ||
      service.slug.includes('sourcing')
    )
    .slice(0, 7);

  if (identificationServices.length < 7) {
    const otherServices = services
      .filter(service => !identificationServices.includes(service))
      .slice(0, 7 - identificationServices.length);
    return [...identificationServices, ...otherServices].slice(0, 7);
  }

  return identificationServices;
};

const serviceLinks = getTopServices().map((service) => ({
  href: `${SERVICES_PATH}/${service.slug}`,
  label: service.name,
}));

const locationLinks = getTopLocations();

const toolLinks = [
  { href: `${TOOLS_PATH}/boot-calculator`, label: "Boot Calculator" },
  { href: `${TOOLS_PATH}/exchange-cost-estimator`, label: "Exchange Cost Estimator" },
  { href: `${TOOLS_PATH}/identification-rules-checker`, label: "Identification Rules Checker" },
  { href: `${TOOLS_PATH}/depreciation-recapture-estimator`, label: "Depreciation Recapture Estimator" },
  { href: `${TOOLS_PATH}/replacement-property-value-calculator`, label: "Replacement Property Value Calculator" },
];

const menuConfig: Record<Exclude<MenuKey, null>, { label: string; links: { href: string; label: string }[] }> =
  {
    services: {
      label: "Services",
      links: [
        { href: SERVICES_PATH, label: `View All ${services.length} Services` },
        ...serviceLinks,
      ],
    },
    locations: {
      label: "Locations",
      links: [
        { href: LOCATIONS_PATH, label: `View All ${locationsData.length} Locations` },
        ...locationLinks,
      ],
    },
    tools: {
      label: "Tools",
      links: [
        { href: TOOLS_PATH, label: "View All Tools" },
        ...toolLinks,
      ],
    },
  };

export function SiteHeader() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<MenuKey>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOnHero, setIsOnHero] = useState(true);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isHomePage = pathname === "/";

  const isActive = (href: string) =>
    href !== "/" && pathname?.startsWith(href);

  // Detect scroll position and dark sections
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Check if we're still on the hero section (first 80% of viewport)
      setIsOnHero(scrollY < viewportHeight * 0.8);
      setIsScrolled(scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMenu(null);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!containerRef.current) return;
      const target = event.target as Node;
      if (!containerRef.current.contains(target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("pointerdown", listener);
    return () => document.removeEventListener("pointerdown", listener);
  }, []);

  const handleOpen = (key: Exclude<MenuKey, null>) => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    setActiveMenu(key);
  };

  const handleCloseSoon = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
    hoverTimeout.current = setTimeout(() => setActiveMenu(null), 300);
  };

  const menuItems = useMemo(() => menuConfig, []);

  // On homepage hero: white text, transparent bg
  // After scroll or on other pages: dark text, cream bg
  const isTransparent = isHomePage && isOnHero && !isScrolled;
  const textColorClass = isTransparent ? "text-white" : "text-[#2D2D2D]";
  const hoverColorClass = "hover:text-[#E85D24]";

  return (
    <header
      ref={containerRef}
      className={`fixed top-0 left-0 right-0 z-[9999] isolate transition-all duration-300 ${
        isTransparent
          ? "bg-transparent"
          : "bg-[#F5F3EE]/95 backdrop-blur-md border-b border-[#2D2D2D]/10"
      }`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-8 lg:px-12 py-4">
        <div className="flex items-center gap-8">
          {/* Logo - "1031 Exchange Dallas" like BUSE AGENCY. */}
          <Link
            href="/"
            className="flex items-center transition-opacity hover:opacity-80"
          >
            <span className={`text-lg font-bold tracking-[0.12em] uppercase ${textColorClass}`}>
              1031 Exchange
            </span>
            <span className={`ml-2 text-lg font-light tracking-[0.08em] uppercase ${isTransparent ? "text-white/80" : "text-[#2D2D2D]/60"}`}>
              Dallas
            </span>
            <span className="text-[#E85D24] text-xl ml-0.5">.</span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            {Object.entries(menuItems).map(([key, menu]) => (
              <div
                key={key}
                onMouseEnter={() => handleOpen(key as Exclude<MenuKey, null>)}
                onMouseLeave={handleCloseSoon}
                className="relative"
              >
                <button
                  type="button"
                  aria-expanded={activeMenu === key}
                  aria-controls={`header-menu-${key}`}
                  onFocus={() => handleOpen(key as Exclude<MenuKey, null>)}
                  className={`inline-flex items-center gap-1 px-4 py-2 text-sm font-medium tracking-[0.1em] uppercase transition-colors ${textColorClass} ${hoverColorClass}`}
                >
                  {menu.label}
                  <span aria-hidden="true" className="text-[10px] ml-1">
                    ▼
                  </span>
                </button>
                <div
                  id={`header-menu-${key}`}
                  role="menu"
                  className={`absolute left-0 mt-2 w-72 bg-white p-4 shadow-xl border border-[#2D2D2D]/10 transition-opacity z-[10000] ${
                    activeMenu === key ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  <ul className="space-y-1">
                    {menu.links.map((link, index) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`block px-3 py-2 text-sm text-[#2D2D2D] transition-colors hover:text-[#E85D24] ${index === 0 ? "font-medium border-b border-[#2D2D2D]/10 pb-3 mb-2" : ""}`}
                          onClick={() => setActiveMenu(null)}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            <Link
              href={ABOUT_PATH}
              className={`px-4 py-2 text-sm font-medium tracking-[0.1em] uppercase transition-colors ${
                isActive(ABOUT_PATH)
                  ? "text-[#E85D24]"
                  : `${textColorClass} ${hoverColorClass}`
              }`}
            >
              About
            </Link>
            <Link
              href={BLOG_PATH}
              className={`px-4 py-2 text-sm font-medium tracking-[0.1em] uppercase transition-colors ${
                isActive(BLOG_PATH)
                  ? "text-[#E85D24]"
                  : `${textColorClass} ${hoverColorClass}`
              }`}
            >
              Blog
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href={CONTACT_PATH}
            className={`hidden lg:inline-flex px-6 py-2 text-sm font-medium tracking-[0.1em] uppercase border-2 transition-colors ${
              isTransparent
                ? "border-white text-white hover:bg-white hover:text-[#1A3A32]"
                : "border-[#2D2D2D] text-[#2D2D2D] hover:bg-[#2D2D2D] hover:text-white"
            }`}
          >
            Connect
          </Link>
          {/* Mobile menu button */}
          <button
            type="button"
            className={`lg:hidden p-2 ${textColorClass}`}
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
