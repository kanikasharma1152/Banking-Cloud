import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Bell, CheckCircle2, AlertTriangle, Info, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: string;
  type: "success" | "warning" | "info";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "success",
      title: "Deposit Successful",
      message: "Your account has been credited with $3,000.00",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "2",
      type: "info",
      title: "New Feature Available",
      message: "Check out our new investment dashboard!",
      time: "1 day ago",
      read: false,
    },
    {
      id: "3",
      type: "warning",
      title: "Security Alert",
      message: "New login detected from Chrome on Windows",
      time: "2 days ago",
      read: true,
    },
    {
      id: "4",
      type: "success",
      title: "Bill Payment Processed",
      message: "Your electricity bill of $150.00 has been paid",
      time: "3 days ago",
      read: true,
    },
  ]);

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth) {
      navigate("/");
      return;
    }
  }, [navigate]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      default:
        return <Info className="h-5 w-5 text-primary" />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

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
            <div className="flex justify-center relative">
              <div className="p-3 rounded-2xl bg-primary/20 backdrop-blur-sm">
                <Bell className="h-8 w-8 text-primary" />
              </div>
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-6 w-6 flex items-center justify-center rounded-full bg-destructive">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <CardTitle className="text-3xl font-bold gradient-text">Notifications</CardTitle>
            <CardDescription>Stay updated with your account activity</CardDescription>
          </CardHeader>
        </Card>

        {unreadCount > 0 && (
          <div className="flex justify-end">
            <Button
              onClick={markAllAsRead}
              variant="outline"
              className="glass-card hover:bg-primary/20"
            >
              Mark all as read
            </Button>
          </div>
        )}

        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`glass-card transition-all hover:bg-muted/20 cursor-pointer ${
                !notification.read ? "border-primary/50" : ""
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 p-2 rounded-lg glass-card">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-lg">{notification.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {notification.time}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
