import React, { useState } from "react";
import { Link } from "react-router-dom";
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import { Avatar, Card, Skeleton } from 'antd';
import { FaRegUser } from "react-icons/fa"
import { TbLogout } from "react-icons/tb"
import { FiHelpCircle } from "react-icons/fi"
import { HiOutlineNewspaper, HiOutlineBookOpen } from "react-icons/hi"
import { useSelector } from "react-redux";
import { RootState } from "../store/types";
import { RiDashboardLine } from "react-icons/ri";
import { MdOutlineShoppingCart } from "react-icons/md";

const { Meta } = Card;

interface typeprops {
  handelLogout: () => Promise<void>
}

const UserDropdown: React.FC<typeprops> = ({ handelLogout }) => {

  const [loading, setLoading] = useState(false);

  const auth = useSelector((state: RootState) => state.root.auth)

  const items: MenuProps['items'] = [
    {
      key: 'card1',
      label: (
        <Card style={{ width: 230 }} loading={loading} className="user-item-menu m-2  max-sm:!w-[150px]">
          <Meta className="!py-0"
            avatar={<Avatar className="!rounded-full w-[50px] h-[50px] max-sm:!w-[40px] max-sm:!h-[40px]" src={auth.user?.avatar ? auth.user?.avatar : '/src/assets/images/default-avatar-profile.png'} />}
            title={<h5 className="truncate w-[180px] max-sm:!w-[100px] max-sm:text-xs">{auth.user?.lastName + " " + auth.user?.firstName}</h5>}
            description={<Link to={"/profile"}><p className="truncate w-[180px] max-sm:!w-[100px] max-sm:text-xs">Manage Profile</p></Link>}
          />
        </Card>
      )
    },
    {
      key: 'card2',
      label: (<hr />
      ),
    },
    {
      key: 'card323',
      label: (<>
        {
          auth.user.role != "user" ?
            <Link to={"/admin"} className={"!px-6 pt-4 w-[100%] max-sm:text-xs flex justify-start items-center text-sm space-x-2 !text-gray-600 font-medium user-list-action duration-450 "}>
              <RiDashboardLine className="w-[16px] h-[16px]" />
              <p>Admin</p>

            </Link> : null
        }
      </>

      )
    },
    {
      key: 'card3',
      label: (
        <Link to={"/profile"} className="!px-6 pt-4 w-[100%] max-sm:text-xs flex justify-start items-center text-sm space-x-2 !text-gray-600 font-medium user-list-action duration-450">
          <FaRegUser className="w-[16px] h-[16px]" />
          <p>View Profile</p>

        </Link>
      )
    },
    {
      key: 'card5',
      label: (
        <Link to={"/my-courses"} className="!px-6 pt-4 w-[100%] max-sm:text-xs flex justify-start items-center text-sm space-x-2 !text-gray-600 font-medium user-list-action duration-450">
          <HiOutlineBookOpen className="w-[16px] h-[16px]" />
          <p>My Courses</p>

        </Link>
      )
    },
    {
      key: 'card6',
      label: (
        <Link to={"/my-cart"} className="!px-6 pt-4 w-[100%] max-sm:text-xs flex justify-start items-center text-sm space-x-2 !text-gray-600 font-medium user-list-action duration-450">
          <MdOutlineShoppingCart className="w-[16px] h-[16px]" />
          <p>My Cart</p>

        </Link>
      )
    },
    {
      key: 'card7',
      label: (
        <Link to={"/"} className="!px-6 pt-4 mb-3 w-[100%] max-sm:text-xs flex justify-start items-center text-sm space-x-2 !text-gray-600 font-medium user-list-action duration-450">
          <FiHelpCircle className="w-[16px] h-[16px]" />
          <p>Help</p>

        </Link>
      )
    },
    {
      key: 'card8',
      label: (<hr />
      ),
    },
    {
      key: 'card9',
      label: (
        <p onClick={handelLogout}
          className="block w-[100%] pl-5 pb-4 text-sm font-medium !pt-3 flex justify-start items-center text-red-500 hover:!text-red-500 !space-x-2 cursor-pointer"><TbLogout className="w-[20px] h-[20px] text-red-500" /><p>Sign Out</p></p>
      )
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight" className="max-sm:hidden" arrow>
      <Button className="!p-0 border-none bg-gray-100 !min-w-[40px] max-sm:text-xs !h-[40px] max-sm:!min-w-[30px] max-sm:!h-[30px] rounded-full flex justify-center items-center">
        <div className="text-base">{auth.user?.avatar ? <Avatar src={auth.user?.avatar} /> : <FaRegUser />}</div></Button>
    </Dropdown>
  );
}

export default UserDropdown;