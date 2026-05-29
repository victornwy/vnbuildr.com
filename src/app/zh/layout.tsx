import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "vnbuildr — 自定义着陆页设计与网站开发 | 马来西亚",
  description: "为初创公司、中小型企业及成长型品牌精心打造高转化率、极致快速的着陆页。手工编码，驻地马来西亚，7天交付。",
  metadataBase: new URL("https://vnbuildr.com"),
  alternates: {
    canonical: "https://vnbuildr.com/zh",
    languages: {
      "en": "https://vnbuildr.com",
      "zh-Hans": "https://vnbuildr.com/zh",
      "x-default": "https://vnbuildr.com",
    },
  },
  openGraph: {
    title: "vnbuildr — 自定义着陆页设计与网站开发 | 马来西亚",
    description: "为初创公司、中小型企业及成长型品牌精心打造高转化率、极致快速的着陆页。手工编码，驻地马来西亚，7天交付。",
    url: "https://vnbuildr.com/zh",
    siteName: "vnbuildr",
    type: "website",
  },
}

const zhFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "需要多长时间？", "acceptedAnswer": { "@type": "Answer", "text": "大多数项目从需求沟通到页面上线在5–7天内完成。极速交付（48小时）仅适用于静态 HTML 选项。" } },
    { "@type": "Question", "name": "我需要提供什么？", "acceptedAnswer": { "@type": "Answer", "text": "只需基本信息 — 您的公司名称、业务内容、目标客户，以及您已有的品牌素材（Logo、颜色）。文案和设计由我负责。" } },
    { "@type": "Question", "name": "提供修改机会吗？", "acceptedAnswer": { "@type": "Answer", "text": "是的 — 每个项目均包含一次完整的修改环节。即您预览已构建的页面，汇总反馈意见，我会一次性集中完成修改。" } },
    { "@type": "Question", "name": "我可以使用自己的域名吗？", "acceptedAnswer": { "@type": "Answer", "text": "当然可以。我会将页面部署到您指定的任何域名或子域名。如果您还没有托管服务，我可以推荐最简单、最便宜的方案。" } },
    { "@type": "Question", "name": "如果我已经有一个网站了呢？", "acceptedAnswer": { "@type": "Answer", "text": "没问题。着陆页可以放在子域名下，也可以作为您现有网站中的一个新页面 — 根据您的实际情况灵活安排。" } },
    { "@type": "Question", "name": "您与马来西亚以外的客户合作吗？", "acceptedAnswer": { "@type": "Answer", "text": "合作的。所有沟通均通过 WhatsApp 或电子邮件进行，地点不是障碍。报价以 MYR 为单位，但如有需要也可提供 USD 发票。" } },
  ],
}

export default function ZhLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(zhFaqSchema) }}
      />
      {children}
    </>
  )
}
