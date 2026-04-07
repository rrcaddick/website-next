import type { CardBlock } from "@/lib/content";

interface Props {
  block: CardBlock;
}

export default function CardBlockRenderer({ block }: Props) {
  if (block.type === "title") {
    return (
      <h2
        className="text-3xl md:text-2xl font-bold mb-3 text-[#202635] group-hover:text-[#00FF7F] transition-colors duration-500 ease-in-out 
                     text-center md:text-left"
      >
        {block.content as string}
      </h2>
    );
  }

  if (block.type === "text") {
    return (
      <p
        className="text-sm md:text-base text-gray-600 mb-4 last:mb-0 group-hover:text-white transition-colors duration-500 ease-in-out 
                    text-center md:text-left leading-relaxed"
      >
        {block.content as string}
      </p>
    );
  }

  if (block.type === "subheading") {
    return (
      <h3
        className="text-base md:text-lg font-semibold mb-3 text-[#202635] group-hover:text-[#00FF7F] transition-colors duration-500 ease-in-out 
                     text-center md:text-left"
      >
        {block.content as string}
      </h3>
    );
  }

  // List - centered on mobile WITHOUT bullets, left-aligned with bullets on desktop
  return (
    <ul
      className="space-y-1.5 text-sm md:text-base text-gray-600 group-hover:text-white transition-colors duration-500 ease-in-out 
                   text-center md:text-left md:list-disc md:pl-5"
    >
      {(block.content as string[]).map((item, index) => (
        <li key={`${item}-${index}`}>{item}</li>
      ))}
    </ul>
  );
}
