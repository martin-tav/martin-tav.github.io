# Claude Cowork — Quiz Prep Study Guide

*Compiled from your training notes + official Anthropic documentation (support.claude.com)*

## 1. Core concept

- **"Chat says, Cowork does."** Chat responds in the conversation; Cowork has direct access to your local files/apps and actually executes multi-step tasks to completion — not just describes how to.
- Cowork brings Claude Code's agentic architecture into Claude Desktop, for knowledge work beyond coding.
- Model: describe an outcome, step away, come back to finished work (documents, organized files, research, spreadsheets...).

## 2. Availability & requirements

- Paid plans only: Pro, Max, Team, Enterprise.
- Requires **Claude Desktop** (macOS, Windows, Linux beta) — not available on web.
- Active internet connection required for the whole session.
- The desktop app must stay open and the computer awake, or the session/task stops.
- Pro/Max users can message Claude from **mobile** to assign or check on tasks, but execution still happens on the desktop, which must remain active.

## 3. How a task runs — 5 steps

1. Analyzes the request and creates a plan
2. Breaks complex work into subtasks
3. Runs code/shell commands in an **isolated virtual machine (VM)** on your computer
4. Coordinates multiple sub-agents in parallel when useful
5. Delivers finished outputs directly to your file system

## 4. Key capabilities

- Direct local file read/write (no manual upload/download)
- Sub-agent coordination for complex work
- Professional outputs: Excel with working formulas, PowerPoint decks, formatted docs
- In-place editing of drafts ("Edit with Claude" on highlighted text)
- Long-running tasks — no conversation timeout/context limit
- **Scheduled tasks** — recurring or on-demand, via `/schedule`
- **Projects** — persistent workspaces with their own files, instructions, and memory
- Claude in Chrome integration
- **Plugins** — bundle skills + connectors + sub-agents for a role/team

## 5. Projects & memory

- Memory only works **inside Projects** — it is *not* retained across standalone Cowork sessions (current limitation).
- Memory is scoped per project: what Claude learns in one project doesn't carry to another.
- Three ways to create a project: start from scratch, import from an existing Claude (chat) project, or use an existing folder on your computer.
- Each project bundles: instructions, scheduled tasks, context (folder/chat project/URL), and memory.
- Sensitive data (passwords, financial details, health info) is excluded from memory.
- Projects are desktop-only, local, no cloud sync, and (on Team/Enterprise) not shareable.

## 6. Permission modes

- **Ask before acting** — Claude pauses for your approval before each action. Recommended for new tools, unfamiliar files, or anything you want to watch closely.
- **Act without asking** — Claude runs without pausing. Faster, but riskier; use only while actively supervising trusted files/sites.
- **In both modes**, Claude always asks explicit permission before permanently deleting files (deletion protection).

## 7. Safety & risk model

- Two tool categories: **read tools** (see content) vs. **write tools** (take action) — write tools carry the real risk.
- **Prompt injection**: malicious instructions hidden in external content (an email, a doc, a website) that hijack Claude into acting on the attacker's intent instead of yours. Requires *both* conditions to succeed:
  1. Claude can read content outside your trust boundary, **and**
  2. Claude can perform actions that could compromise you.
- Anthropic's mitigations: RL training to refuse malicious/injected instructions, content classifiers on untrusted content, deletion protection, per-app permission prompts for computer use.
- **You remain responsible** for everything Claude does on your behalf: messages sent, purchases, data changes, scheduled-task actions, computer-use actions.
- Best practices: use a dedicated working folder instead of broad file access; restrict Claude in Chrome to trusted sites; watch for scope creep (unexpected files/sites); start scheduled tasks simple and avoid sensitive/irreversible actions; be extra careful with "Act without asking"; block sensitive apps from computer use (banking, health, dating); remember data can flow between connected apps (e.g. Excel → PowerPoint) without you explicitly directing it.
- Cowork activity is **not** captured in the Compliance API today; Team/Enterprise admins can monitor via OpenTelemetry instead.

## 8. Computer use (research preview, Pro/Max only)

- Claude always tries the most precise tool first, in this order:
  1. **Connector** (e.g. Gmail, Slack, Drive) — fastest, most reliable
  2. **Browser** via Claude in Chrome — when no connector exists
  3. **Screen interaction** (computer use) — clicking/typing directly, slowest and most error-prone
