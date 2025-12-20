// Assessment Logic Engine - Generates personalized recommendations based on survey answers

import { Resource, allResources } from '@/data/ukrainianResources';
import { AssessmentData } from '@/pages/Assessment';

export interface PersonalizedRecommendation {
  resource: Resource;
  priority: 'critical' | 'high' | 'medium' | 'low';
  reason: string;
  timeframe: string;
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  link?: string;
  linkText?: string;
}

export interface RoadmapSection {
  id: string;
  title: string;
  titleUa: string;
  icon: string;
  urgency: 'immediate' | 'soon' | 'ongoing';
  recommendations: PersonalizedRecommendation[];
  steps?: RoadmapStep[];
}

export interface PersonalizedRoadmap {
  urgencyLevel: 'critical' | 'high' | 'moderate' | 'stable';
  summary: string;
  summaryUa: string;
  sections: RoadmapSection[];
  prostheticOptions: string[];
  estimatedTimeline: string;
  statusMessage?: string;
  assistiveDevicesMessage?: string;
}

// Get prosthetic options based on amputation type and level
function getProstheticOptions(data: AssessmentData): string[] {
  const options: string[] = [];
  
  if (data.amputationType === 'upper-limb') {
    switch (data.amputationLevel) {
      case 'shoulder-disarticulation':
        options.push('Shoulder prosthesis', 'Cosmetic shoulder cover', 'Body-powered shoulder prosthesis');
        break;
      case 'above-elbow':
        options.push('Myoelectric above-elbow prosthesis', 'Body-powered prosthesis', 'Hybrid prosthesis', 'Bionic arm');
        break;
      case 'below-elbow':
        options.push('Myoelectric below-elbow prosthesis', 'Body-powered prosthesis', 'Activity-specific prosthesis');
        break;
      case 'wrist':
        options.push('Wrist disarticulation prosthesis', 'Myoelectric hand', 'Cosmetic hand');
        break;
      case 'fingers':
        options.push('Silicone finger prosthetics', 'Functional finger prosthetics', 'Cosmetic restoration');
        break;
    }
  } else if (data.amputationType === 'lower-limb') {
    switch (data.amputationLevel) {
      case 'hip-disarticulation':
        options.push('Hip disarticulation prosthesis', 'Canadian hip prosthesis', 'Modular hip system');
        break;
      case 'above-knee':
        options.push('Above-knee prosthesis (AK)', 'Microprocessor knee (C-Leg)', 'Sports prosthesis');
        break;
      case 'below-knee':
        options.push('Below-knee prosthesis (BK)', 'Running blade', 'Waterproof prosthesis');
        break;
      case 'partial-foot':
        options.push('Partial foot prosthesis', 'Toe filler', 'Custom orthotic insole');
        break;
    }
  }
  
  return options;
}

