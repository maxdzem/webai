# webai

**An open, community-driven library of high-quality AI prompts.** Search,
copy, remix and contribute — every prompt released under an open license
(CC0 / MIT / CC-BY). No paywall, no scraping, no lock-in.

Built with Next.js 16 (App Router), TypeScript and Tailwind CSS v4.

---

## Features

- ⌘K **command-palette search** — instant, keyboard-first prompt search (also `/` to open)
- 🧩 **Prompt directory** — filter by category and tags, sort by popular / newest
- 📄 **Prompt detail pages** — one-click copy, license info, recommended models, related prompts
- 🔐 **Auth UI** — email + GitHub/Google OAuth scaffold (sign in / sign up)
- ✍️ **Submit flow** — contribute prompts under an explicit open license
- 🎨 Original dark design system, fully responsive

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm start       # serve the production build
npm run lint    # eslint
```

## Project structure

```
src/
  app/
    page.tsx                # landing (hero + categories + featured)
    prompts/page.tsx        # explore / search / filter
    prompts/[slug]/page.tsx # prompt detail + copy
    sign-in, sign-up/       # auth UI
    submit/                 # contribute a prompt
    licensing/              # how the open model works
  components/               # navbar, footer, command palette, cards, auth form
  lib/prompts.ts            # data model + seed library + search
```

## Data

Prompts live in [`src/lib/prompts.ts`](src/lib/prompts.ts) as typed objects.
Swap this for a database (Postgres/Supabase) or a headless CMS when you're
ready — the UI only depends on the `Prompt` type and the `searchPrompts()`
helper.

## Auth (wiring it up)

The sign-in / sign-up / submit forms are front-end scaffolds. To make them
live, connect a provider:

- **NextAuth (Auth.js)** — GitHub + Google + email in a few files
- **Supabase Auth** — pairs well if you also use Supabase for the prompt DB
- **Clerk** — fastest drop-in if you want managed auth

Add credentials to `.env.local` and replace the `onSubmit` handlers in
`src/components/auth-form.tsx`.

## Licensing & contribution policy

webai only hosts prompts contributors are free to share — original work or
already-open content. We **do not** host prompts copied from paid vaults,
closed marketplaces, or anything obtained by circumventing another service's
access controls. This is what keeps the library both free *and* defensible.
See the in-app `/licensing` page.

The webai source code is released under the MIT License.

---

> `requirements.txt` in the repo root is a leftover from an earlier Django
> prototype and is not used by this project — safe to delete.
