// Ukrainian Amputee Assistance Resources Database

export interface Resource {
  id: string;
  title: string;
  titleUa?: string;
  description: string;
  descriptionUa?: string;
  contact?: string;
  email?: string;
  website?: string;
  address?: string;
  type: 'government' | 'hospital' | 'prosthetic-center' | 'rehab' | 'ngo' | 'manufacturer' | 'financial' | 'support';
  urgencyLevel?: 'immediate' | 'high' | 'medium' | 'low';
  tags: string[];
  region?: string; // Region ID for location-based prioritization
  rating?: number; // Rating out of 100
}

export interface ResourceCategory {
  id: string;
  name: string;
  nameUa?: string;
  icon: string;
  resources: Resource[];
}

// Ukrainian State Prosthetics Programs
export const statePrograms: Resource[] = [
  {
    id: 'state-1',
    title: 'Ministry of Social Policy Prosthetics Program',
    titleUa: 'Програма протезування Міністерства соціальної політики',
    description: 'State-funded program providing free prosthetic devices, wheelchairs, and rehabilitation aids for war veterans and civilians with disabilities.',
    website: 'https://www.msp.gov.ua',
    type: 'government',
    tags: ['veterans', 'civilians', 'free', 'prosthetics'],
  },
  {
    id: 'state-2',
    title: 'Ukrainian War Veterans Fund',
    titleUa: 'Фонд ветеранів війни України',
    description: 'Comprehensive support for war veterans including prosthetics funding, rehabilitation, and social reintegration programs.',
    website: 'https://veteranfund.com.ua',
    type: 'government',
    tags: ['veterans', 'funding', 'rehabilitation'],
  },
  {
    id: 'state-3',
    title: 'MSEC Disability Assessment Commission',
    titleUa: 'МСЕК - Медико-соціальна експертна комісія',
    description: 'Official body for disability status determination, required for accessing state benefits and prosthetic programs.',
    type: 'government',
    tags: ['disability', 'assessment', 'documentation'],
  },
  {
    id: 'state-4',
    title: 'Pension Fund of Ukraine - Disability Benefits',
    titleUa: 'Пенсійний фонд України - Виплати по інвалідності',
    description: 'Monthly disability pension and one-time payments for veterans and war-injured civilians.',
    website: 'https://www.pfu.gov.ua',
    type: 'financial',
    tags: ['pension', 'monthly-payments', 'veterans'],
  },
];

