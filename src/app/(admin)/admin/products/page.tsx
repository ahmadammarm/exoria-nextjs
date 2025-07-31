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
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AdminProductsPage() {

    const router = useRouter();
    const queryClient = useQueryClient();

    const { data: products = [], isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await axios.get("/api/products");
            return response.data.data;
        },
        refetchOnWindowFocus: false,
        retry: false
    });

    const mutation = useMutation({
        mutationFn: async (productId: string) => {
            const response = await axios.delete(`/api/products/${productId}`);
            if (!response.data) {
                throw new Error("Failed to delete user");
            }
            return response.data;
        },
        onSuccess: () => {
            toast.success("Product deleted successfully!");
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "An error occurred while deleting the product.");
        }
    });

    if (isLoading) {
        return <div className="p-4">Loading...</div>;
    }

    if (isError) {
        return <div className="p-4 text-red-500">Failed to load products.</div>;
    }

    const handleDelete = (productId: string) => {
        mutation.mutate(productId);
    };

    return (
        <div className="overflow-x-auto p-4">
            <div className="mb-10">
                <Button variant="destructive" onClick={() => {
                    router.push('/admin/products/create')
                }}>
                    Add product
                </Button>
            </div>
            <Table className="min-w-full border border-gray-200 rounded-lg">
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead className="font-bold px-4 py-2">Name</TableHead>
                        <TableHead className="font-bold px-4 py-2">Description</TableHead>
                        <TableHead className="font-bold px-4 py-2">Price</TableHead>
                        <TableHead className="font-bold px-4 py-2">Image</TableHead>
                        <TableHead className="font-bold px-4 py-2">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product: any, idx: number) => (
                        <TableRow
                            key={product.id}
                            className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                            <TableCell className="px-4 py-2 border-b">{product.name}</TableCell>
                            <TableCell className="px-4 py-2 border-b">{product.description}</TableCell>
                            <TableCell className="px-4 py-2 border-b">{product.price}</TableCell>
                            <TableCell className="px-4 py-2 border-b">
                                <Image src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover" width={64} height={64} />
                            </TableCell>
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
                                            <DialogClose asChild>
                                                <Button variant="secondary">
                                                    Cancel
                                                </Button>
                                            </DialogClose>
                                            <DialogClose asChild>
                                                <Button
                                                    variant="destructive"
                                                    onClick={() => handleDelete(product.id)}
                                                >
                                                    Confirm
                                                </Button>
                                            </DialogClose>
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