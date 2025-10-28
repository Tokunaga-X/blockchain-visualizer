"use client"

import BlockCard from "./BlockCard"

interface Block {
    height: number
    hash: string
    data: string
}

interface RightSectionProps {
    blocks: Block[]
}

export default function RightSection({ blocks }: RightSectionProps) {
    return (
        <div className="relative flex w-full flex-col items-center">
            <div className="absolute top-0 bottom-0 hidden w-px bg-gradient-to-b from-indigo-500/20 via-indigo-500/40 to-transparent dark:from-indigo-400/20 dark:via-indigo-500/50 sm:block" />
            {blocks.map((block, index) => (
                <div
                    key={block.hash}
                    className="flex w-full flex-col items-center"
                >
                    <BlockCard block={block} />
                    {index < blocks.length - 1 && (
                        <div className="my-2 flex w-full justify-center">
                            <div className="h-14 w-[2px] rounded-full bg-gradient-to-b from-indigo-400/50 via-indigo-500/70 to-purple-500/40 dark:from-indigo-500/40 dark:via-indigo-400/60 dark:to-purple-500/40" />
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
