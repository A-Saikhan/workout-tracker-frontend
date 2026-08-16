import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import BottomNav from './components/BottomNav'
import WorkoutPage from './pages/WorkoutPage'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import ExerciseList from './pages/ExerciseList'
import Profile from './pages/Profile'

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <div className="flex-1 pb-20 md:pb-0 md:ml-48">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workout" element={<WorkoutPage />} />
            <Route path="/exercises" element={<ExerciseList />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <div className="md:hidden">
          <BottomNav />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App