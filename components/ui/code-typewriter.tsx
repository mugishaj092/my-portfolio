"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

export type CodeToken = { text: string; className?: string }
export type CodeLine = CodeToken[]

const CHAR_INTERVAL_MS = 6

function lineLength(line: CodeLine): number {
  return line.length === 0
    ? 1
    : line.reduce((total, token) => total + token.text.length, 0)
}

function sliceLine(line: CodeLine, count: number): CodeToken[] {
  if (line.length === 0) return []

  const visible: CodeToken[] = []
  let remaining = count

  for (const token of line) {
    if (remaining <= 0) break
    const text = token.text.slice(0, remaining)
    if (text.length > 0) visible.push({ text, className: token.className })
    remaining -= token.text.length
  }

  return visible
}

function CodeTypewriter({ lines }: { lines: CodeLine[] }) {
  const prefersReducedMotion = useReducedMotion()

  const lineLengths = React.useMemo(() => lines.map(lineLength), [lines])
  const lineStarts = React.useMemo(() => {
    const starts: number[] = []
    let total = 0
    for (const length of lineLengths) {
      starts.push(total)
      total += length
    }
    return starts
  }, [lineLengths])
  const totalLength = lineStarts.length
    ? lineStarts[lineStarts.length - 1] + lineLengths[lineLengths.length - 1]
    : 0

  const [revealed, setRevealed] = React.useState(
    prefersReducedMotion ? totalLength : 0
  )

  React.useEffect(() => {
    if (prefersReducedMotion || revealed >= totalLength) return
    const id = setTimeout(() => setRevealed((count) => count + 1), CHAR_INTERVAL_MS)
    return () => clearTimeout(id)
  }, [revealed, totalLength, prefersReducedMotion])

  const currentLineIndex = lineStarts.reduce(
    (active, start, index) => (start <= revealed ? index : active),
    0
  )

  return (
    <code className="grid gap-0.5">
      {lines.map((line, index) => {
        const visibleInLine = Math.max(
          0,
          Math.min(lineLengths[index], revealed - lineStarts[index])
        )
        const visibleTokens = sliceLine(line, visibleInLine)
        const showCaret = index === currentLineIndex

        return (
          <span key={index} className="flex whitespace-pre">
            <span className="mr-4 w-4 shrink-0 select-none text-right text-neutral-600">
              {index + 1}
            </span>
            <span>
              {visibleTokens.map((token, tokenIndex) => (
                <span key={tokenIndex} className={token.className}>
                  {token.text}
                </span>
              ))}
              {showCaret && (
                <motion.span
                  aria-hidden
                  className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-emerald-300 align-middle"
                  animate={{ opacity: [1, 1, 0, 0] }}
                  transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                />
              )}
            </span>
          </span>
        )
      })}
    </code>
  )
}

export { CodeTypewriter }
