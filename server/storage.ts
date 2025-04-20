import { 
  users, type User, type InsertUser, 
  categories, type Category, type InsertCategory,
  products, type Product, type InsertProduct,
  orders, type Order, type InsertOrder,
  orderItems, type OrderItem, type InsertOrderItem,
  cartItems, type CartItem, type InsertCartItem,
  subscribers, type Subscriber, type InsertSubscriber
} from "@shared/schema";
import { nanoid } from "nanoid";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  getArtisans(): Promise<User[]>;
  getArtisan(id: number): Promise<User | undefined>;

  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Products
  getProducts(): Promise<Product[]>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getProductsByCategorySlug(slug: string): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getFeaturedProducts(): Promise<Product[]>;
  getNewArrivals(): Promise<Product[]>;
  getBestSellers(): Promise<Product[]>;
  getSustainableProducts(): Promise<Product[]>;
  getProductsByArtisan(artisanId: number): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;

  // Cart
  getCartItems(userId: number): Promise<CartItem[]>;
  getCartItemsWithProducts(userId: number): Promise<(CartItem & { product: Product })[]>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
  clearCart(userId: number): Promise<boolean>;
  
  // Orders
  createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<Order>;
  getOrders(userId: number): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  getOrderItemsWithProducts(orderId: number): Promise<(OrderItem & { product: Product })[]>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;
  
  // Newsletter
  addSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getSubscribers(): Promise<Subscriber[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private products: Map<number, Product>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  private cartItems: Map<number, CartItem>;
  private subscribers: Map<number, Subscriber>;
  
  private currentUserId: number;
  private currentCategoryId: number;
  private currentProductId: number;
  private currentOrderId: number;
  private currentOrderItemId: number;
  private currentCartItemId: number;
  private currentSubscriberId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.products = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.cartItems = new Map();
    this.subscribers = new Map();
    
    this.currentUserId = 1;
    this.currentCategoryId = 1;
    this.currentProductId = 1;
    this.currentOrderId = 1;
    this.currentOrderItemId = 1;
    this.currentCartItemId = 1;
    this.currentSubscriberId = 1;
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize default categories
    const categoryData: InsertCategory[] = [
      {
        name: "Dokra",
        description: "Ancient lost-wax bronze casting technique creating exquisite figurines and jewelry.",
        image: "https://images.unsplash.com/photo-1555040479-c949debe66c1?auto=format&fit=crop&w=600&h=400&q=80",
        slug: "dokra"
      },
      {
        name: "Kantha",
        description: "Traditional running stitch embroidery creating intricate patterns on textiles.",
        image: "https://images.unsplash.com/photo-1606722590066-8cc69f0c0708?auto=format&fit=crop&w=600&h=400&q=80",
        slug: "kantha"
      },
      {
        name: "Terracotta",
        description: "Baked earthen clay craftsmanship creating ornate decorative and functional pieces.",
        image: "https://images.unsplash.com/photo-1605883705077-8d3d3cebe78c?auto=format&fit=crop&w=600&h=400&q=80",
        slug: "terracotta"
      },
      {
        name: "Shitalpati",
        description: "Delicate reed mat weaving known for its cooling properties and intricate designs.",
        image: "https://images.unsplash.com/photo-1606324547048-eb67bfc94eb7?auto=format&fit=crop&w=600&h=400&q=80",
        slug: "shitalpati"
      }
    ];
    
    // Create some artisans
    const artisanData: InsertUser[] = [
      {
        username: "rajesh_sutradhar",
        password: "password123",
        name: "Rajesh Sutradhar",
        email: "rajesh@example.com",
        role: "artisan",
        bio: "A third-generation Dokra artisan from Bankura, Rajesh has been crafting brass figurines for over 25 years using traditional techniques passed down from his grandfather.",
        location: "Bankura, West Bengal",
        profile_image: "https://images.unsplash.com/photo-1617178564136-564b38fc87b4?auto=format&fit=crop&w=600&h=400&q=80",
        craft_specialty: "Dokra",
        isArtisan: true
      },
      {
        username: "lakshmi_debnath",
        password: "password123",
        name: "Lakshmi Debnath",
        email: "lakshmi@example.com",
        role: "artisan",
        bio: "Lakshmi leads a women's collective in Bolpur that specializes in Kantha embroidery. Their intricate stitchwork preserves traditional Bengali motifs with contemporary applications.",
        location: "Bolpur, West Bengal",
        profile_image: "https://images.unsplash.com/photo-1626788460425-0e48d9ced459?auto=format&fit=crop&w=600&h=400&q=80",
        craft_specialty: "Kantha",
        isArtisan: true
      },
      {
        username: "amit_pal",
        password: "password123",
        name: "Amit Pal",
        email: "amit@example.com",
        role: "artisan",
        bio: "From the pottery village of Panchmura, Amit creates terracotta sculptures that blend traditional religious iconography with contemporary artistic expressions.",
        location: "Panchmura, West Bengal",
        profile_image: "https://images.unsplash.com/photo-1600077063877-a23f39c20eb3?auto=format&fit=crop&w=600&h=400&q=80",
        craft_specialty: "Terracotta",
        isArtisan: true
      }
    ];
    
    // Create categories
    categoryData.forEach(category => this.createCategory(category));
    
    // Create artisans
    artisanData.forEach(artisan => this.createUser(artisan));
    
    // Create some products
    const createProductsData = () => {
      // Dokra products (Category 1, Artisan 1)
      this.createProduct({
        name: "Dokra Horse Figurine",
        description: "Handcrafted brass horse using traditional lost-wax technique.",
        price: 2450,
        discount_price: 2950,
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&h=600&q=80",
        additional_images: [],
        category_id: 1,
        artisan_id: 1,
        stock: 10,
        is_featured: true,
        is_sustainable: true,
        is_best_seller: false,
        is_new_arrival: false,
        blockchain_verified: true,
        rating: 4.8,
        rating_count: 24,
        slug: "dokra-horse-figurine",
        blockchain_certificate: {
          product_id: "DOK-EL-22-7834",
          created_on: "June 12, 2023",
          artisan: "Rajesh Sutradhar",
          location: "Bankura, West Bengal",
          blockchain_id: "0x71C...8f3E"
        }
      });
      
      this.createProduct({
        name: "Dokra Elephant Figurine",
        description: "Traditional brass elephant with detailed texture and patina finish.",
        price: 3200,
        discount_price: null,
        image: "https://images.unsplash.com/photo-1612810806695-30f7a8258391?auto=format&fit=crop&w=600&h=600&q=80",
        additional_images: [],
        category_id: 1,
        artisan_id: 1,
        stock: 5,
        is_featured: false,
        is_sustainable: true,
        is_best_seller: true,
        is_new_arrival: false,
        blockchain_verified: true,
        rating: 4.9,
        rating_count: 31,
        slug: "dokra-elephant-figurine",
        blockchain_certificate: {
          product_id: "DOK-EL-22-7835",
          created_on: "July 18, 2023",
          artisan: "Rajesh Sutradhar",
          location: "Bankura, West Bengal",
          blockchain_id: "0x82D...9f4F"
        }
      });
      
      // Kantha products (Category 2, Artisan 2)
      this.createProduct({
        name: "Kantha Embroidered Wall Hanging",
        description: "Traditional hand-stitched cotton fabric with nature motifs.",
        price: 3200,
        discount_price: null,
        image: "https://images.unsplash.com/photo-1617713964959-d9a36bbc7b52?auto=format&fit=crop&w=600&h=600&q=80",
        additional_images: [],
        category_id: 2,
        artisan_id: 2,
        stock: 8,
        is_featured: true,
        is_sustainable: false,
        is_best_seller: true,
        is_new_arrival: false,
        blockchain_verified: false,
        rating: 4.9,
        rating_count: 42,
        slug: "kantha-embroidered-wall-hanging"
      });
      
      // Terracotta products (Category 3, Artisan 3)
      this.createProduct({
        name: "Terracotta Decorative Pot",
        description: "Hand-sculpted clay pot with traditional Bengali motifs.",
        price: 1850,
        discount_price: 2100,
        image: "https://images.unsplash.com/photo-1603204077779-bed963ea7d0e?auto=format&fit=crop&w=600&h=600&q=80",
        additional_images: [],
        category_id: 3,
        artisan_id: 3,
        stock: 15,
        is_featured: true,
        is_sustainable: false,
        is_best_seller: false,
        is_new_arrival: true,
        blockchain_verified: false,
        rating: 4.7,
        rating_count: 18,
        slug: "terracotta-decorative-pot"
      });
      
      // Shitalpati products (Category 4, Artisan 2)
      this.createProduct({
        name: "Shitalpati Floor Mat",
        description: "Natural reed mat with cooling properties and geometric designs.",
        price: 1650,
        discount_price: null,
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&h=600&q=80",
        additional_images: [],
        category_id: 4,
        artisan_id: 2,
        stock: 20,
        is_featured: true,
        is_sustainable: true,
        is_best_seller: false,
        is_new_arrival: true,
        blockchain_verified: false,
        rating: 4.6,
        rating_count: 12,
        slug: "shitalpati-floor-mat"
      });
    };
    
    createProductsData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id, created_at: new Date() };
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  async getArtisans(): Promise<User[]> {
    return Array.from(this.users.values()).filter(user => user.isArtisan);
  }
  
  async getArtisan(id: number): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user || !user.isArtisan) return undefined;
    return user;
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      category => category.slug === slug
    );
  }
  
  async createCategory(category: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const newCategory: Category = { ...category, id };
    this.categories.set(id, newCategory);
    return newCategory;
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category_id === categoryId
    );
  }
  
  async getProductsByCategorySlug(slug: string): Promise<Product[]> {
    const category = await this.getCategoryBySlug(slug);
    if (!category) return [];
    return this.getProductsByCategory(category.id);
  }
  
  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      product => product.slug === slug
    );
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.is_featured
    );
  }
  
  async getNewArrivals(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.is_new_arrival
    );
  }
  
  async getBestSellers(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.is_best_seller
    );
  }
  
  async getSustainableProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.is_sustainable
    );
  }
  
  async getProductsByArtisan(artisanId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.artisan_id === artisanId
    );
  }
  
  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const newProduct: Product = { ...product, id, created_at: new Date() };
    this.products.set(id, newProduct);
    return newProduct;
  }
  
  async updateProduct(id: number, productData: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = await this.getProduct(id);
    if (!product) return undefined;
    
    const updatedProduct = { ...product, ...productData };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  // Cart methods
  async getCartItems(userId: number): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      item => item.user_id === userId
    );
  }
  
  async getCartItemsWithProducts(userId: number): Promise<(CartItem & { product: Product })[]> {
    const cartItems = await this.getCartItems(userId);
    const result: (CartItem & { product: Product })[] = [];
    
    for (const item of cartItems) {
      const product = await this.getProduct(item.product_id);
      if (product) {
        result.push({ ...item, product });
      }
    }
    
    return result;
  }
  
  async addToCart(cartItem: InsertCartItem): Promise<CartItem> {
    // Check if product already in cart
    const existingItem = Array.from(this.cartItems.values()).find(
      item => item.user_id === cartItem.user_id && item.product_id === cartItem.product_id
    );
    
    if (existingItem) {
      // Update quantity
      return await this.updateCartItem(existingItem.id, existingItem.quantity + cartItem.quantity);
    }
    
    const id = this.currentCartItemId++;
    const newCartItem: CartItem = { ...cartItem, id, created_at: new Date() };
    this.cartItems.set(id, newCartItem);
    return newCartItem;
  }
  
  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    if (!cartItem) return undefined;
    
    const updatedItem: CartItem = { ...cartItem, quantity };
    this.cartItems.set(id, updatedItem);
    return updatedItem;
  }
  
  async removeFromCart(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }
  
  async clearCart(userId: number): Promise<boolean> {
    const cartItems = await this.getCartItems(userId);
    cartItems.forEach(item => this.cartItems.delete(item.id));
    return true;
  }

  // Order methods
  async createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<Order> {
    const id = this.currentOrderId++;
    const newOrder: Order = { ...order, id, created_at: new Date() };
    this.orders.set(id, newOrder);
    
    // Create order items
    items.forEach(item => {
      const itemId = this.currentOrderItemId++;
      const newOrderItem: OrderItem = { ...item, id, order_id: newOrder.id };
      this.orderItems.set(itemId, newOrderItem);
    });
    
    return newOrder;
  }
  
  async getOrders(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      order => order.user_id === userId
    );
  }
  
  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
  
  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(
      item => item.order_id === orderId
    );
  }
  
  async getOrderItemsWithProducts(orderId: number): Promise<(OrderItem & { product: Product })[]> {
    const orderItems = await this.getOrderItems(orderId);
    const result: (OrderItem & { product: Product })[] = [];
    
    for (const item of orderItems) {
      const product = await this.getProduct(item.product_id);
      if (product) {
        result.push({ ...item, product });
      }
    }
    
    return result;
  }
  
  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const order = await this.getOrder(id);
    if (!order) return undefined;
    
    const updatedOrder: Order = { ...order, status };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  // Newsletter methods
  async addSubscriber(subscriber: InsertSubscriber): Promise<Subscriber> {
    const id = this.currentSubscriberId++;
    const newSubscriber: Subscriber = { ...subscriber, id, created_at: new Date() };
    this.subscribers.set(id, newSubscriber);
    return newSubscriber;
  }
  
  async getSubscribers(): Promise<Subscriber[]> {
    return Array.from(this.subscribers.values());
  }
}

export const storage = new MemStorage();
