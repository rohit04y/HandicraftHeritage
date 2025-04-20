import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "./contexts/cart-context";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Home from "@/pages/home";
import ProductListing from "@/pages/product-listing";
import Product from "@/pages/product";
import Artisans from "@/pages/artisans";
import ArtisanProfile from "@/pages/artisan-profile";
import Cart from "@/pages/cart";
import Checkout from "@/pages/checkout";
import About from "@/pages/about";
import AdminDashboard from "@/pages/admin/dashboard";
import CartDrawer from "@/components/cart/cart-drawer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/crafts/:slug" component={ProductListing} />
      <Route path="/product/:slug" component={Product} />
      <Route path="/artisans" component={Artisans} />
      <Route path="/artisans/:id" component={ArtisanProfile} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/about" component={About} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <div className="flex flex-col min-h-screen bg-[var(--color-beige)]">
            <Header />
            <main className="flex-grow">
              <Router />
            </main>
            <Footer />
          </div>
          <CartDrawer />
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
