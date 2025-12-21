import { useEffect, useState } from "react"

export default function Texttype({
    words = [],
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseTime = 1500,
    className = "",
}) {
    const [text, setText] = useState("")
    const [index, setIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)
    useEffect(() => {
        // ✅ HARD SAFETY CHECK
        if (!Array.isArray(words) || words.length === 0) return

        const currentWord = words[index % words.length]

        if (!currentWord) return

        const timeout = setTimeout(() => {
            setText((prev) =>
                isDeleting
                    ? currentWord.slice(0, prev.length - 1)
                    : currentWord.slice(0, prev.length + 1)
            )

            if (!isDeleting && text === currentWord) {
                setTimeout(() => setIsDeleting(true), pauseTime)
            } else if (isDeleting && text === "") {
                setIsDeleting(false)
                setIndex((prev) => prev + 1)
            }
        }, isDeleting ? deletingSpeed : typingSpeed)

        return () => clearTimeout(timeout)
    }, [text, isDeleting, index, words])

    return <span className={className}>{text}</span>
}
