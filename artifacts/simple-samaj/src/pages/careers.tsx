import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users, Briefcase, Sparkles } from "lucide-react";

export default function Careers() {
  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-primary/5 py-16 md:py-24 border-b border-primary/10">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Clock className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
              Careers at <span className="text-primary">Simple Samaj</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're building something amazing and can't wait to share exciting opportunities with talented individuals who want to make a difference.
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl mb-4">Coming Soon!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg text-muted-foreground">
                  We're currently focused on helping professionals find their dream jobs. Our own team expansion is just around the corner!
                </p>

                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Join Our Mission</h3>
                    <p className="text-sm text-muted-foreground">
                      Be part of a team that's transforming career opportunities for professionals.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Exciting Roles</h3>
                    <p className="text-sm text-muted-foreground">
                      From tech roles to business development, we'll have positions for various skill sets.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Sparkles className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Make an Impact</h3>
                    <p className="text-sm text-muted-foreground">
                      Work on projects that directly improve career prospects for thousands of professionals.
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-primary/5 rounded-lg">
                  <h3 className="font-semibold mb-2">Stay Updated</h3>
                  <p className="text-muted-foreground mb-4">
                    Want to be the first to know when we open positions? Follow us on social media or check back soon!
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button variant="outline" size="sm">
                      Follow on LinkedIn
                    </Button>
                    <Button variant="outline" size="sm">
                      Follow on Instagram
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Meanwhile, Find Your Dream Job!</h2>
          <p className="text-lg mb-8 opacity-90">
            While you wait for our team to grow, let us help you find the perfect career opportunity.
          </p>
          <Button size="lg" variant="secondary" className="px-8" asChild>
            <Link href="/">Browse Available Jobs</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}