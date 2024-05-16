import React from 'react'
import styles from '../../../styles/styles.module.scss';
import PageTitle from '../../../components/PageTitle';
import { UsersData } from '@/app/components/data/usersData';
const Users = () => {
  return (
    <>
        <PageTitle pageTitle="All Users" icon={false} />
        <div className='px-6 py-6 border rounded-xl bg-white border-blue-700 h-full'>          
          <div className="grid grid-cols-4 gap-4">
            <div>01</div>
            <div>02</div>
            <div>03</div>
          </div>
        </div>
        
    </>
  )
}

export default Users