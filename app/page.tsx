"use client"

import { useEffect, useState } from "react"

import LeftSection from "./components/LeftSection"
import Link from "next/link"
import RightSection from "./components/RightSection"

interface Block {
    height: number
    hash: string
    data: string
}

export default function Home() {
    const [blocks, setBlocks] = useState<Block[]>([
        // 示例区块数据
        { height: 1, hash: "0x123", data: "Block 1 data" },
        { height: 2, hash: "0x456", data: "Block 2 data" },
    ])

    const [theme, setTheme] = useState("light")

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

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light"
        setTheme(newTheme)
        document.documentElement.setAttribute("data-theme", newTheme)
    }

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme)
    }, [theme])

    return (
        <div className="flex flex-col h-screen">
            <div className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800">
                <div>
                    <Link href="/" className="mr-4">
                        Home
                    </Link>
                    <Link href="/info">Info</Link>
                </div>
                <button
                    onClick={toggleTheme}
                    className="p-2 bg-gray-500 text-white rounded"
                >
                    切换主题
                </button>
            </div>
            <div className="flex flex-1">
                <div className="w-1/2 p-4 flex flex-col justify-center items-center border-r border-gray-300">
                    <button
                        onClick={handleResetBlocks}
                        className="mb-4 p-2 bg-red-500 text-white rounded"
                    >
                        重置区块
                    </button>
                    <LeftSection onCreateNewBlock={handleCreateNewBlock} />
                </div>
                <div className="w-1/2 p-4 flex flex-col justify-center items-center">
                    <RightSection blocks={blocks} />
                </div>
            </div>
        </div>
    )
}
