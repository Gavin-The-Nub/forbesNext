"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  ArrowUpIcon as ArrowForward,
} from "lucide-react";
import Navbar from "@/components/navbar";
import { useState, useEffect } from "react";
import { ArticleCardSkeleton } from "@/components/loading-skeletons";

export default function ArticlePage() {
  const params = useParams();
  const articleId = params.id;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar currentPage="articles" />
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Breadcrumb skeleton */}
          <div className="mb-6">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Article header skeleton */}
          <header className="mb-8">
            <div className="mb-4">
              <div className="h-6 w-32 bg-gray-200 rounded-full animate-pulse" />
            </div>
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse mb-4" />
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse" />
                <div>
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-1" />
                  <div className="flex items-center space-x-4">
                    <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </header>

          {/* Featured image skeleton */}
          <div className="mb-8 rounded-xl overflow-hidden">
            <div className="w-full h-96 bg-gray-200 animate-pulse" />
          </div>

          {/* Article content skeleton */}
          <article className="mb-12">
            <div className="space-y-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-full bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          </article>

          {/* Author bio skeleton */}
          <div className="bg-white rounded-lg p-6 mb-12">
            <div className="flex items-start space-x-4">
              <div className="h-20 w-20 bg-gray-200 rounded-full animate-pulse" />
              <div className="flex-1">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-4 w-full bg-gray-200 rounded animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related articles skeleton */}
          <section>
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <ArticleCardSkeleton key={i} />
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // This would typically come from an API or database
  const article = {
    id: articleId,
    title: "The Future of Electric Vehicles: What to Expect in 2024",
    content: `
      <p>The automotive industry is experiencing a revolutionary transformation as electric vehicles (EVs) continue to gain momentum worldwide. As we look ahead to 2024, several key trends and technological advancements are set to reshape the landscape of electric mobility.</p>
      
      <h2>Battery Technology Breakthroughs</h2>
      <p>One of the most significant developments in the EV space is the advancement in battery technology. Solid-state batteries are moving closer to commercial viability, promising increased energy density, faster charging times, and improved safety. These batteries could potentially offer ranges exceeding 500 miles on a single charge while reducing charging times to under 15 minutes.</p>
      
      <h2>Autonomous Driving Integration</h2>
      <p>Electric vehicles are becoming the preferred platform for autonomous driving technology. The integration of advanced AI systems, LiDAR sensors, and sophisticated software is creating vehicles that can navigate complex traffic scenarios with minimal human intervention.</p>
      
      <h2>Infrastructure Expansion</h2>
      <p>The charging infrastructure is expanding rapidly, with governments and private companies investing billions in fast-charging networks. By 2024, we expect to see ultra-fast charging stations capable of delivering 350kW or more, making long-distance EV travel more convenient than ever.</p>
      
      <h2>Affordability and Accessibility</h2>
      <p>As production scales up and battery costs continue to decline, electric vehicles are becoming more affordable. Several manufacturers are planning to release EVs under $25,000, making electric mobility accessible to a broader range of consumers.</p>
      
      <h2>Environmental Impact</h2>
      <p>The environmental benefits of EVs extend beyond zero tailpipe emissions. Manufacturers are increasingly focusing on sustainable production methods, recycling programs for batteries, and the use of renewable energy in manufacturing facilities.</p>
      
      <h2>Conclusion</h2>
      <p>The future of electric vehicles looks incredibly promising. With continued technological advancement, expanding infrastructure, and growing consumer acceptance, 2024 is poised to be a landmark year for electric mobility. The transition to electric vehicles is not just about changing how we power our cars; it's about reimagining transportation for a sustainable future.</p>
    `,
    date: "May 12, 2023",
    readTime: "5 min read",
    category: "Electric Vehicles",
    categoryColor: "bg-green-100 text-green-800",
    image: "/placeholder.svg?height=400&width=800",
    author: "Sarah Johnson",
    authorBio:
      "Sarah is an automotive journalist with over 10 years of experience covering the electric vehicle industry.",
    authorImage: "/placeholder.svg?height=100&width=100",
  };

  const relatedArticles = [
    {
      id: 2,
      title: "The Art of Preserving Automotive Excellence",
      excerpt:
        "Master the refined techniques of maintaining your prestigious high-performance vehicle...",
      date: "April 28, 2023",
      category: "Maintenance",
      categoryColor: "bg-blue-100 text-blue-800",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Autonomous Driving: The Road to Self-Driving Cars",
      excerpt:
        "Dive deep into the world of autonomous vehicles and understand the technology...",
      date: "February 20, 2023",
      category: "Technology",
      categoryColor: "bg-purple-100 text-purple-800",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      title: "Sustainable Luxury: Eco-Friendly Supercars",
      excerpt:
        "Discover how luxury car manufacturers are embracing sustainability...",
      date: "December 10, 2022",
      category: "Sustainability",
      categoryColor: "bg-green-100 text-green-800",
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar currentPage="articles" />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/articles"
            className="text-blue-600 hover:text-blue-700 flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Articles
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <div className="mb-4">
            <span
              className={`text-sm px-3 py-1 rounded-full ${article.categoryColor}`}
            >
              {article.category}
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Image
                src={article.authorImage || "/placeholder.svg"}
                alt={article.author}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <p className="font-medium">{article.author}</p>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {article.date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {article.readTime}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button size="icon" variant="outline">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-8 rounded-xl overflow-hidden">
          <Image
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            width={800}
            height={400}
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </article>

        {/* Author Bio */}
        <div className="bg-white rounded-lg p-6 mb-12">
          <div className="flex items-start space-x-4">
            <Image
              src={article.authorImage || "/placeholder.svg"}
              alt={article.author}
              width={80}
              height={80}
              className="rounded-full"
            />
            <div>
              <h3 className="text-xl font-bold mb-2">About {article.author}</h3>
              <p className="text-gray-600">{article.authorBio}</p>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <Card
                key={relatedArticle.id}
                className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                onClick={() =>
                  (window.location.href = `/articles/${relatedArticle.id}`)
                }
              >
                <div className="h-40 overflow-hidden">
                  <Image
                    src={relatedArticle.image || "/placeholder.svg"}
                    alt={relatedArticle.title}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardContent className="p-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${relatedArticle.categoryColor} mb-2 inline-block`}
                  >
                    {relatedArticle.category}
                  </span>
                  <h3 className="font-bold mb-2 line-clamp-2">
                    {relatedArticle.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {relatedArticle.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {relatedArticle.date}
                    </span>
                    <ArrowForward className="h-4 w-4 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
