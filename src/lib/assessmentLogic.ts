// Assessment Logic Engine - Generates personalized recommendations based on survey answers

import { Resource, allResources } from '@/data/ukrainianResources';

export interface AssessmentData {
  injuryTime: string;
  injurySeverity: string;
  injuryLocation: string;
  governmentFunding: string;
  additionalInfo: string;
}

export interface PersonalizedRecommendation {
  resource: Resource;
  priority: 'critical' | 'high' | 'medium' | 'low';
  reason: string;
  timeframe: string;
}

export interface RoadmapSection {
  id: string;
  title: string;
  titleUa: string;
  icon: string;
  urgency: 'immediate' | 'soon' | 'ongoing';
  recommendations: PersonalizedRecommendation[];
}

export interface PersonalizedRoadmap {
  urgencyLevel: 'critical' | 'high' | 'moderate' | 'stable';
  summary: string;
  summaryUa: string;
  sections: RoadmapSection[];
  prostheticOptions: string[];
  estimatedTimeline: string;
}

// Determine overall urgency level
function calculateUrgency(data: AssessmentData): 'critical' | 'high' | 'moderate' | 'stable' {
  if (data.injuryTime === 'less-3-months') return 'critical';
  if (data.injuryTime === '3-6-months' || data.injurySeverity === 'multiple') return 'high';
  if (data.governmentFunding === 'none' || data.governmentFunding === 'unsure') return 'moderate';
  return 'stable';
}

// Get prosthetic options based on injury type
function getProstheticOptions(data: AssessmentData): string[] {
  const options: string[] = [];
  
  const isUpperLimb = data.injuryLocation.includes('upper') || data.injuryLocation === 'multiple-limbs';
  const isLowerLimb = data.injuryLocation.includes('lower') || data.injuryLocation === 'multiple-limbs';
  
  if (data.injurySeverity === 'partial-digit') {
    options.push('Silicone finger prosthetics', 'Functional finger prosthetics', 'Cosmetic restoration');
  }
  
  if (isUpperLimb) {
    if (data.injurySeverity === 'below-elbow-knee') {
      options.push('Myoelectric below-elbow prosthesis', 'Body-powered prosthesis', 'Activity-specific prosthesis');
    } else if (data.injurySeverity === 'above-elbow-knee') {
      options.push('Myoelectric above-elbow prosthesis', 'Hybrid prosthesis', 'Bionic arm (Esper/Motorica)');
    }
  }
  
  if (isLowerLimb) {
    if (data.injurySeverity === 'below-elbow-knee') {
      options.push('Below-knee prosthesis (BK)', 'Running blade (Össur)', 'Waterproof prosthesis');
    } else if (data.injurySeverity === 'above-elbow-knee') {
      options.push('Above-knee prosthesis (AK)', 'Microprocessor knee (C-Leg)', 'Sports prosthesis');
    }
  }
  
  if (data.injurySeverity === 'multiple') {
    options.push('Multi-limb prosthetic system', 'Coordinated bilateral prosthetics', 'Custom mobility solutions');
  }
  
  return options;
}

// Generate timeline estimate
function getTimeline(data: AssessmentData): string {
  if (data.injuryTime === 'less-3-months') {
    return '6-12 months to full prosthetic fitting (healing required first)';
  }
  if (data.injuryTime === '3-6-months') {
    return '3-6 months to initial prosthetic fitting';
  }
  if (data.injuryTime === '6-12-months') {
    return '1-3 months to prosthetic fitting (if wound healed)';
  }
  return 'Ready for immediate prosthetic evaluation';
}

