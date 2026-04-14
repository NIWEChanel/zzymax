import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border/50 py-12 mt-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-bold text-gradient mb-4">ZZYMAN</h3>
          <p className="text-sm text-muted-foreground">Your premium movie streaming platform. Watch anywhere, anytime.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Browse</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/movies" className="hover:text-foreground transition-colors">Movies</Link>
            <Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Account</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/login" className="hover:text-foreground transition-colors">Sign In</Link>
            <Link to="/register" className="hover:text-foreground transition-colors">Register</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Payment</h4>
          <p className="text-sm text-muted-foreground">MTN Mobile Money (MoMo Pay)</p>
          <p className="text-sm text-muted-foreground mt-1">Rwanda 🇷🇼</p>
        </div>
      </div>
      <div className="border-t border-border/50 pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ZZYMAN. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
