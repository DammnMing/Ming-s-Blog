import type { Persona } from "../components/PersonaContext.js";

export interface HighlightItem {
  label: string;
  value: string;
  desc: string;
}

export interface TimelineItem {
  period: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

export interface ProjectArchLayer {
  idx: string;
  layer: string;
  spec: string;
  metric: string;
}

export interface ProjectArchitecture {
  endpoint: string;
  status: string;
  layers: ProjectArchLayer[];
}

export interface ShowcaseProject {
  id: number;
  slug: string;
  title: string;
  category: "manga" | "dev";
  role: string;
  tagline: string;
  episodes: string;
  team: string;
  result: string;
  tags: string[];
  featured: boolean;
  mediaUrl: string;
  mediaType: "image" | "video";
  /** 预留：后续接入阿里云 OSS + CDN 后的视频播放地址 */
  videoUrl?: string;
  /** 预留：视频封面图 */
  posterUrl?: string;
  /** 工程项目分层架构拓扑数据（用于蓝黑架构视图与脱敏项目展示） */
  architecture?: ProjectArchitecture;
}

export interface ResumeWorkExp {
  company: string;
  period: string;
  role: string;
  points: string[];
}

export interface ResumeEducation {
  period: string;
  school: string;
  desc: string;
}

export interface AigcResumeData {
  id: "aigc";
  label: string;
  title: string;
  summary: string;
  highlights: HighlightItem[];
  workExperience: ResumeWorkExp[];
  works: { name: string; role: string; result: string }[];
  abilities: { item: string; desc: string }[];
  education: ResumeEducation[];
  certs: string;
}

export interface DevResumeData {
  id: "dev";
  label: string;
  title: string;
  summary: string;
  highlights: HighlightItem[];
  workExperience: ResumeWorkExp[];
  projects: { name: string; role: string; points: string[] }[];
  techStack: { cat: string; items: string }[];
  education: ResumeEducation[];
  certs: string;
}

export interface PersonaHomeCopy {
  badge: string;
  headlineTop: string;
  headlineAccent: string;
  lead: string;
  highlights: HighlightItem[];
  featuredTitle: string;
  featuredSubtitle: string;
  ctaTitle: string;
  ctaDesc: string;
}

export const SHOWCASE_PROFILE = {
  name: "李佳铭",
  siteName: "SubMing.Top",
  titles: ["AIGC 漫剧制片人", "全栈开发工程师"],
  location: "杭州",
  email: "jming2568@gmail.com",
  github: "github.com/DammnMing",
  githubUrl: "https://github.com/DammnMing",
  avatarUrl: "https://5dlqzo4ffvvvvjyv.public.blob.vercel-storage.com/uploads/1786664462819-rgt9dq.jpg",
  certPhotoUrl: "https://5dlqzo4ffvvvvjyv.public.blob.vercel-storage.com/uploads/1786664475262-p8zhf5.jpg",
  bioShort:
    "当过两年西藏武警，转行自学全栈，入职 9 个月从漫剧制作一线干到技术部负责人——产线缺什么效率工具，我就自己写一个。",
};

export const PERSONA_HOME_COPY: Record<Persona, PersonaHomeCopy> = {
  aigc: {
    badge: "AIGC 漫剧制片 × 自研生产引擎",
    headlineTop: "让想象力，",
    headlineAccent: "成为工业流水线。",
    lead: "从单部破百万收藏的 64 集爆款，到并行交付 400 余集的长篇产线——我不只把故事拍成画面，更自己写下支撑它运转的代码。",
    highlights: [
      { label: "红果收藏", value: "100万+", desc: "《重生之一条蛇》首月交付爆款" },
      { label: "累计产出", value: "400+ 集", desc: "6+ 部漫剧并行统筹交付" },
      { label: "制作降本", value: "约 30%", desc: "自研平台替代繁琐手工流转" },
      { label: "9 个月两连升", value: "制作→技术负责人", desc: "懂内容现场更懂落地效率" },
    ],
    featuredTitle: "镇馆代表作与产线实践",
    featuredSubtitle: "从破亿播放的爆款片场，到把单集成本打下来 30% 的内部引擎",
    ctaTitle: "既能把控成片质感，也能搭起降本产线。",
    ctaDesc: "完整的 6 部漫剧统筹细节、五步制片 SOP 与团队交付履历已整理在正式简历；想直接审片与看工程实绩，请进作品集。",
  },
  dev: {
    badge: "FULLSTACK ARCHITECTURE × AI PIPELINE",
    headlineTop: "不为演示写代码，",
    headlineAccent: "只为产线造引擎。",
    lead: "独立交付支撑 30 人同时在线的 AIGC 生产中台，把创意团队的真实卡点，一行行写进可量化的成本曲线里。",
    highlights: [
      { label: "并发生产平台", value: "30人在线", desc: "日流水三千+，软著归个人" },
      { label: "后端工程规模", value: "30+ API", desc: "6 类 Redis Worker + 双 Schema" },
      { label: "业务实效", value: "降本 ~30%", desc: "用工程手段直接解决产线痛点" },
      { label: "AI 工程协作", value: "多 Agent", desc: "双协议 LLM 接入与质量门禁体系" },
    ],
    featuredTitle: "核心系统与跨界交付",
    featuredSubtitle: "先看高并发全栈平台架构，再看工程能力反哺的爆款内容实绩",
    ctaTitle: "找一个能独立扛起全栈与 AI 落地的工程师？",
    ctaDesc: "系统架构拆解、30+ 接口与异步队列细节、运维与服役履历均在正式简历页，支持一键复制邮箱与纯白 A4 打印。",
  },
};

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: 7,
    slug: "youyue-manju",
    title: "优阅漫剧助手",
    category: "dev",
    role: "独立开发",
    tagline: "企业级 AIGC 内容生产平台",
    episodes: "V0.5.9 正式服务",
    team: "30人同时在线生成，日流水达三千以上",
    result: "覆盖生成任务、素材资产、成本记录到成片交付全链路，成本降低约 30%",
    tags: ["Next.js 16", "React 19", "PostgreSQL", "Redis", "Docker", "软著归个人"],
    featured: true,
    mediaUrl: "https://5dlqzo4ffvvvvjyv.public.blob.vercel-storage.com/uploads/1786666438296-3d2z0r.jpg",
    mediaType: "image",
    architecture: {
      endpoint: "prod://youyue-manju.app · v0.5.9",
      status: "30+ ONLINE",
      layers: [
        { idx: "01", layer: "CLIENT / WORKSPACE", spec: "Next.js 16 App Router · React 19", metric: "30 人并发" },
        { idx: "02", layer: "API GATEWAY", spec: "30+ REST Routes · Auth & Cost Ledger", metric: "日流水 3K+" },
        { idx: "03", layer: "ASYNC WORKERS", spec: "6 类 Redis Worker · 多模态任务状态机", metric: "降本 ~30%" },
        { idx: "04", layer: "PERSISTENCE & OSS", spec: "PostgreSQL + SQLite 双 Schema · 火山 TOS", metric: "1700+ 行 Schema" },
      ],
    },
  },
  {
    id: 10,
    slug: "health-platform-miniapp",
    title: "健康会员三端一体化平台 & 小程序",
    category: "dev",
    role: "全栈重构 & 小程序迁移",
    tagline: "商业级会员测评、健康课程、报告闭环与三端分流系统",
    episodes: "V0.3.0 预发布验收",
    team: "独立交付 Web 三端 + 原生微信小程序",
    result: "完成用户/门店/总部 Vue 3 三端独立构建与 Nginx 子域名分流，原生 TS+Sass 16 页小程序全闭环交付，96 项自动化测试全绿",
    tags: ["NestJS", "Vue 3", "PostgreSQL 16", "原生小程序 TS", "Docker Compose", "Nginx"],
    featured: true,
    mediaUrl: "/cover-health-platform.jpg",
    mediaType: "image",
    architecture: {
      endpoint: "monorepo://health-platform · v0.3.0",
      status: "96 TESTS PASS",
      layers: [
        { idx: "01", layer: "MULTI-CLIENTS", spec: "Vue 3 三端独立构建 + 原生 TS/Sass 小程序 16 页", metric: "全闭环交付" },
        { idx: "02", layer: "EDGE ROUTING", spec: "Nginx 按 Host 子域名分流 · 旧路径 301 兼容", metric: "三端物理隔离" },
        { idx: "03", layer: "CORE API", spec: "NestJS + Prisma · 测评计分黄金样例 71/71 一致", metric: "96 项全绿" },
        { idx: "04", layer: "INFRA & MEDIA", spec: "PostgreSQL 16 + Docker Compose + COS 视频流", metric: "容器化可回滚" },
      ],
    },
  },
  {
    id: 4,
    slug: "generous-brother",
    title: "《慷慨大师兄》",
    category: "manga",
    role: "组长 / 制作统筹",
    tagline: "完整人物、场景、道具资产体系",
    episodes: "78 集",
    team: "5 人团队并行制作",
    result: "统筹人物设定（常文/楚星河/沈念卿）、浩然峰系列 10+ 场景、道具系统",
    tags: ["资产体系", "仙侠"],
    featured: true,
    mediaUrl: "https://5dlqzo4ffvvvvjyv.public.blob.vercel-storage.com/uploads/1786666726539-1tvllm.jpg",
    mediaType: "image",
  },
  {
    id: 2,
    slug: "country-doctor",
    title: "《我重生为狗：屡破大案震惊全网》",
    category: "manga",
    role: "组长 / 全流程统筹",
    tagline: "统筹初模、定模、资产与成片全流程",
    episodes: "76 集/真人",
    team: "5-6 人团队",
    result: "全流程统筹，组织阶段性交付与甲方审阅",
    tags: ["制片统筹", "全流程"],
    featured: true,
    mediaUrl: "https://5dlqzo4ffvvvvjyv.public.blob.vercel-storage.com/uploads/1786667364742-z9dkoj.jpg",
    mediaType: "image",
  },
  {
    id: 1,
    slug: "https://www.alipan.com/s/639YjmnkXP5",
    title: "《玄幻开局：重生之一条蛇》",
    category: "manga",
    role: "核心制作成员",
    tagline: "上线首天力压斩仙台登顶排行榜第一，随后红果播放量破亿",
    episodes: "64 集（2D 版）",
    team: "6 人团队",
    result: "红果平台收藏破 100 万，入职首月交付",
    tags: ["爆款", "Seedance", "3D 国漫"],
    featured: true,
    mediaUrl: "https://5dlqzo4ffvvvvjyv.public.blob.vercel-storage.com/uploads/1786666246277-ilyrb6.jpg",
    mediaType: "image",
  },
  {
    id: 9,
    slug: "老祖风华绝代-小铭-封面",
    title: "《老祖风华绝代》",
    category: "manga",
    role: "组长",
    tagline: "ai仿真人短剧",
    episodes: "64",
    team: "6人团队",
    result: "使用viduq2模型制作的早期AI仿真人短剧项目",
    tags: ["AI仿真人", "Vidu Q2"],
    featured: false,
    mediaUrl: "https://5dlqzo4ffvvvvjyv.public.blob.vercel-storage.com/uploads/1786669504396-r9kxld.jpg",
    mediaType: "image",
  },
  {
    id: 8,
    slug: "ignesis",
    title: "Ignesis",
    category: "dev",
    role: "产品与架构设计",
    tagline: "下一代 AIGC 创作平台（筹备期）",
    episodes: "PRD + 架构契约",
    team: "独立设计",
    result: "完成第一阶段产品 PRD 与架构契约，规划五大业务中心",
    tags: ["架构设计", "多模态", "PRD"],
    featured: false,
    mediaUrl: "/cover-ignesis-engine.jpg",
    mediaType: "image",
    architecture: {
      endpoint: "arch://ignesis.platform · spec",
      status: "PRD + CONTRACT",
      layers: [
        { idx: "01", layer: "CREATOR WORKSPACE", spec: "多模态分镜画布与实时上下文编排", metric: "五大中心" },
        { idx: "02", layer: "DOMAIN CORES", spec: "项目 / 素材 / 调度 / 财务中心解耦契约", metric: "契约先行" },
        { idx: "03", layer: "TENANT ISOLATION", spec: "多租户权限边界与异步状态机不变量", metric: "安全隔离" },
        { idx: "04", layer: "EVOLUTION STRATEGY", spec: "「只搬图纸、不复制旧实现」演进规范", metric: "VNext 蓝图" },
      ],
    },
  },
  {
    id: 6,
    slug: "semang",
    title: "《红绿色盲》",
    category: "manga",
    role: "组长 / 制作统筹",
    tagline: "全流程统筹",
    episodes: "72 集/真人",
    team: "团队协同",
    result: "统筹全流程制作与进度排期，把控剧情连贯性与画面质量",
    tags: ["长篇", "统筹"],
    featured: false,
    mediaUrl: "https://5dlqzo4ffvvvvjyv.public.blob.vercel-storage.com/uploads/1786668687099-d111ay.jpg",
    mediaType: "image",
  },
  {
    id: 3,
    slug: "slaying-dragon",
    title: "《开局斩龙：获得长生不死之力》",
    category: "manga",
    role: "组长",
    tagline: "建立完整人设建模与场景拆分提示词体系",
    episodes: "78集",
    team: "团队协同",
    result: "建立从剧本到成片的完整工作流程",
    tags: ["人设建模", "提示词工程", "场景拆分"],
    featured: false,
    mediaUrl: "https://5dlqzo4ffvvvvjyv.public.blob.vercel-storage.com/uploads/1786669629751-fia4ob.jpg",
    mediaType: "image",
  },
];

