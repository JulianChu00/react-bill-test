import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/contents'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import dayjs from 'dayjs'
import { addBillList } from '@/store/modules/billStore'
import { useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'

const New = () => {
  const navigate = useNavigate()
  const [billType,setBillType]=useState('pay')
  const [money,setMoney]=useState(0)
  const [useFor,setUseFor]=useState('')
  const moneyChange=(value)=>{
    setMoney(value)
  }
  const dispatch=useDispatch()
  const [date,setDate]=useState('')
  const saveBill=()=>{
    const bill={
      id: nanoid(),
      type:billType,
      money:billType=='pay'?-money:+money,
      date:date,
      useFor:useFor
    }
    dispatch(addBillList(bill))
  }
  const [dateVisible,setDateVisible]=useState(false)

  const onConfirm=(date)=>{
    setDate(dayjs(date).format('YYYY-MM-DD'))
  }
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}
        >
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billType=='pay'?'selected':'')}
            onClick={()=>{setBillType('pay')}}
          >
            支出
          </Button>
          <Button
            className={classNames(billType=='income'?'selected':'')}
            shape="rounded"
            onClick={()=>{setBillType('income')}}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date" onClick={()=>{
                setDateVisible(true)
              }}>
              <Icon type="calendar" className="icon" />
              <span className="text" >{date}</span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                visible={dateVisible}
                onCancel={()=>{
                  setDateVisible(false)
                }}
                onClose={()=>{
                  setDateVisible(false)
                }}
                onConfirm={onConfirm}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={moneyChange}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[billType].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        useFor===item.type?'selected':''
                      )}
                      key={item.type}

                    >
                      <div className="icon" onClick={()=>{
                        setUseFor(item.type)
                      }}>
                        <Icon type={item.type} />
                      </div>
                        <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New