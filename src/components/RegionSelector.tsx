import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';

export const UKRAINIAN_REGIONS = [
  { id: 'vinnytsia', name: 'Vinnytsia Oblast', nameUk: 'Вінницька область' },
  { id: 'volyn', name: 'Volyn Oblast', nameUk: 'Волинська область' },
  { id: 'dnipropetrovsk', name: 'Dnipropetrovsk Oblast', nameUk: 'Дніпропетровська область' },
  { id: 'donetsk', name: 'Donetsk Oblast', nameUk: 'Донецька область' },
  { id: 'zhytomyr', name: 'Zhytomyr Oblast', nameUk: 'Житомирська область' },
  { id: 'zakarpattia', name: 'Zakarpattia Oblast', nameUk: 'Закарпатська область' },
  { id: 'zaporizhzhia', name: 'Zaporizhzhia Oblast', nameUk: 'Запорізька область' },
  { id: 'ivano-frankivsk', name: 'Ivano-Frankivsk Oblast', nameUk: 'Івано-Франківська область' },
  { id: 'kyiv-oblast', name: 'Kyiv Oblast', nameUk: 'Київська область' },
  { id: 'kyiv', name: 'Kyiv', nameUk: 'Київ' },
  { id: 'kirovohrad', name: 'Kirovohrad Oblast', nameUk: 'Кіровоградська область' },
  { id: 'luhansk', name: 'Luhansk Oblast', nameUk: 'Луганська область' },
  { id: 'lviv', name: 'Lviv Oblast', nameUk: 'Львівська область' },
  { id: 'mykolaiv', name: 'Mykolaiv Oblast', nameUk: 'Миколаївська область' },
  { id: 'odesa', name: 'Odesa Oblast', nameUk: 'Одеська область' },
  { id: 'poltava', name: 'Poltava Oblast', nameUk: 'Полтавська область' },
  { id: 'rivne', name: 'Rivne Oblast', nameUk: 'Рівненська область' },
  { id: 'sumy', name: 'Sumy Oblast', nameUk: 'Сумська область' },
  { id: 'ternopil', name: 'Ternopil Oblast', nameUk: 'Тернопільська область' },
  { id: 'kharkiv', name: 'Kharkiv Oblast', nameUk: 'Харківська область' },
  { id: 'kherson', name: 'Kherson Oblast', nameUk: 'Херсонська область' },
  { id: 'khmelnytskyi', name: 'Khmelnytskyi Oblast', nameUk: 'Хмельницька область' },
  { id: 'cherkasy', name: 'Cherkasy Oblast', nameUk: 'Черкаська область' },
  { id: 'chernivtsi', name: 'Chernivtsi Oblast', nameUk: 'Чернівецька область' },
  { id: 'chernihiv', name: 'Chernihiv Oblast', nameUk: 'Чернігівська область' },
  { id: 'crimea', name: 'Autonomous Republic of Crimea', nameUk: 'Автономна Республіка Крим' },
] as const;

export type RegionId = typeof UKRAINIAN_REGIONS[number]['id'];

