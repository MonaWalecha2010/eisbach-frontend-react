import React from "react";
import Modal from 'react-bootstrap/Modal'
const StarpModal = ({modalId, show, modalData, showHeader, closeModal, classes, click}) => {
	const dataBaseUrl =process.env.REACT_APP_BASE_API_URL;
	return(
		<>
			<Modal
				id={modalId} 
				centered 				 
				show={show}	
				onHide={closeModal}
				backdrop="static"   
				className={classes} 
				size="xl"								
				keyboard={true}				
			>
				<Modal.Header closeButton className={showHeader===false?'p-0 border-0':''}>
					{showHeader===true?(
						<Modal.Title>CHOOSE <span className="text-blue">STRAP</span></Modal.Title>			    		
			    	):('')}				    
				</Modal.Header>
				<Modal.Body>
					{modalData && modalData.map((data)=>{
						const {id, item_code, type, active_status, strap_image}=data;
						return(
					    	<div key={'strap'+id} className={active_status===1?'strap-wrapper active link':'strap-wrapper link'} onClick={() => click(id)}>				    	
						       <div className="row">
						       		<div className="col-4 col-sm-3 col-md-3 col-lg-3 text-center" onClick={() => click(id)}>
						       			<img src={dataBaseUrl+strap_image} alt={"strap-"+type} className="strap-thumbnail" />
						       		</div>
						       		<div className="col-8 col-sm-9 col-md-9 col-lg-9" onClick={() => click(id)}> 
						       			<div className="starp-desc"><span className="type">{type}</span> <span className="code">{item_code}</span></div>
						       		</div>
						       </div>
						    </div>
						);
				    })} 			    
				</Modal.Body>								
			</Modal>			
		</>
	);
}
export default StarpModal;