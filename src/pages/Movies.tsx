import { useState } from "react";
import Navbar from "@/components/Navbar";
import MovieCard from "@/components/MovieCard";
import Footer from "@/components/Footer";
import { movies, categories } from "@/lib/mock-data";

const Movies = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? movies : movies.filter((m) => m.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-8 container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Browse Movies</h1>

        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-glow-sm"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filtered.map((movie, i) => (
            <MovieCard key={movie.id} movie={movie} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-20">No movies found in this category.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Movies;
