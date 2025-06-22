import { AlertTriangle } from "lucide-react";
import Navbar from "@/components/navbar";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage="contact" />
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <AlertTriangle className="h-16 w-16 text-yellow-500 mb-6" />
        <h1 className="text-3xl font-bold mb-2">Under Construction</h1>
        <p className="text-gray-600 text-lg mb-4">This page is coming soon.</p>
        <p className="text-gray-400">Please check back later!</p>
      </div>
    </div>
  );
}
