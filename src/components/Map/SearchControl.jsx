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

// 'use client';
//
// import {useState} from 'react';
// import {X, Loader2, Compass, Search} from 'lucide-react'; // 使用 Compass 和 Search 替代 Feather
// import {Input} from "@/components/ui/input";
//
// export function SearchControl({onSearch, isLoading}) {
//     const [query, setQuery] = useState('');
//     const [isFocused, setIsFocused] = useState(false);
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
//         // 顶部位置微调，使用新的 z-index
//         <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-lg transition-all duration-500">
//
//             {/* 容器：陶瓷白胶囊，柔和阴影 */}
//             <div className={`
//                 relative rounded-full p-1 bg-ceramic shadow-ceramic transition-all duration-300
//                 ${isFocused ? 'ring-2 ring-time-gold/30' : 'hover:shadow-lg'}
//             `}>
//
//                 <form
//                     onSubmit={handleSubmit}
//                     className="flex items-center bg-atlas-paper rounded-full"
//                 >
//                     {/* 图标区域：罗盘 */}
//                     <div className="pl-4 pr-2 text-deep-ocean/60">
//                         <Compass className={`h-5 w-5 ${isLoading ? 'animate-spin-slow' : ''}`} strokeWidth={1.5}/>
//                     </div>
//
//                     {/* 输入框：衬线字，Placeholder 用浅色 */}
//                     <Input
//                         type="text"
//                         placeholder="Search coordinates, era, or landmark..."
//                         value={query}
//                         onChange={(e) => setQuery(e.target.value)}
//                         onFocus={() => setIsFocused(true)}
//                         onBlur={() => setIsFocused(false)}
//                         className="border-0 focus-visible:ring-0 bg-transparent h-10 px-1 text-lg font-serif tracking-wide text-deep-ocean placeholder:text-faded-slate/70 placeholder:font-light placeholder:italic shadow-none"
//                         disabled={isLoading}
//                     />
//
//                     {/* 清除按钮 */}
//                     {query && !isLoading && (
//                         <button
//                             type="button"
//                             onClick={handleClear}
//                             className="p-2 text-faded-slate hover:text-time-gold transition-colors"
//                         >
//                             <X className="h-4 w-4"/>
//                         </button>
//                     )}
//
//                     {/* 提交按钮：圆形，深蓝或玫瑰金高亮 */}
//                     <button
//                         type="submit"
//                         disabled={!query.trim() || isLoading}
//                         className={`
//                             mr-2 h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300
//                             ${query.trim()
//                             ? 'bg-deep-ocean text-atlas-paper shadow-md hover:bg-time-gold'
//                             : 'bg-faded-slate/10 text-faded-slate cursor-not-allowed'}
//                         `}
//                     >
//                         {isLoading ? (
//                             <Loader2 className="h-4 w-4 animate-spin"/>
//                         ) : (
//                             <Search className="h-4 w-4"/>
//                         )}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// 'use client';
//
// import {useState, useRef} from 'react'; // 引入 useRef
// import {X, Loader2, Compass, Search, ImagePlus} from 'lucide-react'; // 引入 ImagePlus 图标
// import {Input} from "@/components/ui/input";
//
// export function SearchControl({onSearch, isLoading}) {
//     const [query, setQuery] = useState('');
//     const [isFocused, setIsFocused] = useState(false);
//
//     // 隐藏的文件输入框引用
//     const fileInputRef = useRef(null);
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (query.trim()) {
//             // 文本搜索：传字符串
//             onSearch(query, 'text');
//         }
//     };
//
//     const handleClear = () => {
//         setQuery('');
//         // 清除文件输入框的值，防止重复选择同一文件不触发 onChange
//         if (fileInputRef.current) {
//             fileInputRef.current.value = '';
//         }
//     };
//
//     // 处理文件选择
//     const handleFileChange = (e) => {
//         const file = e.target.files?.[0];
//         if (file) {
//             // 图片搜索：传 File 对象
//             onSearch(file, 'image');
//
//             // 可选：把文件名显示在输入框里，或者清空输入框
//             setQuery(`Image: ${file.name}`);
//         }
//     };
//
//     // 触发文件选择点击
//     const triggerFileUpload = () => {
//         fileInputRef.current?.click();
//     };
//
//     return (
//         <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-lg transition-all duration-500">
//             <div className={`
//                 relative rounded-full p-1 bg-ceramic shadow-ceramic transition-all duration-300
//                 ${isFocused ? 'ring-2 ring-time-gold/30' : 'hover:shadow-lg'}
//             `}>
//                 <form
//                     onSubmit={handleSubmit}
//                     className="flex items-center bg-atlas-paper rounded-full pr-1" // pr-1 给右边留点空隙
//                 >
//                     {/* 图标区域 */}
//                     <div className="pl-4 pr-2 text-deep-ocean/60">
//                         <Compass className={`h-5 w-5 ${isLoading ? 'animate-spin-slow' : ''}`} strokeWidth={1.5}/>
//                     </div>
//
//                     {/* 输入框 */}
//                     <Input
//                         type="text"
//                         placeholder="Search coordinates, era, or landmark..."
//                         value={query}
//                         onChange={(e) => setQuery(e.target.value)}
//                         onFocus={() => setIsFocused(true)}
//                         onBlur={() => setIsFocused(false)}
//                         className="border-0 focus-visible:ring-0 bg-transparent h-10 px-1 text-lg font-serif tracking-wide text-deep-ocean placeholder:text-faded-slate/70 placeholder:font-light placeholder:italic shadow-none flex-1"
//                         disabled={isLoading}
//                     />
//
//                     {/* 隐藏的文件 Input */}
//                     <input
//                         type="file"
//                         accept="image/*"
//                         ref={fileInputRef}
//                         onChange={handleFileChange}
//                         className="hidden"
//                     />
//
//                     {/* 右侧操作区容器 */}
//                     <div className="flex items-center gap-1 pr-1">
//
//                         {/* 清除按钮 */}
//                         {query && !isLoading && (
//                             <button
//                                 type="button"
//                                 onClick={handleClear}
//                                 className="p-2 text-faded-slate hover:text-time-gold transition-colors rounded-full hover:bg-slate-100"
//                             >
//                                 <X className="h-4 w-4"/>
//                             </button>
//                         )}
//
//                         {/* 图搜图按钮 (仅当没输入文字时显示，或者一直显示看你喜好) */}
//                         {!query && !isLoading && (
//                             <button
//                                 type="button"
//                                 onClick={triggerFileUpload}
//                                 className="p-2 text-deep-ocean/60 hover:text-deep-ocean hover:bg-slate-100 rounded-full transition-all"
//                                 title="Upload Image to Search"
//                             >
//                                 <ImagePlus className="h-5 w-5" strokeWidth={1.5}/>
//                             </button>
//                         )}
//
//                         {/* 提交按钮 */}
//                         <button
//                             type="submit"
//                             disabled={!query.trim() || isLoading}
//                             className={`
//                                 h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300
//                                 ${query.trim()
//                                 ? 'bg-deep-ocean text-atlas-paper shadow-md hover:bg-time-gold'
//                                 : 'bg-faded-slate/10 text-faded-slate cursor-not-allowed'}
//                             `}
//                         >
//                             {isLoading ? (
//                                 <Loader2 className="h-4 w-4 animate-spin"/>
//                             ) : (
//                                 <Search className="h-4 w-4"/>
//                             )}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

'use client';

import {useState, useRef} from 'react';
import {X, Loader2, Compass, Search, ImagePlus, SlidersHorizontal, UploadCloud} from 'lucide-react';
import {Input} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";

export function SearchControl({onSearch, isLoading}) {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    // 过滤器状态
    const [filters, setFilters] = useState({
        year_start: '',
        year_end: '',
        map_source: ''
    });

    const fileInputRef = useRef(null);

    // 提交文本搜索
    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query, 'text', filters);
        }
    };

    // 清除输入
    const handleClear = () => {
        setQuery('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    // 处理图片选择
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            onSearch(file, 'image', filters); // 触发图片搜索
            setQuery(`📄 Image: ${file.name}`);
        }
    };

    const triggerFileUpload = () => {
        fileInputRef.current?.click();
    };

    // 检查过滤器是否激活（用于高亮按钮）
    const isFilterActive = filters.year_start || filters.year_end || filters.map_source;

    return (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-lg transition-all duration-500">
            <div className={`
                relative rounded-full p-1 bg-ceramic shadow-ceramic transition-all duration-300
                ${isFocused ? 'ring-2 ring-time-gold/30' : 'hover:shadow-lg'}
            `}>
                <form onSubmit={handleSubmit} className="flex items-center bg-atlas-paper rounded-full pr-1">

                    {/* 左侧图标 */}
                    <div className="pl-4 pr-2 text-deep-ocean/60">
                        <Compass className={`h-5 w-5 ${isLoading ? 'animate-spin-slow' : ''}`} strokeWidth={1.5}/>
                    </div>

                    {/* 文本输入框 */}
                    <Input
                        type="text"
                        placeholder="Search places, coordinates..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="border-0 focus-visible:ring-0 bg-transparent h-10 px-1 text-base font-serif tracking-wide text-deep-ocean placeholder:text-faded-slate/70 shadow-none flex-1"
                        disabled={isLoading}
                    />

                    {/* 隐藏的文件输入 */}
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    {/* 右侧操作区 */}
                    <div className="flex items-center gap-1 pr-1">

                        {/* 清除按钮 */}
                        {query && !isLoading && (
                            <button type="button" onClick={handleClear}
                                    className="p-2 text-faded-slate hover:text-red-500 transition-colors">
                                <X className="h-4 w-4"/>
                            </button>
                        )}

                        {/* 图片上传按钮 (仅当无文本时显示) */}
                        {!query && !isLoading && (
                            <button
                                type="button"
                                onClick={triggerFileUpload}
                                className="p-2 text-deep-ocean/60 hover:text-deep-ocean hover:bg-slate-100 rounded-full transition-all"
                                title="Search by Image"
                            >
                                <ImagePlus className="h-5 w-5" strokeWidth={1.5}/>
                            </button>
                        )}

                        {/* 分隔线 */}
                        <div className="h-4 w-px bg-slate-200 mx-1"></div>

                        {/* ⚙️ 高级过滤器 Popover */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <button
                                    type="button"
                                    className={`p-2 rounded-full transition-all duration-200 ${
                                        isFilterActive
                                            ? 'text-time-gold bg-deep-ocean/5 shadow-inner'
                                            : 'text-faded-slate hover:text-deep-ocean'
                                    }`}
                                    title="Advanced Filters"
                                >
                                    <SlidersHorizontal className="h-4 w-4"/>
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 bg-ceramic border-border p-5 shadow-2xl z-[1001]"
                                            align="end">
                                <div className="space-y-4">
                                    <h4 className="font-serif font-bold text-deep-ocean text-sm border-b border-border pb-2 flex justify-between items-center">
                                        <span>Search Filters</span>
                                        {isFilterActive && (
                                            <span
                                                className="text-[9px] bg-time-gold/10 text-time-gold px-1.5 py-0.5 rounded">Active</span>
                                        )}
                                    </h4>

                                    {/*/!* 1. 地图来源 *!/*/}
                                    {/*<div className="space-y-2">*/}
                                    {/*    <Label className="text-xs text-faded-slate uppercase font-bold tracking-wider">Source*/}
                                    {/*        Map</Label>*/}
                                    {/*    <Select*/}
                                    {/*        value={filters.map_source}*/}
                                    {/*        onValueChange={(val) => setFilters({*/}
                                    {/*            ...filters,*/}
                                    {/*            map_source: val === 'all' ? '' : val*/}
                                    {/*        })}*/}
                                    {/*    >*/}
                                    {/*        <SelectTrigger*/}
                                    {/*            className="h-9 text-xs bg-white/50 border-border focus:ring-time-gold/30">*/}
                                    {/*            <SelectValue placeholder="All Chronicles"/>*/}
                                    {/*        </SelectTrigger>*/}
                                    {/*        <SelectContent>*/}
                                    {/*            <SelectItem value="all">All Chronicles</SelectItem>*/}
                                    {/*            <SelectItem value="map1">Venice 1846 (Austrian)</SelectItem>*/}
                                    {/*            <SelectItem value="map2">Venice 1900 (Modern)</SelectItem>*/}
                                    {/*        </SelectContent>*/}
                                    {/*    </Select>*/}
                                    {/*</div>*/}

                                    <div className="space-y-2">
                                        <Label className="text-xs text-faded-slate uppercase font-bold tracking-wider">Source
                                            Map</Label>
                                        <Select
                                            value={filters.map_source}
                                            onValueChange={(val) => setFilters({
                                                ...filters,
                                                map_source: val === 'all' ? '' : val
                                            })}
                                        >
                                            <SelectTrigger
                                                className="h-9 text-xs bg-white/50 border-border focus:ring-time-gold/30">
                                                <SelectValue placeholder="All Chronicles"/>
                                            </SelectTrigger>

                                            {/* 👇👇👇 关键修改：添加 z-[2002] 👇👇👇 */}
                                            {/* Popover 的 z-index 是 1001，所以这里的 z-index 必须比它高 */}
                                            <SelectContent className="z-[2002]">
                                                <SelectItem value="all">All Chronicles</SelectItem>
                                                <SelectItem value="map1">Venice 1846 (Austrian)</SelectItem>
                                                <SelectItem value="map2">Venice 1900 (Modern)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* 2. 年份范围 */}
                                    <div className="space-y-2">
                                        <Label className="text-xs text-faded-slate uppercase font-bold tracking-wider">Temporal
                                            Range</Label>
                                        <div className="flex items-center gap-2">
                                            <div className="relative flex-1">
                                                <Input
                                                    type="number"
                                                    placeholder="1700"
                                                    className="h-9 text-xs bg-white/50 pr-8 font-mono"
                                                    value={filters.year_start}
                                                    onChange={e => setFilters({
                                                        ...filters,
                                                        year_start: e.target.value ? parseInt(e.target.value) : ''
                                                    })}
                                                />
                                                <span
                                                    className="absolute right-2 top-2.5 text-[10px] text-slate-400">AD</span>
                                            </div>
                                            <span className="text-faded-slate">-</span>
                                            <div className="relative flex-1">
                                                <Input
                                                    type="number"
                                                    placeholder="1950"
                                                    className="h-9 text-xs bg-white/50 pr-8 font-mono"
                                                    value={filters.year_end}
                                                    onChange={e => setFilters({
                                                        ...filters,
                                                        year_end: e.target.value ? parseInt(e.target.value) : ''
                                                    })}
                                                />
                                                <span
                                                    className="absolute right-2 top-2.5 text-[10px] text-slate-400">AD</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 底部操作 */}
                                    <div className="pt-2 flex justify-between items-center">
                                        <button
                                            type="button"
                                            onClick={() => setFilters({year_start: '', year_end: '', map_source: ''})}
                                            className="text-xs text-faded-slate hover:text-red-500 hover:underline transition-colors"
                                        >
                                            Reset
                                        </button>
                                        <Button size="sm"
                                                className="h-7 text-xs bg-deep-ocean hover:bg-deep-ocean/90 text-white">
                                            Apply Filters
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>

                        {/* 搜索按钮 */}
                        <button
                            type="submit"
                            disabled={!query.trim() || isLoading}
                            className={`
                                ml-1 h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300
                                ${query.trim()
                                ? 'bg-deep-ocean text-atlas-paper shadow-md hover:bg-time-gold hover:shadow-lg'
                                : 'bg-faded-slate/10 text-faded-slate cursor-not-allowed'}
                            `}
                        >
                            {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin"/>
                            ) : (
                                <Search className="h-4 w-4"/>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}