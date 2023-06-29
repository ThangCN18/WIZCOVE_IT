import { Button, Col, Form, Row, Space, Input} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react'
import { BsCaretRight, BsTelephoneFill, BsTwitter } from 'react-icons/bs';

import { IoLogoFacebook } from 'react-icons/io5';
import { RiDiscordFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
 
const FooterComponent: React.FC = () => {
    return ( 
        <div className='bg-gray-100 w-[100%]'>
            <div className='max-w-[1400px] w-[100%] px-4 py-10 border-b-2 border-separate mx-auto'>
            <Row gutter={[24, 16]} >
                <Col lg={8} xl={6} md={12} sm={12} xs={12} className='mx-auto flex flex-col justify-center items-start space-y-3 px-2'>
                <div className="logo flex justify-start items-center space-x-3 max-sm:space-x-1">
                    <img className="w-[45px] max-lg:w-[25px]" src="https://coursesbe.s3.ap-southeast-1.amazonaws.com/c572dcfd-998f-4d93-b40f-6d105dcbdb49-logo-learning.png" alt="logo"/>
                    <h4 className="text-black text-2xl !leading-4 font-bold !py-0 max-lg:text-base max-md:text-sm">Wizcove IT</h4>
                    
                </div>
                <p className='text-base max-lg:text-sm  font-semibold text-gray-700 max-md:text-xs'>We want to share this passion with everyone by providing high-quality programming courses and helping students develop the necessary skills to become successful programmers.</p>
                    <hr className='w-[70%] bg-gray-600 h-[1.2px]'/>
                    <p className='text-base max-lg:text-sm  font-bold text-gray-700 max-md:text-xs'>Contact us via:</p>
                    <div className='flex !justify-end  space-x-3 items-center'>
                        <IoLogoFacebook className='text-3xl text-blue-600'/>
                        <BsTwitter className='text-3xl text-blue-600'/>
                        <RiDiscordFill className='text-3xl text-blue-600'/>
                        <BsTelephoneFill className='text-2xl text-blue-600'/>
                    </div>

                </Col>
                <Col lg={8} xl={6} md={12} sm={12} xs={12} className='mx-auto flex flex-col justify-start items-start space-y-1 px-2'>
                <p className='text-lg max-lg:text-base  font-bold text-gray-800 max-md:text-sm !mb-5'>Our Educational Roadmaps</p>
                <Link to="/roadmaps"><p className='text-base max-lg:text-sm  font-semibold text-gray-700 max-md:text-xs ml-3 hover:ml-5 hover:text-blue-600 flex items-center space-x-1'><BsCaretRight/> <span>Frontend developer</span></p></Link>
                <Link to="/roadmaps"><p className='text-base max-lg:text-sm  font-semibold text-gray-700 max-md:text-xs ml-3 hover:ml-5 hover:text-blue-600 flex items-center space-x-1'><BsCaretRight/> <span>Backend developer</span></p></Link>
                <Link to="/roadmaps"><p className='text-base max-lg:text-sm  font-semibold text-gray-700 max-md:text-xs ml-3 hover:ml-5 hover:text-blue-600 flex items-center space-x-1'><BsCaretRight/> <span>Fullstack developer</span></p></Link>
                <Link to="/roadmaps"><p className='text-base max-lg:text-sm  font-semibold text-gray-700 max-md:text-xs ml-3 hover:ml-5 hover:text-blue-600 flex items-center space-x-1'><BsCaretRight/> <span>Mobile developer</span></p></Link>
                <Link to="/roadmaps"><p className='text-base max-lg:text-sm  font-semibold text-gray-700 max-md:text-xs ml-3 hover:ml-5 hover:text-blue-600 flex items-center space-x-1'><BsCaretRight/> <span>Tester</span></p></Link>
                </Col>
                <Col lg={8} xl={6} md={12} sm={12} xs={12} className='mx-auto flex flex-col justify-start items-start space-y-1 px-2'>
                <p className='text-lg max-lg:text-base  font-bold text-gray-800 max-md:text-sm !mb-5'>Our Educational Courses</p>
                <Link to="/roadmaps"><p className='text-base max-lg:text-sm  font-semibold text-gray-700 max-md:text-xs ml-3 hover:ml-5 hover:text-blue-600 flex items-center space-x-1'><BsCaretRight/> <span>Frontend developer</span></p></Link>
                <Link to="/roadmaps"><p className='text-base max-lg:text-sm  font-semibold text-gray-700 max-md:text-xs ml-3 hover:ml-5 hover:text-blue-600 flex items-center space-x-1'><BsCaretRight/> <span>Backend developer</span></p></Link>
                <Link to="/roadmaps"><p className='text-base max-lg:text-sm  font-semibold text-gray-700 max-md:text-xs ml-3 hover:ml-5 hover:text-blue-600 flex items-center space-x-1'><BsCaretRight/> <span>Fullstack developer</span></p></Link>
                <Link to="/roadmaps"><p className='text-base max-lg:text-sm  font-semibold text-gray-700 max-md:text-xs ml-3 hover:ml-5 hover:text-blue-600 flex items-center space-x-1'><BsCaretRight/> <span>Mobile developer</span></p></Link>
                <Link to="/roadmaps"><p className='text-base max-lg:text-sm  font-semibold text-gray-700 max-md:text-xs ml-3 hover:ml-5 hover:text-blue-600 flex items-center space-x-1'><BsCaretRight/> <span>Tester</span></p></Link>
                </Col>
                <Col lg={8} xl={6} md={12} sm={12} xs={12} className='mx-auto space-y-1 px-2'>
                <p className='text-lg max-lg:text-base  font-bold text-gray-800 max-md:text-sm !mb-5'>Contract Us</p>
                <Form name="form_item_path" layout="vertical" >
                <Form.Item name="Email" label="Your Email" rules={[{ required: true, message: 'Please input your email!', type: "email" }]}>
                    <Input />
                    </Form.Item>
                    <Form.Item name="Message" label="Message" rules={[{ required: true, message: 'Please input message!', type: "string" }]}>
                    <TextArea rows={4} />
                    </Form.Item>
                <Button type="primary" className='bg-blue-600 text-right' htmlType="submit">
                    Send
                </Button>
                </Form>
                </Col>
            </Row>

            </div>
        </div>
     );
}
 
export default FooterComponent;