// Prosthetic Centers - organized by oblast (English names)
export const prostheticCenters: Resource[] = [
  // Kyiv Oblast
  {
    id: 'pc-kyiv-1',
    title: 'Avanti Trade',
    titleUa: 'Аванті Трейд',
    description: 'Prosthetic and orthotic center in Kyiv offering comprehensive prosthetic services.',
    contact: '+38 067 356 3933',
    email: 'avanticare.kyiv@gmail.com',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'orthotics', 'kyiv'],
    region: 'kyiv',
    rating: 77,
  },
  {
    id: 'pc-kyiv-2',
    title: 'Antis-Orto',
    titleUa: 'Антис-Орто',
    description: 'Prosthetic and orthotic services center in Kyiv.',
    contact: '+38 066 344 82 24',
    email: 'antisorto@gmail.com',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'orthotics', 'kyiv'],
    region: 'kyiv',
    rating: 86,
  },
  {
    id: 'pc-kyiv-3',
    title: 'Ukrprotez LLC',
    titleUa: 'ТОВ Укрпротез',
    description: 'Ukrainian prosthetic enterprise providing prosthetic manufacturing and fitting services.',
    contact: '+38 066 162 4050',
    email: 'kyiv-ukrprotez@ukr.net',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'manufacturing', 'kyiv'],
    region: 'kyiv',
    rating: 84,
  },
  {
    id: 'pc-kyiv-4',
    title: 'ORTTECH Ukraine',
    titleUa: 'ОРТТЕХ Україна',
    description: 'High-rated prosthetic and orthotic technology center in Kyiv.',
    contact: '+38 095 111 33 43',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'orthotics', 'technology', 'kyiv'],
    region: 'kyiv',
    rating: 95,
  },
  {
    id: 'pc-kyiv-5',
    title: 'Best Orto',
    titleUa: 'Бест Орто',
    description: 'Prosthetic and orthotic center providing quality services in Kyiv.',
    contact: '+38 097 157 87 99',
    email: 'bestorthoua@gmail.com',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'orthotics', 'kyiv'],
    region: 'kyiv',
  },
  {
    id: 'pc-kyiv-6',
    title: 'Forward Orto (Kyiv)',
    titleUa: 'Форвард Орто',
    description: 'Prosthetic and orthotic services in Kyiv.',
    contact: '+38 067 101 8263',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'orthotics', 'kyiv'],
    region: 'kyiv',
  },
  {
    id: 'pc-kyiv-7',
    title: 'Ortez Pro LLC',
    titleUa: 'ТОВ Ортез Про',
    description: 'Professional prosthetic and orthotic services in Kyiv.',
    contact: '+38 044 592 50 41, +38 097 988 98 81',
    email: 'ortez@ukr.net',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'orthotics', 'kyiv'],
    region: 'kyiv',
  },
  {
    id: 'pc-kyiv-8',
    title: 'Prosthetics.Pro',
    titleUa: 'Простетікс.Про',
    description: 'Professional prosthetic services center in Kyiv.',
    contact: '+38 095 490 10 00, +38 067 490 10 00',
    email: 'prostheticspro@protonmail.com',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'kyiv'],
    region: 'kyiv',
  },

  // Lviv Oblast
  {
    id: 'pc-lviv-1',
    title: 'Vilni Prosthetic-Orthotic Center',
    titleUa: "ЦПО 'Вільні'",
    description: 'Top-rated prosthetic and orthotic center in Lviv with excellent patient reviews.',
    contact: '+38 097 614 3445',
    type: 'prosthetic-center',
    urgencyLevel: 'high',
    tags: ['prosthetics', 'orthotics', 'top-rated', 'lviv'],
    region: 'lviv',
    rating: 98,
  },
  {
    id: 'pc-lviv-2',
    title: 'Superhumans',
    titleUa: 'Superhumans',
    description: 'State-of-the-art prosthetic and rehabilitation center offering free services for war victims, including advanced bionic prosthetics.',
    email: 'help@superhumans.com',
    website: 'https://superhumans.com',
    type: 'prosthetic-center',
    urgencyLevel: 'high',
    tags: ['bionic', 'free', 'advanced', 'rehabilitation', 'lviv'],
    region: 'lviv',
    rating: 83,
  },
  {
    id: 'pc-lviv-3',
    title: 'Orthogenesis LLC',
    titleUa: 'ТОВ Ортогенезіс',
    description: 'Prosthetic and orthotic services in Lviv.',
    contact: '+38 097 054 7777',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'orthotics', 'lviv'],
    region: 'lviv',
  },
  {
    id: 'pc-lviv-4',
    title: 'Ortomobil LLC',
    titleUa: "ТОВ 'Ортомобіл'",
    description: 'Prosthetic and orthotic enterprise in Lviv.',
    contact: '+38 067 555 73 82, +38 067 556 01 21',
    email: 'ortomobillviv@gmail.com',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'orthotics', 'lviv'],
    region: 'lviv',
  },

  // Kharkiv Oblast
  {
    id: 'pc-kharkiv-1',
    title: 'Sigma-Orto',
    titleUa: 'Сигма-орто',
    description: 'Prosthetic and orthotic center in Kharkiv.',
    contact: '+380 97 461 90 60',
    email: 'sigma-orto@ukr.net',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'orthotics', 'kharkiv'],
    region: 'kharkiv',
  },
  {
    id: 'pc-kharkiv-2',
    title: 'Orthoped (Kharkiv)',
    titleUa: 'Ортопед',
    description: 'Prosthetic and orthopedic services in Kharkiv.',
    contact: '+38 067 577 8189, +38 050 088 1190',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'orthopedic', 'kharkiv'],
    region: 'kharkiv',
  },
  {
    id: 'pc-kharkiv-3',
    title: 'Activorto LLC (Kharkiv)',
    titleUa: 'ТОВ Активорто',
    description: 'Active orthotic and prosthetic services in Kharkiv.',
    contact: '+38 095 017 9363',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'orthotics', 'kharkiv'],
    region: 'kharkiv',
  },
  {
    id: 'pc-kharkiv-4',
    title: 'Opora-Plus Enterprise',
    titleUa: 'ТОВ ВПОП Опора-плюс',
    description: 'Prosthetic enterprise providing support services in Kharkiv.',
    contact: '+38 095 843 5395',
    email: 'oporaplus@gmail.com',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'support', 'kharkiv'],
    region: 'kharkiv',
  },

  // Zaporizhzhia Oblast
  {
    id: 'pc-zaporizhzhia-1',
    title: 'Brave Step',
    titleUa: 'Сміливий крок',
    description: 'Highly-rated prosthetic center in Zaporizhzhia.',
    contact: '+380 63 160 5337, +380 99 177 0303',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'zaporizhzhia'],
    region: 'zaporizhzhia',
    rating: 87,
  },

  // Zhytomyr Oblast
  {
    id: 'pc-zhytomyr-1',
    title: 'Antis-Orto (Zhytomyr)',
    titleUa: 'Антис-Орто',
    description: 'Prosthetic and orthotic services in Zhytomyr.',
    contact: '+38 068 811 3959',
    email: 'antisorto@gmail.com',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'orthotics', 'zhytomyr'],
    region: 'zhytomyr',
  },
  {
    id: 'pc-zhytomyr-2',
    title: 'Forward Orto (Zhytomyr)',
    titleUa: 'Форвард Орто',
    description: 'Prosthetic and orthotic services in Zhytomyr.',
    contact: '+38 097 929 7270',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'orthotics', 'zhytomyr'],
    region: 'zhytomyr',
  },
  {
    id: 'pc-zhytomyr-3',
    title: 'Ukrprotez LLC (Zhytomyr)',
    titleUa: 'ТОВ Укрпротез',
    description: 'Ukrainian prosthetic enterprise branch in Zhytomyr.',
    contact: '+380 68 745 3870',
    email: 'w.shynkarenko@gmail.com',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'zhytomyr'],
    region: 'zhytomyr',
  },
  {
    id: 'pc-zhytomyr-4',
    title: 'SOF-Orto',
    titleUa: 'СОФ-Орто',
    description: 'Prosthetic and orthotic center in Zhytomyr with good ratings.',
    contact: '+38 067 727 4111',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'orthotics', 'zhytomyr'],
    region: 'zhytomyr',
    rating: 87,
  },

  // Chernivtsi Oblast
  {
    id: 'pc-chernivtsi-1',
    title: 'Chernivtsi Prosthetic-Orthopedic Workshop',
    titleUa: 'Чернівецький протезно-ортопедичний цех',
    description: 'Regional prosthetic and orthopedic workshop in Chernivtsi.',
    contact: '+38 050 424 19 90',
    email: 'chernsc@ukr.net',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'orthopedic', 'regional', 'chernivtsi'],
    region: 'chernivtsi',
  },
  {
    id: 'pc-chernivtsi-2',
    title: 'Opora (Chernivtsi)',
    titleUa: 'Опора',
    description: 'Prosthetic support center in Chernivtsi.',
    contact: '+38 097 913 95 75',
    email: 'opora2002@ukr.net',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'support', 'chernivtsi'],
    region: 'chernivtsi',
  },
  {
    id: 'pc-chernivtsi-3',
    title: 'Ortotop (Chernivtsi)',
    titleUa: 'Ортотоп',
    description: 'Prosthetic and orthotic services in Chernivtsi.',
    contact: '+38 050 029 6005',
    email: 'ortotop.chernivtsi@gmail.com',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'orthotics', 'chernivtsi'],
    region: 'chernivtsi',
  },
  {
    id: 'pc-chernivtsi-4',
    title: 'Swedish-Ukrainian Engelholm Clinic',
    titleUa: 'ТОВ Шведсько-українська клініка Енгельхольм',
    description: 'Swedish-Ukrainian clinic offering prosthetic and orthopedic services in Chernivtsi.',
    contact: '+38 050 50 50 103, +38 068 50 50 103',
    email: 'trauma.ua@gmail.com',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'international', 'clinic', 'chernivtsi'],
    region: 'chernivtsi',
  },

  // Cherkasy Oblast
  {
    id: 'pc-cherkasy-1',
    title: 'Opora (Cherkasy)',
    titleUa: 'Опора',
    description: 'Prosthetic support center in Cherkasy with good ratings.',
    contact: '+38 066 215 22 14',
    email: 'oporack@ukr.net',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'support', 'cherkasy'],
    region: 'cherkasy',
    rating: 80,
  },
  {
    id: 'pc-cherkasy-2',
    title: 'Orthoped (Cherkasy)',
    titleUa: 'Ортопед',
    description: 'Prosthetic and orthopedic services in Cherkasy.',
    contact: '+38 097 144 1284, +38 073 144 1282',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'orthopedic', 'cherkasy'],
    region: 'cherkasy',
  },

  // Chernihiv Oblast
  {
    id: 'pc-chernihiv-1',
    title: 'Without Limits',
    titleUa: 'Без Обмежень',
    description: 'Highly-rated prosthetic center in Chernihiv.',
    contact: '050 984 9685',
    email: 'chernihiv@obmezhen.net',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'chernihiv'],
    region: 'chernihiv',
    rating: 90,
  },

  // Dnipropetrovsk Oblast
  {
    id: 'pc-dnipro-1',
    title: 'Forward Orto (Dnipro)',
    titleUa: 'Форвард Орто',
    description: 'Prosthetic and orthotic services in Dnipro.',
    contact: '+38 067 101 8270',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'orthotics', 'dnipro'],
    region: 'dnipropetrovsk',
    rating: 78,
  },
  {
    id: 'pc-dnipro-2',
    title: 'Activorto LLC (Dnipro)',
    titleUa: "ТОВ 'Активорто'",
    description: 'Active orthotic and prosthetic services in Dnipro.',
    contact: '+380 67 830 8498',
    email: 'activorto@ukr.net',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'orthotics', 'dnipro'],
    region: 'dnipropetrovsk',
  },
  {
    id: 'pc-dnipro-3',
    title: 'Orto-Trade LLC',
    titleUa: 'ТОВ Орто-Трейд',
    description: 'Highly-rated prosthetic trade and services center in Dnipro.',
    contact: '+380 95 645 3007',
    email: '43513478@ukr.net',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'trade', 'dnipro'],
    region: 'dnipropetrovsk',
    rating: 90,
  },

  // Donetsk Oblast
  {
    id: 'pc-donetsk-1',
    title: 'Orthoped (Kramatorsk)',
    titleUa: 'Ортопед',
    description: 'Prosthetic and orthopedic services in Kramatorsk, Donetsk Oblast.',
    contact: '+38 050 027 0898',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'orthopedic', 'kramatorsk', 'donetsk'],
    region: 'donetsk',
  },

  // Kirovohrad Oblast
  {
    id: 'pc-kirovohrad-1',
    title: 'Orthoped (Kropyvnytskyi)',
    titleUa: 'Ортопед',
    description: 'Prosthetic and orthopedic services in Kropyvnytskyi.',
    contact: '+38 066 382 2139',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'orthopedic', 'kropyvnytskyi'],
    region: 'kirovohrad',
  },
  {
    id: 'pc-kirovohrad-2',
    title: 'Drukmash Center LLC',
    titleUa: 'ТОВ Друкмаш Центр',
    description: 'Prosthetic services center in Kropyvnytskyi.',
    contact: '050 450 77 72',
    email: 'drukmash1@ukr.net',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'kropyvnytskyi'],
    region: 'kirovohrad',
  },

  // Sumy Oblast
  {
    id: 'pc-sumy-1',
    title: 'Orthoped (Sumy)',
    titleUa: 'Ортопед',
    description: 'Prosthetic and orthopedic services in Sumy.',
    contact: '+38 095 363 7189, +380 97 169 9364',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'orthopedic', 'sumy'],
    region: 'sumy',
  },
  {
    id: 'pc-sumy-2',
    title: 'Forward Orto (Sumy)',
    titleUa: 'Форвард Орто',
    description: 'Prosthetic and orthotic services in Sumy.',
    contact: '+38 067 654 7804',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'orthotics', 'sumy'],
    region: 'sumy',
  },

  // Poltava Oblast
  {
    id: 'pc-poltava-1',
    title: 'Ortotop (Poltava)',
    titleUa: 'Ортотоп',
    description: 'Prosthetic and orthotic services in Poltava.',
    contact: '+38 095 287 7330',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'orthotics', 'poltava'],
    region: 'poltava',
  },

  // Volyn Oblast
  {
    id: 'pc-volyn-1',
    title: 'Ortotop (Lutsk)',
    titleUa: 'Ортотоп',
    description: 'Prosthetic and orthotic services in Lutsk, Volyn Oblast.',
    contact: '+38 067 387 8277',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'orthotics', 'lutsk', 'volyn'],
    region: 'volyn',
  },

  // Ivano-Frankivsk Oblast
  {
    id: 'pc-ivano-frankivsk-1',
    title: 'ORTOP Private Enterprise',
    titleUa: "ПП 'ОРТОП'",
    description: 'Private prosthetic and orthopedic enterprise in Ivano-Frankivsk.',
    contact: '+380 66 348 8311',
    email: 'ortopif@gmail.com',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'orthopedic', 'ivano-frankivsk'],
    region: 'ivano-frankivsk',
  },

  // Khmelnytskyi Oblast
  {
    id: 'pc-khmelnytskyi-1',
    title: 'Khmelnytskyi State Prosthetic Enterprise',
    titleUa: 'Хмельницьке ДЕПОП',
    description: 'State prosthetic and orthopedic enterprise in Khmelnytskyi.',
    contact: '+380 67 383 2574',
    type: 'prosthetic-center',
    tags: ['prosthetics', 'state', 'khmelnytskyi'],
    region: 'khmelnytskyi',
  },
];

