import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetailPage() {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-8">
            <div className="relative flex flex-col items-center bg-white rounded-lg shadow-lg p-6">
                <Image
                    src="https://rakjq0y4hyiacsg9.public.blob.vercel-storage.com/qris.png"
                    alt="QRIS Payment"
                    className="rounded-lg object-contain mb-4"
                    width={300}
                    height={300}
                />
                <h1 className="text-xl font-semibold text-gray-800 text-center mb-4">
                    Silakan konfirmasi pembayaran Anda via WhatsApp ke nomor di bawah dan sebutkan nama produk yang Anda beli.
                </h1>
                <Button asChild className="bg-green-500 hover:bg-green-600 text-white w-full max-w-xs">
                    <Link href={`https://wa.me/6281332202685`} target="_blank" rel="noopener noreferrer">
                        Hubungi via WhatsApp
                    </Link>
                </Button>
            </div>
        </div>
    )
}