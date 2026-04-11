import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/404.jpg"
        alt="A fairy lost in an enchanted forest"
        fill
        className="object-cover object-center"
        priority
        quality={90}
        sizes="100vw"
      />

      {/* Dark gradient overlay — heavier at bottom for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pb-16 pt-24">
        <h1 className="hestrial-font text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-[0_0_12px_rgba(0,0,0,0.9)] mb-6 leading-tight">
          Are you lost traveler?
        </h1>

        <p className="text-white/80 text-base md:text-lg max-w-sm mb-10 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
          This path leads nowhere. Let us guide you back to the magic.
        </p>

        <Link
          href="/"
          className="bg-[#0E7D73] hover:bg-[#073F3A] text-[#C9DD94] hover:text-[#00FF7F] px-8 py-3 rounded-lg text-base font-semibold transition-colors duration-200 shadow-lg"
        >
          Travel Home
        </Link>
      </div>
    </div>
  );
}
