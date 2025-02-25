import Navbar from '@/components/Navbar'
import { EmployeeClient } from '@/components/tables/emp-table/client'


import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col w-full'>  {/*------ Manadatory class for each page that have navbar -------*/}
    <Navbar active={true} search={true}/>
    <div className=' sm:px-6 sm:py-0 mt-24'>
    <EmployeeClient/>
    </div>
    </div>
  )
}

export default page
