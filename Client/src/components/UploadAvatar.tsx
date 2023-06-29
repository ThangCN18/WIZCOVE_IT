

import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/types';
import { setLoading, unsetLoading } from '../store/loadSlice';
import api from '../configs/axiosConfig';
import { editUser } from '../store/authSlice';
import { setNotify } from '../store/notifycationSlide';

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const UploadAvatar: React.FC = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const auth = useSelector((state: RootState) => state.root.auth)
    const dispatch = useDispatch()
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([
        {
            uid: '-1',
            name: 'avartar.png',
            status: 'success',
            url: '/src/assets/images/default-avatar-profile.png',
        }
    ]);

    const handleCancel = () => setPreviewOpen(false);
    const formData = new FormData();

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
        setFileList(newFileList);
        if (fileList.length < 1) {
            newFileList.forEach((file) => {
                formData.append('file', file.originFileObj);
            });

            const headers = {
                Accept: '*/*',
                Authorization: 'Bearer ' + auth.user?.accessToken,
                'content-type': 'multipart/form-data'
            };

            dispatch(setLoading({}))
            await api.post('/upload',
                formData,
                {
                    headers
                },

            ).then((response: any) => {
                if (response.status === 201) {
                    console.log(response.data.fileUpload.id)
                    getImage(response.data.fileUpload.id)
                }
            }).catch((error: any) => {
                console.log(error)
                dispatch(setNotify({ typeNotify: "error", titleNotify: "Edit User unsuccessful!", messageNotify: "You Edited avatar unsuccessful" }))
                dispatch(unsetLoading({}))
            })




        }

    }
    const uploadButton = (
        <div >
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const getImage = async (id: string) => {

        await api.put('/upload/update-acl',
            {
                "fileUploadId": id
            },
            {
                headers: {
                    Accept: '*/*',
                    Authorization: 'Bearer ' + auth.user?.accessToken,
                }
            },

        ).then((response: any) => {
            if (response.status === 200) {
                console.log(response.data)
                handelEditUser({ avatar: response.data.url })              
               
            }
        }).catch((error: any) => {
            console.log(error)
            dispatch(setNotify({ typeNotify: "error", titleNotify: "Edit User unsuccessful!", messageNotify: error.response.data.message }))
            dispatch(unsetLoading({}))
        })
    }


    const handelEditUser = async (data: {avatar: string}) =>{
        dispatch(setLoading({}))
        await api.put('/users/profile',
            data,
            {
                headers: {
                    Accept: '*/*',
                    Authorization: 'Bearer ' + auth.user?.accessToken,
                }
              },
       
        ).then((response:any)=>{
            if (response.status === 204){
                dispatch(editUser({avatar: data.avatar}))
                dispatch(setNotify({ typeNotify: "success", titleNotify: "Edit avatar successful!", messageNotify: "You Edited avatar successful" }))
                dispatch(unsetLoading({}))
            }
        }).catch((error: any)=>{
            console.log(error)
            dispatch(setNotify({typeNotify: "error", titleNotify: "Edit User unsuccessful!", messageNotify: error.response.data.message}))
            dispatch(unsetLoading({}))
        })
        
    }

    useEffect(() => {
        if (auth.user?.avatar) {
            setFileList([
                {
                    uid: '-1',
                    name: 'avartar.png',
                    status: 'success',
                    url: auth.user?.avatar,
                }
            ])
        }

    }, [])

    return (
        <>
            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-circle"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
};
export default UploadAvatar;