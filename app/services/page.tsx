"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/navbar";

export default function ServicesPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading indefinitely for now
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000); // 10 seconds, but you can keep it loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage="services" />

      <div className="px-6 py-8">
        {/* Hero section skeleton */}
        <section className="text-center mb-16">
          <div className="animate-pulse">
            <Skeleton className="h-12 w-96 mx-auto mb-6" />
            <div className="space-y-2 mb-8">
              <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
              <Skeleton className="h-6 w-2/3 max-w-3xl mx-auto" />
            </div>
            <Skeleton className="h-12 w-48 mx-auto" />
          </div>
        </section>

        {/* Services grid skeleton */}
        <section className="mb-16">
          <div className="animate-pulse">
            <Skeleton className="h-10 w-48 mx-auto mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
                >
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <Skeleton className="h-8 w-8 mr-3 rounded-full" />
                      <Skeleton className="h-6 w-32" />
                    </div>
                    <Skeleton className="h-4 w-full mb-4" />
                    <div className="space-y-2 mb-6">
                      {Array.from({ length: 4 }).map((_, j) => (
                        <div key={j} className="flex items-center">
                          <Skeleton className="h-4 w-4 mr-2 rounded-full" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-10 w-24 rounded-md" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits section skeleton */}
        <section className="mb-16 bg-white rounded-2xl p-8">
          <div className="animate-pulse">
            <Skeleton className="h-10 w-64 mx-auto mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="text-center">
                  <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
                  <Skeleton className="h-6 w-32 mx-auto mb-2" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4 mx-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section skeleton */}
        <section className="bg-gray-200 rounded-2xl p-8 text-center">
          <div className="animate-pulse">
            <Skeleton className="h-10 w-80 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto mb-8" />
            <div className="flex flex-wrap justify-center gap-4">
              <Skeleton className="h-12 w-32 rounded-md" />
              <Skeleton className="h-12 w-32 rounded-md" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
