import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Send, Users, Plus } from "lucide-react";
import { toast } from "sonner";

interface Beneficiary {
  id: string;
  name: string;
  account: string;
  bank: string;
}

const Transfer = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [note, setNote] = useState("");
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth) {
      navigate("/");
      return;
    }
    const currentBalance = parseFloat(localStorage.getItem("balance") || "0");
    setBalance(currentBalance);

    const savedBeneficiaries = localStorage.getItem("beneficiaries");
    if (savedBeneficiaries) {
      setBeneficiaries(JSON.parse(savedBeneficiaries));
    }
  }, [navigate]);

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();

    const transferAmount = parseFloat(amount);
    if (transferAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (transferAmount > balance) {
      toast.error("Insufficient funds");
      return;
    }

    const newBalance = balance - transferAmount;
    localStorage.setItem("balance", newBalance.toString());

    const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    const newTransaction = {
      id: Date.now().toString(),
      type: "withdraw",
      amount: transferAmount,
      date: new Date().toISOString(),
      description: `Transfer to ${recipientName}`,
    };
    transactions.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    toast.success(`Successfully transferred $${transferAmount.toFixed(2)} to ${recipientName}`);
    setAmount("");
    setRecipientName("");
    setAccountNumber("");
    setBankName("");
    setNote("");
  };

  const selectBeneficiary = (beneficiary: Beneficiary) => {
    setRecipientName(beneficiary.name);
    setAccountNumber(beneficiary.account);
    setBankName(beneficiary.bank);
  };

  const saveBeneficiary = () => {
    if (!recipientName || !accountNumber || !bankName) {
      toast.error("Please fill in all recipient details");
      return;
    }

    const newBeneficiary: Beneficiary = {
      id: Date.now().toString(),
      name: recipientName,
      account: accountNumber,
      bank: bankName,
    };

    const updatedBeneficiaries = [...beneficiaries, newBeneficiary];
    setBeneficiaries(updatedBeneficiaries);
    localStorage.setItem("beneficiaries", JSON.stringify(updatedBeneficiaries));
    toast.success("Beneficiary saved successfully");
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
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-3 rounded-2xl bg-primary/20 backdrop-blur-sm">
                <Send className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold">Transfer Money</CardTitle>
            <CardDescription>
              Available Balance: ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Saved Beneficiaries */}
        {beneficiaries.length > 0 && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Saved Beneficiaries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {beneficiaries.map((beneficiary) => (
                  <div
                    key={beneficiary.id}
                    onClick={() => selectBeneficiary(beneficiary)}
                    className="p-4 glass-card hover:bg-primary/10 cursor-pointer transition-all"
                  >
                    <p className="font-semibold">{beneficiary.name}</p>
                    <p className="text-sm text-muted-foreground">{beneficiary.bank}</p>
                    <p className="text-xs text-muted-foreground font-mono">{beneficiary.account}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Transfer Form */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Transfer Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTransfer} className="space-y-4">
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

              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient Name</Label>
                <Input
                  id="recipient"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="glass-input"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="account">Account Number</Label>
                <Input
                  id="account"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="glass-input"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bank">Bank Name</Label>
                <Input
                  id="bank"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="glass-input"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="note">Note (Optional)</Label>
                <Input
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="glass-input"
                  placeholder="e.g., Rent payment"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  onClick={saveBeneficiary}
                  variant="outline"
                  className="glass-card hover:bg-muted/50"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Save Beneficiary
                </Button>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90"
                >
                  Transfer ${amount || "0.00"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Transfer;
