import React, {ReactNode } from 'react'
import Pagination from './pagination';
export type childrenType = ReactNode;
type TableProps={
    headingsData:[]|any;
    bodyClassName?:string;
    actions?:boolean;
    pageHandler?:Function;
    totalCount?:number;
    pageLimit?: number;
    setPageLimit?:(val:any)=>void;
    pageNumber?:number;
    setPageNumber?:(val:any)=>void;
    showPagination?:boolean;
    showLimitOption?:boolean;
    showTotalRecords?:boolean;
    children?: childrenType;
}
const TableComponent:React.FC<TableProps> = ({headingsData, bodyClassName, actions=false, showPagination=true, showLimitOption=true, showTotalRecords=true, pageLimit, setPageLimit, pageNumber, setPageNumber, totalCount, pageHandler, children}) => {    
    return (
        <>
            <div className="overflow-x-auto flex flex-col justify-between min-h-[inherit]">
                <table className="table text-xs">            
                    <thead>
                        <tr className='border-b-2'>
                            {headingsData && headingsData.map((item:any, index:number)=>(
                                <th key={`head-${index}`} className='text-primary-100 text-sm font-light capitalize'>{item?.name}</th>
                            ))}
                            {actions && <th className='text-primary-100 text-sm font-light capitalize'>Actions</th>}
                        </tr>                
                    </thead>
                    <tbody className={`${bodyClassName?bodyClassName:''}`}>
                        {children}
                    </tbody>                    
                </table>
                {pageHandler && <>
                    <Pagination 
                        isEnabled={showPagination}
                        showLimitOption={showLimitOption}
                        showTotalRecords={showTotalRecords}
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                        pageLimit={pageLimit}
                        setPageLimit={setPageLimit}
                        totalCount={totalCount?totalCount:0}
                        pageHandler={pageHandler}
                    />
                </>}
            </div>
        </>
    )
}

export default TableComponent;