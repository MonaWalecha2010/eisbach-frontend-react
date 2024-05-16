import React, { ReactNode, Ref } from "react"
import SaveButton from "../forms-components/SaveButton";
import { CircleCloseLg } from "../icons/svgIcons";
type deletePopupProps={   
    modalId: string;
    modalRef: any;
    message?: string;
    width?:string;
    deleteAction: Function; 
}
const DeletePopup: React.FC<deletePopupProps> = ({modalId, modalRef, width, message, deleteAction}) => {
    return (
        <dialog ref={modalRef} id={modalId} className={`modal sm:modal-middle `} >
            <div className={`modal-box border border-[#E3DFFD] rounded-[15px] pt-3 pb-6 px-0
            ${width?width:'max-w-sm'} scroll-mr-4 scroll-my-4 shadow shadow-[#E3DFFD]`}>
                
                <div className="text-center pt-[80px] pb-[80px]">
                    <form method="dialog"><button className="border-none"><CircleCloseLg /></button></form>                     
                    <div className="mt-4 mb-[20px] mx-auto max-w-[196px] text-sm text-primary-100 font-medium">
                        {message}
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <form method="dialog"><button className="btn btn-outline border-[#CACACA]  py-[.313rem] lg:py-[.438rem] px-[.938rem] ml-auto rounded-[.313rem]">Cancel</button></form> 
                        <SaveButton btnTitle="Remove" onClick={()=>deleteAction()}/>
                    </div>
                </div> 
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}

export default DeletePopup;