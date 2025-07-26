/* eslint-disable @typescript-eslint/no-explicit-any */
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function SignoutButton() {

    const handleSignout = async () => {
        try {
            await signOut({ callbackUrl: "/auth/sign-in", redirect: true });
            toast.success("Logged out successfully!");
        } catch (error: any) {
            toast.error(error.message || "An error occurred during logout.");
        }
    }

    return (
        <Button onClick={handleSignout} className="bg-[#dc2626] hover:bg-red-600 text-white">
            Sign out
        </Button>
    )
}