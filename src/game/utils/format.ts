export function formatSignedValue(value: number) {
  if (value > 0) {
    return `+${value}`;
  }

  return `${value}`;
}

export function formatStatValue(value: number) {
  return `${value}`;
}

export function formatCurrency(value: number) {
  if (Math.abs(value) >= 1000000) {
    const scaled = value / 1000000;
    return `$${Number.isInteger(scaled) ? scaled : scaled.toFixed(1)}m`;
  }

  if (Math.abs(value) >= 1000) {
    return `$${Math.round(value / 1000)}k`;
  }

  return `$${value}`;
}

export function formatSignedCurrency(value: number) {
  if (value === 0) {
    return '$0';
  }

  return `${value > 0 ? '+' : '-'}${formatCurrency(Math.abs(value))}`;
}
