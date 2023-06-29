import React, { useEffect, useState } from "react";
import { Avatar, Badge, Breadcrumb, Button, Card, Col, Layout, Menu, Rate, Row, Skeleton, Space, theme } from 'antd';
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
import { BsCheck2Circle } from "react-icons/bs";
import SkeletonInput from "antd/es/skeleton/Input";
import SkeletonImage from "antd/es/skeleton/Image";
import SkeletonButton from "antd/es/skeleton/Button";
const { Header, Content, Footer } = Layout;


function DetailRoadmapsPages() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const loading = useSelector((state: RootState) => state.root.load)
    const [loaddingas, setloaddingas] = useState(false)
    const [dataroadmap, setdataroadmap] = useState(null)
    const auth = useSelector((state: RootState) => state.root.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const hangdlegetdataroadmap = async () => {
        setloaddingas(true)
        await api.get(`/roadmaps/${location.pathname.split("/")[2]}`,

        ).then((response: any) => {
            setdataroadmap(response.data)
            console.log(response.data)
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
        <Layout className="layout bg-white">
            <HeaderComponent item="roadmaps" />
            <Content className="pt-[70px]">
                <div>
                    {
                        dataroadmap ? <>
                            <div className="site-layout-content max-w-[1400px] mx-auto py-8 w-[90%] pb-10 " style={{ background: colorBgContainer }}>

                                {
                                    dataroadmap ? <>
                                        <h4 className="text-gray-900 text-3xl font-bold mb-4 max-md:text-2xl truncate">{"Roadmap " + dataroadmap.name}</h4>
                                        <p className="text-gray-800 w-[80%] mb-8 text-lg font-semibold max-md:text-md max-md:w-[95%]">{dataroadmap.description}</p>
                                        <div className="flex justify-start space-x-20 items-start">
                                            <div>
                                                <h5 className="mt-5 font-bold text-base ">Requirements</h5>
                                                {
                                                    dataroadmap.requirements ? <>{dataroadmap.requirements.map((requirement) => {
                                                        return <div className="my-2 space-x-1 flex items-center justify-start text-green-600" key={requirement}><BsCheck2Circle /><span>{requirement}</span></div>
                                                    })}</> : null
                                                }
                                            </div>
                                            <div>
                                                <h5 className="mt-5 font-bold text-base ">Benefits</h5>
                                                {
                                                    dataroadmap.benefits ? <>{dataroadmap.benefits.map((benefit) => {
                                                        return <div className="my-2 space-x-2 flex items-center justify-start text-green-600" key={benefit}><BsCheck2Circle /><span>{benefit}</span></div>
                                                    })}</> : null
                                                }
                                            </div>
                                        </div>

                                        <div className="mt-10">
                                            {
                                                dataroadmap.courseRoadmaps.length != 0 ? <>
                                                    {
                                                        dataroadmap.courseRoadmaps.map((roadmap, index) => {
                                                            return <>
                                                                <h4 className="text-gray-900 text-xl font-bold mb-4 max-md:text-lg truncate">{`${index + 1}: `}{roadmap.title}</h4>
                                                                <h5 className="text-md text-base font-medium w-[80%] max-md:w-[95%] mb-3 ">{roadmap.description}</h5>
                                                                <div className="w-[80%] max-md:w-[95%] p-5 mb-7 rounded-xl border-2 border-gray-600 shadow-lg bg-slate-50">

                                                                    <div className="flex justify-start space-x-3 items-start">
                                                                        <div className="w-[150px]">
                                                                            <Avatar className="!w-[150px] rounded-md !h-[100px]" src={roadmap.course.image} />
                                                                        </div>
                                                                        <div>
                                                                            <h5 className="text-lg font-bold mb-0">{roadmap.course.name}</h5>
                                                                            {
                                                                                roadmap.course.discount <= 0 ? <p className="mt-0 text-lg text-green-600 font-bold">Free </p> : <>
                                                                                    <p className="mt-0 text-lg font-bold">Discounted price of </p>
                                                                                    <p className="text-base font-bold"> <span className="line-through text-gray-500">${roadmap.course.price}</span>
                                                                                        <span className=" text-xl text-blue-600"> ${roadmap.course.discount}</span></p>
                                                                                </>
                                                                            }
                                                                            <h5 className="text-md  mb-3 ">{roadmap.course.headline}</h5>
                                                                            <Link to={'/course/' + roadmap.course.id} ><Button className="mt-2 rounded-full font-semibold border-2 border-gray-800">See more</Button></Link>
                                                                        </div>


                                                                    </div>


                                                                </div>
                                                            </>
                                                        })
                                                    }
                                                </> : null
                                            }

                                        </div>


                                    </> : null
                                }

                                <p className="text-gray-800 w-[80%] mt-20 text-lg font-semibold max-md:text-md max-md:w-[95%]">Studying according to the route will help you know what you should start studying and determine the next courses</p>
                            </div>
                            <div className='max-w-[1400px] max-md:!w-[90%] flex justify-between items-center w-100% bg-gray-50 border-2 border-gray-800 rounded-xl mx-auto px-4 my-7 max-md:space-x-2 space-x-16'>
                                <div className='flex flex-col justify-center items-start px-10 max-md:px-0 max-md:py-5 space-y-2'>
                                    <h4 className='text-sm text-gray-800 font-bold'>About Us</h4>
                                    <div className="logo flex justify-start items-center space-x-3 max-sm:space-x-1">
                                        <img className="w-[45px] max-lg:w-[25px]" src="https://coursesbe.s3.ap-southeast-1.amazonaws.com/c572dcfd-998f-4d93-b40f-6d105dcbdb49-logo-learning.png" alt="logo" />
                                        <h4 className="text-black text-2xl !leading-4 font-bold !py-0 max-lg:text-base max-md:text-sm">Wizcove IT <span>specialize in providing IT courses.</span></h4>

                                    </div>
                                    <p className='text-base max-lg:text-sm  font-semibold text-gray-800 max-md:text-xs'>We want to share this passion with everyone by providing high-quality programming courses and helping students develop the necessary skills to become successful programmers.</p>
                                    <Link to="/about-us"><Button className='mt-4 text-base h-[40px] rounded-full font-semibold border-2 border-gray-800'>See more information about us</Button></Link>
                                </div>
                                <img className='h-[100%] max-lg:h-[90%] max-md:h-[160px] max-md:hidden' src='https://hrcdn.net/fcore/assets/dashboard/hackerresume-card-dd9b01fcd2.svg' />

                            </div>

                        </> :
                            <div className="site-layout-content max-w-[1400px] mx-auto py-8 w-[90%] pb-10 " style={{ background: colorBgContainer }}>
                                <SkeletonInput active className="!w-[300px] !h-[40px]" />
                                <Skeleton title={null} active paragraph={{ rows: 5 }} className="!w-[80%]  mt-5" />
                                <SkeletonInput active className="!w-[300px] !h-[30px] mt-6" />
                                <SkeletonInput active className="!w-[90%]  mt-4 !h-[200px]" />
                                <SkeletonInput active className="!w-[300px] !h-[30px] mt-6" />

                                <SkeletonInput active className="!w-[90%]  mt-4 !h-[200px]" />
                                <SkeletonInput active className="!w-[300px] !h-[30px] mt-6" />

                                <SkeletonInput active className="!w-[90%]  mt-4 !h-[200px]" />
                                <SkeletonInput active className="!w-[300px] !h-[30px] mt-6" />

                                <SkeletonInput active className="!w-[90%]  mt-4 !h-[200px]" />
                            </div>


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

export default DetailRoadmapsPages;