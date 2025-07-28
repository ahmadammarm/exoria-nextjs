import React from "react"

interface BannerProps {
    title: string
    imageUrl: string
    subtitle: string
}

const BannerLayout: React.FC<BannerProps> = ({
    title,
    imageUrl,
    subtitle
}) => {
    return (
        <div className="relative w-full h-[500px] md:h-[500px] lg:h-[600px] overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full parallax" style={{
                backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundAttachment: 'fixed'
            }}>
                <div className="absolute inset-0 bg-black opacity-80"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                    <h2 className="text-4xl md:text-5xl font-black mb-4 font-poppins text-white">
                        {title}
                    </h2>
                    <p className="text-lg md:text-xl font-light mb-8 font-poppins text-white">
                        {subtitle}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default BannerLayout