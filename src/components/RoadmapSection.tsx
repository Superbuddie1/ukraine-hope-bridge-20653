import { RoadmapSection as RoadmapSectionType } from "@/lib/assessmentLogic";
import RoadmapCard from "./RoadmapCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Wallet, 
  Stethoscope, 
  Heart, 
  Users,
  MapPin,
  ClipboardList,
  ExternalLink,
  ChevronRight
} from "lucide-react";

interface RoadmapSectionProps {
  section: RoadmapSectionType;
  index: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  AlertTriangle,
  Wallet,
  Stethoscope,
  Heart,
  Users,
  ClipboardList,
};

const RoadmapSectionComponent = ({ section, index }: RoadmapSectionProps) => {
  const isEven = index % 2 === 0;
  const Icon = iconMap[section.icon] || MapPin;

  return (
    <div className="relative">
      {/* Step Number Circle - Desktop */}
      <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-3 z-20 hidden md:block">
        <div className={`${isEven ? 'bg-primary' : 'bg-accent'} rounded-2xl p-4 shadow-lg border-4 border-background transition-transform hover:scale-105`}>
          <Icon className={`h-6 w-6 ${isEven ? 'text-primary-foreground' : 'text-accent-foreground'}`} />
        </div>
        <div className="absolute -top-1 -right-1 bg-background rounded-full w-6 h-6 flex items-center justify-center border-2 border-foreground/20 shadow">
          <span className="text-xs font-bold text-foreground">{index + 1}</span>
        </div>
      </div>

      {/* Section Content */}
      <div className={`md:w-[calc(50%-2rem)] ${isEven ? 'md:ml-0 md:mr-auto md:pr-8' : 'md:ml-auto md:mr-0 md:pl-8'}`}>
        <Card className={`overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
          isEven ? 'bg-gradient-to-br from-primary/5 to-transparent' : 'bg-gradient-to-br from-accent/5 to-transparent'
        }`}>
          {/* Header */}
          <div className={`px-5 py-4 border-b border-border/50 ${isEven ? 'bg-primary/5' : 'bg-accent/5'}`}>
            {/* Mobile Step Icon */}
            <div className="md:hidden flex items-center gap-3 mb-3">
              <div className={`${isEven ? 'bg-primary' : 'bg-accent'} rounded-xl p-2.5`}>
                <Icon className={`h-5 w-5 ${isEven ? 'text-primary-foreground' : 'text-accent-foreground'}`} />
              </div>
              <span className="text-sm font-semibold text-muted-foreground">Step {index + 1}</span>
            </div>

            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-foreground leading-tight">
                  {section.title}
                </h2>
                {section.titleUa && (
                  <p className="text-sm text-muted-foreground/70 italic mt-1">{section.titleUa}</p>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-4">
            {/* Roadmap Steps (for Next Steps section) */}
            {section.steps && section.steps.length > 0 && (
              <div className="space-y-3">
                {section.steps.map((step, idx) => (
                  <div 
                    key={step.id} 
                    className="flex items-start gap-3 p-3 rounded-xl bg-background/60 border border-border/30 hover:border-border/60 transition-colors"
                  >
                    <div className={`shrink-0 w-7 h-7 rounded-lg ${isEven ? 'bg-primary/10 text-primary' : 'bg-accent/20 text-accent-foreground'} flex items-center justify-center`}>
                      <span className="text-xs font-bold">{idx + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground text-sm mb-0.5">{step.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                      {step.link && (
                        <Button
                          variant="link"
                          className="h-auto p-0 mt-1.5 text-primary text-sm"
                          onClick={() => window.open(step.link, '_blank')}
                        >
                          {step.linkText || 'Learn more'}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Button>
                      )}
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            )}

            {/* Resource Cards */}
            {section.recommendations.length > 0 && (
              <div className="space-y-3">
                {section.recommendations.map((rec, idx) => (
                  <RoadmapCard
                    key={rec.resource.id}
                    recommendation={rec}
                    index={idx}
                    variant={isEven ? 'blue' : 'yellow'}
                  />
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RoadmapSectionComponent;
