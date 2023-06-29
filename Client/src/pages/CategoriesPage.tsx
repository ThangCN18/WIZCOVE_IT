

import React, { useEffect, useState } from "react";
import { Avatar, Badge, Breadcrumb, Button, Card, Col, Divider, Empty, Layout, Menu, Rate, Row, Skeleton, Space, Tabs, theme } from 'antd';
import HeaderComponent from "../components/HeaderComponent";
import SlideBanner from "../components/SlideBanner";
import SliderRoadmap from "../components/SliderRoadmap";
import TabsCoursesComponent from "../components/TabsCoursesComponent";
import LoadingComponent from "../components/LoadingComponent";
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../store/types";
import AboutUsHomeComponent from "../components/AboutUsHomeComponent";
import FooterComponent from "../components/FooterComponent";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { setLoading, unsetLoading } from "../store/loadSlice";
import api from "../configs/axiosConfig";
import { logout } from "../store/authSlice";
import Meta from "antd/es/card/Meta";
import { RiVipCrownFill } from "react-icons/ri";
import CardCourseItemComponent from "../components/CardCourseItemComponent";
const { Header, Content, Footer } = Layout;
import type { TabsProps } from 'antd';
import SkeletonImage from "antd/es/skeleton/Image";
import SkeletonInput from "antd/es/skeleton/Input";
import SkeletonButton from "antd/es/skeleton/Button";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


