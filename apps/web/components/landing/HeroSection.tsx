"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
    return (
        <section className="py-20 bg-background text-foreground px-4 sm:px-8 lg:px-16">
            <motion.div
                className="max-w-5xl mx-auto text-center space-y-8"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                {/* Heading */}
                <motion.h1
                    className="text-4xl sm:text-6xl font-bold leading-tight tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Build <span className="text-blue-500">together</span> in real time
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    className="text-muted-foreground text-lg sm:text-xl max-w-3xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                >
                    NeuroNote is your collaborative hub for team productivity — write, chat, brainstorm and ship ideas faster with one simple tool.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Link href="/signup">
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
                            Start for Free
                        </button>
                    </Link>
                    <Link href="/docs">
                        <button className="px-6 py-3 border border-border rounded-xl hover:bg-accent transition text-sm">
                            See Documentation
                        </button>
                    </Link>
                </motion.div>

                {/* Optional: Hero Video Block */}
                <motion.div
                    className="mt-12 flex flex-col sm:flex-row justify-center gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.65 }}
                >
                    <video
                        autoPlay
                        muted
                        loop
                        className="rounded-lg border border-blue-600 w-full sm:w-1/2 shadow-lg"
                    >
                        <source src="/videos/neuronote-demo.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
