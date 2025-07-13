"use client";

import { motion } from "framer-motion";
import { testimonials } from "../../constants/index";
import Image from "next/image";

const Testimonials = () => {
    return (
        <section
            id="testimonials"
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
                    What our users say
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg">
                    Trusted by teams across the globe for real-time collaboration.
                </p>
            </motion.div>

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 sm:px-12 max-w-7xl mx-auto">
                {testimonials.map((testimonial, index) => (
                    <motion.div
                        key={index}
                        className="bg-muted/30 border border-border p-6 rounded-lg shadow-sm space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-sm leading-relaxed">{testimonial.text}</p>
                        <div className="flex items-center gap-4 pt-4">
                            <Image
                                src={testimonial.image}
                                alt={testimonial.user}
                                width={40}
                                height={40}
                                className="rounded-full border"
                            />
                            <div>
                                <h6 className="text-sm font-medium">{testimonial.user}</h6>
                                <p className="text-xs text-muted-foreground italic">
                                    {testimonial.company}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
