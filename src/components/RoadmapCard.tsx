import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PersonalizedRecommendation } from "@/lib/assessmentLogic";
import { useLanguage } from "@/hooks/useLanguage";
import { Phone, MapPin, ArrowUpRight, Building2 } from "lucide-react";

interface RoadmapCardProps {
  recommendation: PersonalizedRecommendation;
  index: number;
  variant: 'blue' | 'teal' | 'yellow';
}

const RoadmapCard = ({ recommendation, index, variant }: RoadmapCardProps) => {
  const { resource, regionMatch } = recommendation;
  const { t, language } = useLanguage();
  const isUk = language === 'uk';

  const regionMatchConfig = {
    exact: { label: t('resources.yourRegion'), className: 'bg-teal/10 text-teal border-teal/20' },
    nearby: { label: t('resources.nearby'), className: 'bg-primary/10 text-primary border-primary/20' },
    other: null,
  };

  const regionInfo = regionMatch ? regionMatchConfig[regionMatch] : null;

  // Show Ukrainian title if available and language is UK
  const title = isUk && resource.titleUa ? resource.titleUa : resource.title;
  const subtitle = isUk ? resource.title : resource.titleUa; // Show opposite as subtitle

  return (
    <div className={`group relative rounded-xl border transition-all duration-200 hover:shadow-[var(--shadow-soft)] hover:-translate-y-0.5 ${
      regionMatch === 'exact' ? 'border-teal/20 bg-teal/[0.03]' : 'border-border/40 bg-background hover:border-border'
    }`}>
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${variant === 'blue' ? 'bg-primary/10 text-primary' : 'bg-teal/10 text-teal'}`}>
              <Building2 className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h4 className="font-semibold text-foreground text-sm leading-tight group-hover:text-primary transition-colors truncate">
                {title}
              </h4>
              {subtitle && (
                <p className="text-xs text-muted-foreground/60 italic truncate">{subtitle}</p>
              )}
            </div>
          </div>
          {regionInfo && (
            <Badge variant="outline" className={`shrink-0 text-[10px] font-medium ${regionInfo.className}`}>
              <MapPin className="h-2.5 w-2.5 mr-0.5" />{regionInfo.label}
            </Badge>
          )}
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{resource.description}</p>

        {resource.contact && (resource.type === 'prosthetic-center' || resource.id === 'sup-national-1') && (
          <div className="inline-flex items-center gap-1.5 text-sm bg-secondary/60 rounded-lg px-2.5 py-1.5">
            <Phone className="h-3.5 w-3.5 text-primary" />
            <span className="font-medium text-foreground">{resource.contact}</span>
          </div>
        )}

        {resource.address && (
          <div className="inline-flex items-center gap-1.5 text-muted-foreground text-sm">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate max-w-[220px]">{resource.address}</span>
          </div>
        )}

        {resource.website && (
          <Button variant="outline" size="sm" className="w-full font-medium group/btn" asChild>
            <a href={resource.website} target="_blank" rel="noopener noreferrer">
              {t('resources.visitWebsite')}
              <ArrowUpRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};

export default RoadmapCard;
