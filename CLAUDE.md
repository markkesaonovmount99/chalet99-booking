@AGENTS.md

# Шале 99

Сайт бронирования люксовых шале в горах Северной Осетии.

## Стек

- **Next.js 16** (App Router, Turbopack, `src/` layout) — см. `AGENTS.md` /
  `node_modules/next/dist/docs/` перед использованием API, которые могли
  измениться относительно более старых версий Next.js.
- **React 19**, **TypeScript**, **Tailwind CSS 4**
- **Prisma 7** + **PostgreSQL** (генератор `prisma-client`, ESM-клиент,
  подключение через `@prisma/adapter-pg`)
- **Zod** + **react-hook-form** для валидации форм
- **date-fns** для работы с датами (собственный календарь доступности,
  без сторонних UI-календарь-библиотек)
- **lucide-react** для иконок

### Особенности Next.js 16, важные для этого проекта

- `middleware.ts` заменён на **`src/proxy.ts`** (экспорт функции `proxy`,
  а не `middleware`). Матчер тот же: `config.matcher`.
- `priority` у `next/image` устарел — используется **`preload`**.
- Типы пропсов страниц берутся из глобальных хелперов, генерируемых
  Next.js: `PageProps<'/route'>`, `LayoutProps<'/route'>`,
  `RouteContext<'/route'>` (для route handlers). Не объявляйте `params`/
  `searchParams` вручную — используйте эти типы.
- `params` и `searchParams` — всегда `Promise`, синхронного доступа нет.

### Особенности Prisma 7

- `datasource.url` в `schema.prisma` больше не поддерживается — URL живёт
  в `prisma.config.ts` и передаётся в `PrismaClient` через **driver
  adapter** (`@prisma/adapter-pg`), см. `src/lib/prisma.ts`.
- Генератор — `prisma-client` (не `prisma-client-js`), клиент генерируется
  как исходники TS/ESM в `src/generated/prisma` (в `.gitignore`, нужно
  `npx prisma generate` после клонирования).
- Импортировать клиент и типы из `@/generated/prisma/client` и
  `@/generated/prisma/enums`, а не из `@prisma/client`.
- Seed-команда настроена в `prisma.config.ts` → `migrations.seed`
  (`tsx prisma/seed.ts`), а не в `package.json`.

## Команды

```bash
npm run dev          # dev-сервер (Turbopack), http://localhost:3000
npm run build         # продакшн-сборка
npm run db:dev        # локальный Postgres без Docker (npx prisma dev)
npm run db:migrate    # применить миграции схемы
npm run db:seed       # засеять тестовые шале
npm run db:studio     # Prisma Studio для просмотра БД
```

Для первого запуска: скопировать `.env.example` в `.env`, поднять БД
(`npm run db:dev` — печатает `DATABASE_URL`, либо указать свою PostgreSQL),
затем `npm run db:migrate` и `npm run db:seed`.

## Структура проекта

```
prisma/
  schema.prisma       # модели Chalet, Booking
  seed.ts              # тестовые шале в горах Северной Осетии
prisma.config.ts        # конфиг Prisma 7 (датасорс, миграции, seed)
src/
  app/
    page.tsx                        # главная
    chalets/page.tsx                # каталог с фильтрами (searchParams)
    chalets/[slug]/page.tsx         # страница шале
    about/page.tsx, contacts/page.tsx
    admin/                          # защищённая паролем админка
    api/bookings, api/chalets/[slug]/availability, api/contact
    sitemap.ts, robots.ts
  components/
    ui/          # Button, Field (Input/Select/Textarea), Badge — примитивы
    layout/      # Header, Footer
    home/        # Hero, Advantages, FeaturedChalets, QuickSearchForm
    chalets/     # ChaletCard, ChaletFilters, Gallery, AvailabilityCalendar, BookingForm
    contacts/    # ContactForm
  lib/
    prisma.ts        # singleton PrismaClient с адаптером pg
    validations.ts   # zod-схемы (booking, contact)
    availability.ts  # проверка пересечения дат бронирования
    auth.ts           # cookie-сессия админки на основе ADMIN_PASSWORD
    utils.ts          # cn(), formatPrice(), formatDate()
  proxy.ts             # защита /admin (см. выше про Next 16)
```

## Данные

- `Chalet` — `slug` (человекочитаемый URL), цена за ночь в рублях (Int),
  `amenities`/`images` — простые `String[]` (без отдельных моделей
  Amenity/Review — усложнение не требовалось для текущего объёма).
- `Booking` — статусы `NEW` → `CONFIRMED`/`REJECTED`. Доступность дат
  проверяется по пересечению интервалов среди броней со статусом `NEW`
  или `CONFIRMED` (см. `src/lib/availability.ts`), отклонённые брони не
  блокируют даты.

## Админка (`/admin`)

Без полноценной auth-системы: пароль в `ADMIN_PASSWORD` (`.env`),
`src/proxy.ts` редиректит неавторизованных на `/admin/login`. Сессия —
httpOnly-cookie со значением `sha256("chalet99:" + ADMIN_PASSWORD)`
(см. `src/lib/auth.ts`). Подтверждение/отклонение заявок — через Server
Actions (`src/app/admin/actions.ts`), без клиентского JS.

## Дизайн-система

Палитра и шрифты заданы CSS-переменными в `src/app/globals.css` и
подключены в Tailwind через `@theme inline`:

- Цвета: `forest-*` (тёмно-зелёный, основной бренд-цвет), `wood-*`
  (акценты дерева), `cream`/`paper` (фон), `ink` (текст).
- Шрифты: `--font-serif` (Fraunces — заголовки, премиальный редакторский
  стиль), `--font-sans` (Inter — основной текст).
- Тема — люксовый минимализм с отсылкой к шахматам/коллекционированию
  (шахматный стол как деталь в описаниях шале, `.chess-texture` —
  декоративный паттерн для точечного использования).

Новые UI-примитивы добавлять в `src/components/ui/`, переиспользовать
`cn()` из `src/lib/utils.ts` для условных классов.

## Соглашения

- Тексты интерфейса — на русском, премиальный и лаконичный тон.
- Формы фильтров каталога — обычные GET-формы (без JS), работают через
  `searchParams` на сервере.
- Формы бронирования/контактов — react-hook-form + zod, клиентские
  компоненты, отправка через `fetch` на API-роуты.
- Изображения — только через `next/image`; в dev/демо используются
  плейсхолдеры `picsum.photos` (разрешено в `next.config.ts` через
  `images.remotePatterns`) — заменить на реальные фото шале в продакшене.