interface RegionSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const RegionSelector = ({ value, onChange }: RegionSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const { t, language } = useLanguage();
  const isUk = language === 'uk';

  const filteredRegions = useMemo(() => {
    if (!searchQuery.trim()) return UKRAINIAN_REGIONS;
    const query = searchQuery.toLowerCase();
    return UKRAINIAN_REGIONS.filter(
      region =>
        region.name.toLowerCase().includes(query) ||
        region.nameUk.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('regionSelector.searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-background/50 border-primary/20 focus:border-primary/50 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
        <AnimatePresence mode="popLayout">
          {filteredRegions.map((region, index) => {
            const isSelected = value === region.id;
            const isHovered = hoveredRegion === region.id;

            return (
              <motion.button
                key={region.id}
                type="button"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.2, delay: index * 0.02, ease: "easeOut" }}
                onClick={() => onChange(region.id)}
                onMouseEnter={() => setHoveredRegion(region.id)}
                onMouseLeave={() => setHoveredRegion(null)}
                className={cn(
                  "relative group p-4 rounded-xl text-left transition-all duration-300",
                  "border-2 overflow-hidden",
                  isSelected
                    ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                    : "border-border/50 bg-card/50 hover:border-primary/50 hover:bg-primary/5"
                )}
              >
                {(isSelected || isHovered) && (
                  <motion.div
                    layoutId="region-glow"
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, hsl(210 100% 36% / 0.15), hsl(0 0% 100% / 0.5), hsl(51 100% 50% / 0.15))' }}
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}

                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(110deg, hsl(210 100% 36% / 0.05) 25%, hsl(0 0% 100% / 0.3) 50%, hsl(51 100% 50% / 0.05) 75%)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={isHovered ? { backgroundPosition: ['200% 0', '-200% 0'] } : {}}
                  transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                />

                <div className="relative z-10 flex items-start gap-3">
                  <div className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                  )}>
                    {isSelected ? (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 25 }}>
                        <Check className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <MapPin className="h-4 w-4" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={cn("font-medium text-sm truncate transition-colors", isSelected ? "text-primary" : "text-foreground")}>
                      {isUk ? region.nameUk : region.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {isUk ? region.name : region.nameUk}
                    </p>
                  </div>
                </div>

                {isSelected && (
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-primary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredRegions.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8 text-muted-foreground">
          <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>{t('regionSelector.noResults')} "{searchQuery}"</p>
        </motion.div>
      )}

      <AnimatePresence>
        {value && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 border border-primary/30">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">
              {t('regionSelector.selected')}: {isUk ? UKRAINIAN_REGIONS.find(r => r.id === value)?.nameUk : UKRAINIAN_REGIONS.find(r => r.id === value)?.name}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Region proximity data
export const REGION_PROXIMITY: Record<RegionId, RegionId[]> = {
  'vinnytsia': ['khmelnytskyi', 'zhytomyr', 'kyiv-oblast', 'cherkasy', 'kirovohrad', 'mykolaiv', 'odesa'],
  'volyn': ['rivne', 'lviv', 'zhytomyr'],
  'dnipropetrovsk': ['zaporizhzhia', 'kharkiv', 'poltava', 'kirovohrad', 'mykolaiv', 'kherson', 'donetsk'],
  'donetsk': ['luhansk', 'kharkiv', 'dnipropetrovsk', 'zaporizhzhia'],
  'zhytomyr': ['kyiv-oblast', 'rivne', 'volyn', 'khmelnytskyi', 'vinnytsia', 'chernihiv'],
  'zakarpattia': ['lviv', 'ivano-frankivsk'],
  'zaporizhzhia': ['dnipropetrovsk', 'donetsk', 'kherson', 'mykolaiv', 'kirovohrad'],
  'ivano-frankivsk': ['lviv', 'ternopil', 'chernivtsi', 'zakarpattia'],
  'kyiv-oblast': ['kyiv', 'chernihiv', 'zhytomyr', 'cherkasy', 'poltava', 'sumy'],
  'kyiv': ['kyiv-oblast', 'chernihiv', 'zhytomyr', 'cherkasy', 'poltava'],
  'kirovohrad': ['cherkasy', 'poltava', 'dnipropetrovsk', 'mykolaiv', 'vinnytsia'],
  'luhansk': ['donetsk', 'kharkiv'],
  'lviv': ['volyn', 'rivne', 'ternopil', 'ivano-frankivsk', 'zakarpattia'],
  'mykolaiv': ['odesa', 'kherson', 'dnipropetrovsk', 'kirovohrad', 'vinnytsia'],
  'odesa': ['mykolaiv', 'vinnytsia', 'kirovohrad'],
  'poltava': ['kharkiv', 'sumy', 'cherkasy', 'kyiv-oblast', 'dnipropetrovsk', 'kirovohrad'],
  'rivne': ['volyn', 'lviv', 'ternopil', 'khmelnytskyi', 'zhytomyr'],
  'sumy': ['kharkiv', 'poltava', 'chernihiv', 'kyiv-oblast'],
  'ternopil': ['lviv', 'rivne', 'khmelnytskyi', 'chernivtsi', 'ivano-frankivsk'],
  'kharkiv': ['sumy', 'poltava', 'dnipropetrovsk', 'donetsk', 'luhansk'],
  'kherson': ['mykolaiv', 'zaporizhzhia', 'dnipropetrovsk', 'crimea'],
  'khmelnytskyi': ['ternopil', 'rivne', 'zhytomyr', 'vinnytsia', 'chernivtsi'],
  'cherkasy': ['kyiv-oblast', 'poltava', 'kirovohrad', 'vinnytsia', 'zhytomyr'],
  'chernivtsi': ['ivano-frankivsk', 'ternopil', 'khmelnytskyi'],
  'chernihiv': ['kyiv-oblast', 'sumy', 'zhytomyr'],
  'crimea': ['kherson'],
};

export const getRegionName = (regionId: string): string => {
  return UKRAINIAN_REGIONS.find(r => r.id === regionId)?.name || regionId;
};

export const getRegionNameUk = (regionId: string): string => {
  return UKRAINIAN_REGIONS.find(r => r.id === regionId)?.nameUk || regionId;
};
