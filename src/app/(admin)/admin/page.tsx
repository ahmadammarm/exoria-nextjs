"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function AdminPage() {
    const { data: users = [] } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const response = await axios.get("/api/users");
            return response.data.data;
        },
        refetchOnWindowFocus: false,
        retry: false
    });

    const { data: products = [] } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await axios.get("/api/products");
            return response.data.data;
        },
        refetchOnWindowFocus: false,
        retry: false
    });

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Card className="bg-[#dc2626] flex flex-col justify-between">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-white flex items-center gap-2">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-7.13a4 4 0 11-8 0 4 4 0 018 0zm6 4a4 4 0 10-8 0 4 4 0 008 0z" />
                            </svg>
                            Total Users
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                        <span className="text-3xl font-bold text-white">{users.length}</span>
                    </CardContent>
                </Card>
                <Card className="bg-green-500 flex flex-col justify-between">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-white flex items-center gap-2">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
                            </svg>
                            Total Products
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                        <span className="text-3xl font-bold text-white">{products.length}</span>
                    </CardContent>
                </Card>
            </div>
            <p>Welcome to the admin dashboard. Here you can manage users, view statistics, and perform administrative tasks.</p>
        </div>
    );
}