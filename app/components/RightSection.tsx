"use client"

import BlockCard from "./BlockCard"

interface Block {
    height: number
    hash: string
    data: string
}

interface RightSectionProps {
    blocks: Block[]
    onScrollToTop?: () => void
}

export default function RightSection({
    blocks,
    onScrollToTop,
}: RightSectionProps) {
    return (
        <div className="relative flex w-full flex-col items-center sm:items-stretch">
            <div className="absolute inset-y-0 hidden w-[2px] -translate-x-1/2 bg-gradient-to-b from-indigo-400/40 via-indigo-500/70 to-purple-500/40 dark:from-indigo-500/30 dark:via-indigo-400/60 dark:to-purple-500/40 sm:left-1/2 sm:block" />
            <div className="flex w-full flex-col gap-8 px-2 sm:gap-12 sm:px-6">
                {blocks.map((block, index) => {
                    const placeLeft = index % 2 === 0
                    const connectorGradient = placeLeft
                        ? "bg-gradient-to-r from-indigo-400/40 via-indigo-500/70 to-purple-500/40 dark:from-indigo-500/40 dark:via-indigo-400/60 dark:to-purple-500/40"
                        : "bg-gradient-to-l from-indigo-400/40 via-indigo-500/70 to-purple-500/40 dark:from-indigo-500/40 dark:via-indigo-400/60 dark:to-purple-500/40"
                    return (
                        <div
                            key={block.hash}
                            className="relative flex w-full justify-center sm:py-2"
                        >
                            <div className="flex w-full items-center justify-center">
                                <div
                                    className={`relative flex w-full justify-center sm:w-1/2 ${placeLeft ? "sm:justify-end" : "sm:justify-start"}`}
                                >
                                    <div className="relative">
                                        <BlockCard block={block} />
                                        <span
                                            className={`absolute top-1/2 hidden h-px w-16 -translate-y-1/2 rounded-full sm:block ${connectorGradient} ${
                                                placeLeft
                                                    ? "right-0 translate-x-full"
                                                    : "left-0 -translate-x-full"
                                            }`}
                                        />
                                    </div>
                                </div>
                            </div>
                            <span className="absolute left-1/2 top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-200 bg-white shadow shadow-indigo-500/40 dark:border-indigo-500/50 dark:bg-slate-950 sm:block" />
                        </div>
                    )
                })}
            </div>
            {onScrollToTop && (
                <button
                    onClick={onScrollToTop}
                    className="sticky bottom-4 ml-auto mt-6 flex items-center gap-2 self-end rounded-full border border-indigo-200/70 bg-white/80 px-4 py-2 text-sm font-medium text-indigo-600 shadow-lg shadow-indigo-500/20 transition hover:border-indigo-400 hover:text-indigo-700 hover:shadow-indigo-500/40 dark:border-indigo-500/30 dark:bg-slate-900/70 dark:text-indigo-300 dark:hover:border-indigo-400"
                >
                    回到顶部
                </button>
            )}
        </div>
    )
}
