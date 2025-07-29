"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { useMutation } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function AdminSidebar() {

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
            <Sidebar>
                <SidebarHeader>
                    <h2>Admin Panel</h2>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <h3>Users</h3>
                        <ul>
                            <li>User List</li>
                            <li>Add User</li>
                        </ul>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <Button variant="destructive" onClick={handleLogout} disabled={mutation.isPending}>
                        {mutation.isPending ? "Logging out..." : "Logout"}
                    </Button>
                </SidebarFooter>
            </Sidebar>
        </div>
    )
}