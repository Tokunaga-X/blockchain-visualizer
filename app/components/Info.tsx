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
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">区块链信息</h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                        <th className="border border-gray-300 p-2 text-gray-700 dark:text-gray-200">
                            区块高度
                        </th>
                        <th className="border border-gray-300 p-2 text-gray-700 dark:text-gray-200">
                            区块哈希
                        </th>
                        <th className="border border-gray-300 p-2 text-gray-700 dark:text-gray-200">
                            数据
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {blocks.map(block => (
                        <tr
                            key={block.hash}
                            className="hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            <td className="border border-gray-300 p-2">
                                {block.height}
                            </td>
                            <td className="border border-gray-300 p-2">
                                {block.hash}
                            </td>
                            <td className="border border-gray-300 p-2">
                                {block.data}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="mt-4">总区块数: {blocks.length}</p>
        </div>
    )
}
