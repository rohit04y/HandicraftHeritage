import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export type CartItem = {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    discount_price?: number;
    image: string;
    slug: string;
  };
};

interface CartContextType {
  cartItems: CartItem[];
  totalItems: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (userId: number, productId: number, quantity: number) => Promise<void>;
  updateCartItem: (itemId: number, quantity: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  clearCart: (userId: number) => Promise<void>;
  refreshCart: (userId: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();
  
  // Mock user ID for demo purposes
  const mockUserId = 1;
  
  // Calculate cart totals
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => {
    const price = item.product.discount_price || item.product.price;
    return total + (price * item.quantity);
  }, 0);
  
  // Initial cart fetch
  useEffect(() => {
    refreshCart(mockUserId);
  }, []);
  
  const refreshCart = async (userId: number) => {
    try {
      const response = await fetch(`/api/cart/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };
  
  const addToCart = async (userId: number, productId: number, quantity: number) => {
    try {
      await apiRequest("POST", "/api/cart/add", {
        user_id: userId,
        product_id: productId,
        quantity
      });
      
      await refreshCart(userId);
      toast({
        title: "Added to cart",
        description: "Item has been added to your cart",
      });
      
      // Open cart drawer on add
      setIsCartOpen(true);
    } catch (error) {
      toast({
        title: "Failed to add item",
        description: "There was an error adding the item to your cart",
        variant: "destructive",
      });
    }
  };
  
  const updateCartItem = async (itemId: number, quantity: number) => {
    try {
      await apiRequest("PUT", `/api/cart/${itemId}`, { quantity });
      await refreshCart(mockUserId);
    } catch (error) {
      toast({
        title: "Failed to update item",
        description: "There was an error updating the cart item",
        variant: "destructive",
      });
    }
  };
  
  const removeFromCart = async (itemId: number) => {
    try {
      await apiRequest("DELETE", `/api/cart/${itemId}`);
      await refreshCart(mockUserId);
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart",
      });
    } catch (error) {
      toast({
        title: "Failed to remove item",
        description: "There was an error removing the item from your cart",
        variant: "destructive",
      });
    }
  };
  
  const clearCart = async (userId: number) => {
    try {
      await apiRequest("DELETE", `/api/cart/user/${userId}`);
      setCartItems([]);
    } catch (error) {
      toast({
        title: "Failed to clear cart",
        description: "There was an error clearing your cart",
        variant: "destructive",
      });
    }
  };
  
  return (
    <CartContext.Provider value={{
      cartItems,
      totalItems,
      cartTotal,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      updateCartItem,
      removeFromCart,
      clearCart,
      refreshCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
