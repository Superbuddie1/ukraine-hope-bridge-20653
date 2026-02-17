import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import RoadmapSectionComponent from "@/components/RoadmapSection";
import ExportPDF from "@/components/ExportPDF";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  MapPin,
  Layers,
  BookOpen,
  Download,
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
            <div className="w-16 h-16 border-4 border-primary/20 rounded-full" />
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
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
      className: 'bg-destructive/10 text-destructive border border-destructive/20',
      icon: AlertTriangle,
    },
    high: {
      label: 'High Priority',
      className: 'bg-accent/10 text-accent-foreground border border-accent/30',
      icon: Clock,
    },
    moderate: {
      label: 'On Track',
      className: 'bg-teal/10 text-teal border border-teal/20',
      icon: Sparkles,
    },
    stable: {
      label: 'Good Progress',
      className: 'bg-primary/10 text-primary border border-primary/20',
      icon: CheckCircle2,
    },
  };

  const urgencyInfo = urgencyConfig[roadmap.urgencyLevel];
  const UrgencyIcon = urgencyInfo.icon;

  const totalResources = roadmap.sections.reduce((acc, s) => acc + s.recommendations.length, 0);
  const totalSteps = roadmap.sections.reduce((acc, s) => acc + (s.steps?.length || 0), 0);

  return (
    <div className="min-h-screen bg-secondary/30">
      <Navigation />

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        {/* Top bar */}
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

        {/* ───── HERO SECTION ───── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-14"
        >
          {/* Soft abstract shapes */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-teal/5 blur-3xl pointer-events-none" />

          <div className="relative rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-8 md:p-10 overflow-hidden shadow-[var(--shadow-soft)]">
            {/* Gradient strip at top */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-teal to-accent" />

            <div className="relative z-10 space-y-6">
              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-3">
                <Badge className={`${urgencyInfo.className} gap-1.5 px-3 py-1.5 text-xs font-medium`}>
                  <UrgencyIcon className="h-3.5 w-3.5" />
                  {urgencyInfo.label}
                </Badge>
                {assessmentData.region && (
                  <Badge variant="outline" className="gap-1.5 px-3 py-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {assessmentData.region.charAt(0).toUpperCase() + assessmentData.region.slice(1)} Oblast
                  </Badge>
                )}
              </div>

              {/* Title + summary */}
              <div className="max-w-2xl space-y-3">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight tracking-tight">
                  Your Recovery Roadmap
                </h1>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {roadmap.summary}
                </p>
                {roadmap.summaryUa && (
                  <p className="text-sm text-muted-foreground/60 italic">{roadmap.summaryUa}</p>
                )}
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                <StatCard icon={Layers} label="Sections" value={roadmap.sections.length} color="primary" />
                <StatCard icon={BookOpen} label="Resources" value={totalResources} color="teal" />
                <StatCard icon={CheckCircle2} label="Action Steps" value={totalSteps} color="accent" className="col-span-2 sm:col-span-1" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ───── JOURNEY HEADER ───── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-center mb-12"
        >
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">Your Personalized Journey</h2>
          <p className="text-muted-foreground text-sm md:text-base">Follow these steps to navigate your recovery</p>
        </motion.div>

        {/* ───── TIMELINE ───── */}
        <div className="relative">
          {/* Thick gradient timeline – Desktop */}
          <div className="absolute left-1/2 top-8 bottom-8 w-1 hidden md:block -translate-x-1/2 rounded-full bg-gradient-to-b from-primary via-teal to-accent opacity-30" />

          <div className="space-y-10 md:space-y-16">
            {roadmap.sections.map((section, idx) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
              >
                <RoadmapSectionComponent section={section} index={idx} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 mb-8 flex justify-center"
        >
          <ExportPDF roadmap={roadmap} />
        </motion.div>
      </div>
    </div>
  );
};

/* ── Stat Card sub-component ── */
interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  color: 'primary' | 'teal' | 'accent';
  className?: string;
}

const colorMap: Record<string, string> = {
  primary: 'bg-primary/10 text-primary',
  teal: 'bg-teal/10 text-teal',
  accent: 'bg-accent/15 text-accent-foreground',
};

const StatCard = ({ icon: Icon, label, value, color, className = '' }: StatCardProps) => (
  <div className={`flex items-center gap-3 rounded-xl border border-border/50 bg-background/60 px-4 py-3 ${className}`}>
    <div className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-lg ${colorMap[color]}`}>
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <div className="text-xl font-bold text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  </div>
);

export default Resources;
