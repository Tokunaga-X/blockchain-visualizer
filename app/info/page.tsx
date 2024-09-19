"use client"

import { useEffect, useState } from "react"

import Layout from "../components/Layout"

interface Block {
    height: number
    hash: string
    data: string
}

export default function Info() {
    const [blocks, setBlocks] = useState<Block[]>([])

    useEffect(() => {
        // 这里可以添加从本地存储或API获取区块数据的逻辑
        setBlocks([
            { height: 1, hash: "0x123", data: "Block 1 data" },
            { height: 2, hash: "0x456", data: "Block 2 data" },
        ])
    }, [])

    return (
        <Layout>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">区块链信息</h1>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="border border-gray-300 p-2">
                                区块高度
                            </th>
                            <th className="border border-gray-300 p-2">
                                区块哈希
                            </th>
                            <th className="border border-gray-300 p-2">数据</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blocks.map(block => (
                            <tr
                                key={block.hash}
                                className="hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <td className="border border-gray-300 p-2">
                                    {block.height}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {block.hash}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {block.data}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className="mt-4">总区块数: {blocks.length}</p>
            </div>
        </Layout>
    )
}
