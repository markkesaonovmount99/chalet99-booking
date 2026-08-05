# Шале 99

Сайт бронирования люксовых шале в горах Северной Осетии. Каталог с фильтрами, страница объекта с календарём доступности и формой бронирования, приём заявок в БД и простая админ-панель для их подтверждения.

## Стек

- [Next.js 16](https://nextjs.org) (App Router, TypeScript, `src/`)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Prisma 7](https://www.prisma.io) + PostgreSQL
- [Zod](https://zod.dev) + [react-hook-form](https://react-hook-form.com) для валидации форм
- [date-fns](https://date-fns.org) — собственный календарь доступности без сторонних UI-библиотек

Подробности по конвенциям стека (в том числе особенности Next.js 16 / Prisma 7, отличающиеся от более старых версий) — в [CLAUDE.md](./CLAUDE.md).

## Быстрый старт

```bash
npm install
cp .env.example .env        # заполнить DATABASE_URL и ADMIN_PASSWORD

npm run db:dev               # локальный Postgres без Docker (npx prisma dev)
npm run db:migrate           # применить миграции
npm run db:seed              # засеять тестовые шале

npm run dev                  # http://localhost:3000
```

Если своего PostgreSQL нет — `npm run db:dev` поднимет локальный сервер и распечатает готовый `DATABASE_URL`, который нужно скопировать в `.env`.

## Переменные окружения

| Переменная            | Назначение                                              |
| ---------------------- | -------------------------------------------------------- |
| `DATABASE_URL`         | строка подключения к PostgreSQL                          |
| `ADMIN_PASSWORD`       | пароль для входа в `/admin`                               |
| `NEXT_PUBLIC_SITE_URL` | публичный URL сайта (используется в метатегах и sitemap)  |

## Скрипты

| Команда              | Что делает                                              |
| --------------------- | ---------------------------------------------------------- |
| `npm run dev`         | dev-сервер                                                 |
| `npm run build`       | `prisma generate` → `prisma migrate deploy` → `next build` |
| `npm run start`       | продакшн-сервер (после `build`)                            |
| `npm run db:dev`      | локальный Postgres без Docker                              |
| `npm run db:migrate`  | создать и применить миграцию в dev-БД                      |
| `npm run db:seed`     | засеять тестовые шале                                      |
| `npm run db:studio`   | Prisma Studio — просмотр БД в браузере                     |

## Структура

```
prisma/            # schema.prisma, миграции, seed-скрипт
src/
  app/              # страницы App Router + API-роуты
  components/       # ui/, layout/, home/, chalets/, contacts/
  lib/              # prisma, zod-схемы, проверка доступности дат, auth
  proxy.ts          # защита /admin (замена middleware.ts в Next.js 16)
```

## Данные

- **Chalet** — название, локация, цена за ночь, вместимость, удобства, фото, `slug` для человекочитаемого URL.
- **Booking** — заявка на бронирование шале со статусом `NEW` → `CONFIRMED` / `REJECTED`. Доступность дат проверяется по пересечению интервалов среди активных броней.

## Админ-панель

`/admin` защищена паролем из `ADMIN_PASSWORD` (без полноценной auth-системы — этого достаточно для одного администратора на первом этапе). Подтверждение и отклонение заявок — через Server Actions, без клиентского JS.
