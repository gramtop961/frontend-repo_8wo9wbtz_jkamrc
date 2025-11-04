import { useMemo } from 'react'
import { Home, CalendarCheck, TestTube } from 'lucide-react'

function Navbar({ current, onNavigate }) {
  const items = useMemo(
    () => [
      { key: 'home', label: 'Beranda', icon: Home },
      { key: 'attendance', label: 'Absensi', icon: CalendarCheck },
    ],
    []
  )

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600" />
          <span className="font-semibold text-gray-800">Aplikasi</span>
        </div>
        <nav className="flex items-center gap-1">
          {items.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                current === key
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
          <a
            href="/test"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            title="Pengujian Backend"
          >
            <TestTube size={18} />
            Test
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
