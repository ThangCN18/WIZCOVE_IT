import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Col, Divider, Form, Image, Input, List, Modal, Row, Select, Skeleton, Space, Statistic, Tag } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import api from '../../configs/axiosConfig';
import AdminCourseItemComponent from './AdminCourseItemComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import UploadImageComponent from '../UploadImageComponent';
import TextArea from 'antd/es/input/TextArea';
import { setLoading, unsetLoading } from '../../store/loadSlice';
import { setNotify } from '../../store/notifycationSlide';
import CountUp from 'react-countup';
import { FaRoute } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined
} from '@ant-design/icons';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { BsListUl } from 'react-icons/bs';
import { BiDotsVerticalRounded } from 'react-icons/bi';

const { Option } = Select;

const AdminDashboardComponent: React.FC = () => {
    const [loadinga, setLoadinga] = useState(false);
    const [datauser, setDatauser] = useState<any[]>([]);
    const [datareview, setdatareview] = useState<any[]>([]);
    const [datacourse, setdatacourse] = useState<any[]>([]);
    const [page, setpage] = useState(1);
    const [showmodalcreatnew, setshowmodalcreatnew] = useState(false)
    const [url_image, seturl_image] = useState("")
    const auth = useSelector((state: RootState) => state.root.auth)
    const dispatch = useDispatch()
    const [dataRoadmap, setdataRoadmap] = useState<any[]>([]);

    const handelGetDataUsers = async () => {
        setLoadinga(true);
        await api.get(`/users?perPage=1000&page=1`,
            {
                headers
            },
        ).then((response: any) => {
            if (response.status === 200) {
                const datares: any[] = response.data.items;
                setDatauser(datares)
                setLoadinga(false);
            }
        }).catch((error: any) => {
            console.log(error)
            setLoadinga(false);
        })
    }

    const handelGetDataCourse = async () => {
        if (loadinga) {
            return;
        }
        await api.get(`/courses?perPage=1000`)
            .then((response: any) => {
                console.log(response.data)
                if (response.status === 200) {
                    const datares: any[] = response.data.items;

                    setdatacourse(datares);
                    setLoadinga(false);
                }
            }).catch((error: any) => {
                setLoadinga(false);
            })

    }
    const getDataRoadmap = async () => {
        setLoadinga(true);
        await api.get(`/roadmaps`).then((response: any) => {
            if (response.status === 200) {
                console.log(response.data)
                setdataRoadmap(response.data)
                setLoadinga(false);
            }
        }).catch((error: any) => {
            console.log(error)
            setLoadinga(false);
        })

    }



    const headers = {
        Accept: '*/*',
        Authorization: 'Bearer ' + auth.user?.accessToken,
    };





    useEffect(() => {
        setLoadinga(true)
        handelGetDataCourse();
        handelGetDataUsers()
        getDataRoadmap()
    }, []);

    return (


        <div style={{ height: "78vh", overflowY: 'scroll', padding: "5px 25px" }}  >

            {
                loadinga ?
                    <>

                        <Row gutter={[24, 24]} className='w-100%'>
                            <Col span={18}>
                                <Row gutter={[24, 24]} className='w-100%'>
                                    <Col span={8}>
                                        <Card bordered={false} className='!shadow-md'>
                                            <Skeleton active paragraph={{ rows: 2 }} />
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card bordered={false} className='!shadow-md'>
                                            <Skeleton active paragraph={{ rows: 2 }} />
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card bordered={false} className='!shadow-md'>
                                            <Skeleton active paragraph={{ rows: 2 }} />
                                        </Card>
                                    </Col>

                                    <Col span={24}>

                                        <Skeleton.Button active className='!w-[100%] !h-[450px] rounded-md shadow-md' />

                                    </Col>

                                </Row>
                            </Col>
                            <Col span={6} >
                                <Card>
                                    <Skeleton.Input className='mb-3' />
                                    <Skeleton avatar paragraph={{ rows: 0 }} title={{ width: "100%" }} active className='!w-[90%] mb-2' />
                                    <Skeleton avatar paragraph={{ rows: 0 }} title={{ width: "100%" }} active className='!w-[90%] mb-2' />
                                    <Skeleton avatar paragraph={{ rows: 0 }} title={{ width: "100%" }} active className='!w-[90%] mb-2' />
                                    <Skeleton avatar paragraph={{ rows: 0 }} title={{ width: "100%" }} active className='!w-[90%] mb-2' />
                                    <Skeleton avatar paragraph={{ rows: 0 }} title={{ width: "100%" }} active className='!w-[90%] mb-2' />
                                    <Skeleton avatar paragraph={{ rows: 0 }} title={{ width: "100%" }} active className='!w-[90%] mb-2' />
                                    <Skeleton avatar paragraph={{ rows: 0 }} title={{ width: "100%" }} active className='!w-[90%] mb-2' />
                                    <Skeleton avatar paragraph={{ rows: 0 }} title={{ width: "100%" }} active className='!w-[90%] mb-2' />


                                </Card>





                            </Col>


                        </Row>
                    </> : <>


                        <Row gutter={[24, 24]} className='w-100%'>
                            <Col span={18}>
                                <Row gutter={[24, 24]} className='w-100%'>

                                    <Col span={8}>
                                        <Card bordered={false} className='!shadow-md bg-gradient-to-l  from-[#cfd8da] to-[#edeeef] text-black'>
                                            <Statistic title={
                                                <>
                                                    <div className='flex justify-between items-center space-x-2 text-base font-semibold text-black'>

                                                        <span>Users</span>
                                                        <Link to="/admin/user">
                                                            <Button type='primary' className='bg-gray-200 text-black hover:!text-black hover:!bg-gray-100'>
                                                                <FiMenu />

                                                            </Button>

                                                        </Link>


                                                    </div>
                                                </>
                                            } value={datauser.length} precision={2} formatter={
                                                (value: number) => <Space className=' !justify-start items-center '> <CountUp style={{ color: "black", fontWeight: "700" }} end={value} separator="," /> <UserOutlined className='text-xl text-black mb-3 font-bold' /> </Space>
                                            } />

                                        </Card>
                                    </Col>


                                    <Col span={8}>
                                        <Card bordered={false} className='!shadow-md bg-gradient-to-l  from-[#024cac] to-[#0492ff] text-white'>
                                            <Statistic title={
                                                <>
                                                    <div className='flex justify-between items-center space-x-2 text-base font-semibold text-white'>

                                                        <span>Roadmaps</span>
                                                        <Link to="/admin/roadmap">
                                                            <Button type='primary' className='bg-blue-500'>
                                                                <FiMenu />

                                                            </Button>

                                                        </Link>


                                                    </div>
                                                </>
                                            } value={dataRoadmap.length} precision={2} formatter={
                                                (value: number) => <Space className=' !justify-start items-center '> <CountUp style={{ color: "white", fontWeight: "700" }} end={value} separator="," /> <FaRoute className='text-xl text-white mt-4 mb-3 font-bold' /> </Space>
                                            } />

                                        </Card>
                                    </Col>


                                    <Col span={8}>
                                        <Card bordered={false} className='!shadow-md bg-gradient-to-l  from-[#FF4E00] to-[#EC9F05] text-white'>
                                            <Statistic title={
                                                <>
                                                    <div className='flex justify-between items-center space-x-2 text-base font-semibold text-white'>

                                                        <span>Courses</span>
                                                        <Link to="/admin/course">
                                                            <Button type='primary' className='bg-orange-500 hover:!bg-orange-400'>
                                                                <FiMenu />

                                                            </Button>

                                                        </Link>
                                                    </div>
                                                </>
                                            } value={datacourse.length} precision={2} formatter={
                                                (value: number) => <Space className=' !justify-start items-center '> <CountUp style={{ color: "white", fontWeight: "700" }} end={value} separator="," /> <HiOutlineBookOpen className='text-xl text-white mb-3 mt-4 font-bold' /> </Space>
                                            } />

                                        </Card>
                                    </Col>
                                    <Col span={24}>
                                        <Card className='bg-gradient-to-tl  from-[#e4e6e7] to-[#fdfeff] shadow-lg'>
                                            <div className='flex justify-between items-center text-lg font-bold'>
                                                <h2 className='text-lg font-bold mb-3'>List Courses</h2><Link to="/admin/course/"><BsListUl /></Link>

                                            </div>
                                            <List
                                                itemLayout="horizontal"
                                                dataSource={datacourse.slice(0, 5)}
                                                renderItem={(item, index) => (
                                                    <List.Item className='flex justify-between items-center'>

                                                        <List.Item.Meta className='!items-center'
                                                            avatar={<Avatar className='w-[100px] h-[55px] !rounded-md' src={item.image} />}
                                                            title={<h5 className='text-md font-semibold' >{item.name}</h5>}
                                                            description={item.headline}

                                                        />
                                                        <BiDotsVerticalRounded />
                                                    </List.Item>
                                                )}
                                            />

                                        </Card>

                                    </Col>


                                </Row>

                            </Col>
                            <Col span={6}>
                                <Card className='bg-gradient-to-l  from-[#cfd8da] to-[#edeeef] shadow-lg'>
                                    <div className='flex justify-between items-center text-lg font-bold'>
                                        <h2 className='text-lg font-bold mb-3'>List Users</h2><Link to="/admin/user/"><BsListUl /></Link>

                                    </div>
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={datauser.slice(0, 8)}
                                        renderItem={(item, index) => (
                                            <List.Item className='flex justify-between items-center'>

                                                <List.Item.Meta className='!items-center'
                                                    avatar={<Avatar className='w-[45px] h-[45px]' src={item.avatar ? item.avatar : "https://live.staticflickr.com/65535/52813965210_ca9d9cd3a9_w.jpg"} />}
                                                    title={<h5 className='text-md font-semibold' >{item.lastName + " " + item.firstName}</h5>}
                                                    description={item.email}

                                                />
                                                <BiDotsVerticalRounded />
                                            </List.Item>
                                        )}
                                    />

                                </Card>

                            </Col>


                        </Row>

                    </>
            }






        </div>


    );
};

export default AdminDashboardComponent;