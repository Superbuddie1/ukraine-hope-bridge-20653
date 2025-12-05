import { RoadmapSection as RoadmapSectionType } from "@/lib/assessmentLogic";
import RoadmapCard from "./RoadmapCard";
import { 
  AlertTriangle, 
  Wallet, 
  Stethoscope, 
  Cog, 
  Heart, 
  Users,
  MapPin 
} from "lucide-react";

interface RoadmapSectionProps {
  section: RoadmapSectionType;
  index: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  AlertTriangle,
  Wallet,
  Stethoscope,
  Cog,
  Heart,
  Users,
};

const RoadmapSectionComponent = ({ section, index }: RoadmapSectionProps) => {
  const isEven = index % 2 === 0;
  const Icon = iconMap[section.icon] || MapPin;
  
  const bgColor = isEven ? 'bg-primary' : 'bg-accent';
  const borderColor = isEven ? 'border-primary' : 'border-accent';
  const textColor = isEven ? 'text-primary' : 'text-accent';
  const gradientFrom = isEven ? 'from-primary/5' : 'from-accent/5';
  const gradientTo = isEven ? 'to-primary/10' : 'to-accent/10';

  const urgencyBadge = {
    immediate: { label: 'Do Now', className: 'bg-destructive text-destructive-foreground' },
    soon: { label: 'This Week', className: 'bg-accent text-accent-foreground' },
    ongoing: { label: 'Ongoing', className: 'bg-muted text-muted-foreground' },
  };

  return (
    <div className="relative">
      {/* Step Number Circle - Desktop */}
      <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-4 z-20 hidden md:block">
        <div className={`${bgColor} rounded-full p-5 shadow-2xl border-4 border-background`}>
          <div className="relative">
            <Icon className="h-7 w-7 text-primary-foreground" />
            <div className="absolute -top-2 -right-2 bg-background rounded-full w-6 h-6 flex items-center justify-center border-2 border-current">
              <span className="text-xs font-bold">{index + 1}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Line Segment */}
      {index > 0 && (
        <div className={`absolute left-1/2 -top-16 h-16 w-1 ${bgColor} hidden md:block transform -translate-x-1/2`} />
      )}

      {/* Section Content */}
      <div className={`md:w-[calc(50%-3rem)] ${isEven ? 'md:ml-0 md:mr-auto md:pr-12' : 'md:ml-auto md:mr-0 md:pl-12'}`}>
        <div className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-2xl p-5 border-2 ${borderColor} shadow-xl hover:shadow-2xl transition-all duration-300`}>
          {/* Mobile Step Icon */}
          <div className="md:hidden flex items-center gap-3 mb-4">
            <div className={`${bgColor} rounded-full p-3`}>
              <Icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className={`text-xl font-bold ${textColor}`}>Step {index + 1}</span>
          </div>

          {/* Section Header */}
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <h2 className={`text-xl font-bold ${textColor} flex items-center gap-2`}>
              <MapPin className="h-5 w-5 hidden md:block" />
              {section.title}
            </h2>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${urgencyBadge[section.urgency].className}`}>
              {urgencyBadge[section.urgency].label}
            </span>
          </div>
          
          {section.titleUa && (
            <p className="text-sm text-muted-foreground italic mb-4">{section.titleUa}</p>
          )}

          {/* Resource Cards */}
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
        </div>
      </div>
    </div>
  );
};

export default RoadmapSectionComponent;
