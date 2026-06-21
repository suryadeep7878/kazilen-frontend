'use client'

import HistoryCard from './HistoryCard'

export default function HistoryPage() {
  const bookings = [
    {
      id: 1,
      category: 'Electrician',
      subCategory: 'Fan Installation',
      status: 'completed',
      bookingTime: '2026-06-21T15:30:00',
      serviceCharge: 500,
      platformFee: 20,
      gst: 93.6,
    },
    {
      id: 2,
      category: 'Electrician',
      subCategory: 'Switch Board Repair',
      status: 'in_progress',
      bookingTime: '2026-06-22T10:15:00',
      serviceCharge: 300,
      platformFee: 15,
      gst: 56.7,
    },
    {
      id: 3,
      category: 'Electrician',
      subCategory: 'Tube Light Installation',
      status: 'cancelled',
      bookingTime: '2026-06-20T18:45:00',
      serviceCharge: 250,
      platformFee: 10,
      gst: 46.8,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">
        Booking History
      </h1>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <HistoryCard
            key={booking.id}
            {...booking}
          />
        ))}
      </div>
    </div>
  )
}

