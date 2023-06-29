import React, { useState, useEffect } from "react";
import { Button, Carousel, Col, Row, Skeleton } from "antd";
import { FaRoute } from "react-icons/fa";
import api from "../configs/axiosConfig";
import SkeletonInput from "antd/es/skeleton/Input";
import { Link } from "react-router-dom";


function SlideBanner() {

  const [dataroadmapfull, setdataroadmapfull] = useState(null)
  const [dataroadmapback, setdataroadmapback] = useState(null)
  const [dataroadmapfront, setdataroadmapfront] = useState(null)

  const [priceroadmapfull, setpriceroadmapfull] = useState(null)
  const [priceroadmapback, setpriceroadmapback] = useState(null)
  const [priceroadmapfront, setpriceroadmapfront] = useState(null)

  const [disroadmapfull, setdisroadmapfull] = useState(null)
  const [disroadmapback, setdisroadmapback] = useState(null)
  const [disroadmapfront, setdisroadmapfront] = useState(null)



  const hangdlegetdataroadmap = async () => {

    await api.get(`/roadmaps/e59305a9-3eb5-44b3-89fd-5b58b3859f13`,

    ).then((response: any) => {
      setdataroadmapfull(response.data)
      var prifull = 0
      for (const a in response.data.courseRoadmaps) {
        const tam = prifull
        prifull = tam + response.data.courseRoadmaps[a].course.price
      }
      setpriceroadmapfull(prifull)
      var disfull = 0
      for (const a in response.data.courseRoadmaps) {
        const tam = disfull
        disfull = tam + response.data.courseRoadmaps[a].course.discount
      }
      setdisroadmapfull(disfull)

    }).catch((error: any) => {
      console.log(error)

    })
    await api.get(`/roadmaps/19209a2a-aa22-4ca5-8c95-0c2466014638`,

    ).then((response: any) => {
      setdataroadmapback(response.data)
      var priback = 0
      for (const a in response.data.courseRoadmaps) {
        const tam = priback
        priback = tam + response.data.courseRoadmaps[a].course.price
      }
      setpriceroadmapback(priback)
      var disback = 0
      for (const a in response.data.courseRoadmaps) {
        const tam = disback
        disback = tam + response.data.courseRoadmaps[a].course.discount
      }
      setdisroadmapback(disback)

    }).catch((error: any) => {
      console.log(error)

    })
    await api.get(`/roadmaps/6192ce58-3745-473b-9611-f09851581ab9`,

    ).then((response: any) => {
      setdataroadmapfront(response.data)
      var prifront = 0
      for (const a in response.data.courseRoadmaps) {
        const tam = prifront
        prifront = tam + response.data.courseRoadmaps[a].course.price
      }
      setpriceroadmapfront(prifront)
      var disfront = 0
      for (const a in response.data.courseRoadmaps) {
        const tam = disfront
        disfront = tam + response.data.courseRoadmaps[a].course.discount
      }
      setdisroadmapfront(disfront)

    }).catch((error: any) => {
      console.log(error)

    })
  }
  useEffect(() => {
    hangdlegetdataroadmap()
  }, [])


  return (
    <div className="w-[100%] h-[500px] max-lg:!h-[325px] max-md:!h-[550px] max-sm:!h-[450px] bg-[url('https://live.staticflickr.com/65535/52812995427_d741a09e0a_z.jpg')] bg-[length:100%_100%]">
      <div className="mx-auto px-4 max-sm:px-1 max-w-[1400px]">
        {
          dataroadmapfront ?
            <Carousel autoplay >
              <div className="w-[100%] h-[500px] max-lg:!h-[325px] max-md:!h-[550px] max-sm:!h-[450px]">
                <Row gutter={[8, 0]} className="max-md:!flex-col-reverse">
                  <Col
                    md={24} sm={24} xs={24} lg={11} xl={11}
                    className="flex flex-col !justify-center h-[500px] max-lg:!h-[325px] max-md:!h-[100%] items-start space-y-3 max-sm:space-y-0 "
                  >

                    <h2 className="max-lg:text-4xl max-md:text-3xl text-6xl max-md:px-5 max-md:text-center max-md:mx-auto font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0160fa] to-[#1ddbb7]  ">How to become a FullStack developer</h2>
                    <p className=" max-lg:text-sm max-md:text-md text-xl max-md:mx-auto   font-bold text-gray-700 flex justify-start items-center"><FaRoute className="mr-3 max-md:mr-1" />Roadmap to becoming a FullStack developer</p>
                    <p className=" max-lg:text-xs max-md:text-lg text-base  max-md:mx-auto  font-bold text-gray-700">For <span className="text-3xl max-md:text-base max-lg:text-xl font-bold line-through">${priceroadmapfull}</span> <span className="text-3xl max-md:text-base max-lg:text-xl font-bold"> - </span>
                      <span className="text-3xl max-md:text-base max-lg:text-xl  font-bold text-[#01a1fa]">${disroadmapfull}</span></p>
                    <p className="max-lg:text-xs max-md:text-md text-base  max-md:mx-auto  font-bold text-gray-700">Help you master languages: <strong className="text-[#01a1fa]">HTML, CSS, JS, React JS, ...</strong> </p>


                    <Link to={"/roadmap/" + dataroadmapfull.id} className="w-[100%]">
                      <Button
                        type="primary"
                        className="max-sm:text-xs max-sm:!mt-5 max-sm:px-4 max-sm:py-2 !mt-10 bg-gradient-to-r max-md:mx-auto  from-[#024cac] to-[#0492ff] opacity-80 hover:opacity-100 text-base font-bold rounded-full px-8 py-5 flex items-center"
                      >
                        See more
                      </Button>
                    </Link>
                  </Col>
                  <Col md={24} sm={24} xs={24} lg={13} xl={13} className="flex justify-end max-md:mt-5 max-md:mb-8 max-md:justify-center items-center relative">

                    <div className="w-[95%] max-md:!w-[80%] max-md:!h-[250px] max-sm:!h-[170px] max-md:mx-auto h-[80%]  bg-white rounded-3xl shadow-lg shadow-sky-400 flex justify-center items-center">
                      <div className="w-[95%] h-[90%] bg-gradient-to-r from-[#01a1fa] to-[#1dbfdb] rounded-3xl flex justify-center items-center overflow-hidden">
                        <div className="w-[95%] h-[90%] bg-white rounded-2xl flex justify-center items-center overflow-hidden">
                          <video autoPlay muted loop className="h-[100%] w-[100%] object-cover">
                            <source src="https://player.vimeo.com/progressive_redirect/playback/818966526/rendition/360p/file.mp4?loc=external&oauth2_token_id=57447761&signature=695151d6e7e4bfc2c3efd5df84f6637191cf90664a9fbb47f84430cd2c590a08" type="video/mp4" />
                          </video>
                        </div>
                      </div>

                      <img className="max-lg:w-[115px] max-md:w-[100px] max-sm:w-[70px] max-md:left-[10px] max-md:bottom-[7px] max-sm:bottom-[3px] absolute z-1 left-[-30px] bottom-5" src="https://coursesbe.s3.ap-southeast-1.amazonaws.com/6eb83c59-dbae-4e80-97d1-7a7d81f7bcb7-illustration_header_left.png" />

                    </div>
                  </Col>
                </Row>
              </div>
              <div className="w-[100%] h-[500px] max-lg:!h-[325px] max-dm:!h-[550px] max-sm:!h-[450px]">
                <Row gutter={[8, 0]} className="max-md:!flex-col-reverse">
                  <Col
                    md={24} sm={24} xs={24} lg={11} xl={11}
                    className="flex flex-col !justify-center h-[500px] max-lg:!h-[325px] max-md:!h-[100%] items-start space-y-3 max-sm:space-y-0 "
                  >

                    <h2 className="max-lg:text-4xl max-md:text-3xl text-6xl max-md:px-5 max-md:text-center max-md:mx-auto font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0160fa] to-[#1ddbb7]  ">How to become a Back-end developer</h2>
                    <p className=" max-lg:text-sm max-md:text-md text-xl max-md:mx-auto   font-bold text-gray-700 flex justify-start items-center"><FaRoute className="mr-3 max-md:mr-1" />Roadmap to becoming a Back-end developer</p>
                    <p className=" max-lg:text-xs max-md:text-lg text-base  max-md:mx-auto  font-bold text-gray-700">For <span className="text-3xl max-md:text-base max-lg:text-xl font-bold line-through">${priceroadmapback}</span> <span className="text-3xl max-md:text-base max-lg:text-xl font-bold"> - </span>
                      <span className="text-3xl max-md:text-base max-lg:text-xl  font-bold text-[#01a1fa]">${disroadmapback}</span></p>
                    <p className="max-lg:text-xs max-md:text-md text-base  max-md:!mx-auto  font-bold text-gray-700">Help you master languages: <strong className="text-[#01a1fa]">HTML, CSS, JS, MySQL, React JS,...</strong> </p>


                    <Link to={"/roadmap/" + dataroadmapback.id} className="w-[100%]">
                      <Button
                        type="primary"
                        className="max-sm:text-xs max-sm:!mt-5 max-sm:px-4   max-sm:py-2 !mt-10 bg-gradient-to-r max-md:mx-auto  from-[#024cac] to-[#0492ff] opacity-80 hover:opacity-100 text-base font-bold rounded-full px-8 py-5 flex items-center"
                      >
                        See more
                      </Button>
                    </Link>
                  </Col>
                  <Col md={24} sm={24} xs={24} lg={13} xl={13} className="flex justify-end  max-md:justify-center items-center relative">

                    <div className="w-[90%] h-[90%] bg-white rounded-2xl  flex justify-center items-center overflow-hidden">
                      <video autoPlay muted loop className="h-[100%] w-[100%] object-cover">
                        <source src="https://player.vimeo.com/progressive_redirect/playback/818966525/rendition/360p/file.mp4?loc=external&oauth2_token_id=57447761&signature=80a8146522260c32faaf154a0e7bff4c031a78fd0f417267b2ed0174a10bea39" type="video/mp4" />
                      </video>
                    </div>

                  </Col>
                </Row>
              </div>
              <div className="w-[100%] h-[500px] max-lg:!h-[325px] max-dm:!h-[550px]  max-sm:!h-[450px]">
                <Row gutter={[8, 0]} className="max-md:!flex-col-reverse">
                  <Col
                    md={24} sm={24} xs={24} lg={11} xl={11}
                    className="flex flex-col !justify-center h-[500px] max-lg:!h-[325px] max-md:!h-[100%] items-start space-y-3 max-sm:space-y-0 "
                  >

                    <h2 className="max-lg:text-4xl max-md:text-3xl text-6xl max-md:px-5 max-md:text-center max-md:mx-auto font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0160fa] to-[#1ddbb7]  ">How to become a Front-end developer</h2>
                    <p className=" max-lg:text-sm max-md:text-md text-xl max-md:mx-auto   font-bold text-gray-700 flex justify-start items-center"><FaRoute className="mr-3 max-md:mr-1" />Roadmap to becoming a Front-end developer</p>
                    <p className=" max-lg:text-xs max-md:text-lg text-base  max-md:mx-auto  font-bold text-gray-700">For <span className="text-3xl max-md:text-base max-lg:text-xl font-bold line-through">${priceroadmapfront}</span> <span className="text-3xl max-md:text-base max-lg:text-xl font-bold"> - </span>
                      <span className="text-3xl max-md:text-base max-lg:text-xl  font-bold text-[#01a1fa]">${disroadmapfront}</span></p>
                    <p className="max-lg:text-xs max-md:text-md text-base  max-md:mx-auto  font-bold text-gray-700">Help you master languages: <strong className="text-[#01a1fa]">HTML, CSS, JS, React JS, ...</strong> </p>


                    <Link to={"/roadmap/" + dataroadmapfront.id} className="w-[100%]">
                      <Button
                        type="primary"
                        className="max-sm:text-xs max-sm:!mt-5 max-sm:px-4 max-sm:py-2 !mt-10 bg-gradient-to-r max-md:mx-auto  from-[#024cac] to-[#0492ff] opacity-80 hover:opacity-100 text-base font-bold rounded-full px-8 py-5 flex items-center"
                      >
                        See more
                      </Button>
                    </Link>
                  </Col>
                  <Col md={24} sm={24} xs={24} lg={13} xl={13} className="flex justify-end  max-md:justify-center items-center relative">

                    <div className="w-[90%] h-[90%] bg-white rounded-2xl  flex justify-center items-center overflow-hidden">
                      <video autoPlay muted loop className="h-[100%] w-[100%] object-cover">
                        <source src="https://player.vimeo.com/progressive_redirect/playback/818966527/rendition/360p/file.mp4?loc=external&oauth2_token_id=57447761&signature=88d55bc94a29410973fec7701f541a39e0930d6a61b1b53e75d697dd59497b65" type="video/mp4" />
                      </video>
                    </div>

                  </Col>
                </Row>
              </div>
            </Carousel>

            :
            <div className="w-[100%] h-[500px] max-lg:!h-[325px] max-md:!h-[550px] max-sm:!h-[450px]">
              <Row gutter={[8, 0]} className="max-md:!flex-col-reverse">
                <Col
                  md={24} sm={24} xs={24} lg={11} xl={11}
                  className="flex flex-col !justify-center h-[500px] max-lg:!h-[325px] max-md:!h-[100%] items-start space-y-3 max-sm:space-y-0 "
                >

                  <SkeletonInput active className="!w-[80%]" />
                  <Skeleton active paragraph={{ rows: 5 }} className="!w-[80%]" />
                  <SkeletonInput active className="!w-[150px] !rounded-full mt-5" />

                </Col>
                <Col md={24} sm={24} xs={24} lg={13} xl={13} className="flex justify-end max-md:my-8 max-md:justify-center items-center relative">

                  <SkeletonInput active className="!w-[90%] !h-[80%]" />
                </Col>
              </Row>
            </div>

        }

      </div>
    </div>
  );
}

export default SlideBanner;
