

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
  key: string
  email: string
  lastName: string
  firstName: string
  role: string
  avatar: string
  phoneNumber: string
}



type DataIndex = keyof UserType;

let datave: UserType[] = [
  {
    key: "1",
    email: "nct@gmail.com",
    lastName: "Nguyen",
    firstName: "thăng",
    role: "admin",
    avatar: "https://coursesbe.s3.ap-southeast-1.amazonaws.com/50b44393-1768-4b4d-8797-6f29296c07a4-96956a604c54950acc45.jpg",
    phoneNumber: "0357863600"
  },
  {
    key: "2",
    email: "nct@gmail.com",
    lastName: "Nguyen",
    firstName: "thăng",
    role: "admin",
    avatar: "https://coursesbe.s3.ap-southeast-1.amazonaws.com/50b44393-1768-4b4d-8797-6f29296c07a4-96956a604c54950acc45.jpg",
    phoneNumber: "0357863600"
  },
  {
    key: "3",
    email: "nct@gmail.comádadsasdsdssdadsasdaddas",
    lastName: "Nguyen",
    firstName: "thăng",
    role: "user",
    avatar: "https://coursesbe.s3.ap-southeast-1.amazonaws.com/50b44393-1768-4b4d-8797-6f29296c07a4-96956a604c54950acc45.jpg",
    phoneNumber: "0357863600"
  },
  {
    key: "4",
    email: "nct@gmail.com",
    lastName: "Nguyen",
    firstName: "thăng",
    role: "user",
    avatar: "",
    phoneNumber: "0357863600"
  },
  {
    key: "5",
    email: "nct@gmail.com",
    lastName: "Nguyen",
    firstName: "thăng",
    role: "user",
    avatar: "",
    phoneNumber: "0357863600"
  },
  {
    key: "6",
    email: "nct@gmail.com",
    lastName: "Nguyen",
    firstName: "thăng",
    role: "user",
    avatar: "",
    phoneNumber: "0357863600"
  },
  {
    key: "7",
    email: "nct@gmail.com",
    lastName: "Nguyen",
    firstName: "thăng",
    role: "user",
    avatar: "",
    phoneNumber: "0357863600"
  },
  {
    key: "8",
    email: "nct@gmail.com",
    lastName: "Nguyen",
    firstName: "thăng",
    role: "user",
    avatar: "",
    phoneNumber: "0357863600"
  },
  {
    key: "9",
    email: "nct@gmail.com",
    lastName: "Nguyen",
    firstName: "thăng",
    role: "user",
    avatar: "",
    phoneNumber: "0357863600"
  }
];



const AdminUserComponent: React.FC = () => {

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
  const handelshowview = (key: string) => {
    for (var i = 0; i < data.length; i++) {
      if (data[i].key == key) {
        setuserselect(data[i])
        break;
      }
    }
  }

  const handelshowdelete = (key: string) => {
    for (var i = 0; i < data.length; i++) {
      if (data[i].key == key) {
        setuserselectDelete(data[i])
        break;
      }
    }
  }
  const handelshowedit = (key: string) => {
    for (var i = 0; i < data.length; i++) {
      if (data[i].key == key) {
        setuserselectedit(data[i])
        break;
      }
    }

  }
  const headers = {
    Accept: '*/*',
    Authorization: 'Bearer ' + auth.user?.accessToken,
  };
  const handelGetDataUsers = async (page: number) => {
    setscrolltable(true)
    await api.get(`/users?perPage=10&page=${page}`,
      {
        headers
      },
    ).then((response: any) => {
      if (response.status === 200) {
        const datares: any[] = response.data.items; // assume datares is an array of any objects
        const dataset: UserType[] = datares.map((item: any) => {
          return {
            key: item.id,
            email: item.email,
            lastName: item.lastName,
            firstName: item.firstName,
            role: item.role,
            avatar: item.avatar,
            phoneNumber: item.phoneNumber,
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
    if (userselect) {
      setIsModalOpen(true)
    }
    if (userselectedit) {
      setIsModalEdit(true)
    }
    if (userselectDelete) {
      setIsModalDelete(true)
    }
  }, [userselect, userselectedit, userselectDelete])

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
      title: 'FirstName',
      dataIndex: 'firstName',
      key: 'firstName',
      width: '7%',
      render: text => <>{
        loadingSkeleton ?
          <SkeletonButton active size='small' className='!w-[80%]' />
          :
          <>{text}</>
      }</>,
      ...getColumnSearchProps('firstName'),
      sorter: (a, b) => a.firstName.length - b.firstName.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'LastName',
      dataIndex: 'lastName',
      key: 'lastName',
      width: '7%',
      render: text => <>{
        loadingSkeleton ?
          <SkeletonButton active size='small' className='!w-[80%]' />
          :
          <>{text}</>
      }</>,
      ...getColumnSearchProps('lastName'),
      sorter: (a, b) => a.lastName.length - b.lastName.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '10%',
      render: text => <>{
        loadingSkeleton ?
          <SkeletonButton active size='small' className='!w-[80%]' />
          :
          <>{text}</>
      }</>,
      ...getColumnSearchProps('phoneNumber'),
      sorter: (a, b) => a.phoneNumber.length - b.phoneNumber.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: '5%',
      render: text => <>{
        loadingSkeleton ?
          <SkeletonButton active size='small' className='!w-[80%]' />
          :
          <>{text == "admin" ? <Tag color="green">{text}</Tag> : text == "user" ? <Tag color="blue">{text}</Tag> : <Tag color="cyan">staff</Tag>}</>
      }</>,
      ...getColumnSearchProps('role'),
      sorter: (a, b) => a.role.length - b.role.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Action',
      dataIndex: 'key',
      key: 'Action',
      width: '8%',
      render: (text) => <>
        {loadingSkeleton ?
          <SkeletonButton active size='small' className='!w-[80%]' />
          :
          <>
            <Button size="small" onClick={() => handelshowview(text)} className='text-blue-600 border-blue-600'><BsFillEyeFill /></Button>
            <Button size="small" onClick={() => handelshowedit(text)} className='text-yellow-600 border-yellow-600 mx-2'><BiEdit /></Button>
            <Button size="small" onClick={() => handelshowdelete(text)} className='text-red-600 border-red-600'><MdDeleteForever /></Button>
          </>
        }
      </>
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

export default AdminUserComponent;