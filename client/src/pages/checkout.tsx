import { useState, useEffect } from "react";
import { useCart } from "@/contexts/cart-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { formatPrice } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, CheckCircle, ArrowLeft, CreditCard, Banknote, Wallet } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const shippingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().min(6, "PIN code is required"),
  country: z.string().min(2, "Country is required"),
});

const paymentSchema = z.object({
  paymentMethod: z.enum(["credit_card", "net_banking", "upi", "wallet"]),
  cardNumber: z.string().optional(),
  cardName: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
  upiId: z.string().optional(),
  walletType: z.enum(["paytm", "phonepe", "google_pay", "amazon_pay"]).optional(),
});

type ShippingFormValues = z.infer<typeof shippingSchema>;
type PaymentFormValues = z.infer<typeof paymentSchema>;

export default function Checkout() {
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [shippingDetails, setShippingDetails] = useState<ShippingFormValues | null>(null);
  const [, setLocation] = useLocation();
  
  const { cartItems, totalItems, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  
  // Mock user ID for demo purposes
  const mockUserId = 1;
  
  // Shipping form
  const shippingForm = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "West Bengal",
      pincode: "",
      country: "India",
    },
  });
  
  // Payment form
  const paymentForm = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: "credit_card",
    },
  });
  
  // Redirect to home if cart is empty
  useEffect(() => {
    if (cartItems.length === 0 && !orderCompleted) {
      setLocation("/");
    }
  }, [cartItems, orderCompleted, setLocation]);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Handle shipping form submission
  const onShippingSubmit = (data: ShippingFormValues) => {
    setShippingDetails(data);
    setActiveStep('payment');
    window.scrollTo(0, 0);
  };
  
  // Handle payment form submission
  const onPaymentSubmit = async (data: PaymentFormValues) => {
    if (!shippingDetails) return;
    
    setActiveStep('review');
    window.scrollTo(0, 0);
  };
  
  // Handle order placement
  const placeOrder = async () => {
    if (!shippingDetails) return;
    
    try {
      // Create order items from cart items
      const orderItems = cartItems.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.product.discount_price || item.product.price
      }));
      
      // Create order object
      const order = {
        user_id: mockUserId,
        status: "pending",
        total: cartTotal,
        shipping_address: shippingDetails,
        payment_info: paymentForm.getValues()
      };
      
      // Submit order to API
      const response = await apiRequest("POST", "/api/orders", {
        order,
        items: orderItems
      });
      
      // Extract order ID from response
      const newOrder = await response.json();
      setOrderId(newOrder.id);
      
      // Clear cart and show success message
      await clearCart(mockUserId);
      setOrderCompleted(true);
      
      toast({
        title: "Order Placed Successfully!",
        description: `Thank you for your order. Your order ID is #${newOrder.id}.`,
      });
      
      window.scrollTo(0, 0);
    } catch (error) {
      toast({
        title: "Failed to place order",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Watch payment method to show appropriate form fields
  const watchPaymentMethod = paymentForm.watch("paymentMethod");
  
  // Calculate shipping cost (free for orders over 1000)
  const shippingCost = cartTotal >= 1000 ? 0 : 100;
  
  // Calculate tax (5% of subtotal)
  const taxAmount = cartTotal * 0.05;
  
  // Calculate order total
  const orderTotal = cartTotal + shippingCost + taxAmount;
  
  if (orderCompleted) {
    return (
      <div className="bg-[var(--color-beige)] min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-16 w-16 text-[var(--color-success)]" />
            </div>
            <h1 className="font-['Cormorant_Garamond'] text-3xl font-bold mb-4">
              Order Confirmed!
            </h1>
            <p className="mb-6 text-[var(--color-charcoal)]/70">
              Thank you for your purchase. Your order has been confirmed and will be shipped soon.
            </p>
            
            <div className="bg-[var(--color-beige)] rounded-lg p-4 mb-6 text-left">
              <div className="mb-3">
                <span className="text-sm text-[var(--color-charcoal)]/70">Order ID:</span>
                <p className="font-medium">#{orderId}</p>
              </div>
              <div>
                <span className="text-sm text-[var(--color-charcoal)]/70">Order Total:</span>
                <p className="font-medium">{formatPrice(orderTotal)}</p>
              </div>
            </div>
            
            <p className="text-sm text-[var(--color-charcoal)]/70 mb-8">
              We've sent you an email confirmation with all the details of your order.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="bg-[var(--color-terracotta)] hover:bg-[var(--color-terracotta)]/90">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (cartItems.length === 0) {
    return (
      <div className="bg-[var(--color-beige)] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Redirecting to home page...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-[var(--color-beige)] py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/cart">
            <a className="inline-flex items-center text-[var(--color-indigo)] hover:underline">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Cart
            </a>
          </Link>
        </div>
        
        <h1 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-bold mb-8 text-center">
          Checkout
        </h1>
        
        {/* Checkout Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <div className={`flex-1 text-center ${activeStep === 'shipping' ? 'font-semibold' : ''}`}>
              <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                activeStep === 'shipping' ? 'bg-[var(--color-terracotta)] text-white' : 
                activeStep === 'payment' || activeStep === 'review' ? 'bg-[var(--color-success)] text-white' : 
                'bg-gray-200'
              }`}>
                1
              </div>
              <span>Shipping</span>
            </div>
            <div className="w-full max-w-[100px] h-[2px] bg-gray-200 mx-2">
              <div className={`h-full bg-[var(--color-success)] transition-all ${
                activeStep === 'payment' || activeStep === 'review' ? 'w-full' : 'w-0'
              }`}></div>
            </div>
            <div className={`flex-1 text-center ${activeStep === 'payment' ? 'font-semibold' : ''}`}>
              <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                activeStep === 'payment' ? 'bg-[var(--color-terracotta)] text-white' : 
                activeStep === 'review' ? 'bg-[var(--color-success)] text-white' : 
                'bg-gray-200'
              }`}>
                2
              </div>
              <span>Payment</span>
            </div>
            <div className="w-full max-w-[100px] h-[2px] bg-gray-200 mx-2">
              <div className={`h-full bg-[var(--color-success)] transition-all ${
                activeStep === 'review' ? 'w-full' : 'w-0'
              }`}></div>
            </div>
            <div className={`flex-1 text-center ${activeStep === 'review' ? 'font-semibold' : ''}`}>
              <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                activeStep === 'review' ? 'bg-[var(--color-terracotta)] text-white' : 'bg-gray-200'
              }`}>
                3
              </div>
              <span>Review</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              {activeStep === 'shipping' && (
                <div>
                  <h2 className="font-['Cormorant_Garamond'] text-2xl font-semibold mb-6">
                    Shipping Information
                  </h2>
                  
                  <Form {...shippingForm}>
                    <form onSubmit={shippingForm.handleSubmit(onShippingSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FormField
                          control={shippingForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={shippingForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={shippingForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={shippingForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Enter your full address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FormField
                          control={shippingForm.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your city" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={shippingForm.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Select defaultValue={field.value} onValueChange={field.onChange}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select state" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="West Bengal">West Bengal</SelectItem>
                                    <SelectItem value="Delhi">Delhi</SelectItem>
                                    <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                                    <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                                    <SelectItem value="Karnataka">Karnataka</SelectItem>
                                    <SelectItem value="Gujarat">Gujarat</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FormField
                          control={shippingForm.control}
                          name="pincode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>PIN Code</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter PIN code" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={shippingForm.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              <FormControl>
                                <Select defaultValue={field.value} onValueChange={field.onChange}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select country" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="India">India</SelectItem>
                                    <SelectItem value="United States">United States</SelectItem>
                                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                    <SelectItem value="Canada">Canada</SelectItem>
                                    <SelectItem value="Australia">Australia</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Button type="submit" className="w-full bg-[var(--color-terracotta)] hover:bg-[var(--color-terracotta)]/90">
                        Continue to Payment
                      </Button>
                    </form>
                  </Form>
                </div>
              )}
              
              {activeStep === 'payment' && (
                <div>
                  <h2 className="font-['Cormorant_Garamond'] text-2xl font-semibold mb-6">
                    Payment Method
                  </h2>
                  
                  <Form {...paymentForm}>
                    <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="space-y-6">
                      <FormField
                        control={paymentForm.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Select Payment Method</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-2"
                              >
                                <div className="flex items-center space-x-2 border rounded-md p-3">
                                  <RadioGroupItem value="credit_card" id="credit_card" />
                                  <Label htmlFor="credit_card" className="flex items-center cursor-pointer">
                                    <CreditCard className="h-5 w-5 mr-2" />
                                    Credit / Debit Card
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2 border rounded-md p-3">
                                  <RadioGroupItem value="net_banking" id="net_banking" />
                                  <Label htmlFor="net_banking" className="flex items-center cursor-pointer">
                                    <Banknote className="h-5 w-5 mr-2" />
                                    Net Banking
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2 border rounded-md p-3">
                                  <RadioGroupItem value="upi" id="upi" />
                                  <Label htmlFor="upi" className="flex items-center cursor-pointer">
                                    <span className="font-bold mr-2">UPI</span>
                                    Pay directly from your bank account
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2 border rounded-md p-3">
                                  <RadioGroupItem value="wallet" id="wallet" />
                                  <Label htmlFor="wallet" className="flex items-center cursor-pointer">
                                    <Wallet className="h-5 w-5 mr-2" />
                                    Mobile Wallets
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {watchPaymentMethod === 'credit_card' && (
                        <div className="space-y-4 pt-4">
                          <FormField
                            control={paymentForm.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="1234 5678 9012 3456" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={paymentForm.control}
                            name="cardName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name on Card</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter name as shown on card" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={paymentForm.control}
                              name="expiryDate"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Expiry Date</FormLabel>
                                  <FormControl>
                                    <Input placeholder="MM/YY" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={paymentForm.control}
                              name="cvv"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>CVV</FormLabel>
                                  <FormControl>
                                    <Input placeholder="123" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )}
                      
                      {watchPaymentMethod === 'upi' && (
                        <FormField
                          control={paymentForm.control}
                          name="upiId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>UPI ID</FormLabel>
                              <FormControl>
                                <Input placeholder="username@bank" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      
                      {watchPaymentMethod === 'wallet' && (
                        <FormField
                          control={paymentForm.control}
                          name="walletType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Select Wallet</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a wallet" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="paytm">Paytm</SelectItem>
                                  <SelectItem value="phonepe">PhonePe</SelectItem>
                                  <SelectItem value="google_pay">Google Pay</SelectItem>
                                  <SelectItem value="amazon_pay">Amazon Pay</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      
                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="flex-1 border-[var(--color-indigo)] text-[var(--color-indigo)]"
                          onClick={() => setActiveStep('shipping')}
                        >
                          Back
                        </Button>
                        <Button 
                          type="submit"
                          className="flex-1 bg-[var(--color-terracotta)] hover:bg-[var(--color-terracotta)]/90"
                        >
                          Continue to Review
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              )}
              
              {activeStep === 'review' && (
                <div>
                  <h2 className="font-['Cormorant_Garamond'] text-2xl font-semibold mb-6">
                    Review Your Order
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-lg mb-3">Shipping Details</h3>
                      <div className="bg-[var(--color-beige)]/50 rounded-md p-4">
                        <p className="font-medium">{shippingDetails?.fullName}</p>
                        <p>{shippingDetails?.address}</p>
                        <p>{shippingDetails?.city}, {shippingDetails?.state} - {shippingDetails?.pincode}</p>
                        <p>{shippingDetails?.country}</p>
                        <p className="mt-2">
                          Email: {shippingDetails?.email}<br />
                          Phone: {shippingDetails?.phone}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-lg mb-3">Payment Method</h3>
                      <div className="bg-[var(--color-beige)]/50 rounded-md p-4">
                        {watchPaymentMethod === 'credit_card' && (
                          <div className="flex items-center">
                            <CreditCard className="h-5 w-5 mr-2" />
                            <span>Credit / Debit Card ending in **** {paymentForm.getValues().cardNumber?.slice(-4) || '1234'}</span>
                          </div>
                        )}
                        {watchPaymentMethod === 'net_banking' && (
                          <div className="flex items-center">
                            <Banknote className="h-5 w-5 mr-2" />
                            <span>Net Banking</span>
                          </div>
                        )}
                        {watchPaymentMethod === 'upi' && (
                          <div className="flex items-center">
                            <span className="font-bold mr-2">UPI</span>
                            <span>{paymentForm.getValues().upiId || 'username@bank'}</span>
                          </div>
                        )}
                        {watchPaymentMethod === 'wallet' && (
                          <div className="flex items-center">
                            <Wallet className="h-5 w-5 mr-2" />
                            <span>
                              {paymentForm.getValues().walletType === 'paytm' && 'Paytm'}
                              {paymentForm.getValues().walletType === 'phonepe' && 'PhonePe'}
                              {paymentForm.getValues().walletType === 'google_pay' && 'Google Pay'}
                              {paymentForm.getValues().walletType === 'amazon_pay' && 'Amazon Pay'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-lg mb-3">Order Items</h3>
                      <div className="bg-[var(--color-beige)]/50 rounded-md p-4">
                        <div className="divide-y">
                          {cartItems.map((item) => (
                            <div key={item.id} className="py-3 flex justify-between items-center">
                              <div className="flex items-center">
                                <img 
                                  src={item.product.image} 
                                  alt={item.product.name} 
                                  className="w-12 h-12 object-cover rounded-md mr-3" 
                                />
                                <div>
                                  <p className="font-medium">{item.product.name}</p>
                                  <p className="text-sm text-[var(--color-charcoal)]/70">
                                    Qty: {item.quantity}
                                  </p>
                                </div>
                              </div>
                              <span className="font-medium">
                                {formatPrice((item.product.discount_price || item.product.price) * item.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="flex-1 border-[var(--color-indigo)] text-[var(--color-indigo)]"
                        onClick={() => setActiveStep('payment')}
                      >
                        Back
                      </Button>
                      <Button 
                        type="button"
                        className="flex-1 bg-[var(--color-terracotta)] hover:bg-[var(--color-terracotta)]/90"
                        onClick={placeOrder}
                      >
                        Place Order
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Side - Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="font-['Cormorant_Garamond'] text-xl font-semibold mb-6 flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (5%)</span>
                  <span>{formatPrice(taxAmount)}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-dashed">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(orderTotal)}</span>
                </div>
              </div>
              
              {cartTotal >= 1000 && (
                <div className="mt-4 bg-[var(--color-success)]/10 text-[var(--color-success)] p-3 rounded-md text-sm">
                  You qualified for free shipping!
                </div>
              )}
              
              <div className="mt-6 text-sm text-[var(--color-charcoal)]/70">
                <p>
                  By completing your purchase, you agree to our{" "}
                  <Link href="/terms">
                    <a className="text-[var(--color-indigo)] hover:underline">Terms of Service</a>
                  </Link>
                  {" "}and{" "}
                  <Link href="/privacy-policy">
                    <a className="text-[var(--color-indigo)] hover:underline">Privacy Policy</a>
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
