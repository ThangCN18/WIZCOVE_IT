import React, { useEffect, useState } from 'react'
import api from '../../configs/axiosConfig'
import { Avatar, Button, Card, Col, Form, Input, Modal, Row, Select, Skeleton, Space, Tooltip } from 'antd'
import { BsFillEyeFill } from 'react-icons/bs'
import { BiEdit } from 'react-icons/bi'
import { MdDeleteForever } from 'react-icons/md'
import AdminCardItemRoadmapComponent from './AdminCardItemRoadmapComponent'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/types'
import type { UploadFile } from 'antd/es/upload/interface';
import UploadImageComponent from '../UploadImageComponent'
import TextArea from 'antd/es/input/TextArea'
import { setLoading, unsetLoading } from '../../store/loadSlice'
import { setNotify } from '../../store/notifycationSlide'
interface typeRoadmap {
    name: string,
    description: string,
    image: string,
    benefits: string[],
    deleteAt: number,
    requirements: string[],
    id: string,
    createAt: number,
    updateAt: number,
    duration: number
    courseRoadmaps: any

}
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import type { SelectProps } from 'antd';


const AdminRoadmapComponent: React.FC = () => {
    const [loadSkeleton, setloadSkeleton] = useState(false)
    const [dataRoadmap, setdataRoadmap] = useState<typeRoadmap[]>([])
    const [dataCourse, setdataCourse] = useState<any[]>([])
    const [showmodalcreatnew, setshowmodalcreatnew] = useState(false)
    const [url_image, seturl_image] = useState("")
    const auth = useSelector((state: RootState) => state.root.auth)
    const dispatch = useDispatch()
    const arrayNameCourse = dataCourse.map(course => {
        return {
            value: course.id,
            label: course.name
        }
    })
    const options: SelectProps['options'] = arrayNameCourse;


    const getDataRoadmap = async () => {
        setloadSkeleton(true)
        await api.get(`/roadmaps`).then((response: any) => {
            if (response.status === 200) {
                console.log(response.data)
                setdataRoadmap(response.data)
                setloadSkeleton(false)
            }
        }).catch((error: any) => {
            console.log(error)
            setloadSkeleton(false)
        })

    }


    const getDatacourse = async () => {

        await api.get(`/courses?perPage=100`).then((response: any) => {
            if (response.status === 200) {
                setdataCourse(response.data.items)
                console.log(response.data.items)
            }
        }).catch((error: any) => {
            console.log(error)
        })

    }

    const [form] = Form.useForm();
    const headers = {
        Accept: '*/*',
        Authorization: 'Bearer ' + auth.user?.accessToken,
    };

    const handleCreateNewRoadmap = async (inputData: any) => {
        dispatch(setLoading({}))
        await api.post('/roadmaps/',
            inputData,
            {
                headers
            },

        ).then((response: any) => {
            if (response.status === 201) {

                form.resetFields()
                console.log(response)
                getDataRoadmap()
                dispatch(setNotify({ typeNotify: "success", titleNotify: "Create Roadmap successful!", messageNotify: 'You Create Roadmap successful' }))
                dispatch(unsetLoading({}))
                setshowmodalcreatnew(false)
                form.resetFields()
            }
        }).catch((error: any) => {
            console.log(error)
            dispatch(setNotify({ typeNotify: "error", titleNotify: "Create Roadmap unsuccessful!", messageNotify: error.response.data.message }))
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
                requirements: requirements,
                benefits: benefits,
                courses: values.courses
            }
            handleCreateNewRoadmap(inputData)

        }


    };

    useEffect(() => {
        setloadSkeleton(true)
        getDatacourse()
        getDataRoadmap()

    }, [])

    return (
        <div style={{ height: "78vh", overflowY: 'scroll', padding: "5px 25px" }} >

            {
                loadSkeleton ?
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
                                dataRoadmap.map((roadmap) => {
                                    return <AdminCardItemRoadmapComponent key={roadmap.id} roadmap={roadmap} getDataRoadmap={getDataRoadmap} dataCourse={dataCourse} />
                                    // return <Col span={8}>
                                    //     <Card bordered={false} onMouseOver={()=>{setonshowaction(true)}} onMouseLeave={()=>{setonshowaction(false)}} key={roadmap.id} className='!shadow-lg cursor-pointer hover:bg-sky-100 bg-sky-50'>
                                    //         <div className='flex justify-around items-center space-x-2'>
                                    //         <Avatar src={roadmap.image} className='min-w-[80px] min-h-[80px] max-lg:min-w-[60px]  max-lg:min-h-[60px]'/>
                                    //         <div>
                                    //         <h4 className='truncate text-lg font-bold mb-2 '>{roadmap.name}</h4>
                                    //         <p className='text-webkit-line-clamp-3 '>{roadmap.description}</p>
                                    //         <div className='flex justify-end mt-2'>
                                    //         <Avatar.Group maxCount={2} size={"small"} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                                    //             <Avatar src="https://joesch.moe/api/v1/random?key=2" />
                                    //             <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                                    //             <Tooltip title="Ant User" placement="top">

                                    //             </Tooltip>

                                    //             </Avatar.Group>

                                    //         </div>


                                    //         </div>
                                    //         </div>

                                    //         <div className='flex justify-end items-center space-x-4 h-0 relative'>
                                    //         {onshowaction? <div  className='flex justify-center px-5  absolute bottom-1 py-3 shadow-lg rounded-lg items-center space-x-4 bg-slate-50'>
                                    //             <Button size="small"  className='text-blue-600 border-blue-600 '><BsFillEyeFill /></Button>
                                    //             <Button size="small" className='text-yellow-600 border-yellow-600 mx-2'><BiEdit /></Button>
                                    //             <Button size="small"  className='text-red-600 border-red-600'><MdDeleteForever /></Button>
                                    //             </div>:null}

                                    //         </div>

                                    //     </Card>
                                    // </Col>
                                })
                            }



                        </Row>
                    </>
            }

            <>
                <Modal open={showmodalcreatnew} width={600} onCancel={() => {
                    form.resetFields()
                    setshowmodalcreatnew(false)
                }} footer={null}>
                    <h4 className='text-xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-[#024cac] to-[#0492ff]'>Create new roadmap</h4>
                    <hr className='my-3'></hr>

                    <UploadImageComponent url_image={url_image} seturl_image={seturl_image} />
                    <Form
                        form={form}
                        layout="vertical"
                        style={{ maxWidth: 600 }}
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
                        <Form.Item
                            label="Description"
                            name="description"
                            className='mb-4'
                            rules={[{ required: true, message: 'Please input description!', type: "string" }]}
                        >
                            <TextArea rows={3} className='font-normal text-base' />
                        </Form.Item>

                        <div className='flex !justify-between'>
                            <Form.Item
                                label="Requirements"
                                name="requirements"
                                className='mb-4 !w-[48%]'
                                rules={[{ required: true, message: 'Please input requirements!', type: "string" }]}
                            >
                                <TextArea rows={4} className='font-normal text-base !w-[100%]' />
                            </Form.Item>
                            <Form.Item
                                label="Benefits"
                                name="benefits"
                                className='mb-4 w-[48%]'
                                rules={[{ required: true, message: 'Please input benefits!', type: "string" }]}
                            >
                                <TextArea rows={4} className='font-normal text-base !w-[100%]' />
                            </Form.Item>
                        </div>
                        <Form.List name="courses" >
                            {(fields, { add, remove }) => (
                                <div>
                                    <p className='font-semibold'>List Courses:</p>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <>
                                            <div className='flex justify-between space-x-2 bg-gray-50 py-4 px-3 my-3 rounded-md'>
                                                <p className='font-semibold '>{key + 1}</p>
                                                <div className='!w-[95%] '>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'courseId']}
                                                        label="Course"
                                                        rules={[{ required: true, message: 'Missing course name' }]}
                                                    >
                                                        <Select
                                                            style={{ width: '100%' }}
                                                            options={options}
                                                        />
                                                    </Form.Item>

                                                    <Form.Item
                                                        {...restField}
                                                        label="Title"
                                                        name={[name, 'title']}
                                                        rules={[{ required: true, message: 'Missing title' }]}
                                                    >
                                                        <Input placeholder="Title" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'description']}
                                                        label="Description"
                                                        className='!pb-0 !mb-0'
                                                        rules={[{ required: true, message: 'Missing description' }]}
                                                    >
                                                        <TextArea placeholder="Description" />
                                                    </Form.Item>
                                                </div>
                                                <MinusCircleOutlined onClick={() => remove(name)} />

                                            </div>
                                        </>


                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add Course
                                        </Button>
                                    </Form.Item>
                                </div>
                            )}
                        </Form.List>


                        <Form.Item className='mb-4 mt-7 text-center' >
                            <Button className='w-[150px] h-9 bg-gradient-to-r from-[#024cac] to-[#0492ff] hover:opacity-75 !font-medium !text-base' type="primary" htmlType="submit">
                                Create
                            </Button>
                        </Form.Item>
                    </Form>

                </Modal>
            </>
        </div>

    );
}

export default AdminRoadmapComponent;