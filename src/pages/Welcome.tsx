import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet, Shield, Zap, CreditCard, TrendingUp, Globe, ArrowRight, Sparkles } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Shield, title: "Bank-Grade Security", desc: "256-bit encryption" },
    { icon: Zap, title: "Instant Transfers", desc: "Send money in seconds" },
    { icon: CreditCard, title: "Virtual Cards", desc: "Shop securely online" },
    { icon: TrendingUp, title: "Smart Investments", desc: "Grow your wealth" },
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">SmartBank</span>
        </div>
        <Button 
          variant="outline" 
          onClick={() => navigate("/login")}
          className="glass-card border-primary/30 hover:bg-primary/20"
        >
          Sign In
        </Button>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-8 animate-slide-up">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Next-Gen Digital Banking</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <span className="text-foreground">Banking Made</span>
            <br />
            <span className="gradient-text">Beautifully Simple</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Experience the future of banking with our secure cloud platform. 
            Manage your money, investments, and cards all in one place.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Button
              onClick={() => navigate("/login")}
              size="lg"
              className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-[0_0_30px_rgba(0,191,255,0.5)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(0,191,255,0.7)] group"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg glass-card border-white/20 hover:bg-white/10"
            >
              <Globe className="w-5 h-5 mr-2" />
              Learn More
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="glass-card p-6 rounded-2xl hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,191,255,0.3)] group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors mx-auto">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-card p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            All systems operational • Cloud Secured 🔐
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="hover:text-primary cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
