
import React, { useEffect, useState, useContext } from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import api from '../configs/axiosConfig';
import { optionTreeData } from '../App';



const CategoriesDropdown: React.FC = () => {

    const treeData = useContext(optionTreeData)
    var items: MenuProps['items'] = treeData




    return (


        <div id="dropdowncategories">
            {
                treeData ?
                    <Dropdown menu={{ items }} className='aassadsdadsa'>
                        <a onClick={(e) => e.preventDefault()}>
                            <Button className='hover:!bg-none border-none shadow-none font-normal text-base text-black hover:!text-black'>Categories</Button>
                        </a>
                    </Dropdown>

                    :
                    <Dropdown menu={{ items }}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Button className='hover:!bg-none border-none shadow-none font-normal text-base text-black hover:!text-black'>Categories</Button>
                        </a>
                    </Dropdown>

            }

        </div>

    );
}

export default CategoriesDropdown;