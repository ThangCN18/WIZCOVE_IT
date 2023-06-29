

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
import { editUser } from '../../store/authSlice';

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

const AdminUserShowComponent: React.FC<props>= ({user}) => {
    
    return (

            <Form 
            name="basic"
            layout="vertical"
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            className='mt-8'
        >
           
            <Avatar size={"large"} className='w-[100px] h-[100px] mx-auto block mb-3' src={user.avatar}/>
            <h4 className='text-base font-semibold text-center  '>{user.lastName+" "+user.firstName}</h4>
            <p className='text-xs text-gray-600 text-center truncate'>{"Id user: "+user.key}</p>
            <hr className='my-3 mb-4'></hr>
            <p className='text-sm my-2'><span className="font-medium">Email: </span><span>{user.email}</span></p>
            <p className='text-sm my-2'><span className="font-medium">Role: </span><span>{user.role}</span></p>
            <p className='text-sm my-2'><span className="font-medium">Phone Number: </span><span>{user.phoneNumber}</span></p>
            </Form>


       
    );
}

export default AdminUserShowComponent;