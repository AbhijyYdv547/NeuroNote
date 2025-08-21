"use client";
import { Button } from "../ui/button";
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
                Transform your team's productivity with intelligent note-taking. Real-time collaboration,
                AI-powered content enhancement, and seamless synchronization.
            </p>
            <div className="flex justify-center my-10 md:gap-8 gap-2">
                <Button
                    className="font-bold"
                    onClick={() => router.push("/login")}
                    size={"xl"}
                    variant={"custom"}
                >
                    Start for free
                </Button>
                <Button
                    onClick={()=> router.push("/signup")}
                    size={"xl"}
                    variant={"secondary"}
                    className="font-bold"
                    >
                    Login to account
                </Button>
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