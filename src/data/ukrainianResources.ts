// Ukrainian Amputee Assistance Resources Database

export interface Resource {
  id: string;
  title: string;
  titleUa?: string;
  description: string;
  descriptionUa?: string;
  contact?: string;
  website?: string;
  address?: string;
  type: 'government' | 'hospital' | 'rehab' | 'ngo' | 'manufacturer' | 'financial' | 'support';
  urgencyLevel?: 'immediate' | 'high' | 'medium' | 'low';
  tags: string[];
  region?: string; // Region ID for location-based prioritization
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
    contact: '+380 44 289 8181',
    website: 'https://www.msp.gov.ua',
    type: 'government',
    tags: ['veterans', 'civilians', 'free', 'prosthetics'],
  },
  {
    id: 'state-2',
    title: 'Ukrainian War Veterans Fund',
    titleUa: 'Фонд ветеранів війни України',
    description: 'Comprehensive support for war veterans including prosthetics funding, rehabilitation, and social reintegration programs.',
    contact: '+380 44 253 7777',
    website: 'https://veteranfund.com.ua',
    type: 'government',
    tags: ['veterans', 'funding', 'rehabilitation'],
  },
  {
    id: 'state-3',
    title: 'MSEC Disability Assessment Commission',
    titleUa: 'МСЕК - Медико-соціальна експертна комісія',
    description: 'Official body for disability status determination, required for accessing state benefits and prosthetic programs.',
    contact: '+380 44 288 5555',
    type: 'government',
    tags: ['disability', 'assessment', 'documentation'],
  },
  {
    id: 'state-4',
    title: 'Pension Fund of Ukraine - Disability Benefits',
    titleUa: 'Пенсійний фонд України - Виплати по інвалідності',
    description: 'Monthly disability pension and one-time payments for veterans and war-injured civilians.',
    contact: '+380 44 503 0505',
    website: 'https://www.pfu.gov.ua',
    type: 'financial',
    tags: ['pension', 'monthly-payments', 'veterans'],
  },
];

