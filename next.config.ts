import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/property-types/office-medical", destination: "/property-types/office", permanent: true },
      { source: "/property-types/retail-mixed-use", destination: "/property-types/retail", permanent: true },
      { source: "/property-types/land-development", destination: "/property-types/land", permanent: true },
      { source: "/services/boot-calculation-assistance", destination: "/services/dallas-like-kind-audit-and-risk", permanent: true },
      { source: "/services/qualified-intermediary-coordination", destination: "/services/dallas-timeline-45-180-day-control", permanent: true },
      { source: "/services/three-property-identification-strategy", destination: "/services/dallas-three-property-identification-lists", permanent: true },
      { source: "/services/two-hundred-percent-identification-strategy", destination: "/services/dallas-200-percent-identification-modeling", permanent: true },
      { source: "/services/exchange-planning-consultation", destination: "/services/dallas-portfolio-sequencing-exchange", permanent: true },
      { source: "/services/replacement-property-selection", destination: "/services/dallas-1031-market-comp-dashboards", permanent: true },
      { source: "/services/depreciation-recapture-planning", destination: "/services/dallas-like-kind-audit-and-risk", permanent: true },
      { source: "/services/tax-strategy-consultation", destination: "/services/dallas-like-kind-audit-and-risk", permanent: true },
    ];
  },
};

export default nextConfig;
