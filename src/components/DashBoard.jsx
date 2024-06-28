import React from 'react'
import LineChart from './LineChart'
import PieChart from './PieChart'
import BarChart from './BarChart'

const DashBoard = () => {
  return (
    <>
    <div className='flex justify-end m-10'>
    <div className='flex flex-wrap gap-5'>
        <div className='w-1/3 h-2/5 border-2 rounded-xl'>
        <LineChart />
        </div>
        <div className='w-1/3 h-2/5 border-2 rounded-xl'>
        <BarChart />
        </div>
        <div className='w-1/3 border-2 rounded-xl'>
        <PieChart />
        </div>
    </div>
    </div>

    </>
  )
}

export default DashBoard