- No sandbox between Claude and your screen (unlike file ops, which are permission-gated, or code, which runs in an isolated VM).
- Per-app permission prompts; some apps (investment/trading, crypto) are blocked by default.
- Claude is trained to avoid stock trading, entering sensitive data, and scraping facial images — but these are not absolute guarantees.
- Not yet available on Team/Enterprise plans.

## 9. Plugins

- A plugin bundles **skills + connectors + sub-agents** into one package tailored to a role, team, or company.
- Team/Enterprise admins distribute plugins via marketplaces: manual ZIP upload (≤50MB, ≤100 plugins) or GitHub-synced (≤500 plugins, private/internal repos only).
- Per-plugin distribution controls: *Installed by default*, *Available for install*, *Not available*, *Required*.
- Enterprise group overrides: if a member belongs to multiple groups with conflicting settings, the **most permissive** wins (opposite of spend-limit logic, which takes the most restrictive).

## 10. Usage cost

- Cowork consumes **more** usage/tokens than standard chat because multi-step, compute-intensive tasks require more processing.
- Reserve Cowork for complex, file-heavy, multi-step work; use standard chat for quick one-off questions.

## Quick comparison: Chat vs. Cowork

| | Chat | Cowork |
|---|---|---|
| File access | Manual upload/download | Direct read/write to local folders |
| Task style | One prompt at a time | Multi-step, autonomous, long-running |
| Memory | Standard chat memory | Per-project memory only |
| Scheduling | Not available | Scheduled/recurring tasks |
| Sub-agents | No | Yes, coordinated in parallel |
| Mobile | Full chat | Assign/monitor tasks; desktop must stay active |

---

## Self-quiz — test yourself before checking the answers

1. What does "Chat says, Cowork does" mean?
2. Name the 5 steps Cowork follows when running a task.
3. Where does code/shell execution actually happen during a Cowork task?
4. What's the difference between "Ask before acting" and "Act without asking"? Which single action always requires approval regardless of mode?
5. What two conditions must both be true for a prompt injection attack to succeed?
6. Is Cowork memory retained across standalone sessions, or only within projects?
7. What are the three ways to create a Cowork project?
8. What does a plugin bundle together?
9. What order of preference does Claude follow in computer use: connector, browser, or screen interaction?
10. True or False: Cowork activity is captured in the Compliance API.
11. Who is responsible for actions Claude takes in Cowork on your behalf?
12. Does Cowork use more or less usage/tokens than standard chat, and why?

<details>
<summary>Answers (click to expand if viewing on the notes site, otherwise see below)</summary>

1. Chat only converses; Cowork has direct file/app access and actually executes multi-step tasks to completion.
2. Analyze & plan → break into subtasks → run code/shell in an isolated VM → coordinate parallel sub-agents → deliver outputs to your file system.
3. In an isolated virtual machine (VM) on your computer, separate from your main OS.
4. "Ask before acting" pauses for approval on each action; "Act without asking" runs without pausing. Regardless of mode, Claude always asks permission before permanently deleting files.
5. Claude can read content outside the user's trust boundary, AND Claude can perform actions that could compromise the user.
6. Only within projects — not retained across standalone Cowork sessions (current limitation).
7. Start from scratch, import from an existing Claude (chat) project, or use an existing folder on your computer.
8. Skills, connectors, and sub-agents into a single package.
9. Connectors first (fastest/most reliable) → browser via Claude in Chrome → screen interaction (computer use, slowest/most error-prone).
10. False — not captured in the Compliance API at this time (Team/Enterprise can use OpenTelemetry instead).
11. The user — they remain responsible for all actions taken on their behalf, including messages sent, purchases, data changes, and scheduled/computer-use actions.
12. More — complex multi-step tasks are compute-intensive and require more tokens to execute.

</details>

---

Sources:
- [Get started with Claude Cowork](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork)
- [Use Claude Cowork safely](https://support.claude.com/en/articles/13364135-use-claude-cowork-safely)
- [Organize your tasks with projects in Claude Cowork](https://support.claude.com/en/articles/14116274-organize-your-tasks-with-projects-in-claude-cowork)
- [Manage Claude Cowork plugins for your organization](https://support.claude.com/en/articles/13837433-manage-claude-cowork-plugins-for-your-organization)
- [Let Claude use your computer in Cowork](https://support.claude.com/en/articles/14128542-let-claude-use-your-computer-in-cowork)
