/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { DeleteUserAction } from "@/action/UsersAction";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AdminUsersPage() {

    const router = useRouter();
    const queryClient = useQueryClient();

    const { data: users = [], isLoading, isError } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const response = await axios.get("/api/users");
            return response.data;
        },
        refetchOnWindowFocus: false,
        retry: false
    });

    const mutation = useMutation({
        mutationFn: async (userId: string) => {
            const response = await DeleteUserAction(userId);

            if (!response.success) {
                throw new Error("Failed to delete user");
            }

            return response;

        },
        onSuccess: () => {
            toast.success("User deleted successfully!");
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "An error occurred while deleting the user.");
        }
    });

    if (isLoading) {
        return <div className="p-4">Loading...</div>;
    }

    if (isError) {
        return <div className="p-4 text-red-500">Failed to load users.</div>;
    }

    const onDelete = async (userId: string) => {
        await mutation.mutateAsync(userId);
    }

    return (
        <div className="overflow-x-auto p-4">
            <div className="mb-10">
                <Button variant="destructive" onClick={() => {
                    router.push('/admin/users/create')
                }}>
                    Add user
                </Button>
            </div>
            <Table className="min-w-full border border-gray-200 rounded-lg">
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead className="font-bold px-4 py-2">User ID</TableHead>
                        <TableHead className="font-bold px-4 py-2">Name</TableHead>
                        <TableHead className="font-bold px-4 py-2">Email</TableHead>
                        <TableHead className="font-bold px-4 py-2">Role</TableHead>
                        <TableHead className="font-bold px-4 py-2">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user: any, idx: number) => (
                        <TableRow
                            key={user.id}
                            className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                            <TableCell className="px-4 py-2 border-b">{user.id}</TableCell>
                            <TableCell className="px-4 py-2 border-b">{user.name}</TableCell>
                            <TableCell className="px-4 py-2 border-b">{user.email}</TableCell>
                            <TableCell className="px-4 py-2 border-b">{user.role}</TableCell>
                            <TableCell className="px-4 py-2 border-b">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="destructive">
                                            Delete
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Confirm Deletion</DialogTitle>
                                            <DialogDescription>
                                                Are you sure you want to delete this user?
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <DialogTrigger asChild>
                                                <Button variant="secondary">
                                                    Cancel
                                                </Button>
                                            </DialogTrigger>
                                            <DialogTrigger asChild>
                                                <Button variant="destructive" onClick={() => onDelete(user.id)}>
                                                    Confirm
                                                </Button>
                                            </DialogTrigger>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}