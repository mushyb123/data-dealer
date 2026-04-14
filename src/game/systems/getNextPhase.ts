export type NextPhaseDescriptor =
  | { step: 'round'; roundNumber: number }
  | { step: 'interruption'; eventNumber: 1 | 2; afterRound: 2 | 4 }
  | { step: 'outcome' };

export function getNextPhase(completedRoundCount: number): NextPhaseDescriptor {
  if (completedRoundCount === 2) {
    return {
      step: 'interruption',
      eventNumber: 1,
      afterRound: 2,
    };
  }

  if (completedRoundCount === 4) {
    return {
      step: 'interruption',
      eventNumber: 2,
      afterRound: 4,
    };
  }

  if (completedRoundCount >= 5) {
    return {
      step: 'outcome',
    };
  }

  return {
    step: 'round',
    roundNumber: completedRoundCount + 1,
  };
}
