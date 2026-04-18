import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",   // generates frontend/out/ — pure static HTML/JS/CSS
  trailingSlash: true, // index.html per route, works well with Express static
};

export default nextConfig;
