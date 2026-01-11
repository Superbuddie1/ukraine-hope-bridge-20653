import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cog, Check, AlertCircle } from "lucide-react";

interface ProstheticOptionsProps {
  options: string[];
}

const ProstheticOptions = ({ options }: ProstheticOptionsProps) => {
  // Filter out specific medical advice options
  const filteredOptions = options.filter(option => 
    !option.toLowerCase().includes('hip disarticulation prosthesis') &&
    !option.toLowerCase().includes('canadian hip prosthesis') &&
    !option.toLowerCase().includes('modular hip system')
  );

  if (filteredOptions.length === 0) {
    return (
      <Card className="rounded-2xl p-6 border-2 border-primary/30 shadow-xl" style={{ background: 'linear-gradient(135deg, hsl(210 100% 36% / 0.05), hsl(0 0% 100%), hsl(51 100% 50% / 0.05))' }}>
        <div className="flex items-start gap-4">
          <div className="rounded-full p-3 shrink-0 shadow-lg" style={{ background: 'linear-gradient(135deg, hsl(210 100% 45%), hsl(0 0% 98%), hsl(51 100% 55%))' }}>
            <Cog className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground mb-2">
              Prosthetic Options
            </h3>
            <div className="flex items-start gap-2 bg-accent/10 rounded-lg px-4 py-3 border border-accent/30">
              <AlertCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">
                Discuss prosthetic options with your healthcare provider and prosthetist. They will recommend suitable options based on your specific situation.
              </p>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl p-6 border-2 border-primary/30 shadow-xl" style={{ background: 'linear-gradient(135deg, hsl(210 100% 36% / 0.05), hsl(0 0% 100%), hsl(51 100% 50% / 0.05))' }}>
      <div className="flex items-start gap-4">
        <div className="rounded-full p-3 shrink-0 shadow-lg" style={{ background: 'linear-gradient(135deg, hsl(210 100% 45%), hsl(0 0% 98%), hsl(51 100% 55%))' }}>
          <Cog className="h-6 w-6 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground mb-2">
            Prosthetic Options to Discuss
          </h3>
          <p className="text-muted-foreground mb-4">
            Based on your situation, you may want to discuss these options with your healthcare provider:
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {filteredOptions.map((option, idx) => (
              <Badge 
                key={idx} 
                variant="outline" 
                className="px-3 py-1.5 bg-background/50 flex items-center gap-1.5"
              >
                <Check className="h-3 w-3 text-primary" />
                {option}
              </Badge>
            ))}
          </div>

          <div className="flex items-start gap-2 bg-muted/50 rounded-lg px-4 py-3 border border-border/50">
            <AlertCircle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              This is not medical advice. Always consult with qualified healthcare professionals before making decisions about prosthetics.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProstheticOptions;
