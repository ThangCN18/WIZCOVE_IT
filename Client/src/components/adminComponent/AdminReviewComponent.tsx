

import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Avatar, InputRef, Modal, Rate, Spin, Switch, Tag } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { BsFillEyeFill } from 'react-icons/bs'
import { BiEdit } from 'react-icons/bi'
import { MdDeleteForever } from 'react-icons/md'
import SkeletonButton from 'antd/es/skeleton/Button';
import SkeletonNode from 'antd/es/skeleton/Node';
import SkeletonAvatar from 'antd/es/skeleton/Avatar';
import { LoadingOutlined } from '@ant-design/icons';
import AdminUserShowComponent from './AdminUserShowComponent';
import AdminUserEditComponent from './AdminUserEditComponent';
import AdminUserDeleteComponent from './AdminUserDeleteComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import api from '../../configs/axiosConfig';
import { setNotify } from '../../store/notifycationSlide';
import { setLoading, unsetLoading } from '../../store/loadSlice';


interface UserType {
  key: string,
  fullname: string,
  email: string,
  content: string,
  rating: number,
  avatar: string,
  isActive: boolean
}



type DataIndex = keyof UserType;

let datave: UserType[] = [

];



const AdminReviewComponent: React.FC = () => {

  const [loadingSkeleton, setloadingSkeleton] = useState(false);
  const [data, setData] = useState(datave)
  const searchInput = useRef<InputRef>(null);
  const [scrolltable, setscrolltable] = useState(false)
  const [scrolltableheight, setscrolltableheight] = useState(600)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [userselect, setuserselect] = useState<any>(null);
  const [userselectedit, setuserselectedit] = useState<any>(null);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [pageusers, setpageusers] = useState<number>(1);
  const contentRef = useRef(null);
  const dispatch = useDispatch()

  const [userselectDelete, setuserselectDelete] = useState<any>(null);

  const auth = useSelector((state: RootState) => state.root.auth)



  const headers = {
    Accept: '*/*',
    Authorization: 'Bearer ' + auth.user?.accessToken,
  };
  const handelGetDataUsers = async (page: number) => {
    setscrolltable(true)
    await api.get(`/review`,
      {
        headers
      },
    ).then((response: any) => {
      if (response.status === 200) {
        const datares: any[] = response.data.items; // assume datares is an array of any objects
        const dataset: UserType[] = datares.map((item: any) => {
          return {
            key: item.id,
            fullname: item.user.lastName + " " + item.user.firstName,
            email: item.user.email,
            content: item.content,
            rating: item.rating,
            avatar: item.user.avatar,
            isActive: item.isActive
          };
        });
        if (page == 1) {
          setData(dataset)
          setscrolltable(false)
        } else {
          setData(data.concat(dataset))
          setscrolltable(false)
        }
        setloadingSkeleton(false)
        const npage = pageusers + 1
        setpageusers(npage)
        setscrolltable(false)
      }
    }).catch((error: any) => {
      console.log(error)
      setscrolltable(false)
    })

  }


  const handelGetDelete = async (id: string) => {
    dispatch(setLoading({}))
    await api.delete(`/review/` + id,
      {
        headers
      },
    ).then((response: any) => {
      if (response.status === 204) {
        handelGetDataUsers(1)
        dispatch(setNotify({ typeNotify: "success", titleNotify: "Delete review successful!", messageNotify: 'Delete review successful' }))
        dispatch(unsetLoading({}))
        setIsModalDelete(false)
      };
    }).catch((error: any) => {
      console.log(error)
      dispatch(setNotify({ typeNotify: "success", titleNotify: "Delete review unsuccessful!", messageNotify: error }))
      dispatch(unsetLoading({}))
    })

  }



  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<UserType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>

          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>

        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },

  });



  const columns: ColumnsType<UserType> = [
    {
      title: 'Avatar',
      dataIndex: "avatar",
      key: 'avatar',
      width: '5%',
      render: text => <>{
        loadingSkeleton ?
          <SkeletonAvatar active size='small' />
          :
          <>{text ? <Avatar src={text}></Avatar> :
            <Avatar src='https://live.staticflickr.com/65535/52813965210_ca9d9cd3a9_w.jpg'></Avatar>
          }</>
      }</>,

    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '10%',
      ellipsis: true,
      render: text => <>{
        loadingSkeleton ?
          <SkeletonButton active size='small' className='!w-[80%]' />
          :
          <>{text}</>
      }</>,
      ...getColumnSearchProps('email'),
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Fullname',
      dataIndex: 'fullname',
      key: 'fullname',
      width: '7%',
      render: text => <>{
        loadingSkeleton ?
          <SkeletonButton active size='small' className='!w-[80%]' />
          :
          <>{text}</>
      }</>,
      ...getColumnSearchProps('fullname'),
      sorter: (a, b) => a.fullname.length - b.fullname.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      width: '7%',
      render: text => <>{
        loadingSkeleton ?
          <SkeletonButton active size='small' className='!w-[80%]' />
          :
          <Rate disabled defaultValue={text} className='text-xs !space-x-1' />
      }</>,

    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      width: '15%',
      render: text => <>{
        loadingSkeleton ?
          <SkeletonButton active size='small' className='!w-[80%]' />
          :
          <p className='truncate'>{text}</p>
      }</>,
      ...getColumnSearchProps('content'),
      sorter: (a, b) => a.content.length - b.content.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      width: '5%',
      render: text => <>{
        loadingSkeleton ?
          <SkeletonButton active size='small' className='!w-[80%]' />
          :
          <>{text ? <Switch size="small" defaultChecked={false} disabled /> : <Switch size="small" defaultChecked disabled />}</>
      }</>,

    },
    {
      title: 'Action',
      dataIndex: 'key',
      key: 'key',
      width: '5%',
      render: (text) => <>
        {loadingSkeleton ?
          <SkeletonButton active size='small' className='!w-[80%]' />
          :
          <>

            <Button size="small" onClick={() => setIsModalDelete(true)} className='text-red-600 border-red-600'><MdDeleteForever /></Button>


            <Modal title={""} width={300} open={isModalDelete} footer={false}
              onCancel={() => {
                setIsModalDelete(false)
                setuserselectDelete(null)
              }} >
              <MdDeleteForever className='text-red-500 mx-auto my-1 text-[40px]' />

              <p className='text-base font-bold my-2 text-center text-red-500'> <span>Make sure you delete review</span></p>
              <p className='text-sm my-2 text-center truncate'> <span>Id review: </span> <span className="font-medium">{text} </span></p>
              <div className='flex justify-end px-3 pt-4'>
                <Button onClick={() => { handelGetDelete(text) }} danger >Delete</Button>
              </div>
            </Modal>
          </>
        }
      </>
    },

  ];

  useEffect(() => {
    setloadingSkeleton(true)
    handelGetDataUsers(1)

  }, [])


  useEffect(() => {
    const handleScroll = () => {
      const contentEl = contentRef.current;
      if (contentEl.scrollTop + contentEl.clientHeight >= contentEl.scrollHeight) {
        handelGetDataUsers(pageusers)
      }
    };
    const contentEl = contentRef.current;
    if (contentEl) {
      contentEl.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (contentEl) {
        contentEl.removeEventListener('scroll', handleScroll);
      }
    };
  }, [data, contentRef, handelGetDataUsers, pageusers]);


  return <>
    <div ref={contentRef} style={{ height: "78vh", overflowY: 'scroll' }} >
      {
        data ?
          <Table columns={columns}
            dataSource={data ?? datave} pagination={false} className='shadow-md'
            footer={() => (<>
              {scrolltable ?
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                : null
              }
            </>)}
          >
          </Table> :
          null
      }

    </div>

    {/* modal view */}




  </>;
};

export default AdminReviewComponent;