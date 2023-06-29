import { Avatar, Button, Card, Rate, Skeleton } from "antd";
import React, { useEffect, useState } from "react"
import { BsCheck } from "react-icons/bs";
import { FaRoute } from "react-icons/fa";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import api from "../configs/axiosConfig";
import SkeletonInput from "antd/es/skeleton/Input";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 2,
        slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 590 },
        items: 2,
        slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 589, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};

const StudentReviewHomePageComponent: React.FC = () => {

    const [data, setdata] = useState([])



    const getdatareview = async () => {

        await api.get('/review?perPage=6&page=1&sortField=rating&sortDirection=DESC',


        ).then(async (response: any) => {
            if (response.status === 200) {

                setdata(response.data.items)
            }

        }).catch((error: any) => {
            console.log(error)


        })

    }

    useEffect(() => {
        getdatareview()
    }, [])
    return (
        <div className="mx-auto px-4 mt-14  max-sm:mt-[20px] max-sm:px-1 max-w-[1400px] ">
            {
                data.length > 0 ?
                    <h2 className="text-3xl pt-5 max-sm:text-xl font-bold text-center bg-clip-text text-transparent bg-gray-700 ">What do students say about us?</h2>
                    :
                    <div className="text-center">
                        <SkeletonInput active className="!w-[200px]" />

                    </div>
            }



            {
                data.length > 0 ?
                    <Carousel responsive={responsive} className="max-w-[1200px] mx-auto  max-sm:my-5">

                        {
                            data.map(review => {
                                return <div className="px-5">
                                    <Card className="text-lg shadow-xl  font-semibold text-center my-7">
                                        <div className="flex justify-between max-md:flex-col max-md:space-x-0 max-md:space-y-2  max-md:items-center items-end space-x-8">
                                            <div className="flex flex-col items-center justify-center space-y-3 max-sm">
                                                <Avatar className="w-[90px] h-[90px]" src={review.user.avatar ? review.user.avatar : "https://live.staticflickr.com/65535/52813965210_ca9d9cd3a9_w.jpg"} />
                                                <h5 className="text-sm truncate max-md:text-md">{review.user.lastName + " " + review.user.firstName}</h5>
                                            </div>
                                            <div className="flex flex-col items-end max-md:items-center max-md:flex-col-reverse space-y-2">
                                                <p className="text-webkit-line-clamp-3 max-md:!text-sm !max-w-[500px]">" {review.content}" </p>
                                                <Rate disabled className="text-sm max-md:!mb-4" value={review.rating} />

                                            </div>
                                        </div>

                                    </Card>
                                </div>
                            })
                        }




                    </Carousel>
                    : <Carousel responsive={responsive} className="max-w-[1200px] mx-auto  max-sm:my-5">

                        <div className="px-5">

                            <SkeletonInput active className="!w-[100%] !h-[200px] rounded-lg mt-5 " />


                        </div>
                        <div className="px-5">

                            <SkeletonInput active className="!w-[100%] !h-[200px] rounded-lg mt-5 " />


                        </div>


                    </Carousel>
            }
        </div>
    );
}

export default StudentReviewHomePageComponent;