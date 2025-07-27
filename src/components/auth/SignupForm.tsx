"use client"

import { SignupAction } from "@/action/SignupAction";
import { SignupSchema, SignupSchemaType } from "@/schemas/SignupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Link from "next/link";

export default function SignupForm() {

    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<SignupSchemaType>({
        resolver: zodResolver(SignupSchema)
    });

    const mutation = useMutation({
        mutationFn: ({ email, name, password, confirmPassword }: SignupSchemaType) => SignupAction(email, name, password, confirmPassword),
        onSuccess: () => {
            toast.success("Registration successful!");
            router.push("/auth/sign-in");
        },
        onError: (error: Error) => {
            toast.error(error.message || "An error occurred during registration.");
        }
    });

    const onSubmit = (data: SignupSchemaType) => {
        mutation.mutate(data);
    }

    return (
        <div className="flex flex-col md:flex-row w-full">
            <div className="hidden md:block relative w-full h-64 md:h-auto">
                <Image src="/assets/bg_register.png" alt="Laboratory equipment" fill className="object-cover rounded-2xl" priority />
                <div className="absolute inset-0 bg-[#3c266c]/60 rounded-2xl"></div>
            </div>

            <div className="w-full md:w-full flex items-center justify-center p-6 md:p-12">
                <div className="w-full max-w-md">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Selamat datang di</h1>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#dc2626] mb-8">Exoria Serana Digital</h1>

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-2">
                            <Label htmlFor="name" className="block font-medium">
                                Nama<span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Masukkan nama lengkap..."
                                {...register("name")}
                                className="w-full px-4 py-3 rounded-md border border-[#d7d7d7] focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="block font-medium">
                                Email<span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Masukkan email..."
                                {...register("email")}
                                className="w-full px-4 py-3 rounded-md border border-[#d7d7d7] focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="block font-medium">
                                Password<span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Masukkan password..."
                                {...register("password")}
                                className="w-full px-4 py-3 rounded-md border border-[#d7d7d7] focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="block font-medium">
                                Konfirmasi Password<span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Konfirmasi password..."
                                {...register("confirmPassword")}
                                className="w-full px-4 py-3 rounded-md border border-[#d7d7d7] focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="w-full py-3 px-4 bg-[#dc2626] text-white font-medium rounded-md hover:bg-red-600 transition-colors"
                        >
                            {mutation.isPending ? "Mendaftar..." : "Daftar Sekarang"}
                        </button>
                    </form>

                    <p className="mt-6 text-center">
                        Sudah punya akun?{" "}
                        <Link href="/auth/sign-in" className="text-[#dc2626] font-medium">
                            Masuk disini
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )

}