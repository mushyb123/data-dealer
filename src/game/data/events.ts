import type { InterruptionData } from '../types/game';

export const interruptionContent: InterruptionData[] = [
  {
    eventNumber: 1,
    afterRound: 2,
    title: 'Customer Complaint',
    message:
      'A customer raises a complaint after receiving marketing communications they did not expect following a quote enquiry.\n\nThe issue is initially handled at the frontline, but questions arise internally about whether this is an isolated case or part of a broader pattern.\n\nDepending on earlier decisions, the complaint may reflect deeper issues in how customer data is collected and used.',
    jurisdictionText: {
      Australia:
        'In Australia, the complaint turns on use outside the original purpose and marketing that was not reasonably expected under APP 6.',
      Thailand:
        'In Thailand, the issue quickly becomes whether valid consent supported the marketing and whether the complaint process is being handled properly under the PDPA.',
      China:
        'In China, the concern sharpens around whether the collection and later marketing use were necessary for the stated purpose and whether separate consent was needed for secondary use.',
    },
    buttonLabel: 'Continue',
  },
  {
    eventNumber: 2,
    afterRound: 4,
    title: 'Media / Regulator',
    message:
      'A journalist contacts the business about customer data practices following a similar issue in the market.\n\nAt the same time, the regulator begins informal enquiries into how organisations are collecting, using, and sharing customer data.\n\nWhat was previously internal is now being tested externally, and earlier decisions are now under scrutiny.',
    jurisdictionText: {
      Australia:
        'In Australia, the focus shifts to OAIC scrutiny, brand damage, and whether the issue is moving toward the notifiable data breach threshold.',
      Thailand:
        'In Thailand, attention turns to complaint escalation, regulator engagement, and whether breach response steps are organised and timely.',
      China:
        'In China, the tone shifts toward stronger enforcement expectations around purpose limitation, third-party controls, and any cross-border data handling arrangements.',
    },
    buttonLabel: 'Continue',
  },
];
