"use client"

import { useEffect, useMemo, useState } from "react"

import Layout from "./components/Layout"
import LeftSection from "./components/LeftSection"
import RightSection from "./components/RightSection"
import { ethers, type Eip1193Provider } from "ethers"

interface Block {
    height: number
    hash: string
    data: string
}

declare global {
    interface Window {
        ethereum?: Eip1193Provider
    }
}

// 自定义节流函数
function throttle<T extends (...args: unknown[]) => void>(
    func: T,
    limit: number
) {
    let lastFunc: ReturnType<typeof setTimeout>
    let lastRan = 0
    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
        if (!lastRan) {
            func.apply(this, args)
            lastRan = Date.now()
        } else {
            clearTimeout(lastFunc)
            lastFunc = setTimeout(() => {
                if (Date.now() - lastRan >= limit) {
                    func.apply(this, args)
                    lastRan = Date.now()
                }
            }, limit - (Date.now() - lastRan))
        }
    } as T
}

export default function Home() {
    const [blocks, setBlocks] = useState<Block[]>([])
    const [leftWidth, setLeftWidth] = useState<number | undefined>(undefined) // 左侧宽度百分比
    const [walletAddress, setWalletAddress] = useState<string | null>(null)
    const [provider, setProvider] = useState<ethers.BrowserProvider | null>(
        null
    )

    // 从 localStorage 加载区块数据和 leftWidth
    useEffect(() => {
        const storedBlocks = localStorage.getItem("blocks")
        const storedLeftWidth = localStorage.getItem("leftWidth")
        if (storedBlocks) {
            setBlocks(JSON.parse(storedBlocks))
        } else {
            // 如果 localStorage 中没有数据，初始化为创世区块
            setBlocks([{ height: 1, hash: "0x123", data: "创世区块" }])
        }
        if (storedLeftWidth) {
            setLeftWidth(Number(storedLeftWidth))
        }
    }, [])

    // 当 blocks 或 leftWidth 变化时，将其保存到 localStorage
    useEffect(() => {
        if (blocks.length > 0) {
            localStorage.setItem("blocks", JSON.stringify(blocks))
        }
    }, [blocks])

    useEffect(() => {
        if (leftWidth) {
            localStorage.setItem("leftWidth", leftWidth.toString())
        }
    }, [leftWidth])

    useEffect(() => {
        if (typeof window !== "undefined" && window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum)
            setProvider(provider)
        }
    }, [])

    const handleCreateNewBlock = (data: string) => {
        const newBlock: Block = {
            height: blocks.length + 1,
            hash: `0x${Math.random().toString(16).substr(2, 8)}`,
            data: data,
        }
        setBlocks([...blocks, newBlock])
    }

    const handleResetBlocks = () => {
        setBlocks([{ height: 1, hash: "0x123", data: "创世区块" }])
    }

    const handleMouseMove = useMemo(
        () =>
            throttle((event: MouseEvent) => {
                const newLeftWidth = (event.clientX / window.innerWidth) * 100
                setLeftWidth(Math.max(20, Math.min(80, newLeftWidth))) // 限制左侧宽度在20%到80%之间
            }, 100),
        []
    )

    const handleDragStart = () => {
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener(
            "mouseup",
            () => {
                document.removeEventListener("mousemove", handleMouseMove)
            },
            { once: true }
        )
    }

    const connectWallet = async () => {
        if (provider) {
            try {
                // 请求用户授权连接钱包
                const signer = await provider.getSigner()
                const address = await signer.getAddress()
                setWalletAddress(address)
            } catch (error) {
                console.error("Failed to connect wallet:", error)
            }
        } else {
            console.error("MetaMask is not installed")
        }
    }

    const disconnectWallet = () => {
        setWalletAddress(null)
    }

    return (
        <Layout
            showWalletButton={false}
            walletAddress={walletAddress}
            onConnectWallet={connectWallet}
            onDisconnectWallet={disconnectWallet}
        >
            <div className="relative flex w-full max-w-6xl flex-1 overflow-hidden rounded-3xl border border-white/50 bg-white/75 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.55)] backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/60">
                <div
                    style={{ width: `${leftWidth || 50}%` }}
                    className="flex flex-col gap-6 p-6"
                >
                    <LeftSection
                        onCreateNewBlock={handleCreateNewBlock}
                        onResetBlocks={handleResetBlocks}
                        blocks={blocks}
                        walletAddress={walletAddress}
                        onConnectWallet={connectWallet}
                        onDisconnectWallet={disconnectWallet}
                    />
                </div>
                <div
                    className="absolute top-6 bottom-6 z-10 w-1 cursor-col-resize rounded-full bg-slate-200/80 transition hover:bg-indigo-400 dark:bg-slate-700/60 dark:hover:bg-indigo-400"
                    style={{ left: `${leftWidth || 50}%` }}
                    onMouseDown={handleDragStart}
                />
                <div
                    style={{ width: `${100 - (leftWidth || 50)}%` }}
                    className="flex max-h-screen flex-col items-center justify-center overflow-y-auto p-6"
                >
                    <div className="w-full space-y-4">
                        <RightSection blocks={blocks} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}
