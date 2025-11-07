import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

const Withdraw = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const currentBalance = parseFloat(localStorage.getItem("balance") || "0");
    setBalance(currentBalance);
  }, []);

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    
    const withdrawAmount = parseFloat(amount);
    if (withdrawAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (withdrawAmount > balance) {
      toast.error("Insufficient funds");
      return;
    }

    const newBalance = balance - withdrawAmount;
    localStorage.setItem("balance", newBalance.toString());

    const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    const newTransaction = {
      id: Date.now().toString(),
      type: "withdraw",
      amount: withdrawAmount,
      date: new Date().toISOString(),
      description: description || "Withdrawal",
    };
    transactions.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    toast.success(`Successfully withdrew $${withdrawAmount.toFixed(2)}`);
    navigate("/dashboard");
  };

  const quickAmounts = [50, 100, 200, 500];

  return (
    <div className="min-h-screen p-4 md:p-8 animate-fade-in">
      <div className="max-w-2xl mx-auto space-y-6">
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
              <div className="p-3 rounded-2xl bg-destructive/20 backdrop-blur-sm">
                <ArrowUpRight className="h-8 w-8 text-destructive" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold">Withdraw Funds</CardTitle>
            <CardDescription>
              Available Balance: ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleWithdraw} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="glass-input text-2xl font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {quickAmounts.map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    type="button"
                    variant="outline"
                    onClick={() => setAmount(quickAmount.toString())}
                    className="glass-card hover:bg-destructive/20 hover:border-destructive/50"
                    disabled={quickAmount > balance}
                  >
                    ${quickAmount}
                  </Button>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  type="text"
                  placeholder="e.g., Bills, Shopping"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="glass-input"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                size="lg"
              >
                Withdraw ${amount || "0.00"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Withdraw;
