import { useCart } from "@/contexts/cart-context";
import { formatPrice } from "@/lib/utils";
import { 
  Sheet, 
  SheetClose, 
  SheetContent, 
  SheetFooter, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MinusCircle, PlusCircle, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "wouter";

export default function CartDrawer() {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    updateCartItem, 
    removeFromCart, 
    totalItems, 
    cartTotal 
  } = useCart();
  
  // Mock user ID for demo purposes
  const mockUserId = 1;
  
  const handleQuantityChange = (itemId: number, currentQuantity: number, change: number) => {
    const newQuantity = Math.max(1, currentQuantity + change);
    updateCartItem(itemId, newQuantity);
  };
  
  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <span>Your Cart {totalItems > 0 && `(${totalItems})`}</span>
          </SheetTitle>
        </SheetHeader>
        
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 flex-1 text-center">
            <ShoppingCart className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="font-medium text-lg mb-1">Your cart is empty</h3>
            <p className="text-[var(--color-charcoal)]/60 mb-6">
              Add beautiful artisan crafts to your cart
            </p>
            <SheetClose asChild>
              <Button
                onClick={() => setIsCartOpen(false)}
                className="bg-[var(--color-terracotta)] hover:bg-[var(--color-terracotta)]/90"
              >
                Continue Shopping
              </Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4 py-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 rounded-md overflow-hidden">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium line-clamp-1">{item.product.name}</h4>
                      <div className="text-sm text-[var(--color-charcoal)]/60 mb-2">
                        {formatPrice(item.product.discount_price || item.product.price)}
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6" 
                            onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                          >
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                          <span>{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                          >
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 text-[var(--color-error)]"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="pt-4 border-t">
              <div className="flex justify-between py-2">
                <span>Subtotal</span>
                <span className="font-medium">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between py-2 text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </div>
            
            <SheetFooter className="pt-4 space-y-2">
              <SheetClose asChild>
                <Link href="/checkout">
                  <Button className="w-full bg-[var(--color-terracotta)] hover:bg-[var(--color-terracotta)]/90">
                    Proceed to Checkout
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Button 
                  variant="outline" 
                  className="w-full border-[var(--color-indigo)] text-[var(--color-indigo)]"
                >
                  Continue Shopping
                </Button>
              </SheetClose>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
