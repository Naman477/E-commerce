import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, Package, Settings, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Strict Admin Check
    useEffect(() => {
        if (!user) {
            navigate("/login"); // Send to Login if not authenticated
            return;
        }

        if (user.email !== "admin@farmisian.com") {
            toast.error(`Access Denied: Logged in as ${user.email}. Please login as admin.`);
            navigate("/"); // Send to Home if unauthorized
        }
    }, [user, navigate]);

    const sidebarLinks = [
        { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
        { name: "Products", path: "/admin/products", icon: Package },
        { name: "Orders", path: "/admin/orders", icon: ShoppingBag },
        { name: "Settings", path: "/admin/settings", icon: Settings },
    ];

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-border transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-16"
                    } hidden md:flex flex-col`}
            >
                <div className="h-16 flex items-center justify-between px-4 border-b border-border">
                    {isSidebarOpen && (
                        <span className="font-display font-bold text-xl text-primary">Admin</span>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="ml-auto"
                    >
                        {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {sidebarLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${location.pathname === link.path
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-muted-foreground hover:bg-muted"
                                }`}
                        >
                            <link.icon className="h-5 w-5 shrink-0" />
                            {isSidebarOpen && <span>{link.name}</span>}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-border">
                    <button
                        onClick={handleLogout}
                        className={`flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-destructive hover:bg-destructive/10 transition-colors ${!isSidebarOpen && "justify-center"
                            }`}
                    >
                        <LogOut className="h-5 w-5 shrink-0" />
                        {isSidebarOpen && <span>Log out</span>}
                    </button>
                </div>
            </aside>

            {/* Mobile Header (Top Bar) */}
            <div className="flex-1 flex flex-col md:ml-16 lg:ml-64 transition-all duration-300">
                <header className="h-16 bg-white border-b border-border flex md:hidden items-center justify-between px-4 sticky top-0 z-40">
                    <span className="font-display font-bold text-xl text-primary">Admin</span>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                    </Button>
                </header>

                {/* Main Content */}
                <main className="p-6 md:p-8 max-w-7xl mx-auto w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
