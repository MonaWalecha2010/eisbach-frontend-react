import React, { ReactNode } from "react"
type cardProps={
    classList:string;
    disabled?:boolean;
    children: ReactNode;
}
const CardOne:React.FC<cardProps> = ({classList, disabled=false, children}) => {
    return (
        <div className={`border-2 bg-[#fff] border-silver-800 ${classList} ${disabled===false && 'hover:bg-[#fff] hover:shadow-2lg'} hover:focus-within:shadow-none`}>
            {children}
        </div>
    );
}
export default CardOne;