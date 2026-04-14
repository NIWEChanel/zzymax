import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import MovieRow from "@/components/MovieRow";
import Footer from "@/components/Footer";
import { movies, categories } from "@/lib/mock-data";

const Index = () => {
  const trending = movies.filter((m) => m.isTrending);
  const newReleases = movies.filter((m) => m.isNewRelease);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroBanner />

      <div className="-mt-16 relative z-10">
        <MovieRow title="🔥 Trending Now" movies={trending} />
        <MovieRow title="✨ New Releases" movies={newReleases} />

        {categories.slice(0, 4).map((cat) => {
          const catMovies = movies.filter((m) => m.category === cat);
          if (catMovies.length === 0) return null;
          return <MovieRow key={cat} title={cat} movies={catMovies} />;
        })}
      </div>

      <Footer />
    </div>
  );
};

export default Index;
