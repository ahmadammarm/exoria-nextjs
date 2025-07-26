import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}