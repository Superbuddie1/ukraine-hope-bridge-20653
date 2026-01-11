import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PersonalizedRecommendation } from "@/lib/assessmentLogic";
import { Phone, MapPin, ArrowUpRight } from "lucide-react";

interface RoadmapCardProps {
  recommendation: PersonalizedRecommendation;
  index: number;
  variant: 'blue' | 'yellow';
}

const RoadmapCard = ({ recommendation, index, variant }: RoadmapCardProps) => {
  const { resource, regionMatch } = recommendation;

  const regionMatchConfig = {
    exact: { label: 'Your Region', className: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
    nearby: { label: 'Nearby', className: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20' },
    other: null,
  };

  const regionInfo = regionMatch ? regionMatchConfig[regionMatch] : null;

  return (
    <div 
      className={`group relative rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5 ${
        regionMatch === 'exact'
          ? 'bg-gradient-to-br from-emerald-500/5 to-background border border-emerald-500/20'
          : 'bg-background border border-border/50 hover:border-border'
      }`}
    >
      <div className="space-y-3">
        {/* Region badge if applicable */}
        {regionInfo && (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={`text-xs font-medium ${regionInfo.className}`}>
              <MapPin className="h-3 w-3 mr-1" />
              {regionInfo.label}
            </Badge>
          </div>
        )}

        {/* Title & Description */}
        <div>
          <h4 className="font-semibold text-foreground leading-tight mb-1 group-hover:text-primary transition-colors">
            {resource.title}
          </h4>
          {resource.titleUa && (
            <p className="text-xs text-muted-foreground/70 italic mb-1.5">{resource.titleUa}</p>
          )}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {resource.description}
          </p>
        </div>

        {/* Contact Info - Only show phone for prosthetic centers with original data */}
        {resource.contact && resource.type === 'prosthetic-center' && (
          <div className="flex flex-wrap gap-2 text-sm">
            <div className="inline-flex items-center gap-1.5 text-foreground bg-muted/50 rounded-lg px-2.5 py-1.5">
              <Phone className="h-3.5 w-3.5 text-primary" />
              <span className="font-medium">{resource.contact}</span>
            </div>
          </div>
        )}

        {/* National hotline exception */}
        {resource.id === 'sup-national-1' && resource.contact && (
          <div className="flex flex-wrap gap-2 text-sm">
            <div className="inline-flex items-center gap-1.5 text-foreground bg-muted/50 rounded-lg px-2.5 py-1.5">
              <Phone className="h-3.5 w-3.5 text-primary" />
              <span className="font-medium">{resource.contact}</span>
            </div>
          </div>
        )}

        {/* Address if available */}
        {resource.address && (
          <div className="flex flex-wrap gap-2 text-sm">
            <div className="inline-flex items-center gap-1.5 text-muted-foreground bg-muted/30 rounded-lg px-2.5 py-1.5">
              <MapPin className="h-3.5 w-3.5" />
              <span className="text-sm truncate max-w-[200px]">{resource.address}</span>
            </div>
          </div>
        )}

        {/* Action Button */}
        {resource.website && (
          <Button 
            variant="outline"
            size="sm" 
            className="w-full group/btn font-medium"
            asChild
          >
            <a href={resource.website} target="_blank" rel="noopener noreferrer">
              Visit Website
              <ArrowUpRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};

export default RoadmapCard;
