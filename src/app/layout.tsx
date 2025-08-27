import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "@/providers/ReactQueryClientProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Exoria Serana Digital | Your Digital Solutions",
    description: "Exoria Serana digital is an expert in creative idea comes with a creative mind. To prove this, Exoria is a formula to achieve success in web design, development and application system with great thoughts to start a business online.",
    keywords: [
        "Exoria",
        "Serana Digital",
        "Web Design",
        "Web Development",
        "Application System",
        "Digital Solutions",
        "Creative Ideas",
        "Innovative Solutions",
        "Online Business",
    ],
    authors: [{ name: "Exoria Serana Digital", url: "https://exoriaseranadigital.com" }],
    metadataBase: new URL("https://exoriaseranadigital.com"),
    creator: "Exoria Serana Digital",
    applicationName: "Exoria Serana Digital",
    robots: "index, follow",
    openGraph: {
        title: "Exoria Serana Digital",
        description: "Your digital problems with the right and innovative solutions",
        url: "https://exoriaseranadigital.com",
        siteName: "Exoria Serana Digital",
        images: [
            {
                url: "https://exoriaseranadigital.com/assets/landingpage.png",
                width: 1200,
                height: 630,
                alt: "Exoria Serana Digital",
            },
        ],
        locale: "id_ID",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Exoria Serana Digital",
        description: "Your digital problems with the right and innovative solutions",
        images: ["https://exoriaseranadigital.com/assets/landingpage.png"],
        creator: "@yourtwitter",
    },
    icons: {
        icon: "/assets/layout/logo.jpg",
        shortcut: "/assets/layout/shortcut.jpg",
    }
};


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const session = await getServerSession(authOptions);

    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Toaster richColors />
                <NextAuthProvider session={session}>
                    <ReactQueryProvider>
                        {children}
                    </ReactQueryProvider>
                </NextAuthProvider>
            </body>
        </html>
    );
}
