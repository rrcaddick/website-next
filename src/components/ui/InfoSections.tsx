type Align = 'left' | 'center' | 'right'

export interface InfoSection {
  heading: string
  content: string | string[]
  align?: Align
}

interface Props {
  sections: InfoSection[]
}

const alignClass: Record<Align, string> = {
  left: 'text-center md:text-left',
  center: 'text-center',
  right: 'text-center md:text-right',
}

function resolveAlign(index: number, total: number, override?: Align): Align {
  if (override) return override
  if (total === 1) return 'center'
  if (total === 2) return index === 0 ? 'left' : 'right'
  if (index === 0) return 'left'
  if (index === total - 1) return 'right'
  return 'center'
}

function gridClass(count: number): string {
  if (count === 1) return ''
  if (count === 2) return 'grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'
  return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8'
}

export default function InfoSections({ sections }: Props) {
  if (!sections || sections.length === 0) return null

  const total = sections.length

  const cards = sections.map((section, i) => {
    const align = resolveAlign(i, total, section.align)
    const textClass = alignClass[align]

    return (
      <div key={section.heading} className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
        <h3 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 ${textClass}`}>
          {section.heading}
        </h3>
        <div className={`space-y-2 text-gray-600 dark:text-gray-300 text-xs sm:text-sm ${textClass}`}>
          {Array.isArray(section.content) ? (
            <ul className="space-y-2">
              {section.content.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>{section.content}</p>
          )}
        </div>
      </div>
    )
  })

  if (total === 1) {
    return <div className="max-w-2xl mx-auto">{cards[0]}</div>
  }

  return <div className={gridClass(total)}>{cards}</div>
}
