import { useEffect } from "react";
import { Link } from "wouter";
import { useCart } from "@/contexts/cart-context";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import ProductCard from "@/components/products/product-card";
import { useQuery } from "@tanstack/react-query";

export default function Cart() {
  const { 
    cartItems, 
    updateCartItem, 
    removeFromCart, 
    totalItems, 
    cartTotal 
  } = useCart();
  
  // Fetch related products
  const { data: featuredProducts } = useQuery({
    queryKey: ['/api/products/featured'],
    enabled: cartItems.length === 0,
  });
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleQuantityChange = (itemId: number, currentQuantity: number, change: number) => {
    const newQuantity = Math.max(1, currentQuantity + change);
    updateCartItem(itemId, newQuantity);
  };
  
  return (
    <div className="bg-[var(--color-beige)]">
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-bold mb-6 text-center">
          Your Shopping Cart
        </h1>
        
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-2xl mx-auto">
            <div className="flex justify-center mb-4">
              <ShoppingBag className="h-16 w-16 text-gray-300" />
            </div>
            <h2 className="font-['Cormorant_Garamond'] text-2xl font-semibold mb-4">
              Your cart is empty
            </h2>
            <p className="text-[var(--color-charcoal)]/70 mb-8">
              Looks like you haven't added anything to your cart yet. Explore our collection of handcrafted products made by skilled artisans.
            </p>
            <Link href="/crafts/dokra">
              <Button className="bg-[var(--color-terracotta)] hover:bg-[var(--color-terracotta)]/90">
                Start Shopping
              </Button>
            </Link>
            
            {/* Recommended Products */}
            {featuredProducts && featuredProducts.length > 0 && (
              <div className="mt-16">
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold mb-6 text-left">
                  You Might Like
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featuredProducts.slice(0, 4).map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="font-['Cormorant_Garamond'] text-xl font-semibold mb-6">
                    Cart Items ({totalItems})
                  </h2>
                  
                  <div className="divide-y">
                    {cartItems.map((item) => (
                      <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-4">
                        <div className="sm:w-32 h-32">
                          <Link href={`/product/${item.product.slug}`}>
                            <a className="block h-full">
                              <img 
                                src={item.product.image} 
                                alt={item.product.name} 
                                className="w-full h-full object-cover rounded-md" 
                              />
                            </a>
                          </Link>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div>
                              <Link href={`/product/${item.product.slug}`}>
                                <a className="font-medium text-lg hover:text-[var(--color-terracotta)]">
                                  {item.product.name}
                                </a>
                              </Link>
                              <div className="mt-1">
                                <span className="text-[var(--color-charcoal)]/70">
                                  Price: {formatPrice(item.product.discount_price || item.product.price)}
                                </span>
                              </div>
                            </div>
                            <div className="mt-4 sm:mt-0">
                              <span className="font-bold">
                                {formatPrice((item.product.discount_price || item.product.price) * item.quantity)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-end mt-4">
                            <div className="flex items-center border rounded-md">
                              <button 
                                onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                                className="p-2 hover:bg-gray-100 rounded-l-md"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="w-10 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                                className="p-2 hover:bg-gray-100 rounded-r-md"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-[var(--color-error)] hover:text-[var(--color-error)]/80 transition"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="font-['Cormorant_Garamond'] text-xl font-semibold mb-6">
                  Order Summary
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[var(--color-charcoal)]/70">Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-charcoal)]/70">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-charcoal)]/70">Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">Total</span>
                      <span className="font-bold text-xl">{formatPrice(cartTotal)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 space-y-4">
                  <Link href="/checkout">
                    <Button className="w-full bg-[var(--color-terracotta)] hover:bg-[var(--color-terracotta)]/90 h-12">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  
                  <Link href="/crafts/dokra">
                    <Button variant="outline" className="w-full border-[var(--color-indigo)] text-[var(--color-indigo)]">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
                
                <div className="mt-8 text-sm text-[var(--color-charcoal)]/70">
                  <p>
                    We accept: Credit/Debit Cards, UPI, Net Banking, and Wallets
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
