import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ClipboardList, Map, User, ArrowRight, RefreshCw } from "lucide-react";

interface Profile {
  full_name: string | null;
  email: string;
  language_preference: string | null;
}

interface Survey {
  id: string;
  injury_timing: string;
  limb_location: string;
  amputation_level: string;
  government_funding: string;
  created_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: profileData } = await (supabase as any)
          .from("profiles").select("full_name, email, language_preference").eq("user_id", user.id).maybeSingle();
        if (profileData) setProfile(profileData);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: surveyData } = await (supabase as any)
          .from("user_surveys").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1).maybeSingle();
        if (surveyData) setSurvey(surveyData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [user]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'uk' ? 'uk-UA' : 'en-US', {
      year: "numeric", month: "long", day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {t('dashboard.welcomeBack')}{profile?.full_name ? `, ${profile.full_name}` : ""}!
          </h1>
          <p className="text-muted-foreground">{t('dashboard.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg"><User className="h-5 w-5 text-primary" /></div>
              <h2 className="text-xl font-semibold text-card-foreground">{t('dashboard.yourProfile')}</h2>
            </div>
            <div className="space-y-2 text-muted-foreground">
              <p><span className="font-medium text-foreground">{t('dashboard.name')}:</span> {profile?.full_name || t('dashboard.notSet')}</p>
              <p><span className="font-medium text-foreground">{t('dashboard.email')}:</span> {profile?.email}</p>
              <p><span className="font-medium text-foreground">{t('dashboard.languageLabel')}:</span> {language === 'uk' ? t('dashboard.ukrainian') : t('dashboard.english')}</p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-accent/20 rounded-lg"><ClipboardList className="h-5 w-5 text-accent-foreground" /></div>
              <h2 className="text-xl font-semibold text-card-foreground">{t('dashboard.assessmentStatus')}</h2>
            </div>
            {survey ? (
              <div className="space-y-2 text-muted-foreground">
                <p><span className="font-medium text-foreground">{t('dashboard.completed')}:</span> {formatDate(survey.created_at)}</p>
                <p><span className="font-medium text-foreground">{t('dashboard.injuryTiming')}:</span> {survey.injury_timing}</p>
                <Button variant="outline" size="sm" className="mt-3" onClick={() => navigate("/assessment")}>
                  <RefreshCw className="h-4 w-4 mr-2" />{t('dashboard.retakeAssessment')}
                </Button>
              </div>
            ) : (
              <div>
                <p className="text-muted-foreground mb-4">{t('dashboard.noAssessment')}</p>
                <Button onClick={() => navigate("/assessment")}>
                  {t('dashboard.startAssessment')}<ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </Card>
        </div>

        {survey && (
          <Card className="p-6 mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg"><Map className="h-5 w-5 text-primary" /></div>
                <div>
                  <h2 className="text-xl font-semibold text-card-foreground">{t('dashboard.yourRoadmap')}</h2>
                  <p className="text-muted-foreground">{t('dashboard.viewRoadmapDesc')}</p>
                </div>
              </div>
              <Button onClick={() => navigate("/resources")}>
                {t('dashboard.viewRoadmap')}<ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