export const SHOWCASE_RESUMES: { aigc: AigcResumeData; dev: DevResumeData } = {
  aigc: {
    id: "aigc",
    label: "AIGC 漫剧制片",
    title: "AI 漫剧制作组长 / AIGC 漫剧制片 / 内容产线管理",
    summary:
      "一年 AI 漫剧一线实战，入职 9 个月两次晋升（制作岗 → 组长 → 技术部负责人）。我做过首月上线即登顶、红果收藏破 100 万的《重生之一条蛇》，也带过 5-6 人团队并行啃下 400+ 集漫剧。摸透初模、定模、资产到审核交付的每个卡点后，我跑通了五步标准化产线，并独立写出内部生产平台，直接把团队制作成本压低了约 30%。",
    highlights: [
      { label: "爆款交付", value: "100万+ 收藏", desc: "《重生之一条蛇》红果播放破亿" },
      { label: "团队产能", value: "400+ 集", desc: "5-6 人并行交付 6+ 部漫剧" },
      { label: "产线降本", value: "约 30%", desc: "自研平台打通资产与任务流转" },
      { label: "晋升速度", value: "9 个月两连升", desc: "制作岗 → 组长 → 技术部负责人" },
    ],
    workExperience: [
      {
        company: "湖北优阅文化传媒有限公司",
        period: "2025.11 – 2026.08",
        role: "动态漫部 6 组组长（2026.02 晋升）→ 技术部负责人（2026.05 晋升）",
        points: [
          "入职首月参与交付爆款《重生之一条蛇》（红果收藏 100 万+、播放破亿），3 个月后凭交付质量升任组长",
          "带 5-6 人团队并行推进 6+ 部漫剧（累计 400+ 集），把控任务拆解到集到人、倒排档期与甲方审阅闭环",
          "摸索落地「初模设计 → 定模 → 资产建立 → 成片制作 → 审核交付」五步标准流程，配套提示词审阅与资产复用",
          "把 Seedance 2.0、Vidu Q3 等新模型快速引入一线生产，沉淀内部提示词库与 21 条技术知识索引",
          "发现人工传图、算账、查进度太耗时间，干脆自己独立开发「优阅漫剧助手」生产平台，直接降本约 30%（软著归个人）",
        ],
      },
    ],
    works: [
      { name: "《重生之一条蛇》", role: "核心制作成员", result: "红果收藏破 100 万、播放破亿，64 集，6 人团队" },
      { name: "《乡村神医 / 重生为狗》", role: "组长 / 全流程统筹", result: "76 集，统筹初模到成片全流程与甲方审阅" },
      { name: "《开局斩龙》", role: "组长", result: "78 集，搭建人设建模与场景拆分提示词体系" },
      { name: "《慷慨大师兄》", role: "组长 / 制作统筹", result: "78 集，统筹人物/浩然峰 10+ 场景/道具资产体系" },
      { name: "《老祖风华绝代》", role: "组长", result: "64 集，早期 AI 仿真人短剧（Vidu Q2）探索交付" },
      { name: "《红绿色盲》", role: "组长 / 制作统筹", result: "72 集真人漫剧，全流程进度与画面连贯性把控" },
    ],
    abilities: [
      { item: "AI 内容生产", desc: "Seedance 2.0 / Vidu Q3 / Seedream 实战；提示词工程、多模态一致性控制与资产库管理" },
      { item: "制片与带教", desc: "排期倒排、任务拆解到集到人、多轮高清审核门禁、甲方沟通及新人带教" },
      { item: "产线标准化", desc: "五步标准化制作流程、多版本交付机制，能从 0 到 1 搭建协作规范" },
      { item: "工具化提效", desc: "不仅会用工具，还能自己写工具解决产线瓶颈（降本 ~30%、质量分级控制）" },
      { item: "全栈技术底牌", desc: "具备 Next.js / TS / PostgreSQL / Docker 全栈开发与 NAS 内网运维能力" },
    ],
    education: [
      { period: "2021.09 – 2023.09", school: "武警西藏总队山南支队", desc: "两年高原服役 · 个人嘉奖一次、“四有”优秀士兵一次" },
      { period: "2018.09 – 2021.06", school: "武汉铁路职业技术学院", desc: "大专 · 电子商务" },
      { period: "2023.09 – 2025.10", school: "转型与技能积累期", desc: "黄冈职业技术学院电工培训（结业）+ 系统自学全栈开发" },
    ],
    certs: "电工职业技能等级证书（中级）｜ 普通话二级甲等 ｜ 驾驶证 C1",
  },
  dev: {
    id: "dev",
    label: "全栈开发工程师",
    title: "全栈开发工程师 / AI 应用工程化开发",
    summary:
      "当过两年西藏武警，退伍后自学全栈入行，9 个月从业务一线晋升为技术部负责人。我不写只跑在本地的玩具 Demo——在公司独立设计并上线了支撑 30 人同时在线生产的企业级 AIGC 平台，覆盖权限隔离、Redis 异步队列、对象存储、成本核算与质量门禁全链路，上线后真实降低了约 30% 的内容生产成本。",
    highlights: [
      { label: "线上生产系统", value: "30人并发", desc: "日流水三千+，软著归个人" },
      { label: "工程代码规模", value: "30+ API", desc: "6 类异步 Worker + 双 Schema" },
      { label: "真实业务收益", value: "降本 ~30%", desc: "把业务痛点直接做成工程系统" },
      { label: "AI 协作实战", value: "Agent 治理", desc: "多模态双协议接入 + 质量门禁" },
    ],
    workExperience: [
      {
        company: "湖北优阅文化传媒有限公司",
        period: "2025.11 – 2026.08",
        role: "技术部负责人 / 全栈工程师（9 个月内两次晋升）",
        points: [
          "一人扛起公司核心技术栈：企业内部 AIGC 生产平台独立开发、官网维护、NAS 存储搭建与内网服务部署",
          "先在一线带 5-6 人团队交付过 400+ 集漫剧，因此能精准把生产现场的卡点抽象成状态机与权限系统",
          "主导技术文档与知识库沉淀（21 条索引 + 12 篇 API 文档），建立起可复制的研发与质量门禁规范",
        ],
      },
    ],
    projects: [
      {
        name: "优阅漫剧助手 — 企业级 AIGC 内容生产平台",
        role: "独立设计 & 全栈交付 · 2026.05 – 2026.08 · V0.5.9 · 软著归个人",
        points: [
          "架构：Next.js 16（App Router）+ React 19 + Prisma + PostgreSQL 一体化架构，30+ API Routes 支撑 30 人并发",
          "异步引擎：基于 Redis 驱动 6 类后台 Worker（素材同步 / 任务轮询 / 结果归档 / 媒体元数据 / 成片后处理）",
          "数据模型：维护 PostgreSQL 与 SQLite 双 Schema（1700+ 行），覆盖用户权限、项目资产、生成任务、成本账本全链路",
          "生态集成：打通 Seedance 视频生成、GPT Image 2、火山引擎 TOS 对象存储、NextAuth 与支付能力",
          "质量保障：搭建三级质量门禁、Playwright 浏览器端验收流水线与 Docker（Web/PG/PgBouncer/Redis）生产仿真环境",
        ],
      },
      {
        name: "健康会员三端一体化平台 & 原生微信小程序重构",
        role: "全栈架构重构 & 小程序端交付 · V0.3.0 验收通过",
        points: [
          "后端与数据：基于 NestJS + Prisma + PostgreSQL 16 重构核心服务，测评计分黄金样例 71/71 逐条一致，模块 96 项自动化测试全绿",
          "多端工程与分流：单仓库实现用户端/门店端/管理端 Vue 3 三端独立构建，Nginx 按 Host 子域名物理分流并保留旧路径 301 兼容",
          "原生小程序迁移：使用原生微信小程序 TypeScript + Sass 完成 16 页用户端全闭环迁移（测评→报告→课程视频→跨设备找回），零运行时 npm 依赖",
          "交付与运维：搭建 Docker Compose（Nginx + API + Postgres）镜像发布与回滚流水线，对接 COS 私有视频流与九节全链路验收",
        ],
      },
      {
        name: "Ignesis — 下一代多模态创作平台（架构筹备）",
        role: "产品与架构设计 · 2026.07",
        points: [
          "独立完成第一阶段 PRD 与架构契约，拆解工作台、项目上下文、素材库、生产调度、财务核算五大业务中心",
          "提炼「只搬图纸、不复制旧实现」的演进策略，明确多租户隔离与异步状态机的安全不变量",
        ],
      },
      {
        name: "AI 工程实践 — 飞书文档管家 Agent & 多 Agent 协作",
        role: "Agent 设计与落地 · 2026.03",
        points: [
          "开发飞书文档 Agent，自动解析剧本并生成人物/道具/场景设计图表格，支持增量编辑",
          "建立可复用的 Agent 工程流（需求访谈 → 方案设计 → Skill 实现 → 回归验收），在主项目中落地多 Agent 任务治理",
        ],
      },
    ],
    techStack: [
      { cat: "前端与语言", items: "TypeScript / JavaScript / Node.js / Python；React 19 / Next.js 16 / Vue 3 / Vite / 原生微信小程序（TS+Sass）" },
      { cat: "后端与数据", items: "NestJS / Hono / Next.js API；PostgreSQL 16 / SQLite / Drizzle / Prisma；Redis 异步 Worker、状态机与幂等" },
      { cat: "部署与运维", items: "Linux / Nginx（子域名分流）/ Systemd / Docker Compose / PgBouncer；Playwright 验收与质量门禁" },
      { cat: "AIGC 与存储", items: "Seedance 2.0 / Vidu Q3 / Seedream 双协议调用；腾讯云 COS / 阿里云 OSS / 火山引擎 TOS / Vercel Blob" },
      { cat: "AI 工程化", items: "Claude Code / Codex 深度协作、Agent 架构、Skill 路由与多 Agent 任务治理" },
    ],
    education: [
      { period: "2021.09 – 2023.09", school: "武警西藏总队山南支队", desc: "两年高原服役 · 个人嘉奖一次、“四有”优秀士兵一次" },
      { period: "2018.09 – 2021.06", school: "武汉铁路职业技术学院", desc: "大专 · 电子商务" },
      { period: "2023.09 – 2025.10", school: "转型与自学全栈期", desc: "电工全日制培训（结业）+ 系统自学全栈开发 + 兼职硬件网络运维" },
    ],
    certs: "电工职业技能等级证书（中级）｜ 普通话二级甲等 ｜ 驾驶证 C1",
  },
};

