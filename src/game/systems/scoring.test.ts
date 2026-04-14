import { describe, expect, it } from 'vitest';
import {
  calculateFinalScore,
  classifyStrategyLabel,
  getFinalPenaltyByRisk,
  getMediaAttentionPenalty,
  resolveFinalOutcome,
} from './scoring';

describe('calculateFinalScore', () => {
  it('returns zero when revenue is zero', () => {
    expect(calculateFinalScore(0, 80)).toBe(0);
  });

  it('uses revenue multiplied by reputation percentage', () => {
    expect(calculateFinalScore(10, 75)).toBe(7.5);
  });
});

describe('getFinalPenaltyByRisk', () => {
  it('applies the low-risk penalty band', () => {
    expect(getFinalPenaltyByRisk(1).penalty).toEqual({
      revenue: 0,
      risk: 0,
      reputation: -20,
    });
  });

  it('applies no extra penalty in the balanced band', () => {
    expect(getFinalPenaltyByRisk(4).penalty).toEqual({
      revenue: 0,
      risk: 0,
      reputation: 0,
    });
  });

  it('applies the elevated-risk penalty band', () => {
    expect(getFinalPenaltyByRisk(6).penalty).toEqual({
      revenue: 0,
      risk: 0,
      reputation: -20,
    });
  });

  it('applies the severe-risk penalty band', () => {
    expect(getFinalPenaltyByRisk(8).penalty).toEqual({
      revenue: 0,
      risk: 0,
      reputation: -45,
    });
  });
});

describe('classifyStrategyLabel', () => {
  it('classifies low-revenue low-risk outcomes as Commercially Constrained', () => {
    expect(
      classifyStrategyLabel({
        revenue: 250000,
        risk: 1,
        reputation: 100,
      }),
    ).toBe('Commercially Constrained');
  });

  it('classifies controlled higher-value outcomes as Balanced Operator', () => {
    expect(
      classifyStrategyLabel({
        revenue: 700000,
        risk: 3,
        reputation: 95,
      }),
    ).toBe('Balanced Operator');
  });

  it('classifies high-risk outcomes as Overexposed', () => {
    expect(
      classifyStrategyLabel({
        revenue: 900000,
        risk: 7,
        reputation: 80,
      }),
    ).toBe('Overexposed');
  });

  it('classifies repeated high-severity decisions as Overexposed even with lower visible risk', () => {
    expect(
      classifyStrategyLabel(
        {
          revenue: 650000,
          risk: 3,
          reputation: 90,
        },
        3,
      ),
    ).toBe('Overexposed');
  });
});

describe('compliance severity escalation', () => {
  it('increases interruption penalties for repeated high-severity choices', () => {
    expect(getMediaAttentionPenalty(6, 3).consequence).toEqual({
      revenue: -50000,
      risk: 0,
      reputation: -22,
    });
  });

  it('strengthens final outcomes and journey text when high-severity choices stack up', () => {
    const result = resolveFinalOutcome(
      {
        revenue: 700000,
        risk: 4,
        reputation: 90,
      },
      3,
      'Australia',
      {
        choseAggressiveCollection: false,
        choseBroadReuse: true,
        choseFullVendorEnablement: true,
        choseKeepEverythingRetention: true,
        choseMinimalResponse: true,
      },
      [],
    );

    expect(result.strategyLabel).toBe('Overexposed');
    expect(result.finalScores).toEqual({
      revenue: 500000,
      risk: 4,
      reputation: 72,
    });
    expect(result.journeyHighlights.length).toBeGreaterThan(0);
  });
});