// Filter and prioritize resources based on assessment
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
    let include = true;
    
    // Category-specific logic
    switch (category) {
      case 'immediate':
        if (resource.urgencyLevel === 'immediate') {
          priority = 'critical';
          reason = 'Essential first step for your recovery journey';
          timeframe = 'Immediately';
        } else if (data.injuryTime === 'less-3-months') {
          priority = 'high';
          reason = 'Critical during early recovery phase';
          timeframe = 'Within 1 week';
        }
        break;
        
      case 'funding':
        if (data.governmentFunding === 'none') {
          priority = 'critical';
          reason = 'You haven\'t applied for funding yet - this should be your first priority';
          timeframe = 'Start this week';
        } else if (data.governmentFunding === 'unsure') {
          priority = 'high';
          reason = 'Get clarity on available funding options';
          timeframe = 'Within 2 weeks';
        } else if (data.governmentFunding === 'applied') {
          priority = 'medium';
          reason = 'Track your application and explore additional sources';
          timeframe = 'Ongoing';
        } else {
          priority = 'low';
          reason = 'Additional funding opportunities if needed';
          timeframe = 'As needed';
        }
        break;
        
      case 'medical':
        if (data.injuryTime === 'less-3-months') {
          priority = 'critical';
          reason = 'Early medical care is crucial for optimal healing';
          timeframe = 'This week';
        } else if (data.injurySeverity === 'multiple' || data.injurySeverity === 'above-elbow-knee') {
          priority = 'high';
          reason = 'Complex cases benefit from specialized care';
          timeframe = 'Within 2 weeks';
        }
        // Prioritize facilities matching injury location
        if (resource.tags.includes('upper-limb') && data.injuryLocation.includes('upper')) {
          priority = 'high';
          reason = 'Specializes in upper limb cases like yours';
        }
        if (resource.tags.includes('lower-limb') && data.injuryLocation.includes('lower')) {
          priority = 'high';
          reason = 'Specializes in lower limb cases like yours';
        }
        break;
        
      case 'prosthetics':
        if (data.injuryTime === 'more-1-year') {
          priority = 'high';
          reason = 'Ready for prosthetic fitting evaluation';
          timeframe = 'Schedule now';
        } else if (data.injuryTime === '6-12-months') {
          priority = 'medium';
          reason = 'Start exploring options for upcoming fitting';
          timeframe = 'Within 1-2 months';
        } else {
          priority = 'low';
          reason = 'Research options while healing continues';
          timeframe = 'When medically ready';
        }
        // Match prosthetic type to injury
        if (resource.tags.includes('bionic') && (data.injurySeverity === 'above-elbow-knee' || data.injurySeverity === 'multiple')) {
          priority = priority === 'low' ? 'medium' : priority;
          reason = 'Advanced bionic options suitable for your case';
        }
        break;
        
      case 'ngo':
        if (data.governmentFunding === 'none' || data.governmentFunding === 'unsure') {
          priority = 'high';
          reason = 'Alternative funding while government application processes';
          timeframe = 'Apply now';
        }
        if (resource.urgencyLevel === 'high') {
          priority = 'high';
          reason = 'Highly recommended organization with proven track record';
        }
        break;
        
      case 'support':
        if (data.injuryTime === 'less-3-months' || data.injuryTime === '3-6-months') {
          priority = 'high';
          reason = 'Support is especially important during early adjustment';
          timeframe = 'Connect this week';
        }
        break;
    }
    
    if (include) {
      recommendations.push({
        resource,
        priority,
        reason,
        timeframe,
      });
    }
  });
  
  // Sort by priority
  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  return recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}

