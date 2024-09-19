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
        { height: 1, hash: "0x123", data: "创世区块" },
    ])

    const [theme, setTheme] = useState<string | null>(null)

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
        localStorage.setItem("theme", newTheme)
    }

    useEffect(() => {
        // 从本地存储中获取主题设置
        const savedTheme = localStorage.getItem("theme")
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches

        const initialTheme = savedTheme || (prefersDark ? "dark" : "light")
        setTheme(initialTheme)
        document.documentElement.setAttribute("data-theme", initialTheme)
    }, [])

    if (theme === null) {
        return null // 或者返回一个加载指示器
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                <div>
                    <Link
                        href="/"
                        className="mr-4 hover:text-gray-600 dark:hover:text-gray-400"
                    >
                        Home
                    </Link>
                    <Link
                        href="/info"
                        className="hover:text-gray-600 dark:hover:text-gray-400"
                    >
                        Info
                    </Link>
                </div>
                <button
                    onClick={toggleTheme}
                    className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    {theme === "light" ? "切换到深色模式" : "切换到浅色模式"}
                </button>
            </div>
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
                <div className="w-1/2 p-4 flex flex-col justify-center items-center">
                    <RightSection blocks={blocks} />
                </div>
            </div>
        </div>
    )
}
