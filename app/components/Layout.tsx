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
            <nav className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                <div className="flex items-center">
                    <Image
                        src="/twitter.png"
                        alt="Twitter"
                        width={36}
                        height={36}
                        className="mr-4"
                    />
                    <Image
                        src="/x.png"
                        alt="X"
                        width={36}
                        height={36}
                        className="mr-0"
                    />
                    <span className="mx-4">|</span>
                    <Image
                        src="/bitcoin.png"
                        alt="Bitcoin"
                        width={36}
                        height={36}
                        className="mr-4"
                    />
                    <Image
                        src="/ethereum.png"
                        alt="Ethereum"
                        width={36}
                        height={36}
                    />
                </div>
                <div className="flex items-center">
                    {showWalletButton && (
                        <button
                            onClick={
                                walletAddress
                                    ? onDisconnectWallet
                                    : onConnectWallet
                            }
                            className="mr-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
