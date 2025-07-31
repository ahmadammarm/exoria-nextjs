import { useParams } from "next/navigation";

export default function ProductDetailPage() {
    const { slug } = useParams();

    return (
        <div>
            <h1>Product Detail Page</h1>
            <p>Product slug: {slug}</p>
        </div>
    );
} 