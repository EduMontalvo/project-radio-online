import { Link } from "react-router-dom"
import Header from "../components/Header"

const Contact = () => {
    return (
        <>
            <Header/>
            <div className="absolute mt-26 w-full text-center">
                <h2 className="text-2xl uppercase inline font-bold">Contact</h2>
                <p className="mt-6 w-[90%] m-auto">
                    Si quisieras contactarnos, puedes hacerlo a traves de nuestro correo o redes sociales.
                </p>
                <div className="flex gap-4 mt-6 justify-center items-center">
                    <Link to={'https://www.instagram.com/Edu.Montalvo'} className="relative w-full max-w-xs h-16 rounded-md overflow-hidden flex items-center justify-center px-6 bg-[url('https://images.pexels.com/photos/159376/turntable-top-view-audio-equipment-159376.jpeg')] bg-cover bg-center">
                        <span className="text-white font-semibold text-lg z-10">Instagram</span>
                        <div className="absolute inset-0 bg-black/50 z-0" />
                    </Link>
                </div>
                <div className="flex gap-4 mt-6 justify-center items-center">
                    <Link to={'https://github.com/EduMontalvo'} className="relative w-full max-w-xs h-16 rounded-md overflow-hidden flex items-center justify-center px-6 bg-[url('https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg')] bg-cover bg-center">
                        <span className="text-white font-semibold text-lg z-10">Github</span>
                        <div className="absolute inset-0 bg-black/50 z-0" />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Contact