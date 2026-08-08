export const Disclaimers = {
  GENERAL: {
    title: 'Educational Information Only',
    text: `AiX Health provides health, fitness, nutrition, wellness and scientific education for informational purposes. Content is not medical advice, diagnosis or treatment and does not replace consultation with a qualified healthcare professional.`,
  },
  AI: {
    title: 'AI-Generated Content Disclaimer',
    text: `AI-generated information is provided for educational purposes only. AiX Health does not diagnose medical conditions, prescribe treatment or replace a qualified healthcare professional. Always verify important health decisions with an appropriately licensed professional.`,
  },
  SUPPLEMENT: {
    title: 'Supplement Disclaimer',
    text: `Supplement information is educational and does not constitute medical advice or a recommendation to use any specific product or supplement. Individual needs, contraindications and interactions vary. Consult a qualified healthcare professional before starting supplements, particularly if you have a medical condition or take medication.`,
  },
  FITNESS: {
    title: 'Fitness Disclaimer',
    text: `Fitness information is educational and general in nature. Exercise carries inherent risks. Adapt activity to your individual circumstances and seek professional guidance when appropriate.`,
  },
  NUTRITION: {
    title: 'Nutrition Disclaimer',
    text: `Nutrition information is provided for general educational purposes and is not individualized medical or dietary treatment. Individual nutritional needs vary.`,
  },
  EMERGENCY: {
    title: 'Emergency Disclaimer',
    text: `AiX Health is not an emergency or medical service. If you believe you are experiencing a medical emergency, contact your local emergency services or seek immediate professional medical care.`,
  },
  EDUCATION: {
    title: 'Education Disclaimer',
    text: `All content is intended for education and information purposes only.`,
  },
} as const;

export type DisclaimerKey = keyof typeof Disclaimers;
