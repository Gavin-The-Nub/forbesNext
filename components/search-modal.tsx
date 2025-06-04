"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Car, FileText } from "lucide-react";

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

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  // Mock search data - in real app, this would come from API
  const searchData: SearchResult[] = [
    {
      type: "vehicle",
      title: "BMW M4 Competition",
      category: "Sports",
      url: "/vehicles?search=bmw",
    },
    {
      type: "vehicle",
      title: "Tesla Model S Plaid",
      category: "Electric",
      url: "/vehicles?search=tesla",
    },
    {
      type: "vehicle",
      title: "Porsche 911 Turbo S",
      category: "Sports",
      url: "/vehicles?search=porsche",
    },
    {
      type: "article",
      title: "The Future of Electric Vehicles",
      category: "Electric Vehicles",
      url: "/articles/1",
    },
    {
      type: "article",
      title: "Automotive Excellence Care",
      category: "Maintenance",
      url: "/articles/2",
    },
    { type: "page", title: "Services", category: "Page", url: "/services" },
    { type: "page", title: "About Us", category: "Page", url: "/about" },
    { type: "page", title: "Contact", category: "Page", url: "/contact" },
  ];

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim()) {
      const filtered = searchData.filter(
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
