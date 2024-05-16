import React from "react";
import { AngleRightSm } from "../svgIcons";
const ImageBanner =(props, overlay=false) =>{
    const poster= props.poster;   
    const title_first= props.title_first;
    const title_second= props.title_second;
    const title= props.title;
    const breadcrumbs=[
        {
            name:'Home',
            link: '/'
        }
    ];
    const breadcrumbsData=props.breadcrumbsData?props.breadcrumbsData:breadcrumbs;
    return(
        <div className="page-banner image-banner">
            <div className={overlay===false?'bg-img':'bg-img overlay'} style={{ backgroundImage: 'url('+poster+')', backgroundPosition:props.bgPosition?props.bgPosition:''}}></div>
            
            <div className="breadcrumbs">
                <div className="site-container">
                    <h1 className="banner-heading mb-0">{title_first}<span className="text-blue">{title_second}</span></h1>
                    <div className="d-inline-flex align-items-center pt-2 pb-2 ps-0">
                        {breadcrumbsData && breadcrumbsData.map((breadCrumb, index)=>{
                            const {name, link}=breadCrumb;
                            return(
                                <span key={"breadCrumb-level-"+index} className="d-inline-flex align-items-center">
                                    <a href={link} className="link text-blue text-capitalize">{name} </a>
                                    <span className="ms-1 me-1 mb-1"><AngleRightSm /></span>                                    
                                </span>
                            )
                        })}
                        <span className="link text-black"> {title}</span>
                    </div>                
                </div>
            </div>
        </div>
    );
}
export default ImageBanner;