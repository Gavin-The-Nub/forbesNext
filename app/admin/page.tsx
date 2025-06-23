"use client";

import { useEffect, useState } from "react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Zap,
  Timer,
  Upload,
  Fuel,
  LogOut,
  User,
  Shield,
  X,
} from "lucide-react";

import { supabase } from "@/lib/supabase-client";
import AdminLoginPage from "./login/page";

interface Vehicle {
  id: number; // or number, depending on your DB, but uuid is recommended
  name: string;
  type: string;
  category: string;
  price: number;
  image: string;
  badge?: string;
  year: number;
  mileage: number;
  horsepower?: number;
  acceleration?: string;
  mpg?: string;
  drivetrain?: string;
  specs?: {
    icon: string;
    label: string;
  }[];
  created_at?: string;
  updated_at?: string;
  featured?: boolean;
}
interface Article {
  id: number;
  title: string;
  excerpt?: string;
  content?: string;
  category?: string;
  author?: string;
  image?: string;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("vehicles");
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);

  const [session, setSession] = useState<any>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const [editVehicleImage, setEditVehicleImage] = useState<File | null>(null);
  const [editArticleImage, setEditArticleImage] = useState<File | null>(null);

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    console.log(currentSession);
    setSession(currentSession.data.session);
  };

  useEffect(() => {
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setVehicles([]);
      } else {
        setVehicles(data || []);
      }
    };
    fetchVehicles();
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        // handle error (show toast, etc)
        setArticles([]);
      } else {
        setArticles(data || []);
      }
    };
    fetchArticles();
  }, []);

  function getBadgeColor(badge?: string) {
    switch (badge) {
      case "New Arrival":
        return "bg-blue-500/70";
      case "Popular":
        return "bg-orange-500/70";
      case "Limited":
        return "bg-amber-500/70";
      case "Electric":
        return "bg-green-600/70";
      case "Performance":
        return "bg-red-600/70";
      case "Exotic":
        return "bg-purple-600/70";
      case "Luxury":
        return "bg-yellow-500/70";
      case "Off-Road":
        return "bg-lime-600/70";
      default:
        return "bg-gray-400/70";
    }
  }

  const [newVehicle, setNewVehicle] = useState({
    name: "",
    type: "",
    category: "",
    price: "",
    badge: "",
    year: new Date().getFullYear(),
    mileage: 0,
    horsepower: "",
    acceleration: "",
    mpg: "",
    drivetrain: "",
    featured: false,
  });
  const [newArticle, setNewArticle] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    author: "",
    featured: false,
  });
  //for vehicle image storage

  const [vehicleImage, setVehicleImage] = useState<File | null>(null);
  const [articleImage, setArticleImage] = useState<File | null>(null);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    isVehicle: boolean,
    isEditing: boolean = false
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (isVehicle) {
        if (isEditing) {
          setEditVehicleImage(file);
        } else {
          setVehicleImage(file);
        }
      } else {
        if (isEditing) {
          setEditArticleImage(file);
        } else {
          setArticleImage(file);
        }
      }
    }
  };

  const uploadImageAndGetUrl = async (file: File, bucket: string) => {
    const filePath = `${file.name}-${Date.now()}`;

    let { error } = await supabase.storage.from(bucket).upload(filePath, file);

    if (error) {
      alert(`Image upload failed: ${error.message}`);
      return null;
    }

    // Get public URL
    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleAddVehicle = async () => {
    if (!vehicleImage) {
      alert("Please upload a vehicle image.");
      return;
    }

    const uploadedUrl = await uploadImageAndGetUrl(
      vehicleImage,
      "vehicles-images"
    );
    if (!uploadedUrl) return;

    const vehicle = {
      name: newVehicle.name,
      type: newVehicle.type,
      category: newVehicle.category,
      price: Number.parseInt(newVehicle.price) || 0,
      image: uploadedUrl,
      badge: newVehicle.badge,
      year: newVehicle.year,
      mileage: newVehicle.mileage,
      horsepower: Number.parseInt(newVehicle.horsepower) || 0,
      acceleration: newVehicle.acceleration,
      mpg: newVehicle.mpg,
      drivetrain: newVehicle.drivetrain,
      featured: newVehicle.featured,
    };

    // Insert into Supabase
    const { data, error } = await supabase
      .from("vehicles")
      .insert([vehicle])
      .select();
    if (error) {
      alert("Failed to add vehicle: " + error.message);
      return;
    }
    setVehicles([...vehicles, ...(data || [])]);

    // Reset form
    setNewVehicle({
      name: "",
      type: "",
      category: "",
      price: "",
      badge: "",
      year: new Date().getFullYear(),
      mileage: 0,
      horsepower: "",
      acceleration: "",
      mpg: "",
      drivetrain: "",
      featured: false,
    });
    setVehicleImage(null);
    setIsAddingVehicle(false);
  };
  //delete vehicle

  const handleDeleteVehicle = async (id: number) => {
    // Remove from Supabase
    const { error } = await supabase.from("vehicles").delete().eq("id", id);
    if (error) {
      alert("Failed to delete vehicle: " + error.message);
      return;
    }
    // Remove from local state
    setVehicles(vehicles.filter((v) => v.id !== id));
  };

  //edit vehicle
  const handleEditVehicle = async () => {
    if (!editingVehicle) return;

    let imageUrl = editingVehicle.image;
    if (editVehicleImage) {
      const newImageUrl = await uploadImageAndGetUrl(
        editVehicleImage,
        "vehicles-images"
      );
      if (!newImageUrl) return;
      imageUrl = newImageUrl;
    }

    const { data: updatedVehicleData, error } = await supabase
      .from("vehicles")
      .update({
        ...editingVehicle,
        image: imageUrl,
        // convert fields as needed (e.g., price, horsepower)
        price: Number(editingVehicle.price),
        horsepower: Number(editingVehicle.horsepower),
      })
      .eq("id", editingVehicle.id);

    if (error) {
      alert("Failed to update vehicle: " + error.message);
      return;
    }

    // Refetch or update local state
    setVehicles((vehicles) =>
      vehicles.map((v) =>
        v.id === editingVehicle.id ? { ...editingVehicle, image: imageUrl } : v
      )
    );
    setEditingVehicle(null);
    setEditVehicleImage(null);
  };

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

  const handleAddArticle = async () => {
    if (!articleImage) {
      alert("Please upload an article image.");
      return;
    }

    const uploadedUrl = await uploadImageAndGetUrl(
      articleImage,
      "articles-images"
    );
    if (!uploadedUrl) return;

    const article = {
      ...newArticle,
      image: uploadedUrl,
    };

    const { data, error } = await supabase
      .from("articles")
      .insert([article])
      .select();

    if (error) {
      alert("Failed to add article: " + error.message);
      return;
    }
    setArticles([...articles, ...(data || [])]);

    setNewArticle({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      author: "",
      featured: false,
    });
    setArticleImage(null);
    setIsAddingArticle(false);
  };

  const handleDeleteArticle = async (id: number) => {
    // Add a confirmation dialog
    if (!confirm("Are you sure you want to delete this article?")) {
      return;
    }

    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error) {
      alert("Failed to delete article: " + error.message);
      return;
    }
    // Remove from local state for immediate UI update
    setArticles(articles.filter((a) => a.id !== id));
  };

  const handlePublishArticle = (id: number) => {
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

  const handleEditArticle = async () => {
    if (!editingArticle) return;

    let imageUrl = editingArticle.image;
    if (editArticleImage) {
      const newImageUrl = await uploadImageAndGetUrl(
        editArticleImage,
        "articles-images"
      );
      if (!newImageUrl) return; // Stop if upload fails
      imageUrl = newImageUrl;
    }

    // Create a new object for updating, excluding id, created_at, etc.
    const { id, createdAt, ...updateData } = {
      ...editingArticle,
      image: imageUrl,
    };

    const { data: updatedArticleData, error } = await supabase
      .from("articles")
      .update(updateData)
      .eq("id", editingArticle.id)
      .select();

    if (error) {
      alert("Failed to update article: " + error.message);
      return;
    }

    // Update the local state for instant UI feedback
    setArticles(
      articles.map((a) =>
        a.id === editingArticle.id ? updatedArticleData[0] : a
      )
    );

    // Close the dialog and reset states
    setEditingArticle(null);
    setEditArticleImage(null);
  };

  return (
    <>
      {session ? (
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
                  {/* Settings Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="px-2 py-1.5 text-sm font-medium">
                        Signed in as
                      </div>
                      <div className="px-2 py-1.5 text-sm text-gray-500">
                        {session?.user?.email || "admin@forbescapital.com"}
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Shield className="mr-2 h-4 w-4" />
                        <span>Security</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={logout}
                        className="text-red-600 focus:text-red-600"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </header>
          <div className="px-6 py-8">
            {/* 

            {/* Stats Dashboard 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-light text-gray-500">
                        Total Vehicles
                      </p>
                      <p className="text-3xl font-bold">
                        {stats.totalVehicles}
                      </p>
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
                      <p className="text-3xl font-bold">
                        {stats.activeVehicles}
                      </p>
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
                      <p className="text-3xl font-bold">
                        {stats.draftArticles}
                      </p>
                    </div>
                    <Calendar className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div> */}

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
                  <Dialog
                    open={isAddingVehicle}
                    onOpenChange={setIsAddingVehicle}
                  >
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
                              setNewVehicle({
                                ...newVehicle,
                                name: e.target.value,
                              })
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
                              setNewVehicle({
                                ...newVehicle,
                                type: e.target.value,
                              })
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
                              setNewVehicle({
                                ...newVehicle,
                                mpg: e.target.value,
                              })
                            }
                            placeholder="22 MPG"
                          />
                        </div>
                        <div>
                          <Label htmlFor="drivetrain">Drivetrain</Label>
                          <Select
                            value={newVehicle.drivetrain}
                            onValueChange={(value) =>
                              setNewVehicle({
                                ...newVehicle,
                                drivetrain: value,
                              })
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
                          <Select
                            value={newVehicle.badge}
                            onValueChange={(value) =>
                              setNewVehicle({
                                ...newVehicle,
                                badge: value,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select badge" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="New Arrival">
                                New Arrival
                              </SelectItem>
                              <SelectItem value="Popular">Popular</SelectItem>
                              <SelectItem value="Limited">Limited</SelectItem>
                              <SelectItem value="Electric">Electric</SelectItem>
                              <SelectItem value="Performance">
                                Performance
                              </SelectItem>
                              <SelectItem value="Exotic">Exotic</SelectItem>
                              <SelectItem value="Luxury">Luxury</SelectItem>
                              <SelectItem value="Off-Road">Off-Road</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-2 flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="featured-vehicle"
                            checked={newVehicle.featured}
                            onChange={(e) =>
                              setNewVehicle({
                                ...newVehicle,
                                featured: e.target.checked,
                              })
                            }
                            className="rounded"
                          />
                          <Label htmlFor="featured-vehicle">
                            Featured Vehicle
                          </Label>
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor="image">Vehicle Image</Label>
                          <div className="space-y-2">
                            <div className="flex items-center justify-center w-full">
                              <label
                                htmlFor="image-upload"
                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                              >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <Upload className="w-8 h-8 mb-4 text-gray-500" />
                                  <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">
                                      Click to upload
                                    </span>{" "}
                                    or drag and drop
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    PNG, JPG, JPEG (MAX. 5MB)
                                  </p>
                                </div>
                                <input
                                  id="image-upload"
                                  type="file"
                                  className="hidden"
                                  accept="image/*"
                                  onChange={(e) => handleImageUpload(e, true)}
                                />
                              </label>
                            </div>
                            {vehicleImage && (
                              <div className="relative">
                                <Image
                                  src={URL.createObjectURL(vehicleImage)}
                                  alt="Vehicle preview"
                                  className="w-full h-32 object-cover rounded-lg"
                                />
                                <button
                                  type="button"
                                  onClick={() => setVehicleImage(null)}
                                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>
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
                          src={vehicle.image || "/noImg.jpg"}
                          alt={vehicle.name}
                          fill
                          className="object-cover"
                        />
                        {vehicle.featured && (
                          <div className="absolute top-2 left-2 bg-purple-600/70 text-white px-2 py-1 rounded text-xs">
                            Featured
                          </div>
                        )}
                        <div
                          className={`absolute top-2 right-2 ${getBadgeColor(
                            vehicle.badge
                          )} text-white px-2 py-1 rounded text-xs`}
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
                              ₱{vehicle.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs mb-4 font-extralight">
                          <span className="flex items-center gap-1">
                            <Zap className="w-4 h-4 text-gray-400" />
                            {vehicle.horsepower} HP
                          </span>
                          <span className="flex items-center gap-1">
                            <Timer className="w-4 h-4 text-gray-400" />
                            0-60: {vehicle.acceleration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Fuel className="w-4 h-4 text-gray-400" />
                            {vehicle.mpg}
                          </span>
                          <span className="flex items-center gap-1">
                            <Settings className="w-4 h-4 text-gray-400" />
                            {vehicle.drivetrain}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingVehicle(vehicle);
                                setEditVehicleImage(null); // reset file input
                              }}
                            >
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
                  <Dialog
                    open={isAddingArticle}
                    onOpenChange={setIsAddingArticle}
                  >
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
                                setNewArticle({
                                  ...newArticle,
                                  category: value,
                                })
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
                        <div className="col-span-2">
                          <Label htmlFor="image">Featured Image</Label>
                          <div className="space-y-2">
                            <div className="flex items-center justify-center w-full">
                              <label
                                htmlFor="article-image-upload"
                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                              >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <Upload className="w-8 h-8 mb-4 text-gray-500" />
                                  <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">
                                      Click to upload
                                    </span>{" "}
                                    or drag and drop
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    PNG, JPG, JPEG (MAX. 5MB)
                                  </p>
                                </div>
                                <input
                                  id="article-image-upload"
                                  type="file"
                                  className="hidden"
                                  accept="image/*"
                                  onChange={(e) => handleImageUpload(e, false)}
                                />
                              </label>
                            </div>
                            {articleImage && (
                              <div className="relative">
                                <Image
                                  src={URL.createObjectURL(articleImage)}
                                  alt="Article preview"
                                  className="w-full h-32 object-cover rounded-lg"
                                />
                                <button
                                  type="button"
                                  onClick={() => setArticleImage(null)}
                                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>
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
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {article.featured && (
                                  <span className="text-xs px-2 py-1 rounded bg-purple-100 text-purple-800">
                                    Featured
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="font-light"
                                onClick={() => {
                                  setEditingArticle(article);
                                  setEditArticleImage(null); // Reset image on open
                                }}
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
      ) : (
        <AdminLoginPage />
      )}
      <Dialog
        open={!!editingVehicle}
        onOpenChange={() => setEditingVehicle(null)}
      >
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Vehicle</DialogTitle>
          </DialogHeader>
          {editingVehicle && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Vehicle Name</Label>
                <Input
                  id="edit-name"
                  value={editingVehicle.name}
                  onChange={(e) =>
                    setEditingVehicle({
                      ...editingVehicle,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-type">Type</Label>
                <Input
                  id="edit-type"
                  value={editingVehicle.type}
                  onChange={(e) =>
                    setEditingVehicle({
                      ...editingVehicle,
                      type: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={editingVehicle.category}
                  onValueChange={(value) =>
                    setEditingVehicle({ ...editingVehicle, category: value })
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
                <Label htmlFor="edit-price">Price ($)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={editingVehicle.price}
                  onChange={(e) =>
                    setEditingVehicle({
                      ...editingVehicle,
                      price: Number.parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-year">Year</Label>
                <Input
                  id="edit-year"
                  type="number"
                  value={editingVehicle.year}
                  onChange={(e) =>
                    setEditingVehicle({
                      ...editingVehicle,
                      year: Number.parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-horsepower">Horsepower</Label>
                <Input
                  id="edit-horsepower"
                  value={editingVehicle.horsepower}
                  onChange={(e) =>
                    setEditingVehicle({
                      ...editingVehicle,
                      horsepower: Number.parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-acceleration">0-60 mph</Label>
                <Input
                  id="edit-acceleration"
                  value={editingVehicle.acceleration}
                  onChange={(e) =>
                    setEditingVehicle({
                      ...editingVehicle,
                      acceleration: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-mpg">MPG/Range</Label>
                <Input
                  id="edit-mpg"
                  value={editingVehicle.mpg}
                  onChange={(e) =>
                    setEditingVehicle({
                      ...editingVehicle,
                      mpg: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-drivetrain">Drivetrain</Label>
                <Select
                  value={editingVehicle.drivetrain}
                  onValueChange={(value) =>
                    setEditingVehicle({ ...editingVehicle, drivetrain: value })
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
                <Label htmlFor="edit-badge">Badge</Label>
                <Select
                  value={editingVehicle.badge}
                  onValueChange={(value) =>
                    setEditingVehicle({ ...editingVehicle, badge: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select badge" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New Arrival">New Arrival</SelectItem>
                    <SelectItem value="Popular">Popular</SelectItem>
                    <SelectItem value="Limited">Limited</SelectItem>
                    <SelectItem value="Electric">Electric</SelectItem>
                    <SelectItem value="Performance">Performance</SelectItem>
                    <SelectItem value="Exotic">Exotic</SelectItem>
                    <SelectItem value="Luxury">Luxury</SelectItem>
                    <SelectItem value="Off-Road">Off-Road</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label htmlFor="edit-image">Vehicle Image</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="edit-image-upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, JPEG (MAX. 5MB)
                        </p>
                      </div>
                      <input
                        id="edit-image-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setEditVehicleImage(e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                  </div>
                  <div className="relative">
                    <Image
                      src={
                        editVehicleImage
                          ? URL.createObjectURL(editVehicleImage)
                          : editingVehicle.image
                      }
                      alt="Vehicle preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    {editVehicleImage && (
                      <button
                        type="button"
                        onClick={() => setEditVehicleImage(null)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-span-2 flex items-center space-x-2 pt-4">
                <input
                  type="checkbox"
                  id="edit-featured-vehicle"
                  checked={editingVehicle.featured || false}
                  onChange={(e) =>
                    editingVehicle &&
                    setEditingVehicle({
                      ...editingVehicle,
                      featured: e.target.checked,
                    })
                  }
                  className="rounded"
                />
                <Label htmlFor="edit-featured-vehicle">Featured Vehicle</Label>
              </div>
            </div>
          )}
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={() => setEditingVehicle(null)}>
              Cancel
            </Button>
            <Button onClick={handleEditVehicle}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Edit Article Dialog */}
      <Dialog
        open={!!editingArticle}
        onOpenChange={() => setEditingArticle(null)}
      >
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Article</DialogTitle>
          </DialogHeader>
          {editingArticle && (
            <>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={editingArticle.title}
                    onChange={(e) =>
                      setEditingArticle({
                        ...editingArticle,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-excerpt">Excerpt</Label>
                  <Textarea
                    id="edit-excerpt"
                    value={editingArticle.excerpt || ""}
                    onChange={(e) =>
                      setEditingArticle({
                        ...editingArticle,
                        excerpt: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-content">Content</Label>
                  <Textarea
                    id="edit-content"
                    value={editingArticle.content || ""}
                    onChange={(e) =>
                      setEditingArticle({
                        ...editingArticle,
                        content: e.target.value,
                      })
                    }
                    rows={8}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-category">Category</Label>
                    <Select
                      value={editingArticle.category || ""}
                      onValueChange={(value) =>
                        setEditingArticle({
                          ...editingArticle,
                          category: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Electric Vehicles">
                          Electric Vehicles
                        </SelectItem>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                        <SelectItem value="Buying Guide">
                          Buying Guide
                        </SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
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
                    <Label htmlFor="edit-author">Author</Label>
                    <Input
                      id="edit-author"
                      value={editingArticle.author || ""}
                      onChange={(e) =>
                        setEditingArticle({
                          ...editingArticle,
                          author: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="edit-article-image">Featured Image</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="edit-article-image-upload"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-4 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, JPEG (MAX. 5MB)
                          </p>
                        </div>
                        <input
                          id="edit-article-image-upload"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, false, true)}
                        />
                      </label>
                    </div>
                    <div className="relative">
                      <Image
                        src={
                          editArticleImage
                            ? URL.createObjectURL(editArticleImage)
                            : editingArticle.image
                        }
                        alt="Article preview"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      {editArticleImage && (
                        <button
                          type="button"
                          onClick={() => setEditArticleImage(null)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="edit-featured"
                    checked={editingArticle.featured}
                    onChange={(e) =>
                      setEditingArticle({
                        ...editingArticle,
                        featured: e.target.checked,
                      })
                    }
                    className="rounded"
                  />
                  <Label htmlFor="edit-featured">Featured Article</Label>
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setEditingArticle(null)}
                >
                  Cancel
                </Button>
                <Button onClick={handleEditArticle}>Save Changes</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
