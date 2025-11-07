import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Heart, ArrowRight, Shield, Users, HeartHandshake } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 text-sm font-medium text-primary mb-4">
              <Heart className="h-4 w-4" />
              Supporting Ukraine's Heroes
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Connecting Ukrainian Amputees with{" "}
              <span className="text-primary">Essential Support</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Navigate government funding, connect with specialized surgeons, and access comprehensive resources for prosthetic care and rehabilitation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link to="/assessment">
                <Button variant="hero" size="lg" className="group">
                  Get Started
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-border">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">Government Funding</h3>
              <p className="text-muted-foreground">
                Find and navigate available government programs and funding opportunities for prosthetic care.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-border">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">Specialized Surgeons</h3>
              <p className="text-muted-foreground">
                Connect with experienced Ukrainian surgeons specializing in amputation care and prosthetic fitting.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-border">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <HeartHandshake className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">Comprehensive Support</h3>
              <p className="text-muted-foreground">
                Access resources for rehabilitation, mental health support, and community connections.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary to-primary-light rounded-2xl p-12 shadow-lg text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Take the First Step Towards Recovery
            </h2>
            <p className="text-lg mb-8 opacity-95">
              Our personalized assessment will help identify the resources and support services that best match your needs.
            </p>
            <Link to="/assessment">
              <Button variant="accent" size="lg" className="group">
                Start Your Assessment
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-border py-8 bg-secondary/20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="mb-2">© 2025 Ukraine aid in prosthetics. Supporting Ukraine's heroes.</p>
          <p className="text-sm">In partnership with Ukraine Prosthetic Assistance Project (UPAP)</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
