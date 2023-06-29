

import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Avatar, InputRef, Modal, Spin, Tag } from 'antd';
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
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import api from '../../configs/axiosConfig';


interface UserType {
  key: string,
  email: string,
  status: string
  totalPrice: string
  totalCourses: string
  createdAt: string
}



type DataIndex = keyof UserType;

let datave: UserType[] = [

];



const AdminPaymentComponent: React.FC = () => {

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

  const [userselectDelete, setuserselectDelete] = useState<any>(null);

  const auth = useSelector((state: RootState) => state.root.auth)



  const handelGetDatapayment = async (page: number) => {
    await api.get(`/payment?perPage=10&page=${page}`,
      {
        headers
      },
    ).then((response: any) => {
      if (response.status === 200) {

        console.log(response.data.items)
      }
    }).catch((error: any) => {
      console.log(error)

    })

  }

  const headers = {
    Accept: '*/*',
    Authorization: 'Bearer ' + auth.user?.accessToken,
  };
  const handelGetDataUsers = async (page: number) => {
    setscrolltable(true)
    await api.get(`/payment?perPage=10&page=${page}`,
      {
        headers
      },
    ).then((response: any) => {
      if (response.status === 200) {
        const datares: any[] = response.data.items; // assume datares is an array of any objects
        const dataset: UserType[] = datares.map((item: any) => {
          const date = new Date(item.createdAt * 1000);

          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear().toString().slice(-2);
          const hour = date.getHours().toString().padStart(2, '0');
          const minute = date.getMinutes().toString().padStart(2, '0');
          const second = date.getSeconds().toString().padStart(2, '0');

          const formattedDate = `${day}/${month}/${year} ${hour}:${minute}:${second}`;

          return {
            key: item.id,
            email: item.email,
            status: item.status,
            totalPrice: item.totalPrice ? item.totalPrice : 0,
            totalCourses: item.totalCourses ? item.totalCourses : 0,
            createdAt: formattedDate,
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
  useEffect(() => {
    setloadingSkeleton(true)

    handelGetDatapayment(1)

  }, [])

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
      title: 'ID payment',
      dataIndex: "key",
      key: 'key',
      width: '10%',
      render: text => <>
        {
          loadingSkeleton ?
            <SkeletonButton active size='small' className='!w-[80%]' />
            : <p className='truncate'>{text}</p>
        }
      </>

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
      title: 'Total courses',
      dataIndex: 'totalCourses',
      key: 'totalCourses',
      width: '7%',
      render: text => <>{
        loadingSkeleton ?
          <SkeletonButton active size='small' className='!w-[80%]' />
          :
          <>{text}</>
      }</>,
      ...getColumnSearchProps('totalCourses'),
      sorter: (a, b) => Number(a.totalCourses) - Number(b.totalCourses),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Total price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      width: '7%',
      render: text => <>{
        loadingSkeleton ?
          <SkeletonButton active size='small' className='!w-[80%]' />
          :
          <>{"$" + text}</>
      }</>,
      ...getColumnSearchProps('totalPrice'),
      sorter: (a, b) => Number(a.totalPrice) - Number(b.totalPrice),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Status',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      width: '5%',
      render: text => <>{
        loadingSkeleton ?
          <SkeletonButton active size='small' className='!w-[80%]' />
          :
          <>{text != 0 ? <Tag color="green">success</Tag> : <Tag color="error">failed</Tag>}</>
      }</>,
      ...getColumnSearchProps('totalPrice'),
      sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '8%',
      render: text => <>{
        loadingSkeleton ?
          <SkeletonButton active size='small' className='!w-[80%]' />
          :
          <>{text}</>
      }</>,
      ...getColumnSearchProps('createdAt'),
      sorter: (a, b) => a.createdAt.length - b.createdAt.length,
      sortDirections: ['descend', 'ascend'],
    },

  ];

  useEffect(() => {
    setloadingSkeleton(true)
    handelGetDataUsers(1)
    setpageusers(2)
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
      <Table columns={columns}
        dataSource={data} pagination={false} className='shadow-md'
        footer={() => (<>
          {scrolltable ?
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            : null
          }
        </>)}
      >
      </Table>
    </div>

    {/* modal view */}
    {
      userselect ? <>
        <Modal title={""} width={300} open={isModalOpen} footer={false}
          onCancel={() => {
            setIsModalOpen(false)
            setuserselect(null)
          }} >
          <AdminUserShowComponent user={userselect} />

        </Modal>
      </>
        : null


    }
    <>
      {
        userselectedit ?
          <Modal title={""} width={450} open={isModalEdit} footer={false}
            onCancel={() => {
              setIsModalEdit(false)
              setuserselectedit(null)
            }} >
            <AdminUserEditComponent user={userselectedit} />
          </Modal>
          : null
      }
    </>

    <>
      {
        userselectDelete ?
          <Modal title={""} width={300} open={isModalDelete} footer={false}
            onCancel={() => {
              setIsModalDelete(false)
              setuserselectDelete(null)
            }} >
            <AdminUserDeleteComponent user={userselectDelete} />
          </Modal>
          : null
      }
    </>

  </>;
};

export default AdminPaymentComponent;