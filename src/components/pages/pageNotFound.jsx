import React from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import { RightArrow } from '../svgIcons';
const PageNotFound= (props) =>{    
    const websiteVideoeUrl = process.env.REACT_APP_VIDEO_URL;
    return(
        <>
            <HelmetProvider> <Helmet>
                <title className="pege-meta-title">Page Not Found</title>
                <meta name="description" content='We could not found any content for the requested page..' />
            </Helmet></HelmetProvider> 
            <div className="page-banner video-banner dark_overlay">
                <video className='video' poster="images/poster-404.webp" controls={false} autoPlay playsInline muted loop 
                    style={{ height: '100%', width:"100%"}}>
                    <source src={websiteVideoeUrl+"/videos/FIDFront.mp4"} type='video/mp4' />
                </video>
                <div className="video-banner-content">
                    <div className="text-center">                       
                        <h1 className="fs-2 text-uppercase mb-1">
                            {props.title?props.title:(<>Page <span className="text-blue">Not Found</span></>)}
                        </h1>
                        <p className="text-white fs-2 mb-4 fw-100">{props.errorMessage!==null?props.errorMessage:"Something went wrog, we are checking for solution."}</p>
                        <div className='animated-btn-warp'>
                            <Link  className='btn rounded-white-blue'  to="/" >
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
export default PageNotFound;