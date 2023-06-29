import React, { useState } from 'react';
import { Button, Modal, Checkbox, Form, Input, Space } from 'antd';
import { FaApple, FaFacebookF, FaRegUser, FaTwitter } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc"
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoading, unsetLoading } from '../store/loadSlice';
import api from '../configs/axiosConfig';
import { setNotify } from '../store/notifycationSlide';

interface props {
    setcontentModal: React.Dispatch<React.SetStateAction<number>>
};
interface RegisterData {
    firstName: string
    lastName: string
    email: string
    password: string
}

const SignUpComponent: React.FC<props> = ({ setcontentModal }) => {


    const dispatch = useDispatch()
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        const inputData = { firstName: values.firstname, lastName: values.lastname, email: values.email, password: values.password }
        handelRegister(inputData)
        console.log(inputData)

    };

    const handelRegister = async (data: RegisterData) => {
        dispatch(setLoading({}))
        await api.post('/auth/sign-up', data).then((response: any) => {
            if (response.status === 201) {
                form.resetFields()
                dispatch(unsetLoading({}))
                setcontentModal(4)
            }
        }).catch((error: any) => {
            console.log(error)
            dispatch(setNotify({ typeNotify: "error", titleNotify: "Sign-up unsuccessful!", messageNotify: error.response.data.message }))
            dispatch(unsetLoading({}))
        })

    }



    return (
        <Form
            name="basic"
            layout="vertical"
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Space>
                <Form.Item
                    label="First name"
                    name="firstname"
                    className='mb-4'
                    rules={[{ required: true, message: 'Please input your first name!', type: "string" }]}
                >
                    <Input className='font-normal text-base' />
                </Form.Item>
                <Form.Item

                    label="Last name"
                    name="lastname"
                    className='mb-4'
                    rules={[{ required: true, message: 'Please input your last name!', type: "string" }]}
                >
                    <Input className='font-normal text-base' />
                </Form.Item>
            </Space>
            <Form.Item
                label="Email"
                name="email"
                className='mb-4'
                rules={[{ required: true, message: 'Please input your email!', type: "email" }]}
            >
                <Input className='font-normal text-base' />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                className='mb-2'
                rules={[{ required: true, message: 'Please input your password!', type: "string" },
                {
                    message: 'Password must be 5 characters long, including A-Z, a-z, 0-9, @$!%*#?&.',
                    validator: (_, value) => {
                        if (value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&.])[a-z A-Z 1-9 @$!%*#?&.].{5,}$/)) {
                            return Promise.resolve();
                        } else {
                            return Promise.reject('Some message here');
                        }
                    }
                }
                ]}
            >
                <Input.Password className='font-normal text-base' />
            </Form.Item>
            <div className='flex justify-between items-center mb-4'>
                <Form.Item name="remember" valuePropName="checked" className='my-0'>
                    <Checkbox className='text-left text-[#01a1fa]' >Accept with our terms</Checkbox>
                </Form.Item>
                <Link to="/terms" className='text-[#01a1fa]'>Terms</Link>
            </div>


            <Form.Item className='mb-4' >
                <Button className='w-[100%] h-9 bg-gradient-to-r  from-[#01a1fa] to-[#1ddbb7] hover:opacity-75 !font-medium !text-base' type="primary" htmlType="submit">
                    Sign Up
                </Button>
            </Form.Item>
            <p className='mb-4 font-bold text-base text-center text-gray-500'>or</p>
            <div className='flex justify-center items-center space-x-3 mb-4'>
                <Button className="!p-0 border-none bg-gray-100 w-[37px] h-[37px] rounded-full flex justify-center items-center">
                    <div className="text-base"><FcGoogle className=' text-[#01a1fa]' /></div></Button>
                <Button className="!p-0 border-none bg-gray-100 w-[37px] h-[37px] rounded-full flex justify-center items-center">
                    <div className="text-base"><FaFacebookF className=' text-blue-700' /></div></Button>
                <Button className="!p-0 border-none bg-gray-100 w-[37px] h-[37px] rounded-full flex justify-center items-center">
                    <div className="text-base"><FaTwitter className=' text-[#01a1fa]' /></div></Button>
                <Button className="!p-0 border-none bg-gray-100 w-[37px] h-[37px] rounded-full flex justify-center items-center">
                    <div className="text-base"><FaApple className=' text-gray-700' /></div></Button>
            </div>
            <hr className='bg-slate-300 !h-[1px] border-none' />
            <p className='my-4 text-gray-700 text-base text-center'>Already have an account?
                <Button type="text" className='text-[#01a1fa] hover:!bg-transparent font-medium hover:!text-[#01a1fa] px-2'
                    onClick={() => setcontentModal(1)}
                >Sign In</Button></p>
        </Form>
    );
}

export default SignUpComponent;