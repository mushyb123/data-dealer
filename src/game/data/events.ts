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
        'In Australia, the complaint quickly turns on whether the later marketing sat outside the original purpose and outside what the customer would reasonably expect.',
      Thailand:
        'In Thailand, attention turns to whether the marketing was supported by valid, informed consent and whether the complaint is being handled with the right process discipline.',
      China:
        'In China, the concern sharpens around whether the collection and later marketing use were necessary for the stated purpose, and whether separate consent was needed for the broader follow-up.',
    },
    buttonLabel: 'Continue',
  },
  {
    eventNumber: 2,
    afterRound: 4,
    title: 'Media / Regulator',
    message:
      'A journalist contacts the business following reports of a competitor facing scrutiny over its use of customer data for marketing and analytics.\n\nAt the same time, the regulator begins informal enquiries across the industry into how organisations are collecting, using, and sharing customer data - particularly where practices may extend beyond the original customer interaction.\n\nWhat was previously internal is now being tested externally, and earlier decisions are starting to come under closer scrutiny.',
    jurisdictionText: {
      Australia:
        'In Australia, the focus shifts to whether customer use drifted beyond reasonable expectation, how much harm may have followed, and whether the matter is edging toward notifiable breach territory.',
      Thailand:
        'In Thailand, attention turns to complaint escalation, regulator engagement, and whether documentation, internal coordination, and breach response steps are ready to stand up to review.',
      China:
        'In China, the tone hardens around necessity, secondary use, third-party controls, and whether any cross-border handling can be properly explained and supported.',
    },
    buttonLabel: 'Continue',
  },
];
