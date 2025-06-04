"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/navbar";

export default function ContactPage() {
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
      <Navbar currentPage="contact" />

      <div className="px-6 py-8">
        {/* Page header skeleton */}
        <div className="mb-8 animate-pulse">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-96" />
        </div>

        {/* Contact methods skeleton */}
        <section className="mb-16">
          <div className="animate-pulse">
            <Skeleton className="h-10 w-64 mx-auto mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* Contact form and info skeleton */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
            {/* Contact form skeleton */}
            <Card>
              <CardContent className="p-8">
                <Skeleton className="h-8 w-48 mb-6" />
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-32 w-full rounded-md" />
                  </div>
                  <Skeleton className="h-12 w-full rounded-md" />
                </div>
              </CardContent>
            </Card>

            {/* Contact info skeleton */}
            <div className="space-y-8">
              <Card>
                <CardContent className="p-8">
                  <Skeleton className="h-8 w-48 mb-6" />
                  <div className="space-y-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <Skeleton className="h-5 w-5 mt-1 rounded-full" />
                        <div className="space-y-1">
                          <Skeleton className="h-4 w-16" />
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-4 w-28" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <Skeleton className="h-6 w-48 mb-4" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="space-y-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex items-center">
                        <Skeleton className="h-2 w-2 rounded-full mr-3" />
                        <Skeleton className="h-3 w-48" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Locations skeleton */}
        <section className="mb-16">
          <div className="animate-pulse">
            <Skeleton className="h-10 w-48 mx-auto mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-48 mb-4" />
                    <div className="space-y-3">
                      {Array.from({ length: 4 }).map((_, j) => (
                        <div key={j} className="flex items-start space-x-3">
                          <Skeleton className="h-4 w-4 mt-1 rounded-full" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      ))}
                    </div>
                    <Skeleton className="h-10 w-full mt-4 rounded-md" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
