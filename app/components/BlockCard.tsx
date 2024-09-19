"use client"

interface Block {
    height: number
    hash: string
    data: string
}

interface BlockCardProps {
    block: Block
}

export default function BlockCard({ block }: BlockCardProps) {
    return (
        <div className="p-4 m-2 border-2 border-gray-400 dark:border-gray-600 rounded shadow">
            <h2 className="text-xl font-bold">区块高度: {block.height}</h2>
            <p>区块哈希: {block.hash}</p>
            <p>数据: {block.data}</p>
        </div>
    )
}
