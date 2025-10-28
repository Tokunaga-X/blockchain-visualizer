"use client"

import { ReactNode, useEffect, useState } from "react"

import Image from "next/image"

interface LayoutProps {
    children: ReactNode
    showWalletButton?: boolean
    walletAddress: string | null
    onConnectWallet: () => void
    onDisconnectWallet: () => void
}

export default function Layout({
    children,
    showWalletButton = false,
    walletAddress,
    onConnectWallet,
    onDisconnectWallet,
}: LayoutProps) {
    const [theme, setTheme] = useState<string | null>(null)

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light"
        setTheme(newTheme)
        document.documentElement.setAttribute("data-theme", newTheme)
        localStorage.setItem("theme", newTheme)
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
            <nav className="border-b border-white/30 bg-white/70 px-4 py-4 backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/40">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-1 items-center gap-4">
                        <div className="flex items-center gap-3 rounded-full border border-white/40 bg-white/70 px-4 py-2 shadow-sm shadow-white/10 dark:border-white/5 dark:bg-slate-900/60 dark:shadow-none">
                            <Image
                                src="/twitter.png"
                                alt="Twitter"
                                width={28}
                                height={28}
                            />
                            <Image src="/x.png" alt="X" width={28} height={28} />
                            <div className="hidden h-6 w-px bg-slate-200/70 dark:bg-white/10 sm:block" />
                            <Image
                                src="/bitcoin.png"
                                alt="Bitcoin"
                                width={28}
                                height={28}
                            />
                            <Image
                                src="/ethereum.png"
                                alt="Ethereum"
                                width={28}
                                height={28}
                            />
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-slate-900 dark:text-white">
                                Blockchain Visualizer
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                通过互动体验学习区块链的运行方式
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {showWalletButton && (
                            <button
                                onClick={
                                    walletAddress
                                        ? onDisconnectWallet
                                        : onConnectWallet
                                }
                                className="rounded-full border border-indigo-200/70 bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 transition hover:from-indigo-400 hover:to-purple-400"
                            >
                                {walletAddress
                                    ? `断开钱包 (${walletAddress.slice(
                                          0,
                                          6
                                      )}...${walletAddress.slice(-4)})`
                                    : "连接钱包"}
                            </button>
                        )}
                        <button
                            onClick={toggleTheme}
                            className="flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-indigo-400 hover:text-indigo-500 dark:border-slate-700/70 dark:bg-slate-800/60 dark:text-slate-200 dark:hover:border-indigo-400"
                        >
                            <span className="inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 dark:from-indigo-300 dark:to-purple-400" />
                            {theme === "light" ? "切换到深色" : "切换到浅色"}
                        </button>
                    </div>
                </div>
            </nav>
            <main className="flex flex-1 justify-center px-6 pb-12 pt-8 sm:pb-16">
                {children}
            </main>
        </div>
    )
}
