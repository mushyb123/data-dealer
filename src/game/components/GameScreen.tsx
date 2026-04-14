import { useState } from 'react';
import { finalOutcomeCopy } from '../data/outcomes';
import { roundContent } from '../data/rounds';
import { useGameState } from '../hooks/useGameState';
import {
  formatCurrency,
  formatSignedCurrency,
  formatSignedValue,
  formatStatValue,
} from '../utils/format';
import type { Jurisdiction } from '../types/game';

function StatusBar({ label, value, maxValue }: { label: string; value: number; maxValue: number }) {
  const safeValue = Math.max(0, Math.min(value, maxValue));
  const width = `${(safeValue / maxValue) * 100}%`;

  return (
    <div className="meter-block">
      <div className="meter-header">
        <span>{label}</span>
        <strong>{formatStatValue(safeValue)}</strong>
      </div>
      <div className="meter-track">
        <div className="meter-fill" style={{ width }} />
      </div>
    </div>
  );
}

function EffectValue({
  label,
  value,
  zeroLabel,
  isCurrency = false,
}: {
  label: string;
  value: number;
  zeroLabel: string;
  isCurrency?: boolean;
}) {
  const hasChange = value !== 0;

  return (
    <div className={hasChange ? 'consequence-item' : 'consequence-item consequence-item--neutral'}>
      <span>{label}</span>
      <strong>{hasChange ? (isCurrency ? formatSignedCurrency(value) : formatSignedValue(value)) : zeroLabel}</strong>
    </div>
  );
}

