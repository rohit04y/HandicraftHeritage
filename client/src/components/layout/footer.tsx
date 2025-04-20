import { Link } from "wouter";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Github,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-charcoal)] text-white pt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-[var(--color-terracotta)] flex items-center justify-center mr-3">
                <span className="font-['Caveat'] text-[var(--color-beige)] text-xl">AB</span>
              </div>
              <span className="font-['Cormorant_Garamond'] font-bold text-xl tracking-wide">Artisan Bengal</span>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering artisans through fair trade and sustainable practices 
              while preserving traditional craftsmanship.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook className="w-6 h-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram className="w-6 h-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter className="w-6 h-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Youtube className="w-6 h-6" />
                <span className="sr-only">YouTube</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Github className="w-6 h-6" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
          
          {/* Explore */}
          <div>
            <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/crafts/dokra" className="text-gray-400 hover:text-white transition">Our Crafts</Link>
              </li>
              <li>
                <Link href="/artisans" className="text-gray-400 hover:text-white transition">Meet Artisans</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition">Craft Techniques</Link>
              </li>
              <li>
                <Link href="/about#sustainability" className="text-gray-400 hover:text-white transition">Sustainability</Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition">Blog</Link>
              </li>
              <li>
                <Link href="/virtual-showroom" className="text-gray-400 hover:text-white transition">Virtual Showroom</Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition">Contact Us</Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition">FAQ</Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="text-gray-400 hover:text-white transition">Shipping & Returns</Link>
              </li>
              <li>
                <Link href="/product-care" className="text-gray-400 hover:text-white transition">Product Care</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition">Terms of Service</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                <span className="text-gray-400">
                  123 Craft Lane, Kolkata<br />
                  West Bengal, 700001, India
                </span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                <span className="text-gray-400">contact@artisanbengal.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                <span className="text-gray-400">+91 33 1234 5678</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="font-medium mb-2">Payment Methods</h4>
              <div className="flex space-x-2">
                <div className="w-10 h-6 bg-gray-700 rounded"></div>
                <div className="w-10 h-6 bg-gray-700 rounded"></div>
                <div className="w-10 h-6 bg-gray-700 rounded"></div>
                <div className="w-10 h-6 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="border-t border-gray-700 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">© 2023 Artisan Bengal. All rights reserved.</p>
            <div className="mt-4 sm:mt-0 flex space-x-6">
              <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white">Terms of Service</Link>
              <Link href="/cookies" className="text-sm text-gray-400 hover:text-white">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
