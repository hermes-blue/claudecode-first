export type ValClass = 'vg' | 'vr' | 'vy'
export type TagType = 'ok' | 'warn' | 'neu'

export interface Tag {
  type: TagType
  label: string
}

export interface CardData {
  id: string
  title: string
  hint: string
  val: string
  valClass: ValClass
  expandNum: string
  expandNumLabel: string
  tags: Tag[]
  expandText: string
  qText: string
  nextScreen: string | null
}

export interface ScreenData {
  id: string
  brandLabel?: string
  title: string
  subtitle: string
  breadcrumb?: string
  cards: CardData[]
}
