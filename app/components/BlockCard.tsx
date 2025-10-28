"use client"

interface Block {
    height: number
    hash: string
    data: string
}

interface BlockCardProps {
    block: Block
}

export default function BlockCard({ block }: BlockCardProps) {
    return (
        <div className="relative m-4 w-full max-w-xs">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/40 via-purple-500/30 to-sky-500/30 opacity-70 blur-xl" />
            <div className="relative flex flex-col gap-3 rounded-2xl border border-white/40 bg-white/80 p-5 shadow-xl shadow-[rgba(15,23,42,0.14)] backdrop-blur-md transition hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800/70 dark:bg-slate-900/70 dark:shadow-[rgba(8,13,23,0.6)]">
                <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        区块高度
                    </p>
                    <span className="inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-300">
                        #{block.height}
                    </span>
                </div>
                <div>
                    <p className="text-xs uppercase text-slate-500 dark:text-slate-400">
                        区块哈希
                    </p>
                    <p className="mt-1 font-mono text-sm text-slate-700 dark:text-slate-200">
                        {block.hash}
                    </p>
                </div>
                <div>
                    <p className="text-xs uppercase text-slate-500 dark:text-slate-400">
                        数据
                    </p>
                    <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                        {block.data}
                    </p>
                </div>
            </div>
        </div>
    )
}
