import { Link, useLocation } from 'react-router-dom'
import { HomeIcon, FireIcon, Bars3Icon, UserIcon } from '@heroicons/react/24/outline'

function Sidebar() {
    const location = useLocation()
    return (
        <nav className="fixed left-0 top-0 h-full w-48 bg-neutral-900 border-r border-neutral-800 p-4 flex flex-col gap-2">
            <Link to="/" className={`flex items-center gap-3 p-2 rounded hover:bg-neutral-800 ${location.pathname === '/' ? 'text-white' : 'text-neutral-400'}`}>
                <HomeIcon className="w-5 h-5" />
                <span>Home</span>
            </Link>
            <Link to="/workout" className={`flex items-center gap-3 p-2 rounded hover:bg-neutral-800 ${location.pathname === '/workout' ? 'text-white' : 'text-neutral-400'}`}>
                <FireIcon className="w-5 h-5" />
                <span>Workout</span>
            </Link>
            <Link to="/exercises" className={`flex items-center gap-3 p-2 rounded hover:bg-neutral-800 ${location.pathname === '/exercises' ? 'text-white' : 'text-neutral-400'}`}>
                <Bars3Icon className="w-5 h-5" />
                <span>Exercises</span>
            </Link>
            <Link to="/profile" className={`flex items-center gap-3 p-2 rounded hover:bg-neutral-800 ${location.pathname === '/profile' ? 'text-white' : 'text-neutral-400'}`}>
                <UserIcon className="w-5 h-5"/>
                <span>Profile</span>
            </Link>
        </nav>
    )
}

export default Sidebar