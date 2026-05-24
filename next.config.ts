import type { NextConfig } from "next";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isGithubPagesBuild = process.env.GITHUB_ACTIONS === "true";
const isUserOrOrgPagesSite = repositoryName?.endsWith(".github.io");
const basePath =
  isGithubPagesBuild && repositoryName && !isUserOrOrgPagesSite
    ? `/${repositoryName}`
    : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
