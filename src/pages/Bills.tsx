import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Zap, Smartphone, Wifi, Droplet } from "lucide-react";
import { toast } from "sonner";

const Bills = () => {
  const navigate = useNavigate();
  const [selectedBill, setSelectedBill] = useState<string | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth) {
      navigate("/");
      return;
    }
    const currentBalance = parseFloat(localStorage.getItem("balance") || "0");
    setBalance(currentBalance);
  }, [navigate]);

  const billTypes = [
    { id: "electricity", name: "Electricity", icon: Zap, color: "text-yellow-500" },
    { id: "mobile", name: "Mobile", icon: Smartphone, color: "text-blue-500" },
    { id: "internet", name: "Internet", icon: Wifi, color: "text-purple-500" },
    { id: "water", name: "Water", icon: Droplet, color: "text-cyan-500" },
  ];

  const handlePayBill = (e: React.FormEvent) => {
    e.preventDefault();

    const paymentAmount = parseFloat(amount);
    if (paymentAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (paymentAmount > balance) {
      toast.error("Insufficient funds");
      return;
    }

    const newBalance = balance - paymentAmount;
    localStorage.setItem("balance", newBalance.toString());

    const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    const billType = billTypes.find((b) => b.id === selectedBill);
    const newTransaction = {
      id: Date.now().toString(),
      type: "withdraw",
      amount: paymentAmount,
      date: new Date().toISOString(),
      description: `${billType?.name} Bill Payment`,
    };
    transactions.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    toast.success(`${billType?.name} bill paid successfully!`);
    setAmount("");
    setAccountNumber("");
    setSelectedBill(null);
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

        <Card className="glass-card">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold gradient-text">Bill Payments</CardTitle>
            <CardDescription>
              Available Balance: ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Bill Type Selection */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Select Bill Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {billTypes.map((bill) => {
                const Icon = bill.icon;
                return (
                  <Button
                    key={bill.id}
                    onClick={() => setSelectedBill(bill.id)}
                    className={`h-28 glass-card hover:bg-primary/20 hover:border-primary/50 transition-all ${
                      selectedBill === bill.id ? "bg-primary/20 border-primary/50" : ""
                    }`}
                    variant="outline"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Icon className={`h-8 w-8 ${bill.color}`} />
                      <span className="text-sm font-semibold">{bill.name}</span>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        {selectedBill && (
          <Card className="glass-card animate-slide-up">
            <CardHeader>
              <CardTitle>
                Pay {billTypes.find((b) => b.id === selectedBill)?.name} Bill
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePayBill} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="account-number">Account/Consumer Number</Label>
                  <Input
                    id="account-number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="glass-input"
                    placeholder="Enter your account number"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bill-amount">Amount ($)</Label>
                  <Input
                    id="bill-amount"
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="glass-input text-2xl font-bold"
                    placeholder="0.00"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  Pay ${amount || "0.00"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Bills;
