import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'
import { setLoading, unsetLoading } from '../store/loadSlice'
import api from '../configs/axiosConfig'
import { Button, Modal, Checkbox, Form, Input, Space } from 'antd';
import { FaApple, FaFacebookF, FaRegUser, FaTwitter } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc"
import { Link } from 'react-router-dom';
import SignUpComponent from "./SignUpComponent"
import { HiArrowSmLeft } from "react-icons/hi"
import ForgotComponent from './ForgotComponent';
import { setNotify } from '../store/notifycationSlide';
import SignUpSucccessComponent from './SignUpSucccessComponent';


interface props {
    showModalLogin: boolean,
    setshowModalLogin: React.Dispatch<React.SetStateAction<boolean>>
};
interface LoginData {
    email: string
    password: string
}

const LoginComponent: React.FC<props> = ({ showModalLogin, setshowModalLogin }) => {
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    )

    useEffect(() => {
        window
            .matchMedia("(min-width: 768px)")
            .addEventListener('change', e => setMatches(e.matches));
    }, []);

    const dispatch = useDispatch()
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        const inputData = { email: values.email, password: values.password }
        handelLogin(inputData)

    };

    const handelLogin = async (data: LoginData) => {
        dispatch(setLoading({}))
        await api.post('/auth/login', data).then((response: any) => {
            if (response.status === 200) {
                const data = {
                    id: response.data.user.id,
                    email: response.data.user.email,
                    lastName: response.data.user.lastName,
                    firstName: response.data.user.firstName,
                    role: response.data.user.role,
                    avatar: response.data.user.avatar,
                    phoneNumber: response.data.user.phoneNumber,
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken,
                }
                dispatch(login(data))

                form.resetFields()
                setshowModalLogin(false)
                dispatch(unsetLoading({}))

            }
        }).catch((error: any) => {
            console.log(error)
            dispatch(setNotify({ typeNotify: "error", titleNotify: "Login unsuccessful!", messageNotify: error.response.data.message }))
            dispatch(unsetLoading({}))
        })

    }

    const [contentModal, setcontentModal] = useState(1);

    return (
        <Modal width={matches ? 600 : 350}

            title={
                contentModal === 1 ?
                    <>
                        <div className='flex justify-start  items-center space-x-2'>
                            <Button className="!p-0 border-none bg-gray-100 w-[37px] h-[37px] rounded-full flex justify-center items-center">
                                <div className="text-base"><FaRegUser className=' text-[#01a1fa]' /></div></Button>

                            <p className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r  from-[#01a1fa] to-[#1ddbb7]'>Sign In</p> </div> </> :
                    contentModal === 2 ?
                        <><div className='flex justify-start items-center space-x-2'>
                            <Button
                                onClick={() => setcontentModal(1)}
                                className="!p-0 border-none bg-gray-100 w-[37px] h-[37px] rounded-full flex justify-center items-center">
                                <div className="text-base"><HiArrowSmLeft className=' text-[#01a1fa]' /></div></Button>

                            <p className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r  from-[#01a1fa] to-[#1ddbb7]'>Sign Up</p> </div> </>
                        : contentModal === 3 ?
                            <><div className='flex justify-start items-center space-x-2'>
                                <Button
                                    onClick={() => setcontentModal(1)}
                                    className="!p-0 border-none bg-gray-100 w-[37px] h-[37px] rounded-full flex justify-center items-center">
                                    <div className="text-base"><HiArrowSmLeft className=' text-[#01a1fa]' /></div></Button>

                                <p

                                    className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r  from-[#01a1fa] to-[#1ddbb7]'>Forgot password</p> </div> </>
                            : null
            }

            className='!max-w-[400px]'
            open={showModalLogin} onOk={() =>
                setshowModalLogin(false)}
            onCancel={() => {
                setcontentModal(1);
                setshowModalLogin(false)
            }}
            footer={null}
        >
            {
                contentModal === 1 ?
                    <p className='my-4 font-normal text-base text-gray-700'>Sign In to your account - enjoy exclusive features and many more for.</p>

                    : contentModal === 2 ?
                        <p className='my-4 font-normal text-base text-gray-700'>Sign Up a new account - enjoy exclusive features and many more for.</p>
                        : contentModal === 3 ?
                            <p className='my-4 font-normal text-base text-gray-700'>We will send information about your new password to your email.</p> :
                            null
            }

            {contentModal === 1 ?
                <Form
                    form={form}
                    name="basic"
                    layout="vertical"
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
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
                            <Checkbox className='text-left text-[#01a1fa]' >Remember me</Checkbox>
                        </Form.Item>
                        <p onClick={() => setcontentModal(3)} className='text-[#01a1fa] cursor-pointer'>Forgot password</p>
                    </div>


                    <Form.Item className='mb-4' >
                        <Button className='w-[100%] h-9 bg-gradient-to-r  from-[#01a1fa] to-[#1ddbb7] hover:opacity-75 !font-medium !text-base' type="primary" htmlType="submit">
                            Sign In
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
                    <p className='my-4 text-gray-700 text-base text-center'>Don't have account?
                        <Button type="text" className='text-[#01a1fa] hover:!bg-transparent font-medium hover:!text-[#01a1fa] px-2'
                            onClick={() => setcontentModal(2)}
                        >Sign Up</Button></p>
                </Form>
                : contentModal === 2 ?
                    <SignUpComponent setcontentModal={setcontentModal} />
                    : contentModal === 3 ?
                        <ForgotComponent setcontentModal={setcontentModal} /> :
                        <SignUpSucccessComponent />

            }

        </Modal>


    );
}

export default LoginComponent;