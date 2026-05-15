import { useState } from "react";
import { Lock, CheckCircle, Phone, User, Copy, Check } from "lucide-react";
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

const MOMO_CODE = "2099960";
const MOMO_NAME = "Shyaka Aime Bruce";

const PaymentModal = ({ planId, videoId, title, amount, onClose }: PaymentModalProps) => {
  const { user, hasActiveSubscription } = useAuth();
  const { toast } = useToast();
  const [payerName, setPayerName] = useState("");
  const [payerPhone, setPayerPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(MOMO_CODE);
    setCopied(true);
    toast({ title: "MoMo Code copied!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async () => {
    if (!payerName.trim() || !payerPhone.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    if (!user) {
      toast({ title: "Please sign in first", variant: "destructive" });
      return;
    }
    if (hasActiveSubscription) {
      toast({ title: "You already have an active subscription", variant: "destructive" });
      return;
    }

    setSubmitting(true);

    // Prevent duplicate pending requests
    const { data: existing } = await supabase
      .from("payment_requests")
      .select("id")
      .eq("user_id", user.id)
      .eq("status", "pending")
      .maybeSingle();

    if (existing) {
      toast({ title: "You already have a pending payment request", description: "Please wait for admin approval.", variant: "destructive" });
      setSubmitting(false);
      return;
    }

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in p-4">
      <div className="glass rounded-2xl p-8 max-w-md w-full animate-scale-in max-h-[90vh] overflow-y-auto">
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

            <div className="bg-secondary rounded-xl p-6 mb-4 text-center">
              <Lock className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-2">Amount to pay via MoMo</p>
              <p className="text-3xl font-bold text-gradient">{amount} RWF</p>
              <p className="text-sm text-muted-foreground mt-1">{title}</p>
            </div>

            {/* MoMo Pay Details */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6 space-y-3">
              <p className="text-xs uppercase tracking-wide text-primary font-semibold">Pay with MTN MoMo</p>
              <div>
                <p className="text-xs text-muted-foreground mb-1">MoMo Pay Code</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-background/60 border border-border rounded-lg px-3 py-2 text-lg font-bold tracking-wider">
                    {MOMO_CODE}
                  </code>
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleCopy}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied" : "Copy"}
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Account Name</p>
                <p className="text-sm font-semibold">{MOMO_NAME}</p>
              </div>
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
                <p>1. Send <strong>{amount} RWF</strong> to MoMo Code <strong>{MOMO_CODE}</strong></p>
                <p>2. Confirm the recipient is <strong>{MOMO_NAME}</strong></p>
                <p>3. Enter your name and phone number above</p>
                <p>4. Click "I Have Paid" — admin will approve shortly</p>
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
