"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  priority?: boolean;
}

export default function CardImage({ src, alt, priority = false }: Props) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">Image not available</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      quality={80}
      className="object-cover w-full transition-transform duration-500 ease-in-out group-hover:scale-105"
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      onError={() => setError(true)}
    />
  );
}
