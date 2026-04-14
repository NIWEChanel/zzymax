import { Link } from "react-router-dom";
import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";
import { movies } from "@/lib/mock-data";

const featured = movies.find((m) => m.isFeatured) || movies[0];

const HeroBanner = () => {
  return (
    <section className="relative h-[85vh] min-h-[500px] flex items-end overflow-hidden">
      <img
        src={heroBanner}
        alt="Featured movie"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

      <div className="relative z-10 container mx-auto px-4 pb-20 max-w-2xl mr-auto animate-slide-in">
        <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full mb-4 border border-primary/30">
          ★ Featured Movie
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
          {featured.title}
        </h1>
        <p className="text-lg text-muted-foreground mb-8 line-clamp-2">
          {featured.description}
        </p>
        <div className="flex gap-4">
          <Link to={`/movie/${featured.id}`}>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow gap-2 font-semibold">
              <Play className="w-5 h-5" fill="currentColor" />
              Watch Now
            </Button>
          </Link>
          <Link to={`/movie/${featured.id}`}>
            <Button size="lg" variant="outline" className="border-border/50 gap-2 hover:bg-secondary">
              <Info className="w-5 h-5" />
              More Info
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
