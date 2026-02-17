import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [showShine, setShowShine] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowShine(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    if (user) {
      navigate("/assessment");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden relative">
      {/* Shine Animation Overlay */}
      {showShine && (
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0 animate-shine-flow"
            style={{
              background: `linear-gradient(
                -45deg,
                transparent 0%,
                transparent 40%,
                hsl(210 100% 60% / 0.15) 45%,
                hsl(210 100% 70% / 0.3) 50%,
                hsl(200 100% 80% / 0.15) 55%,
                transparent 60%,
                transparent 100%
              )`,
              width: '200%',
              height: '200%',
              top: '-50%',
              left: '-50%',
            }}
          />
        </div>
      )}

      <Navigation />

      {/* Hero Section - Fullscreen */}
      <section className="flex-1 relative overflow-hidden flex items-center justify-center py-8 md:py-0">
        {/* Background gradient */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsl(210 100% 36% / 0.08), hsl(0 0% 100%), hsl(51 100% 50% / 0.08))' }} />

        {/* Ambient glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-8">
            <h1
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight opacity-0 animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              {t('index.heroTitle1')}
              <span className="text-primary">{t('index.heroTitle2')}</span>
            </h1>

            <p
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto opacity-0 animate-fade-in-up"
              style={{ animationDelay: '0.6s' }}
            >
              {t('index.heroSubtitle')}
            </p>

            <div
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center pt-2 md:pt-4 pb-4 md:pb-0 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '0.9s' }}
            >
              <Button variant="hero" size="lg" className="group" onClick={handleGetStarted}>
                {t('index.getStarted')}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link to="/about">
                <Button variant="outline" size="lg">
                  {t('index.learnMore')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-3 md:py-4 bg-secondary/20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">{t('index.footer')}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
