import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaymentModal from "@/components/PaymentModal";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.from("plans").select("*").eq("is_active", true).then(({ data }) => {
      setPlans(data || []);
    });
  }, []);

  const handleSubscribe = (plan: any) => {
    if (!user) {
      toast({ title: "Please sign in first", variant: "destructive" });
      navigate("/login");
      return;
    }
    setSelectedPlan(plan);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-16 container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold mb-4">Choose Your Plan</h1>
          <p className="text-muted-foreground text-lg">Pay with MTN Mobile Money (MoMo)</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <div key={plan.id}
              className={`glass rounded-2xl p-8 flex flex-col animate-fade-in relative ${i === plans.length - 1 ? "ring-2 ring-primary shadow-glow" : ""}`}
              style={{ animationDelay: `${i * 150}ms` }}>
              {i === plans.length - 1 && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">BEST VALUE</span>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{plan.duration_days} days</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-gradient">{plan.price}</span>
                <span className="text-muted-foreground ml-1">RWF</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {(plan.features || []).map((f: string) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Button onClick={() => handleSubscribe(plan)}
                className={`w-full font-semibold ${i === plans.length - 1
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}>
                Subscribe
              </Button>
            </div>
          ))}
          {plans.length === 0 && (
            <div className="md:col-span-3 text-center py-20 text-muted-foreground">
              No plans available yet. Check back soon!
            </div>
          )}
        </div>
      </div>

      {selectedPlan && (
        <PaymentModal
          planId={selectedPlan.id}
          title={selectedPlan.name}
          amount={selectedPlan.price}
          onClose={() => setSelectedPlan(null)}
        />
      )}

      <Footer />
    </div>
  );
};

export default Pricing;
