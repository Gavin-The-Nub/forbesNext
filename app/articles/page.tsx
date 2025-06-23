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
import { supabase } from "@/lib/supabase-client";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  image: string;
  featured: boolean;
  created_at: string;
}

function getCategoryColor(category: string) {
  switch (category) {
    case "Electric Vehicles":
      return "bg-green-100 text-green-800";
    case "Maintenance":
      return "bg-blue-100 text-blue-800";
    case "Buying Guide":
      return "bg-amber-100 text-amber-800";
    case "Technology":
      return "bg-purple-100 text-purple-800";
    case "Market Analysis":
      return "bg-red-100 text-red-800";
    case "Sustainability":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default function ArticlesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching articles:", error);
        setArticles([]);
      } else {
        setArticles(data || []);
      }
      setIsLoading(false);
    };
    fetchArticles();
  }, []);

  // Memoize filtered articles to improve performance
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        searchQuery === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        article.category.toLowerCase().replace(/ /g, "-") === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, articles]);

  // Memoize featured and regular articles
  const { featuredArticles, regularArticles } = useMemo(() => {
    const featured = filteredArticles.filter((article) => article.featured);
    const regular = filteredArticles.filter((article) => !article.featured);
    return { featuredArticles: featured, regularArticles: regular };
  }, [filteredArticles]);

  // Calculate read time based on content length
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(" ").length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime;
  };

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
                        {new Date(article.created_at).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1 font-extralight">
                        <Clock className="h-3 w-3" />
                        {calculateReadTime(article.excerpt)} min read
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full ${getCategoryColor(
                          article.category
                        )}`}
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
                      {new Date(article.created_at).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1 font-extralight">
                      <Clock className="h-3 w-3" />
                      {calculateReadTime(article.excerpt)} min read
                    </span>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(
                      article.category
                    )} mb-3 inline-block`}
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
