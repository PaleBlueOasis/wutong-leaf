import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "梧桐叶盲盒 · 南京周边散步路线",
  description: "根据时间和兴趣，选择四牌楼、鼓楼与玄武湖周边的散步路线，查看地点与交通信息，并保存观察笔记。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
