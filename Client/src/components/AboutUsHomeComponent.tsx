import { Button } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';


const AboutUsHomeComponent: React.FC = () => {
    return (
        <div className='w-[100%] bg-gray-100    '>
            <div className='max-w-[1400px] max-md:!w-[90%] flex justify-between items-center w-100%  rounded-xl mx-auto px-4  mt-7 max-md:space-x-2 space-x-16'>
                <div className='flex flex-col justify-center items-start  max-md:px-0 max-md:py-5 space-y-2'>
                    <h4 className='text-sm text-gray-800 font-bold'>About Us</h4>
                    <div className="logo flex justify-start items-center space-x-3 max-sm:space-x-1">
                        <img className="w-[45px] max-lg:w-[25px]" src="https://coursesbe.s3.ap-southeast-1.amazonaws.com/c572dcfd-998f-4d93-b40f-6d105dcbdb49-logo-learning.png" alt="logo" />
                        <h4 className="text-black text-2xl !leading-4 font-bold !py-0 max-lg:text-base max-md:text-sm">Wizcove IT <span>specialize in providing IT courses.</span></h4>

                    </div>
                    <p className='text-base max-lg:text-sm  font-semibold text-gray-800 max-md:text-xs'>We want to share this passion with everyone by providing high-quality programming courses and helping students develop the necessary skills to become successful programmers.</p>
                    <Link to="/about-us"><Button className='max-md:text-xs max-md:mx-auto mt-4 text-base h-[40px] rounded-full font-semibold border-2 border-gray-800'>See more information about us</Button></Link>
                </div>
                <img className='h-[100%] max-lg:h-[90%] max-md:h-[160px] max-md:hidden' src='https://hrcdn.net/fcore/assets/dashboard/hackerresume-card-dd9b01fcd2.svg' />

            </div>

        </div>

    );
}

export default AboutUsHomeComponent;

