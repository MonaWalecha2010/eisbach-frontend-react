import React, { ReactNode, Ref } from "react"
import styles from '../../styles/styles.module.scss'
import { boolean } from "yup";
type ModalProps={
  isShow?: boolean;
  modalId: string;
  modalRef: any;
  modalTitle?: string;
  showHeader?:boolean;
  middle?:boolean;
  width?:string;
  height?:string;
  closeModal?:Function;
  maxWidth?:string;
  children: ReactNode;
}
const PopupModal:React.FC<ModalProps> = ({modalId, modalTitle, modalRef, width, showHeader=true, middle=true, height, closeModal, maxWidth, children}) => { 
  const closePopupModal=()=>{
    closeModal && closeModal();
  } 
  return (
    <dialog ref={modalRef} id={modalId} className={`modal ${middle?`sm:modal-middle`:''}`} >
      <div className={`modal-box border border-[#E3DFFD] rounded-[15px] pt-3 pb-6 px-0
       ${width?width:'max-w-full md:max-w-xl'} ${height?height:'max-h-full'} scroll-mr-4 scroll-my-4 shadow shadow-[#E3DFFD] overflow-y-hidden`}> 
        {showHeader &&  
          <div className="flex pb-2 px-4 p border-b border-gray-300 items-center justify-between h-[2.5rem]">
            <h3 className="font-semibold text-primary-100">{modalTitle}</h3>        
            <form method="dialog" onSubmit={()=>closePopupModal()}>          
              <button className="btn btn-sm btn-circle font-xs bg-white hover:bg-primary-300 hover:text-white ">✕</button>
            </form> 
          </div>
        }
        <div className={`${middle?'px-6':''} ${showHeader?'h-full--2.5':''}`}>{children}</div> 
      </div>
      <form method="dialog" className={`modal-backdrop ${styles.modal}`} onSubmit={()=>closePopupModal()}>
        <button>close</button>
      </form>
    </dialog>
  );
}

export default PopupModal
