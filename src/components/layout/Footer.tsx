import { Link } from "react-router-dom";
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="text-2xl font-display font-bold">Farmisian</span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed">
              Bringing farm-fresh, organic produce directly to your doorstep.
              We believe in sustainable farming and healthy living.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "Products", "About Us", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    to={link === "Home" ? "/" : link === "Contact" ? "/contact" : `/${link.toLowerCase().replace(" ", "-")}`}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-4">Categories</h3>
            <ul className="space-y-3">
              {[
                { name: "Fresh Fruits", id: "fruits" },
                { name: "Vegetables", id: "vegetables" },
                { name: "Dairy & Eggs", id: "dairy" },
                { name: "Bakery", id: "bakery" },
                { name: "Beverages", id: "beverages" }
              ].map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/products?category=${cat.id}`}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-4">Newsletter</h3>
            <p className="text-background/70 text-sm mb-4">
              Subscribe for exclusive offers and fresh updates!
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Your email"
                type="email"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
              />
              <Button
                className="shrink-0"
                onClick={() => {
                  // In a real app, this would connect to a backend
                  // For now, we'll simulate a success message
                  const { toast } = require("sonner");
                  toast.success("Subscribed to newsletter!");
                }}
              >
                Subscribe
              </Button>
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-background/70 text-sm">
                <Mail className="h-4 w-4" />
                <a href="mailto:Farmisian@gmail.com" className="hover:text-primary transition-colors">
                  Farmisian@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-background/70 text-sm">
                <MapPin className="h-4 w-4" />
                <span>123, Civil Lines, Kanpur, Uttar Pradesh, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/60">
            <p>© {currentYear} Farmisian. Developed for College Project. Not a real store.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-background transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-background transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-background transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
