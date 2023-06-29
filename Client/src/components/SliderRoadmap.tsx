import { Button, Col, Row, Skeleton } from "antd";
import React, { useState, useEffect } from "react"
import { BsCheck } from "react-icons/bs";
import { FaRoute } from "react-icons/fa";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import api from "../configs/axiosConfig";
import { Link } from "react-router-dom";
import SkeletonButton from "antd/es/skeleton/Button";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 590 },
        items: 2,
        slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 589, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};

const SliderRoadmap: React.FC = () => {




    const [loaddingas, setloaddingas] = useState(false)
    const [dataroadmap, setdataroadmap] = useState([])


    const hangdlegetdataroadmap = async () => {
        setloaddingas(true)
        await api.get(`/roadmaps/`,

        ).then((response: any) => {
            setdataroadmap(response.data)
            console.log(response)
            setloaddingas(false)
        }).catch((error: any) => {
            console.log(error)
            setloaddingas(false)
        })
    }
    useEffect(() => {
        hangdlegetdataroadmap()
    }, [])



    return (
        <div className="mx-auto px-4 mt-[80px] max-sm:mt-[20px] max-sm:px-1 max-w-[1400px]">
            {
                dataroadmap.length != 0 ? <>
                    <h2 className="text-3xl py-5 max-sm:text-xl font-bold text-center bg-clip-text text-transparent bg-blue-600 ">Training Roadmaps</h2>
                    <p className="text-lg max-sm:text-sm max-sm:px-[5%] max-md:text-base font-semibold text-center leading-8 px-[17%]"><strong>Wizcove IT </strong>provides students with the skills and knowledge to work in the information technology industry, including courses from basic to advanced, to help students understand the theory and application of technologies. information in a real environment.</p>
                    <Carousel responsive={responsive} className="max-w-[980px] w-[90%] mx-auto !pl-0 ">

                        {dataroadmap.map(roadmap => {
                            return <div key={roadmap.id} className=" py-10 px-5 pb-10 max-sm:px-2 text-center cursor-pointer ">
                                <div className="bg-white w-100 hover:shadow-xl h-[270px] hover:bg-gray-50  max-sm:!h-[230px] !border border-inherit rounded-md shadow-lg text-center">
                                    <img className="w-[60px] mt-[-30px] mx-auto max-sm:w-[50px] max-sm:mt-[-25px] shadow-lg rounded-full"
                                        src={roadmap.image} />
                                    <h4 className="mt-5 mb-3 max-sm:mt-2 text-base truncate max-sm:text-xs max-lg:text-sm font-bold flex justify-center space-x-1 items-center">{roadmap.name}</h4>
                                    <div className=" mb-3 ml-5 h-[120px] max-sm:h-[105px] flex space-y-1 flex-col">
                                        {
                                            roadmap.benefits.map((text, index) => {
                                                return <p key={index} className="text-gray-700 truncate font-normal text-sm flex max-sm:text-[10px] justify-start items-center leading-3 space-x-1"><BsCheck className="!text-lg text-green-600" />
                                                    <span>{text}</span></p>
                                            })
                                        }
                                    </div>
                                    <Link to={'/roadmap/' + roadmap.id}><Button type="primary" className="bg-gradient-to-tr from-blue-600 to-cyan-400 font-semibold max-sm:text-xs ">See more</Button></Link>
                                </div>
                            </div>
                        })}


                    </Carousel>

                </> : <>
                    <div className=" max-w-[1100px] !mx-auto text-center">
                        <SkeletonButton active className="my-4 !w-[270px]" />
                        <Skeleton active className="my-5 !mx-auto !flex !justify-center !text-center" />

                    </div>

                    <Row gutter={[24, 24]} className="max-w-[1100px] mb-10 !mx-auto">
                        <Col xs={24} sm={24} md={12} lg={12} xl={6} >
                            <div className="border-collapse border-[1px] rounded-md shadow-md">
                                <SkeletonButton active className="!w-[100%] !h-[175px]" />
                                <div className="px-3">
                                    <Skeleton active className="my-5" />
                                    <SkeletonButton active className="!w-[100%] mb-3" />
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={6} >
                            <div className="border-collapse border-[1px] rounded-md shadow-md">
                                <SkeletonButton active className="!w-[100%] !h-[175px]" />
                                <div className="px-3">
                                    <Skeleton active className="my-5" />
                                    <SkeletonButton active className="!w-[100%] mb-3" />
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={6} >
                            <div className="border-collapse border-[1px] rounded-md shadow-md">
                                <SkeletonButton active className="!w-[100%] !h-[175px]" />
                                <div className="px-3">
                                    <Skeleton active className="my-5" />
                                    <SkeletonButton active className="!w-[100%] mb-3" />
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={6} >
                            <div className="border-collapse border-[1px] rounded-md shadow-md">
                                <SkeletonButton active className="!w-[100%] !h-[175px]" />
                                <div className="px-3">
                                    <Skeleton active className="my-5" />
                                    <SkeletonButton active className="!w-[100%] mb-3" />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </>
            }


            {/* <div className=" py-10 px-5 pb-10 max-sm:px-2 text-center">
                    <div className="bg-white w-100 h-[270px] max-sm:h-[220px] !border border-inherit rounded-md shadow-xl text-center">
                        <img className="w-[60px] mt-[-30px] mx-auto max-sm:w-[50px] max-sm:mt-[-25px]"
                         src="https://live.staticflickr.com/65535/52813965190_1b4a15fe98_w.jpg"/>
                         <h4 className="mt-5 mb-3 max-sm:mt-2 text-base max-sm:text-xs max-lg:text-sm font-bold flex justify-center space-x-1 items-center"><FaRoute /> <span>Front-End Developer</span></h4>
                         <div className=" mb-3 ml-5 h-[120px] max-sm:h-[105px] flex space-y-1 flex-col">
                         
                         <p className="text-black text-sm flex max-sm:text-[10px] justify-start items-center leading-3 space-x-1"><BsCheck className="!text-lg text-green-600"/>
                         <span>JavaScript, Html, Css.</span></p>
                         <p className="text-black text-sm flex max-sm:text-[10px] justify-start items-center leading-3 space-x-1"><BsCheck className="!text-lg text-green-600"/>
                         <span>Html, Css Advanced</span></p>
                         <p className="text-black text-sm flex max-sm:text-[10px] justify-start items-center leading-3 space-x-1"><BsCheck className="!text-lg text-green-600"/>
                         <span>Framework React</span></p>
                         
                         <p className="text-black text-sm flex max-sm:text-[10px] justify-start items-center leading-3 space-x-1"><BsCheck className="!text-lg text-green-600"/>
                         <span>TypeScript</span></p>
                         <p className="text-black text-sm flex max-sm:text-[10px] justify-start items-center leading-3 space-x-1"><BsCheck className="!text-lg text-green-600"/>
                         <span>Redux</span></p>
                         </div>
                         <Button type="primary" className="bg-gradient-to-r from-blue-500 to-cyan-600 font-semibold max-sm:text-xs ">See more</Button>
                    </div>
                </div>
                <div className=" py-10 px-5 pb-10 max-sm:px-2 text-center">
                    <div className="bg-white w-100 h-[270px] max-sm:h-[220px] !border border-inherit rounded-md shadow-xl text-center">
                        <img className="w-[60px] mt-[-30px] mx-auto max-sm:w-[50px] max-sm:mt-[-25px]"
                         src="https://live.staticflickr.com/65535/52814007818_9d5ab6cd16_w.jpg"/>
                         <h4 className="mt-5 mb-3 max-sm:mt-2 text-base max-sm:text-xs max-lg:text-sm font-bold flex justify-center space-x-1 items-center"><FaRoute /> <span>Back-End Developer</span></h4>
                         <div className=" mb-3 ml-5 h-[120px] max-sm:h-[105px] flex space-y-1 flex-col">
                         
                         <p className="text-black text-sm flex max-sm:text-[10px] justify-start items-center leading-3 space-x-1"><BsCheck className="!text-lg text-green-600"/>
                         <span>JavaScript, Html, Css.</span></p>
                         <p className="text-black text-sm flex max-sm:text-[10px] justify-start items-center leading-3 space-x-1"><BsCheck className="!text-lg text-green-600"/>
                         <span>MySQL, MongoDB.</span></p>
                         <p className="text-black text-sm flex max-sm:text-[10px] justify-start items-center leading-3 space-x-1"><BsCheck className="!text-lg text-green-600"/>
                         <span>Framework NodeJS</span></p>
                         <p className="text-black text-sm flex max-sm:text-[10px] justify-start items-center leading-3 space-x-1"><BsCheck className="!text-lg text-green-600"/>
                         <span>RESTful API</span></p>
                         <p className="text-black text-sm flex max-sm:text-[10px] justify-start items-center leading-3 space-x-1"><BsCheck className="!text-lg text-green-600"/>
                         <span>Server-side rendering</span></p>
                         </div>
                         <Button type="primary" className="bg-gradient-to-r from-blue-500 to-cyan-600 font-semibold max-sm:text-xs ">See more</Button>
                    </div>
                </div>
                <div className=" py-10 px-5 pb-10 max-sm:px-2 text-center">
                    <div className="bg-white w-100 h-[270px] max-sm:h-[220px] !border border-inherit rounded-md shadow-xl text-center">
                        <img className="w-[60px] mt-[-30px] mx-auto max-sm:w-[50px] max-sm:mt-[-25px]"
                         src="https://live.staticflickr.com/65535/52814007738_7eb2ffc91e_w.jpg"/>
                         <h4 className="mt-5 mb-3 max-sm:mt-2 text-base max-sm:text-xs max-lg:text-sm font-bold flex justify-center space-x-1 items-center"><FaRoute /> <span>FullStack Developer</span></h4>
                         <div className=" mb-3 ml-5 h-[120px] max-sm:h-[105px] flex space-y-1 flex-col">
                         
                         <p className="text-black text-sm flex max-sm:text-[10px] justify-start items-center leading-3 space-x-1"><BsCheck className="!text-lg text-green-600"/>
                         <span>Front-End</span></p>
                         <p className="text-black text-sm flex max-sm:text-[10px] justify-start items-center leading-3 space-x-1"><BsCheck className="!text-lg text-green-600"/>
                         <span>Back-End</span></p>
                         <p className="text-black text-sm flex max-sm:text-[10px] justify-start items-center leading-3 space-x-1"><BsCheck className="!text-lg text-green-600"/>
                         <span>Testing</span></p>
                         <p className="text-black text-sm flex max-sm:text-[10px] justify-start items-center leading-3 space-x-1"><BsCheck className="!text-lg text-green-600"/>
                         <span>DevOP</span></p>
                        
                         </div>
                         <Button type="primary" className="bg-gradient-to-r from-blue-500 to-cyan-600 font-semibold max-sm:text-xs ">See more</Button>
                    </div>
                </div>
                <div className=" py-10 px-5 pb-10 max-sm:px-2 text-center">
                    <div className="bg-white w-100 h-[270px] max-sm:h-[220px] !border border-inherit rounded-md shadow-xl text-center">
                        <img className="w-[60px] mt-[-30px] mx-auto max-sm:w-[50px] max-sm:mt-[-25px]"
                         src="https://live.staticflickr.com/65535/52813552276_faaabf6424_w.jpg"/>
                         <h4 className="mt-5 mb-3 max-sm:mt-2 text-base max-sm:text-xs max-lg:text-sm font-bold flex justify-center space-x-1 items-center"><FaRoute /> <span>Tester</span></h4>
                         <div className=" mb-3 ml-5 h-[120px] max-sm:h-[105px] flex space-y-1 flex-col">
                         
                         <p className="text-black text-sm flex max-sm:text-[10px] justify-start items-center leading-3 space-x-1"><BsCheck className="!text-lg text-green-600"/>
                         <span>JavaScript, Html, Css.</span></p>
                         <p className="text-black text-sm flex max-sm:text-[10px] justify-start items-center leading-3 space-x-1"><BsCheck className="!text-lg text-green-600"/>
                         <span>Manual Test</span></p>
                         <p className="text-black text-sm flex max-sm:text-[10px] justify-start items-center leading-3 space-x-1"><BsCheck className="!text-lg text-green-600"/>
                         <span>Python</span></p>
                         <p className="text-black text-sm flex max-sm:text-[10px] justify-start items-center leading-3 space-x-1"><BsCheck className="!text-lg text-green-600"/>
                         <span>Automation Test</span></p>
                         
                         </div>
                         <Button type="primary" className="bg-gradient-to-r from-blue-500 to-cyan-600 font-semibold max-sm:text-xs ">See more</Button>
                    </div>
                </div>
                <div className=" py-10 px-5 pb-10 max-sm:px-2 text-center">
                    <div className="bg-white w-100 h-[270px] max-sm:h-[220px] !border border-inherit rounded-md shadow-xl text-center">
                        <img className="w-[60px] mt-[-30px] mx-auto max-sm:w-[50px] max-sm:mt-[-25px]"
                         src="https://live.staticflickr.com/65535/52813965115_b442877523_w.jpg"/>
                         <h4 className="mt-5 mb-3 max-sm:mt-2 text-base max-sm:text-xs max-lg:text-sm font-bold flex justify-center space-x-1 items-center"><FaRoute /> <span>Mobile Developer</span></h4>
                         <div className=" mb-3 ml-5 h-[120px] max-sm:h-[105px] flex space-y-1 flex-col">
                         
                         <p className="text-black text-sm flex max-sm:text-[10px] justify-start items-center leading-3 space-x-1"><BsCheck className="!text-lg text-green-600"/>
                         <span>Dark</span></p>
                         <p className="text-black text-sm flex max-sm:text-[10px] justify-start items-center leading-3 space-x-1"><BsCheck className="!text-lg text-green-600"/>
                         <span>Flutter</span></p>
                         <p className="text-black text-sm flex max-sm:text-[10px] justify-start items-center leading-3 space-x-1"><BsCheck className="!text-lg text-green-600"/>
                         <span>Flutter Advanced</span></p>
                         <p className="text-black text-sm flex max-sm:text-[10px] justify-start items-center leading-3 space-x-1"><BsCheck className="!text-lg text-green-600"/>
                         <span>Firebase</span></p>
                         </div>
                         <Button type="primary" className="bg-gradient-to-r from-blue-500 to-cyan-600 font-semibold max-sm:text-xs ">See more</Button>
                    </div>
                </div> */}



        </div>
    );
}

export default SliderRoadmap;