import Benefits from "./components/Benefits/Benefits";
import Collection from "./components/Collection/Collection";
import CollectionsShowcase from "./components/CollectionsShowcase/CollectionsShowcase";
import DeliveryShowcase from "./components/DeliveryShowcase/DeliveryShowcase";
import Editorial from "./components/Editorial/Editorial";
import Hero from "./components/Hero/Hero";
import Products from "./components/Products/Products";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      {/* <Benefits /> */}
      <Collection />
      <Products />
      <CollectionsShowcase />
      <Editorial />
      <DeliveryShowcase />
    </main>
  );
}
