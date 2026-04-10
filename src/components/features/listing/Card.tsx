import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import MouseGradientCard from "@/components/theme/MouseGradientCard";
import CardContent from "./CardContent";
import CardImage from "./CardImage";
import type { ListingItem } from "@/lib/content";

const tf = tinaField as (obj: unknown, field: string) => string;

interface Props {
  item: ListingItem;
  priority?: boolean;
}

function getCardTitle(blocks: ListingItem["blocks"]) {
  const safeBlocks = blocks ?? [];
  const titleBlock = safeBlocks.find((block) => block.type === "title");
  return typeof titleBlock?.content === "string" ? titleBlock.content : "Listing image";
}

export default function Card({ item, priority = false }: Props) {
  const hasValidHref = item.href && item.href !== "#" && item.href !== "";

  // If no valid href → render as a plain div (non-clickable)
  if (!hasValidHref) {
    return (
      <div className="group mx-auto w-full max-w-[420px] h-full flex justify-center">
        <MouseGradientCard className="bg-[#F3F4F6] text-[#202635] rounded-lg shadow-lg overflow-hidden flex flex-col h-full min-h-[320px] w-full transition-all duration-500 ease-in-out cursor-default">
          <div data-tina-field={tf(item, "image")} className="relative w-full h-[250px]">
            <CardImage src={item.image} alt={getCardTitle(item.blocks)} priority={priority} />
          </div>
          <CardContent blocks={item.blocks} />
        </MouseGradientCard>
      </div>
    );
  }

  // Normal clickable card
  return (
    <Link href={item.href!} className="group mx-auto w-full max-w-[420px] h-full flex justify-center">
      <MouseGradientCard className="bg-[#F3F4F6] text-[#202635] rounded-lg shadow-lg overflow-hidden flex flex-col h-full min-h-[320px] w-full transition-all duration-500 ease-in-out">
        <div data-tina-field={tf(item, "image")} className="relative w-full h-[250px]">
          <CardImage src={item.image} alt={getCardTitle(item.blocks)} priority={priority} />
        </div>
        <CardContent blocks={item.blocks} />
      </MouseGradientCard>
    </Link>
  );
}
