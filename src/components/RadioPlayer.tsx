import { useEffect, useRef, useState } from "react"
import { DateFormat, FetchApiRadios } from "../utils/date"
import { ApiOutlined, HeatMapOutlined, HomeOutlined, MutedOutlined, PauseOutlined, RightOutlined, SoundOutlined } from "@ant-design/icons"
import type { Radio } from "../schema/RadioSchema"
import RadioImgError from "./RadioImgError"
import { Link, useParams } from "react-router-dom"

const RadioPlayer = () => {
    const [now, setNow] = useState({ hours: '', minuts: '' })
    const [ampm, setAmpm] = useState('')
    const [listRadios, setListRadios] = useState<Radio[]>([])
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
            } catch (error) {
                console.log("Devolvio el siguiente error", error)
            }
        }
        RadiosStations()
    }, [])

    const radioSelected = listRadios.find(radio => radio.name === name)

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


    return (
        <>
            <div className="pt-20">
                <h2 className="text-2xl text-white w-[80%] m-auto pt-4 font-semibold">Lista de Radios</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 pb-40 w-[85%] m-auto pt-4 bg-black">
                {listRadios.map((radio) =>
                (
                    <Link to={`/${radio.name}`} key={radio.stationuuid} className="cursor-pointer">
                        {radio.favicon?.trim() !== '' && radio.favicon?.trim() !== 'null' ?
                            <div className="flex items-center bg-neutral-800 rounded-xl p-2">
                                <img src={radio.favicon} alt={radio.name} className="w-10 h-10" />
                                <p className="text-xs inline w-44 p-2 text-white">{radio.name}</p>
                            </div>
                            :
                            <RadioImgError name={radio.name} />}
                    </Link>
                )
                )}
            </div>
            <div className="fixed bottom-0  w-full m-auto">
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
                <div className="bg-black min-h-11 m-auto flex justify-between items-center text-zinc-200 px-3">
                    <h2 className="text-2xl">{now.hours}.{now.minuts}{ampm}</h2>
                    {radioSelected &&
                        (radioSelected.name.trim().length > 25 ? <h2 className="text-sm text-right w-[60%]">{radioSelected.name}</h2> : <h2 className="text-2xl">{radioSelected.name}</h2>)
                    }
                </div>
                <nav className="bg-red-500 w-full py-4 m-auto">
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