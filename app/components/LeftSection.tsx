"use client"

interface LeftSectionProps {
    onCreateNewBlock: () => void
}

export default function LeftSection({ onCreateNewBlock }: LeftSectionProps) {
    return (
        <div className="flex flex-col items-center">
            <button
                onClick={onCreateNewBlock}
                className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                创建新区块
            </button>
        </div>
    )
}
