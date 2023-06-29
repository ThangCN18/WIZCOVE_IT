import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { MenuProps } from 'antd';
import { Badge, Button, Dropdown, Empty } from 'antd';
import { Avatar, Card, Skeleton } from 'antd';
import { MdOutlineShoppingCart } from 'react-icons/md'
import { FaRegTrashAlt } from "react-icons/fa"
import api from "../configs/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/types";

const { Meta } = Card;


function CartDropdown() {

  const [loading, setLoading] = useState(false);
  const auth = useSelector((state: RootState) => state.root.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [datacourse, setdatacourse] = useState([])
  const [datacourseshow, setdatacourseshow] = useState([])
  const status = useSelector((state: RootState) => state.root.status)




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
        console.log(response.data)
        let courseaaa = []
        let listda = []
        let pricetotal = 0
        for (const a in response.data) {
          pricetotal = pricetotal + response.data[a].course.discount
          listda.push(response.data[a].id)
          courseaaa.push(
            {
              key: response.data[a].id,
              label: (
                <Card style={{ width: 300 }} loading={loading} className="cart-item-menu my-1 max-sm:!w-[200px]">
                  <Meta className="!py-0"
                    avatar={<Avatar className="!rounded-sm w-[60px] h-[40px] max-sm:w-[30px] max-sm:h-[30px] " src={response.data[a].course.image} />}
                    title={<h5 className="truncate w-[180px] max-sm:w-[100px] max-sm:text-xs !mb-0">{response.data[a].course.name}</h5>}
                    description={<p className="max-sm:text-xs mt-[-8px]">Price: ${response.data[a].course.discount}</p>}
                  />
                </Card>
              ),
            }
          )
        }
        if (courseaaa.length > 0) {
          courseaaa.push(
            {
              key: 'kakakaa',
              label: (
                <div className="flex justify-between items-center my-2 px-2">
                  <p className="max-sm:text-xs">Total: ${pricetotal}</p>
                  <Button onClick={() => {
                    hangdlepayment()
                  }} type="primary" className="!bg-blue-500 max-sm:text-xs">Buy now</Button>
                </div>
              ),
            },
          )

        } else {
          courseaaa.push(
            {
              key: 'kakakaadadsa',
              label: (
                // <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                <Card style={{ width: 300 }} loading={loading} className="cart-item-menu my-1 max-sm:!w-[200px]">
                  <Meta className="!py-0"
                    description={<h5 className="truncate w-[220px] max-sm:w-[190px] max-sm:text-xs !mb-0">You don't have any courses in cart</h5>}

                  />
                </Card>
              ),
            },
          )

        }

        setdatacourseshow(courseaaa)
        setdatacourse(listda)

      }
    }).catch((error: any) => {
      console.log(error)


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
    handeladdcart()
  }, [status.isStatus])



  const items: MenuProps['items'] = datacourseshow ?? [];

  return (
    <Dropdown menu={{ items }} placement="bottomRight" className="max-sm:hidden" arrow>

      <Button className="!p-0 border-none bg-none shadow-none rounded-full flex justify-center items-center">
        <div className="text-xl">
          <Link to={'/my-cart'}><Badge count={<span className="text-xs bg-red-500 w-[15px] p-0 text-white rounded-full">{datacourse.length}</span>}>
            <MdOutlineShoppingCart />
          </Badge></Link>
        </div></Button>

    </Dropdown>
  );
}

export default CartDropdown;