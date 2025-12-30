import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE } from "@/lib/image";
import z from "zod";

export const CreateProductSchemaClient = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().min(0, "Price must be a positive number"),
    imageUrl: z
        .any()
        .refine((files) => files?.length > 0, "Image is required")
        .refine((files) => files[0]?.size <= MAX_IMAGE_SIZE, "Max file size is 5MB")
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported"
        ),
    driveLink: z.string().optional().or(z.literal("")) 
});

export type CreateProductSchemaClientType = z.infer<typeof CreateProductSchemaClient>;

export const CreateProductSchemaServer = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().min(0, "Price must be a positive number"),
    imageUrl: z
        .instanceof(File, { message: "Image must be a file" })
        .refine((file) => file.size <= MAX_IMAGE_SIZE, "Max file size is 5MB")
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported"
        ),
    driveLink: z.string().url("Invalid URL format").optional().or(z.literal("")) // Allow empty string or valid URL
});

export type CreateProductSchemaServerType = z.infer<typeof CreateProductSchemaServer>;