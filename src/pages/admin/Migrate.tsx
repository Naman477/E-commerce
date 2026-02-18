import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, doc, setDoc, writeBatch } from "firebase/firestore";
import { products, categories } from "@/data/products";
import { Button } from "@/components/ui/button";

const Migrate = () => {
    const [status, setStatus] = useState("Idle");

    const migrateData = async () => {
        setStatus("Migrating...");
        try {
            const batch = writeBatch(db);

            // Migrate Products
            products.forEach((product) => {
                const productRef = doc(collection(db, "products"), product.id);
                // Ensure price is number and formatted correctly
                const productData = {
                    ...product,
                    price: Number(product.price),
                    originalPrice: product.originalPrice ? Number(product.originalPrice) : null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                batch.set(productRef, productData);
            });

            // Migrate Categories (Optional, but good to have in DB)
            categories.forEach((cat) => {
                const catRef = doc(collection(db, "categories"), cat.id);
                batch.set(catRef, cat);
            });

            await batch.commit();
            setStatus("Migration Complete! ✅");
        } catch (error) {
            console.error("Migration failed:", error);
            setStatus(`Error: ${error.message}`);
        }
    };

    return (
        <div className="p-10 flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Data Migration</h1>
            <p className="mb-4">Status: {status}</p>
            <Button onClick={migrateData} disabled={status === "Migrating..." || status.includes("Complete")}>
                Start Migration
            </Button>
        </div>
    );
};

export default Migrate;
