# Motion Web

Маркетплейс анимированных шаблонов и AI-промптов: дизайн и логика в духе современных сайтов + ⌘K-поиск в стиле 21st.dev. Freemium-модель: Free / Unlimited ($19/мес).

Весь контент (промпты и анимации) — **оригинальный**, под открытой лицензией. Ничего не спарсено и не скопировано из платных/закрытых источников.

## Запуск

```bash
npm install
npm run dev        # http://localhost:3000
```

## Контент

- **24 оригинальных промпта** — в `prisma/prompts.mjs` (по одному под каждый шаблон, CC0). Правишь их там и запускаешь `npm run db:seed` — БД обновится (upsert обновляет и существующие строки).
- **Живые превью** — оригинальные CSS-анимации (`src/lib/previews.ts` + `src/components/AnimatedPreview.tsx`), 14 видов. Карта «шаблон → тип анимации» в `previews.ts`.
- **⌘K поиск** — `src/components/CommandPalette.tsx`, глобальный по всем страницам.

Добавить новый шаблон: допиши его в `prisma/seed.mjs`, промпт — в `prisma/prompts.mjs`, затем `npm run db:seed`.

Опциональные поля в таблице `Template` (Prisma Studio: `npx prisma studio`):
- **previewVideo** — URL видео-превью (заменит CSS-анимацию, если задан).
- **animationCode** — HTML/embed живой анимации на странице шаблона.
- **tier** — `FREE` / `PREMIUM` (премиум-промпт скрыт за подпиской).
- **featured** — показывать во вкладке Featured.

## Подписка и оплата

Сейчас «Go Unlimited» в дев-режиме мгновенно апгрейдит аккаунт (для тестов). Для реальных платежей:
1. Заполни `STRIPE_SECRET_KEY` и price ID в `.env`.
2. Допиши Stripe Checkout в `src/app/api/upgrade/route.ts`.
3. Апгрейд плана делай из Stripe-вебхука.

## Стек

Next.js 16 (App Router) · Tailwind CSS 4 · Prisma + SQLite · NextAuth v5 (email+пароль, JWT) · bcrypt

Для продакшена: смени SQLite на Postgres (одна строка в `prisma/schema.prisma` + `DATABASE_URL`), задеплой на Vercel/Railway.
