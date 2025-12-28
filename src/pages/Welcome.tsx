import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet, Shield, Zap } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-fade-in">
      {/* Floating Logo */}
      <div className="mb-8 animate-slide-up">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 backdrop-blur-xl border border-primary/30 flex items-center justify-center shadow-[0_0_40px_rgba(0,191,255,0.4)]">
          <Wallet className="w-12 h-12 text-primary" />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4 text-center animate-slide-up" style={{ animationDelay: "0.1s" }}>
        SmartBank Cloud
      </h1>
      
      <p className="text-muted-foreground text-center mb-8 max-w-md animate-slide-up" style={{ animationDelay: "0.2s" }}>
        Your secure digital banking partner. Experience next-gen banking with glassmorphism design.
      </p>

      {/* Features */}
      <div className="flex flex-wrap justify-center gap-4 mb-10 animate-slide-up" style={{ animationDelay: "0.3s" }}>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Shield className="w-4 h-4 text-primary" />
          <span>Secure & Encrypted</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Zap className="w-4 h-4 text-primary" />
          <span>Instant Transfers</span>
        </div>
      </div>

      {/* CTA Button */}
      <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
        <Button
          onClick={() => navigate("/login")}
          size="lg"
          className="px-10 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-[0_0_30px_rgba(0,191,255,0.5)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,191,255,0.7)]"
        >
          Get Started
        </Button>
      </div>

      {/* Footer Badge */}
      <div className="mt-12 animate-slide-up" style={{ animationDelay: "0.5s" }}>
        <div className="glass-card px-4 py-2 text-xs text-muted-foreground flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Cloud Verified & Secured 🔐
        </div>
      </div>
    </div>
  );
};

export default Welcome;
