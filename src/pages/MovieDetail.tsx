import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Clock, Play, Lock, ArrowLeft, Heart, Share2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import MovieCard from "@/components/MovieCard";
import Footer from "@/components/Footer";
import { movies } from "@/lib/mock-data";

const MovieDetail = () => {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === id);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "pending" | "success">("idle");

  if (!movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Movie not found.</p>
      </div>
    );
  }

  const related = movies.filter((m) => m.category === movie.category && m.id !== movie.id).slice(0, 4);

  const handleSimulatePayment = () => {
    setPaymentStatus("pending");
    setTimeout(() => setPaymentStatus("success"), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[70vh] min-h-[400px]">
        <img src={movie.thumbnail} alt={movie.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-end">
            <img
              src={movie.thumbnail}
              alt={movie.title}
              className="w-48 rounded-xl shadow-2xl hidden md:block border border-border/30"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full border border-primary/30">
                  {movie.category}
                </span>
                {movie.isNewRelease && (
                  <span className="px-3 py-1 text-xs font-semibold bg-accent/20 text-accent rounded-full">NEW</span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{movie.title}</h1>

              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-primary" fill="currentColor" /> {movie.rating}/10
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {movie.duration}
                </span>
                <span>{movie.year}</span>
              </div>

              <p className="text-muted-foreground max-w-xl mb-6">{movie.description}</p>

              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow gap-2 font-semibold"
                  onClick={() => setShowPayment(true)}
                >
                  <Play className="w-5 h-5" fill="currentColor" />
                  Watch Now - {movie.price} RWF
                </Button>
                <Button size="lg" variant="outline" className="border-border/50 gap-2">
                  <Heart className="w-5 h-5" /> Favorite
                </Button>
                <Button size="lg" variant="outline" className="border-border/50 gap-2">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
          <div className="glass rounded-2xl p-8 max-w-md w-full mx-4 animate-scale-in">
            {paymentStatus === "success" ? (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Payment Successful!</h3>
                <p className="text-muted-foreground mb-6">Enjoy watching {movie.title}</p>
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow w-full"
                  onClick={() => { setShowPayment(false); setPaymentStatus("idle"); }}
                >
                  <Play className="w-5 h-5 mr-2" fill="currentColor" /> Start Watching
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">MoMo Pay</h3>
                  <button onClick={() => { setShowPayment(false); setPaymentStatus("idle"); }} className="text-muted-foreground hover:text-foreground">
                    ✕
                  </button>
                </div>

                <div className="bg-secondary rounded-xl p-6 mb-6 text-center">
                  <Lock className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-2">Pay to unlock</p>
                  <p className="text-3xl font-bold text-gradient">{movie.price} RWF</p>
                  <p className="text-sm text-muted-foreground mt-1">{movie.title}</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <p className="text-sm font-semibold mb-1">MTN MoMo Pay Code</p>
                    <p className="text-2xl font-bold text-primary tracking-wider">*182*8*1*{Math.floor(100000 + Math.random() * 900000)}#</p>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>1. Dial the code above on your MTN phone</p>
                    <p>2. Enter your MoMo PIN to confirm</p>
                    <p>3. Click "I've Paid" below</p>
                  </div>
                </div>

                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow font-semibold"
                  onClick={handleSimulatePayment}
                  disabled={paymentStatus === "pending"}
                >
                  {paymentStatus === "pending" ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Verifying Payment...
                    </span>
                  ) : (
                    "I've Paid ✓"
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="py-12 container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">More {movie.category}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {related.map((m, i) => (
              <MovieCard key={m.id} movie={m} index={i} />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default MovieDetail;