// Hospitals - empty, only scraped prosthetic centers are included
export const hospitals: Resource[] = [];

// Rehabilitation Centers - empty, only scraped prosthetic centers are included
export const rehabCenters: Resource[] = [];

// NGOs and International Aid - prioritizing orgs with unique services (legal help, etc.)
export const ngoResources: Resource[] = [
  {
    id: 'ngo-1',
    title: 'ICRC Ukraine Mission',
    titleUa: 'Місія МКЧХ в Україні',
    description: 'International Committee of Red Cross provides prosthetic services, physical rehabilitation, legal documentation assistance, and family tracing services.',
    website: 'https://www.icrc.org/en/where-we-work/europe-central-asia/ukraine',
    type: 'ngo',
    urgencyLevel: 'high',
    tags: ['international', 'prosthetics', 'legal', 'documentation'],
  },
  {
    id: 'ngo-2',
    title: 'Ukrainian Legal Aid Foundation',
    titleUa: 'Український фонд правової допомоги',
    description: 'Free legal assistance for war-affected individuals including disability rights, benefits claims, and advocacy.',
    website: 'https://legalaid.org.ua',
    type: 'ngo',
    tags: ['legal', 'rights', 'advocacy', 'free'],
  },
  {
    id: 'ngo-3',
    title: 'Handicap International Ukraine',
    titleUa: 'Handicap International Україна',
    description: 'Rehabilitation services, mobility device provision, accessibility advocacy, and rights-based support programs.',
    website: 'https://www.hi-us.org/ukraine',
    type: 'ngo',
    tags: ['rehabilitation', 'accessibility', 'advocacy', 'rights'],
  },
  {
    id: 'ngo-4',
    title: 'Right to Protection (R2P)',
    titleUa: 'Право на захист',
    description: 'Legal aid, documentation support, and social services for war-affected civilians and veterans.',
    website: 'https://r2p.org.ua',
    type: 'ngo',
    tags: ['legal', 'documentation', 'social-services'],
  },
  {
    id: 'ngo-5',
    title: 'Revived Soldiers Ukraine',
    titleUa: 'Відроджені Воїни України',
    description: 'US-based Ukrainian charity providing prosthetics, medical treatment coordination, and rehabilitation navigation for wounded soldiers.',
    website: 'https://www.rsukraine.org',
    type: 'ngo',
    tags: ['prosthetics', 'coordination', 'veterans'],
  },
  {
    id: 'ngo-6',
    title: 'United24 - Health',
    titleUa: "United24 - Здоров'я",
    description: 'Official Ukrainian platform supporting medical rehabilitation infrastructure and prosthetics programs.',
    website: 'https://u24.gov.ua/health',
    type: 'ngo',
    urgencyLevel: 'medium',
    tags: ['official', 'rehabilitation', 'infrastructure'],
  },
];


