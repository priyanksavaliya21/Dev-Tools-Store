export const ONE_OFF_PRODUCTS = [
  {
    id: "assignment-writer",
    name: "Assignment Writer",
    description:
      "Generate high-quality, plagiarism-free academic assignments instantly. Perfect for students and professionals who need well-structured content fast. Our AI learns your style to produce natural-sounding work.",
    price: 10.0,
    priceId: "price_1TXaKtRCkNEJA4vh2vOmy6BF",
    icon: "📝",
    features: [
      "AI-powered writing engine",
      "Guaranteed plagiarism-free content",
      "Multiple academic formats",
      "Instant generation & download",
    ],
    useCases: ["Academic assignments", "Research papers", "Essays", "Reports"],
  },
  {
    id: "grammar-guru",
    name: "Grammar Guru",
    description:
      "Advanced grammar and writing enhancement tool that understands context. Get intelligent corrections, style improvements, and tone adjustments. Perfect for professionals, writers, and students who care about quality.",
    price: 20.0,
    priceId: "price_1TXaLqRCkNEJA4vhPSOvbKo4",
    icon: "✍️",
    features: [
      "Context-aware grammar corrections",
      "Professional style suggestions",
      "Tone and clarity detection",
      "Multi-language support",
    ],
    useCases: [
      "Writing refinement",
      "Professional emails",
      "Blog posts",
      "Documentation",
    ],
  },
  {
    id: "diagram-maker",
    name: "Diagram Maker",
    description:
      "Create stunning professional diagrams without design skills. Build flowcharts, UML diagrams, system architectures, and visual documentation in minutes. AI-powered layout suggestions save hours of manual work.",
    price: 30.0,
    priceId: "price_1TXaN4RCkNEJA4vhBFp5kNz2",
    icon: "📊",
    features: [
      "Flowcharts & UML diagram builder",
      "AI-assisted automatic layout",
      "High-quality PNG/SVG export",
      "Collaboration & sharing tools",
    ],
    useCases: [
      "System design",
      "Process workflows",
      "Technical documentation",
      "Team collaboration",
    ],
  },
  {
    id: "ai-detector",
    name: "AI Detector & Bypass AI Content",
    description:
      "Detect AI-generated text with 98% accuracy and bypass AI detection to make content feel authentically human-written. Maintain quality while ensuring content passes all AI detection tools—ideal for content creators and students.",
    price: 40.0,
    priceId: "price_1TXaOJRCkNEJA4vhQVslZ1lg",
    icon: "🔍",
    features: [
      "Advanced AI content detection (98% accuracy)",
      "Intelligent content humanization",
      "Bypass AI detection technology",
      "Preserve original meaning & quality",
    ],
    useCases: [
      "Content verification",
      "AI text bypass",
      "Quality assurance",
      "Content authenticity",
    ],
  },
];
export const SUBSCRIPTION_PLANS = [
  {
    id: "starter-plan",
    name: "Starter Plan",
    description:
      "Great for freelancers and students. Access essential tools with generous limits. Perfect entry point to discover which tools work best for you.",
    icon: "⚡",
    popular: false,
    monthly: {
      price: 5.0,
      priceId: "price_1TXZtFRCkNEJA4vhUXTcz7kc",
      interval: "month",
    },
    yearly: {
      price: 60.0,
      priceId: "price_1TXlVSRCkNEJA4vh6G6ES5pW",
      interval: "year",
    },
    features: [
      "Access to 2 core tools",
      "500 requests per month",
      "Priority email support",
      "Usage analytics dashboard",
      "Community forum access",
    ],
  },
  {
    id: "pro-plan",
    name: "Pro Plan",
    description:
      "The complete solution for professionals and teams. Unlimited access to all tools, priority support, and advanced features. Scale your productivity without limits.",
    icon: "🚀",
    popular: true,
    monthly: {
      price: 10.0,
      priceId: "price_1TXZvlRCkNEJA4vhPbnui8EE",
      interval: "month",
    },
    yearly: {
      price: 120.0,
      priceId: "price_1TXlRyRCkNEJA4vh0a4Rkm0O",
      interval: "year",
    },
    features: [
      "Unlimited access to all tools",
      "Unlimited monthly requests",
      "24/7 priority support",
      "Advanced usage analytics",
      "API access for developers",
      "Team collaboration features",
      "Custom integrations",
    ],
  },
];
export const CUSTOMERS = [
  { name: "Alice", email: "alice@example.com", phone: "8140193579" },
  { name: "Bob", email: "bob@example.com", phone: "8140193579" },
];
