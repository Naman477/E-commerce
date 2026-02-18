import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, Calendar, MapPin, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";

interface Order {
    id: string;
    items: any[];
    total: number;
    status: string;
    createdAt: string;
    shipping: any;
}

const Orders = () => {
    const { user, isAuthenticated } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;

            try {
                const q = query(
                    collection(db, "orders"),
                    where("userId", "==", user.id),
                    orderBy("createdAt", "desc")
                );

                const querySnapshot = await getDocs(q);
                const ordersData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Order[];

                setOrders(ordersData);
            } catch (error) {
                console.error("Error fetching orders:", error);
                // Note: Missing index error might occur here initially
                toast.error("Could not load orders. Ensure indexes are built in Firebase Console if this persists.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Please log in to view your orders</h2>
                        <Button asChild>
                            <Link to="/login">Login</Link>
                        </Button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-display font-bold">Your Orders</h1>
                    <Button asChild variant="outline">
                        <Link to="/profile">Back to Profile</Link>
                    </Button>
                </div>

                {loading ? (
                    <div className="text-center py-12">Loading orders...</div>
                ) : orders.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16 bg-muted/30 rounded-2xl"
                    >
                        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
                        <p className="text-muted-foreground mb-6">You haven't placed any orders yet.</p>
                        <Button asChild className="gradient-fresh">
                            <Link to="/products">Start Shopping</Link>
                        </Button>
                    </motion.div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order, index) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-card border border-border rounded-xl overflow-hidden"
                            >
                                <div className="p-6 border-b border-border flex flex-wrap gap-4 justify-between items-center bg-muted/20">
                                    <div className="flex gap-4 text-sm">
                                        <div>
                                            <p className="text-muted-foreground">Order ID</p>
                                            <p className="font-mono font-medium">{order.id.slice(0, 8)}...</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Date</p>
                                            <div className="flex items-center gap-1 font-medium">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(order.createdAt).toLocaleDateString('en-IN')}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Total</p>
                                            <p className="font-bold text-primary">₹{order.total.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <Badge className={
                                        order.status === 'delivered' ? 'bg-green-500' :
                                            order.status === 'shipped' ? 'bg-blue-500' : 'bg-yellow-500'
                                    }>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </Badge>
                                </div>

                                <div className="p-6">
                                    <div className="space-y-4">
                                        {order.items.map((item: any, i: number) => (
                                            <div key={i} className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                                                    {item.product?.image && <img src={item.product.image} alt="" className="w-full h-full object-cover" />}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium">{item.product?.name || "Product"}</p>
                                                    <p className="text-sm text-muted-foreground">Qty: {item.quantity} × ₹{item.product?.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Orders;
