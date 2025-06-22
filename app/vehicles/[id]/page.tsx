"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  Zap,
  Timer,
  Fuel,
  Settings,
  Heart,
  Share2,
  Phone,
  Mail,
} from "lucide-react";
import { supabase } from "@/lib/supabase-client";
import Navbar from "@/components/navbar";
import Link from "next/link";

interface Vehicle {
  id: number;
  name: string;
  type: string;
  category: string;
  price: number;
  image: string;
  badge?: string;
  year: number;
  mileage: number;
  horsepower?: number;
  acceleration?: string;
  mpg?: string;
  drivetrain?: string;
  created_at?: string;
  updated_at?: string;
}

function getBadgeColor(badge?: string) {
  switch (badge) {
    case "New Arrival":
      return "bg-blue-500/70";
    case "Popular":
      return "bg-orange-500/80";
    case "Limited":
      return "bg-amber-500/70";
    case "Electric":
      return "bg-green-600/70";
    case "Performance":
      return "bg-red-600/70";
    case "Exotic":
      return "bg-purple-600/70";
    case "Luxury":
      return "bg-yellow-500/70";
    case "Off-Road":
      return "bg-lime-600/70";
    default:
      return "bg-gray-400/70";
  }
}

export default function VehiclePage() {
  const params = useParams();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      if (!params.id) return;

      try {
        const { data, error } = await supabase
          .from("vehicles")
          .select("*")
          .eq("id", params.id)
          .single();

        if (error) {
          setError("Vehicle not found");
        } else {
          setVehicle(data);
        }
      } catch (err) {
        setError("Failed to load vehicle");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [params.id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading vehicle...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !vehicle) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Vehicle Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              {error || "The vehicle you're looking for doesn't exist."}
            </p>
            <Button asChild>
              <Link href="/vehicles">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Vehicles
              </Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-6">
            <Button
              variant="ghost"
              asChild
              className="text-blue-600 hover:text-blue-700 pl-0"
            >
              <Link href="/vehicles">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Vehicles
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-12">
            {/* Left Column: Image */}
            <div className="lg:col-span-4">
              <div className="relative h-[550px] w-full rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={vehicle.image || "/a1.avif"}
                  alt={vehicle.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div
                  className={`absolute top-4 right-4 ${getBadgeColor(
                    vehicle.badge
                  )} text-white px-3 py-1 rounded-full text-sm font-medium`}
                >
                  {vehicle.badge}
                </div>
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="lg:col-span-3 space-y-6 flex flex-col">
              <div>
                <h1 className="text-4xl font-bold text-gray-900">
                  {vehicle.name}
                </h1>
                <p className="text-xl text-gray-600 mt-2">
                  {vehicle.type}
                  {vehicle.category && ` | ${vehicle.category}`}
                </p>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{vehicle.year}</span>
                </span>
                <span className="text-xl"></span>
                <span>{vehicle.mileage.toLocaleString()} miles</span>
              </div>

              <div>
                <span className="text-4xl font-bold text-gray-900">
                  ₱{vehicle.price.toLocaleString()}
                </span>
              </div>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Key Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {vehicle.horsepower && (
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-gray-400" />
                        <span>{vehicle.horsepower} HP</span>
                      </div>
                    )}
                    {vehicle.acceleration && (
                      <div className="flex items-center space-x-2">
                        <Timer className="h-4 w-4 text-gray-400" />
                        <span>0-60: {vehicle.acceleration}</span>
                      </div>
                    )}
                    {vehicle.mpg && (
                      <div className="flex items-center space-x-2">
                        <Fuel className="h-4 w-4 text-gray-400" />
                        <span>{vehicle.mpg}</span>
                      </div>
                    )}
                    {vehicle.drivetrain && (
                      <div className="flex items-center space-x-2">
                        <Settings className="h-4 w-4 text-gray-400" />
                        <span>{vehicle.drivetrain}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center space-x-2 pt-2">
                <Button
                  size="lg"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Dealer
                </Button>
                <Button size="lg" variant="outline" className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Inquiry
                </Button>
                <Button size="icon" variant="outline">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
