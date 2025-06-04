"use client";

import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/navbar";

export default function AboutPage() {
  //const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading indefinitely for now
    const timer = setTimeout(() => {
      //  setIsLoading(false);
    }, 10000); // 10 seconds, but you can keep it loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage="about" />

      <div className="px-6 py-8">
        {/* Page header skeleton */}
        <div className="mb-8 animate-pulse">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-96" />
        </div>

        {/* Stats section skeleton */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-pulse">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="text-center p-6">
                <CardContent className="p-0">
                  <Skeleton className="h-12 w-12 mx-auto mb-4 rounded-full" />
                  <Skeleton className="h-8 w-16 mx-auto mb-2" />
                  <Skeleton className="h-4 w-20 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Story section skeleton */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-pulse">
            <div>
              <Skeleton className="h-10 w-32 mb-6" />
              <div className="space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
                <Skeleton className="h-4 w-3/4" />
              </div>
              <Skeleton className="h-12 w-32 mt-6 rounded-md" />
            </div>
            <Skeleton className="h-96 w-full rounded-xl" />
          </div>
        </section>

        {/* Values section skeleton */}
        <section className="mb-16 bg-white rounded-2xl p-8">
          <div className="animate-pulse">
            <Skeleton className="h-10 w-32 mx-auto mb-12" />
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

        {/* Team section skeleton */}
        <section className="mb-16">
          <div className="animate-pulse">
            <Skeleton className="h-10 w-48 mx-auto mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-64 w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-32 mb-1" />
                    <Skeleton className="h-4 w-24 mb-3" />
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-2/3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission section skeleton */}
        <section className="mb-16">
          <div className="bg-gray-200 rounded-2xl p-8 text-center animate-pulse">
            <Skeleton className="h-10 w-32 mx-auto mb-6" />
            <div className="space-y-2 mb-8">
              <Skeleton className="h-6 w-full max-w-4xl mx-auto" />
              <Skeleton className="h-6 w-3/4 max-w-4xl mx-auto" />
            </div>
            <Skeleton className="h-12 w-32 mx-auto rounded-md" />
          </div>
        </section>

        {/* Awards section skeleton */}
        <section className="text-center">
          <div className="animate-pulse">
            <Skeleton className="h-10 w-48 mx-auto mb-8" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <Skeleton className="h-12 w-12 mb-2 rounded-full" />
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-3 w-12" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
