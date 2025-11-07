import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  FileText, 
  Users, 
  Heart, 
  Phone, 
  Building2, 
  Stethoscope,
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  MapPin
} from "lucide-react";

interface AssessmentData {
  injuryTime: string;
  injurySeverity: string;
  injuryLocation: string;
  governmentFunding: string;
  additionalInfo: string;
}

const Resources = () => {
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem("assessmentData");
    if (storedData) {
      setAssessmentData(JSON.parse(storedData));
    }
  }, []);

  const resources = [
    {
      category: "Government Funding Programs",
      icon: Building2,
      items: [
        {
          title: "Ukrainian War Veterans Support Fund",
          description: "Primary government funding for prosthetic devices and rehabilitation services for war-related injuries.",
          action: "Apply Now",
          urgent: assessmentData?.governmentFunding === "none" || assessmentData?.governmentFunding === "unsure",
        },
        {
          title: "Ministry of Health Prosthetic Program",
          description: "Covers costs for custom prosthetic fittings, adjustments, and ongoing maintenance.",
          action: "Learn More",
        },
        {
          title: "Disability Support Assistance",
          description: "Monthly financial support for individuals with permanent disabilities from military service.",
          action: "Check Eligibility",
        },
      ],
    },
    {
      category: "Specialized Medical Care",
      icon: Stethoscope,
      items: [
        {
          title: "National Prosthetic Center - Kyiv",
          description: "Leading facility with specialists in amputation care, prosthetic fitting, and rehabilitation.",
          contact: "+380 44 XXX XXXX",
          action: "Contact",
          urgent: assessmentData?.injuryTime === "less-3-months",
        },
        {
          title: "Lviv Regional Rehabilitation Hospital",
          description: "Comprehensive rehabilitation programs with physical therapy and occupational therapy.",
          contact: "+380 32 XXX XXXX",
          action: "Contact",
        },
        {
          title: "Specialized Surgeons Network",
          description: "Connect with experienced surgeons throughout Ukraine specializing in revision surgery and prosthetic preparation.",
          action: "View Directory",
        },
      ],
    },
    {
      category: "Support Services",
      icon: Heart,
      items: [
        {
          title: "UPAP Support Hotline",
          description: "24/7 support line for questions about prosthetics, funding, and emotional support.",
          contact: "+380 XXX XXX XXXX",
          action: "Call Now",
        },
        {
          title: "War Veterans Support Groups",
          description: "Connect with others who understand your journey. Weekly meetings in major cities.",
          action: "Find a Group",
        },
        {
          title: "Mental Health Counseling",
          description: "Professional psychological support specializing in trauma and adjustment to amputation.",
          action: "Schedule Session",
        },
      ],
    },
    {
      category: "Community Resources",
      icon: Users,
      items: [
        {
          title: "Peer Mentorship Program",
          description: "Connect with amputees who have successfully adapted to life with prosthetics.",
          action: "Get Matched",
        },
        {
          title: "Vocational Training Services",
          description: "Programs to help you return to work or learn new skills adapted to your abilities.",
          action: "Explore Programs",
        },
        {
          title: "Family Support Resources",
          description: "Resources and guidance for family members supporting a loved one through recovery.",
          action: "Access Resources",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Link to="/assessment">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Assessment
              </Button>
            </Link>
          </div>
          
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 mb-8 border border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
            <div className="flex items-start gap-4 relative z-10">
              <div className="bg-primary rounded-full p-3 shrink-0 shadow-lg">
                <CheckCircle2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  Your Recovery Roadmap
                </h1>
                <p className="text-lg text-muted-foreground">
                  Follow this personalized pathway to access support, funding, and care. Each step brings you closer to your goals.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap Steps */}
        <div className="relative">
          {/* Central vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary hidden md:block transform -translate-x-1/2" />
          
          <div className="space-y-16">
            {resources.map((category, idx) => {
              const isEven = idx % 2 === 0;
              const StepIcon = category.icon;
              const bgColor = idx % 2 === 0 ? 'bg-primary' : 'bg-accent';
              const borderColor = idx % 2 === 0 ? 'border-primary' : 'border-accent';
              const textColor = idx % 2 === 0 ? 'text-primary' : 'text-accent';
              
              return (
                <div key={idx} className="relative">
                  {/* Step Number Circle */}
                  <div className={`absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-4 z-20 hidden md:block`}>
                    <div className={`${bgColor} rounded-full p-6 shadow-2xl border-4 border-background`}>
                      <div className="relative">
                        <StepIcon className="h-8 w-8 text-primary-foreground" />
                        <div className="absolute -top-2 -right-2 bg-background rounded-full w-6 h-6 flex items-center justify-center border-2 border-current">
                          <span className="text-xs font-bold">{idx + 1}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className={`md:w-[calc(50%-4rem)] ${isEven ? 'md:ml-0 md:mr-auto md:pr-16' : 'md:ml-auto md:mr-0 md:pl-16'}`}>
                    <div className={`bg-gradient-to-br ${isEven ? 'from-primary/5 to-primary/10' : 'from-accent/5 to-accent/10'} rounded-2xl p-6 border-2 ${borderColor} shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]`}>
                      {/* Mobile step icon */}
                      <div className="md:hidden flex items-center gap-3 mb-4">
                        <div className={`${bgColor} rounded-full p-3`}>
                          <StepIcon className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <span className={`text-2xl font-bold ${textColor}`}>Step {idx + 1}</span>
                      </div>

                      <h2 className={`text-2xl font-bold mb-6 ${textColor} flex items-center gap-2`}>
                        <MapPin className="h-6 w-6" />
                        {category.category}
                      </h2>
                      
                      <div className="space-y-4">
                        {category.items.map((item, itemIdx) => (
                          <Card 
                            key={itemIdx} 
                            className={`p-5 hover:shadow-lg transition-all duration-300 border-2 hover:border-current ${
                              item.urgent ? `border-accent bg-accent/10` : 'border-border/50 bg-card/50'
                            } backdrop-blur-sm hover:-translate-y-1`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                {item.urgent && (
                                  <div className="bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full inline-flex items-center gap-1 mb-3 shadow-md">
                                    <CheckCircle2 className="h-3 w-3" />
                                    Priority Action
                                  </div>
                                )}
                                
                                <h3 className="text-lg font-bold text-card-foreground mb-2 flex items-center gap-2">
                                  {item.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                  {item.description}
                                </p>
                                
                                {item.contact && (
                                  <div className={`flex items-center gap-2 text-sm ${textColor} font-semibold mb-4 bg-background/50 rounded-lg px-3 py-2`}>
                                    <Phone className="h-4 w-4" />
                                    <span>{item.contact}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <Button 
                              variant={item.urgent ? "default" : "outline"} 
                              size="sm" 
                              className={`w-full group mt-2 font-semibold ${item.urgent ? bgColor : ''}`}
                            >
                              {item.action}
                              <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Final Step - Next Actions */}
        <div className="mt-20 relative">
          <div className="absolute left-1/2 -top-16 transform -translate-x-1/2 z-20 hidden md:block">
            <div className="bg-gradient-to-br from-primary to-accent rounded-full p-6 shadow-2xl border-4 border-background animate-pulse">
              <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>

          <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 border-2 border-primary shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-primary to-accent rounded-full p-3 shrink-0 shadow-lg">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-6 text-foreground">Ready to Begin? 🎯</h2>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {[
                    "Start with priority items marked above",
                    "Apply for government funding programs",
                    "Schedule medical consultations",
                    "Connect with support groups",
                    "Bookmark this roadmap for reference"
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3 bg-background/50 rounded-lg p-4 backdrop-blur-sm hover:shadow-md transition-shadow">
                      <div className={`${i % 2 === 0 ? 'bg-primary' : 'bg-accent'} rounded-full w-8 h-8 flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0`}>
                        {i + 1}
                      </div>
                      <span className="text-sm text-foreground font-medium pt-1">{step}</span>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gradient-to-r from-accent/20 to-primary/20 rounded-xl p-6 border-2 border-accent/30 shadow-lg">
                  <p className="text-foreground font-semibold mb-2 text-lg">
                    📞 Need Guidance?
                  </p>
                  <p className="text-muted-foreground">
                    Contact the UPAP Support Hotline at{' '}
                    <span className="text-primary font-bold text-lg">+380 XXX XXX XXXX</span>
                    {' '}for personalized assistance on your journey.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Resources;
