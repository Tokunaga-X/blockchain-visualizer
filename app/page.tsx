"use client"

import { useCallback, useState } from "react"

import Layout from "./components/Layout"
import LeftSection from "./components/LeftSection"
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
    const [leftWidth, setLeftWidth] = useState(50) // 左侧宽度百分比

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

    const handleDrag = useCallback((e: React.MouseEvent) => {
        const newLeftWidth = (e.clientX / window.innerWidth) * 100
        setLeftWidth(Math.max(20, Math.min(80, newLeftWidth))) // 限制左侧宽度在20%到80%之间
    }, [])

    return (
        <Layout showWalletButton={true}>
            <div className="flex flex-1 relative">
                <div
                    style={{ width: `${leftWidth}%` }}
                    className="p-4 flex flex-col"
                >
                    <LeftSection
                        onCreateNewBlock={handleCreateNewBlock}
                        onResetBlocks={handleResetBlocks}
                        blocks={blocks}
                    />
                </div>
                <div
                    className="w-1 bg-gray-300 hover:bg-gray-400 cursor-col-resize absolute top-0 bottom-0"
                    style={{ left: `${leftWidth}%` }}
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
                    style={{ width: `${100 - leftWidth}%` }}
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
