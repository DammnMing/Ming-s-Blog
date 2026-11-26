# SUBMING · 李佳铭个人展示站与简历平台（V0.4）

> **AIGC 漫剧制片 × 全栈开发工程师** 双风格个人主页、作品集与可打印正式简历，面向未来可扩展为公开多用户简历平台。

- **当前版本**：`v0.4.1`（pnpm Monorepo，已正式提升至仓库根目录）
- **历史版本归档**：V0.02（原 Next.js 16 + Vercel Blob 单体版）已通过 Git 分支 `archive/v0.2` 与标签 `V0.02` 永久归档。

---

## 核心特性（V0.4 第一期）

- **双视角即时切换**：顶部与首屏支持一键切换 **AIGC 漫剧制片** 与 **全栈开发工程师** 视角，整站视觉体系与叙事重心同步切换：
  - **AIGC 漫剧制片视角**：暖白宣纸微肌理（`#F6F4EF`）× 炭墨黑 × 暗朱砂红（`#C84B31`）大刊编辑风格，含巨型刊头 `SUBMING`、满出血 4 帧换刊封面、左右交替镇馆跨页、粘性人物专访与视觉年表。
  - **全栈开发工程师视角**：深空午夜蓝黑（`#070B14` / `#0D1424`）× 电光蓝（`#3B82F6` / `#60A5FA`）硬核工程风格，含双视图工作台（3 大工程系统切换 + 实机画面/4 层架构拓扑一键切换）、纯工程镇馆跨页与蓝黑光轨收尾。
- **作品集与媒体预留（`/portfolio`）**：支持 `漫剧作品` / `全栈工程` 二级菜单分类筛选与详情弹窗（支持 `Esc` 关闭，已预留原生 `<video>` 播放器以对接阿里云 OSS + CDN）。
- **双岗位可打印简历（`/resume`）**：面向 AIGC 漫剧制片与全栈开发工程师的双版本正式简历，内置 `@media print` 纯白 A4 打印一致性内核。
- **底层平台能力保留（二/三期演进基座）**：完整保留 `/login`、`/register`、`/app/*`、`/admin`、`/r/:slug` 与 Hono + SQLite（Drizzle）后端接口，后续可平滑恢复在线简历编辑与多用户公开分享平台。

---

## 仓库目录结构

```text
My-Blog/
├── apps/
│   ├── web/                 # Vite 7 + React 19 + Tailwind CSS v4 前端应用
│   │   ├── public/          # 定制视觉大片与静态资源
│   │   └── src/             # 双风格首页、作品集、正式简历、工作台页面与组件
│   └── api/                 # Hono + SQLite(Drizzle) 后端 API 服务（二/三期用）
├── packages/
│   ├── shared/              # 共享类型、Drizzle schema、Zod 校验与工具
│   └── ui/                  # 主题令牌（5 套）与打印/排版基础组件
├── docs/                    # 文档库（入口：docs/INDEX.md，由 pnpm docs:index 自动生成）
│   ├── 01-product/          # 产品需求文档（PRD-001 / PRD-002）
│   ├── 02-plans/            # 开发阶段规划（PLAN-001）
│   ├── 03-tech/             # 技术方案（TECH-001 低内存原生部署架构）
│   ├── 04-ops/              # 部署与更新手册（OPS-001）
│   ├── 05-decisions/        # 架构决策记录（DEC-001）
│   └── 06-api/              # 平台侧 API 契约（API-001 ~ API-006）
├── deploy/                  # 阿里云 ECS 原生部署脚本与 systemd / nginx 模板
├── scripts/                 # 自动化脚本（doc-index.mjs 等）
├── archive/                 # 历史容器方案留档（archive/docker）
├── vercel.json              # Vercel 纯前端主站构建与 SPA 路由重写配置
└── package.json             # pnpm workspace 根配置（v0.4.1）
```

---

## 本地开发

环境要求：**Node.js >= 22**、**pnpm >= 10**。

```bash
# 1. 安装依赖
pnpm install --frozen-lockfile

# 2. 启动前端开发服务（http://localhost:5173）
pnpm dev:web

# 3. 同时启动前后端（二/三期全栈联调）
pnpm dev

# 4. 校验与构建
pnpm docs:check    # 校验文档 frontmatter 与 INDEX.md 索引
pnpm typecheck     # 全仓 TypeScript 类型检查
pnpm test          # Vitest 单元测试
pnpm build:web     # 构建纯前端产物（apps/web/dist）
pnpm build         # 全量构建 web + api
```

---

## 部署指南

### 1. Vercel 纯前端主站（当前线上展示站）

仓库根目录已配置 [`vercel.json`](vercel.json)，推送 `main` 分支即自动构建纯前端展示站并开启 SPA 路由重写：

- **Install Command**：`pnpm install --frozen-lockfile --filter @platform/web...`（跳过 `apps/api` 的原生模块 `better-sqlite3`，避免无意义编译）
- **Build Command**：`pnpm --filter @platform/web build`
- **Output Directory**：`apps/web/dist`

> 若 Vercel 项目是从旧版 Next.js 升级而来，首次切换需在 Vercel 控制台 **Settings → Build and Deployment → Framework Preset** 中确认选择 `Vite`（或 `Other`）。

### 2. 阿里云 ECS 自建全栈（二/三期平台版）

面向后续开启在线编辑与多用户存储时使用，采用 **Linux 原生部署（无 Docker，2C1G 低内存友好）**：

- 架构决策详见 [`docs/03-tech/TECH-001-部署架构调整-低内存原生部署.md`](docs/03-tech/TECH-001-部署架构调整-低内存原生部署.md)
- 部署与回滚手册详见 [`docs/04-ops/OPS-001-部署与更新手册.md`](docs/04-ops/OPS-001-部署与更新手册.md)
- 运维脚本位于 [`deploy/`](deploy/)（`deploy.sh` / `backup.sh` / `nginx-resume.conf` / `resume-api.service`）

---

## 三期演进路线图

1. **第一期（已完成 · `v0.4.0`）**：高完成度双风格个人展示站、二级菜单作品集与可打印双岗位正式简历；后续可平滑接入阿里云 OSS + CDN 视频播放。
2. **第二期（已留基座）**：恢复并打磨在线简历编辑工作台（`/app/*`、`/login`、`/admin`）。
3. **第三期（远景规划）**：将个人展示站与公开多用户简历平台（`/r/:slug`）深度融合。

---

## 历史归档说明（V0.02）

- **归档位置**：Git 分支 `archive/v0.2` 与标签 `V0.02`
- **如需查看或恢复旧版**：
  ```bash
  git checkout archive/v0.2
  ```

---

## 安全与隐私说明

- 所有公开展示的商业工程项目均严格脱敏，不暴露客户内部域名、AppID、测试口令或私有仓库地址。
- 公开联系方式仅展示邮箱与 GitHub（[`github.com/DammnMing`](https://github.com/DammnMing)），个人手机号与微信在正式投递沟通时单独提供。
- 环境变量模板见 [`.env.example`](.env.example)，生产密钥严禁提交至代码库。
