

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
import { MdDeleteForever } from 'react-icons/md';

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

const AdminUserDeleteComponent: React.FC<props>= ({user}) => {
    
    return (

            <>
            <MdDeleteForever className='text-red-500 mx-auto my-1 text-[40px]' />
            
            <p className='text-base font-bold my-2 text-center text-red-500'> <span>Make sure you delete the user</span></p>
            <p className='text-sm my-2 text-center truncate'> <span>Id user delete: </span> <span className="font-medium">{user.key} </span></p>
            <div className='flex justify-end px-3 pt-4'>
            <Button  danger >Delete</Button>
            </div>
            </> 
    );
}

export default AdminUserDeleteComponent;