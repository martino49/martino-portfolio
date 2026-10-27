# Portfolio Hireability Research & Improvement Plan

**Date:** 2026-10-27
**Trigger:** Software Developer/Engineer job spec (Africaworkpower — international/Finnish clients, IT Hub in Kenya) requiring 5+ years, production software, testing discipline, AI-assisted development, and a mandatory GitHub profile in the CV.
**Goal:** Determine what actually decides whether a candidate in my position passes screening for this class of role, and turn the portfolio into evidence that survives it.

---

## 1. Sources

| Source | Perspective | What it informed |
|---|---|---|
| [DevPlaybook — Developer Portfolio Checklist: 20 Things Hiring Managers Look For](https://devplaybook.cc/blog/developer-portfolio-checklist-20-things-hiring-managers/) | Hiring-manager screening behavior | The 60-second review flow; project card requirements; README/commit/test expectations |
| [ReadmeDesign — What Recruiters Actually Look For on Your GitHub Profile](https://readmedesign.com/blog/what-recruiters-look-for) | Technical recruiter | The 15–30 second GitHub review; pinned-repo-first behavior; click-through test; searchability |
| [SOLTECH — How to Evaluate Software Engineering Talent (HR guide)](https://soltech.net/what-do-hiring-managers-actually-look-for-in-a-github-portfolio/) | Staffing-industry HR director | Years-vs-capability; must-haves vs transferable vs preferences; evidence-over-keywords; AI-as-judgment |
| [Dice — Tips for Landing an "Entry-Level" Job that Requires Experience](https://www.dice.com/career-advice/tips-for-landing-an-entry-level-job-that-requires-experience/) | Career coaching / staffing | Apply-anywhere doctrine; cumulative experience; high-potential candidates campaign rather than blast applications |
| EU Delegation / TRIFIC Nairobi tech-hub coverage, 2026 (via [OutsourceAccelerator](https://news.outsourceaccelerator.com/europe-turns-to-kenya/)) | Market context | European firms are actively recruiting in Nairobi — competition for this exact role is structural, not incidental |

---

## 2. Key findings

### 2.1 A fixed 60-second review decides everything

Screening is not a read; it is a sequence with hard cutoffs:

1. Homepage skim (~10s) — what you do, headline stack, availability
2. One featured project click (~20s) — live demo, looks real
3. Code scan (~20s) — readable, has a README
4. GitHub profile (~10s) — recent activity

Any single failure filters the candidate out. Busy reviewers apply this mechanically after ~40 portfolios a day.

### 2.2 On GitHub, pinned repositories are checked first — within 15–30 seconds total

- If nothing is pinned, GitHub shows your most recent/popular repos — which for my profile means tutorial forks.
- The recruiter's canonical failure example is a profile whose pins are an uncontributed CSS-framework fork and an abandoned old script. My profile currently matches that failure mode exactly (12 public repos, 11 forks, plus a README full of links to a nonexistent account).
- The click-through test: repo has a README (what it does, how to run, stack), commit messages carry meaning ("Fix header alignment on mobile" beats "fix"), tests exist somewhere, a CI workflow is a strong plus.
- Consistency beats volume: a few commits every week for months signals reliability; a burst followed by 4 dark months (my current state) reads as a coding experiment, not a practice.
- Recruiters *search* GitHub by location, language, and repo topics. Being findable as a Nairobi Node/TypeScript developer is free positioning I currently waste.

### 2.3 Years of experience is context, not capability — and job specs are known to inflate

- Staffing insiders separate true must-haves from *transferable capabilities* and *preferences*; specs creep as stakeholders add requirements, so a stated "5 years" is not proof the manager enforces it.
- The decisive lens: **capability → evidence → evaluation**. Evidence for capabilities comes from problems solved, decisions made, tradeoffs, iteration — explicitly *not* repo count or keyword density.
- On the AI requirement: the question is not whether you use AI tools (84% of developers do), it is whether you can validate what they produce — catch hallucinations, security and maintainability issues, and explain why a solution is right.
- Communication is treated as part of technical credibility: explaining decisions, constraints, and what you'd do differently today.

### 2.4 The response to an experience gap: apply anyway, and campaign instead of blasting

- Requirement inflation is standard practice (some postings inflate to see who they attract); cumulative experience — side projects, client work, paid or unpaid — counts toward years.
- A lower salary expectation is an explicit edge against 5-year candidates who demand more.
- Volume applications lose. High-potential candidates get introductions and referrals, request informational interviews, and can articulate *why* this employer. Spending an hour on company research beats ten generic submissions.

### 2.5 Market context

Nairobi is being actively recruited by European firms right now, so "available, English-fluent, affordable Nairobi developer" is table stakes — the differentiator is the evidence chain, not geography or rate.

---

## 3. My portfolio vs. the screening flow (audit, 2026-10-27)

| Screening step | Current state | Verdict |
|---|---|---|
| Homepage | Not deployed (`martino49.github.io` 404); older site at `martino.vercel.app` renders "Loading…" | **Fail** |
| Featured project click-through | FinMate live, genuine, polished; EduLMS live but a template with "© 2024", fabricated stats ("500+ students"), placeholder contacts | **Partial / risk** |
| Code scan | Project repos not public; none reachable from portfolio links | **Fail** |
| GitHub profile | 11 of 12 repos are tutorial forks; profile README links point to a nonexistent account; no pins; ~4 months dark | **Fail** |
| Contactability | Two different emails across surfaces; profile website link has a typo (404) | **Fix** |

**Root cause:** the project work was built/pushed under a previous account (`superomosh94`) that no longer resolves, severing every link between proof and profile.

---

## 4. Improvement plan (priority order)

### P0 — Complete the evidence chain *(blocks everything else)*

- [ ] Deploy the current portfolio publicly (fix `martino49.github.io` / link a live URL in the GitHub bio)
- [ ] Push FinMate and EduLMS repos publicly with real READMEs: what it does, how to run (commands), stack, screenshots, decisions/tradeoffs
- [ ] Push the portfolio repo itself (currently private)
- [ ] Verify every link on the site, the resume, and the profile monthly — a dead demo is worse than no demo

### P1 — GitHub curation

- [ ] Pin 4 repos: FinMate, EduLMS, best Kotlin project, portfolio
- [ ] Rewrite the profile README as an elevator pitch: who you are, what you're targeting, and *specific* evidence (e.g. "M-Pesa Daraja STK checkout in production", not "payment expert")
- [ ] Add location, email, LinkedIn, topics to repos (recruiter search surface)
- [ ] Ship the CI workflow (lint/typecheck/tests on PR) — tests + CI are explicit click-through positives
- [ ] Keep the contribution graph alive with small real commits; no bulk padding

### P2 — One flagship, senior-shaped project

- [ ] Pick FinMate or Cdely; present it as engineering decisions: architecture, schema design, RBAC tradeoffs, security choices, known limitations
- [ ] Maintain it publicly for a stretch of months: releases, real bug-fix commits, changelog — this is the only credible counterweight to the years gap
- [ ] Write the case study (problem → approach → tradeoffs → outcome), linking live demo and source

### P3 — Close the cheap spec gaps (weekend-sized items)

- [ ] Docker: Dockerfile + compose for one service, deployed
- [ ] OOP/design patterns: refactor one backend into explicit layers, documented in the repo
- [ ] AI-assisted development: short post on where AI genuinely helped vs. cost time in my workflow (validating output, not claiming tool usage)
- [ ] Data structures & algorithms: an own solutions repo (dated commits, 100+ problems), not a fork
- [ ] Open source: 1–2 merged external PRs (I already hold a Pull Shark achievement)

### P4 — Credibility fixes

- [ ] Remove EduLMS template placeholders (© line, fake stats, lorem contact info)
- [ ] Unify email, timeline, and title across GitHub, portfolio, resume (one identity)
- [ ] Remove or make verifiable the "65+ repos" stat (12 public repos visible)

### P5 — Application strategy

- [ ] CV with GitHub URL directly under the name; two-sentence framing of the years gap in the cover note: evidence, not adjectives
- [ ] Salary expectation positioned below 5-year market rate (documented edge)
- [ ] Referral path: Nairobi developer community, Finland–Kenya IT hub channels, informational interviews
- [ ] Interview prep: rehearse walking through decisions, constraints, and alternatives on FinMate/Cdely — interviewers probe "why", not "what"

---

## 5. Pre-application self-audit (run before every submission)

1. Open the portfolio on a phone — does it hold up?
2. Click every live demo link — all working?
3. Open the best repo — README present and skimmable in 30s?
4. GitHub profile — are the right 4 repos pinned, activity current?
5. Show a stranger the homepage: can they say what I do in one sentence?
6. Every requirement on the target spec maps to a clickable piece of evidence?

---

## 6. Standing rule

The must-haves checklist blog post (`blog/must-haves-roadmap.mdx`) stays public and dated — gaps close with evidence, never with adjectives.
