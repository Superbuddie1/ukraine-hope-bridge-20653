import Navigation from "@/components/Navigation";
import { Heart, Shield, BookOpen } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import harleyPhoto from "@/assets/harley.jpeg";
import victorPhoto from "@/assets/victor.jpeg";

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-16 max-w-3xl">
        {/* Opening */}
        <section className="mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
            {t('about.title')}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('about.intro')}
          </p>
        </section>

        {/* Founders */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-6">{t('about.whoWeAre')}</h2>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-6">
            <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-border">
              <img src={harleyPhoto} alt="Harley Thorpe" className="w-full h-full object-cover" />
            </div>
            <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-border">
              <img src={victorPhoto} alt="Victor Pivtoran" className="w-full h-full object-cover" />
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground italic mb-8">
            {t('about.foundersCaption')}
          </p>

          <p className="text-muted-foreground leading-relaxed mb-4">{t('about.whoWeAreP1')}</p>
          <p className="text-muted-foreground leading-relaxed">{t('about.whoWeAreP2')}</p>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-6">{t('about.whatGuidesUs')}</h2>
          <div className="grid gap-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 rounded-full p-3 shrink-0">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{t('about.contributionTitle')}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t('about.contributionText')}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 rounded-full p-3 shrink-0">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{t('about.responsibilityTitle')}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t('about.responsibilityText')}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 rounded-full p-3 shrink-0">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{t('about.learningTitle')}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t('about.learningText')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="border-t border-border pt-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">{t('about.lookingForward')}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{t('about.lookingForwardP1')}</p>
          <p className="text-muted-foreground leading-relaxed">{t('about.lookingForwardP2')}</p>
        </section>
      </div>
    </div>
  );
};

export default About;
