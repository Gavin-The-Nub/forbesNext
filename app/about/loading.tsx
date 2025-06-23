import {
  FeatureCardSkeleton,
  PageHeaderSkeleton,
} from "@/components/loading-skeletons";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      a{/* Navbar skeleton */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
              <div className="w-24 h-6 bg-gray-200 rounded animate-pulse" />
            </div>
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
      <div className="px-6 py-8">
        <PageHeaderSkeleton />

        {/* Stats section skeleton */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="text-center p-6">
                <CardContent className="p-0">
                  <Skeleton className="h-12 w-12 mx-auto mb-4" />
                  <Skeleton className="h-8 w-16 mx-auto mb-2" />
                  <Skeleton className="h-4 w-20 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Story section skeleton */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Skeleton className="h-10 w-32 mb-6" />
              <div className="space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
                <Skeleton className="h-4 w-3/4" />
              </div>
              <Skeleton className="h-12 w-32 mt-6" />
            </div>
            <Skeleton className="h-96 w-full rounded-xl" />
          </div>
        </section>

        {/* Values section skeleton */}
        <section className="mb-16 bg-white rounded-2xl p-8">
          <Skeleton className="h-10 w-32 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <FeatureCardSkeleton key={i} />
            ))}
          </div>
        </section>

        {/* Team section skeleton */}
        <section className="mb-16">
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
        </section>

        {/* Mission section skeleton */}
        <section className="mb-16">
          <div className="bg-gray-200 rounded-2xl p-8 text-center animate-pulse">
            <Skeleton className="h-10 w-32 mx-auto mb-6" />
            <div className="space-y-2 mb-8">
              <Skeleton className="h-6 w-full max-w-4xl mx-auto" />
              <Skeleton className="h-6 w-3/4 max-w-4xl mx-auto" />
            </div>
            <Skeleton className="h-12 w-32 mx-auto" />
          </div>
        </section>

        {/* Awards section skeleton */}
        <section className="text-center">
          <Skeleton className="h-10 w-48 mx-auto mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <Skeleton className="h-12 w-12 mb-2" />
                <Skeleton className="h-4 w-32 mb-1" />
                <Skeleton className="h-3 w-12" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
