import Navigation from "@/components/Navigation";
import { Compass, Users, BookOpen, Shield } from "lucide-react";
import harleyPhoto from "@/assets/harley.jpeg";
import victorPhoto from "@/assets/victor.jpeg";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        {/* Opening */}
        <section className="mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
            About This Project
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We began this project with a simple thought, that thousands of amputees in Ukraine have to face a fragmented and overwhelming mass of resources to achieve funding and rehabilitation. The information does exist scattered across government portals, NGO websites, and clinical networks, however accessing it requires a lot of time, language fluency, and institutional knowledge which most can't obtain. This project is something that helps bridge the gap.
          </p>
        </section>

        {/* Founders */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Who We Are</h2>
          
          {/* Founder Photos */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-6">
            <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-border">
              <img 
                src={harleyPhoto} 
                alt="Harley Thorpe" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-border">
              <img 
                src={victorPhoto} 
                alt="Victor Pivtoran" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground italic mb-8">
            Harley Thorpe and Victor Pivtoran, two Computer Science students at Western University devoted to make a positive impact.
          </p>
          
          <p className="text-muted-foreground leading-relaxed mb-4">
            Although we don't have special expertise in prosthetics, we knew our technical skills would suffice. We have a background in building projects: programming, designing systems, precise planning, troubleshooting, and teamwork. This project is what pushed us to use these skills to the max, while ensuring our goals align with the Protez Foundation.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We don't pretend to have all the answers. What we do is fully commit to learning to those who know more than we do, and build tools that actually end up being useful.
          </p>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-6">What Guides Us</h2>
          <div className="grid gap-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 rounded-full p-3 shrink-0">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Responsibility</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Technical skills come with obligations. When you build something that people rely on, 
                  especially vulnerable people, you take on a duty to get things right — to be accurate, 
                  to be careful, to think through consequences.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 rounded-full p-3 shrink-0">
                <Compass className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Transparency</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We are students, not medical professionals. This platform provides information and 
                  guidance, not clinical advice. We try to be clear about what we know, what we don't, 
                  and where our information comes from.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 rounded-full p-3 shrink-0">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Learning</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  This project is built on the assumption that we will always have more to learn. Every 
                  conversation with a clinician, every piece of user feedback, every failed approach 
                  teaches us something. We try to build that humility into how we work.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 rounded-full p-3 shrink-0">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Respect</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  The communities and experts who have been working on these problems for years know 
                  far more than we do. Our role is to support their work, not to replace it — to build 
                  tools that complement existing efforts, not compete with them.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="border-t border-border pt-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Looking Forward</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            This is a long-term project. We expect to be working on it for years, not months. The 
            platform will evolve as we learn more, as the situation in Ukraine changes, and as we 
            receive feedback from the people who actually use it.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            If you're a clinician, rehabilitation specialist, or someone with lived experience who 
            would like to contribute your expertise, we would be grateful to hear from you. If you're 
            a researcher, developer, or designer interested in collaborating, we're open to that as 
            well. And if you simply want to follow our progress, you're welcome to do so. We'll keep 
            building.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
