'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react'
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
                            <div className="flex items-center justify-center md:justify-start mb-10">
                                <div className="p-3 bg-white rounded-lg w-[80%]">
                                    <Image
                                        alt="logo um"
                                        src="/aset-home/logo-um.png"
                                        width={450}
                                        height={100}
                                    />
                                </div>
                            </div>
                            <p className="text-gray-300 mt-4 max-w-md font-poppins">
                                Program pengabdian yang berfokus pada pelatihan entrepreneur skills untuk Paguyubuan Amanah Bersama dalam mengoptimalkan potensi hasil alam berupa buah Jambu di Dusun Gunungronggo.
                            </p>
                            <div className="flex gap-4 mt-6">
                                <Link href="https://facebook.com" className="hover:text-[#dc2626] transition-colors">
                                    <Facebook className="w-6 h-6" />
                                </Link>
                                <Link href="https://instagram.com" className="hover:text-[#dc2626] transition-colors">
                                    <Instagram className="w-6 h-6" />
                                </Link>
                                <Link href="https://youtube.com" className="hover:text-[#dc2626] transition-colors">
                                    <Youtube className="w-6 h-6" />
                                </Link>
                            </div>
                        </div>




                        {/* Halaman Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold border-b border-[#dc2626] pb-2 mb-4 font-poppins">Halaman</h3>
                            <ul className="space-y-2">
                                {['Beranda', 'Eco Edu', 'Eco Product', 'Tour Guide'].map((item) => (
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
                        </div>

                        {/* Produk Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold border-b border-[#dc2626] pb-2 mb-4">Produk</h3>
                            <ul className="space-y-2">
                                {['Fashion', 'Food and Beverage'].map((item) => (
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
                        <div className="space-y-4">
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
                        </div>
                    </div>

                    {/* Map and Contact Section */}
                    <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold border-b border-[#dc2626] pb-2 mb-4 font-poppins">Alamat</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-[#dc2626] flex-shrink-0 mt-1" />
                                    <p className="text-gray-300 font-poppins">
                                        Dusun Gunungronggo, Kecamatan Tajinan, Kabupaten Malang, Jawa Timur
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-[#dc2626]" />
                                    <p className="text-gray-300 font-poppins">+62 857-4635-3092</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-[#dc2626]" />
                                    <p className="text-gray-300 font-poppins">karuna@gmail.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-[300px] rounded-lg overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.507420955202!2d112.70717719999999!3d-8.0496091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd627005d181211%3A0x48323e0f76be6bc3!2sPaguyuban%20Orang%20Tua%20Penyandang%20Disabilitas%20Amanah%20Bersama!5e0!3m2!1sen!2sid!4v1738504714027!5m2!1sen!2sid"
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
                            © {new Date().getFullYear()} Program Karuna. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}
