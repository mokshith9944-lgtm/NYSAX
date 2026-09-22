import React from 'react'
import { twMerge } from 'tailwind-merge'

interface MarqueeTextProps {
  items: React.ReactNode[]
  direction?: 'forward' | 'reverse'
  className?: string
}

export default function MarqueeText({
  items,
  direction = 'forward',
  className = '',
}: MarqueeTextProps) {
  const animationClass = direction === 'reverse' ? 'animate-marquee-reverse' : 'animate-marquee'

  return (
    <div className={twMerge('flex overflow-hidden relative w-full select-none', className)}>
      <div className={twMerge('flex whitespace-nowrap', animationClass)}>
        {items.map((item, index) => (
          <div key={`orig-${index}`} className="flex items-center">
            <span className="mx-8 sm:mx-12">{item}</span>
            <span className="text-olive-600/50 text-xs">◆</span>
          </div>
        ))}
        {items.map((item, index) => (
          <div key={`dup-${index}`} className="flex items-center">
            <span className="mx-8 sm:mx-12">{item}</span>
            <span className="text-olive-600/50 text-xs">◆</span>
          </div>
        ))}
      </div>
    </div>
  )
}
