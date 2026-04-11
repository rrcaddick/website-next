import CardBlockRenderer from './CardBlockRenderer'
import type { CardBlock } from "@/lib/content";
import { resolveBlockType } from "./blockType";

interface Props {
  blocks: CardBlock[]
}

export default function CardContent({ blocks }: Props) {
  const safeBlocks = blocks ?? [];
  const bottomStartIndex = safeBlocks.findIndex(
    (block) => { const bt = resolveBlockType(block); return bt === 'subheading' || bt === 'list'; }
  )
  const topBlocks = bottomStartIndex === -1 ? safeBlocks : safeBlocks.slice(0, bottomStartIndex)
  const bottomBlocks = bottomStartIndex === -1 ? [] : safeBlocks.slice(bottomStartIndex)

  return (
    <div className="p-4 md:p-6 flex-1 flex flex-col">
      <div>
        {topBlocks.map((block, index) => (
          <CardBlockRenderer key={`${resolveBlockType(block)}-${index}`} block={block} />
        ))}
      </div>

      {bottomBlocks.length > 0 && (
        <div className="mt-auto pt-2">
          {bottomBlocks.map((block, index) => (
            <CardBlockRenderer key={`${resolveBlockType(block)}-${topBlocks.length + index}`} block={block} />
          ))}
        </div>
      )}
    </div>
  )
}
