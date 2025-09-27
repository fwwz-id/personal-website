import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
} satisfies NextConfig;

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    // Ensure frontmatter is parsed and not rendered
    remarkPlugins: [
      "remark-frontmatter",
      "remark-mdx-frontmatter",
      "remark-gfm",
      "remark-math",
    ],
    rehypePlugins: [
      "rehype-katex",
      "rehype-pretty-code",
      ["@shikijs/rehype", { theme: "one-dark-pro" }],
    ],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
