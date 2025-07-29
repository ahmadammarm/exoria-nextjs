/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function AdminUsersPage() {

    const { data: users = [], isLoading, isError } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const response = await axios.get("/api/users");
            return response.data;
        },
        refetchOnWindowFocus: false,
        retry: false
    });

    if (isLoading) {
        return <div className="p-4">Loading...</div>;
    }

    if (isError) {
        return <div className="p-4 text-red-500">Failed to load users.</div>;
    }

    return (
        <div className="overflow-x-auto p-4">
            <Table className="min-w-full border border-gray-200 rounded-lg">
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead className="font-bold px-4 py-2">User ID</TableHead>
                        <TableHead className="font-bold px-4 py-2">Name</TableHead>
                        <TableHead className="font-bold px-4 py-2">Email</TableHead>
                        <TableHead className="font-bold px-4 py-2">Role</TableHead>
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}