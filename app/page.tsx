import { HeroVideo } from "@/components/hero-video";
import { ProductGrid } from "@/components/product-grid";
import { VaultDrawer } from "@/components/vault-drawer";
import { AboutSection } from "@/components/about-section";
import { SupportSection } from "@/components/support-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HeroVideo />
      <div id="watches" className="container mx-auto px-4 py-16 scroll-mt-20">
        <h2 className="text-4xl font-bold text-neon-cyan mb-8 text-center">
          COLLECTION
        </h2>
        <ProductGrid />
      </div>
      
      <AboutSection />
      
      {/* Marketing Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] overflow-hidden mt-16">
        {/* Ambient Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="/media/video/ambient-loop.mp4" type="video/mp4" />
        </video>
        
        {/* Fallback Image Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: 'url(/media/images/marketing.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h2 className="text-5xl md:text-6xl font-bold text-neon-cyan mb-6">
            THE FUTURE OF TIME
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-8">
            Where luxury meets innovation in the digital age
          </p>
        </div>
      </section>
      
      <SupportSection />
      
      <VaultDrawer />
    </main>
  );
}

