import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://health.cristianvaduva.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard/private/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
