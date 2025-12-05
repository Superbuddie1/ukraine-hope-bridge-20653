import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
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
  const [profile, setProfile] = useState<Profile | null>(null);
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        // Fetch profile
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: profileData } = await (supabase as any)
          .from("profiles")
          .select("full_name, email, language_preference")
          .eq("user_id", user.id)
          .maybeSingle();

        if (profileData) {
          setProfile(profileData);
        }

        // Fetch latest survey
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: surveyData } = await (supabase as any)
          .from("user_surveys")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (surveyData) {
          setSurvey(surveyData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInjuryTimingLabel = (value: string) => {
    const labels: Record<string, string> = {
      "less-3-months": "Less than 3 months ago",
      "3-6-months": "3-6 months ago",
      "6-12-months": "6-12 months ago",
      "more-1-year": "More than 1 year ago",
    };
    return labels[value] || value;
  };

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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome back{profile?.full_name ? `, ${profile.full_name}` : ""}!
          </h1>
          <p className="text-muted-foreground">
            Your personalized prosthetic assistance dashboard
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Profile Card */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <User className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-card-foreground">Your Profile</h2>
            </div>
            <div className="space-y-2 text-muted-foreground">
              <p><span className="font-medium text-foreground">Name:</span> {profile?.full_name || "Not set"}</p>
              <p><span className="font-medium text-foreground">Email:</span> {profile?.email}</p>
              <p><span className="font-medium text-foreground">Language:</span> {profile?.language_preference === "uk" ? "Ukrainian" : "English"}</p>
            </div>
          </Card>

          {/* Assessment Status Card */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-accent/20 rounded-lg">
                <ClipboardList className="h-5 w-5 text-accent-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-card-foreground">Assessment Status</h2>
            </div>
            {survey ? (
              <div className="space-y-2 text-muted-foreground">
                <p><span className="font-medium text-foreground">Completed:</span> {formatDate(survey.created_at)}</p>
                <p><span className="font-medium text-foreground">Injury Timing:</span> {getInjuryTimingLabel(survey.injury_timing)}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3"
                  onClick={() => navigate("/assessment")}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retake Assessment
                </Button>
              </div>
            ) : (
              <div>
                <p className="text-muted-foreground mb-4">You haven't completed an assessment yet.</p>
                <Button onClick={() => navigate("/assessment")}>
                  Start Assessment
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </Card>
        </div>

        {/* Roadmap Card */}
        {survey && (
          <Card className="p-6 mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Map className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-card-foreground">Your Personalized Roadmap</h2>
                  <p className="text-muted-foreground">View your customized path to prosthetic assistance</p>
                </div>
              </div>
              <Button onClick={() => navigate("/resources")}>
                View Roadmap
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
