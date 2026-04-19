'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { screenMap } from '@/data/bhc'
import Card from '@/components/Card'
import Header from '@/components/Header'

export default function Home() {
  const [currentScreenId, setCurrentScreenId] = useState('s0')
  const [history, setHistory] = useState<string[]>([])
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [direction, setDirection] = useState(1)

  const screen = screenMap[currentScreenId]

  function navigate(nextScreenId: string) {
    setDirection(1)
    setHistory((h) => [...h, currentScreenId])
    setSelectedCard(null)
    setCurrentScreenId(nextScreenId)
  }

  function back() {
    if (!history.length) return
    setDirection(-1)
    const prev = history[history.length - 1]
    setHistory((h) => h.slice(0, -1))
    setSelectedCard(null)
    setCurrentScreenId(prev)
  }

  function toggleCard(cardId: string) {
    setSelectedCard((cur) => (cur === cardId ? null : cardId))
  }

  const variants = {
    enter: (dir: number) => ({ x: dir * 60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir * -60, opacity: 0 }),
  }

  return (
    <main className="min-h-screen bg-[#0f1115] flex justify-center">
      <div className="w-full max-w-[390px] min-h-screen overflow-hidden relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentScreenId}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="absolute inset-0 overflow-y-auto"
          >
            <div className="p-[18px]">
              <Header
                breadcrumb={screen.breadcrumb}
                onBack={back}
                depth={history.length}
              />

              {history.length === 0 && screen.brandLabel && (
                <p className="text-[11px] text-[#555] mb-1 tracking-[0.5px]">
                  {screen.brandLabel}
                </p>
              )}

              <p className="text-[20px] font-medium text-[#eee] mb-0.5">{screen.title}</p>
              <p className="text-[12px] text-[#555] mb-4">{screen.subtitle}</p>

              <div className="flex flex-col gap-2">
                {screen.cards.map((card) => (
                  <Card
                    key={card.id}
                    card={card}
                    isSelected={selectedCard === card.id}
                    onSelect={() => toggleCard(card.id)}
                    onNavigate={navigate}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}
