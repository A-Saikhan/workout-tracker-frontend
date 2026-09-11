import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import BottomNav from './components/BottomNav'
import WorkoutPage from './pages/WorkoutPage'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import ExerciseList from './pages/ExerciseList'
import Profile from './pages/Profile'
import ExerciseDetail from './pages/ExerciseDetail'

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-dvh">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <div className="flex flex-1 flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/workout" element={<WorkoutPage />} />
              <Route path="/exercises" element={<ExerciseList />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="exercises/:id" element={<ExerciseDetail />} />
            </Routes>
          </main>
          <div className="md:hidden shrink-0">
            <BottomNav />
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App