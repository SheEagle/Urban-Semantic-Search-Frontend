import {Libre_Baskerville, Geist_Mono} from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";

// 📜 衬线体：用于标题，营造历史感
const libre = Libre_Baskerville({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    variable: '--font-libre',
});

// ⌨️ 等宽体：用于坐标和ID，营造打字机/档案感
const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Historical Maps",
    description: "Cartographic Archives Search",
};

export default function RootLayout({children}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body
            // 这里的类名组合实现了全局的羊皮纸背景和墨水色文字
            className={`${libre.variable} ${geistMono.variable} antialiased bg-parchment text-ink`}
            suppressHydrationWarning={true}
        >
        {children}
        </body>
        </html>
    );
}