const DAILY_FIELDS = ['npm_downloads', 'github_views', 'github_visitors', 'github_clones', 'github_cloners'];

// Sources can correct recent days, so newer values replace older ones. A field
// missing from this run keeps its saved value, because GitHub only returns the
// last 14 days.
export function mergeHistory(previous, { days = {}, snapshot = null, date }) {
  const merged = { days: { ...previous.days }, snapshots: { ...previous.snapshots } };
  for (const [day, values] of Object.entries(days)) {
    merged.days[day] = { ...merged.days[day], ...values };
  }
  if (snapshot) merged.snapshots[date] = snapshot;
  return merged;
}

export function totals(history) {
  const sums = Object.fromEntries(DAILY_FIELDS.map((field) => [field, 0]));
  for (const values of Object.values(history.days)) {
    for (const field of DAILY_FIELDS) sums[field] += values[field] ?? 0;
  }
  return sums;
}

export function renderReport(history) {
  const months = {};
  for (const [day, values] of Object.entries(history.days)) {
    const month = day.slice(0, 7);
    months[month] ??= Object.fromEntries(DAILY_FIELDS.map((field) => [field, 0]));
    for (const field of DAILY_FIELDS) months[month][field] += values[field] ?? 0;
  }

  const row = (label, values) =>
    `| ${label} | ${values.npm_downloads} | ${values.github_clones} | ${values.github_views} |`;
  const rows = Object.keys(months).sort().reverse().map((month) => row(month, months[month]));
  const latest = Object.keys(history.snapshots).sort().at(-1);
  const stats = latest
    ? `Stars: ${history.snapshots[latest].stars}. Forks: ${history.snapshots[latest].forks}. Updated: ${latest}.`
    : 'No repository statistics yet.';

  return `# Usage history

${stats}

| Month | npm downloads | Git clones | Repository views |
|---|---|---|---|
${rows.join('\n')}
${row('**Total**', totals(history))}

These numbers are estimates of interest, not of agents using the recipes. npm downloads include mirrors and bots, and Git clones include automated checkouts.
`;
}
