import BookingForm from '@/components/features/booking/BookingForm'

export default function Booking() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Book Your Stay</h1>
        <BookingForm />
      </div>
    </div>
  )
}
