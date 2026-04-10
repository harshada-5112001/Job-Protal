import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Briefcase, CheckCircle } from "lucide-react";

const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name is too long"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name is too long"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Subject is required").max(100, "Subject is too long"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message is too long"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const getApiBaseUrl = () =>
  import.meta.env.VITE_API_BASE_URL ??
  (import.meta.env.DEV ? "http://localhost:8080" : "");

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`${getApiBaseUrl()}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.error ?? response.statusText;

        // Provide user-friendly error messages
        let userFriendlyMessage = "Something went wrong. Please try again.";
        if (response.status === 400) {
          userFriendlyMessage = "Please check your information and try again.";
        } else if (response.status === 500) {
          userFriendlyMessage = "Server error. Please try again later.";
        }

        throw new Error(userFriendlyMessage);
      }

      form.reset();

      toast({
        title: "Message sent successfully!",
        description: "Your inquiry has been submitted. We'll get back to you within 24 hours.",
      });
    } catch (error) {
      toast({
        title: "Unable to send message",
        description: error instanceof Error ? error.message : "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-primary/5 py-16 md:py-24 border-b border-primary/10">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
            Contact <span className="text-primary">Us</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Get in touch with our team. We're here to help you with your career journey and answer any questions you may have.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Contact Form */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">Send us a Message</h2>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        We'd love to hear from you
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your first name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your last name" {...field} />
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
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="How can we help you?" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us more about your inquiry..."
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button className="w-full" size="lg" type="submit" disabled={isSubmitting}>
                        <Send className="h-4 w-4 mr-2" />
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </CardContent>
                  </Card>
                </form>
              </Form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">Get in Touch</h2>
                </div>
                <p className="text-muted-foreground mb-8">
                  Have questions about our services, need career advice, or want to partner with us?
                  Reach out through any of the channels below.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email Us</h3>
                        <p className="text-muted-foreground mb-2">Send us an email and we'll respond within 24 hours.</p>
                        <a href="mailto:support@simplesamaj.in" className="text-primary hover:underline font-medium">
                          support@simplesamaj.in
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Call Us</h3>
                        <p className="text-muted-foreground mb-2">Speak directly with our career advisors.</p>
                        <a href="tel:+919876543210" className="text-primary hover:underline font-medium">
                          +91 98765 43210
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Visit Us</h3>
                        <p className="text-muted-foreground mb-2">Our office locations across Maharashtra.</p>
                        <div className="text-sm space-y-1">
                          <p className="font-medium">Pune: FC Road, Pune - 411005</p>
                          <p className="font-medium">Mumbai: Bandra West, Mumbai - 400050</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Business Hours</h3>
                        <p className="text-muted-foreground mb-2">When you can reach us for support.</p>
                        <div className="text-sm space-y-1">
                          <p><span className="font-medium">Monday - Friday:</span> 9:00 AM - 6:00 PM</p>
                          <p><span className="font-medium">Saturday:</span> 10:00 AM - 4:00 PM</p>
                          <p><span className="font-medium">Sunday:</span> Closed</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
              </div>
              <p className="text-muted-foreground">
                Find answers to common questions about our services and how we can help you.
              </p>
            </div>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="response-time">
                    <AccordionTrigger className="text-left">
                      How quickly do you respond to inquiries?
                    </AccordionTrigger>
                    <AccordionContent>
                      We aim to respond to all inquiries within 24 hours during business days.
                      For urgent matters, we recommend calling us directly at +91 98765 43210.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="career-counseling">
                    <AccordionTrigger className="text-left">
                      Do you provide career counseling?
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes, our career advisors offer free initial consultations to help you plan your career path.
                      We provide personalized guidance on resume building, interview preparation, and job search strategies.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="employer-contact">
                    <AccordionTrigger className="text-left">
                      Can employers contact you directly?
                    </AccordionTrigger>
                    <AccordionContent>
                      Absolutely! We welcome partnerships with companies looking to hire talented professionals.
                      Employers can reach out to discuss job postings, recruitment services, or partnership opportunities.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="job-search">
                    <AccordionTrigger className="text-left">
                      How can I search for jobs on your platform?
                    </AccordionTrigger>
                    <AccordionContent>
                      You can browse our job listings by category, location, or company. Use our advanced filters
                      to find jobs that match your skills and preferences. Create a profile to get personalized job recommendations.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="account-support">
                    <AccordionTrigger className="text-left">
                      What if I need help with my account?
                    </AccordionTrigger>
                    <AccordionContent>
                      For account-related issues, password resets, or profile updates, please contact our support team
                      via email at support@simplesamaj.in or call us during business hours. We're here to help!
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}