import CardBlockRenderer from './CardBlockRenderer'
import type { CardBlock } from "@/lib/content";

interface Props {
  blocks: CardBlock[]
}

export default function CardContent({ blocks }: Props) {
  const bottomStartIndex = blocks.findIndex(
    (block) => block.type === 'subheading' || block.type === 'list'
  )
  const topBlocks = bottomStartIndex === -1 ? blocks : blocks.slice(0, bottomStartIndex)
  const bottomBlocks = bottomStartIndex === -1 ? [] : blocks.slice(bottomStartIndex)

  return (
    <div className="p-4 md:p-6 flex-1 flex flex-col">
      <div>
        {topBlocks.map((block, index) => (
          <CardBlockRenderer key={`${block.type}-${index}`} block={block} />
        ))}
      </div>

      {bottomBlocks.length > 0 && (
        <div className="mt-auto pt-2">
          {bottomBlocks.map((block, index) => (
            <CardBlockRenderer key={`${block.type}-${topBlocks.length + index}`} block={block} />
          ))}
        </div>
      )}
    </div>
  )
}
