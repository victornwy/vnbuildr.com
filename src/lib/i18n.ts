export type Locale = "en" | "zh"

export interface FaqItem { q: string; a: string }

export interface TrackOption {
  badge: string; name: string; experience: string
  bestFor: string; bestForLabel: string
  perksLabel: string; perks: { title: string; body: string }[]
  deliveryLabel: string; delivery: string
}

export interface Translations {
  nav: {
    how: string; features: string; track: string; faq: string
    contact: string; portfolio: string
    getInTouch: string; chat: string
    langToggle: string; langHref: string
    animation: string; backToHome: string
  }
  hero: {
    label: string; line1: string
    rotatePrefix: string; rotateSuffix: string; rotatingWords: string[]
    subheadline: string; primaryCta: string; secondaryCta: string
    trustLine: string; reactMode: string; staticMode: string
  }
  how: {
    label: string; heading: string; subheading: string
    steps: { num: string; title: string; body: string; time: string }[]
  }
  features: {
    label: string; heading: string; subheading: string
    cards: { title: string; body: string }[]
  }
  tracks: {
    label: string; heading: string; subheading: string
    options: TrackOption[]
  }
  testimonials: {
    label: string; heading: string
    items: { quote: string; role: string; initials: string }[]
  }
  faq: {
    label: string; heading: string
    items: FaqItem[]
  }
  cta: { available: string; heading: string; subheading: string }
  about: {
    label: string; heading: string; bio1: string; bio2: string
    location: string; role: string; tags: string[]
  }
  footer: {
    copyright: string
    links: { whatsapp: string; email: string; how: string; portfolio: string }
  }
}