// Main function to generate personalized roadmap
export function generatePersonalizedRoadmap(data: AssessmentData): PersonalizedRoadmap {
  const urgencyLevel = calculateUrgency(data);
  const prostheticOptions = getProstheticOptions(data);
  const estimatedTimeline = getTimeline(data);
  
  // Generate summary based on assessment
  let summary = '';
  let summaryUa = '';
  
  switch (urgencyLevel) {
    case 'critical':
      summary = 'Your injury is recent. Focus on healing, securing funding, and connecting with medical care immediately.';
      summaryUa = 'Ваша травма недавня. Зосередьтеся на загоєнні, отриманні фінансування та негайному зв\'язку з медичною допомогою.';
      break;
    case 'high':
      summary = 'You should prioritize medical consultations and funding applications to stay on track for prosthetic fitting.';
      summaryUa = 'Вам слід надати пріоритет медичним консультаціям та заявкам на фінансування.';
      break;
    case 'moderate':
      summary = 'You\'re progressing well. Focus on completing funding applications and exploring prosthetic options.';
      summaryUa = 'Ви добре просуваєтеся. Зосередьтеся на завершенні заявок на фінансування та вивченні варіантів протезування.';
      break;
    case 'stable':
      summary = 'You have a solid foundation. Continue with rehabilitation and prosthetic optimization.';
      summaryUa = 'У вас міцна основа. Продовжуйте реабілітацію та оптимізацію протезування.';
      break;
  }
  
  // Build roadmap sections
  const sections: RoadmapSection[] = [];
  
  // Section 1: Immediate Actions (always first for recent injuries)
  if (urgencyLevel === 'critical' || urgencyLevel === 'high') {
    sections.push({
      id: 'immediate',
      title: 'Immediate Actions',
      titleUa: 'Негайні дії',
      icon: 'AlertTriangle',
      urgency: 'immediate',
      recommendations: [
        ...getFilteredResources(allResources.supportServices.filter(r => r.urgencyLevel === 'immediate'), data, 'immediate'),
        ...getFilteredResources(allResources.financialAid.filter(r => r.urgencyLevel === 'immediate'), data, 'immediate'),
      ].slice(0, 3),
    });
  }
  
  // Section 2: Funding & Benefits
  sections.push({
    id: 'funding',
    title: 'Funding & Benefits',
    titleUa: 'Фінансування та пільги',
    icon: 'Wallet',
    urgency: data.governmentFunding === 'none' || data.governmentFunding === 'unsure' ? 'immediate' : 'soon',
    recommendations: [
      ...getFilteredResources(allResources.statePrograms, data, 'funding'),
      ...getFilteredResources(allResources.financialAid, data, 'funding'),
    ].slice(0, 4),
  });
  
  // Section 3: Medical Care & Rehabilitation
  sections.push({
    id: 'medical',
    title: 'Medical Care & Rehabilitation',
    titleUa: 'Медична допомога та реабілітація',
    icon: 'Stethoscope',
    urgency: data.injuryTime === 'less-3-months' ? 'immediate' : 'soon',
    recommendations: getFilteredResources(allResources.medicalFacilities, data, 'medical').slice(0, 4),
  });
  
  // Section 4: Prosthetic Options
  sections.push({
    id: 'prosthetics',
    title: 'Prosthetic Manufacturers',
    titleUa: 'Виробники протезів',
    icon: 'Cog',
    urgency: data.injuryTime === 'more-1-year' || data.injuryTime === '6-12-months' ? 'soon' : 'ongoing',
    recommendations: getFilteredResources(allResources.manufacturers, data, 'prosthetics').slice(0, 4),
  });
  
  // Section 5: NGOs & International Support
  sections.push({
    id: 'ngo',
    title: 'NGOs & International Aid',
    titleUa: 'НУО та міжнародна допомога',
    icon: 'Heart',
    urgency: 'ongoing',
    recommendations: getFilteredResources(allResources.ngoResources, data, 'ngo').slice(0, 4),
  });
  
  // Section 6: Support Services
  sections.push({
    id: 'support',
    title: 'Support & Community',
    titleUa: 'Підтримка та спільнота',
    icon: 'Users',
    urgency: 'ongoing',
    recommendations: getFilteredResources(allResources.supportServices, data, 'support').slice(0, 3),
  });
  
  return {
    urgencyLevel,
    summary,
    summaryUa,
    sections,
    prostheticOptions,
    estimatedTimeline,
  };
}
