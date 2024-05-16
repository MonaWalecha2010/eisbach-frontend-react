import React, {useState, useEffect} from "react";
import Modal from 'react-bootstrap/Modal'
import Carousel from 'react-bootstrap/Carousel';
import {AngleLeftLg, AngleRightLg} from '../svgIcons';
import {replaceCrmUrl, getFilename} from '../../utils/utils';
const GallaryModal = ({name, gallaryModalData, galleryModalShow, currentIndex ,closeModal}) => {
	const [activeIndex, setActiveIndex] = useState(currentIndex);	
	const [modalGallary, setModalGallary]=useState([]);		
	const nextIcon=<AngleRightLg color="#fff" />;
	const prevIcon=<AngleLeftLg color="#fff" />;
	const imageBaseUrl =process.env.REACT_APP_BASE_API_URL;
	const handleModalSelect = (selectedIndex, e) => {
	    setActiveIndex(selectedIndex);
	};
	useEffect(()=>{				
		setModalGallary(gallaryModalData);	
	},[gallaryModalData]);		
	return(		
    	<Modal
	    	id="mansoryImageView" 		        
	        show={galleryModalShow}
	        onHide={closeModal} 
	        className="modal-full-width "
	        size="xl" 
	        backdrop={'static'} 	        
	        dialogClassName="gallary-dialog"
	        contentClassName="transparent-bg"
	    >
	    	<Modal.Header className="border-bottom-none" closeButton></Modal.Header>
			<Modal.Body>						
				<Carousel id="mansoryImageModalView" className="carousel slide product-gallary" 										
					controls={true} 
					activeIndex={activeIndex} 
					onSelect={handleModalSelect}
					variant="dark"
					indicators={false}
					autoPlay={false}
					nextIcon={nextIcon}
					prevIcon={prevIcon}
				>
					{modalGallary && modalGallary.map((image, i)=>{
						const {original}=image;
						let altText = getFilename(original);
						let imgUrl= replaceCrmUrl(original);
						return(
							<Carousel.Item 
			            	  	key={"gallary-img-"+i} 
			              		className="carousel-item w-100 h-100"
			            	  	interval={null}
			            	>
		            			<div className="p-modal-img">
		            				<img src={imageBaseUrl+imgUrl} alt={altText} title={altText} />
		            			</div>
		            		</Carousel.Item>
						);
					})}
				</Carousel>							
		    </Modal.Body>    
	    </Modal> 
	);
}
export default GallaryModal;