// Generate stage-specific steps based on current stage and status
function getStageSpecificSteps(data: AssessmentData): RoadmapStep[] {
  const isMilitary = data.status === 'military';
  const steps: RoadmapStep[] = [];
  
  switch (data.currentStage) {
    case 'pre-surgical':
      steps.push({
        id: 'step1',
        title: 'Consult with your surgeon',
        description: 'Ask your surgeon about the process of amputation and what to expect after, so that you are prepared',
      });
      steps.push({
        id: 'step2',
        title: 'Request a team consultation',
        description: 'Request a consultation with a prosthetist-orthotist and a surgeon as a team, if prosthetics is an option that you are considering post-amputation',
      });
      steps.push({
        id: 'step3',
        title: 'Understand the recovery process',
        description: 'Understand the post-amputation recovery process with Protez Hub',
        link: 'http://bazaznan.protezhub.com/',
        linkText: 'Visit Protez Hub',
      });
      steps.push({
        id: 'step4',
        title: 'Plan your rehabilitation',
        description: 'Review the list of healthcare facilities that provide amputee rehabilitation',
      });
      break;
      
    case 'acute-post-surgical':
      steps.push({
        id: 'step1',
        title: 'Focus on healing and pain management',
        description: 'Your primary focus should be on healing. Check available resources for pain management.',
      });
      steps.push({
        id: 'step2',
        title: 'Initial therapy consultation',
        description: 'Get an initial physical therapist or occupational therapist consultation, and start range of motion exercises based on the healthcare provider\'s recommendations',
      });
      steps.push({
        id: 'step3',
        title: 'Understand the recovery process',
        description: 'Understand the post-amputation recovery process with Protez Hub',
        link: 'http://bazaznan.protezhub.com/',
        linkText: 'Visit Protez Hub',
      });
      steps.push({
        id: 'step4',
        title: 'Plan your rehabilitation',
        description: 'Review the list of healthcare facilities that provide amputee rehabilitation',
      });
      if (isMilitary) {
        steps.push({
          id: 'step5',
          title: 'Connect with veteran assistance',
          description: 'Get in touch with a veteran assistant center for additional support and resources',
        });
      }
      steps.push({
        id: isMilitary ? 'step6' : 'step5',
        title: 'Get psychological support',
        description: 'Access psychological support resources to help with adjustment and mental health',
      });
      break;
      
    case 'in-patient-post-surgical':
      steps.push({
        id: 'step1',
        title: 'Focus on healing and pain management',
        description: 'Continue focusing on healing with proper pain management resources',
      });
      steps.push({
        id: 'step2',
        title: 'Therapy and mobility',
        description: 'A physical therapist or occupational therapist assessment, range of motion exercises, and verticalization, assistive devices such as a wheelchair, crutches, or walker',
      });
      steps.push({
        id: 'step3',
        title: 'Understand the recovery process',
        description: 'Understand the post-amputation recovery process with Protez Hub',
        link: 'http://bazaznan.protezhub.com/',
        linkText: 'Visit Protez Hub',
      });
      steps.push({
        id: 'step4',
        title: 'Start collecting paperwork',
        description: 'Start collecting paperwork (get help from a social worker if available). Review the list of required documents.',
      });
      steps.push({
        id: 'step5',
        title: 'Plan your rehabilitation',
        description: 'Review the list of healthcare facilities that provide amputee rehabilitation',
      });
      if (isMilitary) {
        steps.push({
          id: 'step6',
          title: 'Connect with veteran assistance',
          description: 'Get in touch with a veteran assistant center for additional support and resources',
        });
      }
      steps.push({
        id: isMilitary ? 'step7' : 'step6',
        title: 'Get psychological support',
        description: 'Access psychological support resources to help with adjustment and mental health',
      });
      break;
      
    case 'rehabilitation':
      steps.push({
        id: 'step1',
        title: 'Continue rehabilitation program',
        description: 'Work with your healthcare team on your rehabilitation goals and assistive device needs',
      });
      steps.push({
        id: 'step2',
        title: 'Assistive device assessment',
        description: 'You may be prescribed something other than prosthetics depending on your physical condition - a wheelchair, crutches, or other assistive devices',
      });
      steps.push({
        id: 'step3',
        title: 'Explore prosthetic options',
        description: 'If appropriate, begin exploring prosthetic options with your healthcare provider',
      });
      if (isMilitary) {
        steps.push({
          id: 'step4',
          title: 'Veteran support services',
          description: 'Continue working with veteran assistance centers for comprehensive support',
        });
      }
      break;
      
    case 'pre-prosthetic':
      steps.push({
        id: 'step1',
        title: 'Pre-prosthetic therapy',
        description: 'Complete pre-prosthetic rehabilitation exercises to prepare for prosthetic fitting',
      });
      steps.push({
        id: 'step2',
        title: 'Residual limb conditioning',
        description: 'Work on shaping and conditioning your residual limb for optimal prosthetic fit',
      });
      steps.push({
        id: 'step3',
        title: 'Research prosthetic providers',
        description: 'Begin researching and contacting prosthetic providers to understand your options',
      });
      break;
      
    case 'prosthetic-fitting':
      steps.push({
        id: 'step1',
        title: 'Select a prosthetics provider',
        description: 'Choose a qualified prosthetist who specializes in your type of amputation',
      });
      steps.push({
        id: 'step2',
        title: 'Initial fitting and assessment',
        description: 'Complete initial measurements and casting for your prosthetic device',
      });
      steps.push({
        id: 'step3',
        title: 'Device delivery and adjustment',
        description: 'Receive your prosthetic and work with your prosthetist on initial adjustments',
      });
      break;
      
    case 'prosthetic-training':
      steps.push({
        id: 'step1',
        title: 'Prosthetic training sessions',
        description: 'Attend regular training sessions to learn proper use and care of your prosthetic',
      });
      steps.push({
        id: 'step2',
        title: 'Gait training',
        description: 'Work with a physical therapist on walking patterns and balance',
      });
      steps.push({
        id: 'step3',
        title: 'Daily living activities',
        description: 'Practice activities of daily living with your prosthetic device',
      });
      break;
      
    case 'community-reintegration':
      steps.push({
        id: 'step1',
        title: 'Job retraining options',
        description: 'Explore job retraining programs and vocational rehabilitation services',
      });
      steps.push({
        id: 'step2',
        title: 'Community resources',
        description: 'Connect with local community support groups and peer mentorship programs',
      });
      steps.push({
        id: 'step3',
        title: 'Ongoing prosthetic care',
        description: 'Establish a schedule for regular prosthetic maintenance and check-ups',
      });
      if (isMilitary) {
        steps.push({
          id: 'step4',
          title: 'Veteran employment services',
          description: 'Access veteran-specific employment and reintegration support programs',
        });
      }
      break;
  }
  
  return steps;
}

