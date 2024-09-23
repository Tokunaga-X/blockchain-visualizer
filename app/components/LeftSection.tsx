"use client"

import Info from "./Info"

interface Block {
    height: number
    hash: string
    data: string
}

interface LeftSectionProps {
    onCreateNewBlock: () => void
    onResetBlocks: () => void
    blocks: Block[]
}

export default function LeftSection({
    onCreateNewBlock,
    onResetBlocks,
    blocks,
}: LeftSectionProps) {
    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-col items-center mb-4">
                <button
                    onClick={onResetBlocks}
                    className="mb-4 p-2 bg-red-500 text-white rounded hover:bg-red-600 w-full"
                >
                    重置区块
                </button>
                <button
                    onClick={onCreateNewBlock}
                    className="p-2 bg-green-500 text-white rounded hover:bg-green-600 w-full"
                >
                    创建新区块
                </button>
            </div>

            <div className="border-t border-gray-300 my-4"></div>

            <div className="flex-1 overflow-y-auto">
                <Info blocks={blocks} />
            </div>
        </div>
    )
}
