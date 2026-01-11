import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
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
  Sparkles,
  MapPin
} from "lucide-react";
import { PersonalizedRoadmap, generatePersonalizedRoadmap } from "@/lib/assessmentLogic";
import { AssessmentData } from "@/pages/Assessment";

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: roadmapData } = await (supabase as any)
          .from("user_roadmaps")
          .select("roadmap_data")
          .eq("user_id", user.id)
          .maybeSingle();

        if (roadmapData?.roadmap_data) {
          setRoadmap(roadmapData.roadmap_data as unknown as PersonalizedRoadmap);
          
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { data: surveyData } = await (supabase as any)
            .from("user_surveys")
            .select("*")
            .eq("user_id", user.id)
            .maybeSingle();

          if (surveyData) {
            setAssessmentData({
              status: surveyData.government_funding,
              preSurgery: '',
              amputationType: surveyData.limb_location,
              amputationLevel: surveyData.amputation_level,
              currentStage: surveyData.injury_timing,
              additionalInfo: surveyData.additional_info || "",
              region: surveyData.region || "",
            });
          }
        } else {
          const storedData = sessionStorage.getItem("assessmentData");
          if (storedData) {
            const data: AssessmentData = JSON.parse(storedData);
            setAssessmentData(data);
            setRoadmap(generatePersonalizedRoadmap(data));
          }
        }
      } catch (error) {
        console.error("Error loading roadmap:", error);
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
        <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-6 text-muted-foreground">Loading your roadmap...</p>
        </div>
      </div>
    );
  }

  if (!assessmentData || !roadmap) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-24 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 mb-8">
              <AlertTriangle className="h-10 w-10 text-accent" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Complete Your Assessment First
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              To generate your personalized recovery roadmap, please complete the assessment survey.
            </p>
            <Button onClick={() => navigate('/assessment')} size="lg" className="px-8">
              Start Assessment
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  const urgencyConfig = {
    critical: { 
      label: 'Critical Priority', 
      className: 'bg-destructive text-destructive-foreground',
      icon: AlertTriangle,
    },
    high: { 
      label: 'High Priority', 
      className: 'bg-accent text-accent-foreground',
      icon: Clock,
    },
    moderate: { 
      label: 'On Track', 
      className: 'bg-primary text-primary-foreground',
      icon: Sparkles,
    },
    stable: { 
      label: 'Good Progress', 
      className: 'bg-primary/80 text-primary-foreground',
      icon: CheckCircle2,
    },
  };

  const urgencyInfo = urgencyConfig[roadmap.urgencyLevel];
  const UrgencyIcon = urgencyInfo.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        {/* Navigation Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between gap-4 mb-8"
        >
          <Link to="/assessment">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Retake Assessment</span>
            </Button>
          </Link>
          <ExportPDF roadmap={roadmap} />
        </motion.div>
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-12"
        >
          {/* Decorative gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 rounded-3xl blur-xl" />
          
          <div className="relative bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 p-6 md:p-10 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              {/* Status badge */}
              <div className="flex items-center gap-3 mb-6">
                <Badge className={`${urgencyInfo.className} gap-1.5 px-3 py-1`}>
                  <UrgencyIcon className="h-3.5 w-3.5" />
                  {urgencyInfo.label}
                </Badge>
                {assessmentData.region && (
                  <Badge variant="outline" className="gap-1.5 px-3 py-1 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {assessmentData.region.charAt(0).toUpperCase() + assessmentData.region.slice(1)} Oblast
                  </Badge>
                )}
              </div>
              
              {/* Main heading */}
              <div className="flex items-start gap-5">
                <div className="hidden md:flex shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 items-center justify-center shadow-lg">
                  <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
                    Your Recovery Roadmap
                  </h1>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
                    {roadmap.summary}
                  </p>
                  {roadmap.summaryUa && (
                    <p className="text-sm text-muted-foreground/70 italic">
                      {roadmap.summaryUa}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Quick stats - simplified */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-border/50">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">{roadmap.sections.length}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Sections</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    {roadmap.sections.reduce((acc, s) => acc + s.recommendations.length, 0)}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">Resources Available</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Prosthetic Options */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <ProstheticOptions options={roadmap.prostheticOptions} />
        </motion.div>

        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-10"
        >
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">Your Personalized Journey</h2>
          <p className="text-muted-foreground">Follow these steps to navigate your recovery</p>
        </motion.div>

        {/* Roadmap Steps */}
        <div className="relative">
          {/* Central vertical line - Desktop - Blue to Black to Yellow gradient */}
          <div className="absolute left-1/2 top-8 bottom-8 w-0.5 hidden md:block transform -translate-x-1/2 bg-gradient-to-b from-primary via-foreground to-accent" />
          
          <div className="space-y-8 md:space-y-12">
            {roadmap.sections.map((section, idx) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
              >
                <RoadmapSectionComponent
                  section={section}
                  index={idx}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* PDF Export CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 mb-8 flex justify-center"
        >
          <ExportPDF roadmap={roadmap} />
        </motion.div>
      </div>
    </div>
  );
};

export default Resources;
