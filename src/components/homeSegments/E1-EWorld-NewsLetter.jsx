import React, { useState, useEffect, useRef, } from 'react';
import { Zoom } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Typewriter } from 'react-simple-typewriter';
import Modal from 'react-bootstrap/Modal';

import ParallelXSection from "../templates/parallelXSection";
import AnimatedButton from '../templates/animatedButton';
import useOnScreen from '../../utils/useOnScreen';
import PageLoader from '../templates/pageLoader';
import axios from 'axios';

const NewsletterForm = React.lazy(() => import('../forms/newsletterForm'));
const CompanyVideo = React.lazy(() => import('../templates/companyVideo'));
const gallaryUrl = process.env.REACT_APP_GALLARY_URL;
const websiteVideoeUrl = process.env.REACT_APP_VIDEO_URL;
function E1Section() {
    const dataBaseUrl = process.env.REACT_APP_BASE_API_URL;
    const e1Section = useRef();
    const onE1Screen = useOnScreen(e1Section, '0px');
    const [E1Animation, startE1Animation] = useState(false);
    const [homeData, setHomeData] = React.useState({
        E1_section: {
            e1_sec_btn_link: null,
            e1_sec_title_first: null,
            e1_sec_title_last: null,
            e1_sec_image: 'public/homepage-sections/feat_col_first_image/tirdron-e1-collection.webp',
            e1_sec_btn_label: null,
        }
    });
    useEffect(() => {
        if (onE1Screen === true) {
            startE1Animation(true);
        }
    }, [onE1Screen]);
    React.useEffect(() => {
        const fields = ['E1_section'].join(',');
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_URL_CUSTOM}custom-endpoints/homepage-data`, {
                    params: { fields },
                });
                setHomeData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <section>
            <div className='site-container e1-collection cover-image-wrap position-relative border_TRBL br-sm-TR ps-xl-0 pe-xl-0'>
                {Object.keys(homeData).length > 0 && <div className='p-5 border_TRBL br-sm-TR e1-collection-bg cover-image' style={{ backgroundImage: 'url(' + dataBaseUrl + homeData.E1_section.e1_sec_image + ')' }}></div>}
                <div className='mw-475 position-absolute e1-collection-text br-sm-BL sm-static' ref={e1Section} >
                    {Object.keys(homeData).length > 0 && <>
                        <h2 className='heading-two-new text-white'>
                            <Link to={homeData.E1_section.e1_sec_btn_link} className='text-white'>
                                {homeData.E1_section.e1_sec_title_first} <span className='d-xl-none'><br /></span>
                                <span className='text-blue'>
                                    {E1Animation === true ? (<Typewriter
                                        words={[homeData.E1_section.e1_sec_title_last]}
                                        loop={1}
                                        cursor
                                        cursorStyle='.'
                                        typeSpeed={150}
                                        deleteSpeed={100}
                                        delaySpeed={1000}
                                    />) : ''}
                                </span>
                            </Link>
                        </h2>
                        <AnimatedButton link={homeData.E1_section.e1_sec_btn_link} label={homeData.E1_section.e1_sec_btn_label} iconImage="/svg/right-arrow-blue.svg" iconAlt="arrow right" iconSize="17" iconClass='' btnclass="rounded-blue-thin" wrapperClass='' />
                    </>}
                </div>
            </div>
        </section>
    );
}
function EisbachWorld() {
    const dataBaseUrl = process.env.REACT_APP_BASE_API_URL;
    const [homeData, setHomeData] = React.useState({
        watch_section: {
            watch_sec_image: 'public/homepage-sections/watch_sec_image/mountain-view.webp',
            watch_sec_title: null,
            watch_sec_btn_link: null,
            watch_sec_btn_label: null,
            watch_sec_content: null,
        },
        strap: {
            strap_sec_image: 'public/homepage-sections/strap_sec_image/straps-bg.webp',
            strap_sec_sub_title: null,
            strap_sec_btn_link: null,
            strap_sec_title_first: null,
            strap_sec_title_middle: null,
            strap_sec_btn_label: null,
            strap_sec_title_last: null,
        },
        parallax: null
    });
    React.useEffect(() => {
        const fields = ['watch_section', 'strap', 'parallax'].join(',');
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_URL_CUSTOM}custom-endpoints/homepage-data`, {
                    params: { fields },
                });
                setHomeData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        Object.keys(homeData).length > 0 && (<>
            <section>
                <div className='position-relative all-collection'>
                    <div className='all-collection-bg' style={{ backgroundImage: 'url(' + dataBaseUrl + homeData.watch_section.watch_sec_image + ')' }}></div>
                    <div className='site-container position-absolute center d-flex align-items-center sm-static'>
                        <div className='all-collection-text black-bg text-center text-md-start'>
                            <h2 className='heading-two-new text-white' style={{ maxWidth: '34.375rem' }}>
                                <Link className='link text-white' to={homeData.watch_section.watch_sec_btn_link}>{homeData.watch_section.watch_sec_title}</Link>
                            </h2>
                            <p className='text-white text-lg fw-300'>{homeData.watch_section.watch_sec_content}</p>
                            <AnimatedButton link={homeData.watch_section.watch_sec_btn_link} label={homeData.watch_section.watch_sec_btn_label} iconImage="/svg/right-arrow-white.svg" iconAlt="arrow right" iconSize="17" iconClass='' btnclass="rounded-transparent" wrapperClass='' />

                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className='site-container'>
                    <div className='cover-image-wrap position-relative border_TRBL br-sm-TR '>
                        <div className='straps-bg-new border_TRBL br-sm-TR' style={{ backgroundImage: 'url(' + dataBaseUrl + homeData.strap.strap_sec_image + ')' }}></div>
                        <div className='h-100 position-absolute d-flex center-left straps-content align-items-center sm-static' >
                            <Zoom delay="10" className='d-none d-md-block' triggerOnce={true}>
                                <div className='mw-475 pb-3'>
                                    <p className='title text-white mb-0'>{homeData.strap.strap_sec_sub_title}</p>
                                    <h2 className='heading-two-new text-blue'>
                                        <Link className='link text-blue' to={homeData.strap.strap_sec_btn_link}>{homeData.strap.strap_sec_title_first} <span className='text-white'>{homeData.strap.strap_sec_title_middle}</span> {homeData.strap.strap_sec_title_last}</Link>
                                    </h2>
                                    <AnimatedButton link={homeData.strap.strap_sec_btn_link} label={homeData.strap.strap_sec_btn_label} iconImage="/svg/right-arrow-blue.svg" iconAlt="arrow right" iconSize="17" iconClass='' btnclass="rounded-blue-thin" wrapperClass='' />
                                </div>
                            </Zoom>
                            <div className='d-block d-md-none mw-475 black-bg text-center text-md-start mw-sm-100 w-100 br-sm-BL pt-3 pb-4'>
                                <p className='title text-white mb-0'>{homeData.strap.strap_sec_sub_title}</p>
                                <h2 className='heading-two-new text-blue mb-0'>{homeData.strap.strap_sec_title_first} <span className='text-white'>{homeData.strap.strap_sec_title_middle}</span> {homeData.strap.strap_sec_title_last} </h2>
                                <AnimatedButton link={homeData.strap.strap_sec_btn_link} label={homeData.strap.strap_sec_btn_label} iconImage="/svg/right-arrow-blue.svg" iconAlt="arrow right" iconSize="17" iconClass='' btnclass="rounded-blue-thin" wrapperClass='mt-3' />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {homeData.parallax && <ParallelXSection parallelXData={homeData.parallax} />}
        </>)
    )
}
function Newsletter() {
    const websiteVideoeUrl = process.env.REACT_APP_VIDEO_URL;
    const [showNewsletter, setShowNewsletter] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 600 && (localStorage.getItem("showNewsletter") === "true" || localStorage.getItem("showNewsletter") === null)) {
                setTimeout(() => setShowNewsletter(true), 500);
            }
        });
    }, []);
    function closeNewsletter() {
        setShowNewsletter(false);
        localStorage.setItem('showNewsletter', false);
    };
    return (
        showNewsletter === true ? (
            <Modal
                id="NewsletterModal"
                show={showNewsletter}
                onHide={closeNewsletter}
                className="modal-full-width custom-modal"
                backdrop={true}
                backdropClassName=""
            >
                <Modal.Header closeButton className='p-0 border-0'> </Modal.Header>
                <Modal.Body>
                    <div className="newsletter-content-wrap">
                        <div className="bg-img">
                            <div className="h-100 overflow-hidden video-clip-wrap">
                                <video className='video' poster="/images/home-slider-video-poster-black-watch.webp" controls={false} autoPlay playsInline muted loop
                                    style={{ height: '100%', width: "100%", maxHeight: '100%', objectFit: 'cover' }}>
                                    <source src={websiteVideoeUrl + "/videos/FIDFront.mp4"} type='video/mp4' />
                                </video>
                            </div>
                        </div>
                        <div className="dark-gray-bg">
                            <a className="logo-img" href="/" >
                                <LazyLoadImage id="eisbach-newsletter-logo" src="/images/logo/Eisbatch_logo_white_sm.svg" alt="Eisbach Watches" title="Eisbach Watches Newsletter" threshold={200} />
                            </a>
                            <div className="newsletter-content">
                                <div className="title"><span className="text-white">German Engineered - Swiss Made Precision For </span><span className="text-blue">Time Instruments</span></div>
                                <div className="subtitle text-white">SignUp for our newsletter and get 10% discount on your first purchase.</div>
                                <div className="mt-3 mt-md-3">
                                    <React.Suspense fallback={<PageLoader />} >
                                        <NewsletterForm isModal={true} click={closeNewsletter} />
                                    </React.Suspense>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        ) : ''
    )
}
const RestHome2 = () => {
    return (<>
        <CompanyVideo srcUrl={websiteVideoeUrl + "/videos/Eisbach_company_video_newhome1.mp4"} poster={`${gallaryUrl}/images/company-video-poster.webp`} showControls={true} srcType="mp4" vidClass="company-video" />
        <E1Section />
        <EisbachWorld />
        <React.Suspense fallback={<PageLoader />} >
            <Newsletter />
        </React.Suspense>
    </>);
}
export default RestHome2