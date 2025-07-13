"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "../../constants/index";


const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-lg bg-white/5 supports-[backdrop-filter]:bg-white/5">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link href="/">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg" />
                        <span className="text-xl font-semibold text-white drop-shadow-sm">
                            NeuroNote
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <ul className="hidden lg:flex items-center gap-10 text-sm text-white/80">
                    {navItems.map((item) => (
                        <li key={item.label}>
                            <Link href={item.href} className="hover:text-white transition-colors duration-200 drop-shadow-sm">
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Desktop CTAs */}
                <div className="hidden lg:flex items-center gap-4">
                    <Link href="/login">
                        <button className="px-4 py-2 border border-white/20 rounded-lg text-sm text-white/90 hover:bg-white/10 backdrop-blur-sm transition-all duration-200">
                            Sign In
                        </button>
                    </Link>
                    <Link href="/signup">
                        <button className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg">
                            Get Started
                        </button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden text-white/90 hover:text-white transition-colors duration-200"
                    onClick={() => setMobileOpen((prev) => !prev)}
                >
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden bg-black/20 backdrop-blur-md border-t border-white/10 px-6 py-4 space-y-6"
                    >
                        <ul className="flex flex-col gap-4 text-white/80 text-sm">
                            {navItems.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="hover:text-white transition-colors duration-200 drop-shadow-sm"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-col gap-3">
                            <Link href="/login">
                                <button className="w-full border border-white/20 py-2 rounded-lg text-sm text-white/90 hover:bg-white/10 backdrop-blur-sm transition-all duration-200">
                                    Sign In
                                </button>
                            </Link>
                            <Link href="/signup">
                                <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 text-sm transition-all duration-200 shadow-lg">
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