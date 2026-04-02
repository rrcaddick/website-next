import Image from 'next/image'

export default function LogoSection() {
  return (
    <div className="flex justify-center">
      <Image
        src="/images/home/logo.webp"
        alt="Fairy Knowe Backpackers Logo"
        width={400}
        height={400}
        className="w-auto h-auto max-w-[200px] md:max-w-[250px]"

      />
    </div>
  )
}
