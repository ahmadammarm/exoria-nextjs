/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
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
            const response = await axios.delete(`/api/users/${userId}`);
            if (!response.data) {
                throw new Error("Failed to delete user");
            }
            return response.data;
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

    const handleDelete = (userId: string) => {
        mutation.mutate(userId);
    };

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
                                <div className="flex gap-2">
                                    <Button 
                                        variant="outline"
                                        onClick={() => router.push(`/admin/users/${user.id}`)}
                                    >
                                        Edit
                                    </Button>
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
                                                <DialogClose asChild>
                                                    <Button variant="secondary">
                                                        Cancel
                                                    </Button>
                                                </DialogClose>
                                                <DialogClose asChild>
                                                    <Button
                                                        variant="destructive"
                                                        onClick={() => handleDelete(user.id)}
                                                    >
                                                        Confirm
                                                    </Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}