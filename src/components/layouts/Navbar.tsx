/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "../ui/button"
import { usePathname, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import SignoutButton from "../auth/SignoutButton"
import Image from "next/image"

const navItems = [
    { href: "/", label: "Home" },
    { href: "/our-portfolio", label: "Our Portfolio" },
    { href: "/why-choose-us", label: "Why Choose Us" },
    { href: "/hire-us", label: "Hire Us" },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const pathname = usePathname()
    const router = useRouter();

    const { status } = useSession();

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()

        window.addEventListener('resize', checkMobile)

        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        if (!isMobile && isOpen) {
            setIsOpen(false)
        }
    }, [isMobile, isOpen])

    return (
        <nav className="bg-white shadow-md py-2 px-2 md:px-0 fixed overflow-hidden w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold text-gray-800">
                            <Image src="/assets/logo.png" width={40} height={40} alt="logo" />
                        </Link>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`${pathname === item.href ? "text-[#dc2626]" : "text-gray-600 hover:text-[#dc2626]"} px-3 py-2 rounded-md text-lg font-medium`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            {status === "authenticated" ? (
                                <SignoutButton />
                            ) : (
                                <Button onClick={() => router.push('/auth/sign-in')} className="bg-[#dc2626] text-white hover:bg-red-600">
                                    Sign in
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu */}
                    <div className="md:hidden">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className="w-14 h-14 items-center justify-center rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                    aria-controls="mobile-menu"
                                    aria-expanded={isOpen}
                                >
                                    <Menu className="w-full" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-64">
                                <div className="pt-5 pb-4">
                                    <div className="flex items-center justify-between px-4">
                                        <div className="text-xl font-bold text-gray-800">Menu</div>
                                    </div>
                                    <div className="mt-6 px-2 space-y-1">
                                        {navItems.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className={`${pathname === item.href ? "text-[#dc2626]" : " text-gray-700 hover:text-[#dc2626] hover:bg-gray-50"} block px-3 py-2 rounded-md text-lg font-medium`}
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    )
}