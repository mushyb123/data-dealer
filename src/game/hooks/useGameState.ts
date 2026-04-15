import { useState } from 'react';
import { roundContent } from '../data/rounds';
import { createInitialState } from '../systems/createInitialState';
import { getNextPhase } from '../systems/getNextPhase';
import {
  applyStatDelta,
  resolveDetectionCheck,
  resolveFinalOutcome,
  resolveInterruption,
} from '../systems/scoring';
import type { DecisionFlags, GamePhase, Jurisdiction, RoundChoice } from '../types/game';

type RoundPhase = Extract<GamePhase, { step: 'round' }>;

function getUpdatedDecisionFlags(currentFlags: DecisionFlags, choice: RoundChoice): DecisionFlags {
  return {
    ...currentFlags,
    choseAggressiveCollection:
      currentFlags.choseAggressiveCollection || choice.id === 'r1-c',
    choseBroadReuse: currentFlags.choseBroadReuse || choice.id === 'r2-c',
    choseFullVendorEnablement:
      currentFlags.choseFullVendorEnablement || choice.id === 'r3-c',
    choseKeepEverythingRetention:
      currentFlags.choseKeepEverythingRetention || choice.id === 'r4-c',
    choseMinimalResponse: currentFlags.choseMinimalResponse || choice.id === 'r5-a',
  };
}

function getCurrentRoundNumber(phase: GamePhase): number | null {
  return phase.step === 'round' ? phase.roundNumber : null;
}

function isRoundPhase(phase: GamePhase): phase is RoundPhase {
  return phase.step === 'round';
}

export function useGameState() {
  const [gameState, setGameState] = useState(createInitialState);

  function startGame(name: string, jurisdiction: Jurisdiction) {
    setGameState({
      ...createInitialState(),
      currentPhase: {
        step: 'round',
        roundNumber: 1,
        selectedChoiceId: null,
        consequence: null,
      },
      playerProfile: {
        name,
        jurisdiction,
      },
    });
  }

  function advanceFromRound(choiceId: string) {
    setGameState((currentState) => {
      const phase = currentState.currentPhase;

      if (!isRoundPhase(phase)) {
        return currentState;
      }

      if (phase.selectedChoiceId) {
        return currentState;
      }

      const round = roundContent.find(
        (entry) => entry.roundNumber === phase.roundNumber,
      );
      const choice = round?.choices.find((entry) => entry.id === choiceId);

      if (!round || !choice) {
        return currentState;
      }

      return {
        ...currentState,
        scores: applyStatDelta(currentState.scores, choice.outcome),
        complianceSeverity: currentState.complianceSeverity + choice.complianceSeverity,
        decisionFlags: getUpdatedDecisionFlags(currentState.decisionFlags, choice),
        currentPhase: {
          ...phase,
          selectedChoiceId: choiceId,
          consequence: choice.outcome,
        },
      };
    });
  }

  function continueAfterRound() {
    setGameState((currentState) => {
      const phase = currentState.currentPhase;
      const roundNumber = getCurrentRoundNumber(phase);

      if (roundNumber === null || !isRoundPhase(phase) || !phase.selectedChoiceId) {
        return currentState;
      }

      const completedRounds = [...currentState.completedRounds, roundNumber];
      const nextPhase = getNextPhase(completedRounds.length);

      if (nextPhase.step === 'interruption') {
        const detectionCheck = resolveDetectionCheck(
          nextPhase.eventNumber === 1 ? 'interruption_1' : 'interruption_2',
          currentState.scores.risk,
          currentState.complianceSeverity,
          currentState.scores.revenue,
        );
        const resolution = resolveInterruption(
          nextPhase.eventNumber,
          currentState.scores.risk,
          currentState.playerProfile.jurisdiction,
          currentState.complianceSeverity,
          currentState.decisionFlags,
          currentState.scores.revenue,
        );

        return {
          ...currentState,
          scores: applyStatDelta(currentState.scores, resolution.consequence),
          detectionHistory: [...currentState.detectionHistory, detectionCheck],
          completedRounds,
          currentPhase: {
            step: 'interruption',
            eventNumber: nextPhase.eventNumber,
            afterRound: nextPhase.afterRound,
            resolution,
          },
        };
      }

      if (nextPhase.step === 'outcome') {
        return {
          ...currentState,
          completedRounds,
          currentPhase: {
            step: 'outcome',
            result: resolveFinalOutcome(
              currentState.scores,
              currentState.complianceSeverity,
              currentState.playerProfile.jurisdiction,
              currentState.decisionFlags,
              currentState.detectionHistory,
            ),
          },
        };
      }

      return {
        ...currentState,
        completedRounds,
        currentPhase: {
          step: 'round',
          roundNumber: nextPhase.roundNumber,
          selectedChoiceId: null,
          consequence: null,
        },
      };
    });
  }

  function advanceFromInterruption() {
    setGameState((currentState) => {
      if (currentState.currentPhase.step !== 'interruption') {
        return currentState;
      }

      const viewedInterruptions = [
        ...currentState.viewedInterruptions,
        currentState.currentPhase.eventNumber,
      ];

      return {
        ...currentState,
        viewedInterruptions,
        currentPhase: {
          step: 'round',
          roundNumber: currentState.currentPhase.afterRound + 1,
          selectedChoiceId: null,
          consequence: null,
        },
      };
    });
  }

  function restartGame() {
    setGameState(createInitialState());
  }

  return {
    gameState,
    actions: {
      startGame,
      advanceFromRound,
      continueAfterRound,
      advanceFromInterruption,
      restartGame,
    },
  };
}
