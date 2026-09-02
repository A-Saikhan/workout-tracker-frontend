import { Link, useLocation } from "react-router";
import { HomeIcon, FireIcon, Bars3Icon, UserIcon } from '@heroicons/react/24/outline'

function BottomNav() {
    const location = useLocation()
    return (
    <nav className="md:hidden bottom-0 left-0 right-0 bg-neutral-950 border-t w-full">
        <div className="flex gap-8 items-center p-4 max-w-md mx-auto justify-evenly">
            <Link to="/" className={`text-sm font-bold flex flex-col items-center ${location.pathname === '/' ? 'text-white' : 'text-neutral-400'}`}>
            <HomeIcon className="w-5 h-5" />
            Home</Link>
            <Link to="/workout" className={`text-sm font-bold flex flex-col items-center ${location.pathname === '/workout' ? 'text-white' : 'text-neutral-400'}`}>
            <FireIcon className="w-5 h-5" />
            Workout</Link>
            <Link to="/exercises" className={`text-sm font-bold flex flex-col items-center ${location.pathname === '/exercises' ? 'text-white' : 'text-neutral-400'}`}>
            <Bars3Icon className="w-5 h-5" />
            Exercises</Link>
            <Link to="/profile" className={`text-sm font-bold flex flex-col items-center ${location.pathname === '/profile' ? 'text-white' : 'text-neutral-400'}`}>
            <UserIcon className="w-5 h-5" />
            Profile</Link>
        </div>
    </nav>
    );
}

export default BottomNav