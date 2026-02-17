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
import { useLanguage } from "@/hooks/useLanguage";
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
  const { t } = useLanguage();
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
        title: t('assessment.notAuthenticated'),
        description: t('assessment.notAuthenticatedDesc'),
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any).from("user_surveys").delete().eq("user_id", user.id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any).from("user_roadmaps").delete().eq("user_id", user.id);

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

      const roadmapData = generatePersonalizedRoadmap(data);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: roadmapError } = await (supabase as any)
        .from("user_roadmaps")
        .insert({
          user_id: user.id,
          roadmap_data: roadmapData,
        });

      if (roadmapError) throw roadmapError;

      sessionStorage.setItem("assessmentData", JSON.stringify(data));

      toast({
        title: t('assessment.assessmentComplete'),
        description: t('assessment.assessmentCompleteDesc'),
      });

      navigate("/resources");
    } catch (error) {
      console.error("Error saving assessment:", error);
      toast({
        title: t('assessment.errorSaving'),
        description: t('assessment.errorSavingDesc'),
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return data.status !== "";
      case 2: return data.preSurgery !== "";
      case 3: return data.amputationType !== "" && data.amputationLevel !== "";
      case 4: return data.currentStage !== "";
      case 5: return data.region !== "";
      case 6: return true;
      default: return false;
    }
  };

  const getAmputationLevelOptions = () => {
    if (data.amputationType === "upper-limb") {
      return [
        { value: "shoulder-disarticulation", label: t('assessment.shoulderDisarticulation') },
        { value: "above-elbow", label: t('assessment.aboveElbow') },
        { value: "below-elbow", label: t('assessment.belowElbow') },
        { value: "wrist", label: t('assessment.wrist') },
        { value: "fingers", label: t('assessment.fingers') },
      ];
    } else if (data.amputationType === "lower-limb") {
      return [
        { value: "hip-disarticulation", label: t('assessment.hipDisarticulation') },
        { value: "above-knee", label: t('assessment.aboveKnee') },
        { value: "below-knee", label: t('assessment.belowKnee') },
        { value: "partial-foot", label: t('assessment.partialFoot') },
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
            {t('assessment.title')}
          </h1>
          <p className="text-muted-foreground">{t('assessment.subtitle')}</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              {t('assessment.stepOf').replace('{step}', String(step)).replace('{total}', String(totalSteps))}
            </span>
            <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-card-foreground">{t('assessment.step1Title')}</h2>
                <p className="text-muted-foreground mb-6">{t('assessment.step1Subtitle')}</p>
              </div>
              <RadioGroup value={data.status} onValueChange={(value) => setData({ ...data, status: value })}>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="military" id="status1" />
                  <Label htmlFor="status1" className="flex-1 cursor-pointer">{t('assessment.military')}</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="civilian" id="status2" />
                  <Label htmlFor="status2" className="flex-1 cursor-pointer">{t('assessment.civilian')}</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-card-foreground">{t('assessment.step2Title')}</h2>
                <p className="text-muted-foreground mb-6">{t('assessment.step2Subtitle')}</p>
              </div>
              <RadioGroup value={data.preSurgery} onValueChange={(value) => setData({ ...data, preSurgery: value })}>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="planned" id="surgery1" />
                  <Label htmlFor="surgery1" className="flex-1 cursor-pointer">{t('assessment.planned')}</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="emergency" id="surgery2" />
                  <Label htmlFor="surgery2" className="flex-1 cursor-pointer">{t('assessment.emergency')}</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-card-foreground">{t('assessment.step3Title')}</h2>
                <p className="text-muted-foreground mb-6">{t('assessment.step3Subtitle')}</p>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-medium">{t('assessment.limbType')}</Label>
                <RadioGroup value={data.amputationType} onValueChange={(value) => setData({ ...data, amputationType: value, amputationLevel: "" })}>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="upper-limb" id="type1" />
                    <Label htmlFor="type1" className="flex-1 cursor-pointer">{t('assessment.upperLimb')}</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="lower-limb" id="type2" />
                    <Label htmlFor="type2" className="flex-1 cursor-pointer">{t('assessment.lowerLimb')}</Label>
                  </div>
                </RadioGroup>
              </div>

              {data.amputationType && (
                <div className="space-y-4 mt-6">
                  <Label className="text-base font-medium">{t('assessment.amputationLevel')}</Label>
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
                <h2 className="text-2xl font-semibold mb-2 text-card-foreground">{t('assessment.step4Title')}</h2>
                <p className="text-muted-foreground mb-6">{t('assessment.step4Subtitle')}</p>
              </div>
              <RadioGroup value={data.currentStage} onValueChange={(value) => setData({ ...data, currentStage: value })}>
                {[
                  { value: 'pre-surgical', label: t('assessment.preSurgical') },
                  { value: 'acute-post-surgical', label: t('assessment.acutePostSurgical') },
                  { value: 'in-patient-post-surgical', label: t('assessment.inPatientPostSurgical') },
                  { value: 'rehabilitation', label: t('assessment.rehabilitation') },
                  { value: 'pre-prosthetic', label: t('assessment.preProsthetic') },
                  { value: 'prosthetic-fitting', label: t('assessment.prostheticFitting') },
                  { value: 'prosthetic-training', label: t('assessment.prostheticTraining') },
                  { value: 'community-reintegration', label: t('assessment.communityReintegration') },
                ].map((stage, i) => (
                  <div key={stage.value} className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                    <RadioGroupItem value={stage.value} id={`stage${i + 1}`} />
                    <Label htmlFor={`stage${i + 1}`} className="flex-1 cursor-pointer">{stage.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-card-foreground">{t('assessment.step5Title')}</h2>
                <p className="text-muted-foreground mb-6">{t('assessment.step5Subtitle')}</p>
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
                <h2 className="text-2xl font-semibold mb-2 text-card-foreground">{t('assessment.step6Title')}</h2>
                <p className="text-muted-foreground mb-6">{t('assessment.step6Subtitle')}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="additional">{t('assessment.additionalLabel')}</Label>
                <Textarea
                  id="additional"
                  placeholder={t('assessment.additionalPlaceholder')}
                  value={data.additionalInfo}
                  onChange={(e) => setData({ ...data, additionalInfo: e.target.value })}
                  rows={6}
                  className="resize-none"
                />
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button variant="outline" onClick={handleBack} disabled={step === 1}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('assessment.back')}
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
                  {t('assessment.complete')}
                  <CheckCircle2 className="h-4 w-4 ml-2" />
                </>
              ) : (
                <>
                  {t('assessment.next')}
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
