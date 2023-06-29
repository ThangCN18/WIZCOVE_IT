import { Avatar, Badge, Button, Card, Col, Rate, Row, Skeleton, Space } from "antd";
import React, { useEffect, useState } from "react"
import { BsCheck } from "react-icons/bs";
import { FaRoute } from "react-icons/fa";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import api from "../configs/axiosConfig";
import ItemCourseComponent from "./ItemCourseComponent";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { RiVipCrownFill } from "react-icons/ri";
import Meta from "antd/es/card/Meta";
import { useSelector } from "react-redux";
import { RootState } from "../store/types";
import SkeletonButton from "antd/es/skeleton/Button";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 2 // optional, default to 1.
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



const PopularCourseComponent: React.FC = () => {



    const [loaddingas, setloaddingas] = useState(false)
    const [datacourses, setdatacourses] = useState<any[]>([])
    const auth = useSelector((state: RootState) => state.root.auth)

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
        await api.get('/courses?perPage=6&page=1&sortField=courseKeyMetric.currentSubscribers&sortDirection=DESC',

        ).then((response: any) => {
            const data = response.data.items
            console.log(response.data.items)
            adex = data.map((course) => {
                if (aaaa.includes(course.id)) {
                    return <div className="px-3">

                        <Link to={"/course/" + course.id}>
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




                    </div>

                }
                return <div className="px-3 ">
                    <Link to={"/course/" + course.id}>
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




                </div>
            })
            setdatacourses(adex)
        }).catch((error: any) => {
            console.log(error)
            setloaddingas(false)
        })

    }
    useEffect(() => {
        hangdlegetdatacourses()

    }, [auth.isAuthenticated])



    return (

        <div className="mx-auto px-4 mt-14  max-sm:mt-[20px] max-sm:px-1 max-w-[1400px] ">

            {
                datacourses.length > 0 ?
                    <>
                        <h2 className="text-3xl pt-5 max-sm:text-xl font-bold text-center bg-clip-text text-transparent bg-gray-700 ">Most popular courses</h2>

                        <Carousel responsive={responsive} className="max-w-[1400px] max-md:w-[85%] mx-auto my-14 max-sm:my-5">



                            {
                                datacourses.length > 0 ? datacourses
                                    : null
                            }


                        </Carousel></>

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
    );
}

export default PopularCourseComponent;