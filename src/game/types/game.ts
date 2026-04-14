export type Scoreboard = {
  revenue: number;
  risk: number;
  reputation: number;
};

export type StatDelta = {
  revenue: number;
  risk: number;
  reputation: number;
};

export type DetectionCheck = {
  stage: 'interruption_1' | 'interruption_2' | 'final';
  escalatesExternally: boolean;
  reviewScore: number;
};

export type Jurisdiction = 'Australia' | 'Thailand' | 'China';

export type PlayerProfile = {
  name: string;
  jurisdiction: Jurisdiction;
};

export type DecisionFlags = {
  choseAggressiveCollection: boolean;
  choseBroadReuse: boolean;
  choseFullVendorEnablement: boolean;
  choseKeepEverythingRetention: boolean;
  choseMinimalResponse: boolean;
};

export type StartPhase = {
  step: 'start';
};

export type RoundChoice = {
  id: string;
  title: string;
  description: string;
  consequenceText: string;
  outcome: StatDelta;
  complianceSeverity: number;
};

export type RoundData = {
  roundNumber: number;
  title: string;
  scenario: string;
  choices: RoundChoice[];
};

export type InterruptionData = {
  eventNumber: 1 | 2;
  afterRound: 2 | 4;
  title: string;
  message: string;
  jurisdictionText: Record<Jurisdiction, string>;
  buttonLabel: string;
};

export type InterruptionResolution = {
  title: string;
  message: string;
  jurisdictionText: string;
  journeyText?: string;
  consequence: StatDelta;
  severityNote?: string;
  detectionNote: string;
};

export type FinalOutcomeResult = {
  title: string;
  summary: string;
  debrief: string;
  journeyHighlights: string[];
  strategyLabel: 'Commercially Constrained' | 'Balanced Operator' | 'Overexposed';
  penalty: StatDelta;
  finalScores: Scoreboard;
  finalScore: number;
  severityNote?: string;
  detectionNote: string;
};

export type RoundPhase = {
  step: 'round';
  roundNumber: number;
  selectedChoiceId: string | null;
  consequence: StatDelta | null;
};

export type InterruptionPhase = {
  step: 'interruption';
  eventNumber: 1 | 2;
  afterRound: 2 | 4;
  resolution: InterruptionResolution;
};

export type OutcomePhase = {
  step: 'outcome';
  result: FinalOutcomeResult;
};

export type GamePhase = StartPhase | RoundPhase | InterruptionPhase | OutcomePhase;

export type GameState = {
  totalRounds: number;
  currentPhase: GamePhase;
  playerProfile: PlayerProfile;
  scores: Scoreboard;
  complianceSeverity: number;
  decisionFlags: DecisionFlags;
  detectionHistory: DetectionCheck[];
  completedRounds: number[];
  viewedInterruptions: number[];
};
