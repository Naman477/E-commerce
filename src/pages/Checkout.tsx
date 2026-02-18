import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "sonner";

const Checkout = () => {
    const { state, totalPrice, clearCart } = useCart();
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Form states
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");

    const shipping = totalPrice >= 2000 ? 0 : 100;
    const tax = totalPrice * 0.08;
    const finalTotal = totalPrice + shipping + tax;

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isAuthenticated) {
            toast.error("Please login to place an order");
            navigate("/login");
            return;
        }

        setIsProcessing(true);

        try {
            // Create Order Object
            const orderData = {
                userId: user?.id,
                items: state.items,
                subtotal: totalPrice,
                shipping,
                tax,
                total: finalTotal,
                status: 'processing',
                createdAt: new Date().toISOString(),
                shippingAddress: {
                    firstName,
                    lastName,
                    address,
                    city,
                    zip
                },
                paymentMethod: 'cod' // In a real app, capture this from form
            };

            // Save to Firestore
            await addDoc(collection(db, "orders"), orderData);

            setIsSuccess(true);
            clearCart();
            toast.success("Order placed successfully!");
        } catch (error) {
            console.error("Order error:", error);
            toast.error("Failed to place order. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center max-w-md w-full bg-card p-8 rounded-2xl border border-border shadow-lg"
                    >
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="h-10 w-10 text-primary" />
                        </div>
                        <h1 className="text-3xl font-display font-bold mb-4">Order Confirmed!</h1>
                        <p className="text-muted-foreground mb-8">
                            Thank you for your purchase. We have received your order and will begin processing it right away.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Button variant="outline" asChild>
                                <Link to="/orders">View Orders</Link>
                            </Button>
                            <Button className="gradient-fresh" asChild>
                                <Link to="/products">Continue Shopping</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
                <Footer />
            </div>
        );
    }

    if (state.items.length === 0) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                        <Button asChild>
                            <Link to="/products">Start Shopping</Link>
                        </Button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <Button variant="ghost" asChild className="mb-8">
                        <Link to="/cart">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Cart
                        </Link>
                    </Button>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-8">
                                {/* Shipping Info */}
                                <div className="bg-card p-6 rounded-xl border border-border">
                                    <h2 className="text-xl font-display font-semibold mb-6">Shipping Information</h2>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstname">First Name</Label>
                                            <Input
                                                id="firstname"
                                                required
                                                placeholder="Amit"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastname">Last Name</Label>
                                            <Input
                                                id="lastname"
                                                required
                                                placeholder="Sharma"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </div>
                                        <div className="sm:col-span-2 space-y-2">
                                            <Label htmlFor="address">Address</Label>
                                            <Input
                                                id="address"
                                                required
                                                placeholder="123, MG Road, Bandra West"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="city">City</Label>
                                            <Input
                                                id="city"
                                                required
                                                placeholder="Mumbai"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="zip">ZIP Code</Label>
                                            <Input
                                                id="zip"
                                                required
                                                placeholder="400050"
                                                value={zip}
                                                onChange={(e) => setZip(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div className="bg-card p-6 rounded-xl border border-border">
                                    <h2 className="text-xl font-display font-semibold mb-6">Payment Method</h2>
                                    <RadioGroup defaultValue="card">
                                        <div className="flex items-center space-x-2 border rounded-lg p-4 bg-muted/30">
                                            <RadioGroupItem value="card" id="card" />
                                            <Label htmlFor="card" className="flex-1 cursor-pointer">Credit / Debit Card</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 border rounded-lg p-4 bg-muted/30">
                                            <RadioGroupItem value="upi" id="upi" />
                                            <Label htmlFor="upi" className="flex-1 cursor-pointer">UPI / Netbanking</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 border rounded-lg p-4 bg-muted/30">
                                            <RadioGroupItem value="cod" id="cod" />
                                            <Label htmlFor="cod" className="flex-1 cursor-pointer">Cash on Delivery</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </form>
                        </div>

                        {/* Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-card p-6 rounded-xl border border-border sticky top-24">
                                <h2 className="text-xl font-display font-semibold mb-6">Order Summary</h2>
                                <div className="space-y-4 mb-6">
                                    {state.items.map((item) => (
                                        <div key={item.product.id} className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">
                                                {item.quantity}x {item.product.name}
                                            </span>
                                            <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                                <Separator className="mb-6" />
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>₹{totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Tax</span>
                                        <span>₹{tax.toFixed(2)}</span>
                                    </div>
                                    <Separator className="my-2" />
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span className="text-primary">₹{finalTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    form="checkout-form"
                                    size="lg"
                                    className="w-full mt-6 gradient-fresh"
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? "Processing..." : "Place Order"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Checkout;
