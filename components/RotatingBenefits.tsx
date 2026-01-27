'use client';

import { useEffect, useState } from 'react';
import { IBM_Plex_Serif, Inter } from 'next/font/google';

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const BENEFITS = [
  {
    headline: "Defer Capital Gains Taxes",
    description: "A 1031 exchange allows you to defer federal capital gains taxes when you sell investment property and reinvest in like-kind property, keeping more of your equity working for you.",
  },
  {
    headline: "Build Wealth Faster",
    description: "By deferring taxes, you can reinvest 100% of your equity into larger or more properties, accelerating portfolio growth and compounding returns over time.",
  },
  {
    headline: "Diversify Your Portfolio",
    description: "Exchange into different property types or geographic markets to spread risk and capitalize on emerging opportunities across the nation.",
  },
  {
    headline: "Upgrade to Better Properties",
    description: "Move from older, management-intensive properties into newer, higher-quality assets with better tenants, longer leases, and reduced maintenance.",
  },
  {
    headline: "Consolidate or Expand Holdings",
    description: "Combine multiple smaller properties into one larger asset for easier management, or split one property into several for diversification.",
  },
  {
    headline: "Relocate Investments",
    description: "Move your real estate investments to markets with stronger growth potential, better tax environments, or closer to where you live.",
  },
];

export function RotatingBenefits() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % BENEFITS.length);
        setIsAnimating(false);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const currentBenefit = BENEFITS[currentIndex];

  return (
    <div className="relative min-h-[280px] flex flex-col items-center justify-center">
      <div
        className={`transition-all duration-500 ${
          isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        <blockquote className="text-center">
          <p className={`${ibmPlexSerif.className} mb-8 text-2xl leading-relaxed text-[#2D2D2D] sm:text-3xl md:text-4xl`}>
            &ldquo;{currentBenefit.headline}&rdquo;
          </p>
          <p className="text-sm text-[#2D2D2D]/80 max-w-2xl mx-auto">
            {currentBenefit.description}
          </p>
          <footer className={`${inter.className} mt-8 text-sm tracking-[0.2em] text-[#E85D24]`}>
            - BENEFIT OF 1031 EXCHANGES
          </footer>
        </blockquote>
      </div>

      {/* Dots indicator */}
      <div className="flex gap-2 mt-8">
        {BENEFITS.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAnimating(true);
              setTimeout(() => {
                setCurrentIndex(index);
                setIsAnimating(false);
              }, 300);
            }}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-[#E85D24] w-6'
                : 'bg-[#2D2D2D]/20 hover:bg-[#2D2D2D]/40'
            }`}
            aria-label={`View benefit ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
