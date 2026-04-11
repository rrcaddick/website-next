import type { CardBlock } from '@/lib/content';

/**
 * Resolves the block type from whichever discriminator is present:
 * - `_template`: present in static JSON data
 * - `type`: present in legacy static JSON data
 * - `__typename`: present in Tina live GraphQL data (e.g. 'ListingPagesItemsBlocksTitle' → 'title')
 */
export function resolveBlockType(block: CardBlock): string {
  if (block._template) return block._template;
  if (block.type) return block.type;
  const match = block.__typename?.match(/([A-Z][a-z]+)$/);
  return match ? match[1].toLowerCase() : '';
}
