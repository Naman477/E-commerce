import { useState } from "react";
import { useForm } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { categories } from "@/data/products";

interface ProductForm {
    name: string;
    description: string;
    price: string;
    category: string;
    image: string;
    inStock: boolean;
}

const AdminProductForm = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProductForm>();

    const onSubmit = async (data: ProductForm) => {
        setLoading(true);
        try {
            await addDoc(collection(db, "products"), {
                ...data,
                price: Number(data.price),
                inStock: true,
                rating: 0,
                reviews: 0,
                images: [data.image], // Simplification for MVP
                tags: [],
                createdAt: new Date(),
            });
            toast.success("Product created successfully!");
            navigate("/admin/products");
        } catch (error) {
            console.error("Error creating product:", error);
            toast.error("Failed to create product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-display font-bold">Add New Product</h1>
                <Button variant="outline" onClick={() => navigate("/admin/products")}>
                    Cancel
                </Button>
            </div>

            <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div className="space-y-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input id="name" {...register("name", { required: "Name is required" })} placeholder="e.g. Organic Apples" />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" {...register("description", { required: "Description is required" })} placeholder="Describe the product..." />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="price">Price (₹)</Label>
                            <Input id="price" type="number" {...register("price", { required: "Price is required", min: 1 })} placeholder="200" />
                            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select onValueChange={(val) => setValue("category", val)} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">Image URL</Label>
                        <Input id="image" {...register("image", { required: "Image URL is required" })} placeholder="https://..." />
                        <p className="text-xs text-muted-foreground">For MVP, paste a direct image link (e.g. Unsplash).</p>
                        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                    </div>

                    <Button type="submit" className="w-full gradient-fresh" disabled={loading}>
                        {loading ? "Creating..." : "Create Product"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AdminProductForm;
