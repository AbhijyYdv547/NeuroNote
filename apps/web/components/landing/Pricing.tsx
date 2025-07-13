"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { pricingOptions } from "../../constants/index";

const Pricing = () => {
    return (
        <section
            id="pricing"
            className="py-24 bg-background text-foreground border-b border-border"
        >
            <motion.div
                className="text-center space-y-4 px-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
                    Flexible Pricing
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg">
                    Simple plans for individuals and teams. Start free, upgrade anytime.
                </p>
            </motion.div>

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 sm:px-12 max-w-7xl mx-auto">
                {pricingOptions.map((option, index) => (
                    <motion.div
                        key={index}
                        className="border border-border rounded-xl p-8 space-y-6 bg-muted/30"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div>
                            <h4 className="text-xl font-semibold">{option.title}</h4>
                            <p className="text-4xl font-bold mt-2">{option.price}</p>
                            <span className="text-sm text-muted-foreground">/month</span>
                        </div>

                        <ul className="space-y-4 text-sm">
                            {option.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <CheckCircle2 className="text-blue-500" size={18} />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button className="w-full mt-6 py-2 border rounded-lg hover:bg-accent transition">
                            Subscribe
                        </button>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Pricing;
