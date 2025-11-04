import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Attendance from './components/Attendance'
import Footer from './components/Footer'

function App() {
  const [tab, setTab] = useState('home')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-gray-900">
      <Navbar current={tab} onNavigate={setTab} />

      {tab === 'home' && <Home />}
      {tab === 'attendance' && <Attendance />}

      <Footer />
    </div>
  )
}

export default App
