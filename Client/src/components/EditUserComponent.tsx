import React, { useState } from 'react';
import { Button, Modal, Checkbox, Form, Input, Space } from 'antd';
import { FaApple, FaFacebookF, FaRegUser, FaTwitter } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, unsetLoading } from '../store/loadSlice';
import api from '../configs/axiosConfig';
import { setNotify } from '../store/notifycationSlide';
import { RootState } from '../store/types';
import { editUser } from '../store/authSlice';

interface props {
    setcontentModal: React.Dispatch<React.SetStateAction<number>>
};
interface EditData {
    firstName: string
    lastName: string
    phoneNumber: string
  }

const EditUserComponent: React.FC= () => {

    const auth = useSelector((state: RootState) => state.root.auth)
    const dispatch = useDispatch()
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        const inputData = {firstName: values.firstname, lastName: values.lastname, phoneNumber: values.phoneNumber}
        handelEditUser(inputData)
        console.log(inputData)
        
      };

      const headers = {
        Accept: '*/*',
        Authorization: 'Bearer ' + auth.user?.accessToken,
      };
    const handelEditUser = async (data: EditData) =>{
        dispatch(setLoading({}))
        await api.put('/users/profile',
            data,
            {
                headers
              },
       
        ).then((response:any)=>{
            if (response.status === 204){
                dispatch(editUser({firstName: data.firstName, lastName: data.lastName, phoneNumber: data.phoneNumber}))
                form.resetFields()
                dispatch(setNotify({typeNotify: "success", titleNotify: "Edit User successful!", messageNotify: 'You Edited User successful'}))
                dispatch(unsetLoading({}))
            }
        }).catch((error: any)=>{
            console.log(error)
            dispatch(setNotify({typeNotify: "error", titleNotify: "Edit User unsuccessful!", messageNotify: error.response.data.message}))
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
            className='mt-8'
        >
            <h4 className='text-xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-[#024cac] to-[#0492ff]'>Edit your information</h4>
            <hr className='my-3'></hr>
            <Space>
                <Form.Item
                    label="First name"
                    name="firstname"
                    initialValue={auth.user?.firstName}
                    className='mb-4'
                    rules={[{ required: true, message: 'Please input your first name!', type: "string" }]}
                >
                    <Input className='font-normal text-base'/>
                </Form.Item>
                <Form.Item

                    label="Last name"
                    name="lastname"
                    initialValue={auth.user?.lastName}
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
                initialValue={auth.user?.email}
            >
                <Input className='font-normal text-base' disabled/>
            </Form.Item>

            <Form.Item
                label="Phone Number"
                name="phoneNumber"
                className='mb-4'
                initialValue={auth.user?.phoneNumber}
                rules={[{ required: true, message: 'Please input your Phone Number!', type: "string" }]}
            >
                <Input className='font-normal text-base'/>
            </Form.Item>

            <Form.Item className='mb-4 mt-7' >
                <Button className='w-[150px] h-9 bg-gradient-to-r from-[#024cac] to-[#0492ff] hover:opacity-75 !font-medium !text-base' type="primary" htmlType="submit">
                    EDIT
                </Button>
            </Form.Item>
        </Form>
    );
}

export default EditUserComponent;