import { Link } from "react-router-dom"

const About = () => {
    return (
        <div className="absolute mt-26 w-full text-center">
            <h2 className="text-2xl uppercase inline font-bold">About</h2>
            <p className="mt-6 text-center w-[90%] m-auto">
                Bienvenido a nuestra plataforma de radios online.Este proyecto ha sido desarrollado con el objetivo de brindar una experiencia sencilla, rápida y accesible para descubrir y disfrutar estaciones de radio de diferentes géneros y países.Explora, elige tu favorita y empieza a escuchar con un solo clic.La app está diseñada para ser intuitiva, minimalista y adaptable, enfocándose en lo esencial: la música.
            </p>
            <h2 className="mt-4 italic">Built with React · Tailwind CSS · TypeScript</h2>
            <div className="font-semibold mt-28">
                <p className="mt-4 uppercase">(Developed by - # Edu Montalvo )</p>
                <p className="uppercase">Thanks for the support</p>
                <Link to={'https://github.com/EduMontalvo'} className="uppercase">@Edu Montalvo</Link> /
                <Link to={'https://instagram.com/Edu.Montalvo'} className="mt-4 uppercase">@Edu Montalvo</Link>
                <h2 className="text-red-600">© 2025 SoundRhythm</h2>
            </div>
        </div>
    )
}

export default About