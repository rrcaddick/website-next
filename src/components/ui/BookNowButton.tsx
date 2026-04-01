import Link from 'next/link'

export default function BookNowButton() {
  return (
    <div className="flex justify-center">
      <Link
        href="https://book.nightsbridge.com/21082"
        className="bg-[#0E7D73] hover:bg-[#073F3A] text-[#C9DD94] hover:text-[#00FF7F] px-6 py-3 rounded-lg font-semibold transition-colors text-base"
      >
        Book Now
      </Link>
    </div>
  )
}
