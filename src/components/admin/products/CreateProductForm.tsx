"use client"

import { CreateProductSchema, CreateProductSchemaType } from "@/schemas/CreateProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateProductForm() {

    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<CreateProductSchemaType>({
        resolver: zodResolver(CreateProductSchema)
    })

    const mutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await axios.post("/api/products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            return response.data;
        },
        onSuccess: () => {
            toast.success("Product created successfully!");
            router.push("/admin/products");
        },
        onError: (error: Error) => {
            toast.error(error.message || "An error occurred while creating the product.");
        }
    });

    const onSubmit = async (data: CreateProductSchemaType) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price.toString());
        if (data.imageUrl && data.imageUrl.length > 0) {
            formData.append("imageUrl", data.imageUrl[0]);
        }

        await mutation.mutateAsync(formData);
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
                            htmlFor="description"
                            className="block text-base font-medium text-gray-700 mb-2"
                        >
                            Description
                        </Label>
                        <Input
                            id="description"
                            type="text"
                            placeholder="Enter product description..."
                            {...register("description")}
                            className={`w-full p-3 border ${errors.description ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition`}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label
                            htmlFor="price"
                            className="block text-base font-medium text-gray-700 mb-2"
                        >
                            Price
                        </Label>
                        <Input
                            id="price"
                            type="number"
                            placeholder="Enter product price..."
                            {...register("price", { valueAsNumber: true })}
                            className={`w-full p-3 border ${errors.price ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition`}
                        />
                        {errors.price && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.price.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label
                            htmlFor="imageUrl"
                            className="block text-base font-medium text-gray-700 mb-2"
                        >
                            Product Image
                        </Label>
                        <Input
                            id="imageUrl"
                            type="file"
                            accept=".jpg,.jpeg,.png,.webp"
                            {...register("imageUrl", { required: false })}
                            className={`w-full p-3 border ${errors.imageUrl ? "border-red-500" : "border-gray-300"} rounded-md`}
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                    >
                        {mutation.isPending ? "Creating..." : "Create Product"}
                    </Button>
                </form>
            </div>
        </div>
    )
}