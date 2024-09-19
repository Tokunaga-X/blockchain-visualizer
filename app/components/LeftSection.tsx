"use client"

import { useState } from "react"

interface LeftSectionProps {
    onCreateNewBlock: () => void
}

export default function LeftSection({ onCreateNewBlock }: LeftSectionProps) {
    const [walletConnected, setWalletConnected] = useState(false)

    const connectWallet = () => {
        // 连接钱包的逻辑
        setWalletConnected(true)
    }

    const createNewBlock = () => {
        // 创建新区块的逻辑
        onCreateNewBlock()
    }

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={connectWallet}
                className="mb-4 p-2 bg-blue-500 text-white rounded"
            >
                {walletConnected ? "钱包已连接" : "连接钱包"}
            </button>
            <button
                onClick={createNewBlock}
                className="p-2 bg-green-500 text-white rounded"
            >
                创建新区块
            </button>
        </div>
    )
}
