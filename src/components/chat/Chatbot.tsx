import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Leaf, ShoppingBag, Truck, Info, HelpCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: React.ReactNode;
  timestamp: Date;
}

interface QuickReply {
  label: string;
  action: string;
  icon?: React.ElementType;
}

const quickReplies: QuickReply[] = [
  { label: "Track my order", action: "track_order", icon: Truck },
  { label: "Product recommendations", action: "recommendations", icon: Leaf },
  { label: "Return policy", action: "returns", icon: HelpCircle },
  { label: "Contact support", action: "contact", icon: MessageCircle },
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { totalItems, totalPrice } = useCart();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Namaste! 🙏 Welcome to Farmisian. I'm your personal assistant. How can I help you gently today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Personalized Greeting on Open
  useEffect(() => {
    if (isOpen && messages.length === 1 && isAuthenticated && user) {
      setMessages(prev => [
        ...prev,
        {
          id: "welcome-user",
          role: "assistant",
          content: `Hi ${user.name}! It's great to see you again. Need help with a recent order or looking for fresh produce?`,
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen, isAuthenticated, user]);

  const processIntent = (text: string): React.ReactNode => {
    const lowerText = text.toLowerCase();

    // 1. Order Tracking / Status
    if (lowerText.includes("order") || lowerText.includes("track") || lowerText.includes("status")) {
      if (isAuthenticated) {
        return (
          <div className="space-y-2">
            <p>You can track your recent orders in your profile.</p>
            <Button size="sm" variant="outline" className="w-full justify-start" asChild>
              <Link to="/orders"><ShoppingBag className="mr-2 h-3 w-3" /> View My Orders</Link>
            </Button>
          </div>
        );
      } else {
        return (
          <div className="space-y-2">
            <p>To track your orders, please login to your account first.</p>
            <Button size="sm" className="gradient-fresh w-full" asChild>
              <Link to="/login">Login Now</Link>
            </Button>
          </div>
        );
      }
    }

    // 2. Cart Inquiry
    if (lowerText.includes("cart") || lowerText.includes("bag")) {
      if (totalItems > 0) {
        return (
          <div className="space-y-2">
            <p>You have <strong>{totalItems} items</strong> in your cart worth <strong>₹{totalPrice.toFixed(2)}</strong>. Ready to check out?</p>
            <Button size="sm" className="gradient-fresh w-full" asChild>
              <Link to="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        );
      } else {
        return "Your cart is currently empty! Why not fill it with some fresh organic fruits? 🍎";
      }
    }

    // 3. Product Recommendations
    if (lowerText.includes("recommend") || lowerText.includes("fruit") || lowerText.includes("vegetable") || lowerText.includes("buy")) {
      return (
        <div className="space-y-2">
          <p>Our top picks for you today:</p>
          <ul className="list-disc list-inside text-sm space-y-1 ml-1">
            <li>Fresh Organic Strawberries 🍓</li>
            <li>Himalayan Pink Salt</li>
            <li>Farm-Fresh A2 Milk 🥛</li>
          </ul>
          <Button size="sm" variant="secondary" className="w-full mt-2" asChild>
            <Link to="/products">Browse All Products</Link>
          </Button>
        </div>
      );
    }

    // 4. Returns & Refunds
    if (lowerText.includes("return") || lowerText.includes("refund")) {
      return "We have a 'No Questions Asked' return policy for damaged or stale items. Just report it within 24 hours of delivery through your Orders page, and we'll process an instant refund! 💸";
    }

    // 5. Contact / Human
    if (lowerText.includes("human") || lowerText.includes("support") || lowerText.includes("call") || lowerText.includes("contact")) {
      return (
        <div className="space-y-2">
          <p>Our support team is available 8 AM - 8 PM.</p>
          <div className="flex flex-col gap-1 text-sm bg-muted p-2 rounded-md">
            <span className="font-semibold">📞 +91 98765 43210</span>
            <span className="font-semibold">📧 help@farmisian.com</span>
          </div>
        </div>
      );
    }

    // 6. Generic Small Talk
    if (lowerText.includes("hi") || lowerText.includes("hello")) {
      return "Hello there! 🌿 How can I make your day fresher?";
    }

    if (lowerText.includes("thank")) {
      return "You're most welcome! Enjoy your healthy shopping! 🥗";
    }

    // Default Fallback
    return "I'm not quite sure about that, but I can help you find products, track orders, or answer questions about our organic certification! Try asking 'What do you sell?'";
  };

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate thinking delay
    setTimeout(() => {
      const responseContent = processIntent(text);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              size="lg"
              className="h-16 w-16 rounded-full gradient-fresh shadow-fresh hover:shadow-xl transition-all hover:scale-105"
              onClick={() => setIsOpen(true)}
            >
              <MessageCircle className="h-8 w-8" />
            </Button>
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-harvest-orange rounded-full animate-pulse border-2 border-background" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-2rem)] md:w-[400px] h-[600px] max-h-[85vh] flex flex-col font-sans"
          >
            <div className="bg-card flex-1 rounded-3xl shadow-2xl border border-border/50 overflow-hidden flex flex-col backdrop-blur-sm">
              {/* Header */}
              <div className="gradient-fresh p-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white text-lg">
                      Farmisian AI
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <p className="text-xs text-white/90 font-medium">Online</p>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 rounded-full"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4 bg-muted/30" ref={scrollRef}>
                <div className="space-y-6 pb-4">
                  <div className="flex justify-center">
                    <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">Today</span>
                  </div>

                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, x: message.role === "user" ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""
                        }`}
                    >
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${message.role === "user"
                          ? "bg-primary"
                          : "bg-white border border-border"
                          }`}
                      >
                        {message.role === "user" ? (
                          <User className="h-4 w-4 text-primary-foreground" />
                        ) : (
                          <Leaf className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div
                        className={`rounded-2xl px-5 py-3 max-w-[85%] shadow-sm ${message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-card border border-border text-foreground rounded-bl-none"
                          }`}
                      >
                        <div className="text-sm leading-relaxed">{message.content}</div>
                        <p
                          className={`text-[10px] mt-1.5 text-right ${message.role === "user"
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                            }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="h-8 w-8 rounded-full bg-white border border-border flex items-center justify-center shadow-sm">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                      <div className="bg-card border border-border rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                        <div className="flex gap-1.5 h-full items-center">
                          <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>

              {/* Quick Replies */}
              <div className="px-4 py-3 bg-background border-t border-border/50">
                <ScrollArea className="w-full whitespace-nowrap pb-2">
                  <div className="flex gap-2">
                    {quickReplies.map((reply) => (
                      <button
                        key={reply.action}
                        onClick={() => handleSend(reply.label)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors text-xs font-medium border border-border"
                      >
                        {reply.icon && <reply.icon className="h-3 w-3" />}
                        {reply.label}
                      </button>
                    ))}
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="flex gap-2 items-center mt-2">
                  <Input
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 rounded-full pl-5 pr-4 border-muted-foreground/20 focus-visible:ring-offset-0 focus-visible:ring-1 bg-muted/30"
                  />
                  <Button
                    size="icon"
                    className={`rounded-full shrink-0 transition-all duration-200 ${input.trim() ? "gradient-fresh shadow-md" : "bg-muted text-muted-foreground"}`}
                    onClick={() => handleSend()}
                    disabled={!input.trim()}
                  >
                    <Send className="h-4 w-4 ml-0.5" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
