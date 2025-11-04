function Footer() {
  return (
    <footer className="mt-10 border-t border-gray-200">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-500 flex items-center justify-between">
        <p>
          © {new Date().getFullYear()} Aplikasi. Semua hak dilindungi.
        </p>
        <p>
          Dibuat dengan ♥ untuk produktivitas tim.
        </p>
      </div>
    </footer>
  )
}

export default Footer
