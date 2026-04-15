import { useState } from "react";
import { Lock, CheckCircle, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface PaymentModalProps {
  planId?: string;
  videoId?: string;
  title: string;
  amount: number;
  onClose: () => void;
}

const PaymentModal = ({ planId, videoId, title, amount, onClose }: PaymentModalProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [payerName, setPayerName] = useState("");
  const [payerPhone, setPayerPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!payerName.trim() || !payerPhone.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    if (!user) {
      toast({ title: "Please sign in first", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("payment_requests").insert({
      user_id: user.id,
      plan_id: planId || null,
      video_id: videoId || null,
      payer_name: payerName.trim(),
      payer_phone: payerPhone.trim(),
      amount,
      status: "pending",
    });

    if (error) {
      toast({ title: "Failed to submit payment", description: error.message, variant: "destructive" });
    } else {
      setSubmitted(true);
    }
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="glass rounded-2xl p-8 max-w-md w-full mx-4 animate-scale-in">
        {submitted ? (
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Payment Submitted!</h3>
            <p className="text-muted-foreground mb-2">Your payment request is pending admin approval.</p>
            <p className="text-sm text-muted-foreground mb-6">You'll get access once the admin confirms your payment.</p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full" onClick={onClose}>
              Close
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Submit Payment</h3>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>

            <div className="bg-secondary rounded-xl p-6 mb-6 text-center">
              <Lock className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-2">Amount to pay via MoMo</p>
              <p className="text-3xl font-bold text-gradient">{amount} RWF</p>
              <p className="text-sm text-muted-foreground mt-1">{title}</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Your Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={payerName}
                    onChange={(e) => setPayerName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Phone Number (used for payment)</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="tel"
                    value={payerPhone}
                    onChange={(e) => setPayerPhone(e.target.value)}
                    placeholder="07X XXX XXXX"
                    className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              <div className="text-sm text-muted-foreground bg-secondary/50 rounded-lg p-3 space-y-1">
                <p>1. Send <strong>{amount} RWF</strong> via MTN MoMo</p>
                <p>2. Fill in your name and phone number above</p>
                <p>3. Click "I Have Paid" to submit</p>
                <p>4. Admin will review and approve your payment</p>
              </div>
            </div>

            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow font-semibold"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "I Have Paid ✓"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
