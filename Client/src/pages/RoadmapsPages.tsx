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
import SkeletonInput from "antd/es/skeleton/Input";
import SkeletonAvatar from "antd/es/skeleton/Avatar";
import SkeletonButton from "antd/es/skeleton/Button";
import SkeletonImage from "antd/es/skeleton/Image";
const { Header, Content, Footer } = Layout;


function RoadmapsPages() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const loading = useSelector((state: RootState) => state.root.load)
    const [loaddingas, setloaddingas] = useState(false)
    const [dataroadmap, setdataroadmap] = useState([])
    const auth = useSelector((state: RootState) => state.root.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const hangdlegetdataroadmap = async () => {
        setloaddingas(true)
        await api.get('/roadmaps',

        ).then((response: any) => {
            setdataroadmap(response.data.reverse())
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
               
                    {
                        dataroadmap.length != 0?<>
                         <div className="site-layout-content max-w-[1400px] mx-auto py-8 w-[90%] pb-10 " style={{ background: colorBgContainer }}>

                        <h4 className="text-gray-900 text-3xl font-bold mb-4 max-md:text-2xl truncate">WizcoveIT's learning Roadmap </h4>
                    <p className="text-gray-800 w-[80%] mb-8 text-lg font-semibold max-md:text-md max-md:w-[95%]">WizcoveIT is an information technology training company that provides courses in programming and software testing. Here are some of the routes that WizcoveIT offers:</p>
                    <Row gutter={[24,24]}>

                        {
                            dataroadmap.length != 0?<>
                                {dataroadmap.map((roadmap) => {
                                    return <Col xs={24} sm={24} md={24} lg={10} xl={10} key={roadmap.id}>
                                    <div className="w-[100%] p-10 rounded-xl border-2 border-gray-600 shadow-lg bg-slate-50">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h5 className="text-lg font-bold mb-3">{roadmap.name}</h5>
                                                <h5 className="text-md  mb-3 text-webkit-line-clamp-3">{roadmap.description}</h5>
                                            </div>
                                            <div className="w-[100px]">
                                            <Avatar className="!w-[100px] !h-[100px]" src={roadmap.image}/>
                                            </div>
                                            
                                        </div>
                                        <Link to={'/roadmap/'+roadmap.id}><Button className="mt-4 rounded-full font-semibold border-2 border-gray-800">See more</Button></Link>
            
                                    </div>
                                    </Col>
                                })}
                            </> :null
                        }
                        
                    </Row>
                    <p className="text-gray-800 w-[80%] mt-20 text-lg font-semibold max-md:text-md max-md:w-[95%]">Studying according to the route will help you know what you should start studying and determine the next courses</p>
                </div>
                <div className='max-w-[1400px] max-md:!w-[90%] flex justify-between items-center w-100% bg-gray-50 border-2 border-gray-800 rounded-xl mx-auto px-4 my-7 max-md:space-x-2 space-x-16'>
            <div className='flex flex-col justify-center items-start px-10 max-md:px-0 max-md:py-5 space-y-2'>
                <h4 className='text-sm text-gray-800 font-bold'>About Us</h4>
                <div className="logo flex justify-start items-center space-x-3 max-sm:space-x-1">
                    <img className="w-[45px] max-lg:w-[25px]" src="https://coursesbe.s3.ap-southeast-1.amazonaws.com/c572dcfd-998f-4d93-b40f-6d105dcbdb49-logo-learning.png" alt="logo"/>
                    <h4 className="text-black text-2xl !leading-4 font-bold !py-0 max-lg:text-base max-md:text-sm">Wizcove IT <span>specialize in providing IT courses.</span></h4>
                    
                </div>
                <p className='text-base max-lg:text-sm  font-semibold text-gray-800 max-md:text-xs'>We want to share this passion with everyone by providing high-quality programming courses and helping students develop the necessary skills to become successful programmers.</p>
                <Link to="/about-us"><Button  className='mt-4 text-base h-[40px] rounded-full font-semibold border-2 border-gray-800'>See more information about us</Button></Link>
            </div>
            <img className='h-[100%] max-lg:h-[90%] max-md:h-[160px] max-md:hidden' src='https://hrcdn.net/fcore/assets/dashboard/hackerresume-card-dd9b01fcd2.svg'/>
            </div>
                        
                        </>:
                        <div className="site-layout-content max-w-[1400px] mx-auto py-8 w-[90%] pb-10 " style={{ background: colorBgContainer }}>
                            <SkeletonInput active className="!w-[300px] !h-[40px]"/>
                            <Skeleton title={null} active paragraph={{rows: 2}}  className="!w-[80%] max-md:!w-[95%] mt-5"/>

                            <Row gutter={[24,24]} className="py-10">
                            <Col xs={24} sm={24} md={24} lg={10} xl={10}>
                                    <div className="w-[100%] p-10 rounded-xl  shadow-lg bg-slate-50">
                                        <div className="flex justify-between items-start ">
                                            <div>
                                                <SkeletonInput active className="!w-[60%] !h-[30px]"/>
                                                <Skeleton title={null} active paragraph={{rows: 2}}  className=" mt-5"/>
                                            </div>
                                            <div className="w-[100px]">
                                            <SkeletonImage active className="!w-[100px] !rounded-full !h-[100px]" />
                                            </div>
                                            
                                        </div>
                                        <SkeletonButton active className="my-3"/>
            
                                    </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={10} xl={10}>
                                    <div className="w-[100%] p-10 rounded-xl  shadow-lg bg-slate-50">
                                        <div className="flex justify-between items-start ">
                                            <div>
                                                <SkeletonInput active className="!w-[60%] !h-[30px]"/>
                                                <Skeleton title={null} active paragraph={{rows: 2}}  className=" mt-5"/>
                                            </div>
                                            <div className="w-[100px]">
                                            <SkeletonImage active className="!w-[100px] !rounded-full !h-[100px]" />
                                            </div>
                                            
                                        </div>
                                        <SkeletonButton active className="my-3"/>
            
                                    </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={10} xl={10}>
                                    <div className="w-[100%] p-10 rounded-xl  shadow-lg bg-slate-50">
                                        <div className="flex justify-between items-start ">
                                            <div>
                                                <SkeletonInput active className="!w-[60%] !h-[30px]"/>
                                                <Skeleton title={null} active paragraph={{rows: 2}}  className=" mt-5"/>
                                            </div>
                                            <div className="w-[100px]">
                                            <SkeletonImage active className="!w-[100px] !rounded-full !h-[100px]" />
                                            </div>
                                            
                                        </div>
                                        <SkeletonButton active className="my-3"/>
            
                                    </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={10} xl={10}>
                                    <div className="w-[100%] p-10 rounded-xl  shadow-lg bg-slate-50">
                                        <div className="flex justify-between items-start ">
                                            <div>
                                                <SkeletonInput active className="!w-[60%] !h-[30px]"/>
                                                <Skeleton title={null} active paragraph={{rows: 2}}  className="  mt-5"/>
                                            </div>
                                            <div className="w-[100px]">
                                            <SkeletonImage active className="!w-[100px] !rounded-full !h-[100px]" />
                                            </div>
                                            
                                        </div>
                                        <SkeletonButton active className="my-3"/>
            
                                    </div>
                                    </Col>
                            </Row>

                        </div>
                    }
                    
            
        
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

export default RoadmapsPages;