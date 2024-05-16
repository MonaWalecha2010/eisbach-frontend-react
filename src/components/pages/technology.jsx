import React, { useRef } from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import ImageBanner from '../templates/imageBanner';
import PageLoader from '../templates/pageLoader';
const CompanyVideo = React.lazy(() => import('../templates/companyVideo'));
const Technology = () => {
    const bezelVideo = useRef(null);
    const websiteVideoeUrl = process.env.REACT_APP_VIDEO_URL;
    const dataBaseUrl = process.env.REACT_APP_BASE_API_URL;
    const baseVideoeUrl = dataBaseUrl + 'public/videos/';
    return (
        <>
            <HelmetProvider> <Helmet>
                <title className="pege-meta-title">Eisbach Watches Technology</title>
                <link rel="canonical" href={process.env.REACT_APP_URL_CUSTOM + "technology"} />
                <link rel="alternate" hreflang="x-default" href={process.env.REACT_APP_URL + "technology"} />
                <meta name="description" content="Discover the cutting-edge technology behind Eisbach Watches. Our watches feature Tritium and Super-LumiNova for unmatched illumination and precision" />
                <meta name="keywords" content="Eisbach, Water, Weekday, Crown, 360GM-T, DLC, Trigalight, Super-LumiNova, Tritium, Illumination, Crystal, Bezel"  ></meta>
                <meta property="og:title" content="Eisbach Watches Technology" />
                <meta property="og:type" content="website" />
                <meta property="og:description" content="Discover the cutting-edge technology behind Eisbach Watches. Our watches feature Tritium and Super-LumiNova for unmatched illumination and precision" />
                <meta property="og:url" content={process.env.REACT_APP_URL_CUSTOM + "technology"} />
                <meta property="og:image" content="https://www.eisbachwatches.com/images/logo/eisbach-watches.png"></meta>
            </Helmet></HelmetProvider>
            <ImageBanner poster={'images/technology.webp'} title_first="Tech" title_second="nology" title="Technology" subTitle="About Eisbach Technology" bgPosition="33% center" />
            <section className="mt-lg-4">
                <div className="site-container technology">
                    <div className="mw-xs-275 ms-auto me-auto text-center mb-5">
                        <img src="images/trigalight_2019_POS.webp" alt="trigalight" title="trigalight" className="mw-100" />
                    </div>
                    <div>
                        <h4 className="sec-title-sm text-center text-sm-start">Eisbach Watch <span className="text-blue">Illumination</span></h4>
                        <div className=" mt-3 list-style-watch dark-watch text-center text-sm-start">
                            <ul>
                                <li>Eisbach makes use of Tritium and Super-LumiNova. It's the perfect illumination for our watches. You see, the mainly blue illumination…(Especially on our diver watches) …It remains visible to a greater depth underwater than green or other colours.
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row border-block-wrap border-md">
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 border-block border-md-none">
                            <div className="inner-list">
                                <h4 className="sec-title-sm text-center text-sm-start">Tritium H3 <span className="text-blue">Permanent Illumination</span></h4>
                                <div className=" mt-3 triga-desc-list fw-base">
                                    <ul>
                                        <li>The ability to tell the time with ease in the dark is why our Tidron T Models are fitted with Tritium illumination…Which is widely regarded as the world’s best permanent and most reliable form of illumination.</li>
                                        <li>Eisbach Tidron T watches are equipped with blue illumination - desirable in a diver’s watch. So this blue light remains visible to a greater depth underwater than green. Tritium illumination is a completely safe and reliable form of illumination.</li>
                                        <li>Let me explain: The electron emitted by Tritium is so low in energy that it cannot penetrate human skin. The Tritium illumination used in ALL Eisbach watches is supplied by the Swiss company “trigalight - mb-microtec."</li>
                                        <li>These are the original founders and market leaders of Tritium Illumination Technology. Tritium illumination will provide a constant glow throughout the night.Unlike traditional illumination such as Super-LumiNova - which requires light to charge and will fade in a few hours.</li>
                                    </ul>
                                </div>
                                <div className="text-center bottom-text">
                                    <p className="large-text">T25 vs. T100</p>
                                    <p className="mb-0">Eisbach offers both T25 and T100-rated Tritium watches. The “T” rating refers to the total watch radiation content (measured in millicuries).</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-8 p-0 ps-xl-4 border-TB m-auto m-lg-start mt-3 mt-lg-0">
                            <div className="cover-image-wrap border_RB br-md-TRBL br-xs-BL">
                                <div className="cover-image border_RB br-md-TRBL br-xs-BL tritium-bg" style={{ backgroundImage: 'url(images/tritium_h3.webp)' }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="cover-image-wrap position-relative mb-5 border_RBLT border-md-none dark-bg">
                        <div className="cover-image border_RBLT border-md-none p-5 pb-0 w-100 clear-both sl-Illumination-bg " style={{ backgroundImage: 'url(images/S-L-Illumination.webp)' }}></div>
                        <div className="p-0 p-lg-5 pb-0 h-100 w-100 position-absolute md-static p-0 p-lg-4">
                            <div className="sl-Illumination mw-md-100 p-4 pb-0 p-lg-0">
                                <h4 className="sec-title-sm text-white text-center text-sm-start">Super-LumiNova <span className="text-blue">Illumination</span></h4>
                                <div className=" mt-3 list-style-watch small-dial text-center text-sm-start">
                                    <ul>
                                        <li>Most high-quality watch brands - including Eisbach Watches - employ Super-LumiNova in their watch cases. Besides serving an important practical function - illumination…Super-LumiNova also allows for an artistic edge to every watch.
                                        </li>
                                        <li>A part of the Swiss watch industry market since 1998, quickly replacing its predecessor relatively overnight…Super-LumiNova is a superior element to infuse in any watch. Containing no radioactive material, Super-LumiNova must be charged to emit light.</li>
                                        <li>The portion of your watch that is overlaid using Super-Luminova will begin to glow in the dark. Super-LumiNova can be charged multiple times without limit. Super-LumiNova’s bright and long-lasting light depends on the amount of light exposure the watch is able to absorb, and recharge. This is what makes your dive watch, the best dive watch available.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="text-center bottom-text pt-0 pt-lg-4">
                                <p className="large-text text-white">Super-LumiNova Is Available In Various Colors</p>
                                <p className="text-white">Ranging in intensity between white, yellow, green, red and blue.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-7 col-lg-7 col-md-6 col-sm-12 dlc-height">
                            <div className="cover-image border_TL bg-white " style={{ backgroundImage: 'url(images/GDLC-Coating.webp)', backgroundPosition: 'right' }}></div>
                        </div>
                        <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12 align-self-center">
                            <div className="mw-40">
                                <h4 className="sec-title-sm text-center text-sm-start"><span className="text-blue">DLC Coating for </span>Eisbach Watches</h4>
                                <div className=" mt-3 list-style-watch dark-watch text-center text-sm-start">
                                    <ul className="mb-0">
                                        <li>Strong, Durable, Scratch Resistant German-engineered Diver Watch. Our DLC coating (Diamond-Like Carbon) is an advanced thin-film coating method. Exploiting the inherent strengths of this method…</li>
                                        <li>We can produce thin films that combine the distinctive properties of two carbon allotropes: Diamond and Graphite. DLC coatings significantly improve hardness…</li>
                                        <li>Well, with achieving up to 3000 Vickers, of course…which is substantially higher than any other coating method.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row border-block-wrap small ms-0 me-0 ms-md-auto me-md-auto border-md">
                        <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 border-block border-md-none p-0">
                            <div className="inner-list">
                                <h4 className="sec-title-sm text-center text-sm-start">Water <span className="text-blue">Resistance</span></h4>
                                <div className=" mt-3 list-style-watch dark-watch pe-md-5 text-center text-sm-start">
                                    <ul>
                                        <li>You'd be ecstatic to know that you can go swimming, snorkeling or diving with your Eisbach watch without fear of water damage.</li>
                                        <li>Our TIDRON E1 MODELS are waterproof up to 30 ATM, 1000ft/300m depth AND THE TIDRON UT 360GM-T Models up to 50 ATM, 1650ft/500m depth.</li>
                                        <li>The water depths always concern the maximum guaranteed static compressive stress test that the Eisbach Watch casing can withstand.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-5 col-md-5 col-sm-6 ms-auto me-auto p-0">
                            <div className="cover-image-wrap border_RB br-md-TRBL br-xs-BL">
                                <div className="h-100 cover-image border_RB br-md-TR br-xs-BL" style={{ backgroundImage: 'url(images/water-resistence.webp)', backgroundPosition: 'bottom, center', minHeight: '430px' }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-4">
                        <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 full-width-lg">
                            <div className="cover-image-wrap h-auto position-relative centerlized border_RBLT dark-bg">
                                <div className="h-100 cover-image border_RBLT br-md-TR crystal-bg" style={{ backgroundImage: 'url(images/Crystal_orange.webp)' }}></div>
                                <div className="inner-list crystal-glass position-absolute sm-static">
                                    <h4 className="sec-title-sm text-white text-center text-sm-start">Sapphire <span className="text-blue">Crystal Glass</span></h4>
                                    <div className=" mt-3 list-style-watch small-dial mw-47 mw-sm-100 text-center text-sm-start">
                                        <ul className="mb-0">
                                            <li>To ensure maximum clarity, only anti-reflective sapphire crystal glass is used to construct Eisbach Watches. Boasting up to 2,000 HV (hardness as per Vickers testing)...</li>
                                            <li>Sapphire crystal is the hardest usable crystal material, far surpassing all other alternatives in terms of scratch protection and shock resistance.</li>
                                            <li>Making it perfect to use in the best dive watch possible. An anti-reflective coating is applied on both sides of the glass.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 full-width-lg">
                            <div className="cover-image-wrap h-auto centerlized position-relative border_RBLT dark-bg">
                                <div className="h-100 cover-image border_RBLT br-md-TR crystal-bg" style={{ backgroundImage: 'url(images/Date_weekday.webp)' }}></div>
                                <div className="h-100 d-flex align-items-end position-absolute left-bottom sm-static">
                                    <div className="br-0 border_BL p-4 pb-0 pt-3 ps-xl-5 pe-xl-5">
                                        <h4 className="sec-title-sm text-white text-center text-sm-start">Date And <span className="text-blue">Weekday</span></h4>
                                        <p className="text-white text-center text-sm-start">The date window is in a special position at 4 o’clock on all Eisbach Tidron models. Why? Well, it improves readability. In order to afford the eye some relief while focusing, we have deliberately avoided intrusive printing in the vicinity of this area.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row border-block-wrap border-md pb-0">
                        <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 border-block border-md-none p-0">
                            <div className="inner-list">
                                <h4 className="sec-title-sm text-center text-sm-start">Rotation <span className="text-blue">Bezel</span></h4>
                                <div className=" mt-3 list-style-watch dark-watch pe-md-3 text-center text-sm-start">
                                    <ul className="mb-0">
                                        <li>Our Tidron Models have a unique diver ring installed within. (Made from highly resilient and sea-water-resistant Stainless Steel)...</li>
                                        <li>A high wear-resistant Ceramic Inlet is fitted in our E1 and all UT models. The powerful Super-Luminova illumination guarantees high readability in all underwater conditions.</li>
                                        <li>The elapsed diving time can be easily read at a glance on the watch face and bezel. The unidirectional aspect for Diver watches and bidirectional for GMT Watches with 120 clicks of the ring ensures precision during the crucial decompression phases. An absolute must, for a professional dive watch. </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 p-0">
                            <video ref={bezelVideo} className='video border_RB br-sm-BL' poster="images/rotation-bazel-poster.webp" controls={false} autoPlay playsInline muted loop
                                style={{ height: '100%', width: "100%", objectFit: 'cover' }}>
                                <source src={websiteVideoeUrl + "/videos/TIDRON_UT_360GM-T_MC_ROTATING_BEZEL.mp4"} type='video/mp4' />
                            </video>
                        </div>
                    </div>
                    <div className="cover-image-wrap position-relative border_RBLT br-md-TR mb-3 dark-bg">
                        <div className="h-100 cover-image border_RBLT br-md-TR crown-bg" style={{ backgroundImage: 'url(images/crown_bg.webp)' }}></div>
                        <div className="d-flex align-items-center position-absolute md-static w-100 h-100">
                            <div className="crown-text">
                                <h4 className="sec-title-sm text-white">Eisbach <span className="text-blue">Crown</span></h4>
                                <p className="text-white">Our specially constructed Eisbach Crown is designed to be: Low maintenance. Freedom from mechanical wear.Functionally reliable throughout the entire life of the watch. It is DLC Coated - screwed down and sealed for maximum protection, accompanied by our company logo. The Eisbach Tidron Crown is situated at 4 o'clock to prevent pressure on the back of the diver's hand.</p>
                            </div>
                        </div>
                    </div>
                    <div className="clear-both mb-5">
                        <div className="container-video">
                            <React.Suspense fallback={<PageLoader />} >
                                <CompanyVideo srcUrl={websiteVideoeUrl + "/videos/TIDRON-UT-360GM-T_MC_OPEN_BACKSIDE2.mp4"} poster="/images/technlogy_poster_image.webp" />
                            </React.Suspense>
                        </div>
                        <div>
                            <h4 className="sec-title-sm text-center text-sm-start">Swiss-Made <span className="text-blue">Automatic Movement</span></h4>
                            <div className="text-center text-sm-start">
                                <p>Beneath the dial of every Eisbach Watch runs a high-quality precise Swiss Made automatic winding caliber. Complete with 38-hour power reserve, 26 Jewels, hacking second, 28800A/h and a ball-bearing rotor with high elevator efficiency or a GMT Movement 42-hour Power Reserve, 25 Jewels, sweeping second, 28800A/h, ball-bearing rotor with high elevator efficiency Our standard means: You can enjoy your outdoor lifestyle, full of adventure and confident in the uncertainty due to the quality and durability designed and built into each of our watches. The movement is protected…So you can react to your environment knowing that our anti-shock device keeps the integrity of your watch intact.</p>
                                <p>The transparent case back in our black Tidron limited editions provides a lens through which you can view the automatic movement at work. We have opted to utilize 316L Stainless steel alongside depends on the model you chose the DLC surface coating for all components. And when in combination with the beat blasted Surface Treatment, it ensures a long lifespan and wear resistance for our Eisbach Watches. </p>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3 mb-lg-3">
                        <div className="col-lg-7 col-md-10 col-sm-12 m-md-auto m-lg-0">
                            <div className="cover-image-wrap border_RBLT fkm-img-wrap">
                                <div className="h-100 cover-image border_RBLT fkm-img" style={{ backgroundImage: 'url(images/rubber_bg.webp)', backgroundPosition: "70% center" }}></div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-12 col-sm-12 m-md-auto m-lg-0 align-self-center align-self-lg-start">
                            <div className="fkm-content">
                                <h4 className="sec-title-sm mb-3 text-center text-sm-start">FKM Rubber <span className="text-blue">Watch Strap</span></h4>
                                <p className="text-center text-sm-start">At Eisbach, we take our commitment to high-quality design all the way to your watch straps. That includes premium FKM rubber!  This is the most expensive rubber material available because it is the best on the market. Just look at how our tool watch rubber straps compare to:</p>
                                <div className="accordion accordion-flush mt-4 custom-accordion" id="FKMRubber">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#naturalRubber" aria-expanded="true" aria-controls="collapseOne">NATURAL RUBBER </button>
                                        </h2>
                                        <div id="naturalRubber" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#FKMRubber">
                                            <div className="accordion-body">
                                                <p>While the ecological benefits are certainly there, this material does not meet the precision design and Quality of our mechanical needs and can be allergenic to some clients.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingTwo">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#siliconRubber" aria-expanded="false" aria-controls="collapseTwo">SILICONE (SI) RUBBER</button>
                                        </h2>
                                        <div id="siliconRubber" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#FKMRubber">
                                            <div className="accordion-body">
                                                <p>WThis is not a good material to match our best diving watches because it can deteriorate in only a few short months, making it a below-average solution to meet the Quality demands of our watch collection.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingThree">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#NBR" aria-expanded="false" aria-controls="freeReturns">NITRILE BUTADIENE RUBBER (NBR)</button>
                                        </h2>
                                        <div id="NBR" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#FKMRubber">
                                            <div className="accordion-body">
                                                <p>True, this oil-resistant rubber is made from good quality material and offers a longer use case than others, but it is only available in black.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingFour">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#EPDM" aria-expanded="false" aria-controls="freeReturns">ETHYLENE PROPYLENE RUBBER (EPDM)</button>
                                        </h2>
                                        <div id="EPDM" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#FKMRubber">
                                            <div className="accordion-body">
                                                <p>Reasonably good quality with a longer lifespan offers repeated outdoor exposure benefits. This rubber is available in many colors but does not match our FKM rubber Quality.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingFive">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FKM" aria-expanded="false" aria-controls="freeReturns">FLUOROCARBON RUBBER (FKM)</button>
                                        </h2>
                                        <div id="FKM" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#FKMRubber">
                                            <div className="accordion-body">
                                                <p>Welcome to the luxury watch strap that offers the design, functionality, and reliability needed for our high-quality German-engineered watches. You get the longevity and durability for enjoying outdoor activities with the smooth integration into our stainless buckle and engraved Eisbach logo for a beautiful finish. Truly, this is the must-have option!</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default Technology;