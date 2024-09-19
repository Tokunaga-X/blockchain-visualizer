"use client"

import Layout from "./components/Layout"
import LeftSection from "./components/LeftSection"
import RightSection from "./components/RightSection"
import { useState } from "react"

interface Block {
    height: number
    hash: string
    data: string
}

export default function Home() {
    const [blocks, setBlocks] = useState<Block[]>([
        { height: 1, hash: "0x123", data: "创世区块" },
    ])

    const handleCreateNewBlock = () => {
        const newBlock: Block = {
            height: blocks.length + 1,
            hash: `0x${Math.random().toString(16).substr(2, 8)}`,
            data: `Block ${blocks.length + 1} data`,
        }
        setBlocks([...blocks, newBlock])
    }

    const handleResetBlocks = () => {
        setBlocks([{ height: 1, hash: "0x123", data: "创世区块" }])
    }

    return (
        <Layout showWalletButton={true}>
            <div className="flex flex-1">
                <div className="w-1/2 p-4 flex flex-col justify-center items-center border-r border-gray-300">
                    <button
                        onClick={handleResetBlocks}
                        className="mb-4 p-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        重置区块
                    </button>
                    <LeftSection onCreateNewBlock={handleCreateNewBlock} />
                </div>
                <div className="w-1/2 p-4 flex flex-col justify-center items-center overflow-y-auto max-h-screen">
                    <RightSection blocks={blocks} />
                </div>
            </div>
        </Layout>
    )
}
