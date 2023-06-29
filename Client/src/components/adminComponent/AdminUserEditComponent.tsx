

import React, { useEffect, useState } from 'react';
import { Button, Modal, Checkbox, Form, Input, Space, Avatar } from 'antd';
import { FaApple, FaFacebookF, FaRegUser, FaTwitter } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, unsetLoading } from '../../store/loadSlice';
import api from '../../configs/axiosConfig';
import { setNotify } from '../../store/notifycationSlide';
import { RootState } from '../../store/types';

interface props {
    user: UserData
};
interface UserData {
        key: string
        email: string
        lastName: string
        firstName: string
        role: string
        avatar: string
        phoneNumber: string
      }

const AdminUserEditComponent: React.FC<props>= ({user}) => {
    
    return (

            <Form 
            name="basic"
            layout="vertical"
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            className='mt-8'
        >
            
            <h4 className='text-xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-[#024cac] to-[#0492ff]'>Edit information</h4>
            <hr className='my-3'></hr>
            <Avatar size={"large"} className='w-[100px] h-[100px] mx-auto block mb-3' src={user.avatar}/>
            <Space>
                <Form.Item
                    label="First name"
                    name="firstname"
                    initialValue={user.firstName}
                    className='mb-4'
                    rules={[{ required: true, message: 'Please input your first name!', type: "string" }]}
                >
                    <Input className='font-normal text-base'/>
                </Form.Item>
                <Form.Item

                    label="Last name"
                    name="lastname"
                    initialValue={user.lastName}
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
                initialValue={user.email}
            >
                <Input className='font-normal text-base' disabled/>
            </Form.Item>

            <Form.Item
                label="Phone Number"
                name="phoneNumber"
                className='mb-4'
                initialValue={user.phoneNumber}
                rules={[{ required: true, message: 'Please input your Phone Number!', type: "string" }]}
            >
                <Input className='font-normal text-base'/>
            </Form.Item>

            <Form.Item className='mb-4 mt-7 flex justify-end' >
                <Button className='w-[150px] h-9 bg-gradient-to-r from-[#024cac] to-[#0492ff] hover:opacity-75 !font-medium !text-base' type="primary" htmlType="submit">
                    EDIT
                </Button>
            </Form.Item>
       
            </Form>


       
    );
}

export default AdminUserEditComponent;