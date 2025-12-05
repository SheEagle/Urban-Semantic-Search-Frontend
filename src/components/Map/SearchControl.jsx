// 'use client';
//
// import {useState} from 'react';
// import {X, Loader2, Feather} from 'lucide-react'; // 使用 Feather 图标
// import {Input} from "@/components/ui/input";
//
// export function SearchControl({onSearch, isLoading}) {
//     const [query, setQuery] = useState('');
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (query.trim()) {
//             onSearch(query);
//         }
//     };
//
//     const handleClear = () => {
//         setQuery('');
//     };
//
//     return (
//         <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-lg">
//
//             {/* 容器：羊皮纸纹理 + 双线边框 (模拟精装书脊) */}
//             <div className="relative bg-parchment shadow-parchment rounded-lg border-double border-4 border-ink/10 p-1">
//
//                 <form
//                     onSubmit={handleSubmit}
//                     className="flex items-center bg-white/40 backdrop-blur-sm border border-ink/5 rounded-sm"
//                 >
//                     {/* 图标区域 */}
//                     <div className="pl-3 pr-2 text-ink/60">
//                         <Feather className="h-5 w-5 rotate-[-45deg]"/>
//                     </div>
//
//                     {/* 输入框：斜体衬线字 */}
//                     <Input
//                         type="text"
//                         placeholder="Search the chronicles..."
//                         value={query}
//                         onChange={(e) => setQuery(e.target.value)}
//                         className="border-0 focus-visible:ring-0 bg-transparent h-12 px-1 text-lg font-serif italic text-ink-blend placeholder:text-ink/30 shadow-none"
//                         disabled={isLoading}
//                     />
//
//                     {/* 清除按钮 */}
//                     {query && !isLoading && (
//                         <button
//                             type="button"
//                             onClick={handleClear}
//                             className="p-2 text-ink-faded hover:text-wax-red transition-colors"
//                         >
//                             <X className="h-4 w-4"/>
//                         </button>
//                     )}
//
//                     {/* 提交按钮：火漆印章风格 */}
//                     <button
//                         type="submit"
//                         disabled={!query.trim() || isLoading}
//                         className="mr-1 h-9 px-4 bg-wax-red text-white font-serif tracking-widest text-xs uppercase rounded-sm shadow-sm hover:bg-red-900 transition-colors flex items-center justify-center border border-red-950/20"
//                     >
//                         {isLoading ? (
//                             <Loader2 className="h-4 w-4 animate-spin"/>
//                         ) : (
//                             "Seek"
//                         )}
//                     </button>
//                 </form>
//             </div>
//
//             {/* 装饰：两边的金色铆钉效果 */}
//             <div
//                 className="absolute top-1/2 -left-1 w-2 h-2 bg-royal-gold rounded-full shadow-sm border border-ink/30 -translate-y-1/2"></div>
//             <div
//                 className="absolute top-1/2 -right-1 w-2 h-2 bg-royal-gold rounded-full shadow-sm border border-ink/30 -translate-y-1/2"></div>
//         </div>
//     );
// }

'use client';

import {useState} from 'react';
import {X, Loader2, Compass, Search} from 'lucide-react'; // 使用 Compass 和 Search 替代 Feather
import {Input} from "@/components/ui/input";

export function SearchControl({onSearch, isLoading}) {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    const handleClear = () => {
        setQuery('');
    };

    return (
        // 顶部位置微调，使用新的 z-index
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-lg transition-all duration-500">

            {/* 容器：陶瓷白胶囊，柔和阴影 */}
            <div className={`
                relative rounded-full p-1 bg-ceramic shadow-ceramic transition-all duration-300
                ${isFocused ? 'ring-2 ring-time-gold/30' : 'hover:shadow-lg'}
            `}>

                <form
                    onSubmit={handleSubmit}
                    className="flex items-center bg-atlas-paper rounded-full"
                >
                    {/* 图标区域：罗盘 */}
                    <div className="pl-4 pr-2 text-deep-ocean/60">
                        <Compass className={`h-5 w-5 ${isLoading ? 'animate-spin-slow' : ''}`} strokeWidth={1.5}/>
                    </div>

                    {/* 输入框：衬线字，Placeholder 用浅色 */}
                    <Input
                        type="text"
                        placeholder="Search coordinates, era, or landmark..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="border-0 focus-visible:ring-0 bg-transparent h-10 px-1 text-lg font-serif tracking-wide text-deep-ocean placeholder:text-faded-slate/70 placeholder:font-light placeholder:italic shadow-none"
                        disabled={isLoading}
                    />

                    {/* 清除按钮 */}
                    {query && !isLoading && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="p-2 text-faded-slate hover:text-time-gold transition-colors"
                        >
                            <X className="h-4 w-4"/>
                        </button>
                    )}

                    {/* 提交按钮：圆形，深蓝或玫瑰金高亮 */}
                    <button
                        type="submit"
                        disabled={!query.trim() || isLoading}
                        className={`
                            mr-2 h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300
                            ${query.trim()
                            ? 'bg-deep-ocean text-atlas-paper shadow-md hover:bg-time-gold'
                            : 'bg-faded-slate/10 text-faded-slate cursor-not-allowed'}
                        `}
                    >
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin"/>
                        ) : (
                            <Search className="h-4 w-4"/>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}