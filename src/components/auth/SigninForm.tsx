"use client"

import { SigninSchema, SigninSchemaType } from "@/schemas/SigninSchema";
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SigninForm() {

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            if (session?.user.role === "ADMIN") {
                router.push("/admin");
            } else {
                router.push("/user");
            }
        }
    }, [session, status, router]);

    const { register, handleSubmit, formState: { errors } } = useForm<SigninSchemaType>({
        resolver: zodResolver(SigninSchema)
    })

    const mutation = useMutation({
        mutationFn: async ({ data }: { data: SigninSchemaType }) => {
            const response = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });


            if (!response?.ok) {
                throw new Error("Invalid email or password");
            }
            return response;
        },
        onSuccess: () => {
            toast.success("Signin successfully!");
        },
        onError: (error: Error) => {
            toast.error(error.message || "An error occurred during signin");
        }
    })

    const onSubmitForm = (data: SigninSchemaType) => {
        mutation.mutate({ data });
    }

    return (
        <div className="flex flex-col md:flex-row h-screen py-10 px-10">
            {/* left side image */}
            <div className="hidden md:block relative w-full h-64 md:h-auto">
                <Image src="/assets/homepage/banner.jpg" alt="Laboratory equipment" fill className="object-cover rounded-2xl" priority />
                <div className="absolute inset-0 bg-[#000]/60 rounded-2xl"></div>
            </div>

            {/* right side form */}
            <div className="w-full md:w-full flex items-center justify-center p-6 md:p-12">
                <div className="w-full max-w-md">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome to</h1>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#dc2626] mb-8">Exoria Serana Digital</h1>

                    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="block font-medium">
                                Email<span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                {...register("email")}
                                className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
                                
                                disabled={mutation.isPending}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="block font-medium">
                                Password<span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                {...register("password")}
                                className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc2626]"

                                disabled={mutation.isPending}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}

                        </div>

                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="w-full bg-[#dc2626] text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                        >
                            {mutation.isPending ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    <p className="mt-6 text-center">
                        Don&apos;t have an account yet?{" "}
                        <Link href="/auth/sign-up" className="text-[#dc2626] font-medium">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}