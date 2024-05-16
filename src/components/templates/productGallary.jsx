import React, {useState, useEffect} from "react";
import Modal from 'react-bootstrap/Modal'
import Carousel from 'react-bootstrap/Carousel';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {AngleLeftLg, AngleRightLg, AngleDown, AngleUp} from '../svgIcons';
import {replaceCrmUrl, getFilename} from '../../utils/utils';
const ProductGallary = ({name, gallaryData, nightMode}) => {	
	const [itemCount, setItemCount] = useState(0);
	const imageBaseUrl =process.env.REACT_APP_BASE_API_URL;
	const [index, setIndex] = useState(0);
	const [activeIndex, setActiveIndex] = useState(0);
	const [imageShow, setImageShow] = useState(false);
	const [productGallary, setProductGallary]=useState([]);	
	const downArrow=<AngleDown />;
	const upArrow=<AngleUp />;
	const nextIcon=<AngleRightLg color="#fff" />;
	const prevIcon=<AngleLeftLg color="#fff" />;
	useEffect(()=>{		
		if(nightMode===true){			
			setIndex(0);				
			setProductGallary(gallaryData.night_gallery_images);
			setItemCount(gallaryData.night_gallery_images.length);		
		}else{					
			setProductGallary(gallaryData.gallery_images);
			setItemCount(gallaryData.gallery_images.length);			
		}
	},[nightMode, gallaryData]);	
	const scrollThumbnail=(selectedIndex, e )=>{		
		const currThumbnail = document.getElementById('thumbnail_'+selectedIndex); 		
		setIndex(selectedIndex);
	   	currThumbnail.scrollIntoView({behavior: 'smooth', block: 'nearest'});
	};
	const handleSelect = (selectedIndex, e) => {
	    setIndex(selectedIndex);
	    scrollThumbnail(selectedIndex);
	};
	const handleModalSelect = (selectedIndex, e) => {
	    setActiveIndex(selectedIndex);
	};
	const showImageModal=(currentIndex)=>{		
		setActiveIndex(currentIndex);
		setImageShow(true);		
	}
	const closeImageModal=()=>{
		setImageShow(false);
	}
	const nextSlide=()=>{		
		if(index < itemCount-1 ){
			setIndex(index + 1);
			scrollThumbnail(index + 1);	
		}else{
			setIndex(0);
			scrollThumbnail(0);	
		}
	}
	const prevSlide=()=>{		
		if(index > 0){
			setIndex(index - 1);
			scrollThumbnail(index - 1);
		}else{
			setIndex(itemCount);
			scrollThumbnail(itemCount-1);
		}		
	}		
	return(
		<div className="single-product-carousel">
			<Carousel id="eisbachProductGallary" className={nightMode===true?"carousel slide product-gallary dark-mode":"carousel slide product-gallary"}										
				controls={false} 
				activeIndex={index} 
				onSelect={handleSelect}
				variant="dark"
				indicators={true}
				interval={null}				
				nextIcon={downArrow}
				prevIcon={upArrow}				
			>
				{productGallary && productGallary.map((image, i)=>{
					const {original}=image;
					let imgUrl= replaceCrmUrl(original);
					let altText = getFilename(original);									
					return(						
						<Carousel.Item 
		            	  	key={"gallary-img-"+i} 
		              		className="carousel-item"
		            	  	interval={null}
		            	>
	            			<div className="gallary-img p-3" onClick={()=>showImageModal(i)}>
								<img src={imageBaseUrl+imgUrl} alt={altText} title={altText} loading="lazy" />								
	            			</div>
	            		</Carousel.Item> 
					);
				})}
			</Carousel>
			<div className="thumbnail-wrapper">
				<span className="prev" onClick={()=>prevSlide()}>{upArrow}</span>
				<ul className="thumbnails-list">					
					{productGallary && productGallary.map((image, i)=>{
						const {thumbnail}=image;
						let thumbnailUrl= replaceCrmUrl(thumbnail);
						let altText = getFilename(thumbnail);
						return(
							<li key={'thumbnail-'+i} id={'thumbnail_'+i} className={i===index?'thumbnail active':'thumbnail'} onClick={()=>scrollThumbnail(i)}>
								<img src={imageBaseUrl+thumbnailUrl} alt={altText} title={altText} loading="lazy" />
							</li>	
						);
					})}					
	    		</ul>
	    		<span className="next" onClick={()=>nextSlide()}>{downArrow}</span>
    		</div>
			{imageShow===true?(
		    	<>
					<Modal
						id="productImageView" 		        
						show={imageShow}
						onHide={closeImageModal} 
						className="modal-full-width"
						size="xl" 
						backdrop={'static'} 
						backdropClassName={nightMode===true?"":""}
						dialogClassName="gallary-dialog"
						contentClassName="transparent-bg"			        
					>
						<Modal.Header className="border-bottom-none" closeButton></Modal.Header>
						<Modal.Body>						
							<Carousel id="productImageModalView" className="carousel slide product-gallary" 										
								controls={true} 
								activeIndex={activeIndex} 
								onSelect={handleModalSelect}
								variant="dark"
								indicators={false}
								autoPlay={false}
								nextIcon={nextIcon}
								prevIcon={prevIcon}
							>
								{productGallary && productGallary.map((image, i)=>{
									const {original}=image;
									let imgUrl= replaceCrmUrl(original);
									let altText = getFilename(original);
									return(
										<Carousel.Item 
											key={"gallary-img-"+i} 
											className="carousel-item w-100 h-100"
											interval={null}
										>
											<div className="p-modal-img">
												<LazyLoadImage src={imageBaseUrl+imgUrl} alt={altText} title={altText} threshold={200} />
											</div>
										</Carousel.Item>
									);
								})}
							</Carousel>							
						</Modal.Body>    
					</Modal>		    	
		        </>
		    ):('')}
		</div>
	);
}
export default ProductGallary;