'use client'

interface HeaderProps {
  breadcrumb?: string
  onBack: () => void
  depth: number
}

export default function Header({ breadcrumb, onBack, depth }: HeaderProps) {
  if (depth === 0) return null

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2.5 mb-2">
        <button
          onClick={onBack}
          className="bg-[#1e2128] border border-[#2e3140] border-opacity-50 rounded-lg text-[#aaa] text-[12px] px-3 py-1.5 cursor-pointer"
        >
          ← 뒤로
        </button>
        <span className="ml-auto text-[10px] text-[#555] bg-[#1e2128] border border-[#2e3140] border-opacity-50 rounded-md px-2 py-0.5">
          {depth + 1}단계
        </span>
      </div>
      {breadcrumb && (
        <p className="text-[11px] text-[#555]">
          BHC › <span className="text-[#888]">{breadcrumb}</span>
        </p>
      )}
    </div>
  )
}
