type RadioImgErrorProps = {
    name: string
}


const RadioImgError = ({ name }: RadioImgErrorProps) => {
    return (
        <div className="flex items-center bg-neutral-800 rounded-xl p-2">
            <div className="w-10 h-10 bg-zinc-500 rounded-sm">
                <p className="h-full font-semibold text-zinc-400 text-3xl flex justify-center items-center">{name.charAt(0)}</p>
            </div>
            <p className="text-xs inline w-44 p-2 text-white">{name}</p>
        </div>
    )
}

export default RadioImgError