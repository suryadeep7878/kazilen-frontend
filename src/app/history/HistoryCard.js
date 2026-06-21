'use client'

export default function HistoryCard({
  category,
  subCategory,
  status,
  bookingTime,
  serviceCharge,
  platformFee,
  gst,
}) {
  const total =
    Number(serviceCharge || 0) +
    Number(platformFee || 0) +
    Number(gst || 0)

  const formattedDate = new Date(bookingTime).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })

  const statusStyles = {
    completed: {
      bg: 'bg-green-100',
      text: 'text-green-700',
      label: 'Completed',
    },
    in_progress: {
      bg: 'bg-blue-100',
      text: 'text-blue-700',
      label: 'In Progress',
    },
    cancelled: {
      bg: 'bg-red-100',
      text: 'text-red-700',
      label: 'Cancelled',
    },
  }

  const currentStatus =
    statusStyles[status] || statusStyles.completed

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {category}
          </h3>

          <p className="text-sm text-gray-600 mt-1">
            {subCategory}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${currentStatus.bg} ${currentStatus.text}`}
        >
          {currentStatus.label}
        </span>
      </div>

      {/* Booking Time */}
      <div className="mt-4">
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          Booked On
        </p>

        <p className="text-sm text-gray-800 mt-1">
          {formattedDate}
        </p>
      </div>

      {/* Price Details */}
      <div className="mt-5 border-t pt-4">
        <h4 className="font-medium text-gray-900 mb-3">
          Price Details
        </h4>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">
              Service Charge
            </span>
            <span>₹{serviceCharge}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">
              Platform Fee
            </span>
            <span>₹{platformFee}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">
              GST
            </span>
            <span>₹{gst}</span>
          </div>

          <div className="border-t pt-2 mt-2 flex justify-between font-semibold text-base">
            <span>Total Paid</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}