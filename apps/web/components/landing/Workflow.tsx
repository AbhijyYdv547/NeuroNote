"use client";

import { motion } from "framer-motion";
import { checklistItems } from "../../constants/index";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const Workflow = () => {
    return (
        <section
            id="workflow"
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
                    Accelerate your{" "}
                    <span className="text-blue-500">workflow</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
                    From idea to execution — NeuroNote gives your team the tools to move faster.
                </p>
            </motion.div>

            <div className="mt-16 flex flex-col lg:flex-row items-center gap-12 px-6 sm:px-12 max-w-7xl mx-auto">
                {/* Left Side - Image */}
                <motion.div
                    className="w-full lg:w-1/2"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <Image
                        src="/images/neuronote-code.png"
                        alt="Code Collaboration"
                        width={600}
                        height={400}
                        className="rounded-lg border border-blue-700 shadow-xl"
                    />
                </motion.div>

                {/* Right Side - Checklist */}
                <motion.div
                    className="w-full lg:w-1/2 space-y-8"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    {checklistItems.map((item, index) => (
                        <div key={index} className="flex gap-4 items-start">
                            <div className="text-blue-600 p-2 bg-muted rounded-full">
                                <CheckCircle2 size={20} />
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Workflow;
