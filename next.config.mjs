/**
 * The site ships as a static export so it can be served straight off GitHub
 * Pages. Pages hosts a project site under /<repo>, so the base path is read
 * from the environment: unset for `next dev` and for a root deploy, set to
 * /KondoruArch by the Pages workflow.
 *
 * @type {import('next').NextConfig}
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const nextConfig = {
  output: 'export',
  basePath,
  // Trailing slashes make every route a directory with its own index.html,
  // which is what a plain static host can resolve without rewrite rules.
  trailingSlash: true,
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    // There is no image server behind a static export. Every photograph is
    // pre-rendered into its WebP ladder by `npm run images:optimize`.
    unoptimized: true,
  },
}

export default nextConfig
