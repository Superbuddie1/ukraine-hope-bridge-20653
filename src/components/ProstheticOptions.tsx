import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cog, Check } from "lucide-react";

interface ProstheticOptionsProps {
  options: string[];
  timeline: string;
}

const ProstheticOptions = ({ options, timeline }: ProstheticOptionsProps) => {
  return (
    <Card className="rounded-2xl p-6 border-2 border-primary/30 shadow-xl" style={{ background: 'linear-gradient(135deg, hsl(210 100% 36% / 0.05), hsl(0 0% 100%), hsl(51 100% 50% / 0.05))' }}>
      <div className="flex items-start gap-4">
        <div className="rounded-full p-3 shrink-0 shadow-lg" style={{ background: 'linear-gradient(135deg, hsl(210 100% 45%), hsl(0 0% 98%), hsl(51 100% 55%))' }}>
          <Cog className="h-6 w-6 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground mb-2">
            Recommended Prosthetic Options
          </h3>
          <p className="text-muted-foreground mb-4">
            Based on your injury type and location, these options may be suitable for you:
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {options.map((option, idx) => (
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

          <div className="bg-accent/10 rounded-lg px-4 py-3 border border-accent/30">
            <p className="text-sm">
              <strong className="text-accent">Estimated Timeline:</strong>{' '}
              <span className="text-foreground">{timeline}</span>
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProstheticOptions;
