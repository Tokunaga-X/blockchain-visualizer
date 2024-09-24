"use client"

import Info from "./Info"
import { message } from "antd"
import { useState } from "react"

interface Block {
    height: number
    hash: string
    data: string
}

interface LeftSectionProps {
    onCreateNewBlock: (data: string) => void
    onResetBlocks: () => void
    blocks: Block[]
    walletAddress: string | null
    onConnectWallet: () => void
    onDisconnectWallet: () => void
}

export default function LeftSection({
    onCreateNewBlock,
    onResetBlocks,
    blocks,
    walletAddress,
    onConnectWallet,
    onDisconnectWallet,
}: LeftSectionProps) {
    const [inputValue, setInputValue] = useState("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= 140) {
            setInputValue(e.target.value)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handlePost()
        }
    }

    const handlePost = () => {
        if (!walletAddress) {
            message.error("请连接钱包")
        } else if (inputValue.trim() === "") {
            message.error("没有内容")
        } else {
            onCreateNewBlock(inputValue)
            setInputValue("")
        }
    }

    const handleQuickPost = () => {
        if (!walletAddress) {
            message.error("请连接钱包")
        } else {
            const randomString = Math.random().toString(36).substring(7)
            onCreateNewBlock(randomString)
        }
    }

    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-col items-center mb-4">
                <button
                    onClick={
                        walletAddress ? onDisconnectWallet : onConnectWallet
                    }
                    className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
                >
                    {walletAddress
                        ? `断开钱包 (${walletAddress.slice(
                              0,
                              6
                          )}...${walletAddress.slice(-4)})`
                        : "连接钱包"}
                </button>
                <div className="flex w-full mb-4">
                    <input
                        type="text"
                        placeholder="有什么新鲜事？"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        className="p-2 border border-gray-300 rounded w-full h-20 text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    <button
                        onClick={handlePost}
                        className="ml-2 p-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        发帖
                    </button>
                </div>
                <div className="flex w-full">
                    <button
                        onClick={handleQuickPost}
                        className="p-2 bg-green-500 text-white rounded hover:bg-green-600 w-1/2 mr-2"
                    >
                        快速发推
                    </button>
                    <button
                        onClick={onResetBlocks}
                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600 w-1/2 ml-2"
                    >
                        重置所有区块
                    </button>
                </div>
            </div>

            <div className="border-t border-gray-300 my-4"></div>

            <div className="flex-1 overflow-y-auto">
                <Info blocks={blocks} />
            </div>
        </div>
    )
}
