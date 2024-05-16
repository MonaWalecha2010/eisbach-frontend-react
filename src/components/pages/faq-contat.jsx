import React, {useEffect, useRef} from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import ImageBanner from '../templates/imageBanner';
import ContactUsForm from '../forms/contactUsForm';
import {PhoneAltIcon, EnvelopOpenIcon, LocationIcon} from "../svgIcons"
const FaqContact= () =>{
    const FaqContactRef = useRef(null);
    useEffect(() => {
        FaqContactRef.current.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'start', alignToTop: true});
    }, []);
    return(
        <>            
            <HelmetProvider> <Helmet>
                <title className="pege-meta-title">Eisbach Watches Contact</title>
                <link rel="canonical" href={process.env.REACT_APP_URL_CUSTOM+"faq-contact"} />
                <link rel="alternate" hreflang="x-default" href={process.env.REACT_APP_URL+"faq-contact"} />
                <meta name="description" content='Get in touch with Eisbach Watches and experience German engineering and Swiss-made precision firsthand. We`re here to help you find the perfect watch' />
                <meta property="og:title" content="Eisbach Watches Contact" />
                <meta property="og:type" content="website" />
				<meta property="og:description" content="Get in touch with Eisbach Watches and experience German engineering and Swiss-made precision firsthand. We`re here to help you find the perfect watch" />
                <meta property="og:url" content={process.env.REACT_APP_URL_CUSTOM+"faq-contact"}/>
                <meta property="og:image" content="https://www.eisbachwatches.com/images/logo/eisbach-watches.png"></meta>
            </Helmet></HelmetProvider>
            <ImageBanner poster={'images/contact-us.webp'} title_first="Con" title_second="tact" title="Contact" subTitle="Stay In Touch With Us" bgPosition="20% center" />
            <section className="mb-4">
                <div className="site-container contact-us">
                    <div className="text-center">
                        <h3 className="sec-title-sm mb-4">Rediscover the Natural World Around You <br/> With the Eisbach Watch Collection</h3>
                        <p>German Measured Time and Swiss Movement, coupled with inspired styling and unmistakably world-class features. Eisbach Watch Collection is the addition to your unique collection. Stand out from the crowd.Know what you want. Trust in our dedication to your lifestyle. As a Microbrand Watch Manufacturer, we ensure that every client is treasured. As our personal ambassador and member of the Eisbach Family, we welcome your genuine curiosity as that same sense of curiosity has provided us with the platform on which we now stand.</p>
                    </div>
                    <div className="text-center mt-5">
                        <h3 className="sec-title-sm mb-4">Proud founders and manufacturers of Eisbach Watches.</h3>
                    </div>
                    <div className="row g-3 mt-sm-4 contact-sec-wrap">
                        <div className="col-lg-4 col-md-4 col-sm-8 col-xs-8 ms-auto me-auto">                                    
                            <a className='link' target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/Manama+-+Bahrain+Bl.+338,+Rd.3801,+Bldg.15%2F+9074/@26.2149303,50.5939546,18z/data=!3m1!4b1">
                                <div className="cover-image-wrap border_RBLT position-relative">                                
                                    <div className="h-100 cover-image border_RBLT " style={{backgroundImage:'url(images/address-sea-ride-bg.webp)'}}></div>
                                    <div className="caption center">
                                        <div className="text-center">
                                            <span className="circle link-icon"> <LocationIcon /></span>                                            
                                            <h5 className="sec-title-sm text-white mb-2"> Eisbach Watches</h5> 
                                            <p className="text-white address">a Brand of KPSE WLL Bl. 338, <br/> Rd.3801, Bldg.15/ 9074 <br/> Manama - Bahrain</p> 
                                        </div>         
                                    </div>
                                </div>
                            </a>                                          
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-8 col-xs-8 ms-auto me-auto">                                    
                            <a className="text-white" href="mailto:hello@eisbachwatches.com">
                                <div className="cover-image-wrap border_RBLT position-relative">                                
                                    <div className="h-100 cover-image border_RBLT" style={{backgroundImage:'url(images/mail-us-water-bg.webp)'}}></div>
                                    <div className="caption center">
                                        <div className="text-center">
                                            <span className="circle link-icon link"> <EnvelopOpenIcon /></span>
                                            <h5 className="sec-title-sm text-white mb-2">Write Us An Email</h5> 
                                            <span className='link text-white hover-line'>Click here</span> 
                                        </div>         
                                    </div>
                                </div>
                            </a>                                           
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-8 col-xs-8 ms-auto me-auto">                                    
                            <a className="text-white" href="tel:+973 34 34 82 34">
                                <div className="cover-image-wrap border_RBLT position-relative">
                                    <div className="h-100 cover-image border_RBLT" style={{backgroundImage:'url(images/contact-us-air-bg.webp)'}}></div>
                                    <div className="caption center">
                                        <div className="text-center">    
                                            <span className="circle link-icon link"><PhoneAltIcon /></span> 
                                            <h5 className="sec-title-sm text-white mb-2">Call Eisbach</h5> 
                                            <span className="link text-white hover-line">+973 34 34 82 34</span>
                                        </div>    
                                    </div>
                                </div>
                            </a>                                           
                        </div>
                    </div>
                    <div className="row mt-5 g-3 scroll-padding" ref={FaqContactRef} id="FaqContact">
                        <div className="col-lg-6 col-md-8 col-sm-10 col-xs-12 ms-auto me-auto">
                            <h3 className="sec-title-sm mb-4 text-center">How can we <span className="text-blue">assist you?</span> </h3>
                            <ContactUsForm />
                        </div>              
                    </div>
                </div>
            </section>  
        </>
    );
}  
export default FaqContact;