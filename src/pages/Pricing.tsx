import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { subscriptionPlans } from "@/lib/mock-data";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-16 container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold mb-4">Choose Your Plan</h1>
          <p className="text-muted-foreground text-lg">Pay with MTN Mobile Money (MoMo)</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {subscriptionPlans.map((plan, i) => (
            <div
              key={plan.id}
              className={`glass rounded-2xl p-8 flex flex-col animate-fade-in relative ${
                i === 2 ? "ring-2 ring-primary shadow-glow" : ""
              }`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {i === 2 && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                  BEST VALUE
                </span>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{plan.duration}</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-gradient">{plan.price}</span>
                <span className="text-muted-foreground ml-1">RWF</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full font-semibold ${
                  i === 2
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                Subscribe
              </Button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