// Hospitals & Rehabilitation Centers
export const medicalFacilities: Resource[] = [
  {
    id: 'med-1',
    title: 'National Military Medical Clinical Center (Kyiv)',
    titleUa: 'Національний військово-медичний клінічний центр',
    description: 'Primary military hospital with advanced prosthetic fitting, rehabilitation, and surgical capabilities.',
    contact: '+380 44 521 8888',
    address: 'Kyiv, Hospitalna St. 18',
    website: 'https://gvkg.com.ua',
    type: 'hospital',
    tags: ['military', 'surgery', 'prosthetics', 'kyiv'],
    region: 'kyiv',
  },
  {
    id: 'med-2',
    title: 'Lviv Regional Clinical Hospital',
    titleUa: 'Львівська обласна клінічна лікарня',
    description: 'Major regional hospital with dedicated rehabilitation department and prosthetic services.',
    contact: '+380 32 270 7777',
    address: 'Lviv, Chervonoi Kalyny Ave. 35',
    type: 'hospital',
    tags: ['regional', 'rehabilitation', 'lviv'],
    region: 'lviv',
  },
  {
    id: 'med-3',
    title: 'Superhumans Center (Lviv)',
    titleUa: 'Центр Superhumans',
    description: 'State-of-the-art prosthetic and rehabilitation center offering free services for war victims, including advanced bionic prosthetics.',
    contact: '+380 67 000 0000',
    address: 'Lviv, Promyslova St. 52',
    website: 'https://superhumans.com',
    type: 'rehab',
    urgencyLevel: 'high',
    tags: ['bionic', 'free', 'advanced', 'lviv'],
    region: 'lviv',
  },
  {
    id: 'med-4',
    title: 'Unbroken National Rehabilitation Center',
    titleUa: 'Національний реабілітаційний центр Незламні',
    description: 'Comprehensive rehabilitation for war veterans including physical therapy, prosthetic training, and psychological support.',
    contact: '+380 44 000 0000',
    website: 'https://unbroken.ua',
    type: 'rehab',
    tags: ['veterans', 'rehabilitation', 'comprehensive'],
    region: 'kyiv',
  },
  {
    id: 'med-5',
    title: 'Zaporizhzhia Regional Prosthetic Center',
    titleUa: 'Запорізький обласний протезний центр',
    description: 'Regional center specializing in lower limb prosthetics and mobility rehabilitation.',
    contact: '+380 61 222 3333',
    address: 'Zaporizhzhia, Sobornyi Ave. 88',
    type: 'rehab',
    tags: ['lower-limb', 'regional', 'zaporizhzhia'],
    region: 'zaporizhzhia',
  },
  {
    id: 'med-6',
    title: 'Kharkiv Institute of Medical Rehabilitation',
    titleUa: 'Харківський інститут медичної реабілітації',
    description: 'Specialized rehabilitation facility with expertise in post-amputation care and prosthetic training.',
    contact: '+380 57 700 5555',
    address: 'Kharkiv, Nauky Ave. 4',
    type: 'rehab',
    tags: ['rehabilitation', 'training', 'kharkiv'],
    region: 'kharkiv',
  },
  {
    id: 'med-7',
    title: 'Odesa Regional Rehabilitation Center',
    titleUa: 'Одеський обласний реабілітаційний центр',
    description: 'Comprehensive rehabilitation services for amputees in the southern region.',
    contact: '+380 48 700 1234',
    address: 'Odesa, Preobrazhenska St. 15',
    type: 'rehab',
    tags: ['rehabilitation', 'regional', 'odesa'],
    region: 'odesa',
  },
  {
    id: 'med-8',
    title: 'Dnipro Military Hospital',
    titleUa: 'Дніпровський військовий госпіталь',
    description: 'Major military medical facility serving the eastern region with prosthetic and rehabilitation services.',
    contact: '+380 56 777 8888',
    address: 'Dnipro, Soborna Sq. 12',
    type: 'hospital',
    tags: ['military', 'surgery', 'dnipro'],
    region: 'dnipropetrovsk',
  },
  {
    id: 'med-9',
    title: 'Vinnytsia Regional Hospital - Rehabilitation Unit',
    titleUa: 'Вінницька обласна лікарня - Реабілітаційне відділення',
    description: 'Regional hospital with dedicated rehabilitation services for amputees.',
    contact: '+380 43 255 6789',
    address: 'Vinnytsia, Pirogova St. 46',
    type: 'hospital',
    tags: ['regional', 'rehabilitation', 'vinnytsia'],
    region: 'vinnytsia',
  },
  {
    id: 'med-10',
    title: 'Poltava Prosthetic Enterprise',
    titleUa: 'Полтавське протезне підприємство',
    description: 'State prosthetic manufacturing and fitting center serving central Ukraine.',
    contact: '+380 53 222 3456',
    address: 'Poltava, Yevropeyska St. 100',
    type: 'rehab',
    tags: ['prosthetics', 'fitting', 'poltava'],
    region: 'poltava',
  },
];

// NGOs and International Funding Sources
export const ngoResources: Resource[] = [
  {
    id: 'ngo-1',
    title: 'ICRC Ukraine Mission',
    titleUa: 'Місія МКЧХ в Україні',
    description: 'International Committee of Red Cross provides prosthetic services, physical rehabilitation, and psychosocial support.',
    contact: '+380 44 392 3050',
    website: 'https://www.icrc.org/en/where-we-work/europe-central-asia/ukraine',
    type: 'ngo',
    urgencyLevel: 'high',
    tags: ['international', 'prosthetics', 'free'],
  },
  {
    id: 'ngo-2',
    title: 'Protez Foundation',
    titleUa: 'Фундація Протез',
    description: 'Ukrainian NGO focused on providing prosthetics and rehabilitation for war-affected individuals.',
    contact: '+380 50 123 4567',
    website: 'https://protez.org.ua',
    type: 'ngo',
    tags: ['ukrainian', 'prosthetics', 'funding'],
  },
  {
    id: 'ngo-3',
    title: 'Help Heroes of Ukraine',
    titleUa: 'Допоможи героям України',
    description: 'Crowdfunding platform and NGO supporting war veterans with prosthetics and rehabilitation costs.',
    website: 'https://helpheroes.com.ua',
    type: 'ngo',
    tags: ['crowdfunding', 'veterans', 'donations'],
  },
  {
    id: 'ngo-4',
    title: 'United24 - Health',
    titleUa: 'United24 - Здоров\'я',
    description: 'Official Ukrainian fundraising platform supporting medical rehabilitation and prosthetics programs.',
    website: 'https://u24.gov.ua/health',
    type: 'ngo',
    urgencyLevel: 'medium',
    tags: ['official', 'fundraising', 'medical'],
  },
  {
    id: 'ngo-5',
    title: 'Handicap International Ukraine',
    titleUa: 'Handicap International Україна',
    description: 'International organization providing rehabilitation services, prosthetics support, and accessibility programs.',
    contact: '+380 44 000 0000',
    website: 'https://www.hi-us.org/ukraine',
    type: 'ngo',
    tags: ['international', 'rehabilitation', 'accessibility'],
  },
  {
    id: 'ngo-6',
    title: 'Revived Soldiers Ukraine',
    titleUa: 'Відроджені Воїни України',
    description: 'US-based Ukrainian charity providing prosthetics, medical treatment, and rehabilitation for wounded soldiers.',
    website: 'https://www.rsukraine.org',
    type: 'ngo',
    tags: ['us-based', 'veterans', 'prosthetics'],
  },
];

