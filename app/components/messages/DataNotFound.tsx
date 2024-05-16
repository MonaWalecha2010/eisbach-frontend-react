import React from 'react'
type notFoundProps={
    message:string;
}
const DataNotFound:React.FC<notFoundProps> = ({message}) => {
  return (
    <div className='py-4 mt-4 w-full text-sm text-center font-semibold text-red-100'>{message}</div>
  );
}
export default DataNotFound