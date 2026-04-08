import Link from "next/link";
import MouseGradientCard from "@/components/theme/MouseGradientCard";
import CardContent from "./CardContent";
import CardImage from "./CardImage";
import type { ListingItem } from "@/lib/content";

interface Props {
  item: ListingItem;
  priority?: boolean;
}

function getCardTitle(blocks: ListingItem["blocks"]) {
  const titleBlock = blocks.find((block) => block.type === "title");
  return typeof titleBlock?.content === "string" ? titleBlock.content : "Listing image";
}

export default function Card({ item, priority = false }: Props) {
  const hasValidHref = item.href && item.href !== "#" && item.href !== "";

  // If no valid href → render as a plain div (non-clickable)
  if (!hasValidHref) {
    return (
      <div className="group mx-auto w-full max-w-[420px] h-full flex justify-center">
        <MouseGradientCard className="bg-[#F3F4F6] text-[#202635] rounded-lg shadow-lg overflow-hidden flex flex-col h-full min-h-[320px] w-full transition-all duration-500 ease-in-out cursor-default">
          <div className="relative w-full h-[250px]">
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
        <div className="relative w-full h-[250px]">
          <CardImage src={item.image} alt={getCardTitle(item.blocks)} priority={priority} />
        </div>
        <CardContent blocks={item.blocks} />
      </MouseGradientCard>
    </Link>
  );
}
