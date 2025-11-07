import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, Calculator, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";

const Loans = () => {
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState(10000);
  const [loanTenure, setLoanTenure] = useState(12);
  const [monthlyEMI, setMonthlyEMI] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth) {
      navigate("/");
      return;
    }
  }, [navigate]);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, loanTenure]);

  const calculateEMI = () => {
    const principal = loanAmount;
    const rateOfInterest = 12; // 12% annual
    const monthlyRate = rateOfInterest / 12 / 100;
    const tenure = loanTenure;

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);

    const totalAmount = emi * tenure;
    const interest = totalAmount - principal;

    setMonthlyEMI(emi);
    setTotalInterest(interest);
  };

  const handleApplyLoan = () => {
    toast.success("Loan application submitted! We'll review and get back to you soon.");
  };

  const loanTypes = [
    { name: "Personal Loan", rate: "12%", maxAmount: "$50,000" },
    { name: "Home Loan", rate: "8%", maxAmount: "$500,000" },
    { name: "Car Loan", rate: "10%", maxAmount: "$100,000" },
  ];

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
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold gradient-text">Loans</CardTitle>
            <CardDescription>Apply for loans or calculate your EMI</CardDescription>
          </CardHeader>
        </Card>

        {/* Loan Types */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Available Loan Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {loanTypes.map((loan) => (
                <div key={loan.name} className="p-4 glass-card">
                  <h3 className="font-semibold text-lg mb-2">{loan.name}</h3>
                  <p className="text-sm text-muted-foreground">Interest Rate: {loan.rate}</p>
                  <p className="text-sm text-muted-foreground">Max Amount: {loan.maxAmount}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* EMI Calculator */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              EMI Calculator
            </CardTitle>
            <CardDescription>Calculate your monthly installment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>Loan Amount</Label>
                <span className="text-lg font-bold text-primary">
                  ${loanAmount.toLocaleString()}
                </span>
              </div>
              <Slider
                value={[loanAmount]}
                onValueChange={(value) => setLoanAmount(value[0])}
                min={1000}
                max={100000}
                step={1000}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>Loan Tenure (Months)</Label>
                <span className="text-lg font-bold text-primary">{loanTenure} months</span>
              </div>
              <Slider
                value={[loanTenure]}
                onValueChange={(value) => setLoanTenure(value[0])}
                min={6}
                max={60}
                step={6}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="p-4 glass-card border-primary/30">
                <p className="text-sm text-muted-foreground mb-1">Monthly EMI</p>
                <p className="text-2xl font-bold text-primary">
                  ${monthlyEMI.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className="p-4 glass-card border-accent/30">
                <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
                <p className="text-2xl font-bold text-accent">
                  ${totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            <Button
              onClick={handleApplyLoan}
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
            >
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Apply for Loan
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Loans;
