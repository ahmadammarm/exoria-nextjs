import Image from "next/image";

export default function ProductDetailPage() {
    return (
        <div>
            {/* silahkan bayar melalui qris di bawah ini */}
            <div className="flex justify-center items-center h-screen">
                <Image
                    src="https://rakjq0y4hyiacsg9.public.blob.vercel-storage.com/qris.png"
                    alt="QRIS Payment"
                    className="max-w-full max-h-full"
                    width={500}
                    height={500}
                />
                <div className="absolute inset-0 bg-black opacity-50" />
            </div>
        </div>
    )
}