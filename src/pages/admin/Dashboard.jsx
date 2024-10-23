import React from 'react'
import DashboardTab from './DashboardTab'
const Dashboard = () => {
  const arr = [
    {
      name:'Number of Products',
      count:10,
    },
    {
      name:'Number of Users',
      count:10,
    },
    {
      name:'Number of Order',
      count:10,
    },
    {
      name:'Number of Products',
      count:10,
    }
  ]
  return (
    <div>
      <div className='flex flex-col items-center justify-center h-auto min-h-screen'>
        <div className='flex flex-col items-center justify-center w-screen h-auto gap-2 lg:flex-row'>
          {
            arr.map((i, idx)=>(
              <div key={i}>
                <div className=' bg-sky-50 h-[5rem] w-[90vw]  lg:h-[20rem] lg:w-[22rem] justify-between lg:px-0 px-6 lg:justify-center items-center flex flex-row lg:flex-col gap-10 text-2xl'>
                  <h1 className='hidden lg:flex'>👤</h1>
                  <h1 className='text-lg lg:text-2xl '>{i.name}</h1>
                  <h1>{i.count}</h1>
                </div>
              </div>
            ))
          }
        </div>
        <DashboardTab />
      </div>
    </div>
  )
}

export default Dashboard
