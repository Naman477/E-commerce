import React, { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    User as FirebaseUser
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { toast } from "sonner";
import { doc, setDoc, getDoc } from "firebase/firestore";

interface UserData {
    id: string;
    name: string;
    email: string;
    role?: string;
    createdAt?: string;
}

interface AuthContextType {
    user: UserData | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Fetch user data from Firestore
                try {
                    const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
                    if (userDoc.exists()) {
                        setUser({ id: firebaseUser.uid, ...userDoc.data() } as UserData);
                    } else {
                        // Fallback if firestore doc doesn't exist (shouldn't happen on normal flow)
                        setUser({
                            id: firebaseUser.uid,
                            name: firebaseUser.displayName || "User",
                            email: firebaseUser.email || "",
                        });
                    }
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // User state updated in onAuthStateChanged
        } catch (error: any) {
            console.error("Login error:", error);
            if (error.code === 'auth/invalid-credential') {
                throw new Error("Invalid email or password");
            }
            throw error;
        }
    };

    const register = async (email: string, password: string, name: string) => {
        try {
            const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);

            // Update Auth Profile
            await updateProfile(firebaseUser, { displayName: name });

            // Create User Document in Firestore
            const userData: UserData = {
                id: firebaseUser.uid,
                name,
                email,
                role: "customer",
                createdAt: new Date().toISOString(),
            };

            await setDoc(doc(db, "users", firebaseUser.uid), userData);

            setUser(userData);
            toast.success("Account created successfully!");
        } catch (error: any) {
            console.error("Registration error:", error);
            if (error.code === 'auth/email-already-in-use') {
                throw new Error("This email is already registered");
            }
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            toast.info("Logged out successfully");
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Failed to log out");
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, login, register, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
