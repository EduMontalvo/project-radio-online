import { SearchOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import type { Radio } from '../schema/RadioSchema'

type SearchBarProps = {
    listRadios: Radio[],
    defaultListRadios: Radio[],
    setListRadios: (radios: Radio[]) => void
}
const SearchBar = ({ setListRadios, defaultListRadios }: SearchBarProps) => {
    const [text, setText] = useState('')
    useEffect(() => {
        const handleDebounce = setTimeout(() => {
            consultaApi()
        }, 100);
        return () => clearTimeout(handleDebounce)
    }, [text])

    const consultaApi = () => {
        const newListRadios = defaultListRadios.filter(radio => radio.name.toLowerCase().includes(text.toLowerCase()))
        if (newListRadios.length === 0 || text === '') {
            setListRadios(defaultListRadios)
        } else {
            setListRadios(newListRadios)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            consultaApi()
        }
    }

    return (
        <div className="relative w-full">
            <label htmlFor="search" className="text-neutral-400 absolute top-1 md:top-2 left-3 text-xl"><SearchOutlined /></label>
            <input type="text" placeholder="Buscar tu estacion de radio" className="py-2 pl-10 w-full placeholder:pl-1 md:placeholder:pl-0 md:w-[85%] m-auto rounded-lg md:pr-4 md:py-2 bg-neutral-800 placeholder:text-neutral-400 text-white " id="search" value={text} onChange={(event) => setText(event.target.value)} onKeyDown={(e) => handleKeyDown(e)} />
        </div>
    )
}

export default SearchBar