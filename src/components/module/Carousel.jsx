import React from "react"
import Slider from "react-slick"

import Person1 from '../../assets/person-1.png'
import Person2 from '../../assets/person-2.png'
import Person3 from '../../assets/person-3.png'
import ArrowLeft from '../../assets/grey-arrow-left.svg'
import ArrowRight from '../../assets/grey-arrow-right.svg'

import CarouselCard from "../base/CarouselCard"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function Carousel() {
    // function SampleNextArrow(props) {
    //     const { className, style, onClick } = props;
    //     return (
    //         <div
    //             className={className}
    //             style={{ ...style, display: "block", background: "#5E50A1" }}
    //             onClick={onClick}
    //         />
    //     );
    // }

    // function SamplePrevArrow(props) {
    //     const { className, style, onClick } = props;
    //     return (
    //         <div
    //             className={className}
    //             style={{ ...style, display: "block", background: "#5E50A1" }}
    //             onClick={onClick}
    //         />
    //     );
    // }

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div className={`${className}`} style={{style}} onClick={onClick}>
                <img src={ArrowRight} />
            </div>
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div className={`${className}`} style={style} onClick={onClick}>
                <img src={ArrowLeft} />
            </div>
        );
    }

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        // slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    infinite: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    infinite: true,
                }
            }
        ]
    };

    return (
        <div className="slider-container">
            <Slider {...settings}>                
                <CarouselCard
                    image={Person1}
                    name='Harry Styles'
                    position='Web Developer'
                    description="Thanks to Peworld Mobile, I've found exciting career opportunities that match my skills and ambitions. It's incredibly easy to use, and I can access job listings wherever I am."
                />

                <CarouselCard
                    image={Person2}
                    name='Niall Horan'
                    position='Web Developer'
                    description='Peworld Mobile has transformed how I search for freelance projects. Its intuitive design and global reach have made it my go-to platform'
                />

                <CarouselCard
                    image={Person3}
                    name='Louis Tomlinson'
                    position='Web Developer'
                    description="As a software engineer, I rely on Peworld Mobile to stay updated with the latest tech jobs. It's efficient and helps me connect with companies globally."
                />
            </Slider>
        </div>
    );
}

export default Carousel;


// import React, { Component } from "react";
// import Slider from "react-slick";

// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "red" }}
//       onClick={onClick}
//     />
//   );
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "green" }}
//       onClick={onClick}
//     />
//   );
// }

// function CustomArrows() {
//   const settings = {
//     dots: true,
//     infinite: true,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />
//   };
//   return (
//     <div className="slider-container">
//       <Slider {...settings}>
//         <div>
//           <h3>1</h3>
//         </div>
//         <div>
//           <h3>2</h3>
//         </div>
//         <div>
//           <h3>3</h3>
//         </div>
//       </Slider>
//     </div>
//   );
// }

// export default CustomArrows;