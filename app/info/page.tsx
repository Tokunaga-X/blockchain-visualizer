"use client"

import { useEffect, useState } from "react"

interface Block {
    height: number
    hash: string
    data: string
}

export default function Info() {
    const [blocks, setBlocks] = useState<Block[]>([
        // 示例区块数据
        { height: 1, hash: "0x123", data: "Block 1 data" },
        { height: 2, hash: "0x456", data: "Block 2 data" },
    ])

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">区块链信息</h1>
            <p>区块数量: {blocks.length}</p>
            <ul>
                {blocks.map(block => (
                    <li key={block.hash}>
                        区块高度: {block.height}, 区块哈希: {block.hash}, 数据:{" "}
                        {block.data}
                    </li>
                ))}
            </ul>
        </div>
    )
}
