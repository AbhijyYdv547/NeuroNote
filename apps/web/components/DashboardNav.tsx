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

import { useRoomStore } from "@/store/RoomStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DashboardNav = () => {

    const {handleLogout} = useRoomStore();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();

    return (
        <div className="relative w-full">
            <Navbar>
                {/* Desktop Navigation */}
                <NavBody>
                    <NavbarLogo />
                    <div className="flex items-center gap-4">
                        <NavbarButton variant="custom" onClick={()=>handleLogout(router)}>Logout</NavbarButton>
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
                        <div className="flex w-full flex-col gap-4">
                            <NavbarButton
                                onClick={() =>{
                                    setIsMobileMenuOpen(false)
                                    handleLogout(router)
                                } }
                                variant="custom"
                                className="w-full"
                                href="/"
                            >
                                Logout
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

export default DashboardNav