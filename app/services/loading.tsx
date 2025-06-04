import { FeatureCardSkeleton } from "@/components/loading-skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar skeleton */}
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
        {/* Hero section skeleton */}
        <section className="text-center mb-16">
          <Skeleton className="h-12 w-96 mx-auto mb-6" />
          <div className="space-y-2 mb-8">
            <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
            <Skeleton className="h-6 w-2/3 max-w-3xl mx-auto" />
          </div>
          <Skeleton className="h-12 w-48 mx-auto" />
        </section>

        {/* Services grid skeleton */}
        <section className="mb-16">
          <Skeleton className="h-10 w-48 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Skeleton className="h-48 w-full" />
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Skeleton className="h-8 w-8 mr-3" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="space-y-2 mb-6">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <div key={j} className="flex items-center">
                        <Skeleton className="h-4 w-4 mr-2" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits section skeleton */}
        <section className="mb-16 bg-white rounded-2xl p-8">
          <Skeleton className="h-10 w-64 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <FeatureCardSkeleton key={i} />
            ))}
          </div>
        </section>

        {/* CTA section skeleton */}
        <section className="bg-gray-200 rounded-2xl p-8 text-center animate-pulse">
          <Skeleton className="h-10 w-80 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto mb-8" />
          <div className="flex flex-wrap justify-center gap-4">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-32" />
          </div>
        </section>
      </div>
    </div>
  );
}
