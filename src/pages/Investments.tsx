import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, PieChart } from "lucide-react";

const Investments = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth) {
      navigate("/");
      return;
    }
  }, [navigate]);

  const portfolio = [
    { name: "Tech Stocks", value: 15000, change: +12.5, color: "text-blue-500" },
    { name: "Mutual Funds", value: 8000, change: +8.2, color: "text-green-500" },
    { name: "Bonds", value: 5000, change: -2.1, color: "text-yellow-500" },
    { name: "Crypto", value: 2000, change: +25.8, color: "text-purple-500" },
  ];

  const totalValue = portfolio.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="min-h-screen p-4 md:p-8 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="glass-card"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card className="glass-card">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-3 rounded-2xl bg-primary/20 backdrop-blur-sm">
                <PieChart className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold gradient-text">Investments</CardTitle>
            <CardDescription>Track your investment portfolio</CardDescription>
          </CardHeader>
        </Card>

        {/* Total Portfolio Value */}
        <Card className="glass-card border-primary/20">
          <CardHeader>
            <CardDescription className="text-foreground/60">Total Portfolio Value</CardDescription>
            <CardTitle className="text-5xl font-bold gradient-text">
              ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Portfolio Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portfolio.map((item) => (
            <Card key={item.name} className="glass-card hover:bg-muted/20 transition-all">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className={`text-lg font-semibold ${item.color}`}>{item.name}</h3>
                    <p className="text-3xl font-bold mt-2">
                      ${item.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div
                    className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                      item.change > 0
                        ? "bg-success/20 text-success"
                        : "bg-destructive/20 text-destructive"
                    }`}
                  >
                    {item.change > 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span className="text-sm font-semibold">
                      {item.change > 0 ? "+" : ""}
                      {item.change}%
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color.replace("text-", "bg-")}`}
                    style={{ width: `${(item.value / totalValue) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Investment Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 glass-card hover:bg-primary/20 hover:border-primary/50 transition-all" variant="outline">
                <div className="flex flex-col items-center gap-2">
                  <DollarSign className="h-6 w-6 text-success" />
                  <span>Buy Stocks</span>
                </div>
              </Button>
              <Button className="h-20 glass-card hover:bg-destructive/20 hover:border-destructive/50 transition-all" variant="outline">
                <div className="flex flex-col items-center gap-2">
                  <TrendingDown className="h-6 w-6 text-destructive" />
                  <span>Sell Assets</span>
                </div>
              </Button>
              <Button className="h-20 glass-card hover:bg-accent/20 hover:border-accent/50 transition-all" variant="outline">
                <div className="flex flex-col items-center gap-2">
                  <PieChart className="h-6 w-6 text-accent" />
                  <span>Rebalance</span>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Investments;
