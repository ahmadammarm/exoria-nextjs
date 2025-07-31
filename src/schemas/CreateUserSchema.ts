import z from "zod";

export const CreateUser = z.object({
    email: z.email("Invalid email address"),
    name: z.string().min(1, "Name is required"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type CreateUserType = z.infer<typeof CreateUser>;