// Get status message based on stage
function getStatusMessage(data: AssessmentData): string {
  switch (data.currentStage) {
    case 'pre-surgical':
      return 'You are on track';
    case 'acute-post-surgical':
    case 'in-patient-post-surgical':
      return 'You are on track. Do not make rushed decisions and avoid people/providers who pressure you into signing up for prosthetics at this time - it is too early!';
    default:
      return 'You are making progress on your recovery journey';
  }
}

// Get assistive devices message
function getAssistiveDevicesMessage(data: AssessmentData): string {
  return 'Discuss with your healthcare provider';
}

// Calculate urgency level based on stage
function calculateUrgency(data: AssessmentData): 'critical' | 'high' | 'moderate' | 'stable' {
  switch (data.currentStage) {
    case 'pre-surgical':
    case 'acute-post-surgical':
      return 'critical';
    case 'in-patient-post-surgical':
    case 'rehabilitation':
      return 'high';
    case 'pre-prosthetic':
    case 'prosthetic-fitting':
      return 'moderate';
    default:
      return 'stable';
  }
}

// Filter resources for recommendations
function getFilteredResources(
  resources: Resource[],
  data: AssessmentData,
  category: string
): PersonalizedRecommendation[] {
  const recommendations: PersonalizedRecommendation[] = [];
  
  resources.forEach(resource => {
    let priority: 'critical' | 'high' | 'medium' | 'low' = 'medium';
    let reason = '';
    let timeframe = 'Within 1 month';
    
    switch (category) {
      case 'medical':
        if (data.currentStage === 'acute-post-surgical' || data.currentStage === 'in-patient-post-surgical') {
          priority = 'critical';
          reason = 'Essential for your current recovery stage';
          timeframe = 'This week';
        } else if (data.currentStage === 'rehabilitation' || data.currentStage === 'pre-prosthetic') {
          priority = 'high';
          reason = 'Important for continued recovery';
          timeframe = 'Within 2 weeks';
        }
        break;
        
      case 'prosthetics':
        if (data.currentStage === 'prosthetic-fitting' || data.currentStage === 'prosthetic-training') {
          priority = 'high';
          reason = 'Relevant to your current prosthetic journey';
          timeframe = 'Schedule now';
        } else if (data.currentStage === 'pre-prosthetic') {
          priority = 'medium';
          reason = 'Begin researching options';
          timeframe = 'Within 1-2 months';
        } else {
          priority = 'low';
          reason = 'For future reference';
          timeframe = 'When ready';
        }
        break;
        
      case 'support':
        if (data.status === 'military') {
          priority = 'high';
          reason = 'Veteran-specific support available';
          timeframe = 'Connect this week';
        } else {
          priority = 'medium';
          reason = 'Community support resources';
          timeframe = 'Ongoing';
        }
        break;
        
      case 'ngo':
        priority = 'medium';
        reason = 'Additional support and funding opportunities';
        timeframe = 'As needed';
        break;
    }
    
    recommendations.push({
      resource,
      priority,
      reason,
      timeframe,
    });
  });
  
  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  return recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}

