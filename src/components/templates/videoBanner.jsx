import React from "react";
import { AngleRightSm } from "../svgIcons";
const VideoBanner =(props) =>{
    const poster= props.poster;
    const videoUrl= props.videoUrl;
    const title_first= props.title_first;
    const title_second= props.title_second;
    const addClass = props.addClass?props.addClass:'';
    const srcType= props.srcType?props.srcType:'webm';   
    // const subTitle= props.subTitle;
    const title= props.title;
    const breadcrumbs=[
        {
            name:'Home',
            link: '/'
        }
    ];
    const breadcrumbsData=props.breadcrumbsData?props.breadcrumbsData:breadcrumbs;     
    return(       
        <div className="page-banner video-banner">
            <div className={props.fullHeight===true?"video-wrap full-height "+addClass:"video-wrap "+addClass}>
                <video className='video' poster={poster} controls={props.showControls?props.showControls:false} controlsList="nodownload notimeline play volume fullscreen" autoPlay playsInline muted loop
                    style={{ height: '100%', width:"100%"}}>
                    <source src={videoUrl} type={'video/'+srcType} />
                </video>
            </div>
            <div className="breadcrumbs">
                <div className="site-container">
                    <h1 className="banner-heading mb-0">{title_first} <span className="text-blue">{title_second}</span> {props.phonetic?<span className="text-initial"> {props.phonetic}</span>:''}</h1>
                    <div className="d-inline-flex align-items-center pt-2 pb-2 ps-0">
                        {breadcrumbsData && breadcrumbsData.map((breadCrumb, index)=>{
                            const {name, link}=breadCrumb;
                            return(
                                <span key={"breadCrumb-level-"+index} className="d-inline-flex align-items-center">
                                    <a href={link} className="link text-gray">{name} </a>
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
export default VideoBanner;