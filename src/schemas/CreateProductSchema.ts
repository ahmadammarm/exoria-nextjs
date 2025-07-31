import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE } from "@/lib/image";
import z from "zod";

export const CreateProductSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().min(0, "Price must be a positive number"),
    imageUrl: z
        .any()
        .refine((file) => file?.size <= MAX_IMAGE_SIZE, "Max file size is 5MB")
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported"
        ),
});

export type CreateProductSchemaType = z.infer<typeof CreateProductSchema>;