// Main function to generate personalized roadmap
export function generatePersonalizedRoadmap(data: AssessmentData): PersonalizedRoadmap {
  const urgencyLevel = calculateUrgency(data);
  const prostheticOptions = getProstheticOptions(data);
  const statusMessage = getStatusMessage(data);
  const assistiveDevicesMessage = getAssistiveDevicesMessage(data);
  const stageSteps = getStageSpecificSteps(data);
  
  // Generate summary based on stage
  let summary = '';
  let summaryUa = '';
  
  switch (data.currentStage) {
    case 'pre-surgical':
      summary = 'Prepare for your upcoming surgery by understanding the process and planning your rehabilitation.';
      summaryUa = 'Підготуйтесь до майбутньої операції, розуміючи процес та плануючи реабілітацію.';
      break;
    case 'acute-post-surgical':
    case 'in-patient-post-surgical':
      summary = 'Focus on healing and avoid rushing into prosthetic decisions. This is a critical recovery period.';
      summaryUa = 'Зосередьтеся на загоєнні та уникайте поспішних рішень щодо протезування. Це критичний період відновлення.';
      break;
    case 'rehabilitation':
      summary = 'Work with your healthcare team on rehabilitation goals and assistive device assessment.';
      summaryUa = 'Працюйте з вашою медичною командою над цілями реабілітації та оцінкою допоміжних пристроїв.';
      break;
    case 'pre-prosthetic':
      summary = 'Prepare your body for prosthetic fitting through conditioning exercises and provider research.';
      summaryUa = 'Підготуйте своє тіло до протезування через вправи та дослідження постачальників.';
      break;
    case 'prosthetic-fitting':
      summary = 'Work closely with your prosthetist to ensure optimal fit and function of your prosthetic.';
      summaryUa = 'Тісно співпрацюйте з вашим протезистом для забезпечення оптимальної посадки та функції протеза.';
      break;
    case 'prosthetic-training':
      summary = 'Master the use of your prosthetic through dedicated training and practice.';
      summaryUa = 'Опануйте використання протеза через спеціальне навчання та практику.';
      break;
    case 'community-reintegration':
      summary = 'Focus on returning to work and community life with appropriate support services.';
      summaryUa = 'Зосередьтеся на поверненні до роботи та громадського життя з відповідними службами підтримки.';
      break;
    default:
      summary = 'Follow your personalized roadmap for recovery and rehabilitation.';
      summaryUa = 'Дотримуйтесь вашого персоналізованого плану відновлення та реабілітації.';
  }
  
  // Build roadmap sections
  const sections: RoadmapSection[] = [];
  
  // Section 1: Next Steps (stage-specific)
  sections.push({
    id: 'next-steps',
    title: 'Next Steps',
    titleUa: 'Наступні кроки',
    icon: 'ClipboardList',
    urgency: 'immediate',
    recommendations: [],
    steps: stageSteps,
  });
  
  // Section 2: Medical Care & Rehabilitation
  sections.push({
    id: 'medical',
    title: 'Medical Care & Rehabilitation',
    titleUa: 'Медична допомога та реабілітація',
    icon: 'Stethoscope',
    urgency: data.currentStage === 'acute-post-surgical' || data.currentStage === 'in-patient-post-surgical' ? 'immediate' : 'soon',
    recommendations: getFilteredResources(allResources.medicalFacilities, data, 'medical').slice(0, 4),
  });
  
  // Section 3: Prosthetic Manufacturers (if relevant)
  if (['pre-prosthetic', 'prosthetic-fitting', 'prosthetic-training', 'community-reintegration'].includes(data.currentStage)) {
    sections.push({
      id: 'prosthetics',
      title: 'Prosthetic Manufacturers',
      titleUa: 'Виробники протезів',
      icon: 'Cog',
      urgency: data.currentStage === 'prosthetic-fitting' ? 'immediate' : 'soon',
      recommendations: getFilteredResources(allResources.manufacturers, data, 'prosthetics').slice(0, 4),
    });
  }
  
  // Section 4: Support Services (including veteran-specific)
  sections.push({
    id: 'support',
    title: data.status === 'military' ? 'Veteran & Support Services' : 'Support & Community',
    titleUa: data.status === 'military' ? 'Ветеранські та підтримуючі служби' : 'Підтримка та спільнота',
    icon: 'Users',
    urgency: 'ongoing',
    recommendations: getFilteredResources(allResources.supportServices, data, 'support').slice(0, 4),
  });
  
  // Section 5: NGOs & International Aid
  sections.push({
    id: 'ngo',
    title: 'NGOs & International Aid',
    titleUa: 'НУО та міжнародна допомога',
    icon: 'Heart',
    urgency: 'ongoing',
    recommendations: getFilteredResources(allResources.ngoResources, data, 'ngo').slice(0, 4),
  });
  
  // Estimate timeline based on stage
  let estimatedTimeline = '';
  switch (data.currentStage) {
    case 'pre-surgical':
      estimatedTimeline = 'Surgery preparation: 1-4 weeks';
      break;
    case 'acute-post-surgical':
      estimatedTimeline = 'Acute recovery: 2-6 weeks';
      break;
    case 'in-patient-post-surgical':
      estimatedTimeline = 'In-patient recovery: 2-8 weeks';
      break;
    case 'rehabilitation':
      estimatedTimeline = 'Rehabilitation phase: 1-6 months';
      break;
    case 'pre-prosthetic':
      estimatedTimeline = 'Pre-prosthetic preparation: 1-3 months';
      break;
    case 'prosthetic-fitting':
      estimatedTimeline = 'Fitting process: 2-8 weeks';
      break;
    case 'prosthetic-training':
      estimatedTimeline = 'Training period: 1-6 months';
      break;
    case 'community-reintegration':
      estimatedTimeline = 'Ongoing integration and support';
      break;
    default:
      estimatedTimeline = 'Individualized timeline based on progress';
  }
  
  return {
    urgencyLevel,
    summary,
    summaryUa,
    sections,
    prostheticOptions,
    estimatedTimeline,
    statusMessage,
    assistiveDevicesMessage,
  };
}
