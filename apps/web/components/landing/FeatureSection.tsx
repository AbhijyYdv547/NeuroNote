"use client";

import { motion } from "framer-motion";
import { features } from "../../constants/index";

const FeatureSection = () => {
    return (
        <section
            id="features"
            className="relative py-24 border-b border-border bg-background text-foreground"
        >
            <motion.div
                className="text-center space-y-4 px-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <span className="uppercase text-xs tracking-widest text-blue-500 font-semibold">
                    Features
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
                    Built for <span className="text-blue-500">Collaboration</span>
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg">
                    Whether you're planning, writing, or designing — do it all together, in one space.
                </p>
            </motion.div>

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 sm:px-12">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        className="flex items-start space-x-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-blue-600 text-white rounded-full p-2">
                            {feature.icon}
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold">{feature.text}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                                {feature.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default FeatureSection;
