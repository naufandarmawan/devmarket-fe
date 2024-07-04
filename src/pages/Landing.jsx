import React from 'react'
import HeroImage from '../assets/hero-image.png'
import WhyImage from '../assets/why-image.png'
import PurpleTick from '../assets/purple-tick.svg'
import SkillImage from '../assets/skill-image.png'
import YellowTick from '../assets/yellow-tick.svg'
import CTAImage from '../assets/cta-image.png'
import Footer from '../components/module/Footer'
import NavBar from '../components/module/NavBar'
import Carousel from '../components/module/Carousel'

const Landing = () => {
    return (
        <div>
            <NavBar />
            <div className=" px-[150px] pb-[120px] pt-[85px] max-lg:p-8">
                <div className='container mx-auto flex flex-col gap-[100px]'>
                    <section id="hero" className="flex gap-[69px] items-center max-lg:flex-col">
                        <div className="flex flex-col gap-[55px] basis-5/12 max-lg:order-1">
                            <div className="flex flex-col gap-[20px]">
                                <h1 className="font-semibold text-[44px] leading-[70px] text-[#1F2A36]">Connecting the nation's top talent for the 4.0 revolution</h1>
                                <p className="font-normal text-lg leading-7 text-[#46505C]">Discover the latest career opportunities anywhere with Peworld Mobile, revolutionizing recruitment.</p>
                            </div>
                            <button
                                className="px-[24px] py-[21px] border border-solid border-[#5E50A1] rounded-[4px] font-bold text-sm leading-6 text-white bg-[#5E50A1] w-fit">Mulai
                                Dari Sekarang</button>
                        </div>

                        <div className="flex basis-7/12">
                            <img className="w-full" src={HeroImage} alt="" />
                        </div>
                    </section>

                    <section id="why-us" className="flex gap-[69px] items-center max-lg:flex-col">
                        <div className="flex basis-7/12">
                            <img className="w-full" src={WhyImage} alt="" />
                        </div>

                        <div className="flex flex-col gap-[55px] basis-5/12 max-lg:order-1">
                            <h2 className="font-semibold text-[36px] leading-[56px] text-[#1F2A36]">Why Choose Peworld for Talent Acquisition</h2>
                            {/* <!-- Ul li atau div aja? --> */}
                            <div className="flex flex-col gap-7">
                                <div className="flex gap-[22px]">
                                    <img className="w-6" src={PurpleTick} alt="" />
                                    <p className="font-normal text-base leading-7 text-[#46505C]">Efficient and streamlined hiring process.</p>
                                </div>
                                <div className="flex gap-[22px]">
                                    <img className="w-6" src={PurpleTick} alt="" />
                                    <p className="font-normal text-base leading-7 text-[#46505C]">Access to a diverse pool of talent.</p>
                                </div>
                                <div className="flex gap-[22px]">
                                    <img className="w-6" src={PurpleTick} alt="" />
                                    <p className="font-normal text-base leading-7 text-[#46505C]">Enhanced global recruitment reach.</p>
                                </div>
                                <div className="flex gap-[22px]">
                                    <img className="w-6" src={PurpleTick} alt="" />
                                    <p className="font-normal text-base leading-7 text-[#46505C]">Responsive and user-friendly platform.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="talent-skills" className="flex gap-[69px] items-center max-lg:flex-col">
                        <div className="flex flex-col gap-[30px] basis-5/12 max-lg:order-1">
                            <div className="flex flex-col gap-3">
                                <h2 className="font-semibold text-[36px] leading-[56px] text-[#1F2A36]">Talent Skills</h2>
                                <p className="font-normal text-lg leading-7 text-[#46505C]">Explore the skills our talent pool offers:</p>
                            </div>
                            {/* <ul className="list-image-[url(../assets/yellow-tick.svg)] ...">
                                <li>Java</li>
                                <li>Golang</li>
                                <li>Kotlin</li>
                                <li>C++</li>
                                <li>PHP</li>
                                <li>Ruby</li>
                                <li>JavaScript</li>
                                <li>10+ Bahasa lainnya</li>
                            </ul> */}
                            <div className="grid gap-y-7 grid-cols-2">
                                <div className="flex gap-[22px]">
                                    <img className="w-6" src={YellowTick} alt="" />
                                    <p className="font-normal text-base leading-7 text-[#46505C]">Java</p>
                                </div>
                                <div className="flex gap-[22px]">
                                    <img className="w-6" src={YellowTick} alt="" />
                                    <p className="font-normal text-base leading-7 text-[#46505C]">Golang</p>
                                </div>
                                <div className="flex gap-[22px]">
                                    <img className="w-6" src={YellowTick} alt="" />
                                    <p className="font-normal text-base leading-7 text-[#46505C]">Kotlin</p>
                                </div>
                                <div className="flex gap-[22px]">
                                    <img className="w-6" src={YellowTick} alt="" />
                                    <p className="font-normal text-base leading-7 text-[#46505C]">C++</p>
                                </div>
                                <div className="flex gap-[22px]">
                                    <img className="w-6" src={YellowTick} alt="" />
                                    <p className="font-normal text-base leading-7 text-[#46505C]">PHP</p>
                                </div>
                                <div className="flex gap-[22px]">
                                    <img className="w-6" src={YellowTick} alt="" />
                                    <p className="font-normal text-base leading-7 text-[#46505C]">Ruby</p>
                                </div>
                                <div className="flex gap-[22px]">
                                    <img className="w-6" src={YellowTick} alt="" />
                                    <p className="font-normal text-base leading-7 text-[#46505C]">JavaScript</p>
                                </div>
                                <div className="flex gap-[22px]">
                                    <img className="w-6" src={YellowTick} alt="" />
                                    <p className="font-normal text-base leading-7 text-[#46505C]">10+ other programming languages</p>
                                </div>

                            </div>
                        </div>

                        <div className="flex basis-7/12">
                            <img className="w-full" src={SkillImage} alt="" />
                        </div>
                    </section>

                    <section id="testimonials">
                        {/* <!-- Third-party package --> */}
                        <div className="flex flex-col gap-[52px]">
                            <h2 className="font-semibold text-[36px] leading-[56px] text-[#1F2A36] text-center">What They're Saying About Peworld</h2>
                        </div>
                        <Carousel />
                    </section>

                    <section id="cta"
                        style={{ backgroundImage: `url(${CTAImage})` }}
                        className="bg-cover bg-bottom flex justify-between items-center px-[68px] py-[57px] rounded-tl-[40px] rounded-tr-[8px] rounded-br-[40px] rounded-bl-[8px]" >
                        <h2 className="w-1/3 font-semibold text-4xl leading-[56px] text-white">Find Your Next Career Move Today</h2>
                        <button
                            className="px-[24px] py-[21px] rounded-[4px] font-bold text-base leading-5 text-[#5E50A1] bg-white w-fit">Get Started Now</button>
                    </section>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Landing