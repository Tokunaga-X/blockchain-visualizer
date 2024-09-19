"use client"

import { ReactNode, useEffect, useState } from "react"

import Link from "next/link"

interface LayoutProps {
    children: ReactNode
    showWalletButton?: boolean
}

export default function Layout({
    children,
    showWalletButton = false,
}: LayoutProps) {
    const [theme, setTheme] = useState<string | null>(null)
    const [walletConnected, setWalletConnected] = useState(false)

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light"
        setTheme(newTheme)
        document.documentElement.setAttribute("data-theme", newTheme)
        localStorage.setItem("theme", newTheme)
    }

    const connectWallet = () => {
        // 连接钱包的逻辑
        setWalletConnected(true)
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme")
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches

        const initialTheme = savedTheme || (prefersDark ? "dark" : "light")
        setTheme(initialTheme)
        document.documentElement.setAttribute("data-theme", initialTheme)
    }, [])

    if (theme === null) {
        return null
    }

    return (
        <div className="flex flex-col min-h-screen">
            <nav className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
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
                <div className="flex items-center">
                    {showWalletButton && (
                        <button
                            onClick={connectWallet}
                            className="mr-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            {walletConnected ? "钱包已连接" : "连接钱包"}
                        </button>
                    )}
                    <button
                        onClick={toggleTheme}
                        className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        {theme === "light"
                            ? "切换到深色模式"
                            : "切换到浅色模式"}
                    </button>
                </div>
            </nav>
            <main className="flex-grow flex">{children}</main>
        </div>
    )
}
