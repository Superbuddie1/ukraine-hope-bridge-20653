import { RoadmapSection as RoadmapSectionType } from "@/lib/assessmentLogic";
import RoadmapCard from "./RoadmapCard";
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
  ChevronRight,
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
      {/* ── Milestone circle on timeline – Desktop ── */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-4 z-20 hidden md:block">
        <div className="relative">
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[var(--shadow-soft)] border-4 border-background transition-transform hover:scale-110 ${
              isEven ? 'bg-primary' : 'bg-teal'
            }`}
          >
            <Icon className="h-6 w-6 text-primary-foreground" />
          </div>
          {/* Step number badge */}
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-background border-2 border-border flex items-center justify-center shadow-sm">
            <span className="text-[11px] font-bold text-foreground">{index + 1}</span>
          </div>
        </div>
      </div>

      {/* ── Card ── */}
      <div className={`md:w-[calc(50%-2.5rem)] ${isEven ? 'md:ml-0 md:mr-auto md:pr-8' : 'md:ml-auto md:mr-0 md:pl-8'}`}>
        <div className="rounded-2xl border border-border/50 bg-card shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all duration-300 overflow-hidden">
          {/* Coloured top accent */}
          <div className={`h-1 ${isEven ? 'bg-primary' : 'bg-teal'}`} />

          {/* Header */}
          <div className="px-6 py-5 border-b border-border/40">
            {/* Mobile milestone */}
            <div className="md:hidden flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isEven ? 'bg-primary/10 text-primary' : 'bg-teal/10 text-teal'}`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">Step {index + 1}</span>
            </div>

            <h2 className="text-lg font-bold text-foreground leading-snug">
              {section.title}
            </h2>
            {section.titleUa && (
              <p className="text-sm text-muted-foreground/60 italic mt-1">{section.titleUa}</p>
            )}
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            {/* Next-steps mini-cards */}
            {section.steps && section.steps.length > 0 && (
              <div className="space-y-3">
                {section.steps.map((step, idx) => (
                  <div
                    key={step.id}
                    className="group/step flex items-start gap-3 p-4 rounded-xl bg-secondary/50 border border-border/30 hover:border-primary/30 hover:bg-primary/[0.03] transition-all duration-200 cursor-default"
                  >
                    <div
                      className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                        isEven
                          ? 'bg-primary/10 text-primary'
                          : 'bg-teal/10 text-teal'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground text-sm mb-0.5">{step.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                      {step.link && (
                        <Button
                          variant="link"
                          className="h-auto p-0 mt-2 text-primary text-sm"
                          onClick={() => window.open(step.link, '_blank')}
                        >
                          {step.linkText || 'Learn more'}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Button>
                      )}
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover/step:text-primary/50 shrink-0 mt-1 transition-colors" />
                  </div>
                ))}
              </div>
            )}

            {/* Resource cards */}
            {section.recommendations.length > 0 && (
              <div className="space-y-3">
                {section.recommendations.map((rec, idx) => (
                  <RoadmapCard
                    key={rec.resource.id}
                    recommendation={rec}
                    index={idx}
                    variant={isEven ? 'blue' : 'teal'}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapSectionComponent;
