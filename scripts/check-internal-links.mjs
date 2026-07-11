const baseUrl = new URL(process.env.LINK_CHECK_BASE_URL || "http://127.0.0.1:4181");
const legacyAliases = [
  "/property-types/office-medical",
  "/property-types/retail-mixed-use",
  "/property-types/land-development",
  "/services/boot-calculation-assistance",
  "/services/qualified-intermediary-coordination",
  "/services/three-property-identification-strategy",
  "/services/two-hundred-percent-identification-strategy",
  "/services/exchange-planning-consultation",
  "/services/replacement-property-selection",
  "/services/depreciation-recapture-planning",
  "/services/tax-strategy-consultation",
];
const pending = ["/", ...legacyAliases];
const queued = new Set(pending);
const checked = new Map();
const referrers = new Map();

function addPath(rawHref, source) {
  if (!rawHref || /^(mailto:|tel:|javascript:|data:|#)/i.test(rawHref)) return;
  let target;
  try {
    target = new URL(rawHref.replaceAll("&amp;", "&"), baseUrl);
  } catch {
    return;
  }
  if (target.origin !== baseUrl.origin) return;
  const pathname = target.pathname.replace(/\/$/, "") || "/";
  if (pathname.startsWith("/_next/") || /\.(?:png|jpe?g|webp|avif|gif|svg|ico|mp4|webm|woff2?)$/i.test(pathname)) return;
  if (!referrers.has(pathname)) referrers.set(pathname, new Set());
  referrers.get(pathname).add(source);
  if (!queued.has(pathname)) {
    queued.add(pathname);
    pending.push(pathname);
  }
}

try {
  const sitemapResponse = await fetch(new URL("/sitemap.xml", baseUrl));
  if (sitemapResponse.ok) {
    const sitemap = await sitemapResponse.text();
    for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) addPath(match[1], "/sitemap.xml");
  }
} catch {
  // The normal crawl below still checks every linked page.
}

while (pending.length) {
  const pathname = pending.shift();
  let response;
  try {
    response = await fetch(new URL(pathname, baseUrl), { redirect: "manual" });
  } catch (error) {
    checked.set(pathname, { status: 0, error: error instanceof Error ? error.message : String(error) });
    continue;
  }

  checked.set(pathname, { status: response.status });
  if (response.status >= 300 && response.status < 400) {
    addPath(response.headers.get("location"), pathname);
    continue;
  }
  if (!response.ok || !response.headers.get("content-type")?.includes("text/html")) continue;

  const html = await response.text();
  for (const match of html.matchAll(/\shref=["']([^"']+)["']/gi)) addPath(match[1], pathname);
}

const broken = [...checked.entries()]
  .filter(([, result]) => result.status >= 400 || result.status === 0)
  .map(([pathname, result]) => ({
    pathname,
    ...result,
    referrers: [...(referrers.get(pathname) || [])].sort(),
  }))
  .sort((a, b) => a.pathname.localeCompare(b.pathname));

const report = {
  baseUrl: baseUrl.origin,
  checked: checked.size,
  broken,
};

console.log(JSON.stringify(report, null, 2));
if (broken.length) process.exit(1);
