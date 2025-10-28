"use client"

import Info from "./Info"
import { message } from "antd"
import { useMemo, useState } from "react"

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

    const handleInputChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        if (e.target.value.length <= 140) {
            setInputValue(e.target.value)
        }
    }

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
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

    const walletLabel = useMemo(() => {
        if (!walletAddress) {
            return "尚未连接到钱包"
        }
        return `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    }, [walletAddress])

    return (
        <div className="flex h-full w-full flex-col gap-6">
            <div className="rounded-2xl border border-white/40 bg-white/80 p-6 shadow-lg shadow-[rgba(15,23,42,0.08)] backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/70 dark:shadow-none">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                钱包状态
                            </p>
                            <p className="text-lg font-semibold text-slate-900 dark:text-white">
                                {walletLabel}
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {walletAddress
                                    ? "已连接，随时准备签名交易"
                                    : "点击右侧按钮连接常用钱包"}
                            </p>
                        </div>
                        <button
                            onClick={
                                walletAddress
                                    ? onDisconnectWallet
                                    : onConnectWallet
                            }
                            className="rounded-full border border-indigo-200/70 bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 transition hover:from-indigo-400 hover:to-purple-400"
                        >
                            {walletAddress ? "断开钱包" : "连接钱包"}
                        </button>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <span className="inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500" />
                            区块链实时模拟 · 140 字以内的消息
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-white/40 bg-white/90 p-6 shadow-lg shadow-[rgba(15,23,42,0.08)] backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/70 dark:shadow-none">
                <div className="flex flex-col gap-4">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                            创建新区块
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            输入内容并广播到链上，或使用快速生成功能。
                        </p>
                    </div>
                    <textarea
                        placeholder="有什么新鲜事？按 Enter 发布 · Shift + Enter 换行"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className="min-h-[140px] w-full resize-none rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200/70 dark:border-slate-700/60 dark:bg-slate-950/40 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-500/40"
                    />
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                            {inputValue.length} / 140
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
                            <button
                                onClick={handleQuickPost}
                                className="rounded-full border border-teal-200/70 bg-teal-500/90 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-teal-500 dark:border-teal-500/40"
                            >
                                快速生成
                            </button>
                            <button
                                onClick={handlePost}
                                className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:from-indigo-400 hover:to-purple-400"
                            >
                                发帖
                            </button>
                            <button
                                onClick={onResetBlocks}
                                className="rounded-full border border-slate-200/70 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-red-300 hover:bg-red-50 hover:text-red-500 dark:border-slate-700/60 dark:text-slate-300 dark:hover:border-red-400 dark:hover:bg-red-500/10 dark:hover:text-red-300"
                            >
                                重置所有区块
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                <Info blocks={blocks} />
            </div>
        </div>
    )
}
