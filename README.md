# realworld-learning

由零開始跟 [RealWorld 規格](https://github.com/realworld-apps/realworld) 寫一個 Medium 複製品（Conduit），學全栈開發。

呢個 repo 只係**空殼骨架**：有 health endpoint、hello 頁面同已經設定好嘅 Prisma，但**冇任何 RealWorld 業務邏輯**，全部要你自己寫。

## 技術
| 部分 | 技術 |
|---|---|
| `apps/api` | NestJS + TypeScript + Prisma + PostgreSQL |
| `apps/web` | Next.js（React，App Router） |
| 根目錄 | pnpm workspace monorepo、docker-compose 起 Postgres |

## 學習目標
- 睇得明 API 規格（[endpoints](https://github.com/realworld-apps/realworld/blob/main/docs/src/content/docs/specifications/backend/endpoints.md)、[openapi.yml](https://github.com/realworld-apps/realworld/blob/main/specs/api/openapi.yml)），再自己實現出嚟
- 學識 NestJS 嘅 module / controller / service 分層、DTO 驗證、Guard
- 用 Prisma 設計資料表、寫 migration、處理多對多關係（follow、favorite、tag）
- 用 JWT 做註冊、登入同權限控制
- 用官方 [Bruno API 測試](https://github.com/realworld-apps/realworld/tree/main/specs/api/bruno) 驗收自己寫嘅 API
- 用 Next.js 寫前端，連接自己嘅後端
- 習慣 branch + PR 嘅開發流程

## 4 階段路線
1. **階段 1：用戶同認證** — 註冊/登入（JWT）、current user（issue 標 `stage-1`）
2. **階段 2：Profile 同 follow** — 睇 profile、follow/unfollow（`stage-2`）
3. **階段 3：文章** — 文章 CRUD、feed、favorite、留言、tags、分頁同篩選（`stage-3`）
4. **階段 4：前端** — 用 Next.js 做 Conduit 頁面，接返自己嘅 API（`stage-4`，跟[前端規格](https://github.com/realworld-apps/realworld/tree/main/docs/src/content/docs/specifications/frontend)）

每個功能都有對應 issue，寫咗 endpoint、request/response 格式同驗收條件。

## 本機啟動
需要：Node 20+、pnpm 9（`corepack enable`）、Docker。

```bash
git clone https://github.com/Anson1234567Anson/realworld-learning.git
cd realworld-learning
pnpm i
cp .env.example .env
cp .env.example apps/api/.env
pnpm db:up                 # 用 docker compose 起 Postgres（localhost:5432）
pnpm prisma:generate
pnpm dev:api               # http://localhost:3000/api/health
pnpm dev:web               # http://localhost:3001
```

`GET /api/health` 回 `{"status":"ok","db":"up"}` 就代表 API 連到資料庫。

加 model 之後：`pnpm prisma:migrate --name <名>` 建 migration。`schema.prisma` 入面嘅 `Placeholder` model 只係為咗令 Prisma generate 得到，加咗 `User` 之後可以刪走。

## 用官方測試驗收
```bash
git clone https://github.com/realworld-apps/realworld.git
cd realworld/specs/api
# 睇 README.md；用 Bruno CLI 對住 http://localhost:3000/api 行
```
每個 issue 都寫明要 pass 邊個 Bruno 資料夾。

## 開發流程（branch + PR）
- `main` 只放可以運行嘅代碼，**唔好直接 push 去 main**
- 每個 issue 開一條 branch，例如 `feat/1-auth`
- 寫完開 PR，喺描述寫 `Closes #1`，review 完先 merge
