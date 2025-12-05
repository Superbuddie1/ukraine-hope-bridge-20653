import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RoadmapSectionComponent from "@/components/RoadmapSection";
import ProstheticOptions from "@/components/ProstheticOptions";
import ExportPDF from "@/components/ExportPDF";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { 
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles
} from "lucide-react";
import { AssessmentData, PersonalizedRoadmap, generatePersonalizedRoadmap } from "@/lib/assessmentLogic";

const Resources = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const [roadmap, setRoadmap] = useState<PersonalizedRoadmap | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRoadmap = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Try to load from database first
        const { data: roadmapData } = await supabase
          .from("user_roadmaps")
          .select("roadmap_data")
          .eq("user_id", user.id)
          .maybeSingle();

        if (roadmapData?.roadmap_data) {
          setRoadmap(roadmapData.roadmap_data as unknown as PersonalizedRoadmap);
          
          // Also fetch survey data for context
          const { data: surveyData } = await supabase
            .from("user_surveys")
            .select("*")
            .eq("user_id", user.id)
            .maybeSingle();

          if (surveyData) {
            setAssessmentData({
              injuryTime: surveyData.injury_timing,
              injurySeverity: surveyData.amputation_level,
              injuryLocation: surveyData.limb_location,
              governmentFunding: surveyData.government_funding,
              additionalInfo: surveyData.additional_info || "",
            });
          }
        } else {
          // Fallback to sessionStorage
          const storedData = sessionStorage.getItem("assessmentData");
          if (storedData) {
            const data: AssessmentData = JSON.parse(storedData);
            setAssessmentData(data);
            setRoadmap(generatePersonalizedRoadmap(data));
          }
        }
      } catch (error) {
        console.error("Error loading roadmap:", error);
        // Fallback to sessionStorage on error
        const storedData = sessionStorage.getItem("assessmentData");
        if (storedData) {
          const data: AssessmentData = JSON.parse(storedData);
          setAssessmentData(data);
          setRoadmap(generatePersonalizedRoadmap(data));
        }
      } finally {
        setLoading(false);
      }
    };

    loadRoadmap();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  // If no assessment data, show prompt to take assessment
  if (!assessmentData || !roadmap) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-12 border border-primary/20">
            <AlertTriangle className="h-16 w-16 text-accent mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Complete Your Assessment First
            </h1>
            <p className="text-muted-foreground mb-8">
              To generate your personalized recovery roadmap, please complete the assessment survey.
            </p>
            <Button onClick={() => navigate('/assessment')} size="lg">
              Start Assessment
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const urgencyConfig = {
    critical: { 
      label: 'Critical Priority', 
      className: 'bg-destructive text-destructive-foreground',
      icon: AlertTriangle,
      description: 'Immediate action required'
    },
    high: { 
      label: 'High Priority', 
      className: 'bg-accent text-accent-foreground',
      icon: Clock,
      description: 'Act within this week'
    },
    moderate: { 
      label: 'Moderate Priority', 
      className: 'bg-primary text-primary-foreground',
      icon: Sparkles,
      description: 'Steady progress recommended'
    },
    stable: { 
      label: 'On Track', 
      className: 'bg-primary/80 text-primary-foreground',
      icon: CheckCircle2,
      description: 'Continue your journey'
    },
  };

  const urgencyInfo = urgencyConfig[roadmap.urgencyLevel];
  const UrgencyIcon = urgencyInfo.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
            <Link to="/assessment">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retake Assessment
              </Button>
            </Link>
            <ExportPDF roadmap={roadmap} />
          </div>
          
          {/* Hero Card */}
          <Card className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 rounded-2xl p-8 border-2 border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
            
            <div className="flex items-start gap-4 relative z-10">
              <div className="bg-gradient-to-br from-primary to-accent rounded-full p-4 shrink-0 shadow-xl">
                <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap mb-3">
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                    Your Recovery Roadmap
                  </h1>
                  <Badge className={`${urgencyInfo.className} flex items-center gap-1.5`}>
                    <UrgencyIcon className="h-3.5 w-3.5" />
                    {urgencyInfo.label}
                  </Badge>
                </div>
                <p className="text-lg text-muted-foreground mb-4">
                  {roadmap.summary}
                </p>
                <p className="text-sm text-muted-foreground italic">
                  {roadmap.summaryUa}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Prosthetic Options */}
        <div className="mb-12">
          <ProstheticOptions 
            options={roadmap.prostheticOptions} 
            timeline={roadmap.estimatedTimeline} 
          />
        </div>

        {/* Roadmap Steps */}
        <div className="relative">
          {/* Central vertical line - Desktop */}
          <div className="absolute left-1/2 top-8 bottom-8 w-1 hidden md:block transform -translate-x-1/2">
            {roadmap.sections.map((_, idx) => (
              <div 
                key={idx}
                className={`h-[calc(100%/${roadmap.sections.length})] ${idx % 2 === 0 ? 'bg-primary' : 'bg-accent'}`}
              />
            ))}
          </div>
          
          <div className="space-y-12">
            {roadmap.sections.map((section, idx) => (
              <RoadmapSectionComponent
                key={section.id}
                section={section}
                index={idx}
              />
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16">
          <Card className="bg-gradient-to-br from-accent/10 via-primary/10 to-accent/10 rounded-2xl p-8 border-2 border-accent shadow-2xl">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Need Help Getting Started?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Our support team is available 24/7 to guide you through the process. 
                Don't navigate this journey alone.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="gap-2">
                  <span className="text-lg">📞</span>
                  Call Support: +380 800 500 335
                </Button>
                <ExportPDF roadmap={roadmap} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Resources;