// Financial Aid & Veteran Support
export const financialAid: Resource[] = [
  {
    id: 'fin-1',
    title: 'Veteran Status Registration',
    titleUa: 'Реєстрація статусу ветерана',
    description: 'Essential first step to access government benefits. Register through local military commissariat or Diia app.',
    website: 'https://diia.gov.ua',
    type: 'financial',
    urgencyLevel: 'immediate',
    tags: ['registration', 'first-step', 'diia'],
  },
  {
    id: 'fin-2',
    title: 'One-Time Cash Assistance',
    titleUa: 'Одноразова грошова допомога',
    description: 'Lump sum payment of 100,000+ UAH for war veterans with disabilities, processed through Pension Fund.',
    type: 'financial',
    tags: ['lump-sum', 'veterans', 'disability'],
  },
  {
    id: 'fin-3',
    title: 'Housing Adaptation Grant',
    titleUa: 'Грант на адаптацію житла',
    description: 'Funding for home modifications including ramps, accessible bathrooms, and mobility aids.',
    type: 'financial',
    tags: ['housing', 'accessibility', 'modifications'],
  },
  {
    id: 'fin-4',
    title: 'Employment Support Program',
    titleUa: 'Програма підтримки працевлаштування',
    description: 'Government program providing job training, placement assistance, and employer incentives for hiring veterans.',
    website: 'https://www.dcz.gov.ua',
    type: 'financial',
    tags: ['employment', 'training', 'veterans'],
  },
];

