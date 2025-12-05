'use client';

import {useState} from 'react';
import {Search, X, Loader2} from 'lucide-react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";

export function SearchControl({onSearch, isLoading}) {
    const [query, setQuery] = useState('');

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
        // 使用 Card 作为悬浮容器，自带圆角和阴影
        <Card
            className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-md p-2 shadow-xl border-slate-200/60 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">

                {/* 左侧搜索图标 */}
                <div className="pl-2 text-muted-foreground">
                    <Search className="h-4 w-4"/>
                </div>

                {/* shadcn Input 组件 */}
                <Input
                    type="text"
                    placeholder="Search historical places..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent h-10 px-2 text-base shadow-none"
                    disabled={isLoading}
                />

                {/* 清除按钮 (仅当有内容时显示) */}
                {query && !isLoading && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={handleClear}
                    >
                        <X className="h-4 w-4"/>
                    </Button>
                )}

                {/* 提交按钮 / Loading 状态 */}
                <Button
                    type="submit"
                    size="sm"
                    disabled={!query.trim() || isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all"
                >
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin"/>
                    ) : (
                        "Go"
                    )}
                </Button>

            </form>
        </Card>
    );
}