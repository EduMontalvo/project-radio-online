import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header className="w-full font-doto bg-black text-white fixed font-bold p-4 flex justify-between items-center z-50">
            <h1 className="text-2xl inline">SoundRhythm</h1>
            <nav>
                <ul className="flex space-x-4">
                    <Link to={'/'}>Home</Link>
                    <Link to={'/about'}>About</Link>
                    <Link to={'/contact'}>Contact</Link>
                </ul>
            </nav>
        </header>
    )
}

export default Header