"use client";
import { cn } from "@/lib/utils";
import { IconArrowLeft, IconBrandGoogle } from "@tabler/icons-react";
import React, { FormEvent, RefObject } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface AuthPageProps {
  nameRef?: RefObject<HTMLInputElement | null>;
  emailRef: RefObject<HTMLInputElement | null>;
  passwordRef: RefObject<HTMLInputElement | null>;
  login: boolean;
  onSubmit: (e: FormEvent<Element>) => Promise<void>;
}

export default function AuthPage({
  nameRef,
  emailRef,
  passwordRef,
  login,
  onSubmit,
}: AuthPageProps) {

  const router = useRouter();
  return (
    <div className="min-h-screen min-w-screen bg-[#262626] flex justify-center items-center">
      <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
        <div className="flex items-center">
          <div>
            <Button variant={"default"} className="bg-zinc-700" onClick={() => router.push('/')}><IconArrowLeft /></Button>
          </div>
          <div className="flex-1 text-center">
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 text-center">
              {login ? "Welcome back 😎 " : "Welcome to Resume Builder😊"}
            </h2>
            <p className="mt-2 max-w-sm mx-auto text-sm text-neutral-800 dark:text-neutral-200 text-center">
              {login
                ? "Login to Resume Builder"
                : "Start your journey by Registering"}
            </p>
          </div>
        </div>

        <form className="my-8" onSubmit={onSubmit}>
          {login ? null : (
            <LabelInputContainer className="mb-4 ">
              <Label htmlFor="name" className="text-white">Name</Label>
              <Input
                id="name"
                placeholder="Tyler"
                type="text"
                ref={nameRef}
                autoComplete="name"
              />
            </LabelInputContainer>
          )}

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email" className="text-white">Email Address</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              ref={emailRef}
              autoComplete="email"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password" className="text-white">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              ref={passwordRef}
              autoComplete="new-password"
            />
          </LabelInputContainer>

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br dark:from-black dark:to-neutral-600 font-medium text-white dark:shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] bg-zinc-800 from-zinc-900 to-zinc-900 shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
          >
            {login ? "Login" : "Sign up"} &rarr;
            <BottomGradient />
          </button>

        </form>
        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex justify-evenly items-center my-8">
          <button className="group/btn shadow-input relative flex h-10 items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 shadow-[0px_0px_1px_1px_#262626]"
            
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>

        {login ? (
          <div className="text-center text-sm text-gray-50">
            Don&apos;t have an account?{" "}
            <a
              onClick={() => router.push("/signup")}
              className="underline underline-offset-4 cursor-pointer"
            >
              Sign up
            </a>
          </div>
        ) : (
          <div className="text-center text-sm text-gray-50">
            Already have an account?{" "}
            <a
              onClick={() => router.push("/login")}
              className="underline underline-offset-4 cursor-pointer"
            >
              Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
