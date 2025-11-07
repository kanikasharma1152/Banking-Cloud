import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowDownRight } from "lucide-react";
import { toast } from "sonner";

const Deposit = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const depositAmount = parseFloat(amount);
    if (depositAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const currentBalance = parseFloat(localStorage.getItem("balance") || "0");
    const newBalance = currentBalance + depositAmount;
    localStorage.setItem("balance", newBalance.toString());

    const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    const newTransaction = {
      id: Date.now().toString(),
      type: "deposit",
      amount: depositAmount,
      date: new Date().toISOString(),
      description: description || "Deposit",
    };
    transactions.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    toast.success(`Successfully deposited $${depositAmount.toFixed(2)}`);
    navigate("/dashboard");
  };

  const quickAmounts = [100, 500, 1000, 5000];

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
              <div className="p-3 rounded-2xl bg-success/20 backdrop-blur-sm">
                <ArrowDownRight className="h-8 w-8 text-success" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold">Deposit Funds</CardTitle>
            <CardDescription>Add money to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleDeposit} className="space-y-6">
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
                    className="glass-card hover:bg-success/20 hover:border-success/50"
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
                  placeholder="e.g., Salary, Gift"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="glass-input"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-success hover:bg-success/90 text-success-foreground"
                size="lg"
              >
                Deposit ${amount || "0.00"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Deposit;