function CategoriesPage() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const loading = useSelector((state: RootState) => state.root.load)
    const [loaddingas, setloaddingas] = useState(false)
    const [datacourses, setdatacourses] = useState<any[]>([])
    const auth = useSelector((state: RootState) => state.root.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation()

    const [title, settitle] = useState("Category")


    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 590 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 589, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };
    var adex = []


    const headers = {
        Accept: '*/*',
        Authorization: 'Bearer ' + auth.user?.accessToken,
    };
    var aaaa = []

    const getCourseSubscribe = async () => {

        await api.get('/users/my-courses/',
            {
                headers
            },

        ).then(async (response: any) => {
            if (response.status === 200) {
                console.log(response)
                for (var addf in response.data) {
                    aaaa.push(response.data[addf].courseId)
                }
            }

        }).catch((error: any) => {
            console.log(error)


        })

    }


    const hangdlegetdatacourses = async () => {
        setloaddingas(true)
        if (auth.isAuthenticated) {
            await getCourseSubscribe()
        }
        const parama = location.pathname.split("/")[2]
        await api.get(`courses?category=${parama}`,

        ).then((response: any) => {
            const data = response.data.items
            settitle(`Category ${response.data.category.name}`)
            console.log(response.data.items)
            adex = data.map((course) => {
                if (aaaa.includes(course.id)) {
                    return <Col xs={24} sm={24} md={12} lg={12} xl={6} ><div className="px-3">

                        <Link to={"/course/" + course.id} className="cursor-pointer">
                            <Badge.Ribbon text={course.discount <= 0 ? "Free" : <RiVipCrownFill className="mx-2 my-1" />} color={course.discount <= 0 ? "green" : "yellow"}>

                                <Card className="card-course-h overflow-hidden opacity-90 hover:opacity-100 shadow-lg"
                                    hoverable
                                    cover={<img alt="example" className="w-[100%] h-[190px] object-cover image-course" src={course.image} />}
                                >
                                    <Meta className="text-left text-title-course" title={course.name} />
                                    <p className="my-2 truncate text-gray-500">{course.headline}</p>
                                    <Space className="!flex !justify-between mt-2">


                                    </Space>
                                    <Space className="!flex !justify-between mt-2">
                                        <div>
                                            {
                                                course.courseKeyMetric ?
                                                    <>
                                                        {
                                                            course.courseKeyMetric.rating ?
                                                                <><span className="text-gray-500 text-sm font-semibold mr-1">{Number.parseFloat(course.courseKeyMetric.rating).toFixed(1)}</span><Rate disabled className="text-xs !space-x-1 rate-course-item" defaultValue={course.courseKeyMetric.rating} /> <span> ({course.courseKeyMetric.totalReviews})</span></> :
                                                                <><span className="text-gray-500 text-sm font-semibold mr-1">{0}</span><Rate disabled className="text-xs !space-x-1 rate-course-item" defaultValue={course.courseKeyMetric.rating} /></>

                                                        }

                                                    </>
                                                    : <><Rate disabled className="text-xs !space-x-1 rate-course-item" defaultValue={5} /><span className="text-gray-500 text-xs ml-1">{5}</span></>
                                            }
                                        </div>
                                        {
                                            course.discount <= 0 ? null : <>
                                                <p className="text-sm font-bold"><span className="line-through text-gray-500">${course.price}</span>
                                                    <span className=" text-base text-blue-600"> ${course.discount}</span></p>
                                            </>
                                        }
                                    </Space>

                                    <Link to={"/learn/" + course.id + "?s=0&l=0"}><Button type="primary" className="bg-gray-500 w-[100%] h-[40px] hover:!bg-gray-600 font-bold mt-3 max-sm:text-xs ">Learn continue</Button></Link>



                                </Card>
                            </Badge.Ribbon>

                        </Link>




                    </div></Col>

                }
                return <Col xs={24} sm={24} md={12} lg={12} xl={6} ><div className="px-3 ">
                    <Link to={"/course/" + course.id} className="cursor-pointer">
                        <Badge.Ribbon text={course.discount <= 0 ? "Free" : <RiVipCrownFill className="mx-2 my-1" />} color={course.discount <= 0 ? "green" : "yellow"}>

                            <Card className={course.sections.length == 0 ? "card-course-h overflow-hidden opacity-60 cursor-default shadow-lg " :
                                "card-course-h overflow-hidden opacity-90 hover:opacity-100 shadow-lg "}
                                hoverable
                                cover={<img alt="example" className="w-[100%] h-[190px] object-cover image-course" src={course.image} />}
                            >
                                <Meta className="text-left text-title-course" title={course.name} />
                                <p className="my-2 truncate text-gray-500">{course.headline}</p>
                                <Space className="!flex !justify-between mt-2">


                                </Space>
                                <Space className="!flex !justify-between mt-2">
                                    <div>
                                        {
                                            course.courseKeyMetric ?
                                                <>
                                                    {
                                                        course.courseKeyMetric.rating ?
                                                            <><span className="text-gray-500 text-sm font-semibold mr-1">{Number.parseFloat(course.courseKeyMetric.rating).toFixed(1)}</span><Rate disabled className="text-xs !space-x-1 rate-course-item" defaultValue={course.courseKeyMetric.rating} /> <span> ({course.courseKeyMetric.totalReviews})</span></> :
                                                            <><span className="text-gray-500 text-sm font-semibold mr-1">{0}</span><Rate disabled className="text-xs !space-x-1 rate-course-item" defaultValue={course.courseKeyMetric.rating} /></>

                                                    }

                                                </>
                                                : <><Rate disabled className="text-xs !space-x-1 rate-course-item" defaultValue={5} /><span className="text-gray-500 text-xs ml-1">{5}</span></>
                                        }
                                    </div>
                                    {
                                        course.discount <= 0 ? null : <>
                                            <p className="text-sm font-bold"><span className="line-through text-gray-500">${course.price}</span>
                                                <span className=" text-base text-blue-600"> ${course.discount}</span></p>
                                        </>
                                    }
                                </Space>
                                {
                                    course.sections.length == 0 ?
                                        <Button type="primary" className="bg-gray-400 hover:!bg-gray-400 font-bold mt-3 max-sm:text-xs h-[40px] w-[100%] cursor-default">Not started yet</Button> :
                                        <>
                                            {course.discount <= 0 ?
                                                <Button type="primary" className="bg-gradient-to-r from-blue-600 to-cyan-600 h-[40px] hover:bg-blue-600 font-bold mt-3 max-sm:text-xs w-[100%] ">Learn Now</Button> :
                                                <Button type="primary" className="bg-gradient-to-r w-[100%] h-[40px] from-blue-600 to-cyan-600 hover:bg-blue-600 font-bold mt-3 max-sm:text-xs ">Buy Now</Button>
                                            }
                                        </>
                                }


                            </Card>
                        </Badge.Ribbon>

                    </Link>




                </div></Col>
            })
            setdatacourses(adex)
            setloaddingas(false)

        }).catch((error: any) => {
            console.log(error)
            setloaddingas(false)
        })

    }
    useEffect(() => {
        setloaddingas(true)
        hangdlegetdatacourses()

    }, [location])



    return (
        <Layout className="layout bg-white">
            <HeaderComponent item="courses" />
            <Content className="pt-[70px]">
                <div className="site-layout-content w-[100%] pb-10 max-w-[1400px] mx-auto" style={{ background: colorBgContainer }}>
                    <div className="mx-auto mt-14  max-sm:mt-[20px] max-sm:px-1 max-w-[1400px] ">



                        {
                            !loaddingas ?
                                <>
                                    <h2 className="text-3xl pt-4 max-sm:text-xl font-bold text-center bg-clip-text text-transparent bg-gray-900 ">{title}</h2>


                                    <>
                                        {datacourses.length == 0 ?
                                            <div className="w-[100%] min-h-[350px] flex justify-center items-center">
                                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                            </div>
                                            :
                                            <Row gutter={[24, 24]} className="!w-[100%]  max-w-[1400px]  max-md:w-[85%] mx-auto my-10 max-sm:my-5">

                                                {
                                                    datacourses.length > 0 ? datacourses
                                                        : null
                                                }
                                            </Row>
                                        }
                                    </>


                                    {/* <Carousel responsive={responsive} className="max-w-[1400px] max-md:w-[85%] mx-auto my-14 max-sm:my-5">



                                       


                                    </Carousel>*/}
                                </>

                                :
                                <>
                                    <div className="flex justify-center space-x-2 ">
                                        <SkeletonButton active className="my-4" />
                                        <SkeletonButton active className="my-4" />
                                        <SkeletonButton active className="my-4" />
                                        <SkeletonButton active className="my-4" />

                                    </div>

                                    <Row gutter={[24, 24]}>
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

                    </div>
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

export default CategoriesPage;