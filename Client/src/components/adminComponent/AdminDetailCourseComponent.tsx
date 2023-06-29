import { Button, Collapse, Form, Input, Modal, Skeleton, Space } from 'antd'
import api from '../../configs/axiosConfig'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BiEdit } from 'react-icons/bi';
import { SiYoutubemusic } from "react-icons/si"
import { AiOutlineMore } from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import { setLoading, unsetLoading } from '../../store/loadSlice';
import { setNotify } from '../../store/notifycationSlide';
import AdminSectionComponent from './AdminSectionComponent';
const { Panel } = Collapse;

const AdminDetailCourseComponent: React.FC = () => {

    const [loadinga, setLoadinga] = useState(false)
    const location = useLocation()
    const [course, setcourse] = useState<any>(null)
    const [showmodalcreatnew, setshowmodalcreatnew] = useState(false)
    const auth = useSelector((state: RootState) => state.root.auth)
    const dispatch = useDispatch()

    const location_id = location.pathname.split('/')[3]


    const handelGetDataCourse = async () => {
        if (loadinga) {
            return;
        }
        await api.get(`/courses/${location_id}`)
            .then((response: any) => {
                if (response.status === 200) {
                    setcourse(response.data)
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
        await api.post(`/courses/${course.id}/sections/`,
            inputData,
            {
                headers
            },
        ).then((response: any) => {
            if (response.status === 201) {
                form.resetFields()
                handelGetDataCourse()
                dispatch(setNotify({ typeNotify: "success", titleNotify: "Create new section successful!", messageNotify: 'You Create new section successful' }))
                dispatch(unsetLoading({}))
                setshowmodalcreatnew(false)
            }
        }).catch((error: any) => {
            console.log(error)
            dispatch(setNotify({ typeNotify: "error", titleNotify: "Create new section unsuccessful!", messageNotify: error.response.data.message }))
            dispatch(unsetLoading({}))
        })

    }

    const onFinish = (values: any) => {


        const inputData = {
            name: values.name,
            numSection: Number(values.numSection)
        }
        handleCreateNewCourse(inputData)



    };


    useEffect(() => {
        handelGetDataCourse()
    }, [])

    return (
        <>
            {
                course ? <>
                    <Space direction="vertical" className='w-[100%] '>
                        <div className='flex justify-between items-center'>
                            <h5 className='mb-4 text-lg font-bold truncate'>{course.name}</h5>
                            <Button onClick={() => { setshowmodalcreatnew(true) }}>Add Section</Button>
                        </div>

                        {
                            course.sections ? <>
                                {
                                    course.sections.map((section, index) => {
                                        return <AdminSectionComponent section={section} index={index} course={course} handelGetDataCourse={handelGetDataCourse} />
                                    })
                                }
                            </> : null
                        }

                    </Space>


                </> : <>
                    <Skeleton active paragraph={null} className='!w-[50%] !text-4xl mb-3' />
                    <Skeleton.Button active className='!w-[100%] !h-[45px] mb-3' />
                    <Skeleton.Button active className='!w-[100%] !h-[45px] mb-3' />
                    <Skeleton.Button active className='!w-[100%] !h-[45px] mb-3' />
                    <Skeleton.Button active className='!w-[100%] !h-[45px] mb-3' />
                    <Skeleton.Button active className='!w-[100%] !h-[45px] mb-3' />
                    <Skeleton.Button active className='!w-[100%] !h-[45px] mb-3' />
                    <Skeleton.Button active className='!w-[100%] !h-[45px] mb-3' />
                    <Skeleton.Button active className='!w-[100%] !h-[45px] mb-3' />
                    <Skeleton.Button active className='!w-[100%] !h-[45px]' />
                </>
            }

            <Modal open={showmodalcreatnew} onCancel={() => {
                form.resetFields()
                setshowmodalcreatnew(false)
            }} footer={null}>
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
                    >
                        <Input className='font-normal text-base' />
                    </Form.Item>
                    <Form.Item
                        label="Section number"
                        name="numSection"
                        className='mb-4'
                        rules={[{ required: true, message: 'Please input section number!' }]}
                    >
                        <Input type='number' min={1} className='font-normal text-base' />
                    </Form.Item>


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

export default AdminDetailCourseComponent;