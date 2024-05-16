import React from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import ImageBanner from '../templates/imageBanner';
const Services= () =>{
    return(
        <>
            <HelmetProvider> <Helmet>
                <title>Eisbach Watches | Service</title>
                <meta name="description" content="Discover top-notch service for your  watch with our team of experts. Trust us to keep your German-engineered, Swiss-made timepiece in perfect condition" />        
                <link rel="canonical" href={process.env.REACT_APP_URL_CUSTOM+"services"} />
                <link rel="alternate" hreflang="x-default" href={process.env.REACT_APP_URL+"services"} />
                <meta property="og:title" content="Eisbach Watches Service" />
                <meta property="og:type" content="website" />
				<meta property="og:description" content="Discover top-notch service for your  watch with our team of experts. Trust us to keep your German-engineered, Swiss-made timepiece in perfect condition" />
                <meta property="og:url" content={process.env.REACT_APP_URL_CUSTOM+"services"}/>
                <meta property="og:image" content="https://www.eisbachwatches.com/images/logo/eisbach-watches.png"></meta>
            </Helmet></HelmetProvider>
            <ImageBanner poster={'images/Service-banner.webp'} title_first="Serv" title_second="ice" title="Service" subTitle="Service" bgPosition="center" />
            <section>
                <div className="border-block-wrap service mt-0 ps-3 pe-3 ps-sm-4 pe-sm-4 ps-lg-5 pe-lg-5 ps-xxl-3 pe-xxl-3">
                    <div className="cover-image-wrap position-relative mb-0 mb-md-4 border_RBLT">                        
                        <div className="cover-image border_RBLT p-md-5 pb-0 w-100 clear-both watch-servicing-one" style={{backgroundImage:'url(images/service-features.webp)', backgroundPosition:'center'}}></div>
                        <div className="position-absolute align-bottom w-100 h-100 d-flex align-items-end align-lg-items-center p-3 pb-0 p-sm-4 p-xl-5" >                                                         
                            <div className="mw-25 mw-md-100 w-100 me-auto ms-lg-4">
                                <div className="mt-3 list-style-watch dark-watch text-center text-sm-start">
                                    <ul className='mb-0'>
                                        <li>
                                            The movement of your Eisbach watch will continue to run efficiently and accurately with regular maintenance. Proper maintenance involves cleaning parts, replacing worn parts, and applying lubrication.</li>
                                        <li>
                                            <div>We also offer meticulous refurbishing of cases and bracelets without DLC coating to keep your watch looking like new.
                                            <p className='mt-3 mb-0 fs-5 fw-300 text-blue'>Make your Diver or GMT watch last longer and secure your investment.</p></div>                                            
                                        </li>                                        
                                    </ul>
                                </div>                                
                            </div>                  
                        </div>
                    </div>                    
                </div>
                <div className="border-block-wrap mt-0 large ps-3 pe-3 ps-sm-4 pe-sm-4 ps-lg-5 pe-lg-5 ps-xxl-3 pe-xxl-3 ">
                    <div className='row clear-both mb-5'>
                        <div className='col-sm-6 col-md-6 col-lg-6'>
                            <div className="cover-image-wrap border_RBLT RG-service">
                                <div className="cover-image border_RBLT h-100" style={{backgroundImage:'url(images/Regular-service.webp)'}}></div>
                            </div>
                            <div className='mt-4 text-center text-sm-start'>
                                <h4 className="sec-title-sm mb-3"><span className="text-blue">Regular </span>Service</h4>
                                <p>Maintenance is recommended every two years, which includes cleaning the case and metal bracelet, changing all gaskets, testing the water resistance, and checking the movement parameters and watch functions.</p>
                            </div>
                        </div>
                        <div className='col-sm-6 col-md-6 col-lg-6'>
                            <div className="cover-image-wrap border_RBLT mb-3 PR-service">
                                <div className="cover-image border_RBLT h-100" style={{backgroundImage:'url(images/Premium-service.webp)'}}></div>
                            </div>
                            <div className='mt-4 text-center text-sm-start'>
                                <h4 className="sec-title-sm mb-3"><span className="text-blue">Premium </span>Service</h4>
                                <p>A complete service for all watches is recommended every four to six years. It includes disassembling, cleaning, and replacing standard parts of the movement (e.g., some hands), reassembling, lubricating, adjusting, and setting the functional parameters of the movement, as well as replacing all seals and testing the water resistance. The comprehensive watch service includes cleaning and refurbishing the case and metal bracelet *.</p>
                            </div>
                        </div>
                    </div>
                    <div className="cover-image-wrap position-relative mb-0 mb-md-4 border_RBLT">
                        <div className="cover-image border_RBLT p-md-5  w-100 clear-both watch-servicing-two" style={{backgroundImage:'url(images/Soprod-Movement.webp)', backgroundPosition:'center'}}></div>
                    </div> 
                    <div className='mt-4 text-center text-sm-start'>
                        <p>Eisbach's movements are composed of a large number of moving parts that constantly interact in a small space. Despite the use of premium materials and extreme care in manufacturing, wear and tear are inevitable in this mechanical process. External constraints affect the gaskets, which also lose effectiveness over time. As parts are cleaned, worn parts are replaced, and the watch is appropriately lubricated, routine maintenance will allow your watch's movement to maintain its performance and reliability over time. Because the case and bracelet* have been carefully restored, your watch will continue to look like new. You can extend the life of your watch and protect your investment by following Eisbach Watches' recommended maintenance schedules and ensuring that maintenance is performed by our service center</p>
                        <p>*case and Bracelet Refurbishment only for watches without DLC Coating</p>
                    </div>                
                </div>                
            </section>
        </>
    );
}  
export default Services;