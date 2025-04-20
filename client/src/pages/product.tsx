import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/cart-context";
import { 
  ChevronLeft, 
  ChevronRight, 
  Minus, 
  Plus, 
  Shield, 
  Truck, 
  RefreshCw,
  Star
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlockchainCertificate from "@/components/ui/blockchain-certificate";
import ProductCard from "@/components/products/product-card";

export default function Product() {
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { addToCart } = useCart();
  
  // Fetch product data
  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: [`/api/products/${slug}`],
  });
  
  // Fetch related products
  const { data: relatedProducts, isLoading: isLoadingRelated } = useQuery({
    queryKey: [product ? `/api/categories/${product.category_id}/products` : null],
    enabled: !!product,
  });
  
  // Set the main product image once data is loaded
  useEffect(() => {
    if (product && !selectedImage) {
      setSelectedImage(product.image);
    }
  }, [product, selectedImage]);
  
  // Reset quantity when product changes
  useEffect(() => {
    setQuantity(1);
  }, [slug]);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  // Mock user ID for demo purposes
  const mockUserId = 1;
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(mockUserId, product.id, quantity);
    }
  };
  
  if (isLoadingProduct) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8 animate-pulse">
          <div className="md:w-1/2">
            <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="h-8 bg-gray-200 w-3/4 rounded mb-2"></div>
            <div className="h-6 bg-gray-200 w-1/4 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 w-3/4 rounded mb-6"></div>
            <div className="h-8 bg-gray-200 w-1/3 rounded mb-6"></div>
            <div className="h-12 bg-gray-200 rounded mb-4"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="font-['Cormorant_Garamond'] text-2xl font-bold mb-4">
          Product Not Found
        </h2>
        <p className="mb-8">The product you are looking for does not exist or has been removed.</p>
        <Link href="/crafts/dokra">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }
  
  // Filter out the current product from related products
  const filteredRelatedProducts = relatedProducts?.filter(
    (relatedProduct: any) => relatedProduct.id !== product.id
  ).slice(0, 4);
  
  return (
    <>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/">
                  <a className="text-sm text-gray-500 hover:text-[var(--color-terracotta)]">Home</a>
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link href={`/crafts/${product.category_id === 1 ? 'dokra' : 
                                         product.category_id === 2 ? 'kantha' :
                                         product.category_id === 3 ? 'terracotta' : 'shitalpati'}`}>
                    <a className="text-sm text-gray-500 hover:text-[var(--color-terracotta)]">
                      {product.category_id === 1 ? 'Dokra' : 
                       product.category_id === 2 ? 'Kantha' :
                       product.category_id === 3 ? 'Terracotta' : 'Shitalpati'}
                    </a>
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-sm text-[var(--color-terracotta)]">{product.name}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        
        {/* Product Details */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Images */}
          <div className="md:w-1/2">
            <div className="aspect-square rounded-lg overflow-hidden mb-4">
              <img 
                src={selectedImage || product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              <button 
                onClick={() => setSelectedImage(product.image)}
                className={`aspect-square rounded border-2 overflow-hidden ${
                  selectedImage === product.image ? 'border-[var(--color-terracotta)]' : 'border-transparent'
                }`}
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </button>
              
              {/* If product has additional images, display them */}
              {product.additional_images && product.additional_images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`aspect-square rounded border-2 overflow-hidden ${
                    selectedImage === image ? 'border-[var(--color-terracotta)]' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} view ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="md:w-1/2">
            <h1 className="font-['Cormorant_Garamond'] text-3xl font-bold mb-2">
              {product.name}
            </h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <Star className="w-4 h-4 text-[var(--color-golden)] fill-[var(--color-golden)]" />
                <span className="ml-1 text-sm font-medium">{product.rating}</span>
                <span className="ml-1 text-sm text-gray-500">({product.rating_count} reviews)</span>
              </div>
              
              {product.is_sustainable && (
                <Badge className="bg-[var(--color-success)]/10 text-[var(--color-success)] border-none">
                  Eco Friendly
                </Badge>
              )}
              
              {product.is_best_seller && (
                <Badge className="ml-2 bg-[var(--color-golden)]/10 text-[var(--color-golden)] border-none">
                  Best Seller
                </Badge>
              )}
              
              {product.is_new_arrival && (
                <Badge className="ml-2 bg-[var(--color-indigo)]/10 text-[var(--color-indigo)] border-none">
                  New Arrival
                </Badge>
              )}
              
              {product.blockchain_verified && (
                <Badge className="ml-2 bg-[var(--color-indigo)]/10 text-[var(--color-indigo)] border-none">
                  Blockchain Verified
                </Badge>
              )}
            </div>
            
            <p className="text-lg font-bold mb-4">
              {formatPrice(product.price)}
              {product.discount_price && (
                <span className="text-gray-500 line-through ml-2 text-base">
                  {formatPrice(product.discount_price)}
                </span>
              )}
            </p>
            
            <div className="prose max-w-none mb-6 text-[var(--color-charcoal)]/80">
              <p>{product.description}</p>
            </div>
            
            {/* Quantity selector */}
            <div className="flex items-center mb-6">
              <span className="text-sm font-medium mr-3">Quantity:</span>
              <div className="flex items-center border rounded-md">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100 rounded-l-md"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100 rounded-r-md"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              <span className="ml-4 text-sm text-gray-500">
                {product.stock > 0 
                  ? `${product.stock} available` 
                  : "Out of stock"}
              </span>
            </div>
            
            {/* Add to cart button */}
            <div className="space-y-4">
              <Button 
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="w-full bg-[var(--color-terracotta)] hover:bg-[var(--color-terracotta)]/90 h-12 text-lg"
              >
                Add to Cart
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full border-[var(--color-indigo)] text-[var(--color-indigo)] h-12 text-lg"
              >
                Buy Now
              </Button>
            </div>
            
            {/* Shipping & returns info */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-gray-500 mr-3" />
                <span className="text-sm">Free shipping on orders over ₹1,000</span>
              </div>
              <div className="flex items-center">
                <RefreshCw className="h-5 w-5 text-gray-500 mr-3" />
                <span className="text-sm">30-day returns. Buyer pays return shipping</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-gray-500 mr-3" />
                <span className="text-sm">2-year warranty on all products</span>
              </div>
            </div>
            
            <div className="mt-8">
              <p className="text-sm text-[var(--color-charcoal)]/60">
                Artisan: <Link href={`/artisans/${product.artisan_id}`}>
                  <a className="text-[var(--color-indigo)] hover:underline">
                    {product.artisan_id === 1 ? 'Rajesh Sutradhar' : 
                     product.artisan_id === 2 ? 'Lakshmi Debnath' : 'Amit Pal'}
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="details">
            <TabsList className="w-full border-b justify-start">
              <TabsTrigger value="details" className="text-lg">Details</TabsTrigger>
              <TabsTrigger value="shipping" className="text-lg">Shipping & Returns</TabsTrigger>
              {product.blockchain_verified && (
                <TabsTrigger value="blockchain" className="text-lg">Blockchain Certificate</TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="details" className="py-6">
              <div className="prose max-w-none">
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold mb-4">
                  Product Details
                </h3>
                <p>
                  {product.description}
                </p>
                <h4 className="text-xl font-semibold mt-6 mb-3">
                  Craft Technique
                </h4>
                <p>
                  {product.category_id === 1 && 
                    "Dokra is one of the oldest techniques of metal casting in India using the lost-wax casting process. Each piece is handcrafted with meticulous attention to detail, making every product unique."}
                  {product.category_id === 2 && 
                    "Kantha is a traditional form of embroidery where skilled artisans use a simple running stitch to create elaborate patterns and designs. Each piece represents hours of careful handwork."}
                  {product.category_id === 3 && 
                    "Terracotta crafts involve the use of clay that is fired at low temperatures. Artisans hand-shape and mold each piece before firing it in traditional kilns to achieve the distinctive earthy red color."}
                  {product.category_id === 4 && 
                    "Shitalpati is a specialized mat weaving technique using natural reeds. The weaving process requires great skill and precision, resulting in mats known for their cooling properties in hot weather."}
                </p>
                <h4 className="text-xl font-semibold mt-6 mb-3">
                  Care Instructions
                </h4>
                <ul>
                  {product.category_id === 1 && (
                    <>
                      <li>Clean with a soft, dry cloth</li>
                      <li>Apply metal polish occasionally to maintain shine</li>
                      <li>Store in a dry place away from moisture</li>
                      <li>Avoid using harsh chemicals</li>
                    </>
                  )}
                  {product.category_id === 2 && (
                    <>
                      <li>Hand wash in cold water</li>
                      <li>Do not bleach or use harsh detergents</li>
                      <li>Dry flat in shade</li>
                      <li>Iron on low heat if necessary</li>
                    </>
                  )}
                  {product.category_id === 3 && (
                    <>
                      <li>Dust with a soft, dry cloth</li>
                      <li>Keep away from moisture</li>
                      <li>Handle with care as the material is fragile</li>
                      <li>Do not immerse in water</li>
                    </>
                  )}
                  {product.category_id === 4 && (
                    <>
                      <li>Clean with a damp cloth when needed</li>
                      <li>Allow to dry completely in sunlight</li>
                      <li>Roll instead of folding for storage</li>
                      <li>Keep away from moisture when not in use</li>
                    </>
                  )}
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="py-6">
              <div className="prose max-w-none">
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold mb-4">
                  Shipping Information
                </h3>
                <ul>
                  <li>Free standard shipping on orders over ₹1,000</li>
                  <li>Standard shipping (5-7 business days): ₹100</li>
                  <li>Express shipping (2-3 business days): ₹250</li>
                  <li>International shipping available at checkout</li>
                </ul>
                
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold mt-8 mb-4">
                  Return Policy
                </h3>
                <ul>
                  <li>30-day return policy for unused items in original packaging</li>
                  <li>Buyer responsible for return shipping costs</li>
                  <li>Custom or personalized items cannot be returned</li>
                  <li>Contact customer service for return authorization</li>
                </ul>
              </div>
            </TabsContent>
            
            {product.blockchain_verified && (
              <TabsContent value="blockchain" className="py-6">
                <div className="max-w-2xl mx-auto">
                  <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold mb-6 text-center">
                    Certificate of Authenticity
                  </h3>
                  <BlockchainCertificate 
                    productId={product.blockchain_certificate?.product_id || ""}
                    createdOn={product.blockchain_certificate?.created_on || ""}
                    artisan={product.blockchain_certificate?.artisan || ""}
                    location={product.blockchain_certificate?.location || ""}
                    blockchainId={product.blockchain_certificate?.blockchain_id || ""}
                    productImage={product.image}
                  />
                  <div className="mt-8 text-center">
                    <p>Each blockchain-verified product includes a unique digital certificate that cannot be altered or forged. This certificate confirms the authenticity of your purchase and allows you to trace its journey from the artisan to your home.</p>
                  </div>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
        
        {/* Related Products */}
        {!isLoadingRelated && filteredRelatedProducts?.length > 0 && (
          <div className="mt-16">
            <h2 className="font-['Cormorant_Garamond'] text-2xl font-bold mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredRelatedProducts.map((relatedProduct: any) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
