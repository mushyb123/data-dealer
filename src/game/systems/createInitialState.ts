import type { GameState } from '../types/game';

export function createInitialState(): GameState {
  return {
    totalRounds: 5,
    currentPhase: {
      step: 'start',
    },
    playerProfile: {
      name: '',
      jurisdiction: 'Australia',
    },
    scores: {
      revenue: 0,
      risk: 0,
      reputation: 100,
    },
    complianceSeverity: 0,
    decisionFlags: {
      choseAggressiveCollection: false,
      choseBroadReuse: false,
      choseFullVendorEnablement: false,
      choseKeepEverythingRetention: false,
      choseMinimalResponse: false,
    },
    detectionHistory: [],
    completedRounds: [],
    viewedInterruptions: [],
  };
}
