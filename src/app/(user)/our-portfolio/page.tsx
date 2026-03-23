/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import BannerLayout from "@/components/layouts/BannerLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function OurPortfolioPage() {

    const { data: products = [], isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await axios.get("/api/products");
            return response.data.data;
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    const { data: session } = useSession()

    if (isLoading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (isError) {
        return <div className="text-center py-10">Failed to load products.</div>;
    }

    return (
        <div>
            <BannerLayout
                title="Our Portfolio"
                imageUrl="/assets/layout/banner.jpg"
                subtitle="A showcase of our works"
            />
            {/* Our creative work section */}
            <div className="py-16 md:py-24 px-4 md:px-14">
                <h2
                    className="text-4xl md:text-5xl font-bold text-center mb-16 relative"
                    data-aos="fade-up"
                >
                    Our Creative Work
                </h2>
                <p className="text-center text-gray-600 mb-16" data-aos="fade-up">
                    We take pride in our work and are committed to delivering the best results for our clients. Here are some of our recent projects that showcase our creativity and expertise.
                </p>
                {/* Add your creative work gallery here */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.map((product: any) => (
                        <Card key={product.id} className="p-6 shadow-lg rounded-lg">
                            {session?.user?.subscriptionStatus === "ACTIVE" ? (
                                <Link href={product.driveLink} target="_blank" rel="noopener noreferrer">
                                    <Image
                                        src={product.imageUrl}
                                        alt={product.name}
                                        width={400}
                                        height={300}
                                        className="w-full h-48 object-cover rounded-md mb-4"
                                    />
                                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                                    <p className="text-gray-600 mb-4">{product.description}</p>
                                    <Button variant="default">View Project</Button>
                                </Link>
                            ) : (
                                <div>
                                    <Image
                                        src={product.imageUrl}
                                        alt={product.name}
                                        width={400}
                                        height={300}
                                        className="w-full h-48 object-cover rounded-md mb-4"
                                    />
                                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                                    <p className="text-gray-600 mb-4">{product.description}</p>
                                    {/* <Button asChild>
                                        <Link href={`/products/${product.slug}`} className="text-white">
                                            View Details
                                        </Link>
                                    </Button> */}
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
                {session?.user?.subscriptionStatus !== "ACTIVE" && (
                    <div className="flex items-center justify-center mt-10">
                        <Button asChild>
                            <Link href="/subscribe" className="text-white">
                                Subscribe with IDR 15000 to Access More Projects
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
            {/* Testimonials */}
            <div className="py-10 md:py-16 px-4 md:px-14">
                <h2
                    className="text-4xl md:text-5xl font-bold text-center mb-16 relative"
                    data-aos="fade-up"
                >
                    Testimonials
                </h2>
                <p className="text-center text-gray-600 mb-16" data-aos="fade-up">
                    Here&apos;s what our clients say about us.
                </p>
                {/* Add your testimonials here */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            name: "Zaky Wahyu Oktavianto",
                            role: "Manager",
                            feedback: "Very high quality! However, that would be even greater if you can separate css & js for each type of theme! (not include all in one so it can be loaded faster). Thanks for this very high item!",
                            rating: 5,
                        },
                        {
                            name: "Sujatmiko Dwi Kuncoro",
                            role: "Founder",
                            feedback: "Best design, well coded, really surprised to check it's reusability. Clean code. Easy to use. Most of category included and author will add more templates wow. I will recommend for all developers.",
                            rating: 5,
                        },
                        {
                            name: "Ahmad Baihaqy",
                            role: "IT Consultant",
                            feedback: "Excellence !!! As a developer I will give 5 Star and will recommend 200% with confident.",
                            rating: 5,
                        },
                    ].map((testimonial, index) => (
                        <Card
                            key={index}
                            className={`p-6 shadow-lg rounded-lg ${index === 1 ? "bg-[#dc2626]" : "bg-white"
                                }`}
                        >
                            <h3 className={`text-xl font-bold mb-1 ${index === 1 ? "text-white" : ""}`}>{testimonial.name}</h3>
                            <p className={`text-sm mb-2 ${index === 1 ? "text-gray-200" : "text-gray-500"}`}>{testimonial.role}</p>
                            <div className="flex mb-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z" />
                                    </svg>
                                ))}
                            </div>
                            <p className={`${index === 1 ? "text-white" : "text-gray-600"}`}>{testimonial.feedback}</p>
                        </Card>
                    ))}
                </div>
            </div>

            {/* card for exoria's since, completed projects, happy clients */}
            <div className="bg-gray-100 py-16 md:py-24 px-4 md:px-14">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Years of Experience",
                            value: "",
                            description: "Years in the industry providing top-notch digital solutions.",
                            icon: (
                                <svg width={40} height={40} viewBox="0 0 24 24" className="mb-4" fill="none" stroke="#dc2626" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                            ),
                        },
                        {
                            title: "Completed Projects",
                            value: "",
                            description: "Successfully delivered projects across various industries.",
                            icon: (
                                <svg width={40} height={40} viewBox="0 0 24 24" className="mb-4" fill="none" stroke="#dc2626" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="7" width="20" height="14" rx="2" />
                                    <path d="M16 3h-8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z" />
                                </svg>
                            ),
                        },
                        {
                            title: "Happy Clients",
                            value: "",
                            description: "Clients who trust us for their digital needs.",
                            icon: (
                                <svg width={40} height={40} viewBox="0 0 24 24" className="mb-4" fill="none" stroke="#dc2626" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                                    <circle cx="17" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                </svg>
                            ),
                        },
                    ].map((item, index) => (
                        <Card key={index} className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
                            {item.icon}
                            <p className="text-4xl text-[#dc2626] mb-4 font-bold">{item.value}</p>
                            <h3 className="text-2xl font-bold mb-2 text-center">{item.title}</h3>
                            <p className="text-gray-600 text-center">{item.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}