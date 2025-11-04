export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              Selamat datang di Dashboard Anda
            </h1>
            <p className="mt-4 text-slate-300 text-lg">
              Semua fitur tetap tersedia, dan sekarang ditambah fitur Absensi untuk
              pencatatan kehadiran harian secara mudah dan cepat.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="#attendance" className="inline-flex items-center px-5 py-3 rounded-md bg-indigo-600 hover:bg-indigo-500 transition font-medium">
                Mulai Absensi
              </a>
              <a href="#features" className="inline-flex items-center px-5 py-3 rounded-md bg-white/10 hover:bg-white/20 transition font-medium">
                Lihat Fitur
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="rounded-xl bg-black/30 p-6">
                <p className="text-sm text-slate-300">Pengguna Aktif</p>
                <p className="text-3xl font-bold">1,248</p>
              </div>
              <div className="rounded-xl bg-black/30 p-6">
                <p className="text-sm text-slate-300">Tugas Selesai</p>
                <p className="text-3xl font-bold">326</p>
              </div>
              <div className="rounded-xl bg-black/30 p-6">
                <p className="text-sm text-slate-300">Rata-rata Waktu</p>
                <p className="text-3xl font-bold">4h 12m</p>
              </div>
              <div className="rounded-xl bg-black/30 p-6">
                <p className="text-sm text-slate-300">Kepuasan</p>
                <p className="text-3xl font-bold">98%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
