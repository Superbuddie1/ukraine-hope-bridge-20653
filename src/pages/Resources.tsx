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
  CheckCircle2
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
      
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Link to="/assessment">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Assessment
              </Button>
            </Link>
          </div>
          
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 mb-8 border border-primary/20">
            <div className="flex items-start gap-4">
              <div className="bg-primary rounded-full p-3 shrink-0">
                <CheckCircle2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  Your Personalized Resources
                </h1>
                <p className="text-lg text-muted-foreground">
                  Based on your assessment, we've compiled these resources to support your recovery journey. 
                  All services are available to Ukrainian citizens affected by war-related injuries.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {resources.map((category, idx) => (
            <section key={idx}>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 rounded-full p-2">
                  <category.icon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground">{category.category}</h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, itemIdx) => (
                  <Card 
                    key={itemIdx} 
                    className={`p-6 hover:shadow-lg transition-shadow ${
                      item.urgent ? 'border-accent border-2 bg-accent/5' : ''
                    }`}
                  >
                    {item.urgent && (
                      <div className="bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded-full inline-block mb-3">
                        Recommended Priority
                      </div>
                    )}
                    
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {item.description}
                    </p>
                    
                    {item.contact && (
                      <div className="flex items-center gap-2 text-sm text-primary mb-4">
                        <Phone className="h-4 w-4" />
                        <span>{item.contact}</span>
                      </div>
                    )}
                    
                    <Button 
                      variant={item.urgent ? "accent" : "outline"} 
                      size="sm" 
                      className="w-full group"
                    >
                      {item.action}
                      <ExternalLink className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 bg-card rounded-xl p-8 border border-border">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 rounded-full p-3 shrink-0">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-3 text-card-foreground">Next Steps</h2>
              <ol className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="font-semibold text-primary">1.</span>
                  <span>Review the resources marked as priority based on your assessment</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-primary">2.</span>
                  <span>Contact the government funding programs if you haven't already applied</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-primary">3.</span>
                  <span>Schedule consultations with specialized medical facilities</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-primary">4.</span>
                  <span>Connect with support groups for emotional and practical guidance</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-primary">5.</span>
                  <span>Save this page or take notes - you can return to your assessment anytime</span>
                </li>
              </ol>
              
              <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
                <p className="text-sm text-foreground">
                  <strong>Need help navigating these resources?</strong> Contact the UPAP Support Hotline at 
                  <span className="text-primary font-semibold"> +380 XXX XXX XXXX</span> for personalized guidance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
