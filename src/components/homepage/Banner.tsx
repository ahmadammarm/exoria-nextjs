/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Button } from "../ui/button";

export const Banner = () => {
    const slides = [
        {
            image: "/assets/homepage/banner.jpg",
            title: "Welcome to",
            titleHighlight: "Exoria Serana Digital",
            description: "We are ready to serve to overcome your digital problems with the right and innovative solutions",
            buttonText: "Hire Us",
            buttonLink: "/hire-us",
            imageUrl: "/assets/homepage/banner.jpg",
        },
    ];


    return (
        <div className="relative w-full h-screen py-16">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute w-full h-full transition-opacity duration-500 opacity-100 pointer-events-none"
                        }`}
                >
                    <div
                        className="w-full h-full flex items-center bg-cover bg-center relative"
                        style={{
                            backgroundImage: `url('${slide.image}')`,
                            backgroundSize: 'cover',
                            backgroundAttachment: 'fixed',
                            backgroundPosition: 'center',
                        }}
                    >
                        <div className="absolute inset-0 bg-black opacity-80"></div>

                        <div className="container mx-auto relative mt-28 z-10">
                            <div className="grid lg:grid-cols-2 gap-12 items-center md:gap-8">
                                <div
                                    className="flex justify-center lg:justify-end md:mb-0 pr-0 md:pr-10 order-1 md:order-2"
                                    data-aos="fade-left"
                                >
                                    <img
                                        className="w-[20rem] lg:w-[70%] rounded-[100%] transition-transform duration-500 hover:scale-105"
                                        src={slide.imageUrl}
                                        alt=""
                                        loading="lazy"
                                    />
                                </div>
                                <div
                                    className="text-center lg:text-left space-y-4 pl-0 md:pl-8 order-2 md:order-1"
                                    data-aos="fade-right"
                                >
                                    <h1 className="text-white text-4xl lg:text-5xl font-bold cursor-default mb-10 px-3 font-sans">
                                        {slide.title} <span className="text-[#dc2626] font-sans">{slide.titleHighlight}</span>
                                    </h1>
                                    <p className="text-white text-md lg:text-lg leading-relaxed font-medium cursor-default px-3 font-sans">
                                        {slide.description}
                                    </p>
                                    <Link href={slide.buttonLink} className="px-3 inline-block">
                                        <Button className="px-8 py-3 bg-[#dc2626] border-primary text-blue-50 font-bold rounded-lg hover:bg-white hover:text-primary transition duration-300 mb-16">
                                            {slide.buttonText}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Banner;