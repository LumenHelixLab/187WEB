import { siteConfig } from "@/lib/content";

/** Organization + SoftwareApplication structured data for the product surface. */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.orgUrl}/#organization`,
        name: siteConfig.org,
        url: siteConfig.orgUrl,
        sameAs: [siteConfig.repo],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: { "@id": `${siteConfig.orgUrl}/#organization` },
        inLanguage: "en",
      },
      {
        "@type": "SoftwareApplication",
        name: siteConfig.name,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        url: siteConfig.url,
        description: siteConfig.description,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Source-available skill suite under custom noncommercial license",
        },
        featureList: [
          "187ACCESS+ disability and neurodivergent access skills",
          "187INCLUDE+ LGBTQ+ identity safety and anti-bias skills",
          "/187++ combined access and inclusion sweep",
          "Command-driven 187SKILLS suite",
        ],
        author: { "@id": `${siteConfig.orgUrl}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
