import React from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import ImageBanner from '../templates/imageBanner';
const WhyUs= () =>{
    const websiteVideoeUrl = process.env.REACT_APP_VIDEO_URL;    
    return(
        <>
            <HelmetProvider> <Helmet>
                <title className="pege-meta-title">WHY Eisbach Watches?</title>
                <meta name="description" content='Discover why Eisbach Watches is the ultimate choice for modern adventurers. Our precision-engineered Swiss made Tool watches offer unbeatable quality and style.' />
                <link rel="canonical" href={process.env.REACT_APP_URL_CUSTOM+"why-us"} />
                <link rel="alternate" hreflang="x-default" href={process.env.REACT_APP_URL+"why-us"} />
                <meta name="keywords" content="Eisbach, Simplicity, Accessibility, Watch, 360GM-T, Waterproof, Trigalight, Originality, engineered"  ></meta>
                <meta property="og:title" content="WHY Eisbach Watches?" />
                <meta property="og:type" content="website" />
				<meta prropety="og:description" content="Discover why Eisbach Watches is the ultimate choice for modern adventurers. Our precision-engineered Swiss made Tool watches offer unbeatable quality and style." />
                <meta property="og:url" content={process.env.REACT_APP_URL_CUSTOM+"why-us"}/>
                <meta property="og:image" content="https://www.eisbachwatches.com/images/logo/eisbach-watches.png"></meta>
            </Helmet></HelmetProvider>
            <ImageBanner poster={'images/why-us.webp'} title_first="Why " title_second=" Eisbach?" title="Why Eisbach?" subTitle="" bgPosition="85% center" overlay={true} />
            <section className="">
                <div className="site-container why-us">
                    <div className="row mt-3">                        
                        <div className="col-xl-7 col-lg-7 col-md-11 ms-auto me-auto col-sm-12 pe-lg-5">
                            <div className="cover-image-wrap border_RBLT">                               
                                <video className='video border_RBLT' poster="images/case-video-poster.webp" controls={false} autoPlay playsInline muted loop 
                                  style={{ height: '100%', width:"100%", objectFit:'cover'}}>
                                  <source src={websiteVideoeUrl+"/videos/TIDRON_UT_360GM-T_MC_CASE.mp4"} type='video/mp4' />
                                </video>
                            </div>    
                        </div>
                        <div className="col-xl-5 col-lg-5 col-md-11 col-sm-12 self-align-center ms-auto me-auto">
                            <div className="mw-40 mw-md-100 d-flex align-items-center h-100 ms-auto ps-lg-4 pe-lg-0" >
                                <div className="text-center text-lg-start">
                                    <h4 className="sec-title-sm text-black mb-4 pe-xxl-5"><span className="text-blue">Simplicity: The art </span>of creating a successful Tool Watch is in the details.</h4>
                                    <p>And through this art: A complex array of engineering feats must be achieved in order to produce a Precision Tool Watch…One that is unpromising in its integrity and style and incorporates the Swiss Movement within its mechanism. So, while remaining cognizant of each detail, Eisbach has refined the integration to realize a simple yet elegant styling.</p> 

                                    <p>Relying on inspiration from the natural world, Eisbach watches are truly unique tool watches. Simultaneously achieving a style both sophisticated and visually attractive, retaining its integrity - able to compete in any environment.</p>

                                </div>    
                            </div>   
                        </div>
                    </div>
                    <div className="row border-block-wrap medium">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 self-align-center order-2 order-md-1">
                            <div className="mw-25 mw-md-100 d-flex align-items-center h-100 mt-3 mt-md-0">
                                <div className="text-center text-md-start">
                                    <h4 className="sec-title-sm text-black mb-4 d-none d-md-block"><span className="text-blue">Accessibility: </span>Yes, <br/> Eisbach is a tool watch</h4>
                                    <h4 className="sec-title-sm text-black mb-4 d-block d-md-none"><span className="text-blue">Accessibility: </span>Yes, Eisbach is a tool watch</h4>
                                    <p>But that doesn't have to translate to an exclusive and elitist product. Our clients have a taste for adventure… They want a watch they can treasure for decades…A watch that not only withstands the elements but also compliments the many facets our lives demand us to participate in.</p>
                                    <p>Our watches are precision- German engineered. As a company, we really have remained steadfast in our dedication to our client base. And as such, Eisbach watches are for anyone wishing to indulge in their sense of adventure while displaying a sophisticated taste - for both design and application.</p>
                                </div>    
                            </div>   
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-8 ms-auto me-auto accessibility-img order-1 order-md-2">
                            <div className="cover-image-wrap border_RBLT">                               
                                <div className="cover-image border_RB" style={{backgroundImage:'url(images/tool-watch.webp)',backgroundPosition:'center bottom'}}></div>
                            </div>    
                        </div>
                    </div>
                </div>
                <div className="mt-3 mb-3 position-relative" >
                    <div className="why-features-bg cover-image" style={{backgroundImage:'url(images/steel_watch_features_bg.webp)'}}></div>
                    <div className="position-absolute md-static center-right w-45 w-md-100 h-100">                        
                        <div className="mw-32 ms-100 mw-md-100  d-flex align-items-center h-100 black-bg p-4 pb-0 p-lg-0">
                            <div className="">
                                <h4 className="sec-title-sm text-white mb-4 text-center text-lg-start"><span className="text-blue">Features: </span>Hardwired into our ethos is the need to deliver the most superior offering at an affordable price.</h4>
                                <div className=" mt-3 list-style-watch small-dial text-center text-sm-start">
                                    <ul>
                                        <li>Our collections boast not only a 300 to 500m dive depth. (…Which is not the core criteria for a sophisticated, expertly crafted dive watch.) No…Eisbach Watch Collections has it all.</li>
                                        <li>Our team of skilled engineers creates a vision. And once they've cemented themselves in this vision, it's time to take that vision and make it a reality.</li>
                                        <li>That is seen in the cutting-edge, high-grade materials we chose to use. It's also seen in the effortless incorporation of those elements in the design of every world-class watch we make. </li>   
                                    </ul>
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>
                <div className="site-container why-us">    
                    <div className="row border-block-wrap medium mb-4">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 self-align-center">
                            <div className="mw-25 mw-sm-100 d-flex align-items-center h-100">
                                <div className="text-center text-md-start">
                                    <h4 className="sec-title-sm text-black mb-4"><span className="text-blue">We offer </span>you YOUR watch:</h4>
                                    <p>With every Eisbach watch purchased, our clients receive a stunningly styled and sophisticated timepiece…A piece of the BEST in German and Swiss watch engineering… We have created a high-quality self-illuminating watch face…</p>
                                    <p>With either Trigalight H3 or Swiss Lumina Dial Hands, the mechanism is crafted to perfection for maximum performance under any conditions. All at an affordable price…Without losing any of the essential spirit that defines a world-class diving watch such as ours.</p>
                                </div>    
                            </div>   
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 ms-auto me-auto">
                            <div className="cover-image-wrap border_RBLT">                               
                                <div className="cover-image border_RB " style={{backgroundImage:'url(images/YOUR-UT-Watch.webp)',backgroundPosition:'center bottom', minHeight:'36.875rem'}}></div>
                            </div>    
                        </div>
                    </div>
                </div>
            </section>              
        </>
    );
}  
export default WhyUs;