export const SHOWCASE_TIMELINE: TimelineItem[] = [
  {
    period: "2025.11 – 2026.08",
    title: "湖北优阅文化传媒有限公司",
    subtitle: "一线制作 → 组长 → 技术部负责人（9 个月两连升）",
    description:
      "既带队交付了 400+ 集 AI 漫剧，又独立开发出支撑 30 人并发的企业级 AIGC 生产平台，用技术把团队制作成本拉低约 30%。",
    tags: ["技术部负责人", "独立全栈", "降本30%"],
  },
  {
    period: "2023.09 – 2025.10",
    title: "电工培训与全栈转行期",
    subtitle: "从硬件运维到 TypeScript 全栈开发",
    description:
      "在黄冈职业技术学院完成电工技能培训，同步系统自学 TypeScript / React / Node.js，并靠兼职装机与网络调试积累一线运维经验。",
    tags: ["全栈转型", "硬件运维", "电工中级"],
  },
  {
    period: "2021.09 – 2023.09",
    title: "武警西藏总队山南支队",
    subtitle: "高原服役 · 个人嘉奖 & “四有”优秀士兵",
    description:
      "两年的部队历练，锤炼出极端环境下的抗压能力、死磕到底的执行力，以及后来带团队、扛系统上线的责任感。",
    tags: ["西藏武警", "个人嘉奖", "四有优秀士兵"],
  },
  {
    period: "2018.09 – 2021.06",
    title: "武汉铁路职业技术学院",
    subtitle: "大专 · 电子商务",
    description: "接触互联网运营与电商商业逻辑，为后来理解业务需求与产品设计打下基础。",
    tags: ["大专", "电子商务"],
  },
];
