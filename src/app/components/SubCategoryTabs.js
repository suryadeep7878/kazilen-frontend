'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronRight } from 'lucide-react'

const subCategories = [
  {
    id: 'consultation',
    label: 'Book Consultation',
    image: '/subcategories/consultation.png',
    children: [
      { id: 'site-visit', label: 'Site Visit' },
      { id: 'online-call', label: 'Online Call' },
      { id: 'expert-advice', label: 'Expert Advice' },
    ],
  },
  {
    id: 'fan',
    label: 'Fan',
    image: '/subcategories/fan.png',
    children: [
      { id: 'fan-install', label: 'Installation' },
      { id: 'fan-repair', label: 'Repair' },
      { id: 'fan-replace', label: 'Replacement' },
    ],
  },
  { id: 'light', label: 'Light', image: '/subcategories/light.png' },
  {
    id: 'wiring',
    label: 'Wiring',
    image: '/subcategories/wiring.png',
    children: [
      { id: 'new-wiring', label: 'New Wiring' },
      { id: 'rewiring', label: 'Rewiring' },
    ],
  },
  { id: 'doorbell', label: 'Doorbell', image: '/subcategories/doorbell.png' },
  { id: 'mcb', label: 'MCB', image: '/subcategories/mcb.png' },
  {
    id: 'inverter',
    label: 'Inverter',
    image: '/subcategories/inverter.png',
    children: [
      { id: 'install', label: 'Installation' },
      { id: 'repair', label: 'Repair' },
      { id: 'battery', label: 'Battery Change' },
    ],
  },
  { id: 'stabiliser', label: 'Stabiliser', image: '/subcategories/stabiliser.png' },
  { id: 'hour', label: 'Book by Hour', image: '/subcategories/hour.png' },
]

export default function SubCategoryTabs({ value, onChange }) {
  const [showAll, setShowAll] = useState(false)
  const [activeParent, setActiveParent] = useState(null)

  const visibleCategories = subCategories.slice(0, 5)

  const handleCategoryClick = (cat) => {
    if (cat.children?.length) setActiveParent(cat)
    else onChange(cat.id)
  }

  return (
    <>
      {/* Horizontal Tabs */}
      <div className="px-4 mt-4">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {visibleCategories.map((cat) => {
            const isActive = value === cat.id

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat)}
                className={`min-w-[84px] max-w-[84px] flex flex-col items-center gap-1.5 px-2 py-3 rounded-2xl transition
                  ${
                    isActive
                      ? 'bg-pink-50 ring-1 ring-pink-500/40'
                      : 'bg-white hover:bg-gray-50'
                  } shadow-sm`}
              >
                <Image src={cat.image} alt={cat.label} width={38} height={38} />
                <span className="text-[11px] font-medium text-gray-700 text-center leading-tight">
                  {cat.label}
                </span>
                {cat.children && (
                  <div className="w-1 h-1 rounded-full bg-pink-400 mt-0.5" />
                )}
              </button>
            )
          })}

          {/* More */}
          <button
            onClick={() => setShowAll(true)}
            className="min-w-[84px] max-w-[84px] flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-2xl bg-gray-50 border border-dashed border-gray-300"
          >
            <span className="text-lg font-semibold">+</span>
            <span className="text-[11px] font-medium text-gray-600">More</span>
          </button>
        </div>
      </div>

      {/* All Categories */}
      {showAll && (
        <Overlay onClose={() => setShowAll(false)}>
          <Modal title="All Services" onClose={() => setShowAll(false)}>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(72px,1fr))] gap-4">
              {subCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setShowAll(false)
                    handleCategoryClick(cat)
                  }}
                  className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-gray-50 hover:bg-pink-50 transition"
                >
                  <Image src={cat.image} alt={cat.label} width={42} height={42} />
                  <span className="text-[12px] text-center font-medium text-gray-700">
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>
          </Modal>
        </Overlay>
      )}

      {/* Sub-sub Category */}
      {activeParent && (
        <Overlay onClose={() => setActiveParent(null)}>
          <Modal title={activeParent.label} onClose={() => setActiveParent(null)}>
            <div className="space-y-2">
              {activeParent.children.map((child) => (
                <button
                  key={child.id}
                  onClick={() => {
                    onChange(child.id)
                    setActiveParent(null)
                  }}
                  className="w-full flex items-center justify-between px-4 py-4 rounded-xl bg-gray-50 hover:bg-pink-50 transition font-medium"
                >
                  <span>{child.label}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              ))}
            </div>
          </Modal>
        </Overlay>
      )}
    </>
  )
}

/* ---------- UI helpers ---------- */

function Overlay({ children, onClose }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center"
    >
      <div onClick={(e) => e.stopPropagation()} className="w-full">
        {children}
      </div>
    </div>
  )
}

function Modal({ title, onClose, children }) {
  return (
    <div className="bg-white w-full sm:max-w-md mx-auto rounded-t-3xl sm:rounded-3xl p-5 max-h-[85vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button onClick={onClose}>
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      {children}
    </div>
  )
}
