import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function VehicleCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-48 w-full bg-gray-300" />
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-32 bg-gray-300" />
            <Skeleton className="h-4 w-24 bg-gray-300" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-20 bg-gray-300" />
            <Skeleton className="h-4 w-16 bg-gray-300" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4 bg-gray-300" />
              <Skeleton className="h-4 w-16 bg-gray-300" />
            </div>
          ))}
        </div>
        <div className="flex space-x-4">
          <Skeleton className="h-10 flex-1 bg-gray-300" />
          <Skeleton className="h-10 w-10 rounded-full bg-gray-300" />
        </div>
      </CardContent>
    </Card>
  );
}

export function ArticleCardSkeleton({
  featured = false,
}: {
  featured?: boolean;
}) {
  return (
    <Card className="overflow-hidden">
      <Skeleton
        className={`w-full ${featured ? "h-64" : "h-48"} bg-gray-300`}
      />
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-3">
          <Skeleton className="h-4 w-16 bg-gray-300" />
          <Skeleton className="h-4 w-12 bg-gray-300" />
          <Skeleton className="h-5 w-20 rounded-full bg-gray-300" />
        </div>
        <Skeleton className="h-6 w-full mb-3 bg-gray-300" />
        <Skeleton className="h-6 w-3/4 mb-3 bg-gray-300" />
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full bg-gray-300" />
          <Skeleton className="h-4 w-full bg-gray-300" />
          <Skeleton className="h-4 w-2/3 bg-gray-300" />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-24 bg-gray-300" />
          <Skeleton className="h-4 w-4 bg-gray-300" />
        </div>
      </CardContent>
    </Card>
  );
}

export function BrandLogoSkeleton() {
  return (
    <div className="flex items-center justify-center p-4">
      <Skeleton className="h-16 w-24 bg-gray-300" />
    </div>
  );
}

export function FeatureCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4 bg-gray-300" />
        <Skeleton className="h-6 w-32 mx-auto mb-2 bg-gray-300" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full bg-gray-300" />
          <Skeleton className="h-4 w-3/4 mx-auto bg-gray-300" />
        </div>
      </CardContent>
    </Card>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-xl mb-12 h-[600px] mx-6 mt-6">
      <Skeleton className="w-full h-full bg-gray-300" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-12">
        <div className="space-y-4">
          <Skeleton className="h-12 w-96 bg-white/30" />
          <Skeleton className="h-12 w-80 bg-white/30" />
          <Skeleton className="h-6 w-64 bg-white/30" />
          <div className="flex gap-4 mt-8">
            <Skeleton className="h-12 w-32 bg-white/30" />
            <Skeleton className="h-12 w-32 bg-white/30" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PageHeaderSkeleton() {
  return (
    <div className="mb-8">
      <Skeleton className="h-10 w-64 mb-4 bg-gray-300" />
      <Skeleton className="h-6 w-96 bg-gray-300" />
    </div>
  );
}

export function FiltersSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="h-10 w-full bg-gray-300" />
        <Skeleton className="h-10 w-full bg-gray-300" />
      </div>
    </div>
  );
}
