import classNames from 'classnames'
import {useMemo,useState} from 'react'
import {billTypeToName} from '@/contents/index'
import Icon from '@/components'
import './index.scss'
const DailyBill = ({date,billList}) => {
    const [dateVisible,setDateVisible]=useState(false)
    const dayResult = useMemo(() => {
    if (!Array.isArray(billList) || billList.length === 0) {
      return { pay: 0, income: 0, total: 0 }
    }

    const pay = billList
      .filter(item => item.type === 'pay')
      .reduce((a, c) => a + (c.money || 0), 0)

    const income = billList
      .filter(item => item.type === 'income')
      .reduce((a, c) => a + (c.money || 0), 0)

    return { pay, income, total: pay + income }
  }, [billList])

  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={dateVisible?'arrow expand' : 'arrow'} onClick={() => setDateVisible(!dateVisible)}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{dayResult.pay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{dayResult.income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{dayResult.total.toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
      <div className="billList" style={{ display: dateVisible ? 'block' : 'none' }}>
        {billList.map(item => {
          return (
            <div className="bill" key={item.id}>
              <Icon type={item.useFor}></Icon>
              <div className="detail">
                <div className="billType">{billTypeToName[item.useFor]}</div>
              </div>
              <div className={classNames('money', item.type)}>
                {item.money.toFixed(2)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default DailyBill