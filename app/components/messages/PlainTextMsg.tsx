import React from 'react'
type plainTextMsgProps={
    message:string;
}
const PlainTextMsg:React.FC<plainTextMsgProps>=({message}) => {
  return (
    <div className='py-4 mt-4 w-full text-sm text-center font-semibold text-primary-100'>{message}</div>
  )
}
export default PlainTextMsg