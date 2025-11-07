import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, History, LogOut, Wallet } from "lucide-react";

interface Transaction {
  id: string;
  type: "deposit" | "withdraw";
  amount: number;
  date: string;
  description: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth) {
      navigate("/");
      return;
    }

    setUserName(localStorage.getItem("userName") || "User");
    const storedBalance = localStorage.getItem("balance");
    setBalance(storedBalance ? parseFloat(storedBalance) : 5000);

    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    } else {
      const initialTransactions: Transaction[] = [
        { id: "1", type: "deposit", amount: 2000, date: new Date().toISOString(), description: "Initial deposit" },
        { id: "2", type: "deposit", amount: 3000, date: new Date().toISOString(), description: "Salary" },
      ];
      setTransactions(initialTransactions);
      localStorage.setItem("transactions", JSON.stringify(initialTransactions));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <div className="min-h-screen p-4 md:p-8 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/20 backdrop-blur-sm">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {userName}</h1>
              <p className="text-sm text-muted-foreground">Manage your finances with ease</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout} className="glass-card">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>

        {/* Balance Card */}
        <Card className="glass-card animate-slide-up border-primary/20">
          <CardHeader>
            <CardDescription className="text-foreground/60">Total Balance</CardDescription>
            <CardTitle className="text-5xl font-bold gradient-text">
              ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={() => navigate("/deposit")}
            className="h-24 glass-card hover:bg-success/20 hover:border-success/50 transition-all group"
            variant="outline"
          >
            <div className="flex flex-col items-center gap-2">
              <ArrowDownRight className="h-6 w-6 text-success group-hover:scale-110 transition-transform" />
              <span className="text-lg font-semibold">Deposit</span>
            </div>
          </Button>
          <Button
            onClick={() => navigate("/withdraw")}
            className="h-24 glass-card hover:bg-destructive/20 hover:border-destructive/50 transition-all group"
            variant="outline"
          >
            <div className="flex flex-col items-center gap-2">
              <ArrowUpRight className="h-6 w-6 text-destructive group-hover:scale-110 transition-transform" />
              <span className="text-lg font-semibold">Withdraw</span>
            </div>
          </Button>
          <Button
            onClick={() => navigate("/history")}
            className="h-24 glass-card hover:bg-primary/20 hover:border-primary/50 transition-all group"
            variant="outline"
          >
            <div className="flex flex-col items-center gap-2">
              <History className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-lg font-semibold">History</span>
            </div>
          </Button>
        </div>

        {/* Recent Transactions */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest banking activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transactions.slice(0, 5).reverse().map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 rounded-lg glass-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        transaction.type === "deposit"
                          ? "bg-success/20 text-success"
                          : "bg-destructive/20 text-destructive"
                      }`}
                    >
                      {transaction.type === "deposit" ? (
                        <ArrowDownRight className="h-4 w-4" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`font-semibold ${
                      transaction.type === "deposit" ? "text-success" : "text-destructive"
                    }`}
                  >
                    {transaction.type === "deposit" ? "+" : "-"}$
                    {transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
              {transactions.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No transactions yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
