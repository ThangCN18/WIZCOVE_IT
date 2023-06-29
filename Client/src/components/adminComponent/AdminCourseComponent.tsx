import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Col, Divider, Form, Image, Input, List, Modal, Row, Select, Skeleton, Space, Tag } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import api from '../../configs/axiosConfig';
import AdminCourseItemComponent from './AdminCourseItemComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import UploadImageComponent from '../UploadImageComponent';
import TextArea from 'antd/es/input/TextArea';
import { setLoading, unsetLoading } from '../../store/loadSlice';
import { setNotify } from '../../store/notifycationSlide';

const { Option } = Select;

const AdminCourseComponent: React.FC = () => {
    const [loadinga, setLoadinga] = useState(false);
    const [optionData, setOptionData] = useState([])
    const [data, setData] = useState<any[]>([]);
    const [page, setpage] = useState(1);
    const [showmodalcreatnew, setshowmodalcreatnew] = useState(false)
    const [url_image, seturl_image] = useState("")
    const auth = useSelector((state: RootState) => state.root.auth)
    const dispatch = useDispatch()

    const generateListOption = (data) => {
        const datares = [];
        for (let i = 0; i < data.length; i++) {
            const node = data[i];
            const { id, name, children } = node;
            let addnode = {}
            if (children) {
                addnode = {
                    value: id,
                    label: name,
                    children: children.length > 0 ? generateListOption(children) : [],
                };
                datares.push(addnode);

            } else {
                addnode = {
                    value: id,
                    label: name
                };
                datares.push(addnode);

            }

        }
        return datares;
    };



    const handelGetDataCategories = async () => {

        await api
            .get(`/categories`)
            .then((response: any) => {
                if (response.status === 200) {
                    setData(response.data);

                    console.log(response.data);
                    const aaaa = generateListOption(response.data)
                    setOptionData(aaaa);
                }
            })
            .catch((error: any) => {

            });
    };


    const handelGetDataCourse = async (pagea: number) => {
        if (loadinga) {
            return;
        }

        setLoadinga(true);
        await api.get(`/courses?perPage=80&page=1&sortField=courseKeyMetric.currentSubscribers&sortDirection=DESC`)
            .then((response: any) => {
                console.log(response.data)
                if (response.status === 200) {
                    const datares: any[] = response.data.items;
                    // assume datares is an array of any objects
                    setData(datares);
                    setLoadinga(false);
                }
            }).catch((error: any) => {
                setLoadinga(false);
            })

    }


    const [form] = Form.useForm();
    const headers = {
        Accept: '*/*',
        Authorization: 'Bearer ' + auth.user?.accessToken,
    };

    const handleCreateNewCourse = async (inputData: any) => {
        dispatch(setLoading({}))
        await api.post('/courses/',
            inputData,
            {
                headers
            },

        ).then((response: any) => {
            if (response.status === 201) {
                form.resetFields()
                handelGetDataCourse(1)
                dispatch(setNotify({ typeNotify: "success", titleNotify: "Create new course successful!", messageNotify: 'You Create new course successful' }))
                dispatch(unsetLoading({}))
                setshowmodalcreatnew(false)
            }
        }).catch((error: any) => {
            console.log(error)
            dispatch(setNotify({ typeNotify: "error", titleNotify: "Create new course unsuccessful!", messageNotify: error.response.data.message }))
            dispatch(unsetLoading({}))
        })

    }

    const onFinish = (values: any) => {
        if (url_image != "") {
            const requirements = values.requirements.split('\n');
            const benefits = values.benefits.split('\n');
            const inputData = {
                name: values.name,
                description: values.description,
                image: url_image,
                headline: values.headline,
                price: values.price ? Number(values.price) : 0,
                level: Number(values.level),
                discount: values.discount ? Number(values.discount) : 0,
                language: "VN",
                requirements: requirements,
                benefits: benefits
            }
            handleCreateNewCourse(inputData)

        }

    };

    useEffect(() => {
        setLoadinga(true)
        handelGetDataCourse(page);
        handelGetDataCategories()
    }, []);

    return (


        <div style={{ height: "78vh", overflowY: 'scroll', padding: "5px 25px" }} >

            {
                loadinga ?
                    <>
                        <div className='flex justify-end pb-3'>
                            <Skeleton.Button active />
                        </div>

                        <Row gutter={[24, 24]} className='w-100%'>
                            <Col span={8}>
                                <Card bordered={false} className='!shadow-md'>
                                    <Skeleton active paragraph={{ rows: 4 }} />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card bordered={false} className='!shadow-md'>
                                    <Skeleton active paragraph={{ rows: 4 }} />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card bordered={false} className='!shadow-md'>
                                    <Skeleton active paragraph={{ rows: 4 }} />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card bordered={false} className='!shadow-md'>
                                    <Skeleton active paragraph={{ rows: 4 }} />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card bordered={false} className='!shadow-md'>
                                    <Skeleton active paragraph={{ rows: 4 }} />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card bordered={false} className='!shadow-md'>
                                    <Skeleton active paragraph={{ rows: 4 }} />
                                </Card>
                            </Col>
                        </Row>


                    </> : <>
                        <div className='flex justify-end pb-3'>
                            <Button onClick={() => { setshowmodalcreatnew(true) }}
                                className='border-green-600 shadow-md text-green-600 font-semibold hover:!text-green-600 hover:!border-green-600 hover:bg-sky-50'>Add</Button>
                        </div>


                        <Row gutter={[24, 24]} className='w-100%'>


                            {
                                data.map((course) => {
                                    return <AdminCourseItemComponent course={course} handelGetDataCourse={handelGetDataCourse} optionData={optionData} />

                                })
                            }



                        </Row>
                    </>
            }



            <Modal open={showmodalcreatnew} width={700} onCancel={() => {
                form.resetFields()
                setshowmodalcreatnew(false)
            }} footer={null}>
                <h4 className='text-xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-[#024cac] to-[#0492ff]'>Create new course</h4>
                <hr className='my-3'></hr>

                <UploadImageComponent url_image={url_image} seturl_image={seturl_image} />
                <Form
                    form={form}
                    layout="vertical"
                    style={{ maxWidth: 1000 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    className='mt-8'
                >

                    <Form.Item
                        label="Name"
                        name="name"
                        className='mb-4'
                        rules={[{ required: true, message: 'Please input name!', type: "string" }]}
                    >
                        <Input className='font-normal text-base' />
                    </Form.Item>
                    <div className='flex !justify-between'>
                        <Form.Item
                            label="Price"
                            name="price"
                            className='mb-4 w-[48%]'
                            initialValue={0}
                        >
                            <Input type='number' min={0} className='font-normal text-base w-[100%]' />
                        </Form.Item>
                        <Form.Item
                            label="Discount"
                            name="discount"
                            className='mb-4 w-[48%]'
                            initialValue={0}
                        >
                            <Input type='number' min={0} className='font-normal text-base' />
                        </Form.Item>
                    </div>
                    <Form.Item name="level" label="Level" initialValue={"1"} rules={[{ required: true }]}>
                        <Select
                            placeholder="Select a option"
                            allowClear

                        >
                            <Option value="1">Basic</Option>
                            <Option value="2">Advance</Option>

                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        className='mb-4'
                        rules={[{ required: true, message: 'Please input description!', type: "string" }]}
                    >
                        <TextArea rows={3} className='font-normal text-base' />
                    </Form.Item>

                    <Form.Item
                        label="Headline"
                        name="headline"
                        className='mb-4'
                        rules={[{ required: true, message: 'Please input headline!', type: "string" }]}
                    >
                        <Input className='font-normal text-base' />
                    </Form.Item>


                    <div className='!justify-between flex'>
                        <Form.Item
                            label="Requirements"
                            name="requirements"
                            className='mb-4 w-[48%]'
                            rules={[{ required: true, message: 'Please input requirements!', type: "string" }]}
                        >
                            <TextArea rows={4} className='font-normal text-base' />
                        </Form.Item>
                        <Form.Item
                            label="Benefits"
                            name="benefits"
                            className='mb-4 w-[48%]'
                            rules={[{ required: true, message: 'Please input benefits!', type: "string" }]}
                        >
                            <TextArea rows={4} className='font-normal text-base' />
                        </Form.Item>
                    </div>


                    <Form.Item className='mb-4 mt-7 text-center' >
                        <Button className='w-[150px] h-9 bg-gradient-to-r from-[#024cac] to-[#0492ff] hover:opacity-75 !font-medium !text-base' type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Form.Item>
                </Form>

            </Modal>


        </div>


    );
};

export default AdminCourseComponent;