/** @type {import('next').NextConfig} */

// GitHub Pages serves this project at https://<org>.github.io/187webDESIGN/, so
// the static export needs a matching basePath/assetPrefix. The toggle is set by
// the Pages workflow (NEXT_PUBLIC_STATIC_EXPORT=true) and left off everywhere
// else, so local dev and the full-stack Docker/Vercel build are unaffected.
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
const basePath = "/187webDESIGN";

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Treat lint/type errors as build-blocking. A starter should fail loudly,
  // not ship broken — speed and correctness are features (see the skill).
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false },
  ...(isStaticExport
    ? {
        // Fully static site for GitHub Pages — no server, no API routes.
        output: "export",
        basePath,
        assetPrefix: `${basePath}/`,
        images: { unoptimized: true },
        trailingSlash: true,
      }
    : {
        // Self-contained server bundle for the Docker deploy path.
        output: "standalone",
      }),
};

export default nextConfig;
