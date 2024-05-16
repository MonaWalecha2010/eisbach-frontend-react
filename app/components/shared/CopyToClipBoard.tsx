import React, {useState} from 'react'
import { CopyIcon } from '@/app/components/icons/svgIcons'
type ClipboardProps={
    id:string;
    text:string;
    cpClass?:string;
    tipPosition?:string;
    iconColor?:string;
}
const CopyToClipBoard:React.FC<ClipboardProps> = ({id, text, cpClass,tipPosition, iconColor }) => {
    const [copiedId, setCopiedId]=useState<string>('')
    const copySecretKey=(text:string, id:string)=>{
        navigator.clipboard.writeText(text);
        setCopiedId(id)
        setTimeout(() => {
            setCopiedId('');
        }, 1000);
    }
    return (
        <>
            {text?.length>0 ?(<>
                <div className={`inline-block relative ${cpClass?cpClass:''}`}>
                    <button type='button' className={`tooltip group-hover:tooltip-open ${tipPosition?tipPosition:'tooltip-right'}`} data-tip='Copy' onClick={()=>{ copySecretKey(text, id)}}><CopyIcon iconColor={iconColor && iconColor} /></button> 
                    {copiedId!=='' && copiedId===id && <span className='w-max b bg-slate-100 border border-[#E3DFFD] rounded-md py-2 px-3 absolute top-[-2.5rem] right-[2.25rem] p-2 mx-auto text-green-100 font-[500] text-xs'>Copied to clipboard.</span>}
                </div>
            </>):(<></>)}
        </>
    )
}

export default CopyToClipBoard