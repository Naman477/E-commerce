import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

const Contact = () => {
    const form = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // NOTE: Replace these with your actual EmailJS Service ID, Template ID, and Public Key
        // You can get these from https://dashboard.emailjs.com/admin
        const SERVICE_ID = "service_tm60t0p";
        const TEMPLATE_ID = "template_525hmjf";
        const PUBLIC_KEY = "v1RKlm6Nrhn6jaUGe";

        emailjs
            .sendForm(SERVICE_ID, TEMPLATE_ID, form.current!, {
                publicKey: PUBLIC_KEY,
            })
            .then(
                () => {
                    toast.success("Message sent successfully!");
                    if (form.current) form.current.reset();
                },
                (error) => {
                    console.error("FAILED...", error.text);
                    toast.error("Failed to send message. Please try again.");
                }
            )
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero */}
            <section className="relative overflow-hidden gradient-hero py-20 md:py-32">
                <div className="container mx-auto px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
                    >
                        Get in <span className="text-gradient">Touch</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        Have questions about our organic produce? We'd love to hear from you.
                    </motion.p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                                Contact Information
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                Reach out to us for any queries, partnerships, or feedback.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <MapPin className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Address</h4>
                                        <p className="text-muted-foreground">123, Civil Lines, Kanpur, Uttar Pradesh, India</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <Mail className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Email</h4>
                                        <p className="text-muted-foreground">Farmisian@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <Clock className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Hours</h4>
                                        <p className="text-muted-foreground">Mon-Sat: 8am - 8pm</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-card rounded-xl border border-border p-6 md:p-8"
                        >
                            <h3 className="font-display font-semibold text-xl mb-6">Send us a Message</h3>
                            <form ref={form} onSubmit={sendEmail} className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">First Name</label>
                                        <Input name="user_firstname" placeholder="Amit" required />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Last Name</label>
                                        <Input name="user_lastname" placeholder="Sharma" required />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Email</label>
                                    <Input name="user_email" type="email" placeholder="amit.sharma@example.com" required />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Message</label>
                                    <Textarea
                                        name="message"
                                        placeholder="How can we help you?"
                                        rows={4}
                                        required
                                    />
                                </div>
                                <Button size="lg" className="w-full gradient-fresh" type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </Button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;
