import React, { useRef } from 'react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link';
import { SignedIn, SignedOut } from '@clerk/nextjs'
import type { User } from "@clerk/nextjs/api";
import FormInputSearch from '../forms-components/FormInputSearch'
import styles from '../../styles/styles.module.scss'
import { useUser } from '@clerk/nextjs';
import { SettingsIconSm ,SettingsInviteSm } from '../icons/svgIcons';
import SignOutButton from '../shared/SignOutButton';
import PopupModal from '../modal/PopupModal';
import { UserProfile } from "@clerk/nextjs";
import { useAppSelector } from '@/app/store/hooks';
import { getOrg } from '@/app/store/reducers/gateway.selector';
import InvitationList from './InviteMembers';

type HeaderProps={
  isExpanded: boolean;  
  setIsExpanded: (val:any)=>void; 
}
const Header: React.FC<HeaderProps> = ({isExpanded, setIsExpanded}) => { 
  const {user} = useUser(); 
  const currentOrg = useAppSelector(getOrg);
  const userProfileModal = useRef<HTMLDialogElement>(null);  
  const userinviteModal = useRef<HTMLDialogElement>(null);  
  const openUserProfileModal = () => {
    if (userProfileModal?.current) {           
      userProfileModal?.current.show();      
    }
  };
  const openUserinvite = () => {
    if (userinviteModal?.current) {           
      userinviteModal?.current.show();      
    }
  };
  return (
    <>
      {/* <div className={`fixed top-0 h-[4.375rem] ${isExpanded?'w-100-217':'w-full'}`}> */}
        <nav className="flex  h-[4.375rem] items-center justify-between bg-white py-2 pl-4 pr-0 lg:px-2.313 ">
          <SignedIn>
            <div className='flex align-center'>
              <button type="button" onClick={()=> setIsExpanded(!isExpanded)} className="lg:mr-[4.688rem] text-gray-500 hover:text-gray-600" aria-label="Toggle navigation">
                <span className="sr-only">Toggle Navigation</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.366667 0.900024H19.6333C19.836 0.900024 20 1.06912 20 1.27757C20 1.48602 19.836 1.65488 19.6333 1.65488H0.366667C0.164 1.65488 0 1.48624 0 1.27757C0 1.06889 0.164 0.900024 0.366667 0.900024ZM5.36667 6.04833H19.6333C19.836 6.04833 20 6.21742 20 6.42587C20 6.63432 19.836 6.80318 19.6333 6.80318H5.36667C5.164 6.80318 5 6.63432 5 6.42587C5 6.21742 5.164 6.04833 5.36667 6.04833ZM19.6333 11.1966H0.366667C0.164 11.1966 0 11.3655 0 11.5742C0 11.7826 0.164 11.9517 0.366667 11.9517H19.6333C19.836 11.9517 20 11.7826 20 11.5742C20 11.3655 19.836 11.1966 19.6333 11.1966ZM5.36667 16.3447H19.6333C19.836 16.3447 20 16.5136 20 16.7223C20 16.9309 19.836 17.1 19.6333 17.1H5.36667C5.164 17.1 5 16.9309 5 16.7223C5 16.5136 5.164 16.3447 5.36667 16.3447Z" fill="#1F263E"/>
                </svg>          
              </button>  
              {/* <FormInputSearch /> */}
            </div>
           
          </SignedIn>         
          <div className='flex items-center text-white'>
            <SignedIn>              
              <div className='ml-auto '>
                <div className='inline-flex items-center'> 
                  <div className='inline-flex items-center mr-4'> 
                    {user && <div className="dropdown dropdown-end">
                      <label tabIndex={0} className="">
                        <div className={`flex text-gray-300`}>
                          <div className='w-[36px] h-[36px] overflow-hidden'>
                            <img src={user?.imageUrl} alt={user?.firstName?user?.firstName:'user image'} className='w-full h-full rounded-full' />
                          </div>
                          <div className={`flex flex-col text-gray-300 ${styles.user} ml-[.875rem] mr-[.875rem]`}>
                            <span className={styles.user_text}>{user?.fullName}</span>
                            <span className={styles.user_role}>{currentOrg?.name}</span>
                            {/* <span className={styles.user_role}>{currentOrg?.role}</span>  */} 
                          </div>                     
                        </div>
                      </label>
                      <div tabIndex={0} className="dropdown-content z-[1] menu shadow-dropdownShadow bg-base-100 rounded-box w-[230px] md:w-[23.5rem]">
                        <div className={`flex text-gray-300 p-3`}>
                          <div className='w-[36px] h-[36px] overflow-hidden'>
                            <img src={user?.imageUrl} alt={user?.firstName?user?.firstName:'user image'} className='w-full h-full rounded-full' />
                          </div>
                          <div className={`flex flex-col text-gray-300 ${styles.user} ml-[.875rem] mr-[.875rem]`}>
                            <span className={styles.user_text}>{user?.fullName}</span>                           
                            <span className={styles.user_role}>{user?.emailAddresses[0]?.emailAddress}</span> 
                          </div>                     
                        </div>
                        <div className='p-3'>                          
                          <button type="button" onClick={()=>openUserProfileModal()}>
                            <span className='flex items-center ml-4'>
                              <SettingsIconSm />
                              <span className='text-gray-100 text-sm ml-4'>Manage account</span>
                            </span>
                          </button>
    
                        </div>
                        {/* invite members in organigation */}
                        {/* <div className='p-3'>                          
                          <button type="button" onClick={()=>openUserinvite()}>
                            <span className='flex items-center ml-4'>
                              <SettingsInviteSm   />
                              <span className='text-gray-100 text-sm ml-4'>Invite Members </span>
                            </span>
                          </button>    
                        </div> */}
                        <div className='p-3'>
                          <SignOutButton />
                        </div>
                      </div>                      
                    </div>}
                  </div>
                </div>
              </div>                
              <PopupModal modalId='userProfilePopup' modalTitle='User Profile' modalRef={userProfileModal} width='lg:w-[55rem] max-w-[55rem]' middle={false} height='h-[90vh]'>
               
                <UserProfile appearance={{
                  elements:{
                    rootBox:{width: '100%', height:'100%', overflowY: 'auto',},
                    card:{width: '100%', boxShadow: 'none',},                    
                  }                   
                }} />
              </PopupModal>          
              <PopupModal modalId='inviteUsers' modalTitle='invite Users' modalRef={userinviteModal} width='lg:w-[30rem] max-w-[30rem]' middle={false} height='h-[60vh]'>
                <InvitationList/>
              </PopupModal>          
            </SignedIn>

          </div>
        </nav>
      {/* </div> */}
    </>
  )
}
export default Header