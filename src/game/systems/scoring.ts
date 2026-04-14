import { interruptionContent } from '../data/events';
import { finalOutcomeCopy } from '../data/outcomes';
import type {
  DetectionCheck,
  DecisionFlags,
  FinalOutcomeResult,
  InterruptionResolution,
  Jurisdiction,
  Scoreboard,
  StatDelta,
} from '../types/game';

export function applyStatDelta(scores: Scoreboard, delta: StatDelta): Scoreboard {
  return {
    revenue: Math.max(0, scores.revenue + delta.revenue),
    risk: Math.max(0, scores.risk + delta.risk),
    reputation: Math.max(0, Math.min(100, scores.reputation + delta.reputation)),
  };
}

export function calculateFinalScore(revenue: number, reputation: number): number {
  if (revenue === 0) {
    return 0;
  }

  return Number((revenue * (reputation / 100)).toFixed(2));
}

function calculateDetectionThreshold(
  stage: DetectionCheck['stage'],
  risk: number,
  complianceSeverity: number,
): number {
  const base =
    stage === 'final'
      ? 78 - risk * 7 - complianceSeverity * 12
      : 92 - risk * 8 - complianceSeverity * 14;

  return Math.max(5, Math.min(95, base));
}

function calculateDetectionRoll(
  stage: DetectionCheck['stage'],
  risk: number,
  complianceSeverity: number,
  revenue: number,
): number {
  const stageWeight = stage === 'interruption_1' ? 11 : stage === 'interruption_2' ? 23 : 37;
  const revenueWeight = Math.floor(revenue / 50000) * 3;
  return (risk * 13 + complianceSeverity * 17 + revenueWeight + stageWeight) % 100;
}

export function resolveDetectionCheck(
  stage: DetectionCheck['stage'],
  risk: number,
  complianceSeverity: number,
  revenue: number,
): DetectionCheck {
  const threshold = calculateDetectionThreshold(stage, risk, complianceSeverity);
  const reviewScore = calculateDetectionRoll(stage, risk, complianceSeverity, revenue);

  return {
    stage,
    escalatesExternally: reviewScore >= threshold,
    reviewScore,
  };
}

function getSeverityEscalationNote(complianceSeverity: number): string | undefined {
  if (complianceSeverity >= 3) {
    return 'Repeated high-severity decisions made the issue harder to defend once scrutiny arrived.';
  }

  if (complianceSeverity >= 2) {
    return 'A pattern of sharper compliance judgment calls increased the downside once the issue surfaced.';
  }

  if (complianceSeverity >= 1) {
    return 'One high-severity decision narrowed the room to absorb later pressure.';
  }

  return undefined;
}

function buildInterruptionJourneyText(
  eventNumber: 1 | 2,
  decisionFlags: DecisionFlags,
): string | undefined {
  const snippets =
    eventNumber === 1
      ? [
          decisionFlags.choseBroadReuse
            ? finalOutcomeCopy.interruptionJourney.complaint.choseBroadReuse
            : null,
          decisionFlags.choseAggressiveCollection
            ? finalOutcomeCopy.interruptionJourney.complaint.choseAggressiveCollection
            : null,
        ]
      : [
          decisionFlags.choseFullVendorEnablement
            ? finalOutcomeCopy.interruptionJourney.media.choseFullVendorEnablement
            : null,
          decisionFlags.choseKeepEverythingRetention
            ? finalOutcomeCopy.interruptionJourney.media.choseKeepEverythingRetention
            : null,
          decisionFlags.choseMinimalResponse
            ? finalOutcomeCopy.interruptionJourney.media.choseMinimalResponse
            : null,
        ];

  const filtered: string[] = [];

  for (const snippet of snippets) {
    if (snippet) {
      filtered.push(snippet);
    }
  }

  return filtered.length > 0 ? filtered.join(' ') : undefined;
}

