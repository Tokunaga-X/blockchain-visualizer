"use client"

import { useEffect, useState } from "react"

import BlockCard from "./BlockCard"
import Image from "next/image"

interface Block {
    height: number
    hash: string
    data: string
}

interface RightSectionProps {
    blocks: Block[]
}

export default function RightSection({ blocks }: RightSectionProps) {
    const [theme, setTheme] = useState<string>("light")

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme")
        setTheme(savedTheme || "light")

        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (
                    mutation.type === "attributes" &&
                    mutation.attributeName === "data-theme"
                ) {
                    setTheme(
                        document.documentElement.getAttribute("data-theme") ||
                            "light"
                    )
                }
            })
        })

        observer.observe(document.documentElement, { attributes: true })

        return () => observer.disconnect()
    }, [])

    return (
        <div className="flex flex-col items-center">
            {blocks.map((block, index) => (
                <div key={block.hash} className="flex flex-col items-center">
                    <BlockCard block={block} />
                    {index < blocks.length - 1 && (
                        <div className="my-2">
                            <Image
                                src={
                                    theme === "dark"
                                        ? "/arrows.png"
                                        : "/arrow-down.png"
                                }
                                alt="Down Arrow"
                                width={24}
                                height={24}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
