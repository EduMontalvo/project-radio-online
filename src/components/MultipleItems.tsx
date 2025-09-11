import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { Radios } from "../schema/RadioSchema";
import { Link } from "react-router-dom";

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
                            <h2 className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black " >{radio.name.charAt(0).toUpperCase()}</h2>
                            <p className="text-white text-center text-sm">{radio.name.length > 10 ? `${radio.name.slice(0, 15)}...` : radio.name}</p>
                        </div>
                    </Link>
                )}

            </Slider>
        </div>
    )
}

export default MultipleItems