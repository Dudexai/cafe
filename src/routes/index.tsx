import { createFileRoute } from "@tanstack/react-router";
import { Loader, Navbar, Footer } from "@/components/site/Chrome";
import { Hero, Intro, MenuSection, OwnerSection, ProcessSection, VideoSection, LocationsSection, FinalCta } from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A1 EATS — Delicious Chicken | Chennai Street-Food Chicken" },
      { name: "description", content: "Chennai's crispy chicken cravings, served hot. A1 EATS in Triplicane, Kolathur and Perambur." },
      { property: "og:title", content: "A1 EATS — Delicious Chicken" },
      { property: "og:description", content: "Crispy. Juicy. Loaded with flavour. Find A1 EATS in Triplicane, Kolathur and Perambur, Chennai." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <MenuSection />
        <OwnerSection />
        <ProcessSection />
        <VideoSection />
        <LocationsSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
