/** The single source of truth for public content and contact configuration. */
export const profile = {
  name: 'Volkan',
  location: 'Berlin, Germany',
  role: 'Software engineer',
  intro: 'I’m Volkan, a software engineer based in Berlin. I build backend systems and open-source tools that make everyday work a little easier.',
  github: 'https://github.com/volkanto',
  sponsors: 'https://github.com/sponsors/volkanto',
  // No invented address or inert form. Set a verified email to enable mailto contact.
  contact: { email: null as string | null, github: 'https://github.com/volkanto' },
  about: 'I’m a backend engineer based in Berlin. I enjoy the work behind the interface: clear APIs, dependable services, and understanding what happens when things go wrong. Away from backend systems, I build small open-source tools to make everyday work easier.',
};
export const projects = [
  {
    slug: 'rook-notes-lite', number: '01', name: 'Rook Notes Lite', kind: 'LOCAL-FIRST NOTES',
    headline: 'A little space for your daily progress.',
    description: 'Capture the day, keep track of tasks, and turn scattered notes into weekly and monthly summaries. Your notes stay in your browser.',
    audience: 'For people who want a private, lightweight record of their work without setting up another cloud account.',
    stack: ['TypeScript', 'IndexedDB', 'Vite'],
    source: 'https://github.com/volkanto/rook-lite',
    // Live domain verified by HTTPS response and application HTML during implementation.
    live: 'https://lite.rooknotes.com',
    documentedLive: 'https://lite.rooknotes.com',
    capabilities: ['Daily Markdown notes, tags, and task checkboxes.', 'Offline, rule-based weekly and monthly summaries.', 'Optional summaries with a local Ollama instance.', 'JSON backup and restore; Markdown ZIP and directory exports.'],
    problem: 'Daily work is easy to lose in scattered documents and task lists. I built Rook Notes Lite as a small place to capture notes and look back on progress, with control over where the data lives.',
    technical: 'The application is a TypeScript SPA built with Vite. IndexedDB stores notes, drafts, settings, and summaries on the device. Markdown is parsed with Marked and sanitized with DOMPurify. A deterministic summary engine works offline; an optional Ollama integration connects only to a local loopback endpoint.',
    limitations: 'There is no cloud sync or remote database. Browser storage belongs to the current device and browser profile, so regular exports and backups matter. Local AI requires a running Ollama instance; rule-based summaries remain available without it.',
    visualLabel: 'Real application · locally run from the project source',
  },
  {
    slug: 'yaba', number: '02', name: 'yaba', kind: 'GITHUB RELEASE CLI',
    headline: 'Give the next release a little less ceremony.',
    description: 'Prepare, preview, and create GitHub releases from your terminal, with generated release notes and optional Slack announcements.',
    audience: 'For maintainers and teams who want a repeatable GitHub release workflow.',
    stack: ['Node.js', 'GitHub API', 'CLI'],
    source: 'https://github.com/volkanto/yaba', live: null as string | null,
    capabilities: ['Preview release details before creating a release.', 'Generate release notes, grouped by PR labels when available.', 'Choose pattern, semantic-version, or SHA tag strategies.', 'Validate configuration and diagnose access with doctor.'],
    problem: 'A release often involves the same small steps: choose a tag, collect changes, review notes, and share the result. Yaba brings those steps into a configuration-driven command-line workflow.',
    technical: 'Yaba is a Node.js command-line application using yargs for command parsing and Octokit for GitHub access. Configuration resolves from flags, environment variables, project configuration, user configuration, and defaults. Deterministic exit codes make the tool usable in automation.',
    limitations: 'GitHub operations require an access token with permission for the target repository. Slack announcements require a configured webhook. Label-based notes fall back to a commit list when label metadata is unavailable. The current source requires Node.js 22 or newer.',
    command: 'yaba release preview --repo my-repo',
    visualLabel: 'Documented command · preview does not create a release',
  },
  {
    slug: 'launchr', number: '03', name: 'launchr', kind: 'BROWSER SHORTCUT CLI',
    headline: 'From a few flags to the right page.',
    description: 'Turn everyday browser destinations into reusable terminal commands. Define a URL template, pass typed flags, and open it in your browser.',
    audience: 'For developers who repeatedly navigate to the same tools with different parameters.',
    stack: ['Node.js', 'JSON configuration', 'CLI'],
    source: 'https://github.com/volkanto/launchr', live: null as string | null,
    capabilities: ['Create custom commands interactively with launchr add.', 'Map typed parameters to named URL placeholders.', 'Validate required values, allowed choices, and unknown flags.', 'Prompt for missing parameters in interactive mode; generate Zsh completion.'],
    problem: 'The browser tools we use every day often differ by just a query, environment, or time range. Launchr makes those recurring destinations addressable through small, memorable terminal commands.',
    technical: 'Commands are defined in a local JSON file with a URL template and parameter schema. Supported parameter types are string, integer, boolean, and single-choice-list. Runtime validation checks the schema and placeholder mapping before a URL opens in the default browser.',
    limitations: 'Launchr requires Node.js 20 or newer and a browser-capable environment. Custom commands need a local configuration file. The Grafana command shown here is the repository’s configuration example, rather than a built-in integration.',
    command: 'launchr grafana -e production -q error -t 5m',
    visualLabel: 'Repository example · requires the example Grafana configuration',
  },
];
export const services = [
  { title: 'Backend architecture reviews', problem: 'A service is getting harder to change, or a new system needs a clear starting point.', result: 'A focused review of boundaries, APIs, and trade-offs, with practical next steps.' },
  { title: 'Reliability & performance', problem: 'Slow requests, fragile retries, or failures that are difficult to reproduce.', result: 'An investigation grounded in measurements, failure paths, and a prioritized improvement plan.' },
  { title: 'Java & Spring Boot', problem: 'Your team needs another perspective on a backend implementation or design decision.', result: 'Hands-on guidance on service design, concurrency, and maintainable application code.' },
  { title: 'Early-stage technical guidance', problem: 'You need to move forward without making the architecture more complex than the product.', result: 'Clear technical choices and a manageable path from a first version to what comes next.' },
];
export const principles = [
  { title: 'Make boundaries clear.', text: 'Services and APIs should be easy to understand, change, and maintain.' },
  { title: 'Design for the unhappy path.', text: 'Retries, concurrency, and failure handling are part of the design from the beginning.' },
  { title: 'Measure before optimizing.', text: 'Performance decisions should start with evidence and a useful question.' },
  { title: 'Keep room to evolve.', text: 'Start with a simple architecture that can grow with the product’s needs.' },
];
