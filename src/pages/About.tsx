import Navigation from "@/components/Navigation";
import { Heart, Target, Eye, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 text-sm font-medium text-primary mb-4">
            <Heart className="h-4 w-4" />
            About Our Mission
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Supporting Ukraine's Heroes
          </h1>
          <p className="text-xl text-muted-foreground">
            Dedicated to helping Ukrainian amputees access the care and support they deserve.
          </p>
        </div>
        
        <div className="space-y-12">
          <section className="bg-card rounded-xl p-8 shadow-sm border border-border">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-primary/10 rounded-full p-3 shrink-0">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3 text-card-foreground">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We are committed to providing comprehensive support and resources to Ukrainian citizens who have experienced limb loss due to the ongoing conflict. Our platform serves as a bridge, connecting those in need with essential medical services, government funding programs, and rehabilitation resources.
                </p>
              </div>
            </div>
          </section>
          
          <section className="bg-card rounded-xl p-8 shadow-sm border border-border">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-primary/10 rounded-full p-3 shrink-0">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3 text-card-foreground">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We envision a Ukraine where every person affected by war-related amputations has seamless access to quality prosthetic care, rehabilitation services, and the support needed to rebuild their lives with dignity and independence.
                </p>
              </div>
            </div>
          </section>
          
          <section className="bg-card rounded-xl p-8 shadow-sm border border-border">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-primary/10 rounded-full p-3 shrink-0">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3 text-card-foreground">What We Do</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">Personalized Assessment</h3>
                    <p className="leading-relaxed">
                      Our comprehensive assessment tool helps identify your specific needs, eligibility for funding programs, and the most appropriate resources for your situation.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">Resource Connection</h3>
                    <p className="leading-relaxed">
                      We connect you with specialized surgeons, prosthetic specialists, rehabilitation centers, and mental health professionals throughout Ukraine.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">Funding Guidance</h3>
                    <p className="leading-relaxed">
                      Navigate the complex landscape of government funding programs, international aid organizations, and assistance initiatives designed to support your recovery.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">Ongoing Support</h3>
                    <p className="leading-relaxed">
                      Access information about support groups, community resources, and ongoing care options to help you through every stage of your journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-8 border border-border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Our Commitment</h2>
            <p className="text-muted-foreground leading-relaxed">
              Every person who comes to us is treated with the utmost respect and compassion. We understand that each situation is unique, and we are dedicated to providing personalized, culturally sensitive support that honors the courage and resilience of Ukraine's people. Your recovery and well-being are our top priorities.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
