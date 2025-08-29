import { useEffect, useRef, useState } from "react"
import { DateFormat, FetchApiRadios } from "../utils/date"
import { ApiOutlined, HeatMapOutlined, HomeOutlined, MutedOutlined, PauseOutlined, ReloadOutlined, RightOutlined, SoundOutlined } from "@ant-design/icons"
import type { Radio } from "../schema/RadioSchema"
import RadioImgError from "./RadioImgError"
import { Link, useParams } from "react-router-dom"
import MultipleItems from "./MultipleItems"
import SearchBar from "./SearchBar"

const RadioPlayer = () => {
    const [now, setNow] = useState({ hours: '', minuts: '' })
    const [ampm, setAmpm] = useState('')
    const [listRadios, setListRadios] = useState<Radio[]>([])
    const [defaultListRadios, setDefaultListRadios] = useState<Radio[]>([])
    const { name } = useParams()
    const [pause, setPause] = useState<boolean>(false)
    const [mute, setMute] = useState<boolean>(true)

    const AudioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        const date = new Date()
        setAmpm(date.getHours() >= 12 ? 'PM' : 'AM')
        setNow(DateFormat(date))
        setInterval(() => {
            const date = new Date()
            setNow(DateFormat(date))
            setAmpm(date.getHours() % 12 ? 'PM' : 'AM')
        }, 60 * 1000);
    }, [])

    useEffect(() => {
        const RadiosStations = async () => {
            try {
                const responseRadios = await FetchApiRadios()
                setListRadios(responseRadios)
                setDefaultListRadios(responseRadios)
            } catch (error) {
                console.log("Devolvio el siguiente error", error)
            }
        }
        RadiosStations()
    }, [])

    const radioSelected = defaultListRadios.find(radio => radio.name === name)

    const genre = radioSelected?.tags?.split(",")

    const suggestedRadio = defaultListRadios.filter(radio => {
        const radioGenre = radio.tags?.split(",")
        return radioGenre?.[0] === genre?.[0] && radio.name !== radioSelected?.name ||
            radioGenre?.[0] === genre?.[1] && radio.name !== radioSelected?.name || radioGenre?.[0] === genre?.[2] && radio.name !== radioSelected?.name || radioGenre?.[0] === genre?.[3] && radio.name !== radioSelected?.name || radioGenre?.[0] === genre?.[4] && radio.name !== radioSelected?.name ||
            radioGenre?.[1] === genre?.[1] && radio.name !== radioSelected?.name ||
            radioGenre?.[1] === genre?.[2] && radio.name !== radioSelected?.name ||
            radioGenre?.[1] === genre?.[3] && radio.name !== radioSelected?.name ||
            radioGenre?.[1] === genre?.[4] && radio.name !== radioSelected?.name
    })

    useEffect(() => {
        if (radioSelected && AudioRef.current) {
            AudioRef.current.load()
            AudioRef.current.play()
        }
    }, [radioSelected])

    const controlMute = (validador: boolean) => {
        if (AudioRef.current) {
            if (validador) {
                AudioRef.current.muted = true
                setMute(false)
            } else {
                AudioRef.current.muted = false
                setMute(true)
            }
        }
    }

    const controlPlayAndPause = (validador: boolean) => {
        if (AudioRef.current) {
            if (validador) {
                AudioRef.current.play()
                setPause(false)
            } else {
                AudioRef.current.pause()
                setPause(true)
            }
        }
    }

    const controlReload = () => {
        if (AudioRef.current) {
            AudioRef.current.load()
            AudioRef.current.play()
        }
    }

    /* const filteredRadio = useMemo(() => {
        return listRadios.filter(radio => radio.name === search)
        setListRadios(filteredRadio)
    }, [search])

    console.log(search) */

    return (
        <>
            <div className="md:flex md:w-full">
                {/* Reproductor */}
                <div className="hidden md:fixed md:flex md:flex-col md:items-center md:justify-center md:w-[40%] md:pt-24 gap-3">
                    {radioSelected?.favicon?.trim() !== '' && radioSelected?.favicon?.trim() !== 'null' ?
                        (<div className="flex items-center bg-neutral-800 rounded-xl p-2">
                            <img src={radioSelected?.favicon} alt={radioSelected?.name} className="w-60 h-60 md:rounded-2xl" />
                        </div>)
                        :
                        (<div className="w-60 h-60 bg-zinc-500 rounded-sm">
                            <p className="h-full font-semibold text-zinc-400 text-3xl flex justify-center items-center text-center">{radioSelected?.name.length > 10 ? `${radioSelected.name.slice(0, 20)}`
                                :
                                radioSelected.name
                            }</p>
                        </div>)}
                    <h2 className="text-2xl text-white font-semibold inline">{radioSelected && radioSelected?.name?.length > 10 ? `${radioSelected?.name.slice(0, 20)} ...`
                        :
                        radioSelected?.name
                    }
                    </h2>
                    <div className="text-zinc-200 w-[20%] overflow-hidden mx-4">
                        {radioSelected && <p className="text-white whitespace-nowrap animate-scroll">{radioSelected.tags}</p>}
                    </div>
                    <div className=" md:text-zinc-200 md:w-[35%] md:flex md:justify-around mb-2">
                        <ReloadOutlined className="text-xl" onClick={controlReload} />
                        <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-black font-extrabold text-xl hover:bg-red-600">
                            {pause ?
                                (<RightOutlined onClick={() => controlPlayAndPause(pause)} />)
                                :
                                (<PauseOutlined onClick={() => controlPlayAndPause(pause)} />)
                            }
                        </div>
                        {mute ?
                            (<SoundOutlined className="text-xl" onClick={() => controlMute(mute)} />)
                            :
                            (<MutedOutlined className="text-xl" onClick={() => controlMute(mute)} />)
                        }
                        <audio ref={AudioRef} src={radioSelected?.url_resolved} preload="auto"></audio>
                    </div>
                    <div className="">
                        <MultipleItems suggestedRadios={suggestedRadio} />
                    </div>
                </div>
                {/* Fin Reproductor */}
                <div className="md:w-[60%] md:ml-auto">
                    <div className="pt-20">
                        <div className="w-[80%] mx-auto md:w-full">
                            <SearchBar listRadios={listRadios} setListRadios={setListRadios} defaultListRadios={defaultListRadios} />
                        </div>
                        <h2 className="text-2xl text-white w-[80%] m-auto pt-4 font-semibold md:w-full">Lista de Radios</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4 pb-40 w-[85%] m-auto pt-4 bg-black md:grid-cols-4 lg:grid-cols-4 md:m-0">
                        {listRadios.map((radio) =>
                        (
                            <Link to={`/${radio.name}`} key={radio.stationuuid} className="cursor-pointer ">
                                {radio.favicon?.trim() !== '' && radio.favicon?.trim() !== 'null' ?
                                    <div className="flex items-center bg-neutral-800 rounded-xl p-2 md:flex-col md:justify-center md:items-center md:w-full md:h-full">
                                        <img src={radio.favicon} alt={radio.name} className="w-10 h-10" />
                                        <p className="text-xs inline w-44 p-2 text-white md:text-center">{radio.name.trim().length > 10 ? `${radio.name.slice(0, 15)} ...`
                                            :
                                            radio.name
                                        }</p>
                                    </div>
                                    :
                                    <RadioImgError name={radio.name} />}
                            </Link>
                        )
                        )}
                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 w-full m-auto md:hidden">
                <div className="bg-black  min-h-11 m-auto border-b-1 border-white flex  items-center">
                    <div className="w-full flex items-center justify-between">
                        <div className="text-zinc-200 px-3 w-[30%] flex justify-around">
                            {pause ?
                                (<RightOutlined className="text-xl" onClick={() => controlPlayAndPause(pause)} />)
                                :
                                (<PauseOutlined className="text-xl" onClick={() => controlPlayAndPause(pause)} />)
                            }
                            {mute ?
                                (<SoundOutlined className="text-xl" onClick={() => controlMute(mute)} />)
                                :
                                (<MutedOutlined className="text-xl" onClick={() => controlMute(mute)} />)
                            }
                            <audio ref={AudioRef} src={radioSelected?.url_resolved} preload="auto"></audio>
                        </div>
                        <div className="text-zinc-200 w-[40%] overflow-hidden mx-4">
                            {radioSelected && <p className="text-white whitespace-nowrap animate-scroll">{radioSelected.tags}</p>}
                        </div>
                    </div>
                </div>
                <div className="bg-black min-h-11 m-auto flex justify-between items-center text-zinc-200 px-3 md:hidden">
                    <h2 className="text-2xl">{now.hours}.{now.minuts}{ampm}</h2>
                    {radioSelected &&
                        (radioSelected.name.trim().length > 25 ? <h2 className="text-sm text-right w-[60%]">{radioSelected.name}</h2> : <h2 className="text-2xl">{radioSelected.name}</h2>)
                    }
                </div>
                <nav className="bg-red-500 w-full py-4 m-auto md:hidden">
                    <ul className="flex justify-around items-center text-white">
                        <Link to={'/radios'}><HomeOutlined className="text-2xl" /></Link>
                        <Link to={'/about'}><HeatMapOutlined className="text-2xl" /></Link>
                        <Link to={'/contact'}><ApiOutlined className="text-2xl" /></Link>
                    </ul>
                </nav>
            </div>

        </>
    )
}

export default RadioPlayer