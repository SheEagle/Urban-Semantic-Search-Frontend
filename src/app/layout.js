import {Libre_Baskerville, Geist_Mono} from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";

const libre = Libre_Baskerville({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    variable: '--font-libre',
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "City of Water and Ink",
    description: "Multi-modal semantic search",
};

export default function RootLayout({children}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={`${libre.variable} ${geistMono.variable} antialiased bg-parchment text-ink`}
            suppressHydrationWarning={true}
        >
        {children}
        </body>
        </html>
    );
}