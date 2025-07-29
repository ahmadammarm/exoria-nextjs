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
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import Link from "next/link";

export default function AdminSidebar() {

    const { status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

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
                    <h2 className="text-lg font-semibold px-4 py-2">Admin Panel</h2>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <nav>
                            <ul className="flex flex-col gap-1 px-2">
                                <li>
                                    <Link
                                        href="/admin"
                                        className={`block rounded px-3 py-2 transition-colors ${
                                            pathname === "/admin"
                                                ? "bg-[#dc2626] text-white font-medium"
                                                : "hover:bg-muted"
                                        }`}
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/users"
                                        className={`block rounded px-3 py-2 transition-colors ${
                                            pathname === "/admin/users"
                                                ? "bg-[#dc2626] text-white font-medium"
                                                : "hover:bg-muted"
                                        }`}
                                    >
                                        Manage Users
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/products"
                                        className={`block rounded px-3 py-2 transition-colors ${
                                            pathname === "/admin/products"
                                                ? "bg-[#dc2626] text-white font-medium"
                                                : "hover:bg-muted"
                                        }`}
                                    >
                                        Manage Products
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <Button
                        variant="destructive"
                        onClick={handleLogout}
                        disabled={mutation.isPending}
                        className="w-full"
                    >
                        {mutation.isPending ? "Logging out..." : "Logout"}
                    </Button>
                </SidebarFooter>
            </Sidebar>
        </div>
    )
}