"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Car, FileText } from "lucide-react";
import { supabase } from "@/lib/supabase-client";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}
type SearchResult = {
  type: "vehicle" | "article" | "page";
  title: string;
  category: string;
  url: string;
};
type Vehicle = { id: number; name: string; category: string };
type Article = { id: number; title: string; category: string };

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [allData, setAllData] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    const fetchData = async () => {
      // Fetch vehicles
      const { data: vehicles } = await supabase.from("vehicles").select("*");
      // Fetch articles
      const { data: articles } = await supabase.from("articles").select("*");
      // Combine and map to SearchResult format
      const vehicleResults = ((vehicles as Vehicle[]) || []).map((v) => ({
        type: "vehicle" as const,
        title: v.name,
        category: v.category,
        url: `/vehicles/${v.id}`,
      }));
      const articleResults = ((articles as Article[]) || []).map((a) => ({
        type: "article" as const,
        title: a.title,
        category: a.category,
        url: `/articles/${a.id}`,
      }));
      // Add static pages
      const pageResults = [
        {
          type: "page" as const,
          title: "Services",
          category: "Page",
          url: "/services",
        },
        {
          type: "page" as const,
          title: "About Us",
          category: "Page",
          url: "/about",
        },
        {
          type: "page" as const,
          title: "Contact",
          category: "Page",
          url: "/contact",
        },
      ];
      setAllData([...vehicleResults, ...articleResults, ...pageResults]);
    };
    fetchData();
  }, [isOpen]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim()) {
      const filtered = allData.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  const handleResultClick = (url: string) => {
    router.push(url);
    onClose();
    setQuery("");
    setResults([]);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "vehicle":
        return <Car className="h-4 w-4" />;
      case "article":
        return <FileText className="h-4 w-4" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span className="font-extralight text-lg">
              Search Forbes Capital Cars
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search vehicles, articles, or pages..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 font-extralight"
              autoFocus
            />
          </div>

          {results.length > 0 && (
            <div className="max-h-96 overflow-y-auto space-y-2">
              <p className="text-sm px-2 font-extralight">
                {results.length} result{results.length !== 1 ? "s" : ""} found
              </p>
              {results.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleResultClick(result.url)}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3"
                >
                  <div className="text-blue-600">{getIcon(result.type)}</div>
                  <div className="flex-1">
                    <p className="font-light text-sm">{result.title}</p>
                    <p className="text-xs font-extralight">{result.category}</p>
                  </div>
                  <div className="text-xs font-extralight capitalize">
                    {result.type}
                  </div>
                </button>
              ))}
            </div>
          )}

          {query && results.length === 0 && (
            <div className="text-center py-8 text-gray-700 font-extralight">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No results found for &quot;{query}&quot;</p>

              <p className="text-sm">
                Try searching for vehicles, articles, or services
              </p>
            </div>
          )}

          {!query && (
            <div className="text-center py-8 text-gray-800 font-extralight">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Start typing to search...</p>
              <p className="text-sm">
                Search for vehicles, articles, services, and more
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
