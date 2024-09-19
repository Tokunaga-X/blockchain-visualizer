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
        <div className="flex flex-col items-center">
            {blocks.map((block, index) => (
                <div key={block.hash} className="flex flex-col items-center">
                    <BlockCard block={block} />
                    {index < blocks.length - 1 && (
                        <div className="my-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
