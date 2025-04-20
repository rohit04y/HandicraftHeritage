import express, { type Express, Request, Response } from "express";
import { createServer } from "http";
import type { Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertUserSchema, 
  insertCartItemSchema, 
  insertOrderSchema, 
  insertOrderItemSchema,
  insertSubscriberSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const apiRouter = express.Router();
  
  // Category routes
  apiRouter.get("/categories", async (_req: Request, res: Response) => {
    const categories = await storage.getCategories();
    res.json(categories);
  });
  
  apiRouter.get("/categories/:slug", async (req: Request, res: Response) => {
    const { slug } = req.params;
    const category = await storage.getCategoryBySlug(slug);
    
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    
    res.json(category);
  });
  
  // Product routes
  apiRouter.get("/products", async (_req: Request, res: Response) => {
    const products = await storage.getProducts();
    res.json(products);
  });
  
  apiRouter.get("/products/featured", async (_req: Request, res: Response) => {
    const products = await storage.getFeaturedProducts();
    res.json(products);
  });
  
  apiRouter.get("/products/new-arrivals", async (_req: Request, res: Response) => {
    const products = await storage.getNewArrivals();
    res.json(products);
  });
  
  apiRouter.get("/products/best-sellers", async (_req: Request, res: Response) => {
    const products = await storage.getBestSellers();
    res.json(products);
  });
  
  apiRouter.get("/products/sustainable", async (_req: Request, res: Response) => {
    const products = await storage.getSustainableProducts();
    res.json(products);
  });
  
  apiRouter.get("/products/:slug", async (req: Request, res: Response) => {
    const { slug } = req.params;
    const product = await storage.getProductBySlug(slug);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.json(product);
  });
  
  apiRouter.get("/categories/:slug/products", async (req: Request, res: Response) => {
    const { slug } = req.params;
    const products = await storage.getProductsByCategorySlug(slug);
    res.json(products);
  });
  
  // Artisan routes
  apiRouter.get("/artisans", async (_req: Request, res: Response) => {
    const artisans = await storage.getArtisans();
    res.json(artisans);
  });
  
  apiRouter.get("/artisans/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid artisan ID" });
    }
    
    const artisan = await storage.getArtisan(id);
    if (!artisan) {
      return res.status(404).json({ message: "Artisan not found" });
    }
    
    res.json(artisan);
  });
  
  apiRouter.get("/artisans/:id/products", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid artisan ID" });
    }
    
    const products = await storage.getProductsByArtisan(id);
    res.json(products);
  });
  
  // Cart routes
  apiRouter.get("/cart/:userId", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    const cartItems = await storage.getCartItemsWithProducts(userId);
    res.json(cartItems);
  });
  
  apiRouter.post("/cart/add", async (req: Request, res: Response) => {
    try {
      const cartItemData = insertCartItemSchema.parse(req.body);
      const cartItem = await storage.addToCart(cartItemData);
      res.status(201).json(cartItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid cart item data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });
  
  apiRouter.put("/cart/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid cart item ID" });
    }
    
    const { quantity } = req.body;
    if (typeof quantity !== "number" || quantity < 1) {
      return res.status(400).json({ message: "Invalid quantity" });
    }
    
    const updatedItem = await storage.updateCartItem(id, quantity);
    if (!updatedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    
    res.json(updatedItem);
  });
  
  apiRouter.delete("/cart/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid cart item ID" });
    }
    
    const success = await storage.removeFromCart(id);
    if (!success) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    
    res.status(204).end();
  });
  
  apiRouter.delete("/cart/user/:userId", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    await storage.clearCart(userId);
    res.status(204).end();
  });
  
  // Order routes
  apiRouter.post("/orders", async (req: Request, res: Response) => {
    try {
      const { order, items } = req.body;
      
      const orderData = insertOrderSchema.parse(order);
      const orderItemsData = z.array(insertOrderItemSchema).parse(items);
      
      const newOrder = await storage.createOrder(orderData, orderItemsData);
      
      // Clear the cart after successful order
      await storage.clearCart(orderData.user_id);
      
      res.status(201).json(newOrder);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });
  
  apiRouter.get("/orders/:userId", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    const orders = await storage.getOrders(userId);
    res.json(orders);
  });
  
  apiRouter.get("/orders/:id/items", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }
    
    const orderItems = await storage.getOrderItemsWithProducts(id);
    res.json(orderItems);
  });
  
  // Newsletter subscription
  apiRouter.post("/newsletter/subscribe", async (req: Request, res: Response) => {
    try {
      const subscriberData = insertSubscriberSchema.parse(req.body);
      const subscriber = await storage.addSubscriber(subscriberData);
      res.status(201).json(subscriber);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid subscription data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Register routes
  app.use("/api", apiRouter);

  // Create HTTP server
  const httpServer = createServer(app);
  return httpServer;
}
