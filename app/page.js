import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import PricingSection from "@/components/PricingSection";
import { ONE_OFF_PRODUCTS } from "@/lib/products";
export const metadata = {
  title:
    "DevTools Store — Buy Premium AI Developer Tools | Monthly & Yearly Plans",
  description:
    "Enhance your development workflow with AI-powered tools. One-time purchases from $10 or flexible subscriptions — monthly from $5/mo or save with yearly plans from $60/yr. Assignment writing, grammar checking, diagram creation, and AI content detection.",
  keywords: [
    "buy AI developer tools",
    "assignment writer tool",
    "grammar checker software",
    "diagram maker online",
    "AI detector tool",
    "AI content bypass tool",
    "affordable developer software",
    "developer subscriptions monthly yearly",
    "productivity tools",
    "annual developer plan",
  ],
  openGraph: {
    title: "DevTools Store — Professional AI Tools for Developers",
    description:
      "Boost productivity with premium AI developer tools. Flexible monthly & yearly pricing. Pay once or subscribe. 10K+ developers trust our platform.",
    type: "website",
  },
};
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <section className="Products_Section" id="products">
        <div className="container">
          <div className="Section_Header">
            <span className="Section_Label">Our Products</span>
            <h2 className="Title">
              Powerful <span className="Gradient_Text">Developer Tools</span>{" "}
              for Every Task
            </h2>
            <p className="Description">
              Choose individual tools with one-time payment or get unlimited
              access with a flexible subscription. Monthly and yearly plans
              available — pick what works best for your workflow.
            </p>
          </div>
          <div className="Products_Grid">
            {ONE_OFF_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      <PricingSection />
    </>
  );
}
