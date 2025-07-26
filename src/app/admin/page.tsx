/* eslint-disable react-hooks/rules-of-hooks */

"use client"

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function AdminPage() {

    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/sign-in");
        }
    }, [status, router]);

    const mutation = useMutation({
        mutationFn: async () => {
            const logout = await signOut({ callbackUrl: "/auth/sign-in", redirect: true });

            return logout;
        },
        onSuccess: () => {
            toast.success("Logged out successfully!");
        },
        onError: (error: Error) => {
            toast.error(error.message || "An error occurred during logout.");
        }
    });

    const handleLogout = () => {
        mutation.mutate();
    };

    return (
        <div>
            <Button variant="destructive" onClick={handleLogout} disabled={mutation.isPending}>
                {mutation.isPending ? "Logging out..." : "Logout"}
            </Button>
        </div>
    )
}