"use client"

import { useCallback, useEffect, useState } from "react"

import Layout from "./components/Layout"
import LeftSection from "./components/LeftSection"
import RightSection from "./components/RightSection"
import { ethers } from "ethers"

interface Block {
    height: number
    hash: string
    data: string
}

declare global {
    interface Window {
        ethereum?: any
    }
}

// 自定义节流函数
function throttle(func: (...args: any[]) => void, limit: number) {
    let lastFunc: ReturnType<typeof setTimeout>
    let lastRan: number
    return function (...args: any[]) {
        if (!lastRan) {
            func(...args)
            lastRan = Date.now()
        } else {
            clearTimeout(lastFunc)
            lastFunc = setTimeout(function () {
                if (Date.now() - lastRan >= limit) {
                    func(...args)
                    lastRan = Date.now()
                }
            }, limit - (Date.now() - lastRan))
        }
    }
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

    const handleDrag = useCallback(
        throttle((e: React.MouseEvent) => {
            const newLeftWidth = (e.clientX / window.innerWidth) * 100
            setLeftWidth(Math.max(20, Math.min(80, newLeftWidth))) // 限制左侧宽度在20%到80%之间
        }, 100),
        []
    )

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
            <div className="flex flex-1 relative">
                <div
                    style={{ width: `${leftWidth || 50}%` }}
                    className="p-4 flex flex-col"
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
                    className="w-1 bg-gray-300 hover:bg-gray-400 cursor-col-resize absolute top-0 bottom-0"
                    style={{ left: `${leftWidth || 50}%` }}
                    onMouseDown={() => {
                        document.addEventListener(
                            "mousemove",
                            handleDrag as any
                        )
                        document.addEventListener(
                            "mouseup",
                            () => {
                                document.removeEventListener(
                                    "mousemove",
                                    handleDrag as any
                                )
                            },
                            { once: true }
                        )
                    }}
                />
                <div
                    style={{ width: `${100 - (leftWidth || 50)}%` }}
                    className="p-4 flex flex-col justify-center items-center overflow-y-auto max-h-screen"
                >
                    <div className="p-4 w-full">
                        <RightSection blocks={blocks} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}
