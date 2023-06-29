import React, { useEffect, useState } from "react";
import { Avatar, Badge, Breadcrumb, Button, Card, Col, Layout, Menu, Rate, Row, Space, theme } from 'antd';
import HeaderComponent from "../components/HeaderComponent";
import SlideBanner from "../components/SlideBanner";
import SliderRoadmap from "../components/SliderRoadmap";
import TabsCoursesComponent from "../components/TabsCoursesComponent";
import LoadingComponent from "../components/LoadingComponent";
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../store/types";
import AboutUsHomeComponent from "../components/AboutUsHomeComponent";
import FooterComponent from "../components/FooterComponent";
import { Link, useNavigate } from "react-router-dom";
import { setLoading, unsetLoading } from "../store/loadSlice";
import api from "../configs/axiosConfig";
import { logout } from "../store/authSlice";
import Meta from "antd/es/card/Meta";
import { RiVipCrownFill } from "react-icons/ri";
import { FaCartPlus } from "react-icons/fa";
import { setNotify } from "../store/notifycationSlide";
const { Header, Content, Footer } = Layout;


function CardCourseItemComponent(course, issub) {

    const [loadingads, setloadingads] = useState(true)
    const [data, setdata] = useState(null)
    const auth = useSelector((state: RootState) => state.root.auth)
    const navigate = useNavigate();
    const [aissub, setaissub] = useState(false)
    const dispatch = useDispatch()


    const headers = {
        Accept: '*/*',
        Authorization: 'Bearer ' + auth.user?.accessToken,
    };






    const handellearncourse = async () => {
        await api.post('/courses/' + course.course.id + '/subscribe/',
            {
                headers
            },

        ).then((response: any) => {
            if (response.status === 201) {
                navigate("/learn/" + course.id + "?s=0&l=0")
            }
        }).catch((error: any) => {
            console.log(error)

        })

    }

    useEffect(() => {
        setdata(course.course)
        setaissub(course.issub)
        setloadingads(false)

    }, [])



    return (
        <>
            {!data ? null :


                <Col xs={24} sm={24} md={12} lg={12} xl={6} >
                    {!data.sections ?
                        <Badge.Ribbon text={data.discount <= 0 ? "Free" : <RiVipCrownFill className="mx-2 my-1" />} color={data.discount <= 0 ? "green" : "yellow"}>

                            <Card className="card-course-h overflow-hidden !opacity-50 cursor-default shadow-lg"
                                hoverable
                                cover={<img alt="example" className="w-[100%] h-[190px] object-cover image-course" src={data.image} />}
                            >
                                <Meta className="text-left text-title-course" title={data.name} />
                                <p className="my-2 truncate text-gray-500">{data.headline}</p>
                                <Space className="!flex !justify-between mt-2">


                                </Space>
                                <Space className="!flex !justify-between mt-2">
                                    <Rate disabled className="text-xs !space-x-1 rate-course-item" defaultValue={5} />
                                    {
                                        data.discount <= 0 ? null : <>
                                            <p className="text-sm font-bold"><span className="line-through text-gray-500">${data.price}</span>
                                                <span className=" text-base text-blue-600"> ${data.discount}</span></p>
                                        </>
                                    }
                                </Space>
                                {
                                    !data.sections ?
                                        <Button type="primary" className="bg-gray-400 w-[100%] h-[40px]  hover:bg-gray-400 font-bold mt-3 max-sm:text-xs">Not started yet</Button> :
                                        <>
                                            {data.discount <= 0 ?
                                                <>{issub ? <Link to={"/learn/" + data.id + "?s=0&l=0"}><Button type="primary" className="bg-gray-500 w-[100%] h-[40px] hover:!bg-gray-600 font-bold mt-3 max-sm:text-xs ">Learn continue</Button></Link>
                                                    : <Button type="primary" onClick={() => { handellearncourse() }} className="bg-gradient-to-r w-[100%] h-[40px] from-blue-600 to-cyan-600 hover:bg-blue-600 font-bold mt-3 max-sm:text-xs ">Learn Now</Button>
                                                }</> :
                                                <>{issub ? <Link to={"/learn/" + data.id + "?s=0&l=0"}><Button type="primary" className="bg-gray-500 w-[100%] h-[40px] hover:!bg-gray-600 font-bold mt-3 max-sm:text-xs ">Learn continue</Button></Link>
                                                    : <Button type="primary" className="bg-gradient-to-r w-[100%] h-[40px] from-gray-600 to-cyan-600 hover:bg-blue-600 font-bold mt-3 max-sm:text-xs ">Buy Now</Button>
                                                }</>

                                            }
                                        </>
                                }


                            </Card>
                        </Badge.Ribbon> :
                        <Link to={'/course/' + data.id} >
                            <Badge.Ribbon text={data.discount <= 0 ? "Free" : <RiVipCrownFill className="mx-2 my-1" />} color={data.discount <= 0 ? "green" : "yellow"}>

                                <Card className={data.sections.length == 0 ? "card-course-h overflow-hidden opacity-70  hover:opacity-80 cursor-pointer  shadow-lg" :
                                    "card-course-h overflow-hidden opacity-95 hover:opacity-100 shadow-lg"}
                                    hoverable
                                    cover={<img alt="example" className="w-[100%] h-[190px] object-cover image-course" src={data.image} />}
                                >
                                    <Meta className="text-left text-title-course" title={data.name} />
                                    <div className="relative">


                                    </div>
                                    <p className="my-2 truncate text-gray-500">{data.headline}</p>
                                    <Space className="!flex !justify-between mt-2">


                                    </Space>
                                    <Space className="!flex !justify-between mt-2">
                                        <div>
                                            {
                                                data.courseKeyMetric ?
                                                    <>
                                                        {
                                                            data.courseKeyMetric.rating ?
                                                                <><span className="text-gray-500 text-sm font-semibold mr-1">{Number.parseFloat(data.courseKeyMetric.rating).toFixed(1)}</span><Rate disabled className="text-xs !space-x-1 rate-course-item" defaultValue={data.courseKeyMetric.rating} /> <span> ({data.courseKeyMetric.totalReviews})</span></> :
                                                                <><span className="text-gray-500 text-sm font-semibold mr-1">{0}</span><Rate disabled className="text-xs !space-x-1 rate-course-item" defaultValue={data.courseKeyMetric.rating} /></>

                                                        }

                                                    </>
                                                    : <><Rate disabled className="text-xs !space-x-1 rate-course-item" defaultValue={5} /><span className="text-gray-500 text-xs ml-1">{5}</span></>
                                            }
                                        </div>

                                        {
                                            data.discount <= 0 ? null : <>
                                                <p className="text-sm font-bold"><span className="line-through text-gray-500">${data.price}</span>
                                                    <span className=" text-base text-blue-600"> ${data.discount}</span></p>
                                            </>
                                        }
                                    </Space>
                                    {
                                        data.sections.length == 0 ?
                                            <Button type="primary" className="bg-gray-400 hover:!bg-gray-400 h-[40px] bg- font-bold mt-3 max-sm:text-xs w-[100%] cursor-default">Not started yet</Button> :
                                            <>
                                                {data.discount <= 0 ?
                                                    <>{aissub ? <Link to={"/learn/" + data.id + "?s=0&l=0"}><Button type="primary" className="bg-gray-500 w-[100%] h-[40px] hover:!bg-gray-600 font-bold mt-3 max-sm:text-xs ">Learn continue</Button></Link>
                                                        : <Button type="primary" onClick={() => { handellearncourse() }} className="bg-gradient-to-r w-[100%] h-[40px] from-blue-600 to-cyan-600 hover:bg-blue-600 font-bold mt-3 max-sm:text-xs ">Learn Now</Button>
                                                    }</> :
                                                    <>{aissub ? <Link to={"/learn/" + data.id + "?s=0&l=0"}><Button type="primary" className="bg-gray-500 w-[100%] h-[40px] hover:!bg-gray-600 font-bold mt-3 max-sm:text-xs ">Learn continue</Button></Link>
                                                        : <Button type="primary" className="bg-gradient-to-r w-[100%] h-[40px] from-blue-600 to-cyan-600 hover:bg-blue-600 font-bold mt-3 max-sm:text-xs ">Buy Now</Button>
                                                    }</>

                                                }
                                            </>
                                    }


                                </Card>
                            </Badge.Ribbon>


                        </Link>

                    }


                </Col>

            }
        </>

    );
}

export default CardCourseItemComponent;