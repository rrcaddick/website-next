import Image from "next/image";

export default function LogoSection() {
  return (
    <div className="flex justify-center">
      <Image
        src="/images/ui/logos/logo.webp"
        alt="Fairy Knowe Backpackers Logo"
        width={400}
        height={400}
        className="w-[200px] md:w-[250px] h-auto"
      />
    </div>
  );
}
