import React from "react";
import { AngleRightSm } from "../svgIcons";
const SinglePageHeader =(props) =>{
    const title= props.PageTitle;
    const bgImage= props.bgImage;
    return(
        <>
            <div className="page-banner image-banner">
                <div className='bg-img' style={{ backgroundImage: 'url('+bgImage+')', backgroundPosition:props.bgPosition?props.bgPosition:'', height:props.height?props.height:''}}></div>
                <div className="breadcrumbs">
                    <div className="site-container">
                        <h1 className="banner-heading mb-0">{props.PageTitleFirst} <span className="text-blue">{props.PageTitleSecond}</span></h1>
                        <div className="d-inline-flex align-items-center pt-2 pb-2 ps-0">
                            <a href="/" className="link text-gray">Home </a>
                            <span className="ms-1 me-1 mb-1"><AngleRightSm /></span>                            
                            <span className="link text-black"> {title}</span>
                        </div>                
                    </div>
                </div>
            </div>
        </>
    );
}
export default SinglePageHeader;