// Community Support Services - organized by region
export const supportServices: Resource[] = [
  // National/All regions
  {
    id: 'sup-national-1',
    title: 'National Veteran Support Hotline',
    titleUa: 'Національна гаряча лінія підтримки ветеранів',
    description: '24/7 psychological support and crisis intervention for veterans and their families across Ukraine.',
    contact: '+380 800 500 335',
    type: 'support',
    urgencyLevel: 'immediate',
    tags: ['24/7', 'psychological', 'crisis', 'national'],
  },
  // Kyiv Oblast
  {
    id: 'sup-kyiv-1',
    title: 'Kyiv Amputee Peer Support Group',
    titleUa: 'Київська група взаємопідтримки ампутантів',
    description: 'Weekly peer meetings for amputees in Kyiv to share experiences and practical advice.',
    address: 'Kyiv, Khreshchatyk St. 22',
    type: 'support',
    region: 'kyiv',
    tags: ['peer', 'community', 'weekly-meetings'],
  },
  {
    id: 'sup-kyiv-2',
    title: 'Kyiv Family Counseling Center',
    titleUa: 'Київський центр сімейного консультування',
    description: 'Professional support for families adjusting to life changes after amputation.',
    address: 'Kyiv, Velyka Vasylkivska St. 100',
    type: 'support',
    region: 'kyiv',
    tags: ['family', 'counseling', 'adjustment'],
  },
  // Lviv Oblast
  {
    id: 'sup-lviv-1',
    title: 'Unbroken Lviv Support Center',
    titleUa: 'Центр підтримки Незламні Львів',
    description: 'Comprehensive support services including peer mentorship, rehabilitation guidance, and community events.',
    address: 'Lviv, Svobody Ave. 28',
    website: 'https://unbroken.ua',
    type: 'support',
    region: 'lviv',
    tags: ['peer', 'rehabilitation', 'community'],
  },
  {
    id: 'sup-lviv-2',
    title: 'Lviv Veterans Community Hub',
    titleUa: 'Львівський ветеранський хаб',
    description: 'Social space for veterans to connect, access resources, and attend skill-building workshops.',
    address: 'Lviv, Rynok Square 10',
    type: 'support',
    region: 'lviv',
    tags: ['veterans', 'community', 'workshops'],
  },
  // Kharkiv Oblast
  {
    id: 'sup-kharkiv-1',
    title: 'Kharkiv Rehabilitation Support Network',
    titleUa: 'Харківська мережа підтримки реабілітації',
    description: 'Volunteer network providing transportation, home visits, and emotional support for amputees.',
    type: 'support',
    region: 'kharkiv',
    tags: ['volunteers', 'transportation', 'home-visits'],
  },
  // Dnipro Oblast
  {
    id: 'sup-dnipro-1',
    title: 'Dnipro Amputee Sports Club',
    titleUa: 'Дніпровський спортивний клуб ампутантів',
    description: 'Adaptive sports programs and social activities for amputees in Dnipropetrovsk region.',
    address: 'Dnipro, Haharina Ave. 72',
    type: 'support',
    region: 'dnipropetrovsk',
    tags: ['sports', 'adaptive', 'social'],
  },
  {
    id: 'sup-dnipro-2',
    title: 'Dnipro Family Support Services',
    titleUa: 'Дніпровські служби підтримки сімей',
    description: 'Counseling and support groups for families of amputees in the Dnipro region.',
    type: 'support',
    region: 'dnipropetrovsk',
    tags: ['family', 'counseling', 'groups'],
  },
  // Odesa Oblast
  {
    id: 'sup-odesa-1',
    title: 'Odesa Veterans Peer Network',
    titleUa: 'Одеська мережа ветеранів',
    description: 'Peer mentorship program connecting newly injured veterans with experienced amputees.',
    type: 'support',
    region: 'odesa',
    tags: ['peer', 'mentorship', 'veterans'],
  },
  // Zaporizhzhia Oblast
  {
    id: 'sup-zaporizhzhia-1',
    title: 'Zaporizhzhia Community Care Center',
    titleUa: 'Запорізький центр громадської турботи',
    description: 'Comprehensive community support including housing assistance, job placement, and emotional support.',
    type: 'support',
    region: 'zaporizhzhia',
    tags: ['housing', 'employment', 'comprehensive'],
  },
  // Vinnytsia Oblast
  {
    id: 'sup-vinnytsia-1',
    title: 'Vinnytsia Rehabilitation Community',
    titleUa: 'Вінницька реабілітаційна спільнота',
    description: 'Support group and resource center for amputees going through rehabilitation.',
    address: 'Vinnytsia, Soborna St. 45',
    type: 'support',
    region: 'vinnytsia',
    tags: ['rehabilitation', 'support-group', 'resources'],
  },
  // Poltava Oblast
  {
    id: 'sup-poltava-1',
    title: 'Poltava Veterans Support Circle',
    titleUa: 'Полтавське коло підтримки ветеранів',
    description: 'Regular meetings and mutual aid for veterans and their families in Poltava region.',
    type: 'support',
    region: 'poltava',
    tags: ['veterans', 'mutual-aid', 'families'],
  },
  // Cherkasy Oblast
  {
    id: 'sup-cherkasy-1',
    title: 'Cherkasy Amputee Support Association',
    titleUa: 'Черкаська асоціація підтримки ампутантів',
    description: 'Local organization providing peer support, advocacy, and community resources.',
    type: 'support',
    region: 'cherkasy',
    tags: ['advocacy', 'peer', 'local'],
  },
  // Sumy Oblast
  {
    id: 'sup-sumy-1',
    title: 'Sumy Community Rehabilitation Network',
    titleUa: 'Сумська мережа громадської реабілітації',
    description: 'Volunteer-run support network connecting amputees with local resources and peer mentors.',
    type: 'support',
    region: 'sumy',
    tags: ['volunteers', 'network', 'mentors'],
  },
  // Ivano-Frankivsk Oblast
  {
    id: 'sup-ivano-frankivsk-1',
    title: 'Ivano-Frankivsk Veteran Family Center',
    titleUa: 'Івано-Франківський центр ветеранських сімей',
    description: 'Family-focused support services including counseling, childcare, and spousal support.',
    type: 'support',
    region: 'ivano-frankivsk',
    tags: ['family', 'counseling', 'childcare'],
  },
  // Khmelnytskyi Oblast
  {
    id: 'sup-khmelnytskyi-1',
    title: 'Khmelnytskyi Amputee Community',
    titleUa: 'Хмельницька спільнота ампутантів',
    description: 'Local peer support and social activities for amputees in Khmelnytskyi region.',
    type: 'support',
    region: 'khmelnytskyi',
    tags: ['peer', 'social', 'local'],
  },
  // Volyn Oblast
  {
    id: 'sup-volyn-1',
    title: 'Volyn Veterans Support Hub',
    titleUa: 'Волинський хаб підтримки ветеранів',
    description: 'Resource center and meeting space for veterans and amputees in Volyn region.',
    type: 'support',
    region: 'volyn',
    tags: ['veterans', 'resources', 'community'],
  },
];

// Combined medical facilities (for backwards compatibility)
export const medicalFacilities: Resource[] = [
  ...hospitals,
  ...rehabCenters,
  ...prostheticCenters,
];

// All resources combined
export const allResources = {
  statePrograms,
  prostheticCenters,
  hospitals,
  rehabCenters,
  medicalFacilities,
  ngoResources,
  financialAid,
  supportServices,
};
