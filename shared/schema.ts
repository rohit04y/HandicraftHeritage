import { pgTable, text, serial, integer, boolean, timestamp, doublePrecision, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User/Artisan schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull().default("customer"),
  bio: text("bio"),
  location: text("location"),
  profile_image: text("profile_image"),
  craft_specialty: text("craft_specialty"),
  isArtisan: boolean("is_artisan").default(false),
  created_at: timestamp("created_at").defaultNow(),
});

// Product Categories
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image"),
  slug: text("slug").notNull().unique(),
});

// Products
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: doublePrecision("price").notNull(),
  discount_price: doublePrecision("discount_price"),
  image: text("image").notNull(),
  additional_images: text("additional_images").array(),
  category_id: integer("category_id").notNull(),
  artisan_id: integer("artisan_id").notNull(),
  stock: integer("stock").notNull().default(0),
  is_featured: boolean("is_featured").default(false),
  is_sustainable: boolean("is_sustainable").default(false),
  is_best_seller: boolean("is_best_seller").default(false),
  is_new_arrival: boolean("is_new_arrival").default(false),
  blockchain_verified: boolean("blockchain_verified").default(false),
  blockchain_certificate: jsonb("blockchain_certificate"),
  rating: doublePrecision("rating").default(0),
  rating_count: integer("rating_count").default(0),
  created_at: timestamp("created_at").defaultNow(),
  slug: text("slug").notNull().unique(),
});

// Orders
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").notNull(),
  status: text("status").notNull().default("pending"),
  total: doublePrecision("total").notNull(),
  shipping_address: jsonb("shipping_address").notNull(),
  payment_info: jsonb("payment_info"),
  created_at: timestamp("created_at").defaultNow(),
});

// Order Items
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  order_id: integer("order_id").notNull(),
  product_id: integer("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  price: doublePrecision("price").notNull(),
});

// Cart Items
export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").notNull(),
  product_id: integer("product_id").notNull(),
  quantity: integer("quantity").notNull().default(1),
  created_at: timestamp("created_at").defaultNow(),
});

// Newsletter Subscribers
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  first_name: text("first_name"),
  last_name: text("last_name"),
  preferences: text("preferences"),
  created_at: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users)
  .omit({ id: true, created_at: true });

export const insertCategorySchema = createInsertSchema(categories)
  .omit({ id: true });

export const insertProductSchema = createInsertSchema(products)
  .omit({ id: true, created_at: true });

export const insertOrderSchema = createInsertSchema(orders)
  .omit({ id: true, created_at: true });

export const insertOrderItemSchema = createInsertSchema(orderItems)
  .omit({ id: true });

export const insertCartItemSchema = createInsertSchema(cartItems)
  .omit({ id: true, created_at: true });

export const insertSubscriberSchema = createInsertSchema(subscribers)
  .omit({ id: true, created_at: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;

export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;

export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
