"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase-client";
import Navbar from "@/components/navbar";
import Link from "next/link";

interface Article {
  id: number;
  title: string;
  excerpt?: string;
  content?: string;
  category?: string;
  author?: string;
  image?: string;
  featured?: boolean;
  created_at?: string;
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

export default function ArticlePage() {
  const params = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  useEffect(() => {
    const fetchArticle = async () => {
      if (!params.id) return;

      try {
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("id", params.id)
          .single();

        if (error) {
          setError("Article not found");
        } else {
          setArticle(data);
        }
      } catch (err) {
        setError("Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params.id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading article...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !article) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Article Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              {error || "The article you're looking for doesn't exist."}
            </p>
            <Button asChild>
              <Link href="/articles">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Articles
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
        {/* Back Button */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <Button
              variant="ghost"
              asChild
              className="text-gray-600 hover:text-gray-900"
            >
              <Link href="/articles">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Articles
              </Link>
            </Button>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Card className="overflow-hidden">
            {/* Featured Image */}
            {article.image && (
              <div className="relative h-96 w-full">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <CardContent className="p-8">
              {/* Article Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-4 mb-4">
                  {article.category && (
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                        article.category
                      )}`}
                    >
                      {article.category}
                    </span>
                  )}
                  {article.featured && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                      Featured
                    </span>
                  )}
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {article.title}
                </h1>

                {article.excerpt && (
                  <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                    {article.excerpt}
                  </p>
                )}

                <div className="flex items-center space-x-6 text-sm text-gray-500 border-t pt-4">
                  {article.author && (
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>By {article.author}</span>
                    </div>
                  )}
                  {article.created_at && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(article.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  )}
                  {article.content && (
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>
                        {Math.ceil(article.content.split(" ").length / 200)} min
                        read
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Article Content */}
              {article.content && (
                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {article.content}
                  </div>
                </div>
              )}

              {/* Article Footer */}
              <div className="mt-12 pt-8 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      Share this article:
                    </span>
                    <Button variant="outline" size="sm">
                      Share
                    </Button>
                  </div>
                  <Button variant="outline" asChild>
                    <Link href="/articles">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Articles
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
