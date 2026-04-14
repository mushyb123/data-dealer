export const finalOutcomeCopy = {
  title: 'Final Outcome',
  message:
    'A significant privacy issue comes to light involving customer journey data. Your organisation now faces customer, media, and regulator scrutiny.',
  summaries: {
    lowRisk:
      'The business protected itself from exposure but underinvested in data capability and growth.',
    balanced:
      'The business found the most sustainable balance between growth and control.',
    elevated:
      'The issue becomes a reportable internal crisis with remediation cost and brand damage.',
    severe:
      'The issue escalates into a major privacy failure with severe reputational and regulatory consequences.',
  },
  debriefs: {
    'Commercially Constrained':
      'The approach remained defensible but under-delivered on commercial objectives.',
    'Balanced Operator':
      'The organisation built enough commercial upside while keeping controls credible, which created the strongest long-term position.',
    Overexposed:
      'The growth model pushed beyond defensible controls, and the later fallout outweighed the short-term commercial gain.',
  },
  jurisdictionOutcome: {
    Australia: {
      lowRisk:
        'In Australia, the matter may stay below the notifiable data breach threshold, but the business still wears a clear expectation mismatch story.',
      balanced:
        'In Australia, the organisation is better placed to explain purpose, reasonable expectation, and why the issue may not escalate into a notifiable data breach.',
      elevated:
        'In Australia, the issue now looks more likely to trigger OAIC attention, customer distrust, and hard questions about use outside the original purpose.',
      severe:
        'In Australia, the matter starts to look like a notifiable data breach with regulator exposure and immediate reputational harm.',
    },
    Thailand: {
      lowRisk:
        'In Thailand, the issue is containable, but complaint handling and consent discipline still come under pressure.',
      balanced:
        'In Thailand, the organisation is in a stronger position to show valid process, defensible consent handling, and orderly regulator engagement if needed.',
      elevated:
        'In Thailand, complaint escalation and PDPA scrutiny become more likely as response discipline starts to look uneven.',
      severe:
        'In Thailand, the matter escalates into a significant PDPA compliance problem with complaint, enforcement, and breach-response pressure.',
    },
    China: {
      lowRisk:
        'In China, the issue may remain manageable, but the business still needs to explain necessity and why the data handling stayed within the stated purpose.',
      balanced:
        'In China, the organisation is better positioned to defend necessity, purpose limitation, and its controls around sharing and downstream use.',
      elevated:
        'In China, the issue attracts sharper scrutiny around purpose limitation, secondary use, and whether third-party handling was properly controlled.',
      severe:
        'In China, the matter hardens into a serious PIPL compliance failure with stronger scrutiny over necessity, sharing controls, and governance.',
    },
  },
  journeyHighlights: {
    choseAggressiveCollection:
      'Early aggressive collection increased the amount of customer data exposed to later scrutiny.',
    choseBroadReuse:
      'Broad reuse created a weak justification trail once people questioned why data was being used so widely.',
    choseFullVendorEnablement:
      'Full vendor enablement expanded operational reach, but it also widened accountability and oversight pressure.',
    choseKeepEverythingRetention:
      'An indefinite retention posture left too much historical data inside the problem once the issue surfaced.',
    choseMinimalResponse:
      'Minimal response readiness left the organisation visibly underprepared when the incident had to be managed.',
  },
  interruptionJourney: {
    complaint: {
      choseBroadReuse:
        'Because you chose broad reuse, the complaint feels directly tied to how customer expectations were stretched.',
      choseAggressiveCollection:
        'The earlier aggressive collection choice makes the complaint feel less isolated and more systemic.',
    },
    media: {
      choseFullVendorEnablement:
        'Vendor enablement now attracts harder questions about oversight, accountability, and data handling boundaries.',
      choseKeepEverythingRetention:
        'The decision to keep everything makes the media narrative more damaging once retention becomes part of the story.',
      choseMinimalResponse:
        'Minimal response capability makes the organisation look slower and less credible under public pressure.',
    },
  },
} as const;
