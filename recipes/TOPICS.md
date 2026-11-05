# Topic selection

A topic qualifies when all of these are true:

1. Agents plausibly write the old form, because it is common in older code and tutorials.
2. The old form fails, or misbehaves, on the current release when run.
3. An official source backs the change.

The first batch comes from framework changes reproduced by running them. It does **not** come from logged agent failures yet, so topic 1 is an assumption until real sessions confirm it. Failures seen in real agent sessions should take priority over this list.

| Recipe | Old form | Result on current Rails |
|---|---|---|
| `rails-enum-positional-syntax` | `enum status: { ... }` | `ArgumentError` when the class loads |
| `rails-serialize-coder-keyword` | `serialize :prefs, JSON` | `ArgumentError` when the class loads |
| `rails-to-fs-date-format` | `Time#to_s(:db)` | `ArgumentError` when called |
| `rails-deprecator-instance` | `ActiveSupport::Deprecation.warn` | `NoMethodError` when called |
| `rails-params-expect` | `params.require(:user).permit(:name)` | HTTP 500 on tampered input, where `expect` returns 400 |
