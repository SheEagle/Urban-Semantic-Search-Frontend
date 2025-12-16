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

    // Filter state
    const [filters, setFilters] = useState({
        year_start: '',
        year_end: '',
        map_source: ''
    });

    const fileInputRef = useRef(null);

    // Handle text search submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query, 'text', filters);
        }
    };

    // Clear input
    const handleClear = () => {
        setQuery('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    // Handle image selection
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            onSearch(file, 'image', filters); // Trigger image search
            setQuery(`📄 Image: ${file.name}`);
        }
    };

    const triggerFileUpload = () => {
        fileInputRef.current?.click();
    };

    // Check if any filters are active (for styling highlights)
    const isFilterActive = filters.year_start || filters.year_end || filters.map_source;

    return (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-lg transition-all duration-500">
            <div className={`
                relative rounded-full p-1 bg-ceramic shadow-ceramic transition-all duration-300
                ${isFocused ? 'ring-2 ring-time-gold/30' : 'hover:shadow-lg'}
            `}>
                <form onSubmit={handleSubmit} className="flex items-center bg-atlas-paper rounded-full pr-1">

                    {/* Left Icon */}
                    <div className="pl-4 pr-2 text-deep-ocean/60">
                        <Compass className={`h-5 w-5 ${isLoading ? 'animate-spin-slow' : ''}`} strokeWidth={1.5}/>
                    </div>

                    {/* Text Input */}
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

                    {/* Hidden File Input */}
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    {/* Right Action Area */}
                    <div className="flex items-center gap-1 pr-1">

                        {/* Clear Button */}
                        {query && !isLoading && (
                            <button type="button" onClick={handleClear}
                                    className="p-2 text-faded-slate hover:text-red-500 transition-colors">
                                <X className="h-4 w-4"/>
                            </button>
                        )}

                        {/* Image Upload Button (only visible when text is empty) */}
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

                        {/* Divider */}
                        <div className="h-4 w-px bg-slate-200 mx-1"></div>

                        {/* Advanced Filters Popover */}
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

                                    {/* 1. Map Source */}
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

                                            {/* Note: High z-index is required here to layer above the PopoverContent */}
                                            <SelectContent className="z-[2002]">
                                                <SelectItem value="all">All Chronicles</SelectItem>
                                                <SelectItem value="map1">Venice 1846 (Austrian)</SelectItem>
                                                <SelectItem value="map2">Venice 1900 (Modern)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* 2. Temporal Range */}
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

                                    {/* Footer Actions */}
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

                        {/* Search Button */}
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