import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { generatePersonalizedRoadmap } from "@/lib/assessmentLogic";
import DisclaimerDialog from "@/components/DisclaimerDialog";
import { RegionSelector } from "@/components/RegionSelector";

export interface AssessmentData {
  status: string;
  preSurgery: string;
  amputationType: string;
  amputationLevel: string;
  currentStage: string;
  additionalInfo: string;
  region: string;
}

const Assessment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<AssessmentData>({
    status: "",
    preSurgery: "",
    amputationType: "",
    amputationLevel: "",
    currentStage: "",
    additionalInfo: "",
    region: "",
  });

  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Not authenticated",
        description: "Please log in to save your assessment.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    
    try {
      // Delete existing survey and roadmap first, then insert new ones
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any).from("user_surveys").delete().eq("user_id", user.id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any).from("user_roadmaps").delete().eq("user_id", user.id);

      // Save survey to database
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: surveyError } = await (supabase as any)
        .from("user_surveys")
        .insert({
          user_id: user.id,
          injury_timing: data.currentStage,
          limb_location: data.amputationType,
          amputation_level: data.amputationLevel,
          government_funding: data.status,
          additional_info: data.additionalInfo,
          region: data.region,
        });

      if (surveyError) throw surveyError;

      // Generate roadmap
      const roadmapData = generatePersonalizedRoadmap(data);

      // Save roadmap to database
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: roadmapError } = await (supabase as any)
        .from("user_roadmaps")
        .insert({
          user_id: user.id,
          roadmap_data: roadmapData,
        });

      if (roadmapError) throw roadmapError;

      // Also store in sessionStorage for immediate use
      sessionStorage.setItem("assessmentData", JSON.stringify(data));

      toast({
        title: "Assessment Complete",
        description: "Your personalized roadmap has been saved.",
      });
      
      navigate("/resources");
    } catch (error) {
      console.error("Error saving assessment:", error);
      toast({
        title: "Error Saving",
        description: "There was a problem saving your assessment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return data.status !== "";
      case 2:
        return data.preSurgery !== "";
      case 3:
        return data.amputationType !== "" && data.amputationLevel !== "";
      case 4:
        return data.currentStage !== "";
      case 5:
        return data.region !== "";
      case 6:
        return true; // Additional info is optional
      default:
        return false;
    }
  };

  const getAmputationLevelOptions = () => {
    if (data.amputationType === "upper-limb") {
      return [
        { value: "shoulder-disarticulation", label: "Shoulder disarticulation" },
        { value: "above-elbow", label: "Above elbow" },
        { value: "below-elbow", label: "Below elbow" },
        { value: "wrist", label: "Wrist" },
        { value: "fingers", label: "Finger(s)" },
      ];
    } else if (data.amputationType === "lower-limb") {
      return [
        { value: "hip-disarticulation", label: "Hip disarticulation" },
        { value: "above-knee", label: "Above knee" },
        { value: "below-knee", label: "Below knee" },
        { value: "partial-foot", label: "Partial foot" },
      ];
    }
    return [];
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <DisclaimerDialog 
        open={showDisclaimer} 
        onAccept={() => setShowDisclaimer(false)} 
      />
      
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Personalized Assessment
          </h1>
          <p className="text-muted-foreground">
            Help us understand your situation to provide the most relevant resources
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Step {step} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-card-foreground">
                  What is your status?
                </h2>
                <p className="text-muted-foreground mb-6">
                  This helps us provide resources specific to your situation.
                </p>
              </div>
              <RadioGroup value={data.status} onValueChange={(value) => setData({ ...data, status: value })}>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="military" id="status1" />
                  <Label htmlFor="status1" className="flex-1 cursor-pointer">Military</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="civilian" id="status2" />
                  <Label htmlFor="status2" className="flex-1 cursor-pointer">Civilian</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-card-foreground">
                  Pre-Surgery Information
                </h2>
                <p className="text-muted-foreground mb-6">
                  What type of amputation procedure applies to your situation?
                </p>
              </div>
              <RadioGroup value={data.preSurgery} onValueChange={(value) => setData({ ...data, preSurgery: value })}>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="planned" id="surgery1" />
                  <Label htmlFor="surgery1" className="flex-1 cursor-pointer">Planned amputation</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="emergency" id="surgery2" />
                  <Label htmlFor="surgery2" className="flex-1 cursor-pointer">Emergency amputation (trauma)</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-card-foreground">
                  What type of amputation?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Select the limb type and level of amputation.
                </p>
              </div>
              
              <div className="space-y-4">
                <Label className="text-base font-medium">Limb Type</Label>
                <RadioGroup value={data.amputationType} onValueChange={(value) => setData({ ...data, amputationType: value, amputationLevel: "" })}>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="upper-limb" id="type1" />
                    <Label htmlFor="type1" className="flex-1 cursor-pointer">Upper Limb</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="lower-limb" id="type2" />
                    <Label htmlFor="type2" className="flex-1 cursor-pointer">Lower Limb</Label>
                  </div>
                </RadioGroup>
              </div>

              {data.amputationType && (
                <div className="space-y-4 mt-6">
                  <Label className="text-base font-medium">Amputation Level</Label>
                  <RadioGroup value={data.amputationLevel} onValueChange={(value) => setData({ ...data, amputationLevel: value })}>
                    {getAmputationLevelOptions().map((option, index) => (
                      <div key={option.value} className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                        <RadioGroupItem value={option.value} id={`level${index}`} />
                        <Label htmlFor={`level${index}`} className="flex-1 cursor-pointer">{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-card-foreground">
                  Select the stage you are at right now
                </h2>
                <p className="text-muted-foreground mb-6">
                  This helps us provide the most relevant next steps for your journey.
                </p>
              </div>
              <RadioGroup value={data.currentStage} onValueChange={(value) => setData({ ...data, currentStage: value })}>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="pre-surgical" id="stage1" />
                  <Label htmlFor="stage1" className="flex-1 cursor-pointer">Pre-Surgical</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="acute-post-surgical" id="stage2" />
                  <Label htmlFor="stage2" className="flex-1 cursor-pointer">Acute Post-Surgical</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="in-patient-post-surgical" id="stage3" />
                  <Label htmlFor="stage3" className="flex-1 cursor-pointer">In-Patient Post-Surgical</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="rehabilitation" id="stage4" />
                  <Label htmlFor="stage4" className="flex-1 cursor-pointer">Rehabilitation and Assistive Device Prescription/Selection</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="pre-prosthetic" id="stage5" />
                  <Label htmlFor="stage5" className="flex-1 cursor-pointer">Pre-Prosthetic Rehabilitation (For Prosthetic Users)</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="prosthetic-fitting" id="stage6" />
                  <Label htmlFor="stage6" className="flex-1 cursor-pointer">Prosthetics Provider Selection and Prosthetic Fitting</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="prosthetic-training" id="stage7" />
                  <Label htmlFor="stage7" className="flex-1 cursor-pointer">Prosthetic Training</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="community-reintegration" id="stage8" />
                  <Label htmlFor="stage8" className="flex-1 cursor-pointer">Community Reintegration (Potential Job Retraining, Etc)</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-card-foreground">
                  Which region are you from?
                </h2>
                <p className="text-muted-foreground mb-6">
                  This helps us prioritize clinics and resources in your area.
                </p>
              </div>
              <RegionSelector
                value={data.region}
                onChange={(value) => setData({ ...data, region: value })}
              />
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-card-foreground">
                  Additional information
                </h2>
                <p className="text-muted-foreground mb-6">
                  Share any other details that might help us provide better support (optional).
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="additional">
                  Additional comments or concerns
                </Label>
                <Textarea
                  id="additional"
                  placeholder="For example: mobility challenges, living situation, family support, employment needs..."
                  value={data.additionalInfo}
                  onChange={(e) => setData({ ...data, additionalInfo: e.target.value })}
                  rows={6}
                  className="resize-none"
                />
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button
              variant={step === totalSteps ? "accent" : "default"}
              onClick={handleNext}
              disabled={!isStepValid() || saving}
            >
              {saving ? (
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground" />
              ) : step === totalSteps ? (
                <>
                  Complete
                  <CheckCircle2 className="h-4 w-4 ml-2" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Assessment;
