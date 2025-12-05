/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{js,jsx}',
        './components/**/*.{js,jsx}',
        './app/**/*.{js,jsx}',
        './src/**/*.{js,jsx}',
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                serif: ['var(--font-playfair)', 'serif'],
                display: ['var(--font-cinzel)', 'serif'],
            },
            colors: {
                // 威尼斯深蓝系
                venice: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    500: '#0ea5e9', // 亮蓝 (用于选中)
                    800: '#075985',
                    900: '#0c4a6e', // 主色调：深海蓝
                    950: '#082f49', //以此为底色
                },
                // 羊皮纸/米色系
                parchment: {
                    50: '#fdfbf7', // 极浅米色（代替纯白）
                    100: '#f8f4eb',
                    200: '#efe6d5', // 纸张陈旧色
                    300: '#e5d5b5',
                    800: '#5c5446', // 深褐色文字
                },
                // 古典金
                gold: {
                    400: '#fbbf24',
                    500: '#d4af37', // 标准金
                    600: '#b4942b',
                }
            },
            // ...保留 shadcn 的其他配置
        },
    },
    plugins: [require("tailwindcss-animate")],
}