import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const newsletterSchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  preferences: z.boolean().optional(),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

export default function Newsletter() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      preferences: false,
    },
  });
  
  const onSubmit = async (data: NewsletterFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/newsletter/subscribe", {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        preferences: data.preferences ? "sustainability" : undefined,
      });
      
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for joining our artisan community.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "There was an error processing your subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className="py-20 bg-cover bg-center relative" style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80')"
    }}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white/95 rounded-lg p-8 md:p-12 backdrop-blur-sm shadow-xl">
          <div className="text-center mb-8">
            <h2 className="font-['Cormorant_Garamond'] text-3xl font-bold mb-4">
              Join Our Artisan Community
            </h2>
            <p className="text-[var(--color-charcoal)]/70">
              Subscribe to receive updates on new collections, artisan stories, and exclusive offers.
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="preferences"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I'm interested in receiving updates about sustainable practices and artisan welfare initiatives.
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-[var(--color-terracotta)] hover:bg-[var(--color-terracotta)]/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
              
              <div className="mt-6 text-center text-sm text-[var(--color-charcoal)]/70">
                By subscribing, you agree to our{" "}
                <Link href="/privacy-policy">
                  <a className="underline text-[var(--color-terracotta)]">Privacy Policy</a>
                </Link>
                {" "}and{" "}
                <Link href="/terms">
                  <a className="underline text-[var(--color-terracotta)]">Terms of Service</a>
                </Link>.
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
