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
import { AiFillLike, AiFillStar, AiOutlineCheckCircle, AiOutlineFieldTime } from "react-icons/ai";
import { BsBookHalf, BsCheck2Circle, BsSendFill } from "react-icons/bs";
import { SiYoutubemusic } from "react-icons/si";
import { BiUser } from "react-icons/bi";
import InfiniteScroll from "react-infinite-scroll-component";
import { setNotify } from "../store/notifycationSlide";
import { IoVideocam } from "react-icons/io5";
import { FaCartPlus, FaUserAlt } from "react-icons/fa";
import { MdCollectionsBookmark } from "react-icons/md";
import { setstatus } from "../store/statusSlics";
const { Header, Content, Footer } = Layout;
const { Panel } = Collapse;


function DetailCoursesPage() {

    const loading = useSelector((state: RootState) => state.root.load)
    const [loaddingas, setloaddingas] = useState(false)
    const [courses, setcourses] = useState<any>(null)
    const auth = useSelector((state: RootState) => state.root.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();
    const [showmodalviewvd, setshowmodalviewvd] = useState(false)
    const [datareview, setdatareview] = useState<any>(null)
    const [rating, setrating] = useState(null)
    const [valuerating, setvaluerating] = useState(5)
    const [valuecontent, setvaluecontent] = useState("")
    const [datasub, setdatasub] = useState([])
    const [checksub, setchecksub] = useState(false)


    const hangdlegetdatareviews = async () => {

        await api.get('/courses/' + location.pathname.split("/")[2] + "/review",
        ).then((response: any) => {

            var totalrating = 0
            if (response.data.items[0]) {
                const reviewss = response.data.items
                for (const re in reviewss) {
                    let tam = totalrating + reviewss[re].rating
                    totalrating = tam

                }
                console.log(response.data)
                setrating(totalrating / response.data.total)
            }
            setdatareview(response.data.items)

        }).catch((error: any) => {

            console.log(error)

        })

    }



    const headers = {
        accept: '*/*',
        Authorization: 'Bearer ' + auth.user?.accessToken,
    };

    const handeladdcart = async () => {

        if (auth.isAuthenticated) {
            await api.post('/course/' + location.pathname.split("/")[2] + '/cart/', {},
                {
                    headers
                },

            ).then((response: any) => {
                if (response.status === 201) {
                    dispatch(setNotify({ typeNotify: "success", titleNotify: "Add to cart successful!", messageNotify: 'You add to cart successful' }))
                    dispatch(setstatus())

                }
            }).catch((error: any) => {
                console.log(error)
                dispatch(setNotify({ typeNotify: "error", titleNotify: "Add to cart unsuccessful!", messageNotify: 'You add to cart unsuccessful' }))

            })
        } else {
            dispatch(setNotify({ typeNotify: "error", titleNotify: "Add to cart unsuccessful!", messageNotify: 'You add to cart unsuccessful' }))
        }


    }

    const handlecreatereview = async () => {


        dispatch(setLoading({}))
        await api.post('/courses/' + location.pathname.split("/")[2] + "/review",
            {
                content: valuecontent,
                rating: valuerating
            },

            {
                headers
            },

        ).then((response: any) => {
            if (response.status === 201) {
                hangdlegetdatareviews()
                dispatch(unsetLoading({}))
                setvaluerating(5)
                setvaluecontent('')
                hangdlegetdatacourses()

            }
        }).catch((error: any) => {
            console.log(error)
            dispatch(setNotify({ typeNotify: "error", titleNotify: "Review unsuccessful!", messageNotify: error.response.data.message }))
            dispatch(unsetLoading({}))

        })



    }


    const handellearncourse = async () => {
        console.log(location.pathname.split("/")[2])
        if (!auth.isAuthenticated) {
            dispatch(setNotify({ typeNotify: "warning", titleNotify: "Pleace Sign in!", messageNotify: "Sign in to continue" }))
            return
        }
        await api.post('/courses/' + location.pathname.split("/")[2] + '/subscribe/',
            {
                headers
            },

        ).then((response: any) => {
            if (response.status === 201) {
                dispatch(setNotify({ typeNotify: "success", titleNotify: "Subscribe Course successful!", messageNotify: "You subscribe Course successful!" }))
            }
        }).catch((error: any) => {
            console.log(error)
            dispatch(setNotify({ typeNotify: "error", titleNotify: "Subscribe unsuccessful!", messageNotify: error.response.data.message }))
        })

    }


    const getCourseSubscribe = async () => {

        await api.get('/users/my-courses/',
            {
                headers
            },

        ).then((response: any) => {
            if (response.status === 200) {
                console.log(response)
                for (var addf in response.data) {
                    if (response.data[addf].courseId == location.pathname.split("/")[2]) {
                        setchecksub(true)
                    }
                }
            }

        }).catch((error: any) => {
            console.log(error)


        })

    }

    const hangdlepayment = async () => {
        if (!auth.isAuthenticated) {
            dispatch(setNotify({ typeNotify: "warning", titleNotify: "Pleace Sign in!", messageNotify: "Sign in to continue" }))
            return
        }

        console.log(location.pathname.split("/")[2])
        const data = {
            courseIds: [location.pathname.split("/")[2]]
        }
        await api.post('/payment/checkout-info',
            data,
            {
                headers
            }
        ).then((response: any) => {
            window.location = response.data.url
            setloaddingas(false)
        }).catch((error: any) => {
            console.log(error)
            setloaddingas(false)
        })
    }


    const hangdlegetdatacourses = async () => {
        setloaddingas(true)
        await hangdlegetdatareviews()
        if (auth.isAuthenticated) {
            await getCourseSubscribe()

        }
        console.log(location.pathname.split("/")[2])
        await api.get('/courses/' + location.pathname.split("/")[2],

        ).then((response: any) => {
            setcourses(response.data)
            setloaddingas(false)
        }).catch((error: any) => {
            console.log(error)

        })
    }
    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
    useEffect(() => {


        hangdlegetdatacourses()
        dispatch(unsetLoading({}))

    }, [location.pathname])

    return (
        <Layout className="layout bg-white">
            <HeaderComponent item="courses" />
            <Content className="pt-[70px]">
                <div className="site-layout-content w-[100%] pb-10 max-w-[1400px] mx-auto " >
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
                                                            <div className="!w-[100%] !h-[470px] max-md:!h-[275px] overflow-hidden rounded-md text-center">
                                                                <iframe width='100%' height="100%" className="mx-auto" src={"https://www.youtube.com/embed/" + courses.sections[0].lectures[0].videoUrl} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
                                                            </div>

                                                        </> : <></>
                                                    }
                                                </> : <></>}
                                                <h5 className="mt-5 font-bold text-2xl ">{courses.name}</h5>
                                                <p className="mt-5  text-md">{courses.headline}</p>
                                                <h5 className="mt-5 font-bold text-base ">Description course</h5>
                                                <p className="mt-3  text-md">{courses.description}</p>
                                                <div className=" items-start">
                                                    <div className="rounded-lg shadow-md !border-[0.4px] border-gray-400 px-5 py-2 mt-4">
                                                        <h5 className=" font-bold text-base ">Requirements to join the course</h5>
                                                        <Row gutter={[24, 24]} className="">
                                                            {
                                                                courses.requirements ? <>{courses.requirements.map((requirement) => {
                                                                    return <Col span={12}>

                                                                        <div className="my-2 space-x-1 flex items-center justify-start text-gray-800" key={requirement}><BsCheck2Circle className="!w-[50px]" /><span>{requirement}</span></div>
                                                                    </Col>
                                                                })}</> : null
                                                            }

                                                        </Row>

                                                    </div>
                                                    <div className="rounded-lg shadow-md !border-[0.4px] border-gray-400 px-5 py-1 mt-4">
                                                        <h5 className=" font-bold text-base ">Benefits</h5>
                                                        <Row gutter={[24, 24]} className="">
                                                            {
                                                                courses.benefits ? <>{courses.benefits.map((benefit) => {
                                                                    return <Col span={12}>
                                                                        <div className="my-2 space-x-1 flex items-center justify-start text-gray-800" key={benefit}><BsCheck2Circle className="!w-[50px]" /><span>{benefit}</span></div>
                                                                    </Col>
                                                                })}</> : null
                                                            }
                                                        </Row>
                                                    </div>
                                                </div>




                                            </Col>
                                            <Col xs={24} sm={24} md={24} lg={6} xl={6} className="text-center">

                                                <img className="mt-10 rounded-md w-[100%] h-[200px] " src={courses.image} />
                                                {
                                                    courses.discount <= 0 ? <p className="mt-4 text-lg text-green-600 font-bold">Free </p> : <>
                                                        <p className="mt-4 text-lg font-bold">Discounted price of </p>
                                                        <p className="text-base font-bold"> <span className="line-through text-gray-500">${courses.price}</span>
                                                            <span className=" text-xl text-blue-600"> ${courses.discount}</span></p>
                                                    </>
                                                }
                                                {
                                                    courses.sections.length == 0 ?
                                                        <Button type="primary" className="bg-gray-400 hover:!bg-gray-400 w-[80%] h-[40px] font-bold mt-3 max-sm:text-xs cursor-default">Not started yet</Button> :
                                                        <>
                                                            {courses.discount <= 0 ?
                                                                <>{checksub ? <Link to={"/learn/" + location.pathname.split("/")[2] + "?s=0&l=0"}><Button type="primary" className="bg-gray-500 w-[80%] h-[40px] hover:!bg-gray-600 font-bold mt-3 max-sm:text-xs ">Learn continue</Button></Link>
                                                                    : <Button type="primary" onClick={() => { handellearncourse() }} className="bg-gradient-to-r w-[80%] h-[40px] from-blue-600 to-cyan-600 hover:bg-blue-600 font-bold mt-3 max-sm:text-xs ">Learn Now</Button>
                                                                }</> :
                                                                <>{checksub ? <Link to={"/learn/" + location.pathname.split("/")[2] + "?s=0&l=0"}><Button type="primary" className="bg-gray-500 w-[80%] h-[40px] hover:!bg-gray-600 font-bold mt-3 max-sm:text-xs ">Learn continue</Button></Link>
                                                                    : <div className="flex justify-between items-center space-x-2">
                                                                        <Button type="primary" onClick={hangdlepayment} className="bg-gradient-to-r w-[80%] h-[40px] from-blue-600 to-cyan-600 hover:bg-blue-600 font-bold mt-3 max-sm:text-xs ">Buy Now</Button>
                                                                        <Button type="primary" onClick={handeladdcart} className="h-[40px] mt-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:bg-blue-600 font-bold text-xl "><FaCartPlus /></Button>

                                                                    </div>
                                                                }</>

                                                            }
                                                        </>
                                                }
                                                <div className="w-[100%] pl-20 py-4">
                                                    <p className="mt-4 text-sm text-gray-600 font-semibold flex justify-start items-center space-x-2 "><AiFillLike className="text-lg" /><span>{courses.level == 1 ? "Basic course" : "Advanced course"}</span></p>
                                                    <p className="mt-4 text-sm text-gray-600 font-semibold flex justify-start items-center space-x-2 "><AiOutlineFieldTime className="text-lg" /><span>Learn anytime, anywhere</span></p>
                                                    {
                                                        courses.courseKeyMetric ?
                                                            <>
                                                                <p className="mt-4 text-sm text-gray-600 font-semibold flex justify-start items-center space-x-2 "><FaUserAlt className="text-base" /><span>{courses.courseKeyMetric.currentSubscribers} Students</span></p>
                                                                <p className="mt-4 text-sm text-gray-600 font-semibold flex justify-start items-center space-x-2 ">< MdCollectionsBookmark className="text-base" /><span>{courses.courseKeyMetric.totalSections} Sections</span></p>
                                                                <p className="mt-4 text-sm text-gray-600 font-semibold flex justify-start items-center space-x-2 ">< BsBookHalf className="text-base" /><span>{courses.courseKeyMetric.totalLectures} Lectures</span></p>

                                                            </>
                                                            : <></>
                                                    }


                                                </div>


                                            </Col>
                                            <Col xs={24} sm={24} md={24} lg={18} xl={18} >
                                                <h5 className="text-lg font-bold mb-4">Content course</h5>
                                                {
                                                    courses.sections[0] ?
                                                        <Collapse defaultActiveKey={['0']} >{
                                                            courses.sections.map((section, index) => {
                                                                return <Panel className="bg-slate-50" header={
                                                                    <div className='flex justify-between items-center '>
                                                                        <h5 className='text-base font-semibold truncate w-[1200px] max-md:w-[400px] max-lg:w-[900px] max-sm:w-[200px]'>Section {(index + 1) + ": " + section.name}</h5>
                                                                    </div>}

                                                                    key={index}>
                                                                    {
                                                                        section.lectures[0] ?
                                                                            <>
                                                                                {
                                                                                    section.lectures.map(lecture => {
                                                                                        return <div className='flex justify-between items-center py-4 border-2 px-3 rounded-sm border-gray-200'>
                                                                                            <div className='flex justify-start items-center space-x-3 '>
                                                                                                {
                                                                                                    lecture.videoUrl.split("/")[2] == "wizcoveit.netlify.app" ?
                                                                                                        <IoVideocam className='text-gray-600 text-base' />
                                                                                                        : <SiYoutubemusic className='text-gray-600 text-base' />
                                                                                                }
                                                                                                <p className='truncate w-[1200px] max-md:w-[400px] max-lg:w-[900px] max-sm:w-[200px]'>{lecture.name}</p>
                                                                                            </div>
                                                                                            <div>
                                                                                            </div>
                                                                                        </div>
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



                                                <div className="flex items-center space-x-2 justify-start py-5 max-sm:flex-col">

                                                    {
                                                        datareview ? <>
                                                            <div className="flex justify-start  ">
                                                                {rating != 0 ? <div className="flex justify-start  items-center space-x-1 text-lg font-bold mt-4"><AiFillStar className="text-yellow-400 text-2xl max-sm:text-sm" /><span>{Number.parseFloat(courses.courseKeyMetric.rating ?? 0).toFixed(1) + " course rating. " + courses.courseKeyMetric.totalReviews + " ratings"}</span></div> :
                                                                    <Rate disabled defaultValue={0} />
                                                                }
                                                            </div>
                                                            <div className="mx-auto">
                                                                <Button onClick={() => { setshowmodalviewvd(true) }} className="mt-5  text-md   flex justify-center items-center" >See reviews </Button>



                                                            </div>


                                                        </> :
                                                            <Button onClick={() => { setshowmodalviewvd(true) }} className="mt-5 w-[250px] mx-auto text-md bg-blue-600" type="primary">There are no reviews yet</Button>
                                                    }

                                                </div>
                                                <>
                                                    {
                                                        datareview ?
                                                            <div
                                                                // id="scrollableDiv"
                                                                style={{
                                                                    // height: 400,
                                                                    overflow: 'auto',
                                                                    padding: '0 16px',
                                                                    border: '1px solid rgba(140, 140, 140, 0.35)',
                                                                }}
                                                            >
                                                                <InfiniteScroll
                                                                    dataLength={datareview.length}
                                                                    next={hangdlegetdatareviews}
                                                                    hasMore={datareview.length > 100}
                                                                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                                                                    // endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                                                                    scrollableTarget="scrollableDiv"
                                                                >
                                                                    <List
                                                                        dataSource={datareview.length > 4 ? datareview.slide(0, 3) : datareview}
                                                                        renderItem={(item) => (
                                                                            <List.Item key={item?.id} className="bg-gray-50 my-2 rounded-md !px-2">
                                                                                <List.Item.Meta
                                                                                    avatar={<Avatar src={item.user.avatar ? item.user.avatar : "https://live.staticflickr.com/65535/52813965210_ca9d9cd3a9_w.jpg"} />}
                                                                                    title={<p className="font-semibold">{item.user.lastName + " " + item.user.firstName + " "}

                                                                                        <span>{item.user.role == "admin" ? <Tag color="cyan">Admin</Tag> : <>
                                                                                            {
                                                                                                item.user.role == "user" ? <Tag>Student</Tag> : <Tag>Teacher</Tag>
                                                                                            }
                                                                                        </>}</span></p>}
                                                                                    description={item.content}
                                                                                />
                                                                                <div><Rate disabled defaultValue={item.rating} className="text-xs space-x-0" /></div>
                                                                            </List.Item>
                                                                        )}
                                                                    />
                                                                </InfiniteScroll>
                                                            </div> :
                                                            <div
                                                                id="scrollableDiv"
                                                                style={{
                                                                    height: 400,
                                                                    overflow: 'auto',
                                                                    padding: '0 16px',
                                                                    border: '1px solid rgba(140, 140, 140, 0.35)',
                                                                }}
                                                            >
                                                                <Divider plain>It is all, nothing more 🤐</Divider>

                                                            </div>
                                                    }
                                                </>


                                            </Col>

                                        </Row>
                                        <>
                                            <Modal open={showmodalviewvd} footer={null} onCancel={() => { setshowmodalviewvd(false) }}>
                                                <div className="flex justify-start items-start space-x-2 border-b-2 py-3">
                                                    <img src={courses.image} className="w-[100px] rounded-sm" />
                                                    <div>

                                                        <h3 className="truncate w-[370px] max-md:w-[170px] text-base font-bold mb-2">{courses.name}</h3>
                                                        <p className="truncate w-[370px] max-md:w-[170px] text-sm">{courses.headline}</p>
                                                        {
                                                            datareview ? <>
                                                                {
                                                                    rating ? <><Rate disabled defaultValue={rating} className="text-sm space-x-1" /></> :
                                                                        <Rate disabled defaultValue={0} className="text-sm space-x-1" />
                                                                }
                                                            </> :
                                                                <Rate disabled defaultValue={0} className="text-sm space-x-1" />
                                                        }


                                                    </div>
                                                </div>
                                                {
                                                    datareview ?
                                                        <div
                                                            id="scrollableDiv"
                                                            style={{
                                                                height: 400,
                                                                overflow: 'auto',
                                                                padding: '0 16px',
                                                                border: '1px solid rgba(140, 140, 140, 0.35)',
                                                            }}
                                                        >
                                                            <InfiniteScroll
                                                                dataLength={datareview.length}
                                                                next={hangdlegetdatareviews}
                                                                hasMore={datareview.length > 100}
                                                                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                                                                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                                                                scrollableTarget="scrollableDiv"
                                                            >
                                                                <List
                                                                    dataSource={datareview}
                                                                    renderItem={(item) => (
                                                                        <List.Item key={item?.id} className="bg-gray-50 my-2 rounded-md !px-2">
                                                                            <List.Item.Meta
                                                                                avatar={<Avatar src={item.user.avatar ? item.user.avatar : "https://live.staticflickr.com/65535/52813965210_ca9d9cd3a9_w.jpg"} />}
                                                                                title={<p className="font-semibold">{item.user.lastName + " " + item.user.firstName + " "}

                                                                                    <span>{item.user.role == "admin" ? <Tag color="cyan">Admin</Tag> : <>
                                                                                        {
                                                                                            item.user.role == "user" ? <Tag>Student</Tag> : <Tag>Teacher</Tag>
                                                                                        }
                                                                                    </>}</span></p>}
                                                                                description={item.content}
                                                                            />
                                                                            <div><Rate disabled defaultValue={item.rating} className="text-xs space-x-0" /></div>
                                                                        </List.Item>
                                                                    )}
                                                                />
                                                            </InfiniteScroll>
                                                        </div> :
                                                        <div
                                                            id="scrollableDiv"
                                                            style={{
                                                                height: 400,
                                                                overflow: 'auto',
                                                                padding: '0 16px',
                                                                border: '1px solid rgba(140, 140, 140, 0.35)',
                                                            }}
                                                        >
                                                            <Divider plain>It is all, nothing more 🤐</Divider>

                                                        </div>
                                                }
                                                <>
                                                    {
                                                        auth.isAuthenticated ? <>
                                                            <div className="bg-slate-50 p-3 rounded-md mt-2">
                                                                <h5 className="text-base font-semibold mb-2 text-black">Write a review</h5>
                                                                <span>
                                                                    <Rate tooltips={desc} onChange={setvaluerating} value={valuerating} />
                                                                    {valuerating ? <span className="ant-rate-text">{desc[valuerating - 1]}</span> : ''}
                                                                </span>
                                                                <div className="my-2 flex justify-between items-center space-x-2">
                                                                    <Input onChange={e => { setvaluecontent(e.target.value) }} value={valuecontent} placeholder="..." className="" />

                                                                    {
                                                                        valuecontent.length > 3 ?
                                                                            <Button onClick={() => { handlecreatereview() }}><BsSendFill /></Button>
                                                                            : <Button disabled><BsSendFill /></Button>
                                                                    }

                                                                </div>

                                                            </div>
                                                        </> : null
                                                    }


                                                </>



                                            </Modal>

                                        </>


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

export default DetailCoursesPage;