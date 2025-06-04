"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
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
import { Calendar, Clock, ArrowUpIcon as ArrowForward } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/navbar";
import {
  ArticleCardSkeleton,
  PageHeaderSkeleton,
  FiltersSkeleton,
} from "@/components/loading-skeletons";

// Move articles data outside component to prevent recreation on each render
const ARTICLES_DATA = [
  {
    id: 1,
    title: "The Future of Electric Vehicles: What to Expect in 2024",
    excerpt:
      "Explore the upcoming trends and technological advancements in the electric vehicle market that are set to revolutionize the automotive industry.",
    date: "May 12, 2023",
    readTime: "5 min read",
    category: "Electric Vehicles",
    categoryKey: "electric-vehicles",
    categoryColor: "bg-green-100 text-green-800",
    image: "/a1.avif",
    author: "Sarah Johnson",
    featured: true,
  },
  {
    id: 2,
    title: "The Art of Preserving Automotive Excellence",
    excerpt:
      "Master the refined techniques of maintaining your prestigious high-performance vehicle to ensure sublime performance and enduring elegance.",
    date: "April 28, 2023",
    readTime: "8 min read",
    category: "Maintenance",
    categoryKey: "maintenance",
    categoryColor: "bg-blue-100 text-blue-800",
    image: "/a2.avif",
    author: "Michael Chen",
    featured: true,
  },
  {
    id: 3,
    title: "The Connoisseur's Guide to Luxury Automobiles",
    excerpt:
      "Make an informed decision when purchasing your next luxury vehicle with this comprehensive guide covering everything from financing to features.",
    date: "March 15, 2023",
    readTime: "12 min read",
    category: "Buying Guide",
    categoryKey: "buying-guide",
    categoryColor: "bg-amber-100 text-amber-800",
    image: "/a3.avif",
    author: "David Rodriguez",
    featured: false,
  },
  {
    id: 4,
    title: "Autonomous Driving: The Road to Self-Driving Cars",
    excerpt:
      "Dive deep into the world of autonomous vehicles and understand the technology that's shaping the future of transportation.",
    date: "February 20, 2023",
    readTime: "10 min read",
    category: "Technology",
    categoryKey: "technology",
    categoryColor: "bg-purple-100 text-purple-800",
    image: "/f2.webp",
    author: "Emily Watson",
    featured: false,
  },
  {
    id: 5,
    title: "Luxury Car Market Trends: What's Hot in 2024",
    excerpt:
      "Analyze the latest trends in the luxury automotive market, from emerging brands to shifting consumer preferences.",
    date: "January 18, 2023",
    readTime: "7 min read",
    category: "Market Analysis",
    categoryKey: "market-analysis",
    categoryColor: "bg-red-100 text-red-800",
    image: "/f1.webp",
    author: "Robert Kim",
    featured: false,
  },
  {
    id: 6,
    title: "Sustainable Luxury: Eco-Friendly Supercars",
    excerpt:
      "Discover how luxury car manufacturers are embracing sustainability without compromising on performance.",
    date: "December 10, 2022",
    readTime: "6 min read",
    category: "Sustainability",
    categoryKey: "sustainability",
    categoryColor: "bg-green-100 text-green-800",
    image: "/f4.avif",
    author: "Lisa Thompson",
    featured: false,
  },
];

export default function ArticlesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200); // 1 second loading simulation

    return () => clearTimeout(timer);
  }, []);

  // Memoize filtered articles to improve performance
  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((article) => {
      const matchesSearch =
        searchQuery === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || article.categoryKey === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Memoize featured and regular articles
  const { featuredArticles, regularArticles } = useMemo(() => {
    const featured = filteredArticles.filter((article) => article.featured);
    const regular = filteredArticles.filter((article) => !article.featured);
    return { featuredArticles: featured, regularArticles: regular };
  }, [filteredArticles]);

  const handleArticleClick = (articleId: number) => {
    router.push(`/articles/${articleId}`);
  };

  // Show loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar currentPage="articles" />
        <div className="max-w-7xl mx-auto px-6 py-8">
          <PageHeaderSkeleton />
          <FiltersSkeleton />

          {/* Featured Articles Skeleton */}
          <section className="mb-12">
            <div className="w-48 h-8 bg-gray-200 rounded animate-pulse mb-6" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {Array.from({ length: 2 }).map((_, i) => (
                <ArticleCardSkeleton key={i} featured />
              ))}
            </div>
          </section>

          {/* Regular Articles Skeleton */}
          <section>
            <div className="w-40 h-8 bg-gray-200 rounded animate-pulse mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <ArticleCardSkeleton key={i} />
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage="articles" />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-extralight mb-4">Automotive Insights</h1>
          <p className="font-extralight text-sm">
            Stay informed with the latest trends, tips, and insights from the
            automotive world
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="font-extralight"
            />
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="font-extralight">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="font-extralight">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electric-vehicles">
                  Electric Vehicles
                </SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="buying-guide">Buying Guide</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="market-analysis">Market Analysis</SelectItem>
                <SelectItem value="sustainability">Sustainability</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="mb-12">
            <h2 className="text-lg font-extralight mb-6">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <Card
                  key={article.id}
                  className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => handleArticleClick(article.id)}
                >
                  <div className="h-64 overflow-hidden">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1 font-extralight">
                        <Calendar className="h-3 w-3" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1 font-extralight">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full ${article.categoryColor}`}
                      >
                        {article.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-extralight mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm font-extralight">
                      {article.excerpt}
                    </p>
                    <div className="flex justify-between items-center ">
                      <span className="text-sm font-extralight">
                        By {article.author}
                      </span>
                      <ArrowForward className="h-4 w-4 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Regular Articles */}
        <section>
          <h2 className="text-lg font-extralight mb-6">
            {featuredArticles.length > 0 ? "More Articles" : "All Articles"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article) => (
              <Card
                key={article.id}
                className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => handleArticleClick(article.id)}
              >
                <div className="h-48 overflow-hidden">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1 font-extralight">
                      <Calendar className="h-3 w-3 " />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1 font-extralight">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${article.categoryColor} mb-3 inline-block`}
                  >
                    {article.category}
                  </span>
                  <h3 className="text-lg font-extralight mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm font-extralight">
                    {article.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 font-extralight">
                      By {article.author}
                    </span>
                    <ArrowForward className="h-4 w-4 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No articles found matching your criteria.
            </p>
            <Button
              className="mt-4"
              onClick={() => {
                setSelectedCategory("all");
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
