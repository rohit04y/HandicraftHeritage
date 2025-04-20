import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { 
  Users, 
  ShoppingBag, 
  Package, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  BarChart3,
  Truck,
  Clock,
  CheckCircle,
  AlertCircle,
  UserCog,
  Plus,
  FileEdit,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { formatPrice } from "@/lib/utils";

// Dashboard Overview Stats
const DashboardStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Revenue
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹12,56,982</div>
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            <TrendingUp className="mr-1 h-3 w-3 text-[var(--color-success)]" />
            <span className="text-[var(--color-success)] font-medium">+18.2%</span> from last month
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Orders
          </CardTitle>
          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">349</div>
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            <TrendingUp className="mr-1 h-3 w-3 text-[var(--color-success)]" />
            <span className="text-[var(--color-success)] font-medium">+5.6%</span> from last month
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Products
          </CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">128</div>
          <p className="text-xs text-muted-foreground mt-1">
            Across 4 craft categories
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Active Artisans
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">27</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-[var(--color-success)] font-medium">+2</span> new this month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

// Recent Orders Table
const RecentOrders = () => {
  const orderStatuses = {
    "pending": <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>,
    "processing": <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Processing</Badge>,
    "shipped": <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">Shipped</Badge>,
    "delivered": <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Delivered</Badge>,
    "cancelled": <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>
  };
  
  const mockOrders = [
    { id: 12345, customer: "Anika Sharma", total: 4250, date: "2023-09-15", status: "delivered" },
    { id: 12346, customer: "Raj Malhotra", total: 3700, date: "2023-09-16", status: "shipped" },
    { id: 12347, customer: "Priya Desai", total: 1850, date: "2023-09-18", status: "processing" },
    { id: 12348, customer: "Vikram Singh", total: 6500, date: "2023-09-19", status: "pending" },
    { id: 12349, customer: "Meera Patel", total: 2950, date: "2023-09-20", status: "cancelled" }
  ];
  
  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Orders</CardTitle>
        <Link href="/admin/orders">
          <Button variant="outline" size="sm">View All</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left font-medium p-2 pl-0">Order ID</th>
                <th className="text-left font-medium p-2">Customer</th>
                <th className="text-left font-medium p-2">Total</th>
                <th className="text-left font-medium p-2">Date</th>
                <th className="text-left font-medium p-2">Status</th>
                <th className="text-right font-medium p-2 pr-0">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="p-2 pl-0">#{order.id}</td>
                  <td className="p-2">{order.customer}</td>
                  <td className="p-2">{formatPrice(order.total)}</td>
                  <td className="p-2">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="p-2">{orderStatuses[order.status as keyof typeof orderStatuses]}</td>
                  <td className="p-2 pr-0 text-right">
                    <Button variant="ghost" size="sm">Details</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

// Low Stock Products
const LowStockProducts = () => {
  const mockProducts = [
    { id: 1, name: "Dokra Horse Figurine", stock: 2, category: "Dokra" },
    { id: 2, name: "Kantha Embroidered Wall Hanging", stock: 3, category: "Kantha" },
    { id: 3, name: "Terracotta Decorative Pot", stock: 1, category: "Terracotta" },
    { id: 4, name: "Shitalpati Floor Mat", stock: 4, category: "Shitalpati" }
  ];
  
  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Low Stock Products</CardTitle>
        <Badge variant="outline" className="bg-[var(--color-error)]/10 text-[var(--color-error)] hover:bg-[var(--color-error)]/10">
          Attention Needed
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockProducts.map((product) => (
            <div key={product.id} className="flex items-center justify-between border-b pb-3">
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-muted-foreground">{product.category}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={product.stock <= 2 ? "destructive" : "outline"} className="whitespace-nowrap">
                  {product.stock} left in stock
                </Badge>
                <Button size="sm" variant="outline">Restock</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Monthly Revenue Chart (simple static version)
const RevenueChart = () => {
  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Monthly Revenue</CardTitle>
        <Select defaultValue="6mo">
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1mo">Last month</SelectItem>
            <SelectItem value="3mo">Last 3 months</SelectItem>
            <SelectItem value="6mo">Last 6 months</SelectItem>
            <SelectItem value="1yr">Last year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex flex-col items-center justify-center">
          <BarChart3 className="h-32 w-32 text-muted-foreground/50" />
          <div className="text-center mt-4">
            <p className="text-muted-foreground">Revenue chart visualization</p>
            <p className="text-sm text-muted-foreground mt-1">
              Chart would display monthly revenue trends
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Order Fulfillment Stats
const OrderFulfillment = () => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Order Fulfillment Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-[var(--color-beige)] p-4 rounded-lg flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-full">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">12</div>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
          
          <div className="bg-[var(--color-beige)] p-4 rounded-lg flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">8</div>
              <p className="text-sm text-muted-foreground">Processing</p>
            </div>
          </div>
          
          <div className="bg-[var(--color-beige)] p-4 rounded-lg flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-full">
              <Truck className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">15</div>
              <p className="text-sm text-muted-foreground">Shipped</p>
            </div>
          </div>
          
          <div className="bg-[var(--color-beige)] p-4 rounded-lg flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-full">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">287</div>
              <p className="text-sm text-muted-foreground">Delivered</p>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Average Fulfillment Time</p>
              <p className="text-sm text-muted-foreground">From order to delivery</p>
            </div>
            <div className="text-2xl font-bold flex items-center">
              3.2 <span className="text-sm font-normal text-muted-foreground ml-1">days</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Product Management Tab
const ProductManagement = () => {
  const [searchProduct, setSearchProduct] = useState("");
  
  // Mock products data
  const { data: products, isLoading } = useQuery({
    queryKey: ['/api/products'],
  });
  
  const filteredProducts = products ? products.filter((product: any) => 
    product.name.toLowerCase().includes(searchProduct.toLowerCase())
  ) : [];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="flex-1 max-w-md">
          <Input 
            placeholder="Search products..."
            value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
          />
        </div>
        <Button className="bg-[var(--color-terracotta)] hover:bg-[var(--color-terracotta)]/90">
          <Plus className="h-4 w-4 mr-2" />
          Add New Product
        </Button>
      </div>
      
      <div className="bg-white rounded-md shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 font-medium">Product Name</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {isLoading ? (
                Array(5).fill(0).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-4 py-3"><div className="h-5 bg-gray-200 rounded w-40"></div></td>
                    <td className="px-4 py-3"><div className="h-5 bg-gray-200 rounded w-20"></div></td>
                    <td className="px-4 py-3"><div className="h-5 bg-gray-200 rounded w-16"></div></td>
                    <td className="px-4 py-3"><div className="h-5 bg-gray-200 rounded w-10"></div></td>
                    <td className="px-4 py-3"><div className="h-5 bg-gray-200 rounded w-20"></div></td>
                    <td className="px-4 py-3 text-right"><div className="h-5 bg-gray-200 rounded w-20 ml-auto"></div></td>
                  </tr>
                ))
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product: any) => (
                  <tr key={product.id}>
                    <td className="px-4 py-3 font-medium">{product.name}</td>
                    <td className="px-4 py-3">{
                      product.category_id === 1 ? "Dokra" :
                      product.category_id === 2 ? "Kantha" :
                      product.category_id === 3 ? "Terracotta" : "Shitalpati"
                    }</td>
                    <td className="px-4 py-3">{formatPrice(product.price)}</td>
                    <td className="px-4 py-3">{product.stock}</td>
                    <td className="px-4 py-3">
                      {product.stock > 0 ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">In Stock</Badge>
                      ) : (
                        <Badge variant="destructive">Out of Stock</Badge>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-[var(--color-error)]">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-5 text-center text-muted-foreground">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// User Management Tab
const UserManagement = () => {
  const [searchUser, setSearchUser] = useState("");
  
  // Mock users data
  const { data: users, isLoading } = useQuery({
    queryKey: ['/api/artisans'],
  });
  
  const filteredUsers = users ? users.filter((user: any) => 
    user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
    user.email.toLowerCase().includes(searchUser.toLowerCase())
  ) : [];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="flex-1 max-w-md">
          <Input 
            placeholder="Search users..."
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />
        </div>
        <Button className="bg-[var(--color-terracotta)] hover:bg-[var(--color-terracotta)]/90">
          <Plus className="h-4 w-4 mr-2" />
          Add New User
        </Button>
      </div>
      
      <div className="bg-white rounded-md shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Craft</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {isLoading ? (
                Array(5).fill(0).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-4 py-3"><div className="h-5 bg-gray-200 rounded w-32"></div></td>
                    <td className="px-4 py-3"><div className="h-5 bg-gray-200 rounded w-40"></div></td>
                    <td className="px-4 py-3"><div className="h-5 bg-gray-200 rounded w-16"></div></td>
                    <td className="px-4 py-3"><div className="h-5 bg-gray-200 rounded w-20"></div></td>
                    <td className="px-4 py-3"><div className="h-5 bg-gray-200 rounded w-24"></div></td>
                    <td className="px-4 py-3 text-right"><div className="h-5 bg-gray-200 rounded w-20 ml-auto"></div></td>
                  </tr>
                ))
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user: any) => (
                  <tr key={user.id}>
                    <td className="px-4 py-3 font-medium">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">
                      <Badge className={user.role === 'artisan' ? 
                        'bg-blue-100 text-blue-800 hover:bg-blue-100' : 
                        'bg-purple-100 text-purple-800 hover:bg-purple-100'
                      }>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">{user.craft_specialty || "-"}</td>
                    <td className="px-4 py-3">{user.location || "-"}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <UserCog className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-[var(--color-error)]">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-5 text-center text-muted-foreground">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 font-['Cormorant_Garamond']">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your products, orders, and users</p>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <DashboardStats />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <RecentOrders />
            <OrderFulfillment />
            <LowStockProducts />
            <RevenueChart />
          </div>
        </TabsContent>
        
        <TabsContent value="products">
          <ProductManagement />
        </TabsContent>
        
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
