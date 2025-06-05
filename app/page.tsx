"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import Navbar from "@/components/navbar";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Zap,
  Timer,
  Fuel,
  Settings,
  CheckCircle,
  CreditCard,
  History,
  Headphones,
  ArrowUpIcon as ArrowForward,
} from "lucide-react";
import {
  VehicleCardSkeleton,
  BrandLogoSkeleton,
} from "@/components/loading-skeletons";

// Move data outside component for better performance
const FEATURED_VEICLES = [
  {
    id: 1,
    name: "BMW M4 Competition",
    type: "Sports Coupe",
    price: "$84,995",
    monthlyPayment: "$1,199/mo",
    image: "/f4.avif",
    badge: "New Arrival",
    badgeColor: "bg-blue-500/70",
    specs: [
      { icon: Zap, label: "503 HP" },
      { icon: Timer, label: "0-60: 3.8s" },
      { icon: Fuel, label: "22 MPG" },
      { icon: Settings, label: "RWD" },
    ],
  },
  {
    id: 2,
    name: "Tesla Model S Plaid",
    type: "Electric Sedan",
    price: "$129,990",
    monthlyPayment: "$1,699/mo",
    image: "/f5.avif",
    badge: "Electric",
    badgeColor: "bg-green-600/70",
    specs: [
      { icon: Zap, label: "1,020 HP" },
      { icon: Timer, label: "0-60: 1.99s" },
      { icon: Zap, label: "396 mi Range" },
      { icon: Settings, label: "AWD" },
    ],
  },
  {
    id: 3,
    name: "Porsche 911 Turbo S",
    type: "Sports Coupe",
    price: "$216,100",
    monthlyPayment: "$2,799/mo",
    image: "/f6.jpg",
    badge: "Limited",
    badgeColor: "bg-amber-500/70",
    specs: [
      { icon: Zap, label: "640 HP" },
      { icon: Timer, label: "0-60: 2.6s" },
      { icon: Fuel, label: "20 MPG" },
      { icon: Settings, label: "AWD" },
    ],
  },
  {
    id: 4,
    name: "Mercedes-AMG GT 63 S",
    type: "Grand Tourer",
    price: "$159,900",
    monthlyPayment: "$2,199/mo",
    image: "/f1.webp",
    badge: "Performance",
    badgeColor: "bg-red-500/70",
    specs: [
      { icon: Zap, label: "630 HP" },
      { icon: Timer, label: "0-60: 3.1s" },
      { icon: Fuel, label: "19 MPG" },
      { icon: Settings, label: "AWD" },
    ],
  },
  {
    id: 5,
    name: "Audi RS e-tron GT",
    type: "Electric Sports",
    price: "$142,400",
    monthlyPayment: "$1,899/mo",
    image: "/f2.webp",
    badge: "Electric",
    badgeColor: "bg-green-500/70",
    specs: [
      { icon: Zap, label: "637 HP" },
      { icon: Timer, label: "0-60: 3.1s" },
      { icon: Zap, label: "238 mi Range" },
      { icon: Settings, label: "AWD" },
    ],
  },
  {
    id: 6,
    name: "Lamborghini Huracán EVO",
    type: "Supercar",
    price: "$248,295",
    monthlyPayment: "$3,299/mo",
    image: "/f3.avif",
    badge: "Exotic",
    badgeColor: "bg-purple-500/70",
    specs: [
      { icon: Zap, label: "630 HP" },
      { icon: Timer, label: "0-60: 2.9s" },
      { icon: Fuel, label: "16 MPG" },
      { icon: Settings, label: "AWD" },
    ],
  },
];
const CAR_BRANDS = [
  { name: "Honda", logo: "/honda.jpg" },
  { name: "Genesis", logo: "/gen.avif" },
  { name: "Bentley", logo: "/bentley.jpg" },
  { name: "Audi", logo: "/audi.jpg" },
  { name: "Peugeot", logo: "/geot.png" },
  { name: "Nissan", logo: "/nissan.png" },

  { name: "BMW", logo: "/bmw.png" },
  { name: "Mercedes", logo: "/mercedez.png" },

  { name: "Lexus", logo: "/lexus.svg" },
  { name: "Porsche", logo: "/porsche.png" },
  { name: "Ferrari", logo: "/fer.png" },
  { name: "Lamborghini", logo: "/lambo.jpg" },
];
const FEATURES = [
  {
    icon: CheckCircle,
    title: "Quality Guaranteed",
    description:
      "All our vehicles undergo a comprehensive 150-point inspection before listing.",
  },
  {
    icon: CreditCard,
    title: "Bespoke Financing",
    description:
      "Customized financing solutions to fit your budget and lifestyle needs.",
  },
  {
    icon: History,
    title: "Comprehensive Provenance",
    description:
      "Transparent vehicle history reports available for all our inventory.",
  },
  {
    icon: Headphones,
    title: "Premium Support",
    description:
      "Dedicated customer service team available 7 days a week for assistance.",
  },
];
const ARTICLES = [
  {
    id: 1,
    title: "The Future of Electric Vehicles: What to Expect in 2024",
    excerpt:
      "Explore the upcoming trends and technological advancements in the electric vehicle market that are set to revolutionize the automotive industry...",
    date: "May 12, 2023",
    category: "Electric Vehicles",
    categoryColor: "bg-green-100 text-green-800",
    image: "/a1.avif",
  },
  {
    id: 2,
    title: "The Art of Preserving Automotive Excellence",
    excerpt:
      "Master the refined techniques of maintaining your prestigious high-performance vehicle to ensure sublime performance and enduring elegance...",
    date: "April 28, 2023",
    category: "Maintenance",
    categoryColor: "bg-blue-100 text-blue-800",
    image: "/a2.avif",
  },
  {
    id: 3,
    title: "The Connoisseur's Guide to Luxury Automobiles",
    excerpt:
      "Make an informed decision when purchasing your next luxury vehicle with this comprehensive guide covering everything from financing to features...",
    date: "March 15, 2023",
    category: "Buying Guide",
    categoryColor: "bg-amber-100 text-amber-800",
    image: "/a3.avif",
  },
];

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);

  // Simulate loading for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second loading simulation

    return () => clearTimeout(timer);
  }, []);

  // Handle navbar sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      // Calculate when navbar should become sticky (when it reaches the top)
      const heroHeight = window.innerHeight - 100; // 100vh minus navbar height (80px)
      setIsNavbarSticky(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [currentVehicleSlide, setCurrentVehicleSlide] = useState(0);

  const vehiclesPerSlide = 3;
  const totalSlides = Math.ceil(FEATURED_VEICLES.length / vehiclesPerSlide);

  const getCurrentVehicles = () => {
    const startIndex = currentVehicleSlide * vehiclesPerSlide;
    return FEATURED_VEICLES.slice(startIndex, startIndex + vehiclesPerSlide);
  };

  const handleArticleClick = (articleId: number) => {
    router.push(`/articles/${articleId}`);
  };

  const handleVehicleClick = (vehicleId: number) => {
    router.push(`/vehicles/${vehicleId}`);
  };

  // Show loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero + Navbar Skeleton for 100vh */}
        <div className="h-screen flex flex-col p-6">
          {/* Hero Skeleton with spacing */}
          <div className="flex-1 bg-gray-200 animate-pulse relative rounded-xl mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent flex flex-col justify-center px-12 rounded-xl">
              <div className="w-96 h-12 bg-gray-300 rounded mb-4 animate-pulse" />
              <div className="w-80 h-6 bg-gray-300 rounded mb-8 animate-pulse" />
              <div className="flex gap-4">
                <div className="w-32 h-12 bg-gray-300 rounded animate-pulse" />
                <div className="w-32 h-12 bg-gray-300 rounded animate-pulse" />
              </div>
            </div>
          </div>

          {/* Navbar Skeleton */}
          <div className="bg-white border-b border-gray-100 py-4 rounded-lg">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex justify-between items-center">
                <div className="w-32 h-8 bg-gray-200 rounded animate-pulse" />
                <div className="hidden lg:flex space-x-8">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-16 h-4 bg-gray-200 rounded animate-pulse"
                    />
                  ))}
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                  <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Featured Vehicles Skeleton */}
          <section className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <div className="w-48 h-8 bg-gray-200 rounded animate-pulse" />
              <div className="flex space-x-2">
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <VehicleCardSkeleton key={i} />
              ))}
            </div>
          </section>

          {/* Other sections skeleton */}
          <section className="mb-16">
            <div className="w-64 h-8 bg-gray-200 rounded animate-pulse mx-auto mb-8" />
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
                {Array.from({ length: 12 }).map((_, i) => (
                  <BrandLogoSkeleton key={i} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50">
      {/* Hero + Navbar Container - Exactly 100vh with padding */}
      <div className="h-dvh md:h-screen flex flex-col md:p-6 ">
        {/* Hero Section - Takes remaining space with rounded corners and margins */}
        <header className="hs flex-1 relative overflow-hidden rounded-xl mb-6">
          <Image
            src="/home.avif"
            alt="Luxury sports car on a scenic road"
            fill
            className="object-cover transform hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-12 font-thin">
            <h1 className="text-4xl md:text-5xl lg:text-6xl  text-white mb-4 animate-fade-in font-extralight">
              Turning Dreams into <span className="text-blue-500">Reality</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-md mb-8">
              Discover our premium selection of high-performance vehicles
              designed for those who demand the extraordinary.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/vehicles">
                <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 transition-all duration-300 transform hover:-translate-y-1 font-extralight">
                  Explore Vehicles
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/30 px-8 py-3 transition-all duration-300 transform hover:-translate-y-1 font-extralight">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Navbar - Fixed height at bottom of 100vh with rounded corners */}
        <div
          className={`${
            isNavbarSticky
              ? "fixed top-0 left-6 right-6 z-50 bg-white border-b border-gray-100 rounded-lg"
              : "rounded-lg"
          } bg-white border-b border-gray-100 transition-all duration-300`}
        >
          <Navbar currentPage="home" isHomePage={true} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Featured Vehicles */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-extralight">Featured Vehicles</h2>
            <div className="flex space-x-2">
              <Button
                size="icon"
                variant="outline"
                className="rounded-full w-10 h-10 border border-gray-300 hover:bg-gray-100 transition-colors duration-300"
                onClick={() =>
                  setCurrentVehicleSlide((prev) =>
                    prev > 0 ? prev - 1 : totalSlides - 1
                  )
                }
                disabled={totalSlides <= 1}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full w-10 h-10 border border-gray-300 hover:bg-gray-100 transition-colors duration-300"
                onClick={() =>
                  setCurrentVehicleSlide((prev) =>
                    prev < totalSlides - 1 ? prev + 1 : 0
                  )
                }
                disabled={totalSlides <= 1}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getCurrentVehicles().map((vehicle, index) => (
              <div
                key={vehicle.id}
                className={`${
                  index === 0
                    ? "bg-white rounded-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-md"
                    : "bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={vehicle.image || "/placeholder.svg"}
                    alt={vehicle.name}
                    fill
                    className="object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    className={`absolute top-4 right-4 ${
                      vehicle.badgeColor
                    } text-white px-3 py-1 ${
                      index === 0 ? "rounded-full" : "rounded-sm"
                    } text-xs font-extralight`}
                  >
                    {vehicle.badge}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-sm font-light ">{vehicle.name}</h3>
                      <p className="text-gray-500 text-xs font-extralight">
                        {vehicle.type}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-s">{vehicle.price}</p>
                      <p className="text-xs text-gray-500 hidden">
                        {vehicle.monthlyPayment}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`grid grid-cols-2 ${
                      index === 0 ? "gap-3" : "gap-4"
                    } mb-${index === 0 ? "4" : "6"}`}
                  >
                    {vehicle.specs.map((spec, specIndex) => (
                      <div
                        key={specIndex}
                        className="flex items-center space-x-2"
                      >
                        <spec.icon className="text-gray-400 h-4 w-4" />
                        <span className="text-xs font-extralight">
                          {spec.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <Button
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors duration-300 text-xs font-light"
                      onClick={() => handleVehicleClick(vehicle.id)}
                    >
                      View Details
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors duration-300"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            ))}
          </div>

          {totalSlides > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentVehicleSlide
                      ? "bg-blue-600"
                      : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentVehicleSlide(index)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Car Brands */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center"></h2>
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-12 gap-0 items-center">
              {CAR_BRANDS.map((brand, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110 cursor-pointer"
                >
                  <Image
                    src={brand.logo || "/placeholder.svg"}
                    alt={`${brand.name} logo`}
                    width={120}
                    height={80}
                    className="max-w-full h-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8">
          <h2 className="text-lg  mb-8 text-center font-extralight">
            Why Choose Forbes Capital Cars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <feature.icon className="text-2xl text-blue-600" />
                </div>
                <h3 className="text-s  text-center mb-2 font-extralight">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center text-xs font-extralight">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Articles */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-extralight">Automotive Insights</h2>
            <Link
              href="/articles"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center transition-colors duration-300 text-xs"
            >
              View All Articles
              <ArrowForward className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ARTICLES.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => handleArticleClick(article.id)}
              >
                <div className="h-48 overflow-hidden">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="text-xs text-gray-500 mr-4 font-light">
                      {article.date}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${article.categoryColor} font-light`}
                    >
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-sm mb-3 font-light">{article.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 text-xs font-extralight">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300 text-xs">
                    Read More
                    <ArrowForward className="ml-1 text-sm h-4 w-4" />
                  </div>
                </CardContent>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-12 relative overflow-hidden rounded-lg">
          <div className="h-[400px] bg-gradient-to-r from-blue-700 to-blue-900 flex flex-col items-center justify-center p-8 text-center">
            <h2 className="text-3xl font-extralight text-white mb-4">
              Ready to Find Your Dream Car?
            </h2>
            <p className="text-white/90 text-base max-w-2xl mb-6 font-extralight">
              Browse our extensive inventory or schedule a personalized
              consultation with one of our automotive experts today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/vehicles">
                <Button
                  variant="secondary"
                  className="bg-white text-blue-700 px-6 py-3 rounded-sm transition-all duration-300 font-light"
                >
                  View Inventory
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="bg-transparent border border-white text-white px-6 py-3 rounded-sm transition-all duration-300 hover:bg-white/5 font-extralight text-sm">
                  Contact Sales Team
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
}
