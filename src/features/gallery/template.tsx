import { tinaField } from "tinacms/dist/react";
import GalleryClient from "@/components/features/gallery/GalleryClient";
import type { GalleryPageContent } from "@/lib/content";

const tf = tinaField as (obj: unknown, field: string) => string;

interface Props {
  content: GalleryPageContent;
}

export default function GalleryTemplate({ content }: Props) {
  const { galleryHeading, galleryDetail, emptyMessage } = content;
  return (
    <div className="min-h-screen pt-10 sm:pt-10 lg:pt-10 px-4">
      <h1 data-tina-field={tf(content, "galleryHeading")} className="text-4xl font-bold text-center mb-8 dark:text-white">{galleryHeading}</h1>
      <p data-tina-field={tf(content, "galleryDetail")} className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">{galleryDetail}</p>
      <GalleryClient emptyMessage={emptyMessage} emptyMessageTinaField={tf(content, "emptyMessage")} />
    </div>
  );
}
