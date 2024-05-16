import React, { useState, useEffect, useRef, } from 'react';
import parse from 'html-react-parser';
import { Slide, } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Typewriter } from 'react-simple-typewriter';
import PageLoader from '../templates/pageLoader';
import AnimatedButton from '../templates/animatedButton';
import useOnScreen from '../../utils/useOnScreen';
import productService from '../../services/product.service';
import axios from 'axios';
const FeaturedProducts = React.lazy(() => import('../templates/featuredProducts'));
const AfterBeforeSlider = React.lazy(() => import('../templates/afterBeforeSlider'));
function Variants() {
    const dataBaseUrl = process.env.REACT_APP_BASE_API_URL;
    const [products, setProducts] = useState([])
    const [homePageData, setHomePageData] = useState({
        about: {
            about_title_first: null,
            about_title_last: null,
            about_subtile: null,
        },
        collection_section: {
            collections: [],
        },
        limited_edition: {
            limited_edition_title: null,
            limited_edition_subtitle: null,
            limited_edition_content: null,
        },
        trigalight: {
            trigalight_background_image: 'public/homepage-sections/trigalight_background_image/trigalight_bg.webp',
            trigalight_first_image: 'public/homepage-sections/trigalight_first_image/BSD_T25_blue_day.webp',
            trigalight_first_image_alt_text: null,
            trigalight_second_image: 'public/homepage-sections/trigalight_second_image/BSD_T25_blue_night.webp',
            trigalight_second_image_alt_text: null,
            trigalight_title_image: null,
            trigalight_title_image_alt_text: null,
            trigalight_button_link: null,
            trigalight_button_text: null,
            trigalight_content: null
        }
    })
    const productsData = async () => {
        try {
            const url = "featured-products";
            const response = await productService.getAllData(url);

            if (response.status === 200) {
                const data = response.data.data;
                setProducts(data);
            } else {
                console.error("API request failed with status:", response.status);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };
    React.useEffect(() => {
        productsData();
    }, []);
    React.useEffect(() => {
        const fields = ['about', 'collection_section', 'limited_edition', 'trigalight'].join(',');
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_URL_CUSTOM}custom-endpoints/homepage-data`, {
                    params: { fields },
                });
                setHomePageData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            <section>
                <Slide direction='up' duration="800" triggerOnce={true} className="rm-tab-animation">
                    <div className='site-container about-eisbach mt-4'>
                        <h1 className='heading-two-new text-black'>{homePageData.about.about_title_first}<span className='text-blue'> {homePageData.about.about_title_last}</span></h1>
                        <p className='sub-heading mw-1000'>{homePageData.about.about_subtile}</p>
                        <AnimatedButton link="/about" label="More About Brand" iconImage="/svg/right-arrow-blue.svg" iconAlt="arrow right blue" iconSize="17" iconClass='' btnclass="rounded-transparent-blue" wrapperClass='' />
                    </div>
                </Slide>
            </section>
            <section>
                <div className='row m-0 g-2 ps-3 pe-3 ps-lg-2 pe-lg-2 flex-lg-nowrap overflow-hidden'>
                    {homePageData.collection_section.collections.length > 0 && homePageData.collection_section.collections.map((collection, index) => {
                        const { label, title, link, image, alt_text } = collection;
                        return (
                            <div key={'collection' + index} className='col-sm-6 col-md-6 col-lg-3'>
                                <div className='collection-cat-warp position-relative'>
                                    <Link to={link} className='link'>
                                        <LazyLoadImage className='bg-img' src={dataBaseUrl + image} width="465" height="413" alt={alt_text} title={title} threshold={250} />
                                    </Link>
                                    <div className='view-collection position-absolute center-bottom '>
                                        <Link to={link} className='d-block sec-title-sm text-uppercase text-white mb-xl-3'>{title}</Link>
                                        <AnimatedButton link={link} label={label} iconImage="/svg/right-arrow-white.svg" hoverIcon="/svg/right-arrow-blue.svg" iconAlt="arrow right" iconSize="17" iconClass='' btnclass="rounded-white-blue" wrapperClass=''
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
            <section>
                <div className='site-container about-eisbach'>
                    <h2 className='heading-two-new text-black'><span className='text-blue'>{homePageData.limited_edition.limited_edition_title} </span> {homePageData.limited_edition.limited_edition_subtitle}</h2>
                    <p className='text-black sub-heading'>{homePageData.limited_edition.limited_edition_content}</p>
                </div>
                <div className='site-container'>
                    {products?.length > 0 ? (
                        <div className='mt-5'>
                            <React.Suspense fallback={<PageLoader />} >
                                <FeaturedProducts productsData={products} secClass="carousel-products-wrap" brXl={5} brSm={1} carouselProductClass={"home-product-wrap"} draggable={true} arrowOutside={true} showButton={false} isLmtd={true} isShowDots={true} />
                            </React.Suspense>
                        </div>
                    ) : ('')}
                </div>
            </section>
            <section className="trigalight-new" >
                <div className="triga-bg" style={{ backgroundImage: 'url(' + dataBaseUrl + homePageData.trigalight.trigalight_background_image + ')' }}>
                    <div className='site-container'>
                        <div className="row p-0 m-0" >
                            <div className="col-xxl-5  col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                <React.Suspense fallback={<PageLoader />} >
                                    <AfterBeforeSlider
                                        beforeImage={dataBaseUrl + homePageData.trigalight.trigalight_first_image}
                                        beforeImageAlt={homePageData.trigalight.trigalight_first_image_alt_text}
                                        afterImage={dataBaseUrl + homePageData.trigalight.trigalight_second_image}
                                        afterImageAlt={homePageData.trigalight.trigalight_second_image_alt_text}
                                    />
                                </React.Suspense>
                            </div>
                            <div className="col-xxl-7 col-xl-6 col-lg-6 col-md-12 col-sm-12 text-start align-self-center">
                                <div className="text-center text-lg-start d-inline-block mb-5 w-100">
                                    <LazyLoadImage className="triga-title-image" src={dataBaseUrl + homePageData.trigalight.trigalight_title_image} alt={homePageData.trigalight.trigalight_title_image_alt_text} title={homePageData.trigalight.trigalight_title_image_alt_text} width="670" height="328" threshold={200} />
                                </div>
                                <div className="mt-0 mt-lg-3 ms-auto me-auto ms-lg-0 triga-desc triga-desc-list">
                                    {homePageData.trigalight.trigalight_content && parse(homePageData.trigalight.trigalight_content)}
                                    <div className='d-flex align-items-center link text-blue fs-6 ps-lg-5 link '>
                                        <AnimatedButton link={homePageData.trigalight.trigalight_button_link} label={homePageData.trigalight.trigalight_button_text} iconImage="/svg/right-arrow-blue.svg" iconAlt="arrow right blue" iconSize="17" iconClass='' btnclass="rounded-blue-thin" wrapperClass='' />
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
function ExploreTidron() {
    const dataBaseUrl = process.env.REACT_APP_BASE_API_URL;
    const utSection = useRef();
    const onUtScreen = useOnScreen(utSection, '0px');
    const [utAnimation, startUtAnimation] = useState(false);
    const [homePageData, setHomePageData] = useState({
        UT_section: {
            ut_sec_image: 'public/homepage-sections/feat_col_sec_image/tidron-ut.webp',
            ut_sec_image_alt_text: null,
            ut_sec_btn_link: null,
            ut_sec_title_first: null,
            ut_sec_title_last: null,
            ut_sec_btn_label: null
        }
    })
    useEffect(() => {
        if (onUtScreen === true) {
            startUtAnimation(true);
        }
    }, [onUtScreen]);
    React.useEffect(() => {
        const fields = ['UT_section'].join(',');
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_URL_CUSTOM}custom-endpoints/homepage-data`, {
                    params: { fields },
                });
                setHomePageData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


    return (
        <section>
            <div className='site-container ut-collection '>
                <div className='row ms-0 me-0 gx-3 justify-centent-center'>
                    <div className='col-sm-9 col-md-7 col-lg-8 col-ut ms-auto me-auto ms-md-0 me-md-0'>
                        <div className="w-100 zoom-in br-sm-TR">
                            {Object.keys(homePageData).length > 0 ? (<img src={dataBaseUrl + homePageData.UT_section.ut_sec_image} alt={homePageData.UT_section.ut_sec_image_alt_text} className='w-100 h-auto' width="799" height="521" />) : ''}
                        </div>
                    </div>
                    <div className='col-sm-9 col-md-5 col-lg-4 col-ut border_TRBL br-sm-BL ms-auto me-auto ms-md-0 me-md-0'>
                        <div className='ps-md-4 ps-xl-5 d-flex align-items-center h-100 bg_gray border_TRBL br-sm-BL'>
                            <div className='pt-3 pb-4 p-md-0 w-100 text-center text-md-start' ref={utSection}>
                                {Object.keys(homePageData).length > 0 ? (<>
                                    <h2 className='heading-two-new text-black'>
                                        <Link className='link text-black' to={homePageData.UT_section.ut_sec_btn_link}>
                                            {homePageData.UT_section.ut_sec_title_first} <span className='d-lg-none'><br /></span>
                                            <span className='text-blue'>
                                                {utAnimation === true ? (<Typewriter
                                                    words={[homePageData.UT_section.ut_sec_title_last]}
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
                                    <AnimatedButton link={homePageData.UT_section.ut_sec_btn_link} label={homePageData.UT_section.ut_sec_btn_label} iconImage="/svg/right-arrow-black.svg" hoverIcon="/svg/right-arrow-blue.svg" iconAlt="arrow right" iconSize="17" iconClass='' btnclass="rounded-black-blue" wrapperClass='' />
                                </>) : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
const RestHome1 = () => {
    return (
        <>
            <Variants />
            <ExploreTidron />
        </>
    )
}
export default RestHome1;