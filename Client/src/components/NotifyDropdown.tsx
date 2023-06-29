import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { MenuProps } from 'antd';
import { Badge, Button, Dropdown } from 'antd';
import { Avatar, Card, Skeleton } from 'antd';
import { BsBell } from 'react-icons/bs'
import { FaRegTrashAlt } from "react-icons/fa"
import { useSelector } from "react-redux";
import { RootState } from "../store/types";
import api from "../configs/axiosConfig";
import { MdDeleteForever } from "react-icons/md";

const { Meta } = Card;


function NotifyDropdown({ item }) {

  const [loading, setLoading] = useState(false);
  const [datanotify, setdatanotify] = useState([])
  const auth = useSelector((state: RootState) => state.root.auth)
  const [notifynotread, setnotifynotread] = useState(0)
  var adxe = []

  const headers = {
    Accept: '*/*',
    Authorization: 'Bearer ' + auth.user?.accessToken,
  };

  const hangdeldeletenotify = async (idNotify: string) => {
    await api.delete("/notifications/" + idNotify, {
      headers
    }).then(() => {
      hangdelgetnotify()
    }
    )
  }

  const hangdelgetnotify = async () => {

    await api.get('/notifications',
      {
        headers
      },

    ).then((response: any) => {
      if (response.status === 200) {
        if (response.data.length > 0) {
          adxe = response.data.map(notify => {
            if (!notify.isRead) {
              setnotifynotread(notifynotread + 1)
            }
            return {
              key: notify.id,
              label: (
                <Card style={{ width: 300 }} onClick={() => { hangdelread(notify.id) }} loading={loading} className={notify.isRead ? "cart-item-menu my-1 max-sm:!w-[200px] " : "cart-item-menu my-1 max-sm:!w-[200px !bg-gray-200"} >
                  <Meta className="!py-0"
                    avatar={<Avatar className="!rounded-full w-[40px] h-[40px] max-sm:w-[30px] max-sm:h-[30px]" src="https://play-lh.googleusercontent.com/RslBy1o2NEBYUdRjQtUqLbN-ZM2hpks1mHPMiHMrpAuLqxeBPcFSAjo65nQHbTA53YYn" />}

                    description={<div className="flex justify-between items-center">
                      <p className="truncate w-[200px] max-sm:w-[120px] max-sm:text-xs text-gray-900">{notify.content}</p>
                      <MdDeleteForever onClick={() => { hangdeldeletenotify(notify.id) }} className="text-base hover:text-black" />
                    </div>}

                  />
                </Card>
              ),

            }
          })
        } else {

          adxe = [
            {
              key: "001",
              label: (
                <Card style={{ width: 300 }} loading={loading} className="cart-item-menu my-1 max-sm:!w-[200px]">
                  <Meta className="!py-0"

                    description={<p className="truncate w-[230px] max-sm:w-[150px] max-sm:text-xs">Does not have any notify</p>}
                  />
                </Card>
              ),

            }
          ]

        }
        setdatanotify(adxe)

      }
    }).catch((error: any) => {
      console.log(error)

    })


  }


  const hangdelread = async (id) => {

    await api.get('/notifications/' + id,
      {
        headers
      },

    ).then((response: any) => {
      if (response.status === 200) {
        hangdelgetnotify()
        if (notifynotread != 0) {
          setnotifynotread(notifynotread - 1)
        }
      }
    }).catch((error: any) => {
      console.log(error)

    })


  }







  useEffect(() => {
    hangdelgetnotify()
  }, [item])




  const items: MenuProps['items'] = datanotify

  return (
    <>
      {
        datanotify ?
          <Dropdown menu={{ items }} placement="bottomRight" className="max-sm:hidden " arrow>
            <Button className="!p-0 border-none bg-none shadow-none rounded-full flex justify-center items-center">
              <div className="text-base"><Badge count={<span className="text-xs bg-red-500 w-[15px] p-0 text-white rounded-full">{notifynotread}</span>}><BsBell /></Badge></div></Button>
          </Dropdown> :
          <Dropdown placement="bottomRight" className="max-sm:hidden" arrow>
            <Button className="!p-0 border-none bg-none shadow-none rounded-full flex justify-center items-center">
              <div className="text-base"><BsBell /></div></Button>
          </Dropdown>
      }
    </>

  );
}

export default NotifyDropdown;