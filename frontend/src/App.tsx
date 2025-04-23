import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/booking-widget/LandingPage'
import RoomResultsPage from './components/room-results/RoomResultsPage'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/room-results" element={<RoomResultsPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
