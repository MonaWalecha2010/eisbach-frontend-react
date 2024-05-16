import React, {useState,useEffect, useRef, useMemo} from "react";
import ProductService from '../../services/product.service';
import { Link} from "react-router-dom";
import useOnScreen from '../../utils/useOnScreen';
import { AngleRightSm } from "../svgIcons";
const WatchesMegaMenu = (props) => {
	const dataBaseUrl =process.env.REACT_APP_BASE_API_URL;
	const websiteVideoeUrl = process.env.REACT_APP_VIDEO_URL;
	const gallaryUrl= process.env.REACT_APP_GALLARY_URL;
	const [newArrivals, setNewArrivals]=useState({});
	const navVideo = useRef(null);	
	
	const onNavVideo = useOnScreen(navVideo, '0px');
	const fetchNewArrivalsData = async () => {		
	    const url ="latest-watches";
	    let response = await ProductService.getAllData(url);
	    if (response.status === 200) { 
	      setNewArrivals(response.data.data);	      
	    }
	} 
	useEffect(() => {
	    fetchNewArrivalsData();
	}, []);		
	useMemo(()=>{
        if(onNavVideo===true && navVideo.current.paused===true){
            navVideo.current.play();
			navVideo.current.playsInline = true;
        }
    },[onNavVideo]);	
	return(		
		<div className="row">
			<div className="col-lg-12 col-sm-12">
				<div className="row p-2 p-lg-3 pb-lg-0 g-2 g-lg-3">															
					<div className="col-xs-6 col-sm-6 col-md-3 col-lg-3 ">
						<Link to="/watches/men" className="link" onClick={()=>props.click()} >
							<div className="cover-image-wrap border_RBLT position-relative w-100">                                
	                            <div className="h-100 cover-image border_RBLT cover-overlay menu-category" style={{backgroundImage:`url(${gallaryUrl}/images/men_megamenu.webp)`}}></div>	                          
	                            <div className="caption center">                               
	                                <h4 className="sec-title-sm text-white mb-2" onClick={()=>props.click()}>MEN'S</h4>
	                            </div>
	                        </div>
	                    </Link>    
					</div>
					<div className="col-xs-6 col-sm-6 col-md-3  col-lg-3">
						<Link to="/watches/women" className="link" onClick={()=>props.click()} >
							<div className="cover-image-wrap border_RBLT position-relative w-100">                                
	                            <div className="h-100 cover-image border_RBLT cover-overlay menu-category" style={{backgroundImage:`url(${gallaryUrl}/images/women_megamenu.webp)`, backgroundPosition: '70%'}}></div>	                            
	                            <div className="caption center"> 
	                                <h4 className="sec-title-sm text-white mb-2" onClick={()=>props.click()}>WOMEN'S</h4>
	                            </div>
	                        </div>
	                    </Link>    
					</div>					
					<div className="col-xs-6 col-sm-6 col-md-3 col-lg-3">	
						<Link to="/watches/tidron-e1" className="e1-block link" onClick={()=>props.click()} >
							<div className="cover-image-wrap border_RBLT position-relative">
								<div className="h-100 cover-image border_RBLT menu-category" style={{backgroundImage:`url(${gallaryUrl}/images/Tidron_IFD_NIGHTVIEW_megamenu.webp)`}}></div>
								<div className="caption bottom dark">                                 	
                                	<h5 className="sec-title-sm text-white mb-1" onClick={()=>props.click()}>TIDRON <span className="text-blue">E1</span></h5>                                	
                                	<span className="link vm-link" onClick={()=>props.click()}>
                                		<span className="me-1">Discover Now</span>
										<AngleRightSm color="white" />										
                                	</span>
	                            </div>
	                        </div>
	                   	</Link>  
					</div>
					<div className="col-xs-6 col-sm-6 col-md-3 col-lg-3">
						<Link to="/watches/tidron-ut-360gm-t" className="ut-block link" onClick={()=>props.click()} >
							<div className="cover-video-wrap position-relative" >
								<video ref={navVideo} className='video border_TR' poster={`${gallaryUrl}/images/TidronUT360GM-T-Orange.webp`} playsInline muted loop controls={false} style={{ height: '100%', width:"100%", objectFit:'cover'}}  >
								  <source src={websiteVideoeUrl+"/videos/TIDRON_UT360GM_T_MC_ORANGE1.mp4"} type='video/mp4' />								 
	                            </video>  
	                            <div className="caption bottom dark border_BL">
	                                <h5 className="sec-title-sm text-white mb-1" onClick={()=>props.click()}>TIDRON <span className="text-blue">UT</span></h5>
	                            	<span className="link vm-link" onClick={()=>props.click()}>
                                		<span className="me-1">Discover Now</span>
										<AngleRightSm color="white" />										
                                	</span>
	                            </div>
	                        </div>
	                   	</Link>     
					</div>					
				</div>
			</div>
			<div className="d-none d-lg-block col-lg-12 ">
				<div className="row p-3 g-4 justify-content-center">					
					{newArrivals && Object.keys(newArrivals).length > 0 && newArrivals.map((newArrival)=>{						
						const {id, featured_image, featured_image_alt_text, label,item_code, slug}=newArrival;
						return(
							<div key={'new-arrival-'+id} className="col col-xs-12">
								<a className="link item-link" href={"/watches/"+slug+"/"+item_code} onClick={()=>props.click()} >
									<div className="product-item draw-border">							
										{/* <a className="link item-link" href={"/watches/"+slug+"/"+item_code} onClick={()=>props.click()} > */}
											<div className="item_image">
												<img src={dataBaseUrl+featured_image} className="img-fluid" alt={featured_image_alt_text} />
											</div>
											<div className="item_content">
												<p className="modal-id mb-0">{item_code}</p>
												<div className="title mb-2">{label}</div>											
											</div>
										{/* </a> */}
									</div>
								</a>							
							</div>
						);
					})}	
				</div>
			</div>
		</div>					
	);
}
export default WatchesMegaMenu;