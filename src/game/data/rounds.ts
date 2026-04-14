import type { RoundData } from '../types/game';

export const roundContent: RoundData[] = [
  {
    roundNumber: 1,
    title: 'Round 1: Collection',
    scenario:
      'A customer starts an online tyre enquiry and quote request.\n\nProduct is focused on improving conversion and future targeting. They propose adding additional fields — vehicle usage patterns, location data, and optional contact preferences — to better tailor offers and follow-up campaigns.\n\nThe view is that more data upfront will improve both immediate conversion and long-term customer value.\n\nThere is no immediate blocker — just a question of how far to go.',
    choices: [
      {
        id: 'r1-a',
        title: 'Lean collection',
        description: 'Limit fields to what is strictly required to complete the quote.',
        consequenceText:
          'The team keeps the enquiry flow lean. Conversion upside is more limited, but the business keeps scrutiny low and customer expectations clear.',
        outcome: { revenue: 50000, risk: 0, reputation: 0 },
        complianceSeverity: 0,
      },
      {
        id: 'r1-b',
        title: 'Optimised collection',
        description: 'Capture additional fields to improve targeting, but keep within a defined scope.',
        consequenceText:
          'Commercial teams gain stronger targeting and follow-up value, while the collection approach still looks measured and easier to defend internally.',
        outcome: { revenue: 150000, risk: 1, reputation: 0 },
        complianceSeverity: 0,
      },
      {
        id: 'r1-c',
        title: 'Growth-led collection',
        description: 'Capture as much relevant data as possible upfront to maximise future commercial use.',
        consequenceText:
          'The business creates more immediate marketing value, but it also increases exposure if anyone later questions why so much data was collected at the start.',
        outcome: { revenue: 250000, risk: 2, reputation: 0 },
        complianceSeverity: 0,
      },
    ],
  },
  {
    roundNumber: 2,
    title: 'Round 2: Use',
    scenario:
      'The enquiry data is now flowing through internal systems.\n\nMarketing sees an opportunity to reuse this data to send promotions, service reminders, and seasonal campaigns. This could significantly increase conversion over time and reduce acquisition costs.\n\nThe original interaction was focused on a quote, but expanding use would unlock broader commercial value.\n\nThe question is how far the business can extend beyond the original interaction.',
    choices: [
      {
        id: 'r2-a',
        title: 'Transaction-only use',
        description: 'Use data only to complete the immediate enquiry and booking.',
        consequenceText:
          'The business keeps use tightly linked to the original interaction. Revenue lift stays limited, but internal concern remains low.',
        outcome: { revenue: 50000, risk: 0, reputation: 0 },
        complianceSeverity: 0,
      },
      {
        id: 'r2-b',
        title: 'Controlled secondary use',
        description: 'Enable marketing and follow-ups within a structured and governed approach.',
        consequenceText:
          'Marketing unlocks broader value with a clearer operating model. Commercial performance improves, with manageable internal pressure on controls.',
        outcome: { revenue: 150000, risk: 1, reputation: 0 },
        complianceSeverity: 0,
      },
      {
        id: 'r2-c',
        title: 'Broad reuse',
        description: 'Fully leverage data across marketing and customer lifecycle activities.',
        consequenceText:
          'The business accelerates lifecycle revenue, but the expanded use pattern creates a sharper expectation gap if customers or leadership start asking questions.',
        outcome: { revenue: 250000, risk: 2, reputation: 0 },
        complianceSeverity: 1,
      },
    ],
  },
  {
    roundNumber: 3,
    title: 'Round 3: Sharing',
    scenario:
      'A third-party platform offers advanced customer journey automation, analytics, and campaign optimisation.\n\nIntegrating this platform would improve targeting, enable faster experimentation, and provide deeper customer insight. It may involve vendor access to customer data and offshore processing.\n\nThe upside is strong — but it introduces reliance on an external partner and changes how data is handled.',
    choices: [
      {
        id: 'r3-a',
        title: 'Local controlled setup',
        description: 'Keep data internal with limited tooling and tighter control.',
        consequenceText:
          'The organisation avoids added vendor complexity and keeps data handling close to home, but commercial capability improves only modestly.',
        outcome: { revenue: 50000, risk: 0, reputation: 0 },
        complianceSeverity: 0,
      },
      {
        id: 'r3-b',
        title: 'Managed vendor model',
        description: 'Engage a vendor with defined controls and oversight.',
        consequenceText:
          'The business gains stronger analytics and experimentation while still preserving a workable control narrative for internal stakeholders.',
        outcome: { revenue: 150000, risk: 1, reputation: 0 },
        complianceSeverity: 0,
      },
      {
        id: 'r3-c',
        title: 'Full vendor enablement',
        description: 'Fully integrate third-party platform for maximum capability and scale.',
        consequenceText:
          'Performance capability jumps, but operational reliance on a third party and broader data handling now create a much harder issue to contain if tested.',
        outcome: { revenue: 250000, risk: 3, reputation: 0 },
        complianceSeverity: 1,
      },
    ],
  },
  {
    roundNumber: 4,
    title: 'Round 4: Retention',
    scenario:
      'Customer data has now accumulated across systems — enquiry data, marketing interactions, and vendor platforms.\n\nThere is internal discussion about retaining this data indefinitely to support future analytics, re-engagement campaigns, and long-term customer profiling.\n\nDeleting data reduces risk, but limits future commercial opportunities.',
    choices: [
      {
        id: 'r4-a',
        title: 'Defined retention',
        description: 'Apply clear retention periods and actively remove older data.',
        consequenceText:
          'The business gives up some future flexibility, but storage discipline reduces long-tail exposure and keeps internal assurance stronger.',
        outcome: { revenue: 50000, risk: 0, reputation: 0 },
        complianceSeverity: 0,
      },
      {
        id: 'r4-b',
        title: 'Extended retention',
        description: 'Retain data longer to support analytics and customer lifecycle use.',
        consequenceText:
          'Commercial teams preserve more customer value over time, while risk rises gradually as older data remains in play for longer.',
        outcome: { revenue: 150000, risk: 1, reputation: 0 },
        complianceSeverity: 0,
      },
      {
        id: 'r4-c',
        title: 'Indefinite retention',
        description: 'Keep all data to maximise long-term value and flexibility.',
        consequenceText:
          'The business maximises future optionality, but any later issue now reaches further across historic data and increases operational pressure.',
        outcome: { revenue: 250000, risk: 2, reputation: 0 },
        complianceSeverity: 1,
      },
    ],
  },
  {
    roundNumber: 5,
    title: 'Round 5: Response',
    scenario:
      'A privacy issue is beginning to emerge — customer concerns, internal questions, and external attention are starting to build.\n\nThe organisation needs to respond quickly, manage communications, and demonstrate control over its data practices.\n\nPreparation levels vary, and investment in response capability competes with other priorities.',
    choices: [
      {
        id: 'r5-b',
        title: 'Structured response',
        description: 'Activate a coordinated response with clear roles, escalation, and communication.',
        consequenceText:
          'The business absorbs short-term cost, but leadership projects stronger control and reduces the chance of disorder as pressure builds.',
        outcome: { revenue: 100000, risk: -1, reputation: 0 },
        complianceSeverity: 0,
      },
      {
        id: 'r5-c',
        title: 'Partial response',
        description: 'Address the issue operationally but limit broader escalation.',
        consequenceText:
          'The issue is managed enough to keep operations moving, but unresolved pressure remains and may resurface if scrutiny intensifies.',
        outcome: { revenue: 50000, risk: -2, reputation: 0 },
        complianceSeverity: 0,
      },
      {
        id: 'r5-a',
        title: 'Minimal response',
        description: 'Handle quietly and limit visibility to avoid disruption.',
        consequenceText:
          'Short-term disruption is reduced, but the business looks underprepared and internal concern rises quickly if the matter grows.',
        outcome: { revenue: 50000, risk: 1, reputation: 0 },
        complianceSeverity: 1,
      },
    ],
  },
];
