import './App.css'
import { Link, Routes, Route } from 'react-router-dom'
import Users from './components/Users'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Workouts from './components/Workouts'

function App() {
  return (
    <div className="app-root">
      <header>
        <h1>OctoFit Tracker</h1>
        <nav>
          <Link to="/users">Users</Link> | <Link to="/teams">Teams</Link> |{' '}
          <Link to="/activities">Activities</Link> | <Link to="/workouts">Workouts</Link> | <Link to="/leaderboard">Leaderboard</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/" element={<div>Welcome to OctoFit Tracker</div>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
