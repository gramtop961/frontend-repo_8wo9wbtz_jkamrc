function Home() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            Selamat datang di aplikasi Anda
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Kami menambahkan fitur Absensi agar tim dapat melakukan check-in dan check-out
            dengan mudah, lengkap dengan catatan dan rekap harian.
          </p>
          <ul className="mt-6 space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-600"></span>
              Navigasi yang jelas: Beranda, Absensi, dan Test.
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-600"></span>
              Rekam kehadiran dan ekspor data ke CSV.
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-600"></span>
              Data tersimpan di perangkat (localStorage) untuk kemudahan penggunaan.
            </li>
          </ul>
        </div>
        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-6 shadow-inner">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-white p-4 shadow">
              <p className="text-sm text-gray-500">Pengguna aktif</p>
              <p className="text-2xl font-bold">126</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <p className="text-sm text-gray-500">Hadir hari ini</p>
              <p className="text-2xl font-bold">24</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow col-span-2">
              <p className="text-sm text-gray-500">Status sistem</p>
              <div className="mt-2 h-2 bg-gray-200 rounded">
                <div className="h-2 bg-blue-600 rounded" style={{ width: '78%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
