/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CreateProductSchemaClient, CreateProductSchemaClientType } from "@/schemas/CreateProductSchema";
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

    const { register, handleSubmit, formState: { errors } } = useForm<CreateProductSchemaClientType>({
        resolver: zodResolver(CreateProductSchemaClient),
    });

    const mutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await axios.post("/api/products", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data;
        },
        onSuccess: () => {
            toast.success("Product created successfully!");
            router.push("/admin/products");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "An error occurred while creating the product.");
        },
    });

    const onSubmit = async (data: CreateProductSchemaClientType) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price.toString());
        if (data.imageUrl && data.imageUrl.length > 0) {
            formData.append("imageUrl", data.imageUrl[0]);
        }
        // formData.append("driveLink", data.driveLink || "");

        await mutation.mutateAsync(formData);
    };

    return (
        <div className="w-full md:w-[1000px] min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-4xl bg-white p-10 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Create New Product</h2>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {/* Name */}
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" type="text" {...register("name")} />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Input id="description" type="text" {...register("description")} />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                    {/* Price */}
                    <div>
                        <Label htmlFor="price">Price</Label>
                        <Input id="price" type="number" {...register("price", { valueAsNumber: true })} />
                        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                    </div>

                    {/* Image */}
                    <div>
                        <Label htmlFor="imageUrl">Product Image</Label>
                        <Input id="imageUrl" type="file" accept=".jpg,.jpeg,.png,.webp" {...register("imageUrl")} />
                        {"imageUrl" in errors && errors.imageUrl && typeof errors.imageUrl.message === "string" && (
                            <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>
                        )}
                    </div>

                    {/* Drive Link */}
                    <div>
                        <Label htmlFor="driveLink">Google Drive Link (optional)</Label>
                        <Input id="driveLink" type="text" {...register("driveLink")} />
                        {errors.driveLink && <p className="text-red-500 text-sm">{errors.driveLink.message}</p>}
                    </div>

                    <Button type="submit" disabled={mutation.isPending}>
                        {mutation.isPending ? "Creating..." : "Create Product"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
