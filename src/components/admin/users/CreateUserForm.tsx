"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateUser, CreateUserType } from "@/schemas/CreateUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CreateUserForm() {

    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<CreateUserType>({
        resolver: zodResolver(CreateUser)
    });

    const mutation = useMutation({
        mutationFn: async (data: CreateUserType) => {
            const response = await axios.post("/api/users", data);
            return response.data;
        },
        onSuccess: () => {
            toast.success("User created successfully!");
            router.push("/admin/users");
        },
        onError: (error: Error) => {
            toast.error(error.message || "An error occurred during user creation.");
        }
    });

    const onSubmit = async (data: CreateUserType) => {
        await mutation.mutateAsync(data);
    }

    return (
        <div className="w-[100&%] md:w-[1000px] min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-4xl bg-white p-10 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
                    Create New User
                </h2>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Label
                            htmlFor="name"
                            className="block text-base font-medium text-gray-700 mb-2"
                        >
                            Name
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter full name..."
                            {...register("name")}
                            className={`w-full p-3 border ${errors.name ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition`}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label
                            htmlFor="email"
                            className="block text-base font-medium text-gray-700 mb-2"
                        >
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter email..."
                            {...register("email")}
                            className={`w-full p-3 border ${errors.email ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label
                            htmlFor="password"
                            className="block text-base font-medium text-gray-700 mb-2"
                        >
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter password..."
                            {...register("password")}
                            className={`w-full p-3 border ${errors.password ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                    >
                        {mutation.isPending ? "Creating..." : "Create User"}
                    </Button>
                </form>
            </div>
        </div>
    )
}