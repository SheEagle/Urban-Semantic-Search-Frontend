'use client';

import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription} from "@/components/ui/sheet";
import {Badge} from "@/components/ui/badge";
import {Copy, MapPin, Image as ImageIcon, ExternalLink} from "lucide-react";
import {Button} from "@/components/ui/button";

export function LocationDetailsSheet({location, open, onOpenChange}) {
    if (!location) return null;

    // Function to copy coordinates
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // You could add a toast notification here
    };

    // Construct the full map URL (ensure this matches your public folder structure)
    const fullMapUrl = "/maps/raw/sample_venice_map_3.jpg";

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                className="w-[400px] sm:w-[540px] overflow-y-auto bg-white/95 backdrop-blur-xl z-[2000] border-l border-slate-200 shadow-2xl p-0 gap-0">

                {/* Header Section */}
                <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                    <SheetHeader>
                        <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                Score: {location.score.toFixed(4)}
                            </Badge>
                            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">
                ID: {location.id.slice(0, 8)}
              </span>
                        </div>
                        <SheetTitle className="text-2xl font-serif text-slate-900 leading-tight">
                            Historical Location Match
                        </SheetTitle>
                        <SheetDescription className="text-slate-500">
                            Found in source: <span
                            className="font-medium text-slate-700">{location.fullData?.image_source || "Unknown Map"}</span>
                        </SheetDescription>
                    </SheetHeader>
                </div>

                {/* Content Body */}
                <div className="p-6 space-y-8">

                    {/* 🖼️ Visual Evidence (Image Slice) */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <ImageIcon size={14}/>
                            Visual
                        </h4>

                        <div
                            className="relative w-full aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-inner group">
                            {location.pixel_coords ? (
                                <>
                                    <div
                                        className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                                        style={{
                                            backgroundRepeat: 'no-repeat',
                                            backgroundImage: `url(${fullMapUrl})`,
                                            // Centering logic: offset by half the container size (assuming approx 400px width)
                                            // You might need to adjust logic if the slice needs to be exact
                                            // backgroundPosition: `calc(50% - ${location.pixel_coords[0]}px) calc(50% - ${location.pixel_coords[1]}px)`,
                                            backgroundPosition: `-${location.pixel_coords[0]}px -${location.pixel_coords[1]}px`,
                                            // backgroundSize needs to be set if the coordinates are based on original resolution
                                            // backgroundSize: 'originalWidthpx originalHeightpx'
                                        }}
                                    />
                                    <div
                                        className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded font-mono">
                                        PX: {location.pixel_coords.join(', ')}
                                    </div>
                                </>
                            ) : (
                                <div className="flex h-full items-center justify-center text-slate-400 italic text-sm">
                                    No visual preview available
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 📍 Geographic Data */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <MapPin size={14}/>
                            Geographic Coordinates
                        </h4>

                        <div className="grid grid-cols-2 gap-4">
                            <Button
                                variant="outline"
                                className="h-auto py-3 px-4 flex flex-col items-start gap-1 bg-slate-50 border-slate-200 hover:bg-white hover:border-blue-300 transition-all group"
                                onClick={() => copyToClipboard(location.lat)}
                            >
                                <span className="text-[10px] text-slate-400 font-bold uppercase">Latitude</span>
                                <div className="flex items-center gap-2 w-full">
                                    <span className="font-mono text-sm text-slate-700">{location.lat.toFixed(6)}</span>
                                    <Copy size={12}
                                          className="ml-auto opacity-0 group-hover:opacity-100 text-blue-500"/>
                                </div>
                            </Button>

                            <Button
                                variant="outline"
                                className="h-auto py-3 px-4 flex flex-col items-start gap-1 bg-slate-50 border-slate-200 hover:bg-white hover:border-blue-300 transition-all group"
                                onClick={() => copyToClipboard(location.lon)}
                            >
                                <span className="text-[10px] text-slate-400 font-bold uppercase">Longitude</span>
                                <div className="flex items-center gap-2 w-full">
                                    <span className="font-mono text-sm text-slate-700">{location.lon.toFixed(6)}</span>
                                    <Copy size={12}
                                          className="ml-auto opacity-0 group-hover:opacity-100 text-blue-500"/>
                                </div>
                            </Button>
                        </div>
                    </div>

                    {/* 🧬 Metadata / JSON */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                Raw Metadata
                            </h4>
                            <Button variant="ghost" size="sm"
                                    className="h-6 text-[10px] text-blue-600 hover:text-blue-800">
                                <ExternalLink size={10} className="mr-1"/> Export JSON
                            </Button>
                        </div>

                        <div className="bg-slate-900 rounded-lg p-4 overflow-hidden relative group">
              <pre className="text-[10px] text-green-400 font-mono overflow-x-auto custom-scrollbar max-h-40">
                {JSON.stringify(location.fullData?.geo_polygon, null, 2)}
              </pre>
                        </div>
                    </div>

                </div>
            </SheetContent>
        </Sheet>
    );
}