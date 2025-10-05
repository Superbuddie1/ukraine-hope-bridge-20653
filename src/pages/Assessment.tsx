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

interface AssessmentData {
  injuryTime: string;
  injurySeverity: string;
  injuryLocation: string;
  governmentFunding: string;
  additionalInfo: string;
}

const Assessment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<AssessmentData>({
    injuryTime: "",
    injurySeverity: "",
    injuryLocation: "",
    governmentFunding: "",
    additionalInfo: "",
  });

  const totalSteps = 5;
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

  const handleSubmit = () => {
    toast({
      title: "Assessment Complete",
      description: "Preparing your personalized resources...",
    });
    
    // Store assessment data in sessionStorage
    sessionStorage.setItem("assessmentData", JSON.stringify(data));
    
    setTimeout(() => {
      navigate("/resources");
    }, 1500);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return data.injuryTime !== "";
      case 2:
        return data.injurySeverity !== "";
      case 3:
        return data.injuryLocation !== "";
      case 4:
        return data.governmentFunding !== "";
      case 5:
        return true; // Additional info is optional
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
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
                  When did the injury occur?
                </h2>
                <p className="text-muted-foreground mb-6">
                  This helps us understand your immediate needs and recovery timeline.
                </p>
              </div>
              <RadioGroup value={data.injuryTime} onValueChange={(value) => setData({ ...data, injuryTime: value })}>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="less-3-months" id="time1" />
                  <Label htmlFor="time1" className="flex-1 cursor-pointer">Less than 3 months ago</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="3-6-months" id="time2" />
                  <Label htmlFor="time2" className="flex-1 cursor-pointer">3-6 months ago</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="6-12-months" id="time3" />
                  <Label htmlFor="time3" className="flex-1 cursor-pointer">6-12 months ago</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="more-1-year" id="time4" />
                  <Label htmlFor="time4" className="flex-1 cursor-pointer">More than 1 year ago</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-card-foreground">
                  What is the severity of the amputation?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Understanding the level helps us match you with appropriate prosthetic options.
                </p>
              </div>
              <RadioGroup value={data.injurySeverity} onValueChange={(value) => setData({ ...data, injurySeverity: value })}>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="partial-digit" id="sev1" />
                  <Label htmlFor="sev1" className="flex-1 cursor-pointer">Partial digit/finger</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="below-elbow-knee" id="sev2" />
                  <Label htmlFor="sev2" className="flex-1 cursor-pointer">Below elbow/knee</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="above-elbow-knee" id="sev3" />
                  <Label htmlFor="sev3" className="flex-1 cursor-pointer">Above elbow/knee</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="multiple" id="sev4" />
                  <Label htmlFor="sev4" className="flex-1 cursor-pointer">Multiple limbs</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-card-foreground">
                  Which limb(s) are affected?
                </h2>
                <p className="text-muted-foreground mb-6">
                  This helps us connect you with specialized care for your specific needs.
                </p>
              </div>
              <RadioGroup value={data.injuryLocation} onValueChange={(value) => setData({ ...data, injuryLocation: value })}>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="upper-right" id="loc1" />
                  <Label htmlFor="loc1" className="flex-1 cursor-pointer">Right arm/hand</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="upper-left" id="loc2" />
                  <Label htmlFor="loc2" className="flex-1 cursor-pointer">Left arm/hand</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="lower-right" id="loc3" />
                  <Label htmlFor="loc3" className="flex-1 cursor-pointer">Right leg/foot</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="lower-left" id="loc4" />
                  <Label htmlFor="loc4" className="flex-1 cursor-pointer">Left leg/foot</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="multiple-limbs" id="loc5" />
                  <Label htmlFor="loc5" className="flex-1 cursor-pointer">Multiple limbs</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-card-foreground">
                  Government funding status
                </h2>
                <p className="text-muted-foreground mb-6">
                  Let us know about any funding programs you've accessed or applied to.
                </p>
              </div>
              <RadioGroup value={data.governmentFunding} onValueChange={(value) => setData({ ...data, governmentFunding: value })}>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="none" id="fund1" />
                  <Label htmlFor="fund1" className="flex-1 cursor-pointer">Not yet applied</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="applied" id="fund2" />
                  <Label htmlFor="fund2" className="flex-1 cursor-pointer">Application pending</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="approved" id="fund3" />
                  <Label htmlFor="fund3" className="flex-1 cursor-pointer">Funding approved</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="receiving" id="fund4" />
                  <Label htmlFor="fund4" className="flex-1 cursor-pointer">Currently receiving funds</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="unsure" id="fund5" />
                  <Label htmlFor="fund5" className="flex-1 cursor-pointer">Unsure/need guidance</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 5 && (
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
              disabled={!isStepValid()}
            >
              {step === totalSteps ? (
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
