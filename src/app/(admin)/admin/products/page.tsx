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
import Link from "next/link";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, AlertCircle } from "lucide-react";
import { useState } from "react";

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    slug: string;
    driveLink?: string;
    createdAt: string;
    updatedAt: string;
}

export default function AdminProductsPage() {
    const queryClient = useQueryClient();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const { data: products = [], isLoading, isError, error } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await axios.get("/api/products");
            return response.data.data;
        },
        refetchOnWindowFocus: false,
        retry: 1
    });

    const deleteMutation = useMutation({
        mutationFn: async (productId: string) => {
            setDeletingId(productId);
            const response = await axios.delete(`/api/products/${productId}`);
            return response.data;
        },
        onSuccess: (data) => {
            toast.success(data.message || "Product deleted successfully!");
            queryClient.invalidateQueries({ queryKey: ["products"] });
            setDeletingId(null);
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message || error.message || "Failed to delete product";
            toast.error(errorMessage);
            setDeletingId(null);
        }
    });

    const handleDelete = (productId: string) => {
        deleteMutation.mutate(productId);
    };

    // Format price to IDR
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
                    <p className="text-gray-600">Loading products...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load products</h3>
                    <p className="text-gray-600 mb-4">{(error as any)?.message || "Something went wrong"}</p>
                    <Button onClick={() => queryClient.invalidateQueries({ queryKey: ["products"] })}>
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Products Management</h1>
                    <p className="text-gray-600 mt-1">Manage your product catalog</p>
                </div>
                <Link href="/admin/products/create">
                    <Button className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add Product
                    </Button>
                </Link>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <p className="text-gray-500 mb-4">No products found</p>
                    <Link href="/admin/products/create">
                        <Button>Create Your First Product</Button>
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead className="font-semibold">Image</TableHead>
                                    <TableHead className="font-semibold">Name</TableHead>
                                    <TableHead className="font-semibold">Description</TableHead>
                                    <TableHead className="font-semibold">Price</TableHead>
                                    <TableHead className="font-semibold text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow key={product.id} className="hover:bg-gray-50">
                                        <TableCell className="py-4">
                                            <div className="relative w-16 h-16 rounded-md overflow-hidden border border-gray-200">
                                                <Image
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="64px"
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {product.name}
                                        </TableCell>
                                        <TableCell className="max-w-xs truncate text-gray-600">
                                            {product.description}
                                        </TableCell>
                                        <TableCell className="font-semibold text-green-600">
                                            {formatPrice(product.price)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        disabled={deletingId === product.id}
                                                        className="flex items-center gap-2"
                                                    >
                                                        {deletingId === product.id ? (
                                                            <>
                                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                                Deleting...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Trash2 className="w-4 h-4" />
                                                                Delete
                                                            </>
                                                        )}
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Delete Product</DialogTitle>
                                                        <DialogDescription className="pt-4">
                                                            Are you sure you want to delete <span className="font-semibold text-gray-900">{product.name}</span>?
                                                            <br />
                                                            <span className="text-red-600 font-medium">This action cannot be undone.</span>
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter className="gap-2 sm:gap-0">
                                                        <DialogClose asChild>
                                                            <Button
                                                                variant="outline"
                                                                disabled={deletingId === product.id}
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </DialogClose>
                                                        <DialogClose asChild>
                                                            <Button
                                                                variant="destructive"
                                                                onClick={() => handleDelete(product.id)}
                                                                disabled={deletingId === product.id}
                                                                className="flex items-center gap-2"
                                                            >
                                                                {deletingId === product.id ? (
                                                                    <>
                                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                                        Deleting...
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Trash2 className="w-4 h-4" />
                                                                        Delete Product
                                                                    </>
                                                                )}
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
                </div>
            )}

            <div className="mt-4 text-sm text-gray-500 text-center">
                Total products: {products.length}
            </div>
        </div>
    )
}