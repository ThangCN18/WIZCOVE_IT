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






const ForgotComponent: React.FC<props> = ({ setcontentModal }) => {

    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        const inputData = { email: values.email }
        handelLogin(inputData)
    };

    const handelLogin = async (data: any) => {
        dispatch(setLoading({}))
        await api.post('/auth/forgot-password/', data).then((response: any) => {
            if (response.status === 204) {
                dispatch(setNotify({ typeNotify: "success", titleNotify: "Forgot successful!", messageNotify: "Pleace go to your email to change your password" }))
                form.resetFields()
                dispatch(unsetLoading({}))

            }
        }).catch((error: any) => {
            console.log(error)
            dispatch(setNotify({ typeNotify: "error", titleNotify: "Forgot unsuccessful!", messageNotify: error.response.data.message }))
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

            <Form.Item
                label="Email"
                name="email"
                className='mb-4'
                rules={[{ required: true, message: 'Please input your email!', type: "email" }]}
            >
                <Input className='font-normal text-base' />
            </Form.Item>

            <Form.Item className='mb-4' >
                <Button className='w-[100%] h-9 bg-gradient-to-r  from-[#01a1fa] to-[#1ddbb7] hover:opacity-75 !font-medium !text-base' type="primary" htmlType="submit">
                    Send
                </Button>
            </Form.Item>

        </Form>
    );
}

export default ForgotComponent;