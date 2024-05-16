import React from 'react'
type errorProps={
    error:string;
    fSize?:string;
    eClass?:string;
}
const ErrorMessage:React.FC<errorProps> = ({error, fSize='text-xs', eClass}) => {
  return (
    <p className={`text-red-100 ml-2 mt-2 ${fSize} ${eClass && eClass}`}>{error}</p>
  )
}
export default ErrorMessage