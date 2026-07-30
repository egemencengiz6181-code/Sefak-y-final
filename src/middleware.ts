import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { locales, localePrefix } from "./config/locales";

const intlMiddleware = createIntlMiddleware({
  defaultLocale: "tr",
  locales,
  localePrefix,
});

export function middleware(request: NextRequest): NextResponse {
  return intlMiddleware(request) as NextResponse;
}

export const config = {
  // Skip the middleware for static assets, image optimisation and API routes —
  // it has no work to do there and only adds latency to every asset request.
  matcher: ["/", "/(tr(?:/.*)?)"],
};