// ─── English ──────────────────────────────────────────────────────────────────
const en: Translations = {
  nav: {
    how: "How it works", features: "What you get", track: "Build options",
    faq: "FAQ", contact: "Contact", portfolio: "View Our Works",
    getInTouch: "Get started", chat: "Chat",
    langToggle: "中文", langHref: "/zh",
    animation: "Animation", backToHome: "Back to home",
  },
  hero: {
    label: "Custom Landing Page Design & Web Development",
    line1: "Your landing page,",
    rotatePrefix: "ready in ", rotateSuffix: "",
    rotatingWords: ["days.", "a week.", "no time."],
    subheadline: "High-converting, lightning-fast landing pages engineered for startups, small medium enterprise (SME) and scaling brands.",
    primaryCta: "Chat on WhatsApp", secondaryCta: "See how it works",
    trustLine: "Reply within 24 hours · No commitment required",
    reactMode: "React mode — fluid animations, premium motion components",
    staticMode: "Static HTML mode — no animations, instant load, zero dependencies",
  },
  how: {
    label: "The process",
    heading: "From brief to live\nin three steps",
    subheading: "No handoffs. No project managers. Just direct, focused work with someone who ships.",
    steps: [
      { num: "01", title: "You share the brief", body: "Message me on WhatsApp or email. Tell me about your product, audience, and goal. That's all I need to get started.", time: "Day 1" },
      { num: "02", title: "I design & build", body: "I write the copy, design the layout, and code a fast, mobile-first page — all tailored to your brand.", time: "Days 2–4" },
      { num: "03", title: "You review & launch", body: "You get a review round for tweaks. Once you're happy, it's ready to go live — handed off clean and ready to deploy.", time: "Day 3–5" },
    ],
  },
  features: {
    label: "What you get",
    heading: "Everything a high-converting\npage needs",
    subheading: "Not just a pretty design. A page engineered to turn visitors into leads.",
    cards: [
      { title: "Fast delivery", body: "Most projects are done in 5–7 days. No agency timelines, no waiting weeks for a first draft." },
      { title: "Copywriting included", body: "Conversion-focused copy written from scratch. You don't need to hand over a brief full of buzzwords." },
      { title: "Mobile-first, always", body: "Every page is built mobile-first and tested across devices. More than half your traffic is on a phone — it shows." },
      { title: "Clean, handoff-ready code", body: "Production-ready HTML/CSS you or your developer can maintain and extend. No lock-in." },
      { title: "CRO-informed design", body: "Clear CTAs, social proof placement, and a visual hierarchy built around one goal: getting visitors to act." },
      { title: "One revision round", body: "A structured feedback round so you can fine-tune the result — without endless back-and-forth." },
    ],
  },
  tracks: {
    label: "Build options",
    heading: "Choose how we\nbuild yours",
    subheading: "No matter which path you choose, you get raw, hand-crafted code with zero plugin bloat, zero heavy templates, and instant mobile loading speeds.",
    options: [
      {
        badge: "Option 1", name: "The Premium Experience",
        experience: "You're experiencing this right now. Scroll around — the smooth animations, fluid transitions, and polished interactions are all part of this tier.",
        bestFor: "Modern brands, consultants, creators, and businesses that want to make a strong first impression and stand out from competitors.",
        bestForLabel: "Best For", perksLabel: "What You Get",
        perks: [
          { title: "Smooth animations & motion", body: "Pages that feel alive — scroll reveals, hover effects, and transitions that make visitors stop and take notice." },
          { title: "Premium look & feel", body: "A refined, modern design that positions your brand as high-quality before a single word is read." },
          { title: "Built to grow with you", body: "The foundation is solid enough to expand into a full website or add new pages whenever you're ready." },
        ],
        deliveryLabel: "Delivery Time", delivery: "3 – 5 Days",
      },
      {
        badge: "Option 2", name: "The Fast & Simple Launch",
        experience: "No frills, no delays. A clean, professional page focused entirely on loading fast and converting visitors — nothing in the way.",
        bestFor: "Local businesses, service providers, event pages, and anyone who needs a professional online presence up fast without the complexity.",
        bestForLabel: "Best For", perksLabel: "What You Get",
        perks: [
          { title: "Loads in under a second", body: "Even on a slow mobile connection, your page is up instantly. Slow sites lose customers — this one won't." },
          { title: "Clean, professional design", body: "Looks sharp and credible without the bells and whistles. Simple done well still converts." },
          { title: "Zero ongoing maintenance", body: "Nothing to update, nothing to break. Once it's live, it stays live — host it anywhere for next to nothing." },
        ],
        deliveryLabel: "Delivery Time", delivery: "48 Hours",
      },
    ],
  },
  testimonials: {
    label: "Client results", heading: "What clients say",
    items: [
      { quote: "As a freelance accounting firm, we needed a page that looks professional and gets clients to reach out. vnbuildr delivered exactly that — clean layout, clear messaging, and it was live within the week.", role: "Founder, AN Account", initials: "AA" },
      { quote: "The animated hero was exactly what we had in mind — modern, fast, and it actually explains the product clearly. They structured the whole page around our core value prop without us having to spell it out.", role: "Head of Product, TopSpace", initials: "TS" },
      { quote: "Our firm needed a site that looked premium and communicated authority instantly. vnbuildr nailed it. Sharp copy, clean visual hierarchy, and it was live well within the week.", role: "Managing Partner, Meridian", initials: "M" },
    ],
  },
  faq: {
    label: "FAQ", heading: "Common questions",
    items: [], // English FAQ uses the full ReactNode array in page.tsx
  },
  cta: {
    available: "Currently available",
    heading: "Start your project",
    subheading: "Fill in the brief below and I'll respond within 24 hours.",
  },
  about: {
    label: "About", heading: "The person behind the code",
    bio1: "I'm V — a self-taught developer based in Kuala Lumpur. I started vnbuildr because I kept seeing the same frustration: businesses were either paying agency prices for slow, bloated work, or settling for DIY builders that looked cheap and converted poorly.",
    bio2: "vnbuildr is the alternative. Clean, hand-coded landing pages built fast — at a fraction of the cost. Every project gets my direct attention from brief to launch. No junior handoffs, no account managers, no markup.",
    location: "Kuala Lumpur, Malaysia", role: "Founder, vnbuildr",
    tags: ["Self-taught", "Based in KL", "Works globally", "Direct communication", "No agency markup"],
  },
  footer: {
    copyright: "© 2026 vnbuildr. All rights reserved.",
    links: { whatsapp: "WhatsApp", email: "Email", how: "How it works", portfolio: "Portfolio" },
  },
}

