import { Avatar, Button, Card, Col, Row } from "antd"
import Meta from "antd/es/card/Meta"
import React from "react"
import { Rate, Space } from 'antd';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const ItemCourseComponent: React.FC = ()=>{
    return(
         <Col xs={24} sm={24} md={12} lg={12} xl={6}>
      <Card className="card-course-h overflow-hidden opacity-90 hover:opacity-100 shadow-lg"
    hoverable
    cover={<img alt="example" className="w-[100%] h-[190px] object-cover image-course" src="https://cphinf.pstatic.net/mooc/20181107_43/15415645512142Dd3u_PNG/____HTML__CSS__.png" />}
  >
    <Meta className="text-left text-title-course" title="Europe Street beat jajsajasj Europe Street beat jajsajasj"/>
    <Meta
    className="justify-start items-center text-left !py-3 text-avatar-course"
          avatar={<Avatar src="https://joesch.moe/api/v1/random?key=1" />}
          title="Nguyen Chi Thang"
        />
        <Space className="!flex !justify-between mt-2">
        <Rate disabled tooltips={desc} className="text-xs !space-x-1 rate-course-item" defaultValue={4}/>
        <p className="text-sm font-bold"><span className="line-through text-gray-500">$300.00</span> 
        <span className=" text-base text-blue-600"> $249.00</span></p>

        </Space>
        <Button type="primary" className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:bg-blue-600 font-bold mt-3 max-sm:text-xs w-[100%] ">Buy Now</Button>
  </Card>
    </Col>
       
    )
}
export default ItemCourseComponent