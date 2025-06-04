"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Heart,
  Share2,
  Zap,
  Timer,
  Fuel,
  Settings,
  Calendar,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
} from "lucide-react";
import Navbar from "@/components/navbar";

// Vehicle data - in a real app, this would come from an API
const VEHICLES = {
  1: {
    id: 1,
    name: "BMW M4 Competition",
    type: "Sports Coupe",
    price: 84995,
    monthlyPayment: "$1,199/mo",
    year: 2024,
    mileage: 0,
    condition: "New",
    location: "Beverly Hills, CA",
    badge: "New Arrival",
    badgeColor: "bg-blue-500",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    specs: {
      engine: "3.0L Twin-Turbo I6",
      horsepower: "503 HP",
      torque: "479 lb-ft",
      acceleration: "0-60: 3.8s",
      topSpeed: "180 mph",
      fuelEconomy: "22 MPG",
      drivetrain: "RWD",
      transmission: "8-Speed Automatic",
    },
    features: [
      "M Carbon Fiber Roof",
      "Adaptive M Suspension",
      "M Carbon Ceramic Brakes",
      "Harman Kardon Sound System",
      "Head-Up Display",
      "Wireless Charging",
      "Apple CarPlay",
      "Lane Departure Warning",
      "Blind Spot Monitoring",
      "Parking Assistant",
    ],
    description:
      "The BMW M4 Competition represents the pinnacle of BMW's performance engineering. With its twin-turbocharged inline-six engine producing 503 horsepower, this machine delivers exhilarating performance while maintaining the luxury and refinement BMW is known for.",
    warranty: "4 years / 50,000 miles",
    financing: {
      apr: "2.9%",
      term: "60 months",
      downPayment: "$15,000",
    },
  },
  2: {
    id: 2,
    name: "Tesla Model S Plaid",
    type: "Electric Sedan",
    price: 129990,
    monthlyPayment: "$1,699/mo",
    year: 2024,
    mileage: 0,
    condition: "New",
    location: "Palo Alto, CA",
    badge: "Electric",
    badgeColor: "bg-green-500",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    specs: {
      engine: "Tri-Motor Electric",
      horsepower: "1,020 HP",
      torque: "1,050 lb-ft",
      acceleration: "0-60: 1.99s",
      topSpeed: "200 mph",
      range: "396 miles",
      drivetrain: "AWD",
      charging: "250kW Supercharging",
    },
    features: [
      "17-inch Cinematic Display",
      "Premium Audio System",
      "Full Self-Driving Capability",
      "Over-the-Air Updates",
      "HEPA Air Filtration",
      "Wireless Phone Charging",
      "Heated & Ventilated Seats",
      "Autopilot",
      "Sentry Mode",
      "Mobile Connector",
    ],
    description:
      "The Tesla Model S Plaid is the quickest accelerating sedan ever produced. With its tri-motor setup and advanced battery technology, it delivers unprecedented performance while maintaining zero emissions.",
    warranty: "4 years / 50,000 miles",
    financing: {
      apr: "3.2%",
      term: "72 months",
      downPayment: "$20,000",
    },
  },
  // Add more vehicles as needed...
};

export default function VehicleDetailPage() {
  const params = useParams();
  //const router = useRouter();
  const vehicleId = Number.parseInt(params.id as string);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const vehicle = VEHICLES[vehicleId as keyof typeof VEHICLES];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar currentPage="vehicles" />
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Loading skeleton */}
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-gray-200 rounded mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="h-96 bg-gray-200 rounded-xl"></div>
              <div className="space-y-4">
                <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
                <div className="h-10 w-1/3 bg-gray-200 rounded"></div>
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-4 w-full bg-gray-200 rounded"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar currentPage="vehicles" />
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Vehicle Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The vehicle you&apos;re looking for doesn&apos;t exist.
            </p>

            <Link href="/vehicles">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Vehicles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage="vehicles" />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Link
          href="/vehicles"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Vehicles
        </Link>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image
                src={vehicle.images[currentImageIndex] || "/placeholder.svg"}
                alt={vehicle.name}
                fill
                className="object-cover"
              />
              <Badge
                className={`absolute top-4 right-4 ${vehicle.badgeColor} text-white`}
              >
                {vehicle.badge}
              </Badge>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {vehicle.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative h-20 rounded-lg overflow-hidden border-2 ${
                    currentImageIndex === index
                      ? "border-blue-600"
                      : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${vehicle.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {vehicle.name}
              </h1>
              <p className="text-xl text-gray-600 mb-4">{vehicle.type}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  {vehicle.year}
                </span>
                <span>{vehicle.mileage.toLocaleString()} miles</span>
                <span className="flex items-center">
                  <MapPin className="mr-1 h-4 w-4" />
                  {vehicle.location}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-900">
                  ${vehicle.price.toLocaleString()}
                </span>
                <span className="text-lg text-gray-600">
                  {vehicle.monthlyPayment}
                </span>
              </div>
            </div>

            {/* Key Specs */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Key Specifications
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {vehicle.specs.horsepower && (
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">
                        {vehicle.specs.horsepower}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Timer className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">
                      {vehicle.specs.acceleration}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Fuel className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">
                      {vehicle.specs.fuelEconomy || vehicle.specs.range}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Settings className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{vehicle.specs.drivetrain}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Phone className="mr-2 h-4 w-4" />
                Call Dealer
              </Button>
              <Button variant="outline" className="flex-1">
                <Mail className="mr-2 h-4 w-4" />
                Email Inquiry
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="financing">Financing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Vehicle Description
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {vehicle.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Condition</h4>
                    <p className="text-gray-600">{vehicle.condition}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Warranty</h4>
                    <p className="text-gray-600">{vehicle.warranty}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Location</h4>
                    <p className="text-gray-600">{vehicle.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specs" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(vehicle.specs).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between py-2 border-b border-gray-100"
                    >
                      <span className="font-medium capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Features & Equipment
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vehicle.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financing" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Financing Options
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {vehicle.financing.apr}
                    </div>
                    <div className="text-sm text-gray-600">APR</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {vehicle.financing.term}
                    </div>
                    <div className="text-sm text-gray-600">Term</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {vehicle.financing.downPayment}
                    </div>
                    <div className="text-sm text-gray-600">Down Payment</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  *Financing terms are subject to credit approval. Contact our
                  finance team for personalized rates and terms.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
