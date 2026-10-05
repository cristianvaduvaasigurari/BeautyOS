export interface EcosystemItem {
  id: string;
  name: string;
  category: "INTELLIGENCE" | "FINANCE" | "REAL ESTATE" | "AVIATION" | "CONSTRUCTION" | "MEDIA" | "PERSONAL";
  description: string;
  href: string;
  external: boolean;
  target?: string;
  rel?: string;
  verified: boolean;
}

export const ECOSYSTEM_CONFIG: EcosystemItem[] = [
  // INTELLIGENCE
  {
    id: "os",
    name: "OS",
    category: "INTELLIGENCE",
    description: "Operating System Intelligence",
    href: "https://os.cristianvaduva.com",
    external: true,
    target: "_blank",
    rel: "noopener noreferrer",
    verified: true,
  },
  {
    id: "health",
    name: "Health",
    category: "INTELLIGENCE",
    description: "Health Education & Intelligence",
    href: "https://health.cristianvaduva.com",
    external: true,
    target: "_blank",
    rel: "noopener noreferrer",
    verified: true,
  },
  {
    id: "subventii",
    name: "Subvenții",
    category: "INTELLIGENCE",
    description: "Funding Intelligence",
    href: "https://subventii.cristianvaduva.com",
    external: true,
    target: "_blank",
    rel: "noopener noreferrer",
    verified: true,
  },
  {
    id: "market-pulse",
    name: "Market Pulse",
    category: "INTELLIGENCE",
    description: "Market & Economic Intelligence",
    href: "https://cristianvaduva.com/market-pulse",
    external: true,
    target: "_blank",
    rel: "noopener noreferrer",
    verified: true,
  },

  // FINANCE
  {
    id: "credite",
    name: "Credite",
    category: "FINANCE",
    description: "Credit Intelligence",
    href: "https://credite.cristianvaduva.com",
    external: true,
    target: "_blank",
    rel: "noopener noreferrer",
    verified: true,
  },
  {
    id: "insurance",
    name: "Insurance",
    category: "FINANCE",
    description: "Insurance Intelligence",
    href: "https://insurance.cristianvaduva.com",
    external: true,
    target: "_blank",
    rel: "noopener noreferrer",
    verified: true,
  },

  // REAL ESTATE
  {
    id: "homefind",
    name: "HomeFind",
    category: "REAL ESTATE",
    description: "Real Estate Intelligence",
    href: "https://homefind.cristianvaduva.com",
    external: true,
    target: "_blank",
    rel: "noopener noreferrer",
    verified: true,
  },
  {
    id: "aixluxury",
    name: "AiX Luxury",
    category: "REAL ESTATE",
    description: "Luxury Real Estate Intelligence",
    href: "https://aixluxury.com",
    external: true,
    target: "_blank",
    rel: "noopener noreferrer",
    verified: true,
  },
  {
    id: "dubai",
    name: "Dubai",
    category: "REAL ESTATE",
    description: "Dubai Real Estate & Investment Intelligence",
    href: "https://dubai.cristianvaduva.com",
    external: true,
    target: "_blank",
    rel: "noopener noreferrer",
    verified: true,
  },

  // AVIATION
  {
    id: "air",
    name: "AIR",
    category: "AVIATION",
    description: "Private Aviation & Intelligence",
    href: "https://fly.cristianvaduva.com",
    external: true,
    target: "_blank",
    rel: "noopener noreferrer",
    verified: true,
  },

  // CONSTRUCTION
  {
    id: "constructions",
    name: "CONSTRUCTIONS",
    category: "CONSTRUCTION",
    description: "Construction & Developer Intelligence",
    href: "https://constructions.cristianvaduva.com",
    external: true,
    target: "_blank",
    rel: "noopener noreferrer",
    verified: true,
  },

  // MEDIA
  {
    id: "aix-media",
    name: "AiX Media",
    category: "MEDIA",
    description: "Media & Information Ecosystem",
    href: "https://aixmedia.cristianvaduva.com",
    external: true,
    target: "_blank",
    rel: "noopener noreferrer",
    verified: true,
  },

  // PERSONAL
  {
    id: "cristian",
    name: "Cristian Văduva",
    category: "PERSONAL",
    description: "Personal Brand & Advisory",
    href: "https://cristianvaduva.com",
    external: true,
    target: "_blank",
    rel: "noopener noreferrer",
    verified: true,
  },
];
