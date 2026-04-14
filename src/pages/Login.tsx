import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-extrabold text-gradient">ZZYMAN</Link>
          <p className="text-muted-foreground mt-2">Welcome back</p>
        </div>

        <div className="glass rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-6">Sign In</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-secondary border border-border rounded-lg pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow font-semibold">
              Sign In
            </Button>
          </form>
          <p className="text-sm text-muted-foreground text-center mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline font-medium">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
