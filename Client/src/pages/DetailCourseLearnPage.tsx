import React, { useEffect, useState } from "react";
import { Avatar, Badge, Breadcrumb, Button, Card, Col, Collapse, Divider, Image, Input, Layout, List, Menu, Modal, Rate, Row, Skeleton, Space, Tag, theme } from 'antd';
import HeaderComponent from "../components/HeaderComponent";
import SlideBanner from "../components/SlideBanner";
import SliderRoadmap from "../components/SliderRoadmap";
import TabsCoursesComponent from "../components/TabsCoursesComponent";
import LoadingComponent from "../components/LoadingComponent";
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../store/types";
import AboutUsHomeComponent from "../components/AboutUsHomeComponent";
import FooterComponent from "../components/FooterComponent";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setLoading, unsetLoading } from "../store/loadSlice";
import api from "../configs/axiosConfig";
import { logout } from "../store/authSlice";
import Meta from "antd/es/card/Meta";
import { RiVipCrownFill } from "react-icons/ri";
import { FiArrowLeft } from "react-icons/fi";
import { AiFillFolderOpen, AiFillLike, AiOutlineCheckCircle, AiOutlineFieldTime } from "react-icons/ai";
import { BsCheck2Circle, BsSendFill, BsUnlockFill } from "react-icons/bs";
import { SiYoutubemusic } from "react-icons/si";
import { BiLockOpenAlt, BiUser } from "react-icons/bi";
import InfiniteScroll from "react-infinite-scroll-component";
import { setNotify } from "../store/notifycationSlide";
const { Header, Content, Footer } = Layout;
const { Panel } = Collapse;
import YouTube from 'react-youtube';
import { HiLockClosed } from "react-icons/hi";
import { FcCheckmark } from "react-icons/fc";
import { IoVideocam } from "react-icons/io5";
import { FaUnlock } from "react-icons/fa";
import { GrNext } from "react-icons/gr";


