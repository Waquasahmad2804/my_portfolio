import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Waquas Ahmad — Full-Stack Developer" },
      { name: "description", content: "Portfolio of Waquas Ahmad, a full-stack developer building scalable SaaS platforms, enterprise applications, APIs, and business systems." },
      { property: "og:title", content: "Waquas Ahmad — Full-Stack Developer" },
      { property: "og:description", content: "Scalable digital products, SaaS platforms, enterprise applications, and business systems engineered end to end." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});
