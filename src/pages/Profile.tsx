import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { User, Mail, Calendar, MapPin } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Profile = () => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated || !user) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Please log in to view your profile</h2>
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
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl mx-auto bg-card rounded-2xl border border-border shadow-lg overflow-hidden"
                >
                    <div className="bg-primary/10 p-8 text-center">
                        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                            <User className="h-12 w-12" />
                        </div>
                        <h1 className="text-3xl font-display font-bold">{user.name}</h1>
                        <p className="text-muted-foreground">{user.role === 'customer' ? 'Valued Customer' : 'User'}</p>
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                                <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shadow-sm">
                                    <Mail className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="font-medium">{user.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                                <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shadow-sm">
                                    <Calendar className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Joined</p>
                                    <p className="font-medium">
                                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        }) : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-border">
                            <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
                            <div className="flex gap-4">
                                <Button asChild variant="outline">
                                    <Link to="/orders">View Order History</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default Profile;
