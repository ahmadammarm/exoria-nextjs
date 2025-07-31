/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Image from "next/image"
import { Card } from "../ui/card"
import { Separator } from '../ui/separator'
import { Clock, FolderKanban, Award } from "lucide-react"
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from "axios"

const About = () => {


    const { data: products = [], isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await axios.get("/api/products");
            return response.data.data;
        },
        refetchOnWindowFocus: false,
        retry: false
    })

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div className="p-4 text-red-500">Failed to load products.</div>;
    }

    return (
        <div className="mt-20 md:mt-0 overflow-hidden">
            <div className="pt-20">
                <h1
                    className="text-4xl md:text-5xl font-bold text-center mt-10 mb-20 relative"
                    data-aos="fade-up"
                    data-aos-duration="800"
                >
                    About Us
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 px-4">
                    <div
                        className="flex items-center justify-center"
                        data-aos="fade-right"
                        data-aos-duration="1000"
                    >
                        <div className="bg-[#851818] rounded-3xl p-8 md:p-12 shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24">
                                <svg viewBox="0 0 100 100" className="text-[#dc2626] opacity-50">
                                    <path d="M100,0 C60,30 40,70 0,100 L100,100 Z" fill="currentColor" />
                                </svg>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 relative text-white">
                                We are expert in
                            </h2>
                            <p className="text-white text-lg relative z-10 mb-20">
                                Website development, UI/UX design, Internet of Things, and graphic design. We combine creativity, technology, and experience to deliver innovative digital solutions tailored to our clients&apos; needs.
                            </p>
                            <div
                                className="flex justify-center relative z-10"
                                data-aos="zoom-in"
                                data-aos-delay="200"
                            >
                                <div className="absolute mt-10 -bottom-6 -right-4 w-24 h-24 bg-[#dc2626] rounded-full opacity-50 z-0" />
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex flex-col justify-center space-y-6"
                        data-aos="fade-left"
                        data-aos-duration="1000"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-[#dc2626]">
                            Exoria Serana Digital
                        </h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Expert in creative idea comes with a creative mind. To prove this, Exoria is a formula to achieve success in
                            web design, development and application system with great thoughts to start a business online.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            We are committed to providing the best service at an affordable price with the best quality.
                        </p>
                        <div
                            className="flex items-center space-x-4 mt-4"
                            data-aos="fade-up"
                            data-aos-delay="100"
                        >
                            <Image src="/assets/homepage/best-service.png" alt="layanan" width={40} height={40} />
                            <span className="text-[#dc2626] font-bold text-xl">
                                Best Services
                            </span>
                        </div>
                        <div
                            className="flex items-center space-x-4"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            <Image src="/assets/homepage/price.png" alt="harga" width={40} height={40} />
                            <span className="text-[#dc2626] font-bold text-xl">
                                Affordable Price
                            </span>
                        </div>
                        <Separator className="my-12 md:my-0" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 pb-20">
                    {[
                        {
                            title: "24/7 Support",
                            description: "We are ready to assist you anytime with our 24/7 customer support service.",
                            icon: <Clock size={70} color="#fff" strokeWidth={2} className="text-white" />,
                        },
                        {
                            title: "13,000+ Customers",
                            description: "We have served over 13,000 satisfied customers worldwide.",
                            icon: <FolderKanban size={70} color="#fff" strokeWidth={2} className="text-white" />,
                        },
                        {
                            title: "Award Winning",
                            description: "We have received various awards for our service quality and innovation.",
                            icon: <Award size={70} color="#fff" strokeWidth={2} className="text-white" />,
                        },
                    ].map((item, idx) => (
                        <Card
                            key={idx}
                            className="flex flex-col items-center p-8 bg-[#dc2626] shadow-lg rounded-2xl"
                            data-aos="fade-up"
                            data-aos-delay={idx * 150}
                        >
                            <h1 className="mb-6">{item.icon}</h1>
                            <h4 className="text-xl font-bold text-white mb-2 text-center">{item.title}</h4>
                            <p className="text-white text-center">{item.description}</p>
                        </Card>
                    ))}
                </div>

                <div className="bg-[#dc2626] py-16 md:py-24 px-4 md:px-14">
                    <div>
                        <h2
                            className="text-4xl md:text-5xl font-bold text-center mb-16 text-white relative mt-10"
                            data-aos="fade-up"
                        >
                            Our Services
                        </h2>
                        <p className="text-center text-white mt-5 mb-16" data-aos="fade-up">
                            We provide a wide range of services to meet your digital needs, from website development to UI/UX design, IoT solutions, and graphic design. Our team is ready to help you achieve your goals with innovative and effective solutions.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
                            {[
                                {
                                    name: "Website Development",
                                    description: "We create responsive and user-friendly websites to enhance your online presence.",
                                    imageUrl: "/assets/homepage/web.png",
                                    href: "/layanan",
                                },
                                {
                                    name: "UI/UX Design",
                                    description: "We create modern user experiences through intuitive and stunning UI/UX design.",
                                    imageUrl: "/assets/homepage/ui-ux.png",
                                    href: "/layanan",
                                },
                                {
                                    name: "Graphic Design",
                                    description: "We deliver impressive visual identities through modern and creative graphic design.",
                                    imageUrl: "/assets/homepage/gd.png",
                                    href: "/layanan",
                                },
                            ].map((item, index) => (
                                <Card key={index}
                                    className="relative flex flex-col items-center pt-16 bg-zinc-900 border-none mb-20"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 150}
                                    data-aos-anchor-placement="top-bottom"
                                >
                                    <div>
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.name}
                                            width={200}
                                            height={200}
                                            className="hover:scale-125 transition-all ease-in-out duration-200"
                                        />
                                    </div>
                                    <div className="mt-14 text-center mb-10 px-6">
                                        <h3 className="text-2xl font-bold text-[#dc2626]">
                                            {item.name}
                                        </h3>
                                        <p className="text-white mt-4 mb-8">
                                            {item.description}
                                        </p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

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
                                <Image
                                    src={product.imageUrl || "/assets/default-product.png"}
                                    alt={product.name}
                                    className="w-full h-48 object-cover mb-4"
                                    width={300}
                                    height={200}
                                />
                                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                                <p className="text-gray-600 mb-4">{product.description}</p>
                                <span className="text-[#dc2626] font-bold">${product.price.toFixed(2)}</span>
                            </Card>
                        ))}
                    </div>
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
                                role: "Commissioner",
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
                                value: "5+",
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
                                value: "500+",
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
                                value: "300+",
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
        </div >
    )
}

export default About