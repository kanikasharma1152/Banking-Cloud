import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Lock, Unlock, Eye, EyeOff, Copy } from "lucide-react";
import { toast } from "sonner";

const Cards = () => {
  const navigate = useNavigate();
  const [isCardFrozen, setIsCardFrozen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth) {
      navigate("/");
      return;
    }
    setUserName(localStorage.getItem("userName") || "User");
    const frozen = localStorage.getItem("cardFrozen") === "true";
    setIsCardFrozen(frozen);
  }, [navigate]);

  const toggleCardStatus = () => {
    const newStatus = !isCardFrozen;
    setIsCardFrozen(newStatus);
    localStorage.setItem("cardFrozen", newStatus.toString());
    toast.success(newStatus ? "Card frozen successfully" : "Card activated successfully");
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="glass-card"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        {/* Virtual Card */}
        <div className="relative">
          <div className="glass-card p-8 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 border-primary/30 transform hover:scale-105 transition-all duration-300">
            <div className="space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-foreground/60">SmartBank Cloud</p>
                  <p className="text-xs text-foreground/40">Virtual Debit Card</p>
                </div>
                <CreditCard className="h-12 w-12 text-primary" />
              </div>

              <div className="space-y-2">
                <p className="text-2xl font-mono tracking-wider">
                  {showDetails ? "4532 1234 5678 9010" : "•••• •••• •••• 9010"}
                </p>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-foreground/60">CARDHOLDER</p>
                  <p className="font-semibold text-lg">{userName.toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground/60">EXPIRES</p>
                  <p className="font-semibold">{showDetails ? "12/28" : "••/••"}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground/60">CVV</p>
                  <p className="font-semibold">{showDetails ? "123" : "•••"}</p>
                </div>
              </div>
            </div>
          </div>
          {isCardFrozen && (
            <div className="absolute inset-0 glass-card bg-destructive/20 flex items-center justify-center backdrop-blur-md rounded-2xl">
              <div className="text-center">
                <Lock className="h-16 w-16 text-destructive mx-auto mb-2" />
                <p className="text-xl font-bold text-destructive">Card Frozen</p>
              </div>
            </div>
          )}
        </div>

        {/* Card Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            onClick={() => setShowDetails(!showDetails)}
            className="glass-card h-20 hover:bg-primary/20 hover:border-primary/50 transition-all group"
            variant="outline"
          >
            <div className="flex items-center gap-3">
              {showDetails ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
              <span className="text-lg">{showDetails ? "Hide" : "Show"} Card Details</span>
            </div>
          </Button>

          <Button
            onClick={toggleCardStatus}
            className={`glass-card h-20 transition-all group ${
              isCardFrozen
                ? "hover:bg-success/20 hover:border-success/50"
                : "hover:bg-destructive/20 hover:border-destructive/50"
            }`}
            variant="outline"
          >
            <div className="flex items-center gap-3">
              {isCardFrozen ? (
                <Unlock className="h-6 w-6 text-success" />
              ) : (
                <Lock className="h-6 w-6 text-destructive" />
              )}
              <span className="text-lg">{isCardFrozen ? "Unfreeze" : "Freeze"} Card</span>
            </div>
          </Button>
        </div>

        {/* Card Details */}
        {showDetails && (
          <Card className="glass-card animate-slide-up">
            <CardHeader>
              <CardTitle>Card Details</CardTitle>
              <CardDescription>Click to copy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div
                onClick={() => copyToClipboard("4532123456789010", "Card number")}
                className="flex justify-between items-center p-4 glass-card hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <div>
                  <p className="text-sm text-muted-foreground">Card Number</p>
                  <p className="font-mono text-lg">4532 1234 5678 9010</p>
                </div>
                <Copy className="h-4 w-4" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => copyToClipboard("12/28", "Expiry date")}
                  className="flex justify-between items-center p-4 glass-card hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <div>
                    <p className="text-sm text-muted-foreground">Expiry</p>
                    <p className="font-semibold">12/28</p>
                  </div>
                  <Copy className="h-4 w-4" />
                </div>
                <div
                  onClick={() => copyToClipboard("123", "CVV")}
                  className="flex justify-between items-center p-4 glass-card hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <div>
                    <p className="text-sm text-muted-foreground">CVV</p>
                    <p className="font-semibold">123</p>
                  </div>
                  <Copy className="h-4 w-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Cards;
