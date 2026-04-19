'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CardData } from '@/types'

const valColor: Record<string, string> = {
  vg: 'text-[#6fba6f]',
  vr: 'text-[#e24b4a]',
  vy: 'text-[#d4a043]',
}

const tagStyle: Record<string, string> = {
  ok: 'bg-[#141e14] text-[#6fba6f] border border-[#203a20]',
  warn: 'bg-[#1e1414] text-[#e24b4a] border border-[#3a2020]',
  neu: 'bg-[#1a1d24] text-[#888] border border-[#2a2e3a]',
}

interface CardProps {
  card: CardData
  isSelected: boolean
  onSelect: () => void
  onNavigate: (screenId: string) => void
}

export default function Card({ card, isSelected, onSelect, onNavigate }: CardProps) {
  return (
    <div
      className={`rounded-2xl overflow-hidden cursor-pointer transition-colors duration-200 border ${
        isSelected
          ? 'border-[#3a4060] bg-[#1c2030]'
          : 'border-[#2a2e3a] bg-[#1a1d24] hover:border-[#3a3e4a]'
      }`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-center px-4 py-[14px]">
        <div>
          <div className="text-[15px] font-medium text-[#ddd]">{card.title}</div>
          {!isSelected && (
            <div className="text-[11px] text-[#555] mt-0.5">{card.hint}</div>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-[13px] font-medium ${valColor[card.valClass]}`}>
            {card.val}
          </span>
          <span
            className={`text-[13px] text-[#444] transition-transform duration-200 ${
              isSelected ? 'rotate-90 text-[#666]' : ''
            }`}
          >
            ›
          </span>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isSelected && (
          <motion.div
            key="expand"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-[14px] border-t border-[#22273a]">
              <div className="py-[10px] pb-2 border-b border-[#1e2230]">
                <div className="text-[22px] font-medium text-[#eee]">{card.expandNum}</div>
                <div className="text-[11px] text-[#555] mt-0.5">{card.expandNumLabel}</div>
              </div>

              <div className="flex flex-wrap gap-1.5 py-2 border-b border-[#1e2230]">
                {card.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`text-[10px] px-2 py-0.5 rounded-[6px] ${tagStyle[tag.type]}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <p className="text-[12px] text-[#777] leading-relaxed mb-2">{card.expandText}</p>
                {card.nextScreen ? (
                  <button
                    className="block w-full text-left bg-[#111520] border border-[#2a2e3a] rounded-lg px-3 py-[9px] text-[12px] text-[#7788bb] transition-colors duration-150 hover:bg-[#161c2e] hover:border-[#3a4466] hover:text-[#99aadd]"
                    onClick={(e) => {
                      e.stopPropagation()
                      onNavigate(card.nextScreen!)
                    }}
                  >
                    {card.qText} →
                  </button>
                ) : (
                  <div className="block w-full text-left bg-[#0e1018] border border-[#1e2230] rounded-lg px-3 py-[9px] text-[12px] text-[#444]">
                    {card.qText}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
