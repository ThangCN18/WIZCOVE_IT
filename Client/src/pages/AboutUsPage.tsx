import { Col, Layout, Row } from 'antd';
import FooterComponent from '../components/FooterComponent';
import HeaderComponent from '../components/HeaderComponent';
import { Content, Footer } from 'antd/es/layout/layout';
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store/types';
import LoadingComponent from '../components/LoadingComponent';
import AboutUsHomeComponent from '../components/AboutUsHomeComponent';

const AboutUsPage: React.FC = () => {
    const loading = useSelector((state: RootState) => state.root.load)
    return (
        <Layout className="layout bg-white">
            <HeaderComponent item="" />
            <Content className="pt-[70px]">
                <div className='mx-auto text-center text-2xl max-lg:text-xl max-md:text-base font-semibold py-16  max-lg:py-10 max-md:py-6' style={{ backgroundImage: "url('https://live.staticflickr.com/65535/52812995427_d741a09e0a_z.jpg')", backgroundSize: "100% 100%" }}>
                    <h1 className='text-4xl max-lg:text-3xl my-5 max-md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r text-slide-how-to from-[#0160fa] to-[#1ddbb7]'>Wizcove IT We specialize in <br /> providing IT courses</h1>
                    <div className='h-[4px] rounded-lg w-[25%] my-5 bg-gradient-to-r  from-[#0160fa] to-[#1ddbb7] mx-auto'></div>

                    <p>We want to share this passion with everyone <br /> by providing high-quality programming courses and helping <br /> students develop the necessary skills to become <br />  successful programmers.</p>
                </div>
                <AboutUsHomeComponent />

                <div className='mx-auto text-center font-semibold py-14  max-md:text-center  max-lg:py-5  max-w-[1000px] '>

                    <h1 className='text-4xl max-lg:text-3xl my-8 max-md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r text-slide-how-to from-[#0160fa] to-[#1ddbb7] text-center'>Our Team</h1>

                    <Row gutter={[16, 16]} className='my-auto'>
                        <Col xl={8} lg={12} sm={24} xs={24} md={24} className='my-auto mx-auto max-w-[300px]' >
                            <div>
                                <img className="mx-auto w-[150px] h-[150px] object-cover rounded-full" src='https://live.staticflickr.com/65535/52813748689_96da48e8b9_w.jpg' />
                                <p className='text-xl max-lg:text-base max-md:text-sm text-gray-600 mt-3'>Nguyen Hoang Ron</p>
                            </div>
                        </Col>
                        <Col xl={8} lg={12} sm={24} xs={24} md={24} className='my-auto mx-auto max-w-[300px]' >
                            <div>
                                <img className="mx-auto w-[150px] h-[150px] object-cover rounded-full" src='https://live.staticflickr.com/65535/52812995482_bd1c548048_w.jpg' />
                                <p className='text-xl max-lg:text-base max-md:text-sm text-gray-600 mt-3'>Nguyen Chi Thang</p>
                            </div>
                        </Col>
                        <Col xl={8} lg={12} sm={24} xs={24} md={24} className='my-auto mx-auto max-w-[300px]' >
                            <div>
                                <img className="mx-auto w-[150px] h-[150px] object-cover rounded-full" src='https://live.staticflickr.com/65535/52813552511_f7da62c185_w.jpg' />
                                <p className='text-xl max-lg:text-base max-md:text-sm text-gray-600 mt-3'>Luong Van Huan</p>
                            </div>
                        </Col>


                    </Row>

                </div>


                <div className='text-left font-semibold py-5 mb-20 max-md:text-center  max-lg:py-2 max-md:w-[90%] max-w-[1200px]  bg-gray-50 border-2 border-gray-800 rounded-xl rounded-xl mx-auto px-4'>
                    <Row className='my-auto'>
                        <Col lg={14} sm={24} xs={24} md={24} className='my-auto' >
                            <div className='flex flex-col justify-center px-10'>
                                <h1 className='text-4xl max-lg:text-3xl my-5 max-md:text-xl font-bold' >Who are we?</h1>
                                <p className='text-2xl max-lg:text-xl max-md:text-base'>We are students majoring in Information Technology at Dong A University. With a passion and love for programming, we have created programming courses on "Wizcove IT" with the aim of sharing the knowledge we have learned with young people who share the same passion for technology as we do.</p>
                            </div>
                        </Col>
                        <Col lg={10} sm={24} xs={24} md={24}>
                            <img className="mx-auto w-[60%]" src='https://coursesbe.s3.ap-southeast-1.amazonaws.com/775b7eca-733e-436d-b711-14a7f7a49dea-aboutpage-02.png' />
                        </Col>

                    </Row>

                </div>

            </Content>
            <FooterComponent />
            <Footer style={{ textAlign: 'center' }}>Copyright ©2023 Wizcove IT</Footer>
            {
                loading.isLoading ?
                    <LoadingComponent /> : null
            }


        </Layout>
    );
}

export default AboutUsPage;