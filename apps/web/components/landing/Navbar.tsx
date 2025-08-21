"use client";
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    NavbarLogo,
    NavbarButton,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { navItems } from "@/constants";
import Image from "next/image";
import { useState } from "react";

export function ResizableNav() {


    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="relative w-full">
            <Navbar>
                {/* Desktop Navigation */}
                <NavBody>
                    <NavbarLogo />
                    <NavItems items={navItems} />
                    <div className="flex items-center gap-4">
                        <NavbarButton variant="custom" href="/login">Login</NavbarButton>
                        <NavbarButton
                            variant="primary"
                            className="bg-slate-200 hover:bg-gray-50 rounded-full"
                            href="https://github.com/AbhijyYdv547/NeuroNote"
                        >
                            <Image src={"/git.svg"} alt="" width={25} height={25} />
                        </NavbarButton>
                    </div>
                </NavBody>

                {/* Mobile Navigation */}
                <MobileNav>
                    <MobileNavHeader>
                        <NavbarLogo />
                        <MobileNavToggle
                            isOpen={isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        />
                    </MobileNavHeader>

                    <MobileNavMenu
                        isOpen={isMobileMenuOpen}
                        onClose={() => setIsMobileMenuOpen(false)}
                    >
                        {navItems.map((item, idx) => (
                            <a
                                key={`mobile-link-${idx}`}
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="relative text-neutral-600 dark:text-neutral-300"
                            >
                                <span className="block">{item.name}</span>
                            </a>
                        ))}
                        <div className="flex w-full flex-col gap-4">
                            <NavbarButton
                                onClick={() => setIsMobileMenuOpen(false)}
                                variant="custom"
                                className="w-full"
                                href="/login"
                            >
                                Login
                            </NavbarButton>
                            <div className="flex w-full flex-col gap-4">
                                <NavbarButton
                                    href="https://github.com/AbhijyYdv547/ResumeBuilder"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    variant="secondary"
                                    className="flex items-center justify-center gap-1 w-full bg-slate-200 hover:bg-gray-50"
                                >
                                    <Image src={"/git.svg"} alt="" width={30} height={30} />
                                    <span className="text-black">Github</span>
                                </NavbarButton>
                            </div>
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>

            {/* Navbar */}
        </div>
    );
}

export default ResizableNav;