import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { Radios } from "../schema/RadioSchema";
import { Link } from "react-router-dom";
import IconAlterno from "../assets/IconAlterno.png"

type MultipleItemsProps = {
    suggestedRadios: Radios
}
const MultipleItems = ({ suggestedRadios }: MultipleItemsProps) => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        adaptiveHeight: true
    }


    return (
        <div className="slider-container w-80 px-auto">
            <Slider {...settings}>
                {suggestedRadios?.map(radio =>
                    <Link to={`/${radio.name}`} key={radio.stationuuid}>
                        <div className=" min-h-32 px-2 grid place-items-center" key={radio.stationuuid}>
                            {radio.favicon?.trim() !== '' && radio.favicon?.trim() !== null ?
                                <img src={radio.favicon} alt={radio.name} className="w-15 h-15 bg-white rounded-sm" />
                                :
                                <>
                                    <div className="w-15 h-15 bg-zinc-500 rounded-sm">
                                       <img src={IconAlterno} alt="imagen alternativa" />
                                    </div>
                                </>}
                            <h3 className="text-white text-center text-sm">{radio.name.length > 10 ? `${radio.name.slice(0, 15)}...` : radio.name}</h3>
                        </div>
                    </Link>
                )}

            </Slider>
        </div>
    )
}

export default MultipleItems