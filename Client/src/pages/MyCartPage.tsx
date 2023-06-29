import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { MenuProps } from 'antd';
import { Badge, Button, Col, Dropdown, Empty, Layout, List, Row } from 'antd';
import { Avatar, Card, Skeleton } from 'antd';
import { MdDeleteForever, MdOutlineShoppingCart } from 'react-icons/md'
import { FaRegTrashAlt } from "react-icons/fa"
import api from "../configs/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/types";
import HeaderComponent from "../components/HeaderComponent";
import { Content, Footer } from "antd/es/layout/layout";
import FooterComponent from "../components/FooterComponent";
import AboutUsHomeComponent from "../components/AboutUsHomeComponent";
import LoadingComponent from "../components/LoadingComponent";
import { setstatus } from "../store/statusSlics";

const { Meta } = Card;


function MyCartPage() {

    const [loading, setLoading] = useState(false);
    const auth = useSelector((state: RootState) => state.root.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [datacourse, setdatacourse] = useState([])
    const [datacourseshow, setdatacourseshow] = useState([])
    const [totalpricee, settotalpricee] = useState(0)
    const [thaydoi, setthaydoi] = useState(false)





    const headers = {
        accept: '*/*',
        Authorization: 'Bearer ' + auth.user?.accessToken,
    };

    const handeladdcart = async () => {
        await api.get('/users/my-cart',
            {
                headers
            },

        ).then((response: any) => {
            if (response.status === 200) {

                let listda = []
                let pricetotal = 0
                for (const a in response.data) {
                    pricetotal = pricetotal + response.data[a].course.discount
                    listda.push(response.data[a].course.id)

                }


                setdatacourseshow(response.data)
                settotalpricee(pricetotal)
                setdatacourse(listda)
                setLoading(false)

            }
        }).catch((error: any) => {
            console.log(error)
            setLoading(false)


        })

    }

    const handeldeletecart = async (id) => {
        await api.delete('/course/' + id + '/cart',
            {
                headers
            },
        ).then((response: any) => {
            if (response.status === 204) {
                handeladdcart()
                dispatch(setstatus())
            }
        }).catch((error: any) => {
            console.log(error)
            setLoading(false)

        })

    }


    const hangdlepayment = async () => {


        const data = {
            courseIds: datacourse
        }
        await api.post('/payment/checkout-info',
            data,
            {
                headers
            }
        ).then((response: any) => {
            window.open(response.data.url, "_blank")

        }).catch((error: any) => {
            console.log(error)

        })
    }



    useEffect(() => {
        setLoading(true)
        handeladdcart()
    }, [])
    useEffect(() => {
        setthaydoi(true)
        setthaydoi(false)
    }, [datacourse])



    const items: MenuProps['items'] = datacourseshow ?? [];

    return (
        <>
            {
                loading ?

                    <LoadingComponent /> :
                    <Layout className="layout bg-white">
                        <>
                            {
                                thaydoi ? <HeaderComponent item="home" /> :
                                    <HeaderComponent item="" />
                            }
                        </>
                        <Content className="pt-[70px]">
                            <div className="site-layout-content w-[100%] pb-10 max-w-[1400px] mx-auto" >
                                <div className="max-w-[1400px] max-md:w-[90%] mx-auto text-center rounded-3xl px-[5%] py-[2%] bg-[rgba(71,213,226,0)] tapscoursescomponemt">
                                    <div>
                                        <h2 className="text-left text-3xl font-bold mb-7">My Cart</h2>
                                    </div>
                                    {
                                        datacourse ?
                                            <Row gutter={[24, 24]}>
                                                <Col xl={16} lg={16} md={24} sm={24} xs={24} className=" ">
                                                    <List
                                                        itemLayout="horizontal"
                                                        dataSource={datacourseshow}
                                                        renderItem={(item, index) => (
                                                            <List.Item className="!flex !justify-between !items-center !space-x-2 border-t-2 border-t-gray-600">
                                                                <List.Item.Meta
                                                                    avatar={<img className="w-[150px] h-[90px] max-md:w-[120px] max-md:h-[80px] rounded-lg" src={item.course.image} />}
                                                                    title={<h4 className="text-left text-lg font-semibold truncate">{item.course.name}</h4>}
                                                                    description={<p className="text-left truncate">{item.course.headline}
                                                                        <p className="text-sm  mt-2 font-bold"><span className="line-through text-gray-500">${item.course.price}</span>
                                                                            <span className=" text-base text-blue-600"> ${item.course.discount}</span></p>
                                                                    </p>}

                                                                />
                                                                <Button onClick={() => { handeldeletecart(item.course.id) }} className="hover:!border-red-500 hover:!text-red-500 text-xl">
                                                                    <MdDeleteForever />


                                                                </Button>
                                                            </List.Item>
                                                        )}
                                                    />

                                                </Col>
                                                <Col xl={8} lg={8} md={24} sm={24} xs={24} className="text-left !px-20 flex flex-col space-y-4 max-md:text-center">

                                                    <h5 className="text-xl font-bold text-gray-700">Total: </h5>
                                                    <h5 className="text-3xl font-bold text-blue-600">${totalpricee}</h5>
                                                    <Button onClick={hangdlepayment} className="text-xl font-bold text-white w-[100%] rounded-none bg-blue-600 h-[44px]">Checkout</Button>
                                                </Col>

                                            </Row> :
                                            <Empty />
                                    }

                                </div>
                            </div>
                        </Content>
                        <AboutUsHomeComponent />
                        <FooterComponent />
                        <Footer style={{ textAlign: 'center' }}>Copyright ©2023 Wizcove IT</Footer>



                    </Layout >
            }
        </>


    );
}

export default MyCartPage;