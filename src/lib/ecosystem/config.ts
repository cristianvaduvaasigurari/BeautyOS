/**
 * AiX Ecosystem Configuration
 * Single Source of Truth for ecosystem destinations across the application.
 */

export interface EcosystemItem {
  id: string;
  name: string;
  category: "INTELLIGENCE" | "FINANCE" | "REAL ESTATE" | "MEDIA" | "PERSONAL";
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
    description: "AI & Intelligence Operating System",
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
    description: "AI-powered health intelligence",
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
    description: "Public funding intelligence",
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
    description: "Market & economic intelligence",
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
    description: "Credit advisory & financing",
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
    description: "Insurance advisory & protection",
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
    description: "Real estate intelligence",
    href: "https://homefind.cristianvaduva.com",
    external: true,
    target: "_blank",
    rel: "noopener noreferrer",
    verified: true,
  },
  {
    id: "aix-luxury",
    name: "AiX Luxury",
    category: "REAL ESTATE",
    description: "Luxury real estate",
    href: "https://aixluxury.com",
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
    description: "Media & information ecosystem (Unverified)",
    href: "",
    external: true,
    target: "_blank",
    rel: "noopener noreferrer",
    verified: false,
  },

  // PERSONAL
  {
    id: "cristian-vaduva",
    name: "Cristian Văduva",
    category: "PERSONAL",
    description: "Personal advisory & professional profile",
    href: "https://cristianvaduva.com",
    external: true,
    target: "_blank",
    rel: "noopener noreferrer",
    verified: true,
  },
];