function StartScreen({
  onStart,
}: {
  onStart: (name: string, jurisdiction: Jurisdiction) => void;
}) {
  const [name, setName] = useState('');
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>('Australia');
  const trimmedName = name.trim();

  return (
    <section className="phone-screen phone-screen--start">
      <div className="hero-block">
        <p className="kicker">Executive Simulation</p>
        <h1 className="game-title">Data Dealer</h1>
        <p className="intro-copy">
          Make five commercial data decisions under pressure, absorb market scrutiny, and see how your operating model performs when tested.
        </p>
      </div>

      <div className="panel-stack">
        <div className="game-panel">
          <label className="field-label" htmlFor="playerName">Player name</label>
          <input
            id="playerName"
            className="text-input"
            maxLength={10}
            placeholder="Max 10 chars"
            value={name}
            onChange={(event) => setName(event.target.value.slice(0, 10))}
          />
        </div>

        <div className="game-panel">
          <p className="field-label">Jurisdiction</p>
          <div className="option-grid">
            {(['Australia', 'Thailand', 'China'] as Jurisdiction[]).map((option) => (
              <button
                key={option}
                className={jurisdiction === option ? 'option-chip option-chip--selected' : 'option-chip'}
                onClick={() => setJurisdiction(option)}
                type="button"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        className="primary-button primary-button--large"
        disabled={trimmedName.length === 0}
        onClick={() => onStart(trimmedName, jurisdiction)}
        type="button"
      >
        Start session
      </button>
    </section>
  );
}

function RoundScreen({
  roundNumber,
  playerName,
  revenue,
  risk,
  reputation,
  onChoose,
  onContinue,
  selectedChoiceId,
  consequence,
}: {
  roundNumber: number;
  playerName: string;
  revenue: number;
  risk: number;
  reputation: number;
  onChoose: (choiceId: string) => void;
  onContinue: () => void;
  selectedChoiceId: string | null;
  consequence: { revenue: number; risk: number; reputation: number } | null;
}) {
  const round = roundContent.find((entry) => entry.roundNumber === roundNumber);

  if (!round) {
    return null;
  }

  const selectedChoice = round.choices.find((entry) => entry.id === selectedChoiceId) ?? null;
  const hasSelection = selectedChoice !== null && consequence !== null;

  return (
    <section className="phone-screen">
      <div className="compact-header">
        <div className="compact-header__top">
          <span className="topline-pill">Round {round.roundNumber} / 5</span>
          <span className="topline-name">{playerName}</span>
        </div>
        <div className="compact-header__stats">
          <div className="revenue-tile revenue-tile--compact">
            <span>Revenue</span>
            <strong>{formatCurrency(revenue)}</strong>
          </div>
          <div className="status-stack status-stack--compact">
            <StatusBar label="Risk" value={risk} maxValue={10} />
            <StatusBar label="Reputation" value={reputation} maxValue={100} />
          </div>
        </div>
      </div>

      <div className="game-panel game-panel--feature">
        <p className="kicker">Decision</p>
        <h2 className="screen-title">{round.title}</h2>
        <p className="scenario-copy">{round.scenario}</p>
        <p className="decision-note">Selections are final — decisions cannot be changed.</p>
      </div>

      <div className="choice-stack">
        {round.choices.map((choice, index) => (
          <button
            key={choice.id}
            className={[
              'choice-card',
              selectedChoiceId === choice.id ? 'choice-card--selected' : '',
              hasSelection && selectedChoiceId !== choice.id ? 'choice-card--disabled' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            disabled={hasSelection}
            onClick={() => onChoose(choice.id)}
            type="button"
          >
            <div className="choice-card__top">
              <span className="choice-index">Option {index + 1}</span>
              {selectedChoiceId === choice.id ? (
                <span className="choice-selected-badge" aria-hidden="true">
                  ✓ Selected
                </span>
              ) : null}
            </div>
            <strong>{choice.title}</strong>
            <span className="choice-copy">{choice.description}</span>
          </button>
        ))}
      </div>

      {hasSelection ? (
        <div className="consequence-card">
          <p className="kicker">Business Impact</p>
          <h3 className="consequence-title">{selectedChoice.title}</h3>
          <p className="decision-lock">Decision locked</p>
          <p className="scenario-copy">{selectedChoice.consequenceText}</p>
          <div className="consequence-grid">
            <EffectValue
              label="Revenue"
              value={consequence.revenue}
              zeroLabel="No revenue change"
              isCurrency
            />
            <EffectValue label="Risk" value={consequence.risk} zeroLabel="No risk change" />
            <EffectValue
              label="Reputation"
              value={consequence.reputation}
              zeroLabel="No reputation change"
            />
          </div>
          <button className="primary-button primary-button--large" onClick={onContinue} type="button">
            Continue
          </button>
        </div>
      ) : null}
    </section>
  );
}

function InterruptionScreen({
  title,
  message,
  jurisdictionText,
  journeyText,
  severityNote,
  detectionNote,
  consequence,
  onContinue,
}: {
  title: string;
  message: string;
  jurisdictionText: string;
  journeyText?: string;
  severityNote?: string;
  detectionNote: string;
  consequence: { revenue: number; risk: number; reputation: number };
  onContinue: () => void;
}) {
  return (
    <section className="phone-screen phone-screen--interrupt">
      <div className="interrupt-card">
        <p className="kicker">Pressure Event</p>
        <h2 className="screen-title">{title}</h2>
        <p className="scenario-copy">{message}</p>
        <p className="interrupt-copy">{jurisdictionText}</p>
        {journeyText ? <p className="interrupt-copy">{journeyText}</p> : null}
        {severityNote ? <p className="interrupt-note">{severityNote}</p> : null}
        <p className="interrupt-note">{detectionNote}</p>
        <div className="consequence-grid consequence-grid--interrupt">
          <EffectValue
            label="Revenue"
            value={consequence.revenue}
            zeroLabel="No revenue change"
            isCurrency
          />
          <EffectValue label="Risk" value={consequence.risk} zeroLabel="No risk change" />
          <EffectValue
            label="Reputation"
            value={consequence.reputation}
            zeroLabel="No reputation change"
          />
        </div>
        <button className="primary-button primary-button--large" onClick={onContinue} type="button">
          Continue
        </button>
      </div>
    </section>
  );
}

function OutcomeScreen({
  playerName,
  revenue,
  risk,
  reputation,
  finalScore,
  strategyLabel,
  summary,
  debrief,
  journeyHighlights,
  severityNote,
  detectionNote,
  onRestart,
}: {
  playerName: string;
  revenue: number;
  risk: number;
  reputation: number;
  finalScore: number;
  strategyLabel: string;
  summary: string;
  debrief: string;
  journeyHighlights: string[];
  severityNote?: string;
  detectionNote: string;
  onRestart: () => void;
}) {
  return (
    <section className="phone-screen phone-screen--result">
      <div className="result-hero">
        <p className="kicker">Outcome Review</p>
        <div className="result-hero__headline">
          <div>
            <h2 className="screen-title">{playerName}</h2>
            <p className="result-strategy">{strategyLabel}</p>
          </div>
          <div className="result-score-block">
            <span>Final score</span>
            <strong>{formatCurrency(finalScore)}</strong>
          </div>
        </div>
      </div>

      <div className="result-grid">
        <div className="result-card">
          <span>Revenue</span>
          <strong>{formatCurrency(revenue)}</strong>
        </div>
        <div className="result-card">
          <span>Risk</span>
          <strong>{risk}</strong>
        </div>
        <div className="result-card">
          <span>Reputation</span>
          <strong>{reputation}</strong>
        </div>
      </div>

      <div className="result-summary">
          <p className="field-label">Outcome summary</p>
        <p className="scenario-copy">{summary}</p>
      </div>

      {journeyHighlights.length > 0 ? (
        <div className="result-summary">
          <p className="field-label">Journey factors</p>
          <div className="journey-list">
            {journeyHighlights.slice(0, 3).map((item) => (
              <p key={item} className="scenario-copy">
                {item}
              </p>
            ))}
          </div>
        </div>
      ) : null}

      {severityNote ? (
        <div className="result-summary result-summary--warning">
          <p className="field-label">Compliance pressure</p>
          <p className="scenario-copy">{severityNote}</p>
        </div>
      ) : (
        <div className="result-summary">
          <p className="field-label">Business takeaway</p>
          <p className="scenario-copy">{debrief}</p>
        </div>
      )}

      <div className="result-summary">
          <p className="field-label">Escalation path</p>
        <p className="scenario-copy">{detectionNote}</p>
      </div>

      <button className="primary-button primary-button--large" onClick={onRestart} type="button">
        Run again
      </button>
    </section>
  );
}

export function GameScreen() {
  const { gameState, actions } = useGameState();
  const { currentPhase, playerProfile, scores } = gameState;

  if (currentPhase.step === 'start') {
    return <StartScreen onStart={actions.startGame} />;
  }

  if (currentPhase.step === 'round') {
    return (
      <RoundScreen
        roundNumber={currentPhase.roundNumber}
        playerName={playerProfile.name || 'Player'}
        revenue={scores.revenue}
        risk={scores.risk}
        reputation={scores.reputation}
        onChoose={actions.advanceFromRound}
        onContinue={actions.continueAfterRound}
        selectedChoiceId={currentPhase.selectedChoiceId}
        consequence={currentPhase.consequence}
      />
    );
  }

  if (currentPhase.step === 'interruption') {
    return (
      <InterruptionScreen
        title={currentPhase.resolution.title}
        message={currentPhase.resolution.message}
        jurisdictionText={currentPhase.resolution.jurisdictionText}
        journeyText={currentPhase.resolution.journeyText}
        severityNote={currentPhase.resolution.severityNote}
        detectionNote={currentPhase.resolution.detectionNote}
        consequence={currentPhase.resolution.consequence}
        onContinue={actions.advanceFromInterruption}
      />
    );
  }

  return (
    <OutcomeScreen
      playerName={playerProfile.name || 'Player'}
      revenue={currentPhase.result.finalScores.revenue}
      risk={currentPhase.result.finalScores.risk}
      reputation={currentPhase.result.finalScores.reputation}
      finalScore={currentPhase.result.finalScore}
      strategyLabel={currentPhase.result.strategyLabel}
      summary={currentPhase.result.summary}
      debrief={currentPhase.result.debrief}
      journeyHighlights={currentPhase.result.journeyHighlights}
      severityNote={currentPhase.result.severityNote}
      detectionNote={currentPhase.result.detectionNote}
      onRestart={actions.restartGame}
    />
  );
}
