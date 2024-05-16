import React, {ReactNode} from 'react'
type textOneProps={
    classList?:string;
    heading: string;
    desc: string;
    type?: 'main'|string
    
}
const TextOne:React.FC<textOneProps> = ({classList, heading, desc, type}) => {
  return (
    <div className={`mb-3 ${classList && classList}`}>
        <p className='text-xs text-gray-800 uppercase'>{heading}</p>
        {type === 'sub' ? <p className='text-primary-100 text-md font-semibold w-[100%] truncate'>{desc}</p>
        :<p className='text-primary-100 text-md font-semibold w-[100%] truncate'>{desc}</p>}
    </div>
  );
}
export default TextOne;