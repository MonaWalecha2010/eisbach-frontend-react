import React from 'react';
import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import { Fade } from "react-awesome-reveal";
import AnimatedButton from '../templates/animatedButton';
import axios from 'axios';

const PopupModal = React.lazy(() => import('../templates/popupModal'));
const dataBaseUrl = process.env.REACT_APP_BASE_API_URL;

const Slider = ({ slidersData }) => {   
    const [activeIndex, setIndex] = React.useState(0);
    const handleSelect = (selectedIndex, e) => { setIndex(selectedIndex); };
    const [showCatVideo, setShowCatVideo] = React.useState(false);
    const [slidersDataUpdated, setSlidersData] = React.useState(slidersData);
    const [modalVideoContent, setModalVideoContent] = React.useState(null);
    const [catVideoModalId, setCatVideoModalId] = React.useState(null);
    const hideCatVideoModal = () => { setShowCatVideo(false); };
    const showCatVideoModal = (id) => {
        setModalVideoContent(null);             
        const modalData = slidersDataUpdated.filter((curElem) => { return curElem.id === id; });
        if (modalData) {
            console.log(modalData);
            var modalContent = `<video className='video' controls=${true} autoPlay playsInline muted loop ><source src=${dataBaseUrl + 'public/videos/' + modalData[0].video_link} type='video/mp4'/></video>`;
            var catModaliId = 'CategoryVideo' + modalData[0].id;
            setModalVideoContent(modalContent);
            setCatVideoModalId(catModaliId);
            setShowCatVideo(true);
        } else {
            return;
        }
    };
    React.useEffect(() => {
        const fieldsSlider = ['id', 'title_first', 'background_image', 'slider_watch_image', 'pretext', 'title_second', 'slider_watch_night_image', 'slider_watch_image_alt_text', 'slider_watch_night_image_alt_text', 'link', 'video_link'].join(',');
        const fetchDataSlider = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_URL_CUSTOM}custom-endpoints/homepage-slider`, {
                    params: { fieldsSlider },
                });                              
                setSlidersData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchDataSlider();
    }, []);
    return (
        <>
            <Carousel id="eisbachHomeSliderNew" className="carousel slide home-carousel-new desktop" indicators={true} pause={false} slide={true} controls={true} activeIndex={activeIndex} onSelect={handleSelect}>
                {slidersDataUpdated.map((x, index) => <Carousel.Item key={index + x.id} className={"carousel-item"} interval={5000} >
                    <div className={"carousel-slide carousel-slide-" + index} style={{ backgroundImage: 'url(' + process.env.REACT_APP_URL_CUSTOM + x.background_image + ')' }}>
                        <div className="site-container">
                            <div className={"sm-content d-flex align-items-end  m-0 p-0 h-100 flex-box-" + index}>
                                <div className={"d-none d-lg-block slide-desc align-self-center slide-desc-" + index}>
                                    <div>
                                        <Fade delay="100" duration="2000" triggerOnce={true}>
                                            <Link to={"/watches/collection/" + x.link}>
                                                <span className="subtitle">{x.pretext}</span>
                                                <div className="title-text mt-lg-2 text--perspective mb-4">
                                                    <span>{x.title_first} </span>
                                                    <span className="text-blue">{x.title_second}</span>
                                                </div>
                                            </Link>
                                            <div className="slider-links">
                                                {x.link ? (
                                                    <AnimatedButton link={`/watches/collection/${x.link}`} label="Explore Collection" iconImage="/svg/right-arrow-black.svg" hoverIcon="/svg/right-arrow-white.svg" iconAlt="arrow right" iconClass='' btnclass="rounded-white" wrapperClass=''
                                                    />
                                                ) : ('')}
                                                {x.video_link ? (
                                                    <div className='animated-btn-warp'>
                                                        <button type='button' className='btn rounded-transparent' onClick={() => showCatVideoModal(x.id)} >
                                                            <span className='d-flex align-items-center justify-content-center text'>Watch Video <img src="/svg/play_white.svg" className={`ms-2 icon play`} alt="play" width="14" />
                                                            </span>
                                                            <span className='line-1'></span>
                                                            <span className='line-2'></span>
                                                            <span className='line-3'></span>
                                                            <span className='line-4'></span>
                                                        </button>
                                                    </div>
                                                ) : ('')}
                                            </div>
                                        </Fade>
                                    </div>
                                </div>
                                <div className={x.slider_watch_night_image !== null ? 'multi-img-mode d-none d-md-block watch-img watch-img-' + index : 'd-none d-md-block watch-img watch-img-' + index}>
                                    <Fade delay="180" duration="2000" triggerOnce={true} className={x.slider_watch_night_image !== null ? 'watch-img-wrap multi-img-wrap' : 'watch-img-wrap'}>
                                        <img src={process.env.REACT_APP_URL_CUSTOM + x.slider_watch_image} alt={x.slider_watch_image_alt_text} title={x.title_second} />
                                        {x.slider_watch_night_image !== null ? (<img src={process.env.REACT_APP_URL_CUSTOM + x.slider_watch_night_image} alt={x.slider_watch_night_image_alt_text} title={x.title_second} />) : ''}
                                    </Fade>
                                </div>
                                <div className={x.slider_watch_night_image !== null ? 'multi-img-mode d-block d-md-none watch-img watch-img-' + index : 'd-block d-md-none watch-img watch-img-' + index}>
                                    <Fade delay="50" duration="2000" triggerOnce={true} className={x.slider_watch_night_image !== null ? 'watch-img-wrap multi-img-wrap' : 'watch-img-wrap'}>
                                        <img src={process.env.REACT_APP_URL_CUSTOM + x.slider_watch_image} alt={x.slider_watch_image_alt_text} title={x.title_second} />
                                        {x.slider_watch_night_image !== null ? (<img src={process.env.REACT_APP_URL_CUSTOM + x.slider_watch_night_image} alt={x.slider_watch_night_image_alt_text} title={x.title_second} />) : ''}
                                    </Fade>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"d-block d-lg-none dark-bg slide-desc align-self-center slide-desc-" + index} >
                        <div>
                            <Fade delay="100" duration="2000" triggerOnce={true}>
                                <Link to={"/watches/collection/" + x.link}>
                                    <span className="subtitle">{x.pretext}</span>
                                    <div className="title-text mt-lg-2 text--perspective mb-2">
                                        <span>{x.title_first} </span>
                                        <span className="text-blue">{x.title_second}</span>
                                    </div>
                                </Link>
                                <div className="slider-links">
                                    {x.link && (
                                        <AnimatedButton link={`/watches/collection/${x.link}`} label="Explore Collection" iconImage="/svg/right-arrow-black.svg" hoverIcon="/svg/right-arrow-white.svg" iconAlt="arrow right" iconClass='' btnclass="rounded-white" wrapperClass='' />
                                    )}
                                    {x.video_link && (
                                        <div className='animated-btn-warp'>
                                            <button type='button' className='btn rounded-transparent' onClick={() => showCatVideoModal(x.id)} >
                                                <span className='d-flex align-items-center justify-content-center text'>Watch Video <img src="/svg/play_white.svg" className={`ms-2 icon play`} alt="play" width="14" /></span>
                                                <span className='line-1'></span>
                                                <span className='line-2'></span>
                                                <span className='line-3'></span>
                                                <span className='line-4'></span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </Fade>
                        </div>
                    </div>
                </Carousel.Item>
                )}
            </Carousel>
            <React.Suspense fallback={<div></div>} >
                {showCatVideo === true && catVideoModalId !== null && modalVideoContent !== null &&
                    <PopupModal
                        modalId={catVideoModalId}
                        show={showCatVideo}
                        title=''
                        showHeader={false}
                        content={modalVideoContent ? modalVideoContent : ''}
                        showFooter={false}
                        closeModal={hideCatVideoModal}
                        classes={'modal-full-width'}
                    />
                }
            </React.Suspense>
        </>
    )
}

export default Slider