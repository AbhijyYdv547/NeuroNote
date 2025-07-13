"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { label: "Features", href: "#features" },
    { label: "Workflow", href: "#workflow" },
    { label: "Pricing", href: "#pricing" },
    { label: "Testimonials", href: "#testimonials" },
];

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 border-b border-border backdrop-blur-md bg-background/80 py-3">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link href="/">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-full" />
                        <span className="text-xl font-semibold text-foreground">
                            NeuroNote
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <ul className="hidden lg:flex items-center gap-10 text-sm text-muted-foreground">
                    {navItems.map((item) => (
                        <li key={item.label}>
                            <Link href={item.href} className="hover:text-foreground transition">
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Desktop CTAs */}
                <div className="hidden lg:flex items-center gap-4">
                    <Link href="/login">
                        <button className="px-4 py-2 border rounded-lg text-sm hover:bg-accent transition">
                            Sign In
                        </button>
                    </Link>
                    <Link href="/signup">
                        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                            Get Started
                        </button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button className="lg:hidden" onClick={() => setMobileOpen((prev) => !prev)}>
                    {mobileOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="lg:hidden bg-background border-t border-border px-6 py-4 space-y-6"
                    >
                        <ul className="flex flex-col gap-4 text-muted-foreground text-sm">
                            {navItems.map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} onClick={() => setMobileOpen(false)}>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-col gap-3">
                            <Link href="/login">
                                <button className="w-full border py-2 rounded-lg text-sm hover:bg-accent transition">
                                    Sign In
                                </button>
                            </Link>
                            <Link href="/signup">
                                <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                                    Get Started
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
