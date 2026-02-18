import { useEffect, useState } from "react";
import { collection, getCountFromServer, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, ShoppingBag, Users } from "lucide-react";

export const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalSales: 0,
        totalOrders: 0,
        totalProducts: 0,
        totalUsers: 0, // Placeholder if we don't track users in a collection
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Product Count
                const productsColl = collection(db, "products");
                const productsSnapshot = await getCountFromServer(productsColl);

                // Orders Count & Total Sales
                const ordersColl = collection(db, "orders");
                // Note: getCountFromServer is cheaper, but to sum sales we need docs
                // For optimization, we should keep a running total in a separate doc.
                // For now, fetching all orders (assuming small scale) or limited batch.
                const ordersSnapshot = await getDocs(ordersColl);

                let sales = 0;
                ordersSnapshot.docs.forEach(doc => {
                    const data = doc.data();
                    sales += Number(data.totalAmount) || 0;
                });

                setStats({
                    totalSales: sales,
                    totalOrders: ordersSnapshot.size,
                    totalProducts: productsSnapshot.data().count,
                    totalUsers: 0,
                });
            } catch (error) {
                console.error("Error fetching admin stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        {
            title: "Total Revenue",
            value: `₹${stats.totalSales.toLocaleString('en-IN')}`,
            icon: DollarSign,
            description: "Lifetime revenue",
        },
        {
            title: "Orders",
            value: stats.totalOrders.toString(),
            icon: ShoppingBag,
            description: "Total orders placed",
        },
        {
            title: "Products",
            value: stats.totalProducts.toString(),
            icon: Package,
            description: "Active products",
        },
        // {
        //   title: "Customers",
        //   value: stats.totalUsers.toString(),
        //   icon: Users,
        //   description: "Registered users",
        // },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-display font-bold">Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {statCards.map((stat, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{loading ? "..." : stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
