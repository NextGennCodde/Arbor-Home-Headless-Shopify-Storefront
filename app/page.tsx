import { HeroSection } from "components/hero";
import { Carousel } from "components/carousel";
import { ThreeItemGrid } from "components/grid/three-items";
import Footer from "components/layout/footer";

export const metadata = {
  title: "Shopiify Store - Curated Home Goods",
  description:
    "Thoughtfully curated home goods and lifestyle products. Explore our collection of premium, considered items for everyday living.",
  openGraph: {
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ThreeItemGrid />
      <Carousel />
      <Footer />
    </>
  );
}
