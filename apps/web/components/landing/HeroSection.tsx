"use client";
import { useRouter } from "next/navigation";

const HeroSection = () => {
    const router = useRouter()
    return (
        <div className="flex flex-col items-center mt-6 lg:mt-20" id="hero">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl text-center tracking-wide">
                NeuroNote: AI-powered
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
                    {" "}
                    collaborative notes
                </span>
            </h1>
            <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
                Transform your team&apos;s productivity with intelligent note-taking. Real-time collaboration,
                AI-powered content enhancement, and seamless synchronization.
            </p>
            <div className="flex justify-center my-10 md:gap-8 gap-2">

                <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                    onClick={() => router.push("/signup")}>
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-15 py-5 text-sm font-medium text-white backdrop-blur-3xl">
                        Sign up
                    </span>
                </button>

                <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                    onClick={() => router.push("/login")}>
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-15 py-5 text-sm font-medium text-white backdrop-blur-3xl">
                        Login
                    </span>
                </button>

            </div>
            <div className="flex mt-10 justify-center">
                <video
                    autoPlay
                    loop
                    muted
                    className="rounded-lg w-1/2 border border-blue-500 shadow-sm shadow-blue-400 mx-2 my-4"
                >
                    <source src="/videos/video1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <video
                    autoPlay
                    loop
                    muted
                    className="rounded-lg w-1/2 border border-blue-500 shadow-sm shadow-blue-400 mx-2 my-4"
                >
                    <source src="/videos/video2.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};

export default HeroSection;