// Prosthetic Manufacturers Active in Ukraine
export const manufacturers: Resource[] = [
  {
    id: 'mfg-1',
    title: 'Ottobock Ukraine',
    titleUa: 'Ottobock Україна',
    description: 'World-leading prosthetics manufacturer with service centers in Ukraine, offering advanced microprocessor-controlled limbs.',
    contact: '+380 44 333 4444',
    website: 'https://www.ottobock.com/uk-ua',
    type: 'manufacturer',
    tags: ['german', 'advanced', 'microprocessor'],
  },
  {
    id: 'mfg-2',
    title: 'Össur Ukraine Partner',
    titleUa: 'Össur Партнер Україна',
    description: 'Icelandic prosthetics company providing bionic limbs and running blades through Ukrainian partners.',
    website: 'https://www.ossur.com',
    type: 'manufacturer',
    tags: ['icelandic', 'bionic', 'sports'],
  },
  {
    id: 'mfg-3',
    title: 'Ukrainian Prosthetic Enterprise (UPE)',
    titleUa: 'Українське протезне підприємство',
    description: 'State-owned prosthetic manufacturer producing affordable prosthetics covered by government programs.',
    contact: '+380 44 555 6666',
    address: 'Kyiv, Industrialna St. 20',
    type: 'manufacturer',
    tags: ['state-owned', 'affordable', 'government-covered'],
  },
  {
    id: 'mfg-4',
    title: 'Motorica Ukraine',
    titleUa: 'Моторика Україна',
    description: 'Innovative bionic hand prosthetics with customizable designs and advanced functionality.',
    website: 'https://motorica.org',
    type: 'manufacturer',
    tags: ['bionic', 'hands', 'innovative'],
  },
  {
    id: 'mfg-5',
    title: 'Esper Bionics',
    titleUa: 'Esper Bionics',
    description: 'Ukrainian startup creating AI-powered bionic arms with intuitive control systems.',
    website: 'https://esperbionics.com',
    type: 'manufacturer',
    tags: ['ukrainian', 'ai', 'bionic-arm', 'startup'],
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
    contact: '+380 44 503 0505',
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

// Support Services
export const supportServices: Resource[] = [
  {
    id: 'sup-1',
    title: 'Veteran Support Hotline',
    titleUa: 'Гаряча лінія підтримки ветеранів',
    description: '24/7 psychological support and crisis intervention for veterans and their families.',
    contact: '+380 800 500 335',
    type: 'support',
    urgencyLevel: 'immediate',
    tags: ['24/7', 'psychological', 'crisis'],
  },
  {
    id: 'sup-2',
    title: 'Peer Support Network',
    titleUa: 'Мережа взаємної підтримки',
    description: 'Connect with fellow amputees who can share experiences and practical advice.',
    type: 'support',
    tags: ['peer', 'community', 'mentorship'],
  },
  {
    id: 'sup-3',
    title: 'Family Counseling Services',
    titleUa: 'Сімейне консультування',
    description: 'Professional support for families adjusting to life changes after amputation.',
    type: 'support',
    tags: ['family', 'counseling', 'adjustment'],
  },
];

// All resources combined
export const allResources = {
  statePrograms,
  medicalFacilities,
  ngoResources,
  manufacturers,
  financialAid,
  supportServices,
};
