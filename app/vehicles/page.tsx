"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart, Zap, Timer, Fuel, Settings, Grid3X3, List } from "lucide-react";
import Navbar from "@/components/navbar";
import {
  VehicleCardSkeleton,
  PageHeaderSkeleton,
  FiltersSkeleton,
} from "@/components/loading-skeletons";

export default function VehiclesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState(
    categoryParam || "all"
  );
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second loading simulation

    return () => clearTimeout(timer);
  }, []);

  const allVehicles = [
    {
      id: 1,
      name: "BMW M4 Competition",
      type: "Sports Coupe",
      category: "sports",
      price: 84995,
      monthlyPayment: "$1,199/mo",
      image: "/f4.avif",
      badge: "New Arrival",
      badgeColor: "bg-blue-500/70",
      year: 2024,
      mileage: 0,
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
      category: "electric",
      price: 129990,
      monthlyPayment: "$1,699/mo",
      image: "/f5.avif",
      badge: "Electric",
      badgeColor: "bg-green-500/70",
      year: 2024,
      mileage: 0,
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
      category: "sports",
      price: 216100,
      monthlyPayment: "$2,799/mo",
      image: "/f6.jpg",
      badge: "Limited",
      badgeColor: "bg-amber-500/70",
      year: 2024,
      mileage: 0,
      specs: [
        { icon: Zap, label: "640 HP" },
        { icon: Timer, label: "0-60: 2.6s" },
        { icon: Fuel, label: "20 MPG" },
        { icon: Settings, label: "AWD" },
      ],
    },
    {
      id: 4,
      name: "Mercedes-Benz S-Class",
      type: "Luxury Sedan",
      category: "sedans",
      price: 115000,
      monthlyPayment: "$1,499/mo",
      image: "/v2.jpg",
      badge: "Luxury",
      badgeColor: "bg-purple-500/70",
      year: 2024,
      mileage: 0,
      specs: [
        { icon: Zap, label: "429 HP" },
        { icon: Timer, label: "0-60: 4.4s" },
        { icon: Fuel, label: "25 MPG" },
        { icon: Settings, label: "AWD" },
      ],
    },
    {
      id: 5,
      name: "Range Rover Sport",
      type: "Luxury SUV",
      category: "suvs",
      price: 95000,
      monthlyPayment: "$1,299/mo",
      image: "/v3.webp",
      badge: "Popular",
      badgeColor: "bg-orange-500/70",
      year: 2024,
      mileage: 0,
      specs: [
        { icon: Zap, label: "355 HP" },
        { icon: Timer, label: "0-60: 6.3s" },
        { icon: Fuel, label: "21 MPG" },
        { icon: Settings, label: "AWD" },
      ],
    },
    {
      id: 6,
      name: "Ford F-150 Raptor",
      type: "Performance Truck",
      category: "trucks",
      price: 75000,
      monthlyPayment: "$999/mo",
      image: "/v1.jpg",
      badge: "Off-Road",
      badgeColor: "bg-red-500/70",
      year: 2024,
      mileage: 0,
      specs: [
        { icon: Zap, label: "450 HP" },
        { icon: Timer, label: "0-60: 5.1s" },
        { icon: Fuel, label: "18 MPG" },
        { icon: Settings, label: "4WD" },
      ],
    },
  ];

  const filteredVehicles = allVehicles.filter((vehicle) => {
    const matchesCategory =
      selectedCategory === "all" || vehicle.category === selectedCategory;
    const matchesSearch =
      vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "under-100k" && vehicle.price < 100000) ||
      (priceRange === "100k-200k" &&
        vehicle.price >= 100000 &&
        vehicle.price < 200000) ||
      (priceRange === "over-200k" && vehicle.price >= 200000);

    return matchesCategory && matchesSearch && matchesPrice;
  });

  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "year":
        return b.year - a.year;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleVehicleClick = (vehicleId: number) => {
    router.push(`/vehicles/${vehicleId}`);
  };

  // Show loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar currentPage="vehicles" />
        <div className="px-6 py-8">
          <PageHeaderSkeleton />
          <FiltersSkeleton />
          <div className="mb-6">
            <div className="w-48 h-4 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <VehicleCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar currentPage="vehicles" />

      <div className="px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-extralight mb-4">
            Our Vehicle Collection
          </h1>
          <p className=" text-sm font-extralight">
            Discover our premium selection of luxury and high-performance
            vehicles - turning dreams into reality
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-extralight mb-2">
                Search
              </label>
              <Input
                placeholder="Search vehicles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full font-extralight"
              />
            </div>
            <div>
              <label className="block text-sm font-extralight mb-2">
                Category
              </label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="font-extralight">
                  <SelectValue
                    placeholder="All Categories"
                    className="font-extralight"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="font-extralight">
                    All Categories
                  </SelectItem>
                  <SelectItem value="sedans" className="font-extralight">
                    Sedans
                  </SelectItem>
                  <SelectItem value="sports" className="font-extralight">
                    Sports
                  </SelectItem>
                  <SelectItem value="suvs" className="font-extralight">
                    SUVs
                  </SelectItem>
                  <SelectItem value="electric" className="font-extralight">
                    Electric
                  </SelectItem>
                  <SelectItem value="trucks" className="font-extralight">
                    Trucks
                  </SelectItem>
                  <SelectItem value="classics" className="font-extralight">
                    Classics
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-extralight mb-2">
                Price Range
              </label>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="font-extralight">
                  <SelectValue
                    placeholder="All Prices"
                    className="font-extralight"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="font-extralight">
                    All Prices
                  </SelectItem>
                  <SelectItem value="under-100k" className="font-extralight">
                    Under $100k
                  </SelectItem>
                  <SelectItem value="100k-200k" className="font-extralight">
                    $100k - $200k
                  </SelectItem>
                  <SelectItem value="over-200k" className="font-extralight">
                    Over $200k
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-extralight mb-2">
                Sort By
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="font-extralight">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name" className="font-extralight">
                    Name
                  </SelectItem>
                  <SelectItem value="price-low" className="font-extralight">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="price-high" className="font-extralight">
                    Price: High to Low
                  </SelectItem>
                  <SelectItem value="year" className="font-extralight">
                    Year
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 font-extralight text-sm">
            Showing {sortedVehicles.length} of {allVehicles.length} vehicles
            {selectedCategory !== "all" && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Vehicle Grid */}
        <div
          className={`grid gap-8 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {sortedVehicles.map((vehicle) => (
            <Card
              key={vehicle.id}
              className={`overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer ${
                viewMode === "list" ? "flex flex-row" : ""
              }`}
              onClick={() => handleVehicleClick(vehicle.id)}
            >
              <div
                className={`relative overflow-hidden ${
                  viewMode === "list" ? "w-1/3 h-48" : "h-48"
                }`}
              >
                <Image
                  src={vehicle.image || "/placeholder.svg"}
                  alt={vehicle.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div
                  className={`absolute top-4 right-4 ${vehicle.badgeColor} text-white px-3 py-1 rounded-full text-xs font-extralight`}
                >
                  {vehicle.badge}
                </div>
              </div>
              <CardContent
                className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-extralight ">{vehicle.name}</h3>
                    <p className=" text-sm font-extralight">{vehicle.type}</p>
                    <p className="text-xs font-extralight">
                      {vehicle.year} • {vehicle.mileage} miles
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-s ">${vehicle.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-500 hidden">
                      {vehicle.monthlyPayment}
                    </p>
                  </div>
                </div>
                <div
                  className={`grid gap-4 mb-6 ${
                    viewMode === "list" ? "grid-cols-4" : "grid-cols-2"
                  }`}
                >
                  {vehicle.specs.map((spec, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <spec.icon className="text-gray-400 h-4 w-4" />
                      <span className="text-xs font-extralight">
                        {spec.label}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <Button
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-xs font-light"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVehicleClick(vehicle.id);
                    }}
                  >
                    View Details
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle favorite logic here
                    }}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedVehicles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No vehicles found matching your criteria.
            </p>
            <Button
              className="mt-4"
              onClick={() => {
                setSelectedCategory("all");
                setPriceRange("all");
                setSearchQuery("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
