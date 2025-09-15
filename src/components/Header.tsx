import { animated, useSpring } from "@react-spring/web"
import { Link } from "react-router-dom"

const Header = () => {

    const styles = useSpring({
        from: {
            opacity: 0,
            transform: 'translateY(-100%)'
        },
        to: {
            opacity: 1,
            transform: 'translateY(0%)',
            delay: 500
        }
    })

    return (
        <animated.header style={styles} className="w-full font-doto bg-black text-white fixed font-bold p-4 flex justify-between items-center z-50">
            <h1 className="text-2xl inline">SoundRhythm</h1>
            <nav>
                <ul className="flex space-x-4">
                    <Link to={'/'}>Home</Link>
                    <Link to={'/about'}>About</Link>
                    <Link to={'/contact'}>Contact</Link>
                </ul>
            </nav>
        </animated.header>
    )
}

export default Header