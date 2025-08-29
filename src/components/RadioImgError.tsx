type RadioImgErrorProps = {
    name: string
}


const RadioImgError = ({ name }: RadioImgErrorProps) => {
    return (
        <div className="flex items-center bg-neutral-800 rounded-xl p-2 md:flex-col">
            <div className="w-10 h-10 bg-zinc-500 rounded-sm">
                <p className="h-full font-semibold text-zinc-400 text-3xl flex justify-center items-center">{name.charAt(0)}</p>
            </div>
            <p className={`${name.trim().length > 10 ? "text-xs inline w-44 p-2 text-white md:text-center md:wrap-anywhere md:max-w-24" : "text-sm inline w-44 p-2 text-white md:text-center"}`}>
                {name.length > 15 ? `${name.slice(0, 10)}...` : name}
            </p>
        </div>
    )
}

export default RadioImgError

/* name.length > 15 ? name : name */
/* text-xs inline w-44 p-2 text-white text-center */