// ─── Chinese ──────────────────────────────────────────────────────────────────
const zh: Translations = {
  nav: {
    how: "运作方式", features: "您将获得", track: "构建选项",
    faq: "常见问题", contact: "联系", portfolio: "作品集",
    getInTouch: "WhatsApp 联系", chat: "联系",
    langToggle: "EN", langHref: "/",
    animation: "动效模式", backToHome: "返回首页",
  },
  hero: {
    label: "自定义着陆页设计与网站开发",
    line1: "您的着陆页，",
    rotatePrefix: "", rotateSuffix: " 内准备就绪",
    rotatingWords: ["3天", "即刻完成", "7天"],
    subheadline: "为初创公司、中小型企业及成长型品牌精心打造 — 高转化率、极致快速的着陆页。",
    primaryCta: "WhatsApp 联系", secondaryCta: "了解运作方式",
    trustLine: "24小时内回复 · 无承诺负担",
    reactMode: "React 动效模式 — 流畅动画、高级动效组件",
    staticMode: "静态 HTML 模式 — 无动画、即时加载、零依赖",
  },
  how: {
    label: "运作流程",
    heading: "从需求到上线，\n只需三步",
    subheading: "没有层层转交，没有项目经理。只有直接、专注的执行者，使命必达。",
    steps: [
      { num: "01", title: "提供您的需求", body: "告诉我您的业务、目标受众，以及您希望页面实现什么目标。无需冗长表格 — 一次快速的 WhatsApp 沟通即可启动。", time: "第1天" },
      { num: "02", title: "预览页面成果", body: "我设计并构建您的页面，然后分享实时预览链接供您反馈。一次结构化的修改环节，避免无休止的反复沟通。", time: "第2–5天" },
      { num: "03", title: "正式上线", body: "页面一经确认，立即部署并开始接收流量。技术部分由我处理，您无需操心。", time: "第7天" },
    ],
  },
  features: {
    label: "您将获得",
    heading: "高转化页面\n所需的一切",
    subheading: "不只是漂亮的视觉设计。更是一个能够将访客转化为潜在客户的工程化页面。",
    cards: [
      { title: "快速交付", body: "多数项目在5–7天内完成。没有漫长的 agency 流程，无需等待数周才能看到初稿。" },
      { title: "包含文案撰写", body: "从头撰写以转化为目标的文案。您无需提交满是流行词汇的需求文档。" },
      { title: "移动端优先，始终如一", body: "每个页面都以移动端优先理念构建，并在各类设备上经过测试。超过一半的流量来自手机 — 效果立竿见影。" },
      { title: "整洁、可交接的代码", body: "生产就绪的 HTML/CSS，您或您的开发人员可以轻松维护和扩展。没有技术锁定。" },
      { title: "基于转化率优化的设计", body: "清晰的行动号召、社会证明的合理布局、围绕唯一目标构建的视觉层级：让访客行动起来。" },
      { title: "一次修改机会", body: "一次结构化的反馈环节，让您能够微调最终效果 — 避免无休止的反复沟通。" },
    ],
  },
  tracks: {
    label: "构建选项",
    heading: "选择适合您的\n构建方式",
    subheading: "无论您选择哪条路径，您获得的都是亲手编写、无插件臃肿、无笨重模板、移动端瞬间加载速度的原始代码。",
    options: [
      {
        badge: "选项 1", name: "高级体验版",
        experience: "您现在正在亲身体验。滑动浏览 — 流畅的动效、丝滑的过渡与精致的交互，均属于这一层级。",
        bestFor: "现代品牌、顾问、创作者，以及希望留下深刻第一印象、在竞争中脱颖而出的企业。",
        bestForLabel: "适合对象", perksLabel: "您将获得",
        perks: [
          { title: "流畅的动效与交互动画", body: "页面充满生机 — 滚动触发效果、悬停特效、让访客忍不住停留的转场。" },
          { title: "高级质感与格调", body: "精致、现代的设计，让访客在阅读任何一个字之前，就已经感受到您品牌的高品质。" },
          { title: "可伴随您成长的基础架构", body: "根基足够稳固，未来可轻松扩展为完整网站或添加新页面。" },
        ],
        deliveryLabel: "交付时间", delivery: "3 – 5 天",
      },
      {
        badge: "选项 2", name: "极速简洁版",
        experience: "没有花哨，没有延迟。一个干净、专业的页面，完全聚焦于快速加载与高效转化 — 没有任何多余元素。",
        bestFor: "本地商家、服务提供商、活动页面，以及任何需要快速获得专业线上形象、不想太复杂的人。",
        bestForLabel: "适合对象", perksLabel: "您将获得",
        perks: [
          { title: "不到一秒完成加载", body: "即使在慢速移动网络下，您的页面也能瞬间打开。慢速网站会流失客户 — 这个不会。" },
          { title: "干净、专业的设计", body: "外观简洁可信，没有多余装饰。简单做得好，照样能转化。" },
          { title: "零后续维护成本", body: "无需更新，不会出问题。页面上线后就能一直稳定运行 — 可以在几乎任何平台以极低成本托管。" },
        ],
        deliveryLabel: "交付时间", delivery: "48 小时",
      },
    ],
  },
  testimonials: {
    label: "客户评价", heading: "真实成果，真实客户",
    items: [
      { quote: "作为一家自由职业会计师事务所，我们需要一个看起来专业、能让客户主动联系的页面。vnbuildr 完美交付 — 干净的布局、清晰的信息传递，并且一周内就上线了。", role: "创始人, AN Account", initials: "AA" },
      { quote: "我们需要一个看起来有企业级水准、但不需要企业级预算的方案。最终效果超出预期 — 我们的销售团队现在直接发这个链接，而不是发 PDF 资料。", role: "总监, TopSpace Limited", initials: "TS" },
      { quote: "快速、干净、完全符合我们的需求。没有臃肿的 agency 流程，没有意外的账单。任何想要结果、不想被折腾的创始人，我都会推荐。", role: "联合创始人, Meridian Securities", initials: "M" },
    ],
  },
  faq: {
    label: "常见问题", heading: "常见问题解答",
    items: [
      { q: "需要多长时间？", a: "大多数项目从需求沟通到页面上线在5–7天内完成。极速交付（48小时）仅适用于静态 HTML 选项。" },
      { q: "我需要提供什么？", a: "只需基本信息 — 您的公司名称、业务内容、目标客户，以及您已有的品牌素材（Logo、颜色）。文案和设计由我负责。" },
      { q: "提供修改机会吗？", a: "是的 — 每个项目均包含一次完整的修改环节。即您预览已构建的页面，汇总反馈意见，我会一次性集中完成修改。" },
      { q: "我可以使用自己的域名吗？", a: "当然可以。我会将页面部署到您指定的任何域名或子域名。如果您还没有托管服务，我可以推荐最简单、最便宜的方案。" },
      { q: "如果我已经有一个网站了呢？", a: "没问题。着陆页可以放在子域名下（例如 offer.yourdomain.com），也可以作为您现有网站中的一个新页面 — 根据您的实际情况灵活安排。" },
      { q: "您与马来西亚以外的客户合作吗？", a: "合作的。所有沟通均通过 WhatsApp 或电子邮件进行，地点不是障碍。报价以 MYR 为单位，但如有需要也可提供 USD 发票。" },
    ],
  },
  cta: {
    available: "目前承接项目",
    heading: "启动您的项目",
    subheading: "填写需求表，我将在24小时内回复您。",
  },
  about: {
    label: "关于", heading: "代码背后的那个人",
    bio1: "我是 V — 一位自学成才的开发者，常驻吉隆坡。创立 vnbuildr，是因为我一次次看到同样的困境：企业要么为缓慢臃肿的工作支付机构级高价，要么将就于外观廉价、转化率低的自助建站工具。",
    bio2: "vnbuildr 是另一条路。干净、手工编码的着陆页，快速交付，成本仅为传统方式的几分之一。每个项目都由我亲自全程跟进，从需求沟通到上线。没有初级外包，没有客户经理，没有加价。",
    location: "吉隆坡，马来西亚", role: "创始人，vnbuildr",
    tags: ["自学成才", "常驻吉隆坡", "服务全球", "直接沟通", "无机构加价"],
  },
  footer: {
    copyright: "© 2026 vnbuildr. 版权所有。",
    links: { whatsapp: "WhatsApp", email: "邮件", how: "运作方式", portfolio: "作品集" },
  },
}

export const translations: Record<Locale, Translations> = { en, zh }
