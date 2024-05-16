import React from "react";
import Modal from 'react-bootstrap/Modal'
import parse from 'html-react-parser';
const PopupModal = ({modalId, show, title, showHeader, content, showFooter, closeModal, classes}) => {	
	return(
		<>
			<Modal 				
				id={modalId}
				show={show} 
				onHide={closeModal} 
				backdrop={true}
				keyboard={true}
				size="xl"				
				className={classes}			
			>
				<Modal.Header closeButton>
					{showHeader===true?(
						<Modal.Title>{title}</Modal.Title>			    		
			    	):('')}				    
				</Modal.Header>
				<Modal.Body>
					{content!=='' && content!==null?(
				    	<div className="rm-mb" >				    	
					       {parse(content)}
					    </div>
				    ):('')}				    
				</Modal.Body>
				{showFooter===true?(
		    		<Modal.Footer>
					    <button variant="secondary">Close</button>
					    <button variant="primary">Save changes</button>
					</Modal.Footer>
		    	):('')}
			</Modal>			
		</>
	);
}
export default PopupModal;