function DetailCourseLearnPage() {

    const loading = useSelector((state: RootState) => state.root.load)
    const [loaddingas, setloaddingas] = useState(false)
    const [courses, setcourses] = useState<any>(null)
    const auth = useSelector((state: RootState) => state.root.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();
    const [watched, setWatched] = useState(false);

    const [idSectionnext, setidSectionnext] = useState("")
    const [idlecturenext, setidlecturenext] = useState("")

    const [checksub, setchecksub] = useState(false)
    const [s, sets] = useState(0)
    const [l, setl] = useState(0)
    const [scs, setscs] = useState(null)
    const [lcl, setlcl] = useState(null)
    const [apor, setapor] = useState([])



    const opts = {
        playerVars: {
            controls: 0
        }
    };

    const onPlayerStateChange = (event) => {
        if (event.data === 0 && !watched) {
            setWatched(true);
            console.log("xem hết video")
            console.log(headers)
            if (scs != null || lcl != null) {
                getlearncompleted(null)
            }
        }

        if (event.data === 2 && !watched) {
            // event.target.seekTo(0);
            dispatch(setNotify({ typeNotify: "warning", titleNotify: "Please watch the video carefully!", messageNotify: 'You are watching the video too fast' }))
        }
    };

    const onSeeking = (event) => {
        console.log("seeking")
    }

    const onSeeked = (event) => {
        console.log("seeked")
    }

    useEffect(() => {
        setWatched(false);
    }, [location.pathname])



    const headers = {
        accept: '*/*',
        Authorization: 'Bearer ' + auth.user.accessToken,
    };


    const getlearncompleted = async (videoUrl: any) => {
        console.log(idSectionnext, idlecturenext)
        const data = {}
        await api.put(`/sections/${idSectionnext}/lectures/${idlecturenext}/completed`, {}, { headers }
        ).then((response: any) => {

            if (videoUrl != null) {
                navigate("/learn/" + location.pathname.split("/")[2] + `?s=${scs}&l=${lcl}`)
                window.open(videoUrl, "_blank")
            } else {
                navigate("/learn/" + location.pathname.split("/")[2] + `?s=${scs}&l=${lcl}`)

            }

        }).catch((error: any) => {
            console.log(error)

        })

    }

    const getCourseSubscribe = async () => {
        setloaddingas(true)
        await api.get('/courses/' + location.pathname.split("/")[2] + '/subscribe/user',
            {
                headers
            },

        ).then((response: any) => {
            if (response.status === 200) {
                setcourses(response.data.course)
                var afsgn = []
                if (response.data.course.userProgress.length > 0) {
                    for (const accs in response.data.course.userProgress) {
                        afsgn.push(response.data.course.userProgress[accs].lectureId)
                    }
                    setapor(afsgn)
                }

                var aaa = ""
                var bbb = ""
                var ccc = true
                const ssss = Number(location.search.split("&")[0].split("=")[1])
                const llll = Number(location.search.split("&")[1].split("=")[1])
                if (response.data.course.sections.length > ssss + 1) {


                    if (response.data.course.sections[ssss].lectures.length > llll + 1) {
                        if (!afsgn.includes(response.data.course.sections[ssss].lectures[llll + 1].id)) {
                            aaa = response.data.course.sections[ssss].id
                            bbb = response.data.course.sections[ssss].lectures[llll + 1].id
                            setscs(ssss)
                            setlcl(llll + 1)

                        }
                    } else {
                        console.log("sai")
                        if (response.data.course.sections[ssss + 1].lectures.length > 0) {
                            aaa = response.data.course.sections[ssss + 1].id
                            bbb = response.data.course.sections[ssss + 1].lectures[0].id
                            setscs(ssss + 1)
                            setlcl(0)


                        }
                    }
                    setidSectionnext(aaa)
                    setidlecturenext(bbb)
                }


                setloaddingas(false)

            }
        }).catch((error: any) => {
            console.log(error)
            // navigate('/')

        })

    }




    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
    useEffect(() => {

        getCourseSubscribe()

        if (location.search) {
            sets(Number(location.search.split("&")[0].split("=")[1]))
            setl(Number(location.search.split("&")[1].split("=")[1]))
        }


    }, [location.search])



    return (
        <Layout className="layout bg-white">
            <HeaderComponent item="courses" />
            <Content className="pt-[70px]">
                <div className="site-layout-content w-[100%] pb-10 max-w-[1400px] mx-auto" >
                    {
                        loaddingas ? <>
                            <Row className="px-8" gutter={[24, 24]}>
                                <Col xs={24} sm={24} md={24} lg={18} xl={18}>
                                    <Skeleton.Button active className="!w-[100px] !h-[30px] !mt-2" />
                                    <Skeleton.Image active className="!w-[100%]  !h-[450px] max-md:!h-[275px] !my-2" />
                                    <Skeleton.Button active className="!w-[80%] !h-[50px] !mt-2" />
                                    <Skeleton active paragraph={{ rows: 4 }} title={null} className="!mt-8" />

                                </Col>
                                <Col xs={24} sm={24} md={24} lg={6} xl={6}>

                                    <Skeleton.Button active className="!w-[100%] !h-[200px] !mt-7" />
                                    <Skeleton active paragraph={{ rows: 5 }} title={null} className="!mt-12" />

                                </Col>

                            </Row>

                        </> : <>
                            {
                                courses ?
                                    <>
                                        <Row className="px-8" gutter={[24, 24]}>
                                            <Col xs={24} sm={24} md={24} lg={18} xl={18} >
                                                <Link to="/courses/" className="flex justify-start items-center space-x-1 my-2 text-base font-semibold"><FiArrowLeft /><span>Back</span></Link>

                                                {courses.sections[0] ? <>
                                                    {
                                                        courses.sections[0].lectures && courses.sections[0].lectures[0] ? <>
                                                            <div className="!w-[100%] !h-[470px] max-md:!h-[275px] overflow-hidden rounded-md text-center ">
                                                                {
                                                                    courses.sections[s].lectures[l].videoUrl.split("/")[2] == "wizcoveit.netlify.app" ?
                                                                        <div className="w-[100%] h-[100%] flex justify-center max-sm:flex-col-reverse max-sm:space-y-2 items-center">
                                                                            <Button onClick={() => {
                                                                                if (scs != null || lcl != null) {
                                                                                    getlearncompleted(courses.sections[s].lectures[l].videoUrl)
                                                                                } else {
                                                                                    console.log(12321321)
                                                                                    window.open(courses.sections[s].lectures[l].videoUrl, "_blank")
                                                                                }

                                                                            }} className="flex justify-center items-center space-x-2 text-base bg-green-600 hover:!bg-green-500 max-sm:text-sm max-sm:space-x-1 max-sm:px-2 " type="primary"><IoVideocam /><span> Join Meet</span></Button>
                                                                            <img className='max-sm:w-[190px] max-md:w-[350px] max-lg:w-[500px]' src='https://coursesbe.s3.ap-southeast-1.amazonaws.com/4d63594d-e135-41b3-947a-53d7c9d46119-01-google-workspace.jpg' />

                                                                        </div>
                                                                        :
                                                                        <YouTube
                                                                            id="videofrom-youtubebe"
                                                                            videoId={courses.sections[s].lectures[l].videoUrl}
                                                                            onStateChange={onPlayerStateChange}
                                                                        />
                                                                }

                                                                {/* <iframe width='100%' height="100%" className="mx-auto" src={"https://www.youtube.com/embed/" + courses.sections[s].lectures[l].videoUrl} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe> */}
                                                            </div>
                                                            <div className="flex justify-between items-end">
                                                                <h5 className="mt-5 font-bold text-2xl ">{courses.sections[s].lectures[l].name}</h5>
                                                                <Button onClick={() => {
                                                                    if (scs != null || lcl != null) {
                                                                        getlearncompleted(null)
                                                                    } else {

                                                                    }

                                                                }} className="flex justify-center items-center space-x-2 text-black border-spacing-1 border-black shadow-none hover:!bg-gray-50  max-sm:text-sm max-sm:space-x-1 max-sm:px-2 hover:!text-gray-800 " type="primary">Next <GrNext /></Button>

                                                            </div>
                                                            <p className="mt-5  text-md">{courses.sections[s].lectures[l].description}</p>

                                                        </> : <></>
                                                    }
                                                </> : <></>}

                                            </Col>

                                            <Col xs={24} sm={24} md={24} lg={6} xl={6} className="mt-10 max-h-[80vh] overflow-y-auto lecture-scroll-class-style">

                                                {
                                                    courses.sections[0] ?
                                                        <Collapse defaultActiveKey={[s]} >{
                                                            courses.sections.map((section, index) => {
                                                                return <Panel className="bg-slate-50" header={
                                                                    <div className='flex justify-between items-center '>
                                                                        <h5 className='text-base font-semibold truncate w-[250px] max-md:w-[400px] max-lg:w-[500px] max-sm:w-[200px]'>Section {(index + 1) + ": " + section.name}</h5>
                                                                    </div>}

                                                                    key={index}>
                                                                    {
                                                                        section.lectures[0] ?
                                                                            <>
                                                                                {

                                                                                    section.lectures.map((lecture, indexs) => {
                                                                                        if (index == 0 && indexs == 0) {


                                                                                            return <> <div onClick={() => {

                                                                                                navigate('/learn/' + location.pathname.split("/")[2] + "?s=" + index + "&l=" + indexs)

                                                                                            }} className={s == index && l == indexs ? 'flex bg-gray-200 !justify-between items-center py-4 border-2 px-3 rounded-sm border-gray-200 cursor-pointer hover:bg-slate-200 ' : 'flex  !justify-between items-center py-4 border-2 px-3 rounded-sm border-gray-200 cursor-pointer hover:bg-slate-200 '}>
                                                                                                <div className='justify-start items-center space-x-3 flex'>
                                                                                                    {
                                                                                                        lecture.videoUrl.split("/")[2] == "wizcoveit.netlify.app" ?
                                                                                                            <IoVideocam className='text-green-500 text-base' />
                                                                                                            : <SiYoutubemusic className='text-green-500 text-base' />
                                                                                                    }
                                                                                                    <p className='truncate w-[195px] max-md:w-[400px] max-lg:w-[220px] max-sm:w-[100px]'>{lecture.name}</p>
                                                                                                </div>

                                                                                                <div>

                                                                                                    <BsUnlockFill className="text-green-500" />

                                                                                                </div>
                                                                                            </div>

                                                                                                {lecture.resources.length > 0 ?
                                                                                                    <a href={lecture.resources[0].fileUploadUrl} target="_ blank">
                                                                                                        <div className="border-[1px] px-3 py-2 flex justify-start items-center space-x-2">
                                                                                                            <AiFillFolderOpen className="text-2xl" />
                                                                                                            <p className="truncate !text-xs">{lecture.resources[0].fileUpload.fileName}</p>
                                                                                                        </div>

                                                                                                    </a>
                                                                                                    :
                                                                                                    null
                                                                                                }
                                                                                            </>

                                                                                        }
                                                                                        if (!apor.includes(lecture.id)) {
                                                                                            return <div className='flex justify-between items-center py-4 border-2 px-3 rounded-sm  border-gray-200 cursor-default '>
                                                                                                <div className='justify-start items-center space-x-3 flex'>
                                                                                                    {
                                                                                                        lecture.videoUrl.split("/")[2] == "wizcoveit.netlify.app" ?
                                                                                                            <IoVideocam className='text-gray-600 text-base' />
                                                                                                            : <SiYoutubemusic className='text-gray-600 text-base' />
                                                                                                    }
                                                                                                    <p className='truncate  w-[195px] max-md:w-[400px] max-lg:w-[220px] max-sm:w-[100px]'>{lecture.name}</p>
                                                                                                </div>


                                                                                                <div>
                                                                                                    <HiLockClosed className="text-gray-600" />
                                                                                                </div>
                                                                                            </div>

                                                                                        }
                                                                                        return <> <div onClick={() => {

                                                                                            navigate('/learn/' + location.pathname.split("/")[2] + "?s=" + index + "&l=" + indexs)

                                                                                        }} className={s == index && l == indexs ? 'flex bg-gray-200 !justify-between items-center py-4 border-2 px-3 rounded-sm border-gray-200 cursor-pointer hover:bg-slate-200 ' : 'flex  !justify-between items-center py-4 border-2 px-3 rounded-sm border-gray-200 cursor-pointer hover:bg-slate-200 '}>
                                                                                            <div className='justify-start items-center space-x-3 flex'>
                                                                                                {
                                                                                                    lecture.videoUrl.split("/")[2] == "wizcoveit.netlify.app" ?
                                                                                                        <IoVideocam className='text-green-500 text-base' />
                                                                                                        : <SiYoutubemusic className='text-green-500 text-base' />
                                                                                                }

                                                                                                <p className='truncate w-[195px] max-md:w-[400px] max-lg:w-[220px] max-sm:w-[100px]'>{lecture.name}</p>
                                                                                            </div>

                                                                                            <div>

                                                                                                <BsUnlockFill className="text-green-500" />


                                                                                            </div>
                                                                                        </div>
                                                                                            {lecture.resources.length > 0 ?
                                                                                                <a href={lecture.resources[0].fileUploadUrl} target="_ blank">
                                                                                                    <div className="border-[1px] px-3 py-2 flex justify-start items-center space-x-2">
                                                                                                        <AiFillFolderOpen className="text-2xl" />
                                                                                                        <p className="truncate !text-xs">{lecture.resources[0].fileUpload.fileName}</p>
                                                                                                    </div>

                                                                                                </a>
                                                                                                :
                                                                                                null
                                                                                            }
                                                                                        </>
                                                                                    })
                                                                                }

                                                                            </>
                                                                            : null
                                                                    }
                                                                </Panel>
                                                            })}
                                                        </Collapse>
                                                        : null
                                                }





                                            </Col>

                                        </Row>


                                    </>

                                    : null
                            }

                        </>
                    }

                </div>
            </Content>
            <FooterComponent />
            <Footer style={{ textAlign: 'center' }}>Copyright ©2023 Wizcove IT</Footer>
            {
                loading.isLoading ?
                    <LoadingComponent /> : null
            }

        </Layout>

    );
}

export default DetailCourseLearnPage;