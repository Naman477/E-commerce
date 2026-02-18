import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Tag, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { state, removeItem, updateQuantity, clearCart, totalPrice, totalItems } = useCart();

  const shipping = totalPrice >= 2000 ? 0 : 100;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shipping + tax;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Shopping Cart
            </h1>
            <p className="text-muted-foreground">
              {totalItems > 0
                ? `You have ${totalItems} item${totalItems > 1 ? "s" : ""} in your cart`
                : "Your cart is empty"}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {state.items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <ShoppingBag className="h-20 w-20 text-muted-foreground/30 mx-auto mb-6" />
              <h2 className="text-2xl font-display font-semibold mb-4">
                Your cart is empty
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Looks like you haven't added any products to your cart yet.
                Start shopping to fill it up!
              </p>
              <Button size="lg" className="gradient-fresh" asChild>
                <Link to="/products">
                  Start Shopping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-display font-semibold">Cart Items</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={clearCart}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>
                </div>

                {state.items.map((item, index) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card rounded-xl border border-border p-4 md:p-6"
                  >
                    <div className="flex gap-4 md:gap-6">
                      <Link to={`/products/${item.product.id}`}>
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                          <div>
                            <Link
                              to={`/products/${item.product.id}`}
                              className="font-display font-semibold text-lg hover:text-primary transition-colors"
                            >
                              {item.product.name}
                            </Link>
                            {item.product.weight && (
                              <p className="text-sm text-muted-foreground">
                                {item.product.weight}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-primary">
                              ₹{(item.product.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              ₹{item.product.price.toFixed(2)} each
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-border rounded-lg">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9"
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-10 text-center font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9"
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => removeItem(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Continue Shopping */}
                <div className="pt-4">
                  <Button variant="outline" asChild>
                    <Link to="/products">
                      <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-card rounded-xl border border-border p-6 sticky top-24"
                >
                  <h2 className="text-xl font-display font-semibold mb-6">
                    Order Summary
                  </h2>

                  {/* Discount Code */}
                  <div className="mb-6">
                    <label className="text-sm font-medium mb-2 block">
                      Discount Code
                    </label>
                    <div className="flex gap-2">
                      <Input placeholder="Enter code" />
                      <Button variant="outline">
                        <Tag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Pricing */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      {shipping === 0 ? (
                        <span className="text-primary">Free</span>
                      ) : (
                        <span>₹{shipping.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-primary">₹{finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Free Shipping Notice */}
                  {totalPrice < 2000 && (
                    <div className="mt-4 p-3 bg-muted/50 rounded-lg flex items-center gap-2 text-sm">
                      <Truck className="h-4 w-4 text-primary shrink-0" />
                      <span>
                        Add <span className="font-semibold text-primary">₹{(2000 - totalPrice).toFixed(2)}</span> more for free shipping!
                      </span>
                    </div>
                  )}

                  <Button size="lg" className="w-full mt-6 gradient-fresh shadow-fresh" asChild>
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </Button>

                  {/* Trust Badges */}
                  <div className="mt-6 flex justify-center gap-4 text-xs text-muted-foreground">
                    <span>🔒 Secure Checkout</span>
                    <span>•</span>
                    <span>💳 All Cards Accepted</span>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cart;