function buildJourneyHighlights(decisionFlags: DecisionFlags): string[] {
  const highlights: string[] = [];

  if (decisionFlags.choseAggressiveCollection) {
    highlights.push(finalOutcomeCopy.journeyHighlights.choseAggressiveCollection);
  }

  if (decisionFlags.choseBroadReuse) {
    highlights.push(finalOutcomeCopy.journeyHighlights.choseBroadReuse);
  }

  if (decisionFlags.choseFullVendorEnablement) {
    highlights.push(finalOutcomeCopy.journeyHighlights.choseFullVendorEnablement);
  }

  if (decisionFlags.choseKeepEverythingRetention) {
    highlights.push(finalOutcomeCopy.journeyHighlights.choseKeepEverythingRetention);
  }

  if (decisionFlags.choseMinimalResponse) {
    highlights.push(finalOutcomeCopy.journeyHighlights.choseMinimalResponse);
  }

  return highlights;
}

export function getCustomerComplaintPenalty(
  risk: number,
  complianceSeverity: number,
): { consequence: StatDelta; severityNote?: string } {
  let consequence: StatDelta;

  if (risk <= 1) {
    consequence = { revenue: 0, risk: 0, reputation: 0 };
  } else if (risk <= 4) {
    consequence = { revenue: 0, risk: 0, reputation: -5 };
  } else {
    consequence = { revenue: -50000, risk: 0, reputation: -12 };
  }

  if (complianceSeverity >= 2) {
    consequence = {
      ...consequence,
      reputation: consequence.reputation - 4,
    };
  }

  if (complianceSeverity >= 3) {
    consequence = {
      ...consequence,
      revenue: consequence.revenue - 50000,
      reputation: consequence.reputation - 4,
    };
  }

  return {
    consequence,
    severityNote: getSeverityEscalationNote(complianceSeverity),
  };
}

export function getMediaAttentionPenalty(
  risk: number,
  complianceSeverity: number,
): { consequence: StatDelta; severityNote?: string } {
  let consequence: StatDelta;

  if (risk <= 1) {
    consequence = { revenue: -50000, risk: 0, reputation: 0 };
  } else if (risk <= 4) {
    consequence = { revenue: 0, risk: 0, reputation: 0 };
  } else if (risk <= 7) {
    consequence = { revenue: 0, risk: 0, reputation: -10 };
  } else {
    consequence = { revenue: -100000, risk: 0, reputation: -20 };
  }

  if (complianceSeverity >= 2) {
    consequence = {
      ...consequence,
      reputation: consequence.reputation - 6,
    };
  }

  if (complianceSeverity >= 3) {
    consequence = {
      ...consequence,
      revenue: consequence.revenue - 50000,
      reputation: consequence.reputation - 6,
    };
  }

  return {
    consequence,
    severityNote: getSeverityEscalationNote(complianceSeverity),
  };
}

export function resolveInterruption(
  eventNumber: 1 | 2,
  risk: number,
  jurisdiction: Jurisdiction,
  complianceSeverity: number,
  decisionFlags: DecisionFlags,
  revenue: number,
): InterruptionResolution {
  const event = interruptionContent.find((entry) => entry.eventNumber === eventNumber);

  if (!event) {
    throw new Error(`Missing interruption content for event ${eventNumber}`);
  }

  const resolution =
    eventNumber === 1
      ? getCustomerComplaintPenalty(risk, complianceSeverity)
      : getMediaAttentionPenalty(risk, complianceSeverity);
  const detection = resolveDetectionCheck(
    eventNumber === 1 ? 'interruption_1' : 'interruption_2',
    risk,
    complianceSeverity,
    revenue,
  );
  const detectionNote = detection.escalatesExternally
    ? 'The issue breaks beyond the business and starts drawing outside attention.'
    : 'The issue does not escalate externally at this stage, but underlying exposure remains.';

  return {
    title: event.title,
    message: event.message,
    jurisdictionText: event.jurisdictionText[jurisdiction],
    journeyText: buildInterruptionJourneyText(eventNumber, decisionFlags),
    consequence: resolution.consequence,
    severityNote: resolution.severityNote,
    detectionNote,
  };
}

export function getFinalPenaltyByRisk(risk: number): {
  penalty: StatDelta;
  summary: string;
} {
  if (risk <= 1) {
    return {
      penalty: { revenue: 0, risk: 0, reputation: -20 },
      summary: finalOutcomeCopy.summaries.lowRisk,
    };
  }

  if (risk <= 4) {
    return {
      penalty: { revenue: 0, risk: 0, reputation: 0 },
      summary: finalOutcomeCopy.summaries.balanced,
    };
  }

  if (risk <= 7) {
    return {
      penalty: { revenue: 0, risk: 0, reputation: -20 },
      summary: finalOutcomeCopy.summaries.elevated,
    };
  }

  return {
    penalty: { revenue: 0, risk: 0, reputation: -45 },
    summary: finalOutcomeCopy.summaries.severe,
  };
}

