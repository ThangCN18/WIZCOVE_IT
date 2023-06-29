import React, { useEffect, useState } from "react";
import { Avatar, Badge, Breadcrumb, Button, Card, Col, Divider, Empty, Layout, Menu, Rate, Row, Skeleton, Space, Spin, Tabs, theme } from 'antd';
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
import CardCourseItemComponent from "../components/CardCourseItemComponent";
const { Header, Content, Footer } = Layout;
import type { TabsProps } from 'antd';
import SkeletonImage from "antd/es/skeleton/Image";
import SkeletonInput from "antd/es/skeleton/Input";
import SkeletonButton from "antd/es/skeleton/Button";
import InfiniteScroll from "react-infinite-scroll-component";


function CoursesPage() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const loading = useSelector((state: RootState) => state.root.load)
    const [loaddingas, setloaddingas] = useState(false)
    const [datacourses, setdatacourses] = useState<any[]>([])
    const [pagenum, setpagenum] = useState(1)
    const auth = useSelector((state: RootState) => state.root.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [loadspin, setloadspin] = useState(false)
    const [dataadacss, setdataadacss] = useState([])
    const [datada, setdatada] = useState([])



    const onChange = (key: string) => {
        console.log(key);
    };


    var items: TabsProps['items'] = dataadacss

    var aaaa = []


    const hangdlegetdatacourses = async () => {

        if (pagenum == 1) {
            setloaddingas(true)


        } else {
            setloadspin(true)
        }

        if (auth.isAuthenticated) {
            await getCourseSubscribe()
        }
        await hangdlegetdataroadmap()

        await api.get('/courses?perPage=8&page=' + pagenum,

        ).then((response: any) => {
            setdatacourses(response.data.items)
            setdatada(response.data.items)
            if (pagenum == 1) {
                var caca = [{
                    key: 1,
                    label: <p>All</p>,
                    children: <Row gutter={[24, 24]} className="max-sm:px-6 mt-5">
                        {!response.data.items ? null : <>
                            {response.data.items.map(course => {
                                console.log(aaaa)
                                if (aaaa.includes(course.id)) {

                                    return <CardCourseItemComponent course={course} key={course.id} issub={true} />
                                }
                                return <CardCourseItemComponent course={course} key={course.id} issub={false} />

                            })}
                        </>}
                    </Row>
                }]

            } else {

                const dadaada = [...datacourses, ...response.data.items]
                var caca = [{
                    key: 1,
                    label: <p>All</p>,
                    children: <Row gutter={[24, 24]} className="max-sm:px-6 mt-5">
                        {!dadaada ? null : <>
                            {dadaada.map(course => {
                                console.log(aaaa)
                                if (aaaa.includes(course.id)) {

                                    return <CardCourseItemComponent course={course} key={course.id} issub={true} />
                                }
                                return <CardCourseItemComponent course={course} key={course.id} issub={false} />

                            })}
                        </>}
                    </Row>
                }]
            }
            setpagenum(pagenum + 1)
            if (caca.length > 0) {
                setdataadacss([...caca, ...ccccaa])

            }
            setloaddingas(false)
            setloadspin(false)

        }).catch((error: any) => {
            console.log(error)
            setloaddingas(false)
            setloadspin(false)

        })

    }


    var ccccaa = []


    const hangdlegetdataroadmap = async () => {



        await api.get('/roadmaps',

        ).then(async (response: any) => {
            const adshba = response.data
            console.log(adshba)
            for (const index in adshba) {
                const caca = {
                    key: index + 1,
                    label: <p>{adshba[index].name}</p>,
                    children: <Row gutter={[24, 24]} className="max-sm:px-0 mt-5">
                        {adshba[index].courseRoadmaps.length == 0 ? <Empty className="mx-auto" image={Empty.PRESENTED_IMAGE_SIMPLE} /> : <>
                            {adshba[index].courseRoadmaps.map(course => {

                                if (aaaa.includes(course.course.id)) {
                                    return <CardCourseItemComponent course={course.course} key={course.id} issub={true} />
                                }
                                return <CardCourseItemComponent course={course.course} key={course.id} issub={false} />

                            })}
                        </>}
                    </Row>
                }
                ccccaa.push(caca)

            }

        }).catch((error: any) => {
            console.log(error)

        })

    }






    const headers = {
        Accept: '*/*',
        Authorization: 'Bearer ' + auth.user?.accessToken,
    };

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


    useEffect(() => {
        hangdlegetdatacourses()

    }, [auth.isAuthenticated])

    return (
        <Layout className="layout bg-white">
            <HeaderComponent item="courses" />
            <InfiniteScroll
                dataLength={datacourses.length}
                next={hangdlegetdatacourses}
                hasMore={datada.length >= 8}
                loader={loadspin ? <div className="mx-auto w-[100%] flex justify-center mb-10"><Spin></Spin></div> : null}
                endMessage={loaddingas ? null : <Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <Content className="pt-[70px]">
                    <div className="site-layout-content w-[100%] pb-10 max-w-[1400px] mx-auto" style={{ background: colorBgContainer }}>
                        <div className="max-w-[1400px] max-md:w-[90%] mx-auto text-center rounded-3xl px-[5%] py-[2%] bg-[rgba(71,213,226,0)] tapscoursescomponemt">
                            {
                                loaddingas ? <>
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

                                </> :
                                    <Tabs defaultActiveKey="1" animated className="min-h-[475px]" items={items} onChange={onChange} />
                            }

                        </div>
                    </div>
                </Content>

            </InfiniteScroll>

            <FooterComponent />
            <Footer style={{ textAlign: 'center' }}>Copyright ©2023 Wizcove IT</Footer>
            {
                loading.isLoading ?
                    <LoadingComponent /> : null
            }


        </Layout>

    );
}

export default CoursesPage;