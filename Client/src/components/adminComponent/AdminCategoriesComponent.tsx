import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Cascader, Col, Divider, Form, Image, Input, List, Modal, Row, Select, Skeleton, Space, Tag, Tree } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import api from '../../configs/axiosConfig';
import AdminCourseItemComponent from './AdminCourseItemComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import UploadImageComponent from '../UploadImageComponent';
import TextArea from 'antd/es/input/TextArea';
import { setLoading, unsetLoading } from '../../store/loadSlice';
import { setNotify } from '../../store/notifycationSlide';
import {
    DownOutlined,
} from '@ant-design/icons';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteForever } from 'react-icons/md';

const { Option } = Select;

const AdminCategoriesComponent: React.FC = () => {
    const [loadinga, setLoadinga] = useState(false);
    const [showmodaledit, setshowmodaledit] = useState(false);
    const [valueedit, setvalueedit] = useState("")
    const [showmodaldelete, setshowmodaldelete] = useState(false);
    const [idselect, setidselect] = useState({})
    const [data, setData] = useState<any[]>([]);
    const [treeData, settreeData] = useState<any[]>([])
    const [optionData, setOptionData] = useState<any[]>([])
    const [selectedValue, setSelectedValue] = useState('');
    const auth = useSelector((state: RootState) => state.root.auth)
    const dispatch = useDispatch()

    const generateListOption = (data) => {
        const datares = [];
        for (let i = 0; i < data.length; i++) {
            const node = data[i];
            const { id, name, children } = node;
            let addnode = {}
            if (children) {
                addnode = {
                    value: id,
                    label: name,
                    children: children.length > 0 ? generateListOption(children) : [],
                };
                datares.push(addnode);
            }


        }
        return datares;
    };

    const generateList = (data) => {
        const datares = [];
        for (let i = 0; i < data.length; i++) {
            const node = data[i];
            const { id, name, children } = node;
            let addnode = {}
            if (children) {
                addnode = {
                    key: id,
                    title: <span className='flex justify-start items-center space-x-2'>
                        <span>{name}</span>
                        <FiEdit className='text-gray-600 hover:text-black' onClick={() => {
                            setidselect(node)
                            setvalueedit(name)
                            setshowmodaledit(true)
                        }} />
                        <MdDeleteForever onClick={() => {
                            setidselect(node)
                            setshowmodaldelete(true)
                        }} className='text-base text-gray-600 hover:text-black' /></span>,
                    children: children.length > 0 ? generateList(children) : [],
                };

            } else {
                addnode = {
                    key: id,
                    title: <span className='flex justify-start items-center space-x-2'>
                        <span>{name}</span>
                        <FiEdit className='text-gray-600 hover:text-black' onClick={() => {
                            setidselect(node)
                            setvalueedit(name)
                            setshowmodaledit(true)
                        }} />
                        <MdDeleteForever onClick={() => {
                            setidselect(node)
                            setshowmodaldelete(true)
                        }} className='text-base text-gray-600 hover:text-black' /></span>,
                };
            }

            datares.push(addnode);
        }
        return datares;
    };

    const handelGetDataCategories = async () => {
        if (loadinga) {
            return;
        }
        await api
            .get(`/categories`)
            .then((response: any) => {
                if (response.status === 200) {
                    setData(response.data);
                    setLoadinga(false);
                    console.log(response.data);
                    setOptionData(generateListOption(response.data));
                    settreeData(generateList(response.data));
                }
            })
            .catch((error: any) => {
                setLoadinga(false);
            });
    };


    const [form] = Form.useForm();

    const hangdelResert = () => {
        form.resetFields()
    }
    const headers = {
        Accept: '*/*',
        Authorization: 'Bearer ' + auth.user?.accessToken,
    };


    const handleCreateNewCategories = async (inputData: any) => {
        dispatch(setLoading({}))
        await api.post('/categories/',
            inputData,
            {
                headers
            },

        ).then((response: any) => {
            if (response.status === 201) {
                form.resetFields()
                dispatch(setNotify({ typeNotify: "success", titleNotify: "Create new categories successful!", messageNotify: 'You Create new categories successful' }))
                dispatch(unsetLoading({}))
                handelGetDataCategories()
            }
        }).catch((error: any) => {
            console.log(error)
            dispatch(setNotify({ typeNotify: "error", titleNotify: "Create new categories unsuccessful!", messageNotify: error.response.data.message }))
            dispatch(unsetLoading({}))
        })

    }

    const handledeleteCategories = async (id: string) => {
        dispatch(setLoading({}))
        await api.delete('/categories/' + id,

            {
                headers
            },

        ).then((response: any) => {
            if (response.status === 204) {
                dispatch(setNotify({ typeNotify: "success", titleNotify: "Delete categories successful!", messageNotify: 'You Delete categories successful' }))
                dispatch(unsetLoading({}))
                handelGetDataCategories()
                setshowmodaldelete(false)
            }
        }).catch((error: any) => {
            console.log(error)
            dispatch(setNotify({ typeNotify: "error", titleNotify: "Delete categories unsuccessful!", messageNotify: error.response.data.message }))
            dispatch(unsetLoading({}))
            setshowmodaldelete(false)
        })
    }

    const handleeditCategories = async (id: string) => {
        dispatch(setLoading({}))
        await api.patch('/categories/' + id,
            {
                name: valueedit
            },
            {
                headers
            },

        ).then((response: any) => {
            if (response.status === 204) {
                dispatch(setNotify({ typeNotify: "success", titleNotify: "Edit categories successful!", messageNotify: 'You Edit categories successful' }))
                dispatch(unsetLoading({}))
                handelGetDataCategories()
                setshowmodaledit(false)
            }
        }).catch((error: any) => {
            console.log(error)
            dispatch(setNotify({ typeNotify: "error", titleNotify: "Edit categories unsuccessful!", messageNotify: error.response.data.message }))
            dispatch(unsetLoading({}))
            setshowmodaledit(false)

        })
    }

    const onFinish = (values: any) => {
        const bodydata = values.parent ?
            {
                name: values.categories,
                parentId: values.parent[values.parent.length - 1]
            } :
            { name: values.categories }
        handleCreateNewCategories(bodydata)

    };

    useEffect(() => {
        setLoadinga(true)
        handelGetDataCategories()
    }, []);

    return (


        <div style={{ height: "78vh", padding: "5px 25px" }} >

            {
                loadinga ?
                    <>

                    </> : <>
                        <Row gutter={24} className='bg-gray-100 py-4 rounded-lg h-[78vh] shadow-lg'>
                            <Col span={12}>
                                <h3 className='text-lg font-semibold mb-3 text-blue-600'>Add Categories</h3>
                                <div className='h-[85%] w-[100%] flex justify-center items-center'>
                                    <Form
                                        form={form}
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        layout='vertical'

                                        onFinish={onFinish}
                                    >
                                        <Form.Item
                                            label="Categories"
                                            name="categories"
                                            rules={[{ required: true, message: 'Please input categories!' }]}
                                        >
                                            <Input className='w-[400px]' />
                                        </Form.Item>
                                        <Form.Item
                                            label="Parent"
                                            name="parent"
                                        // rules={[{ required: true, message: 'Please select parent!' }]}
                                        >
                                            <Cascader
                                                options={optionData}
                                                expandTrigger="hover"
                                                className='!w-[400px]'
                                                changeOnSelect={true}

                                            />
                                        </Form.Item>
                                        <div className='flex justify-end space-x-2'>
                                            <Button onClick={hangdelResert} className='border-gray-500'>Resert</Button>
                                            <Button htmlType='submit' type='default' className='border-none bg-blue-500 text-white hover:bg-blue-400 hover:!text-white '>Add new</Button>
                                        </div>

                                    </Form>
                                </div>

                            </Col>
                            <Col span={12}>
                                <h3 className='text-lg font-semibold mb-3'>List Categories</h3>
                                <div className='h-[450px] py-4 px-3 bg-white rounded-md mb-4' style={{ overflowY: "auto" }} >
                                    <Tree
                                        showLine
                                        switcherIcon={<DownOutlined />}
                                        treeData={treeData} />
                                </div>
                            </Col>
                        </Row>

                    </>
            }


            <Modal title={""} width={400} open={showmodaldelete} footer={false}
                onCancel={() => {
                    setshowmodaldelete(false)
                }} >
                <MdDeleteForever className='text-red-500 mx-auto my-1 text-[40px]' />

                <p className='text-base font-bold my-2 text-center text-red-500'> <span>Make sure you delete the categoties</span></p>
                <p className='text-sm my-2 text-center truncate'> <span>Delete categoties: </span> <span className="font-medium">{idselect.name} </span></p>
                <div className='flex justify-end px-3 pt-4'>
                    <Button danger onClick={() => { handledeleteCategories(idselect.id) }}>Delete</Button>
                </div>
            </Modal>
            <Modal title={""} width={400} open={showmodaledit} footer={false}
                onCancel={() => {
                    setshowmodaledit(false)
                }} >
                <FiEdit className='text-yellow-500 mx-auto my-1 text-[40px]' />

                <p className='text-base font-bold my-2 text-center text-yellow-500'> <span>Make sure you edit the categoties</span></p>
                <Input value={valueedit} className='my-3 w-[100%] ' onChange={e => setvalueedit(e.target.value)} />
                <div className='flex justify-end  pt-4'>
                    <Button onClick={() => {
                        if (valueedit != "" && valueedit != idselect.name) {
                            handleeditCategories(idselect.id)
                        }
                    }}>Edit</Button>
                </div>
            </Modal>




        </div>


    );
};

export default AdminCategoriesComponent;