import api from '../../configs/axiosConfig';
import { setLoading, unsetLoading } from '../../store/loadSlice';
import { setNotify } from '../../store/notifycationSlide';
import { RootState } from '../../store/types';
import { Avatar, Badge, Button, Card, Col, Collapse, Form, Image, Input, InputNumber, Modal, Row, Space, Tooltip } from 'antd';
import React, { useState, useEffect } from 'react'
import { BiEdit } from 'react-icons/bi';
import { BsFillEyeFill } from 'react-icons/bs';
import { MdDeleteForever } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import UploadImageComponent from '../UploadImageComponent';
import TextArea from 'antd/es/input/TextArea';
import Carousel from 'react-multi-carousel';
import { GrFormAdd } from "react-icons/gr"
const { Option } = Select;
import { Select } from 'antd';
import type { SelectProps } from 'antd';
const { Panel } = Collapse;


import { useNavigate } from 'react-router-dom'
import { SiYoutubemusic } from 'react-icons/si';
import { AiOutlineMore } from 'react-icons/ai';
import AdminLectureComponent from './AdminLectureComponent';
import UploadFileComponent from '../UploadFileComponent';

interface propstype {
    section: any
    course: any
    handelGetDataCourse: () => Promise<void>
    index: any
}

const AdminSectionComponent: React.FC<propstype> = ({ section, course, handelGetDataCourse, index }) => {
    const [showmodalcreatel, setshowmodalcreatel] = useState(false)
    const [showmodaledit, setshowmodaledit] = useState(false)
    const [showmodaldelete, setshowmodaldelete] = useState(false)
    const auth = useSelector((state: RootState) => state.root.auth)
    const [url_image, seturl_image] = useState("")
    const [videoUrl, setvideoUrl] = useState('')
    const [fileUploadUrl, setfileUploadUrl] = useState("")
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const headers = {
        Accept: '*/*',
        Authorization: 'Bearer ' + auth.user?.accessToken,
    };


    const handledeleteSection = async () => {
        dispatch(setLoading({}))
        await api.delete(`/courses/${course.id}/sections/${section.id}`,
            {
                headers
            },

        ).then((response: any) => {
            if (response.status === 204) {
                handelGetDataCourse()
                dispatch(setNotify({ typeNotify: "success", titleNotify: "Delete section successful!", messageNotify: 'You delete section successful' }))
                dispatch(unsetLoading({}))
                setshowmodaldelete(false)
            }
        }).catch((error: any) => {
            console.log(error)
            dispatch(setNotify({ typeNotify: "error", titleNotify: "delete section unsuccessful!", messageNotify: error.response.data.message }))
            dispatch(unsetLoading({}))
        })

    }



    const [form] = Form.useForm();


    const handleaddLecture = async (inputData: any) => {
        dispatch(setLoading({}))
        await api.post(`/sections/${section.id}/lectures/`,
            inputData,
            {
                headers
            },

        ).then((response: any) => {
            if (response.status === 201) {
                form.resetFields()
                handelGetDataCourse()
                dispatch(setNotify({ typeNotify: "success", titleNotify: "Create lecture successful!", messageNotify: 'You Create lecture successful' }))
                dispatch(unsetLoading({}))
                setshowmodalcreatel(false)
            }
        }).catch((error: any) => {
            console.log(error)
            dispatch(setNotify({ typeNotify: "error", titleNotify: "Create lecture unsuccessful!", messageNotify: error.response.data.message }))
            dispatch(unsetLoading({}))
        })

    }


    const handleeditsection = async (inputData: any) => {
        dispatch(setLoading({}))
        await api.patch(`/courses/${course.id}/sections/${section.id}`,
            inputData,
            {
                headers
            },

        ).then((response: any) => {
            if (response.status === 204) {
                form.resetFields()
                handelGetDataCourse()
                dispatch(setNotify({ typeNotify: "success", titleNotify: "Edit section successful!", messageNotify: 'You Edit section successful' }))
                dispatch(unsetLoading({}))
                setshowmodaledit(false)
            }
        }).catch((error: any) => {
            console.log(error)
            dispatch(setNotify({ typeNotify: "error", titleNotify: "Edit section unsuccessful!", messageNotify: error.response.data.message }))
            dispatch(unsetLoading({}))
        })

    }


    const onFinish = (values: any) => {


        const inputData = {
            name: values.name,
            numSection: Number(values.numSection)
        }
        handleeditsection(inputData)
    };

    const onFinishcreatelecture = (values: any) => {


        const inputData = {
            name: values.name,
            description: values.description,
            duration: Number(values.duration),
            numLecture: Number(values.numLecture),
            videoUrl: values.videoUrl.split("/")[2] == "wizcoveit.netlify.app" ? values.videoUrl : values.videoUrl.split("/")[3],
            fileUploads: fileUploadUrl != '' && url_image != '' ? [{
                fileUploadUrl: fileUploadUrl,
                fileUploadId: url_image
            }] : []
        }
        handleaddLecture(inputData)
    };


    return (
        <>
            <Collapse accordion>
                <Panel header={<div className='flex justify-between items-center'>
                    <h5 className='text-base font-semibold truncate'>Section {String(index + 1) + ": " + section.name}</h5>
                    <div>
                        <Button size="small" onClick={() => { setshowmodaledit(true) }} className='text-blue-600 border-blue-600 '><BiEdit /></Button>
                        <Button size="small" onClick={() => { setshowmodaldelete(true) }} className='text-red-600 border-red-600 mx-2'><MdDeleteForever /></Button>
                        <Button size="small" onClick={() => { setshowmodalcreatel(true) }} className='text-green-600 border-green-600 '><GrFormAdd /></Button>
                    </div>
                </div>} key="1">

                    {
                        section.lectures ? <>
                            {
                                section.lectures.map(lecture => {
                                    return <AdminLectureComponent section={section} lecture={lecture} handelGetDataCourse={handelGetDataCourse} />
                                })
                            }
                        </> : null
                    }

                </Panel>
            </Collapse>


            <Modal title={""} width={400} open={showmodaldelete} footer={false}
                onCancel={() => {
                    setshowmodaldelete(false)
                }} >
                <MdDeleteForever className='text-red-500 mx-auto my-1 text-[40px]' />

                <p className='text-base font-bold my-2 text-center text-red-500'> <span>Make sure you delete the section</span></p>
                <p className='text-sm my-2 text-center truncate'> <span>Delete section: </span> <span className="font-medium">{section.name} </span></p>
                <div className='flex justify-end px-3 pt-4'>
                    <Button danger onClick={() => { handledeleteSection() }} >Delete</Button>
                </div>
            </Modal>

            <Modal open={showmodaledit} onCancel={() => { form.resetFields(); setshowmodaledit(false) }} footer={null}>
                <h4 className='text-xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-[#024cac] to-[#0492ff]'>Create new section</h4>
                <hr className='my-3'></hr>


                <Form
                    form={form}
                    layout="vertical"
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    className='mt-8'
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        className='mb-4'
                        rules={[{ required: true, message: 'Please input name!', type: "string" }]}
                        initialValue={section.name}
                    >
                        <Input className='font-normal text-base' />
                    </Form.Item>
                    <Form.Item
                        label="Section number"
                        name="numSection"
                        className='mb-4'
                        initialValue={section.numSection}
                        rules={[{ required: true, message: 'Please input section number!' }]}
                    >
                        <Input type='number' min={1} className='font-normal text-base' />
                    </Form.Item>


                    <Form.Item className='mb-4 mt-7 text-center' >
                        <Button className='w-[150px] h-9 bg-gradient-to-r from-[#024cac] to-[#0492ff] hover:opacity-75 !font-medium !text-base' type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>

            </Modal>


            <Modal open={showmodalcreatel} className='!w-[600px]' onCancel={() => { form.resetFields(); setshowmodalcreatel(false) }} footer={null}>
                <h4 className='text-xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-[#024cac] to-[#0492ff]'>Create New Lecture</h4>
                <hr className='my-3'></hr>

                <Form
                    form={form}
                    layout="vertical"
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    className='mt-8'
                    onFinish={onFinishcreatelecture}
                >
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Form.Item
                                label="Link video"
                                name="videoUrl"
                                className='mb-4'

                                rules={[{ required: true, message: 'Please input videoUrl!', type: "string" }]}
                            >
                                <Input onChange={e => { setvideoUrl(e.target.value) }} className='font-normal text-base' />
                            </Form.Item>
                            <div className='bg-gray-200 rounded-md w-100% h-[245px] overflow-hidden'>
                                {videoUrl ? <>{videoUrl.split("/")[3] ? <>
                                    {videoUrl.split("/")[2] == "wizcoveit.netlify.app" ?
                                        <img className='w-270 h-200' src='https://coursesbe.s3.ap-southeast-1.amazonaws.com/4d63594d-e135-41b3-947a-53d7c9d46119-01-google-workspace.jpg' />
                                        :
                                        <iframe width="270" height="245" src={"https://www.youtube.com/embed/" + videoUrl.split("/")[3]} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>

                                    }
                                </> : null}</> : null}
                            </div>

                        </Col>
                        <Col span={12}>
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
                                <TextArea className='font-normal text-base' />
                            </Form.Item>

                            <Space >
                                <Form.Item
                                    label="Duration"
                                    name="duration"
                                    className='mb-4'
                                    rules={[{ required: true, message: 'Please input duration!', type: "number" }]}
                                >
                                    <InputNumber type='number' min={1} className='font-normal text-base !w-[100%]' />
                                </Form.Item>
                                <Form.Item
                                    label="Number Lecture"
                                    name="numLecture"
                                    className='mb-4'
                                    rules={[{ required: true, message: 'Please input numLecture!', type: "number" }]}
                                >
                                    <InputNumber type='number' min={1} className='font-normal text-base !w-[100%]' />
                                </Form.Item>

                            </Space>
                            <p className='pb-2'>Lecture document</p>
                            <UploadFileComponent seturl_image={seturl_image} url_image={url_image} setfileUploadUrl={setfileUploadUrl} />

                        </Col>
                    </Row>


                    <Form.Item className='mb-4 mt-7 text-center' >
                        <Button className='w-[150px] h-9 bg-gradient-to-r from-[#024cac] to-[#0492ff] hover:opacity-75 !font-medium !text-base' type="primary" htmlType="submit">
                            Add
                        </Button>
                    </Form.Item>
                </Form>

            </Modal>




        </>
    );
}

export default AdminSectionComponent;