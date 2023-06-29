import api from '../../configs/axiosConfig';
import { setLoading, unsetLoading } from '../../store/loadSlice';
import { setNotify } from '../../store/notifycationSlide';
import { RootState } from '../../store/types';
import { Avatar, Button, Card, Col, Form, Input, Modal, Space, Tooltip } from 'antd';
import React, { useState, useEffect } from 'react'
import { BiEdit } from 'react-icons/bi';
import { BsFillEyeFill } from 'react-icons/bs';
import { MdDeleteForever } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import UploadImageComponent from '../UploadImageComponent';
import TextArea from 'antd/es/input/TextArea';
import Carousel from 'react-multi-carousel';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import type { SelectProps } from 'antd';


interface propstype {
    roadmap: {
        name: string,
        description: string,
        image: string,
        benefits: string[],
        deleteAt: number,
        requirements: string[],
        id: string,
        createAt: number,
        updateAt: number,
        duration: number,
        courseRoadmaps: any[]
    }
    getDataRoadmap: () => Promise<void>
    dataCourse: any[]

}

const AdminCardItemRoadmapComponent: React.FC<propstype> = ({ roadmap, getDataRoadmap, dataCourse }) => {
    const [onshowaction, setonshowaction] = useState(false)
    const [showmodalview, setshowmodalview] = useState(false)
    const [showmodaldelete, setshowmodaldelete] = useState(false)
    const auth = useSelector((state: RootState) => state.root.auth)
    const dispatch = useDispatch()
    const [showmodalupdate, setshowmodalupdate] = useState(false)
    const [datacoursechange, setdatacoursechange] = useState([])
    const [url_image, seturl_image] = useState(roadmap.image)
    const [roadmapcourse, setroadmapcourse] = useState([])
    const arrayNameCourse = dataCourse.map(course => {
        return {
            value: course.id,
            label: course.name
        }
    })
    const options: SelectProps['options'] = arrayNameCourse;

    const [form] = Form.useForm();


    const hangdelsetroadmap = () => {
        const aaa = roadmap.courseRoadmaps.map((con) => {
            return {
                courseId: con.courseId,
                title: con.title,
                description: con.description
            }
        })
        setroadmapcourse(aaa)
    }


    const headers = {
        Accept: '*/*',
        Authorization: 'Bearer ' + auth.user?.accessToken,
    };

    const handleDeleteRoadmap = async () => {
        dispatch(setLoading({}))
        await api.delete('/roadmaps/' + roadmap.id,

            {
                headers
            },

        ).then((response: any) => {
            if (response.status === 204) {
                getDataRoadmap()
                dispatch(setNotify({ typeNotify: "success", titleNotify: "Delete Roadmap successful!", messageNotify: 'You Delete Roadmap successful' }))
                dispatch(unsetLoading({}))
                setshowmodaldelete(false)
            }
        }).catch((error: any) => {
            console.log(error)
            dispatch(setNotify({ typeNotify: "error", titleNotify: "Delete Roadmap unsuccessful!", messageNotify: error.response.data.message }))
            dispatch(unsetLoading({}))
            setshowmodaldelete(false)
        })

    }

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 590 },
            items: 4,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 3000, min: 0 },
            items: 4,
            slidesToSlide: 3 // optional, default to 1.
        }
    };


    const handleUpdateRoadmap = async (inputData: any) => {
        dispatch(setLoading({}))
        await api.patch('/roadmaps/' + roadmap.id,
            inputData,
            {
                headers
            },

        ).then((response: any) => {
            if (response.status === 204) {
                form.resetFields()
                console.log(response)
                getDataRoadmap()
                dispatch(setNotify({ typeNotify: "success", titleNotify: "Edit Roadmap successful!", messageNotify: 'You Edit Roadmap successful' }))
                dispatch(unsetLoading({}))
                setshowmodalupdate(false)
            }
        }).catch((error: any) => {
            console.log(error)
            dispatch(setNotify({ typeNotify: "error", titleNotify: "Edit Roadmap unsuccessful!", messageNotify: error.response.data.message }))
            dispatch(unsetLoading({}))
            setshowmodalupdate(false)
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
            console.log(inputData)
            handleUpdateRoadmap(inputData)

        }


    };

    useEffect(() => {
        hangdelsetroadmap()

    }, [])




    return (
        <>
            <Col span={8}>
                <Card bordered={false} onMouseOver={() => { setonshowaction(true) }} onMouseLeave={() => { setonshowaction(false) }} key={roadmap.id} className='!shadow-lg cursor-pointer hover:bg-sky-100 bg-sky-50'>
                    <div className='flex justify-around items-start space-x-4'>
                        <Avatar src={roadmap.image} className='min-w-[80px] min-h-[80px] max-lg:min-w-[60px]  max-lg:min-h-[60px]' />
                        <div>
                            <h4 className='truncate text-lg font-bold mb-2 ' onClick={() => { setshowmodalview(true) }}>{roadmap.name}</h4>
                            <p className='text-webkit-line-clamp-3 '>{roadmap.description}</p>
                            <div className='flex justify-end mt-2'>
                                <Avatar.Group maxCount={2} size={"small"} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                                    {roadmap.courseRoadmaps[0] != undefined ? <><Avatar src={roadmap.courseRoadmaps[0].course.image} /></> : null}
                                    {roadmap.courseRoadmaps[1] != undefined ? <><Avatar src={roadmap.courseRoadmaps[1].course.image} /></> : null}
                                    <Avatar style={{ backgroundColor: '#f56a00' }}></Avatar>
                                    <Tooltip title="Ant User" placement="top">

                                    </Tooltip>

                                </Avatar.Group>

                            </div>


                        </div>
                    </div>

                    <div className='flex justify-end items-center space-x-4 h-0 relative'>
                        {onshowaction ? <div className='flex justify-center px-3  absolute bottom-0 py-3 shadow-lg rounded-lg items-center space-x-2 bg-slate-50'>
                            <Button size="small" onClick={() => { setshowmodalview(true) }} className='text-blue-600 border-blue-600 '><BsFillEyeFill /></Button>
                            <Button size="small" onClick={() => { setshowmodalupdate(true) }} className='text-yellow-600 border-yellow-600 mx-2'><BiEdit /></Button>
                            <Button size="small" onClick={() => { setshowmodaldelete(true) }} className='text-red-600 border-red-600'><MdDeleteForever /></Button>
                        </div> : null}

                    </div>

                </Card>
            </Col>
            <Modal open={showmodalview} onCancel={() => {
                setshowmodalview(false);
                form.resetFields();

            }} footer={null}>
                <div className='flex justify-around items-start space-x-4'>
                    <Avatar src={roadmap.image} className='min-w-[170px] min-h-[170px] !rounded-md' />
                    <div>
                        <h4 className='truncate text-lg font-bold mb-3 '>{roadmap.name}</h4>
                        <p className='!w[500px] '>{roadmap.description}</p>
                        <div className='flex justify-around mt-2'>
                            <div>
                                <h6 className='font-semibold text-blue-500 w-[100px]'>Requirements:</h6>

                                {roadmap.requirements == null ? null
                                    : roadmap.requirements.map(requi => {
                                        return <p className='text-xs truncate text-red-400' key={requi}>{requi} { }</p>
                                    })}
                            </div>
                            <div>
                                <h6 className='font-semibold text-blue-500 w-[100px]' >Benefits:</h6>
                                {roadmap.benefits == null ? null
                                    : roadmap.benefits.map((bene) => {
                                        return <p className='text-xs truncate text-green-400' key={bene}>{bene}</p>
                                    })}
                            </div>

                        </div>


                    </div>






                </div>
                <h5 className='font-bold mb-2'>List courses:</h5>
                <div className='flex justify-start items-center space-x-2 flex-nowrap' style={{ overflowX: "auto" }}>

                    {
                        roadmap.courseRoadmaps[0] != undefined ? <>{
                            roadmap.courseRoadmaps.map((course) => {
                                return <img className='rounded-sm !w-[100px] shadow-md' key={course.id} src={course.course.image} />
                            })
                        }</> : <div>...</div>
                    }

                </div>



            </Modal>
            {/* modal delete */}
            <Modal title={""} width={400} open={showmodaldelete} footer={false}
                onCancel={() => {
                    setshowmodaldelete(false)
                }} >
                <MdDeleteForever className='text-red-500 mx-auto my-1 text-[40px]' />

                <p className='text-base font-bold my-2 text-center text-red-500'> <span>Make sure you delete the roadmap</span></p>
                <p className='text-sm my-2 text-center truncate'> <span>Delete roadmap: </span> <span className="font-medium">{roadmap.name} </span></p>
                <div className='flex justify-end px-3 pt-4'>
                    <Button danger onClick={() => {

                        handleDeleteRoadmap()
                    }} >Delete</Button>
                </div>
            </Modal>

            {/* Modal edit */}
            <Modal open={showmodalupdate} width={600} onCancel={() => {
                form.resetFields();
                setshowmodalupdate(false)
            }} footer={null}>
                <h4 className='text-xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-[#024cac] to-[#0492ff]'>Edit roadmap</h4>
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
                        initialValue={roadmap.name}
                        rules={[{ required: true, message: 'Please input name!', type: "string" }]}
                    >
                        <Input className='font-normal text-base' />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        className='mb-4'
                        initialValue={roadmap.description}
                        rules={[{ required: true, message: 'Please input description!', type: "string" }]}
                    >
                        <Input className='font-normal text-base' />
                    </Form.Item>

                    <div className='flex !justify-between'>
                        <Form.Item
                            label="Requirements"
                            name="requirements"
                            initialValue={roadmap.requirements ? roadmap.requirements.join("\n") : ""}
                            className='mb-4 !w-[48%]'
                            rules={[{ required: true, message: 'Please input requirements!', type: "string" }]}
                        >
                            <TextArea rows={4} className='font-normal text-base' />
                        </Form.Item>
                        <Form.Item
                            label="Benefits"
                            name="benefits"
                            className='mb-4 !w-[48%]'
                            initialValue={roadmap.benefits ? roadmap.benefits.join("\n") : ""}
                            rules={[{ required: true, message: 'Please input benefits!', type: "string" }]}
                        >
                            <TextArea rows={4} className='font-normal text-base' />
                        </Form.Item>
                    </div>
                    <Form.List name="courses" initialValue={roadmapcourse}>
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
                            Edit
                        </Button>
                    </Form.Item>
                </Form>

            </Modal>




        </>
    );
}

export default AdminCardItemRoadmapComponent;