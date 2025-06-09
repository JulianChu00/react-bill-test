import { Outlet, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import {getBillList} from '@/store/modules/billStore'
import React, { useState,useEffect } from 'react'
import { Badge, TabBar } from 'antd-mobile'
import './index.scss'
import {
  BillOutline,
  AddCircleOutline,
  CalculatorOutline
} from 'antd-mobile-icons'

const Layout=()=>{
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getBillList())
  },[dispatch])

  const navigate=useNavigate()

  const switchRoute=(path)=>{
    console.log(path);
    navigate(path)
  }

  const tabs = [
    {
      key: '/',
      title: '月度账单',
      icon: <BillOutline />,
      badge: Badge.dot,
    },
    {
      key: '/new',
      title: '记账',
      icon: <AddCircleOutline />,
      badge: '5',
    },
    {
      key: '/year',
      title: '年度账单',
      icon: <CalculatorOutline />,
    },
  ]
  const [activeKey, setActiveKey] = useState('todo')
  return (
    <div className='layout'>
      <div className='container'>
        <Outlet></Outlet>
      </div>
      <div className='footer'>
          <TabBar onChange={(value)=>{switchRoute(value)
          }}>
            {tabs.map(item => (
              <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
          </TabBar>
      </div>
    </div>


    )
  }
export default Layout