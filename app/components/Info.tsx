"use client"

interface Block {
    height: number
    hash: string
    data: string
}

interface InfoProps {
    blocks: Block[]
}

export default function Info({ blocks }: InfoProps) {
    return (
        <div className="flex h-full w-full flex-col rounded-2xl border border-white/40 bg-white/80 p-6 shadow-lg shadow-[rgba(15,23,42,0.08)] backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/70 dark:shadow-none">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
                        区块链信息面板
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        实时洞察链上数据，观察每一次新区块的广播。
                    </p>
                </div>
                <span className="inline-flex items-center rounded-full border border-indigo-200/70 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-600 dark:border-indigo-500/20 dark:text-indigo-300">
                    总区块数: {blocks.length}
                </span>
            </div>
            <div className="mt-6 overflow-hidden rounded-xl border border-slate-200/70 dark:border-slate-800/80">
                <table className="min-w-full divide-y divide-slate-200/70 text-left text-sm text-slate-700 dark:divide-slate-800 dark:text-slate-200">
                    <thead className="bg-slate-50/80 dark:bg-slate-800/60">
                        <tr>
                            <th className="px-4 py-3 font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                区块高度
                            </th>
                            <th className="px-4 py-3 font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                区块哈希
                            </th>
                            <th className="px-4 py-3 font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                数据
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/60 bg-white/80 dark:divide-slate-800/70 dark:bg-slate-950/20">
                        {blocks.map(block => (
                            <tr
                                key={block.hash}
                                className="transition hover:bg-indigo-50/60 dark:hover:bg-indigo-500/10"
                            >
                                <td className="px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    #{block.height}
                                </td>
                                <td className="px-4 py-3 font-mono text-xs text-slate-600 dark:text-slate-300">
                                    {block.hash}
                                </td>
                                <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">
                                    {block.data}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
