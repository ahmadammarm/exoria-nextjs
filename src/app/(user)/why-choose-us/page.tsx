import BannerLayout from "@/components/layouts/BannerLayout";
import { Card } from "@/components/ui/card";
import { Sparkles, Users, ShieldCheck } from "lucide-react"; // Gunakan icon lucide-react

export default function WhyChooseUsPage() {
    return (
        <div>
            <BannerLayout
                title="Why Choose Us"
                imageUrl="/assets/layout/banner.jpg"
                subtitle="Discover the reasons to partner with us"
            />
            {/* Why choose us section */}
            <div className="py-16 md:py-24 px-4 md:px-14 bg-gradient-to-br">
                <h2
                    className="text-4xl md:text-5xl font-bold text-center mb-16 relative drop-shadow-lg"
                    data-aos="fade-up"
                >
                    Why Choose Us
                </h2>
                <p className="text-center text-gray-700 mb-16 font-medium" data-aos="fade-up">
                    We are committed to delivering exceptional results and ensuring client satisfaction. Here are some reasons why you should choose us.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Expert Team",
                            description: "Our team consists of industry experts with years of experience.",
                            icon: <Users size={36} className="text-yellow-500 mb-3" />
                        },
                        {
                            title: "Quality Assurance",
                            description: "We ensure the highest quality standards in all our projects.",
                            icon: <ShieldCheck size={36} className="text-blue-500 mb-3" />
                        },
                        {
                            title: "Customer Focused",
                            description: "We prioritize our clients' needs and work closely with them.",
                            icon: <Sparkles size={36} className="text-pink-500 mb-3" />
                        },
                    ].map((item, index) => (
                        <Card
                            key={index}
                            className="p-6 shadow-xl bg-[#dc2626] hover:scale-105 transition-transform duration-300 border-2 border-[#dc2626] rounded-xl flex flex-col items-center"
                        >
                            {item.icon}
                            <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                            <p className="text-gray-200 text-center">{item.description}</p>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Testimonials */}
            <div className="py-10 md:py-16 px-4 md:px-14">
                <h2
                    className="text-4xl md:text-5xl font-bold text-center mb-16 relative"
                    data-aos="fade-up"
                >
                    Testimonials
                </h2>
                <p className="text-center text-gray-600 mb-16" data-aos="fade-up">
                    Here&apos;s what our clients say about us.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            name: "Zaky Wahyu Oktavianto",
                            role: "Manager",
                            feedback: "Very high quality! However, that would be even greater if you can separate css & js for each type of theme! (not include all in one so it can be loaded faster). Thanks for this very high item!",
                            rating: 5,
                        },
                        {
                            name: "Sujatmiko Dwi Kuncoro",
                            role: "Founder",
                            feedback: "Best design, well coded, really surprised to check it's reusability. Clean code. Easy to use. Most of category included and author will add more templates wow. I will recommend for all developers.",
                            rating: 5,
                        },
                        {
                            name: "Ahmad Baihaqy",
                            role: "IT Consultant",
                            feedback: "Excellence !!! As a developer I will give 5 Star and will recommend 200% with confident.",
                            rating: 5,
                        },
                    ].map((testimonial, index) => (
                        <Card
                            key={index}
                            className={`p-6 shadow-lg rounded-lg ${index === 1 ? "bg-[#dc2626]" : "bg-white"
                                }`}
                        >
                            <h3 className={`text-xl font-bold mb-1 ${index === 1 ? "text-white" : ""}`}>{testimonial.name}</h3>
                            <p className={`text-sm mb-2 ${index === 1 ? "text-gray-200" : "text-gray-500"}`}>{testimonial.role}</p>
                            <div className="flex mb-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z" />
                                    </svg>
                                ))}
                            </div>
                            <p className={`${index === 1 ? "text-white" : "text-gray-600"}`}>{testimonial.feedback}</p>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Statistics section */}
            <div className="bg-gradient-to-r py-16 md:py-24 px-4 md:px-14">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Years of Experience",
                            value: "1",
                            description: "Years in the industry providing top-notch digital solutions.",
                            icon: (
                                <svg width={40} height={40} viewBox="0 0 24 24" className="mb-4 animate-bounce" fill="none" stroke="#dc2626" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                            ),
                        },
                        {
                            title: "Completed Projects",
                            value: "",
                            description: "Successfully delivered projects across various industries.",
                            icon: (
                                <svg width={40} height={40} viewBox="0 0 24 24" className="mb-4 animate-spin" fill="none" stroke="#dc2626" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="7" width="20" height="14" rx="2" />
                                    <path d="M16 3h-8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z" />
                                </svg>
                            ),
                        },
                        {
                            title: "Happy Clients",
                            value: "",
                            description: "Clients who trust us for their digital needs.",
                            icon: (
                                <svg width={40} height={40} viewBox="0 0 24 24" className="mb-4 animate-pulse" fill="none" stroke="#dc2626" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                                    <circle cx="17" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                </svg>
                            ),
                        },
                    ].map((item, index) => (
                        <Card key={index} className="p-6 bg-white shadow-xl rounded-xl flex flex-col items-center hover:scale-105 transition-transform duration-300 border-2 border-[#dc2626]">
                            {item.icon}
                            <p className="text-4xl text-[#dc2626] mb-4 font-extrabold drop-shadow">{item.value}</p>
                            <h3 className="text-2xl font-bold mb-2 text-center text-[#dc2626]">{item.title}</h3>
                            <p className="text-gray-700 text-center">{item.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}