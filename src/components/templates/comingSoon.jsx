import React from 'react';
import { Link } from "react-router-dom";
import { RightArrow } from '../svgIcons';
const ComingSoon= () =>{    
    const websiteVideoeUrl = process.env.REACT_APP_VIDEO_URL;
    return(
        <>
            <div className="page-banner video-banner dark_overlay coming-soon">
                <video className='video' poster="images/poster_image_ut360gmt_green.webp" controls={false} autoPlay playsInline muted loop 
                    style={{ height: '100%', width:"100%"}}>
                    <source src={websiteVideoeUrl+"/videos/TIDRON_UT_360GM-T_MC_GREEN2.mp4"} type='video/mp4' />
                </video>
                <div className="video-banner-content">
                    <div className="text-center">
                        <h1 className="fs-1 text-uppercase mb-3">Coming <span className="text-blue">Soon!</span></h1>
                        <div className='animated-btn-warp'>
                            <Link  className='btn rounded-white-blue' to="/" >
                                <span className='d-flex align-items-center justify-content-center'><RightArrow color='white' iconClass="back-arrow" /><span className='ms-2 text'>Back to Website</span> </span>
                                <span className='line-1'></span>
                                <span className='line-2'></span>
                                <span className='line-3'></span>
                                <span className='line-4'></span>
                            </Link>
                        </div> 
                    </div>
                </div>
            </div>            
        </>
    );
}  
export default ComingSoon;