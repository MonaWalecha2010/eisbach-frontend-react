import React from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import VideoBanner from '../templates/videoBanner';
const About= () =>{
    const websiteVideoeUrl = process.env.REACT_APP_VIDEO_URL;    
    return(
        <>
            <HelmetProvider> <Helmet>
                <title className="pege-meta-title">About Eisbach Watches</title>
                <link rel="canonical" href={process.env.REACT_APP_URL_CUSTOM+"about"} />
                <link rel="alternate" hreflang="x-default" href={process.env.REACT_APP_URL+"about"}/>
                <meta name="description" content='Get to know the team behind Eisbach Watches. With a dedication to excellence, our skilled watchmakers bring innovation and beauty to every timepiece'   />
                <meta name="keywords" content="Eisbach, TIDRON, UT, E1, 360GM-T, Waterproof, Trigalight, Originality, River"></meta>                
                <meta property="og:title" content="About Eisbach Watches" />
                <meta property="og:type" content="website" />
				<meta property="og:description" content="Get to know the team behind Eisbach Watches. With a dedication to excellence, our skilled watchmakers bring innovation and beauty to every timepiece" />
                <meta property="og:url" content={process.env.REACT_APP_URL_CUSTOM+"about"}/>
                <meta property="og:image" content="https://www.eisbachwatches.com/images/logo/eisbach-watches.png"></meta>
            </Helmet></HelmetProvider>
            <VideoBanner 
                poster="/images/about_banner.webp" 
                videoUrl={websiteVideoeUrl+"/videos/Eisbach-ABOUT_Video.mp4"}
                srcType="mp4"
                title_first="About" 
                title_second="Eisbach " 
                title="About Eisbach" 
                subTitle="What We Do" 
                showControls={true}
                fullHeight={true}
                addClass="about-video" 
                phonetic=" | ˈaɪz bɑːk |"           
            />
            <section className="mt-0 pb-0 mt-md-3 mt-lg-4">
                <div className="site-container technology">
                    <div className=" mt-3 list-style-watch dark-watch text-center text-sm-start">
                        <ul>
                            <li>Inspired by natural forces coming together in power and beauty…Eisbach is the synchronicity of nature itself. Years of following the river surfing scene in Munich sparked the embers that ignited Eisbach.A practical and accessible Tool watch that not only captures elegance in style…But is also capable of outperforming the world's BIGGEST and BEST watch brands.</li>
                            <li>The Eisbach River in Munich is a testament to how uniquely we can balance our lives with nature. Well, when we set our minds to it, of course. When building the best Tool watches, our philosophy dovetails with this unique vision of man striding alongside nature. It's the way it was then and the way it should be now…</li>
                        </ul>
                    </div>                   
                </div>
                <div className="row m-0 mt-5 mb-5">
                    <div className="col-xxl-7 col-xl-7 col-lg-7 m-auto m-lg-0 col-md-11 col-sm-12 border_RB about-images-block one-block">
                        <div className="cover-image-wrap border_RB br-md-TRBL">
                            <div className='cover-image border_RB br-md-TRBL ' style={{backgroundImage:'url(/images/watch-back-and-watch-making.webp)', backgroundPosition:'55% top' }}></div>
                        </div>                        
                    </div>
                    <div className='col-xl-5 col-lg-5 col-md-11 m-auto m-lg-0 col-sm-12 ps-xl-5 align-self-center text-center text-lg-start'>
                        <div className='mw-28 ms-lg-5 mw-md-100 pt-4 pt-lg-0'>
                            <h4 className="sec-title-sm mb-3"><span className="text-blue">Originality: </span>Born in the hearts and minds behind the brand…</h4>
                            <p>Eisbach is made up of a team of enthusiastic, truly passionate watchmakers. Our watchmakers are the very best in technological innovation, unflinchingly precise and have over 20 years of mechanical engineering experience under their belt. But where do we find our inspiration? Our calling? Well, our chief watchmaker receives inspiration from the natural world…</p>

                            <p>And within that world, its unfathomable precision. Each watch series we create represents this dedication to precision and balance. In an effort to become the Best Tool Watch in production…Our Brand - Eisbach - is redefining the relationship between sophistication and application. And we are doing that with our unique blend of natural inspiration.</p> 
                        </div>
                    </div>                    
                </div>                
                <div className="mb-5 position-relative">
                    <div className="sec-parallelX about-parallelX" style={{backgroundImage:'url(images/about-brand-bg.webp)'}}></div>
                    <div className="position-absolute center about-team">
                        <div className="h-100 d-flex align-items-center black-bg">
                            <div className="site-container">
                                <h4 className="sec-title-sm text-white mt-sm-4 mb-4 mt-lg-0 mb-lg-5 text-center"><span className="text-blue">Erich & Ancila Witzgall </span>- The visionaries behind our brand…</h4>
                                <div className="row mb-3">
                                    <div className="col-sm-8 m-auto m-lg-0 col-md-5 col-lg-5 align-self-center mb-3 order-2 order-md-1">
                                        <div className="mw-475 mw-sm-100 pe-md-4 text-center text-md-start">
                                            <h5 className="name">Erich</h5>
                                            <p className="designation">founder, Eisbach</p>
                                            <p className="text-white"><span className="fw-bold">Erich</span>, the thinker and tinkerer, is a German Mechanical Engineer with over 20 years of international experience. His German heritage is fascinatingly showcased in the extremely detailed mechanisms and individually tailored features included in Eisbach’s magnificently styled timepieces.</p>
                                        </div>                                        
                                    </div>
                                    <div className="col-sm-8 m-auto m-lg-0 col-md-5 col-lg-5 mb-3 order-1 order-md-2 ">
                                        <div className="mw-475 mw-xs-25 m-auto m-md-0"><img src="images/Erich.webp" title="Erich" alt="Erich" className="mw-100 contrast-img"/></div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-8 m-auto m-lg-0 col-md-5 col-lg-5 mb-3 ">
                                        <div className="mw-475 mw-xs-25 m-auto m-md-0"><img src="images/Ancila.webp" title="Ancila" alt="Ancila" className="mw-100 contrast-img" /></div>
                                    </div>
                                    <div className="col-sm-8 m-auto m-lg-0 col-md-5 col-lg-5 align-self-center mb-3">
                                        <div className="mw-475 mw-sm-100 pe-md-4 text-center text-md-start">
                                            <h5 className="name">Ancila</h5>
                                            <p className="designation">co founder, Eisbach</p>
                                            <p className="text-white"><span className="fw-bold">Ancila</span>, was born in Bahrain. Her exploration of the design world led her to build upon Erich’s stunning mechanisms and refine them…With a natural, stunning, and attractive aesthetic appearance.</p>
                                        </div>                                        
                                    </div>
                                </div>
                            </div>                     
                        </div>                        
                    </div>
                </div>                
                <div className="border-block-wrap xl ps-3 pe-3 ps-sm-5 pe-sm-5 ps-xxl-0 pe-xxl-0">
                    <div className="cover-image-wrap position-relative mb-0 mb-md-4 border_RBLT about-details-bg">                        
                        <div className="cover-image border_RBLT br-md-TR p-5 pb-0 w-100 clear-both" style={{backgroundImage:'url(images/where-details-bg.webp)', backgroundPosition:'center'}}></div>
                        <div className="position-absolute align-bottom w-100 h-100 d-flex align-items-end align-lg-items-center p-0 p-lg-5">                                                       
                            <div className="mw-28 pt-3 ps-3 pe-3 me-auto ms-lg-4">
                                <h4 className="sec-title-sm text-white mb-2 mb-lg-4"><span className="text-blue">Where Details </span>Are Everything</h4>
                                <p className="text-white">This translates into you receiving a final tool watch that rivals even the best of German watches…(And other elevated brands globally.) …And at a much more cost-effective price, might I add. And so, when you FINALLY receive your long-awaited, new powerful, balanced Eisbach watch…ou get a high-quality watch made in the German Measured Time style, with Swiss Movement that works with any outfit, occasion, or expedition.</p>
                                <p className="text-white">The Eisbach Logo is proudly engraved in the 316L stainless steel back cover. It is tightly sealed to protect the integrity of your new Dive Watch. The coordinates featured on the backside represent: Our foundations, Our birthplace , The inspiration behind our brand And our watches</p>
                            </div>                  
                        </div>
                    </div>
                </div>
                <div className="mt-5 mb-5 position-relative cover-image-wrap " >
                    <div className="about-features-bg cover-image" style={{backgroundImage:'url(images/steel-watch-back-bg.webp)'}}></div>
                    <div className="position-absolute md-static center-right w-45 w-md-100 ms-auto h-100">                        
                        <div className="mw-28 ms-100 mw-md-100 d-flex align-items-center h-100 black-bg p-4 pb-0 p-lg-0">
                            <div className="">
                                <h4 className="sec-title-sm text-white text-center text-sm-start"><span className="text-blue">The Eisbach Logo and Coordinates</span> are proudly engraved in the 316L stainless steel caseback.</h4>
                                <p className='text-white fw-bold text-center text-sm-start' >It is tightly sealed to protect the integrity of your new Dive Watch. The coordinates featured on the backside represent: </p>
                                <div className=" mt-3 list-style-watch xs-dial">
                                    <ul className='d-sm-flex flex-sm-wrap d-lg-block text-center text-lg-start'>
                                        <li className='w-xs-100 w-md-50 d-lg-flex'><p className='mb-2 text-center text-lg-start mb-sm-0 text-white'>Our foundations </p></li> 
                                        <li className='w-xs-100 w-md-50 d-lg-flex'><p className='mb-2 text-center text-lg-start mb-sm-0 text-white'>Our birthplace </p></li>
                                        <li className='w-xs-100 w-md-50 d-lg-flex'><p className='mb-2 text-center text-lg-start mb-sm-0 text-white'>The inspiration behind our brand </p></li>
                                        <li className='w-xs-100 w-md-50 d-lg-flex'><p className='mb-2 text-center text-lg-start mb-sm-0 text-white'>And our watches </p> </li>   
                                    </ul>
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>               
                <div className="site-container">
                    <div className="row pt-2 mt-5 mb-5">
                        <div className="col-xxl-6 col-xl-7 col-lg-7 m-auto m-lg-0 col-md-11 col-sm-12 order-2 order-sm-1">
                            <div className="row g-2 g-sm-3 pb-sm-4 pb-xl-0 about-images-block two-blocks ">
                                <div className="col-sm-6 pb-0 pb-lg-3 pb-xxl-5 h-100 mw-xs-50 mb-3 mb-sm-0">                           
                                    <div className="cover-image-wrap border_RBLT mb-0 mb-lg-4">
                                        <div className="h-100 cover-image border_RBLT fkm-img" style={{backgroundImage:'url(images/river.webp)'}}></div>
                                    </div>
                                </div>
                                <div className="col-sm-6 pt-0 pt-lg-3 pt-xxl-5 h-100 mw-xs-50 mb-sm-0">   
                                    <div className="cover-image-wrap border_RBLT mt-0 mt-lg-4">
                                        <div className="h-100 cover-image border_RBLT fkm-img" style={{backgroundImage:'url(images/trdron_e1_watch.webp)' }}></div>
                                    </div>
                                </div>    
                            </div>    
                        </div>
                        <div className="col-xxl-4 col-xl-4 offset-xl-1 col-lg-5 ps-3 ps-lg-4 ps-xxl-4 m-auto col-md-11 col-sm-12 align-self-center text-center text-lg-start order-1 order-sm-2">                          
                            <h4 className="sec-title-sm mb-3"><span className="text-blue">The Eisbach River: </span>So, simply put…</h4>                           
                            <p className="mb-4 mb-sm-2">We offer some of the best automatic DIVER watches out there. Eisbach pairs naturally in any environment…No matter your lifestyle. We have what you’re looking for: An adventure! Eisbach Watches are tastefully refined and always with you whenever you need them. Eisbach.</p>
                        </div>
                    </div>
                </div>
                <div className="mt-5 mt-md-3 position-relative cover-image-wrap" >
                    <div className="about-features-bg2 cover-image" style={{backgroundImage:'url(images/black-watch-back-bg.webp)'}}></div>
                    <div className="position-absolute md-static center-left w-45 w-md-100 h-100">                        
                        <div className="mw-475 mw-28 ms-200 ml-0 mw-md-100  d-flex align-items-center h-100 black-bg p-4 pb-0 p-lg-0">
                            <div className="">
                                <h4 className="sec-title-sm text-white text-center text-sm-start"><span className="text-blue">Each watch series</span>  we create represents this dedication to precision and balance.</h4>                               
                                <div className=" mt-3 list-style-watch xs-dial">
                                    <ul className='text-center text-sm-start'>
                                        <li>In an effort to become the Best Tool Watch in production…</li> 
                                        <li>Our Brand - Eisbach - is redefining the relationship between sophistication and application.</li>
                                        <li>And we are doing that with our unique blend of natural inspiration.</li>                                           
                                    </ul>
                                </div>
                            </div>    
                        </div>
                    </div>
                </div> 
            </section>            
        </>
    );
}  
export default About;