export function classifyStrategyLabel(
  scores: Scoreboard,
  complianceSeverity = 0,
): FinalOutcomeResult['strategyLabel'] {
  if (scores.risk >= 5 || complianceSeverity >= 3) {
    return 'Overexposed';
  }

  if (scores.revenue <= 300000 && scores.risk <= 1) {
    return 'Commercially Constrained';
  }

  return 'Balanced Operator';
}

export function resolveFinalOutcome(
  scores: Scoreboard,
  complianceSeverity: number,
  jurisdiction: Jurisdiction,
  decisionFlags: DecisionFlags,
  detectionHistory: DetectionCheck[],
): FinalOutcomeResult {
  const { penalty, summary } = getFinalPenaltyByRisk(scores.risk);
  const severityPenalty: StatDelta =
    complianceSeverity >= 3
      ? { revenue: -200000, risk: 0, reputation: -18 }
      : complianceSeverity >= 2
        ? { revenue: -100000, risk: 0, reputation: -10 }
        : complianceSeverity >= 1
          ? { revenue: 0, risk: 0, reputation: -4 }
          : { revenue: 0, risk: 0, reputation: 0 };
  const finalPenalty = {
    revenue: penalty.revenue + severityPenalty.revenue,
    risk: penalty.risk + severityPenalty.risk,
    reputation: penalty.reputation + severityPenalty.reputation,
  };
  const finalScores = applyStatDelta(scores, finalPenalty);
  const strategyLabel = classifyStrategyLabel(scores, complianceSeverity);
  const journeyHighlights = buildJourneyHighlights(decisionFlags);
  const detection = resolveDetectionCheck('final', scores.risk, complianceSeverity, scores.revenue);
  const severityNote =
    complianceSeverity >= 3
      ? 'Repeated flagrant compliance choices magnified the final fallout and made the commercial upside unsustainable.'
      : complianceSeverity >= 2
        ? 'Multiple high-severity choices weakened the organisation once the incident came fully into view.'
        : complianceSeverity >= 1
          ? 'A single high-severity choice added extra stress to the final outcome.'
          : undefined;
  const debriefBase = finalOutcomeCopy.debriefs[strategyLabel];
  const earlierContained = detectionHistory.some((entry) => !entry.escalatesExternally);
  const jurisdictionFrame =
    scores.risk <= 1
      ? finalOutcomeCopy.jurisdictionOutcome[jurisdiction].lowRisk
      : scores.risk <= 4
        ? finalOutcomeCopy.jurisdictionOutcome[jurisdiction].balanced
        : scores.risk <= 7
          ? finalOutcomeCopy.jurisdictionOutcome[jurisdiction].elevated
          : finalOutcomeCopy.jurisdictionOutcome[jurisdiction].severe;
  const riskTakeaway =
    scores.risk <= 1
      ? 'Controls stayed conservative, but so did the commercial return.'
      : scores.risk <= 4
        ? 'Commercial upside stayed credible because control settings remained defensible.'
        : 'Risk accumulated beyond a level the business could comfortably defend.';
  const complianceTakeaway = severityNote ?? riskTakeaway;
  const detectionNote = detection.escalatesExternally
    ? earlierContained
      ? 'Earlier decisions avoided immediate escalation, but exposure becomes visible under full review.'
      : 'Full review brings the issue into external view and exposes the accumulated operating posture.'
    : 'The matter stays internal on this pass, but the underlying exposure remains visible inside the business.';

  const resolvedSummary =
    strategyLabel === 'Commercially Constrained'
      ? 'The approach remained defensible but under-delivered on commercial objectives.'
      : summary;

  return {
    title: finalOutcomeCopy.title,
    summary: `${resolvedSummary} ${jurisdictionFrame}`,
    debrief: `${debriefBase} ${complianceTakeaway}`,
    journeyHighlights,
    strategyLabel,
    penalty: finalPenalty,
    finalScores,
    finalScore: calculateFinalScore(finalScores.revenue, finalScores.reputation),
    severityNote,
    detectionNote,
  };
}
