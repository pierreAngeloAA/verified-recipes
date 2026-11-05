// Builds the next status file. A failed run keeps the last successful date, so
// readers can tell how long a recipe has been broken.
export function updateStatus(previous, results, date) {
  const next = { ...previous };
  for (const { id, passed, versions } of results) {
    next[id] = {
      status: passed ? 'pass' : 'fail',
      checked_at: date,
      last_passed_at: passed ? date : (previous[id]?.last_passed_at ?? null),
      versions: versions ?? previous[id]?.versions ?? null,
    };
  }
  return Object.fromEntries(Object.entries(next).sort(([a], [b]) => a.localeCompare(b)));
}

export function failureReport(results, date) {
  const failed = results.filter((result) => !result.passed);
  if (failed.length === 0) return null;

  const sections = failed.map(
    ({ id, output }) => `## ${id}\n\n\`\`\`text\n${output.slice(-3000)}\n\`\`\``,
  );
  return `${failed.length} recipe(s) failed verification on ${date}.\n\nA new release may have changed the behavior, so each recipe needs a review.\n\n${sections.join('\n\n')}\n`;
}
