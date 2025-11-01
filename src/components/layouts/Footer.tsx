'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Linkedin } from 'lucide-react'
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Footer() {

    const { status } = useSession();
    const router = useRouter();

    return (
        <>
            {/* subscription form */}
            <div className="bg-[#dc2626] py-16 md:py-24 px-4 md:px-14">
                <h2
                    className="text-4xl md:text-5xl font-bold text-center mb-16 text-white relative"
                    data-aos="fade-up"
                >
                    Subscribe to Our Newsletter
                </h2>
                {status === "authenticated" ? (
                    <p className="text-center text-white mb-8" data-aos="fade-up">
                        Stay updated with our latest news and offers. Subscribe to our newsletter now!
                    </p>
                ) : (
                    <p className="text-center text-white mb-8" data-aos="fade-up">
                        Sign in to subscribe to our newsletter and stay updated with our latest news and offers.
                    </p>
                )}
                <form className="max-w-md mx-auto" data-aos="fade-up">
                    {status === "authenticated" ? (
                        <>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
                                required
                            />
                            <Button
                                type="submit"
                                className="w-full bg-white text-[#dc2626] font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Subscribe
                            </Button>
                        </>
                    ) : (
                        <Button
                            onClick={() => router.push("/auth/sign-in")}
                            className="w-full bg-white text-[#dc2626] font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            Sign in to subscribe
                        </Button>
                    )}
                </form>
            </div>
            <footer className="bg-black text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                        {/* Logo and Description Section */}
                        <div className="lg:col-span-2 space-y-4">
                            <p className="text-gray-300 mt-4 max-w-md font-poppins">
                                Exoria Serana Digital are expert in creative idea comes with a creative mind. To prove this, Exoria is a formula to achieve success in web design, development and application system with great thoughts to start a business online.
                            </p>
                            <div className="flex gap-4 mt-6">
                                <Link href="https://wa.me/6281231964810" className="hover:text-[#dc2626] transition-colors">
                                    <Phone className="w-6 h-6" />
                                </Link>
                                <Link href="https://www.instagram.com/exoriaweb_store" className="hover:text-[#dc2626] transition-colors">
                                    <Instagram className="w-6 h-6" />
                                </Link>
                                <Link href="https://www.linkedin.com/company/exoria-serana-digital/" className="hover:text-[#dc2626] transition-colors">
                                    <Linkedin className="w-6 h-6" />
                                </Link>
                            </div>
                        </div>




                        {/* Halaman Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold border-b border-[#dc2626] pb-2 mb-4 font-poppins">Pages</h3>
                            <ul className="space-y-2">
                                {[{
                                    href: "/",
                                    label: "Home"
                                },
                                {
                                    href: "/our-portfolio",
                                    label: "Our Portfolio"
                                },
                                {
                                    href: "/why-choose-us",
                                    label: "Why Choose Us"
                                },
                                {
                                    href: "/hire-us",
                                    label: "Hire Us"
                                }].map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className="text-gray-300 hover:text-[#dc2626] transition-colors font-poppins"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Produk Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold border-b border-[#dc2626] pb-2 mb-4">Services</h3>
                            <ul className="space-y-2">
                                {['Web Development', 'UI/UX Design', 'Graphic Design'].map((item) => (
                                    <li key={item}>
                                        <Link
                                            href={"#"}
                                            className="text-gray-300 hover:text-[#dc2626] transition-colors font-poppins"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Informasi Section */}
                        {/* <div className="space-y-4">
                            <h3 className="text-lg font-semibold border-b border-[#dc2626] pb-2 mb-4 font-poppins">Informasi</h3>
                            <ul className="space-y-2">
                                {['Tentang Kami', 'Hubungi Kami', 'Tim Pengembang'].map((item) => (
                                    <li key={item}>
                                        <Link
                                            href="#"
                                            className="text-gray-300 hover:text-[#dc2626] transition-colors font-poppins"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div> */}
                    </div>

                    {/* Map and Contact Section */}
                    <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold border-b border-[#dc2626] pb-2 mb-4 font-poppins">Alamat</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-[#dc2626] flex-shrink-0 mt-1" />
                                    <p className="text-gray-300 font-poppins">
                                        Surabaya, Jawa Timur
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-[#dc2626]" />
                                    <p className="text-gray-300 font-poppins">+62 812-3196-4810</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-[300px] rounded-lg overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126646.25766577323!2d112.63028049802683!3d-7.2754417148182595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbf8381ac47f%3A0x3027a76e352be40!2sSurabaya%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1753596195018!5m2!1sen!2sid"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>

                    {/* Copyright Section */}
                    <div className="mt-12 pt-8 border-t border-gray-800">
                        <p className="text-center text-gray-400 font-poppins">
                            © {new Date().getFullYear()} Exoria Serana Digital. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}
