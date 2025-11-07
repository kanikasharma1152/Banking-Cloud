import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Headphones, Mail, MessageCircle, Phone, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";

const Support = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth) {
      navigate("/");
      return;
    }
    setName(localStorage.getItem("userName") || "");
    setEmail(localStorage.getItem("userEmail") || "");
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Support ticket submitted! We'll get back to you within 24 hours.");
    setMessage("");
  };

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "Go to Profile > Security Settings and click 'Change Password'. Enter your current password and new password to update it.",
    },
    {
      question: "What are the transaction limits?",
      answer: "Daily transaction limit is $10,000 for transfers and $5,000 for withdrawals. You can request higher limits by contacting support.",
    },
    {
      question: "How long do transfers take?",
      answer: "Internal transfers are instant. External transfers typically take 1-3 business days depending on the receiving bank.",
    },
    {
      question: "Is my account secure?",
      answer: "Yes! We use bank-grade encryption, two-factor authentication, and continuous monitoring to keep your account safe.",
    },
    {
      question: "How do I freeze my card?",
      answer: "Go to Cards section and click the 'Freeze Card' button. You can unfreeze it anytime from the same page.",
    },
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
                <Headphones className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold gradient-text">Help & Support</CardTitle>
            <CardDescription>We're here to help you 24/7</CardDescription>
          </CardHeader>
        </Card>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="glass-card hover:bg-primary/10 transition-all cursor-pointer">
            <CardContent className="pt-6 text-center">
              <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-sm text-muted-foreground">+1 800 SMART BANK</p>
            </CardContent>
          </Card>
          <Card className="glass-card hover:bg-primary/10 transition-all cursor-pointer">
            <CardContent className="pt-6 text-center">
              <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-sm text-muted-foreground">support@smartbank.cloud</p>
            </CardContent>
          </Card>
          <Card className="glass-card hover:bg-primary/10 transition-all cursor-pointer">
            <CardContent className="pt-6 text-center">
              <MessageCircle className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground">Available 24/7</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQs */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
            <CardDescription>We'll respond within 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="support-name">Name</Label>
                  <Input
                    id="support-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="glass-input"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-email">Email</Label>
                  <Input
                    id="support-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="glass-input"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="support-message">Message</Label>
                <Textarea
                  id="support-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="glass-input min-h-32"
                  placeholder="How can we help you?"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Support;
