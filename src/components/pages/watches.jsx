import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import PageLoader from '../templates/pageLoader';
import VideoBanner from '../templates/videoBanner';
import AnimatedButton from '../templates/animatedButton';
import ProductService from '../../services/product.service';
const FeaturedProducts = React.lazy(() => import('../templates/featuredProducts'));
const Watches = () => {
    const dataBaseUrl = process.env.REACT_APP_BASE_API_URL;
    const baseVideoeUrl = dataBaseUrl + 'public/videos/';
    const websiteVideoeUrl = process.env.REACT_APP_VIDEO_URL;
    const [watchesData, setWatchesData] = useState({});
    const fetchWatchesData = async () => {
        const url = "watches-page";
        let response = await ProductService.getAllData(url);
        if (response.status === 200) {
            setWatchesData(response.data.data);
        }
    }
    useEffect(() => {
        fetchWatchesData();
    }, []);
    const breadcrumbsData = [
        {
            name: 'Home',
            link: '/'
        }
    ];
    return (
        <>
            <HelmetProvider> <Helmet>
                <title>Eisbach Watches</title>
                <meta name="description" content="Experience unbeatable style and functionality with Eisbach,Swiss made automatic Watches Women's and Men's GMT collections - precision and design at their finest" />
                <meta name="keywords" content="TIDRON, UT, 360GM-T, TIDRON E1, Women's, men's, services, straps, collections"  ></meta>
                <link rel="canonical" href={process.env.REACT_APP_URL_CUSTOM + "watches"} />
                <link rel="alternate" hreflang="x-default" href={process.env.REACT_APP_URL + "watches"} />
                <meta property="og:title" content="Eisbach Watches" />
                <meta property="og:type" content="website" />
                <meta property="og:description" content="Experience unbeatable style and functionality with Eisbach,Swiss made automatic Watches Women's and Men's GMT collections - precision and design at their finest" />
                <meta property="og:url" content={process.env.REACT_APP_URL_CUSTOM + "watches"} />
                <meta property="og:image" content="https://www.eisbachwatches.com/images/logo/eisbach-watches.png"></meta>
            </Helmet></HelmetProvider>
            {watchesData.poster_image || watchesData.banner_video ? (
                <VideoBanner
                    poster={watchesData.poster_image ? dataBaseUrl + watchesData.poster_image : 'images/watches-poster.webp'}
                    srcType="mp4"
                    videoUrl={ websiteVideoeUrl+'/videos/TIDRON-UT-360GM-T-RED-SHORT.mp4'}
                    title_first="Eisbach"
                    title_second="Watches"
                    title={watchesData.about_title}
                    subTitle={watchesData.about_title}
                    breadcrumbsData={breadcrumbsData}
                />
            ) : (
                <PageLoader />
            )}
            {Object.keys(watchesData).length > 0 ? (<>
                <section className="">
                    <div className="site-container mt-3">
                        <div>
                            <h3 className="heading-two fw-md mb-3 text-lg-start">{watchesData.about_title_first} <span className="text-blue">{watchesData.about_title_last}</span></h3>
                            <p className="about-desc text-center text-lg-start">{watchesData.about_content}..<Link to="/about" className="link text-blue">Read More</Link></p>
                        </div>
                        <div className="text-center text-lg-end categories-links">
                            <ul className="inline-list  mb-0 ps-0">
                                {watchesData.collection_widgets && watchesData.collection_widgets.map((widget, index) => {
                                    const { image, label, link } = widget;
                                    return (
                                        <li key={'collection-widget' + index}>
                                            <Link to={"/watches/" + link} className="watchs-link" >
                                                <span className={link === 'collections' ? "circle bg-blue" : "circle"}>
                                                    <span><img src={dataBaseUrl + image} alt={label} /></span>
                                                </span>
                                                <p>{label}</p>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="row g-3 collections-block mt-2 mb-3 mt-lg-0 mb-lg-0">
                            {watchesData.collection && watchesData.collection.map((collectionData, index) => {
                                const { name, model_image, slug, model_image_alt_text } = collectionData;
                                return (
                                    <div key={'collection-' + index} className="col-sm-6 col-md-6 col-lg-6 ms-auto me-auto">
                                        <div className="collection-img">
                                            <Link to={"/watches/" + slug} ><img src={dataBaseUrl + model_image} alt={model_image_alt_text !== null ? model_image_alt_text : name + ' collections'} title={model_image_alt_text !== null ? model_image_alt_text : name + ' collections'} /></Link>
                                        </div>
                                        <div className="collection-link">
                                            <h4 className="sec-title-sm fw-md text-white mb-0 text-uppercase">
                                                <Link to={"/watches/" + slug} className="text-white" ><span className="text-blue">{name + "'s"} </span>Collection</Link>
                                            </h4>
                                            <Link to={"/watches/" + slug} className="me-2 btn-link text-uppercase" >
                                                <span className="">Discover Collection</span>
                                                <img src="/svg/angle-down.svg" alt="down-arrow" className='ms-2 rotate icon-img' />
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
                {watchesData.collection_products && watchesData.collection_products.map((collection_products_data, index) => {
                    const { title_first, title_last, collection_product } = collection_products_data;
                    return (
                        <section key={"collection_products" + index} className="featured-category">
                            <div className="site-container">
                                <h3 className="heading-two fw-md mb-4 mb-lg-3 text-center">{title_first} <span className="text-blue">{title_last}</span></h3>
                            </div>

                            {collection_product.length > 0 ? (
                                <React.Suspense fallback={<PageLoader />} >
                                    <FeaturedProducts productsData={collection_product} secClass="products-wrap" />
                                </React.Suspense>
                            ) : ('')}
                        </section>
                    );
                })}
                <section className='mb-3'>
                    <div className="site-container" >
                        <div className="row gy-2 gx-2_1 p-0 m-0">
                            <div className="col-sm-9 col-md-6 col-lg-6 ms-auto me-auto watch-type">
                                <div className="categories overlay-md-none">
                                    <Link to={watchesData.feat_col_first_btn_link} className="img-link" >
                                        <img className="bg-img" src={dataBaseUrl + watchesData.feat_col_first_image} alt={watchesData.feat_col_first_image_alt_text} title={watchesData.feat_col_first_image_alt_text} />
                                    </Link>
                                    <div className="caption dark-bg bottom text-center text-lg-start">
                                        <h2 className="title">
                                            <Link to={watchesData.feat_col_first_btn_link} className="text-white">{watchesData.feat_col_first_title}</Link>
                                        </h2>
                                        <div className="desc fs-small">{watchesData.feat_col_first_subtitle}</div>
                                        <AnimatedButton link={watchesData.feat_col_first_btn_link} label={watchesData.feat_col_first_btn_label} iconImage="/svg/right-arrow-white.svg" hoverIcon="/svg/right-arrow-blue.svg" iconAlt="arrow right" iconSize="17" iconClass='' btnclass="btn-sm rounded-blue" wrapperClass='' />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-9 col-md-6 col-lg-6 ms-auto me-auto watch-type">
                                <div className="categories overlay-md-none">
                                    <Link to={watchesData.feat_col_sec_btn_link} className="img-link" >
                                        <img className="bg-img" src={dataBaseUrl + watchesData.feat_col_sec_image} alt={watchesData.feat_col_sec_image_alt_text} title={watchesData.feat_col_sec_image_alt_text} />
                                    </Link>
                                    <div className="caption dark-bg bottom text-center text-lg-start" >
                                        <div>
                                            <h2 className="title"><Link to={watchesData.feat_col_sec_btn_link} className="text-white" >{watchesData.feat_col_sec_title}</Link></h2>
                                            <div className="desc fs-small">{watchesData.feat_col_sec_subtitle}</div>
                                            <AnimatedButton link={watchesData.feat_col_sec_btn_link} label={watchesData.feat_col_sec_btn_label} iconImage="/svg/right-arrow-white.svg" hoverIcon="/svg/right-arrow-blue.svg" iconAlt="arrow right" iconSize="17" iconClass='' btnclass="btn-sm rounded-blue" wrapperClass='' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>) : <PageLoader />}
        </>
    );
}
export default Watches;