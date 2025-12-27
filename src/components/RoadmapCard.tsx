import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PersonalizedRecommendation } from "@/lib/assessmentLogic";
import { Phone, ExternalLink, MapPin, Star } from "lucide-react";

interface RoadmapCardProps {
  recommendation: PersonalizedRecommendation;
  index: number;
  variant: 'blue' | 'yellow';
}

const RoadmapCard = ({ recommendation, index, variant }: RoadmapCardProps) => {
  const { resource, priority, reason, timeframe, regionMatch } = recommendation;
  
  const priorityConfig = {
    critical: { label: 'Priority Action', className: 'bg-destructive text-destructive-foreground' },
    high: { label: 'Recommended', className: 'bg-accent text-accent-foreground' },
    medium: { label: 'Suggested', className: 'bg-muted text-muted-foreground' },
    low: { label: 'Optional', className: 'bg-muted/50 text-muted-foreground' },
  };

  const regionMatchConfig = {
    exact: { label: 'In Your Region', className: 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30' },
    nearby: { label: 'Nearby Region', className: 'bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/30' },
    other: null,
  };

  const isFirst = index === 0;
  const priorityInfo = priorityConfig[priority];
  const regionInfo = regionMatch ? regionMatchConfig[regionMatch] : null;

  return (
    <Card 
      className={`p-5 transition-all duration-300 border-2 backdrop-blur-sm hover:-translate-y-1 hover:shadow-xl ${
        isFirst 
          ? 'border-accent bg-accent/10 shadow-lg' 
          : regionMatch === 'exact'
            ? 'border-green-500/50 bg-green-500/5 shadow-md'
            : regionMatch === 'nearby'
              ? 'border-blue-500/30 bg-blue-500/5'
              : 'border-border/50 bg-card/80 hover:border-current'
      }`}
    >
      <div className="space-y-3">
        {/* Priority & Region Badges */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={`${isFirst ? 'bg-accent text-accent-foreground' : priorityInfo.className} text-xs font-bold`}>
              {isFirst ? (
                <><Star className="h-3 w-3 mr-1" /> Priority Action</>
              ) : (
                priorityInfo.label
              )}
            </Badge>
            {regionInfo && (
              <Badge variant="outline" className={`text-xs font-medium border ${regionInfo.className}`}>
                <MapPin className="h-3 w-3 mr-1" />
                {regionInfo.label}
              </Badge>
            )}
          </div>
          <Badge variant="outline" className="text-xs">
            {timeframe}
          </Badge>
        </div>

        {/* Title & Description */}
        <div>
          <h4 className="font-bold text-card-foreground text-lg leading-tight mb-1">
            {resource.title}
          </h4>
          {resource.titleUa && (
            <p className="text-xs text-muted-foreground italic mb-2">{resource.titleUa}</p>
          )}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {resource.description}
          </p>
        </div>

        {/* Reason */}
        <div className={`text-sm rounded-lg px-3 py-2 ${
          variant === 'blue' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent-foreground'
        }`}>
          <strong>Why:</strong> {reason}
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap gap-2">
          {resource.contact && (
            <div className="flex items-center gap-2 text-sm font-medium bg-background/80 rounded-lg px-3 py-2 border">
              <Phone className="h-4 w-4 text-primary" />
              <span>{resource.contact}</span>
            </div>
          )}
          {resource.address && (
            <div className="flex items-center gap-2 text-sm bg-background/80 rounded-lg px-3 py-2 border">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{resource.address}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        {resource.website && (
          <Button 
            variant={isFirst ? "default" : "outline"} 
            size="sm" 
            className="w-full group font-semibold"
            asChild
          >
            <a href={resource.website} target="_blank" rel="noopener noreferrer">
              Visit Website
              <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        )}
      </div>
    </Card>
  );
};

export default RoadmapCard;
