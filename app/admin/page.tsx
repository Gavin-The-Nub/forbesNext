"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Car,
  Plus,
  Edit,
  Trash2,
  Save,
  FileText,
  BarChart3,
  Settings,
  Eye,
  Calendar,
} from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("vehicles");
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  // const [editingVehicle, setEditingVehicle] = useState(null);
  //const [editingArticle, setEditingArticle] = useState(null);

  // Sample data - in a real app, this would come from a database
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      name: "BMW M4 Competition",
      type: "Sports Coupe",
      category: "sports",
      price: 84995,
      monthlyPayment: "$1,199/mo",
      image: "/f4.avif",
      badge: "New Arrival",
      badgeColor: "bg-blue-500/70",
      year: 2024,
      mileage: 0,
      horsepower: 503,
      acceleration: "3.8s",
      mpg: 22,
      drivetrain: "RWD",
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Tesla Model S Plaid",
      type: "Electric Sedan",
      category: "electric",
      price: 129990,
      monthlyPayment: "$1,699/mo",
      image: "/f5.avif",
      badge: "Electric",
      badgeColor: "bg-green-500/70",
      year: 2024,
      mileage: 0,
      horsepower: 1020,
      acceleration: "1.99s",
      mpg: "396 mi Range",
      drivetrain: "AWD",
      status: "active",
      createdAt: "2024-01-10",
    },
  ]);

  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "The Future of Electric Vehicles: What to Expect in 2024",
      excerpt:
        "Explore the upcoming trends and technological advancements in the electric vehicle market...",
      content: "Full article content here...",
      category: "Electric Vehicles",
      author: "Sarah Johnson",
      image: "/a2.avif",
      status: "published",
      featured: true,
      createdAt: "2024-01-12",
      publishedAt: "2024-01-15",
    },
    {
      id: 2,
      title: "The Art of Preserving Automotive Excellence",
      excerpt:
        "Master the refined techniques of maintaining your prestigious high-performance vehicle...",
      content: "Full article content here...",
      category: "Maintenance",
      author: "Michael Chen",
      image: "/a1.avif",
      status: "draft",
      featured: false,
      createdAt: "2024-01-08",
      publishedAt: null,
    },
  ]);

  const [newVehicle, setNewVehicle] = useState({
    name: "",
    type: "",
    category: "",
    price: "",
    monthlyPayment: "",
    image: "",
    badge: "",
    badgeColor: "bg-blue-500",
    year: new Date().getFullYear(),
    mileage: 0,
    horsepower: "",
    acceleration: "",
    mpg: "",
    drivetrain: "",
  });

  const [newArticle, setNewArticle] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    author: "",
    image: "",
    featured: false,
  });

  const handleAddVehicle = () => {
    const vehicle = {
      ...newVehicle,
      id: vehicles.length + 1,
      price: Number.parseInt(newVehicle.price),
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setVehicles([...vehicles, vehicle]);
    setNewVehicle({
      name: "",
      type: "",
      category: "",
      price: "",
      monthlyPayment: "",
      image: "",
      badge: "",
      badgeColor: "bg-blue-500",
      year: new Date().getFullYear(),
      mileage: 0,
      horsepower: "",
      acceleration: "",
      mpg: "",
      drivetrain: "",
    });
    setIsAddingVehicle(false);
  };

  const handleAddArticle = () => {
    const article = {
      ...newArticle,
      id: articles.length + 1,
      status: "draft",
      createdAt: new Date().toISOString().split("T")[0],
      publishedAt: null,
    };
    setArticles([...articles, article]);
    setNewArticle({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      author: "",
      image: "",
      featured: false,
    });
    setIsAddingArticle(false);
  };

  const handleDeleteVehicle = (id) => {
    setVehicles(vehicles.filter((v) => v.id !== id));
  };

  const handleDeleteArticle = (id) => {
    setArticles(articles.filter((a) => a.id !== id));
  };

  const handlePublishArticle = (id) => {
    setArticles(
      articles.map((a) =>
        a.id === id
          ? {
              ...a,
              status: "published",
              publishedAt: new Date().toISOString().split("T")[0],
            }
          : a
      )
    );
  };

  const stats = {
    totalVehicles: vehicles.length,
    activeVehicles: vehicles.filter((v) => v.status === "active").length,
    totalArticles: articles.length,
    publishedArticles: articles.filter((a) => a.status === "published").length,
    draftArticles: articles.filter((a) => a.status === "draft").length,
    featuredArticles: articles.filter((a) => a.featured).length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo.png"
                alt="Forbes Capital Cars Logo"
                width={250} // adjust size as needed
                height={40}
                className="object-contain"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <a
                  href="/"
                  target="_blank"
                  className="flex items-center space-x-2"
                  rel="noreferrer"
                >
                  <Eye className="h-4 w-4 " />
                  <span className="font-light">View Site</span>
                </a>
              </Button>
              <Button variant="outline" className="font-light">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-8">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-light text-gray-500">
                    Total Vehicles
                  </p>
                  <p className="text-3xl font-bold">{stats.totalVehicles}</p>
                </div>
                <Car className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-light text-gray-500">
                    Active Vehicles
                  </p>
                  <p className="text-3xl font-bold">{stats.activeVehicles}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-light text-gray-500">
                    Published Articles
                  </p>
                  <p className="text-3xl font-bold">
                    {stats.publishedArticles}
                  </p>
                </div>
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-light text-gray-500">
                    Draft Articles
                  </p>
                  <p className="text-3xl font-bold">{stats.draftArticles}</p>
                </div>
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="vehicles" className="font-extralight">
              Vehicles Management
            </TabsTrigger>
            <TabsTrigger value="articles" className="font-extralight">
              Articles Management
            </TabsTrigger>
          </TabsList>

          {/* Vehicles Tab */}
          <TabsContent value="vehicles" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-light">Vehicles</h2>
              <Dialog open={isAddingVehicle} onOpenChange={setIsAddingVehicle}>
                <DialogTrigger asChild>
                  <Button className="font-light">
                    <Plus className="h-4 w-4 mr-2 " />
                    Add Vehicle
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Vehicle</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Vehicle Name</Label>
                      <Input
                        id="name"
                        value={newVehicle.name}
                        onChange={(e) =>
                          setNewVehicle({ ...newVehicle, name: e.target.value })
                        }
                        placeholder="BMW M4 Competition"
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Input
                        id="type"
                        value={newVehicle.type}
                        onChange={(e) =>
                          setNewVehicle({ ...newVehicle, type: e.target.value })
                        }
                        placeholder="Sports Coupe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newVehicle.category}
                        onValueChange={(value) =>
                          setNewVehicle({ ...newVehicle, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedans">Sedans</SelectItem>
                          <SelectItem value="sports">Sports</SelectItem>
                          <SelectItem value="suvs">SUVs</SelectItem>
                          <SelectItem value="electric">Electric</SelectItem>
                          <SelectItem value="trucks">Trucks</SelectItem>
                          <SelectItem value="classics">Classics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="price">Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newVehicle.price}
                        onChange={(e) =>
                          setNewVehicle({
                            ...newVehicle,
                            price: e.target.value,
                          })
                        }
                        placeholder="84995"
                      />
                    </div>
                    <div>
                      <Label htmlFor="monthlyPayment">Monthly Payment</Label>
                      <Input
                        id="monthlyPayment"
                        value={newVehicle.monthlyPayment}
                        onChange={(e) =>
                          setNewVehicle({
                            ...newVehicle,
                            monthlyPayment: e.target.value,
                          })
                        }
                        placeholder="$1,199/mo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="year">Year</Label>
                      <Input
                        id="year"
                        type="number"
                        value={newVehicle.year}
                        onChange={(e) =>
                          setNewVehicle({
                            ...newVehicle,
                            year: Number.parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="horsepower">Horsepower</Label>
                      <Input
                        id="horsepower"
                        value={newVehicle.horsepower}
                        onChange={(e) =>
                          setNewVehicle({
                            ...newVehicle,
                            horsepower: e.target.value,
                          })
                        }
                        placeholder="503"
                      />
                    </div>
                    <div>
                      <Label htmlFor="acceleration">0-60 mph</Label>
                      <Input
                        id="acceleration"
                        value={newVehicle.acceleration}
                        onChange={(e) =>
                          setNewVehicle({
                            ...newVehicle,
                            acceleration: e.target.value,
                          })
                        }
                        placeholder="3.8s"
                      />
                    </div>
                    <div>
                      <Label htmlFor="mpg">MPG/Range</Label>
                      <Input
                        id="mpg"
                        value={newVehicle.mpg}
                        onChange={(e) =>
                          setNewVehicle({ ...newVehicle, mpg: e.target.value })
                        }
                        placeholder="22 MPG"
                      />
                    </div>
                    <div>
                      <Label htmlFor="drivetrain">Drivetrain</Label>
                      <Select
                        value={newVehicle.drivetrain}
                        onValueChange={(value) =>
                          setNewVehicle({ ...newVehicle, drivetrain: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select drivetrain" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="RWD">RWD</SelectItem>
                          <SelectItem value="FWD">FWD</SelectItem>
                          <SelectItem value="AWD">AWD</SelectItem>
                          <SelectItem value="4WD">4WD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="badge">Badge</Label>
                      <Input
                        id="badge"
                        value={newVehicle.badge}
                        onChange={(e) =>
                          setNewVehicle({
                            ...newVehicle,
                            badge: e.target.value,
                          })
                        }
                        placeholder="New Arrival"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="image">Image URL</Label>
                      <Input
                        id="image"
                        value={newVehicle.image}
                        onChange={(e) =>
                          setNewVehicle({
                            ...newVehicle,
                            image: e.target.value,
                          })
                        }
                        placeholder="/placeholder.svg?height=300&width=400"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddingVehicle(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAddVehicle}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Vehicle
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <Card key={vehicle.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={vehicle.image || "/placeholder.svg"}
                      alt={vehicle.name}
                      fill
                      className="object-cover"
                    />
                    <div
                      className={`absolute top-2 right-2 ${vehicle.badgeColor} text-white px-2 py-1 rounded text-xs`}
                    >
                      {vehicle.badge}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-light">{vehicle.name}</h3>
                        <p className="text-sm text-gray-700 font-extralight">
                          {vehicle.type}
                        </p>
                        <p className="text-xs text-gray-500 font-extralight">
                          {vehicle.year} • {vehicle.category}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">
                          ${vehicle.price.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {vehicle.monthlyPayment}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs mb-4 font-extralight">
                      <span>{vehicle.horsepower} HP</span>
                      <span>0-60: {vehicle.acceleration}</span>
                      <span>{vehicle.mpg}</span>
                      <span>{vehicle.drivetrain}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-xs px-2 py-1 rounded font-extralight ${
                          vehicle.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {vehicle.status}
                      </span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteVehicle(vehicle.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Articles Tab */}
          <TabsContent value="articles" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-light">Articles</h2>
              <Dialog open={isAddingArticle} onOpenChange={setIsAddingArticle}>
                <DialogTrigger asChild>
                  <Button className="font-light">
                    <Plus className="h-4 w-4 mr-2 fone" />
                    Add Article
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Article</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newArticle.title}
                        onChange={(e) =>
                          setNewArticle({
                            ...newArticle,
                            title: e.target.value,
                          })
                        }
                        placeholder="Article title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        value={newArticle.excerpt}
                        onChange={(e) =>
                          setNewArticle({
                            ...newArticle,
                            excerpt: e.target.value,
                          })
                        }
                        placeholder="Brief description of the article"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        value={newArticle.content}
                        onChange={(e) =>
                          setNewArticle({
                            ...newArticle,
                            content: e.target.value,
                          })
                        }
                        placeholder="Full article content"
                        rows={8}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={newArticle.category}
                          onValueChange={(value) =>
                            setNewArticle({ ...newArticle, category: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Electric Vehicles">
                              Electric Vehicles
                            </SelectItem>
                            <SelectItem value="Maintenance">
                              Maintenance
                            </SelectItem>
                            <SelectItem value="Buying Guide">
                              Buying Guide
                            </SelectItem>
                            <SelectItem value="Technology">
                              Technology
                            </SelectItem>
                            <SelectItem value="Market Analysis">
                              Market Analysis
                            </SelectItem>
                            <SelectItem value="Sustainability">
                              Sustainability
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="author">Author</Label>
                        <Input
                          id="author"
                          value={newArticle.author}
                          onChange={(e) =>
                            setNewArticle({
                              ...newArticle,
                              author: e.target.value,
                            })
                          }
                          placeholder="Author name"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="image">Featured Image URL</Label>
                      <Input
                        id="image"
                        value={newArticle.image}
                        onChange={(e) =>
                          setNewArticle({
                            ...newArticle,
                            image: e.target.value,
                          })
                        }
                        placeholder="/placeholder.svg?height=400&width=600"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={newArticle.featured}
                        onChange={(e) =>
                          setNewArticle({
                            ...newArticle,
                            featured: e.target.checked,
                          })
                        }
                        className="rounded"
                      />
                      <Label htmlFor="featured">Featured Article</Label>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddingArticle(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAddArticle}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Article
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {articles.map((article) => (
                <Card key={article.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-24 h-16 relative flex-shrink-0">
                        <Image
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-normal text-lg">
                              {article.title}
                            </h3>
                            <p className="text-sm font-extralight mb-2">
                              {article.excerpt}
                            </p>
                            <div className="flex items-center space-x-4 text-xs font-extralight text-gray-800">
                              <span>By {article.author}</span>
                              <span>{article.category}</span>
                              <span>Created: {article.createdAt}</span>
                              {article.publishedAt && (
                                <span>Published: {article.publishedAt}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`text-xs px-2 py-1 rounded ${
                                article.status === "published"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {article.status}
                            </span>
                            {article.featured && (
                              <span className="text-xs px-2 py-1 rounded bg-purple-100 text-purple-800">
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          {article.status === "draft" && (
                            <Button
                              size="sm"
                              className="font-light"
                              onClick={() => handlePublishArticle(article.id)}
                            >
                              Publish
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="font-light"
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="font-light"
                            onClick={() => handleDeleteArticle(article.id)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
