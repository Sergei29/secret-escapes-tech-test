/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["secretescapes-web.imgix.net", "i.imgur.com"],
  },
};

module.exports = nextConfig;
