"use client"

import Image from "next/image"
import BackHeader from "./components/BackHeader"

export default function BookingStatusPage() {
  const booking = {
    title: "Reach in",
    eta: "15 min",
    subtitle: "Captain 298 m away",
    avatar: "/images/provider-thumb.jpg"
  }

  const worker = {
    role: "ELECTRICIAN",
    name: "Vinod Kumar Manjhi Manjhi",
    avatar: "/images/worker-thumb.jpg",
    rating: 4.7
  }

  const pickup = {
    label: "Pickup From",
    address:
      "1885, New Shastri Nagar, Shastri Nagar, Jabalpur, Madhya Pradesh 482003, India"
  }

  const trip = {
    photo: "/images/trip-photo.jpg",
    caption: "Trip snapshot — vehicle & pickup location",
    fare: 34,
    paymentMethod: "GPay"
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <BackHeader />

      <div className="max-w-xl mx-auto w-full space-y-5">
        {/* Heading */}
        <h2 className="text-sm sm:text-base text-gray-500">
          Current booking
        </h2>

        {/* Booking Card */}
        <div className="bg-white rounded-xl border shadow-sm p-4 sm:p-5 flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-semibold text-gray-800">
                {booking.title}
              </span>
              <span className="text-base sm:text-lg font-bold text-emerald-600">
                {booking.eta}
              </span>
            </div>
            <p className="mt-1 text-sm sm:text-base text-gray-400 truncate">
              {booking.subtitle}
            </p>
          </div>

          <div className="w-14 h-14 rounded-md overflow-hidden bg-gray-100 border">
            <Image
              src={booking.avatar}
              alt="provider"
              width={56}
              height={56}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* PIN Section */}
        <div className="flex items-center justify-between">
          <p className="text-sm sm:text-base text-gray-600">
            Start your order with PIN
          </p>

          <div className="flex gap-2">
            {[7, 7, 1, 1].map((n, i) => (
              <div
                key={i}
                className="w-10 h-10 flex items-center justify-center text-lg font-semibold bg-white border rounded-md shadow-sm"
              >
                {n}
              </div>
            ))}
          </div>
        </div>

        {/* Worker Detail Card */}
        <div className="bg-white rounded-xl border shadow-sm">
          <div className="p-4 sm:p-5 flex gap-4 items-start">
            <div className="flex-1 min-w-0">
              <h3 className="flex items-center gap-3">
                <Image
                  src="/images/motorbike.png"
                  alt="vehicle"
                  width={28}
                  height={28}
                />
                <span className="text-sm sm:text-base font-bold text-gray-800">
                  {worker.role}
                </span>
              </h3>
              <p className="mt-2 text-sm text-gray-500 truncate">
                {worker.name}
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border">
                <Image
                  src={worker.avatar}
                  alt={worker.name}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded-full border shadow-sm text-sm">
                <span className="font-semibold">
                  {worker.rating.toFixed(1)}
                </span>
                <svg
                  className="w-4 h-4 text-yellow-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 17.3 7.2 20l1.1-5.3L4 12.2l5.4-.5L12 7l2.6 4.7 5.4.5-4.3 2.5L16.8 20z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Pickup Details */}
        <div className="bg-white rounded-xl border shadow-sm p-4">
          <p className="text-sm text-gray-500">{pickup.label}</p>
          <p className="text-base font-semibold text-gray-800 mt-1">
            {pickup.address}
          </p>
        </div>

        {/* Trip Details (INLINE) */}
        <div className="bg-white rounded-xl border shadow-sm p-4 space-y-4">
          <h3 className="text-base font-semibold text-gray-800">
            Trip Details
          </h3>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total Fare</span>
            <span className="font-semibold text-gray-800">
              ₹{trip.fare}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Payment Method</span>
            <span className="text-gray-800">
              {trip.paymentMethod}
            </span>
          </div>

          <div className="rounded-md overflow-hidden border bg-gray-100">
            <Image
              src={trip.photo}
              alt={trip.caption}
              width={900}
              height={600}
              className="object-cover w-full"
            />
          </div>

          <p className="text-sm text-gray-600">
            {trip.caption}
          </p>

          <button className="w-full px-4 py-3 rounded-full border border-red-300 text-red-700 hover:bg-red-50">
            Cancel Ride
          </button>
        </div>
      </div>
    </main>
  )
}
