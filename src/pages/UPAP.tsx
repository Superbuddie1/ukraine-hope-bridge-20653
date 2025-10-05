import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Heart, Globe, HandHeart, Award, ExternalLink } from "lucide-react";

const UPAP = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/20 rounded-full px-4 py-2 text-sm font-medium text-accent-foreground mb-4">
            <Heart className="h-4 w-4" />
            Our Partner Organization
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Ukraine Prosthetic Assistance Project
          </h1>
          <p className="text-xl text-muted-foreground">
            Leading the way in providing prosthetic care and support to Ukrainian war victims.
          </p>
        </div>
        
        <div className="space-y-8">
          <section className="bg-card rounded-xl p-8 shadow-sm border border-border">
            <h2 className="text-2xl font-semibold mb-4 text-card-foreground">About UPAP</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Ukraine Prosthetic Assistance Project (UPAP) is a humanitarian initiative dedicated to providing comprehensive prosthetic care and rehabilitation services to Ukrainian citizens affected by war-related amputations. Founded in response to the urgent need for specialized medical support, UPAP works tirelessly to ensure that every Ukrainian amputee has access to quality prosthetic devices and the care needed for successful rehabilitation.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Through partnerships with international medical organizations, local healthcare providers, and government agencies, UPAP has become a cornerstone of support for thousands of individuals seeking to reclaim their independence and quality of life.
            </p>
          </section>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">Global Reach</h3>
              <p className="text-muted-foreground">
                Partnering with international organizations to bring world-class prosthetic technology and expertise to Ukraine.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <HandHeart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">Compassionate Care</h3>
              <p className="text-muted-foreground">
                Providing not just medical services, but emotional and psychological support throughout the recovery journey.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">Expert Network</h3>
              <p className="text-muted-foreground">
                Connecting patients with Ukraine's leading surgeons, prosthetists, and rehabilitation specialists.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">Lifelong Support</h3>
              <p className="text-muted-foreground">
                Offering ongoing care, device maintenance, and support services long after initial fitting.
              </p>
            </div>
          </div>
          
          <section className="bg-gradient-to-br from-primary to-primary-light rounded-xl p-8 shadow-lg text-primary-foreground">
            <h2 className="text-2xl font-semibold mb-4">UPAP Services</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="bg-primary-foreground/20 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                </div>
                <span className="flex-1">Custom prosthetic design and fitting</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary-foreground/20 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                </div>
                <span className="flex-1">Comprehensive rehabilitation programs</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary-foreground/20 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                </div>
                <span className="flex-1">Mental health and counseling services</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary-foreground/20 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                </div>
                <span className="flex-1">Financial assistance and funding navigation</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary-foreground/20 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                </div>
                <span className="flex-1">Community support groups and peer connections</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary-foreground/20 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                </div>
                <span className="flex-1">Vocational training and employment support</span>
              </li>
            </ul>
          </section>
          
          <section className="bg-accent/10 rounded-xl p-8 border border-accent/20">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Get Involved</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              UPAP relies on the support of volunteers, donors, and partner organizations to continue its vital work. Whether through donations, medical expertise, or volunteer time, every contribution helps restore hope and independence to Ukrainian amputees.
            </p>
            <Button variant="accent" className="group">
              Learn More About UPAP
              <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UPAP;
