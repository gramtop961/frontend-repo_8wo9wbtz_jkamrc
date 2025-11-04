import { useEffect, useMemo, useState } from 'react'
import { CalendarDays, CheckCircle2, LogOut, Download, Trash2, Search } from 'lucide-react'

const STORAGE_KEY = 'attendanceRecords'

function formatDateISO(date) {
  return new Date(date).toISOString().slice(0, 10)
}

function loadRecords() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    return []
  }
}

function saveRecords(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
}

function Attendance() {
  const [name, setName] = useState('')
  const [status, setStatus] = useState('Hadir')
  const [note, setNote] = useState('')
  const [date, setDate] = useState(formatDateISO(new Date()))
  const [records, setRecords] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    setRecords(loadRecords())
  }, [])

  useEffect(() => {
    saveRecords(records)
  }, [records])

  const filtered = useMemo(() => {
    return records
      .filter(r => (query ? r.name.toLowerCase().includes(query.toLowerCase()) : true))
      .filter(r => (date ? r.date === date : true))
      .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  }, [records, query, date])

  const handleCheckIn = () => {
    if (!name.trim()) return alert('Nama wajib diisi')

    const now = new Date()
    const entry = {
      id: crypto.randomUUID(),
      name: name.trim(),
      date: date || formatDateISO(now),
      checkIn: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      checkOut: '',
      status,
      note,
      createdAt: now.toISOString(),
    }

    setRecords(prev => [entry, ...prev])
    setNote('')
  }

  const handleCheckOut = (id) => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setRecords(prev => prev.map(r => (r.id === id ? { ...r, checkOut: now } : r)))
  }

  const exportCSV = () => {
    const header = ['Nama', 'Tanggal', 'Check In', 'Check Out', 'Status', 'Catatan']
    const rows = records.map(r => [r.name, r.date, r.checkIn, r.checkOut, r.status, (r.note || '').replaceAll('\n', ' ')])
    const csv = [header, ...rows].map(row => row.map(cell => `"${String(cell || '').replaceAll('"', '""')}"`).join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `absensi-${formatDateISO(new Date())}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const clearAll = () => {
    if (confirm('Hapus semua data absensi di perangkat ini?')) {
      setRecords([])
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center gap-3 mb-6">
        <CalendarDays className="text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Absensi</h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Form Absensi</h3>

          <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Nama lengkap"
            className="w-full mb-4 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full mb-4 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="w-full mb-4 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          >
            <option>Hadir</option>
            <option>Izin</option>
            <option>Sakit</option>
            <option>Cuti</option>
          </select>

          <label className="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Opsional"
            rows={3}
            className="w-full mb-4 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />

          <div className="flex gap-3">
            <button
              onClick={handleCheckIn}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow"
            >
              <CheckCircle2 size={18} /> Check In
            </button>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Download size={18} /> Export CSV
            </button>
            <button
              onClick={clearAll}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-red-200 text-red-600 hover:bg-red-50"
            >
              <Trash2 size={18} /> Hapus Semua
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <h3 className="font-semibold text-gray-900">Rekap Hari Ini</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Cari nama..."
                  className="pl-9 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="py-2 pr-4">Nama</th>
                  <th className="py-2 px-4">Tanggal</th>
                  <th className="py-2 px-4">Check In</th>
                  <th className="py-2 px-4">Check Out</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Catatan</th>
                  <th className="py-2 pl-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center text-gray-500 py-8">
                      Belum ada data untuk tanggal ini.
                    </td>
                  </tr>
                ) : (
                  filtered.map((r) => (
                    <tr key={r.id} className="border-b last:border-0">
                      <td className="py-2 pr-4 font-medium text-gray-900">{r.name}</td>
                      <td className="py-2 px-4">{r.date}</td>
                      <td className="py-2 px-4">{r.checkIn}</td>
                      <td className="py-2 px-4">{r.checkOut || (
                        <button
                          onClick={() => handleCheckOut(r.id)}
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
                        >
                          <LogOut size={16} /> Keluar
                        </button>
                      )}</td>
                      <td className="py-2 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          r.status === 'Hadir'
                            ? 'bg-green-100 text-green-700'
                            : r.status === 'Sakit'
                            ? 'bg-yellow-100 text-yellow-700'
                            : r.status === 'Cuti'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="py-2 px-4 max-w-[240px] truncate" title={r.note}>{r.note}</td>
                      <td className="py-2 pl-4">
                        <button
                          onClick={() => setRecords(prev => prev.filter(x => x.id !== r.id))}
                          className="text-red-600 hover:text-red-800"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Attendance
