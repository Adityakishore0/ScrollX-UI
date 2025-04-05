// next-sitemap.config.js
/**
 * @type {import('next-sitemap').IConfig}
 */
const sitemapConfig = {
  siteUrl: "https://nextjs-advancestarter.vercel.app",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};

export default sitemapConfig;
