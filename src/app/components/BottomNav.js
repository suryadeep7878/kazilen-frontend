'use client'

import Link from 'next/link'
import { Home, Clock } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { withAuth } = useAuth()

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-2 z-50">
      {/* Home — always public, plain Link */}
      <Link
        href="/"
        className="flex flex-col items-center text-xs"
        aria-label="Home"
      >
        <Home
          size={20}
          className={pathname === '/' ? 'text-pink-500' : 'text-gray-400'}
        />
        <span className={pathname === '/' ? 'text-pink-500' : 'text-gray-400'}>
          Home
        </span>
      </Link>

      {/* History — protected: show modal if not logged in */}
      <button
        onClick={() => withAuth(() => router.push('/history'))}
        className="flex flex-col items-center text-xs"
        aria-label="History"
      >
        <Clock
          size={20}
          className={pathname === '/history' ? 'text-pink-500' : 'text-gray-400'}
        />
        <span className={pathname === '/history' ? 'text-pink-500' : 'text-gray-400'}>
          History
        </span>
      </button>
    </nav>
  )
}
