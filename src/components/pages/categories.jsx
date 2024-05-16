import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PageLoader from '../templates/pageLoader';
import ProductService from '../../services/product.service';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import VideoBanner from '../templates/videoBanner';
import ProductsFilters from '../templates/productFilters';
import {replaceCrmUrl} from '../../utils/utils';
const CompanyVideo = React.lazy(() => import('../templates/companyVideo'));
const Categories = () => {
  const { collection_slug } = useParams();
  const [bannerBg, setBannerBg] = useState('');
  const [collectionDesc, setCollectionDesc] = useState('');
  const [products, setProducts] = useState([]);
  const [productList, setProductList] = useState([]);
  const dataBaseUrl = process.env.REACT_APP_BASE_API_URL;
  const imageBaseUrl = process.env.REACT_APP_GALLARY_URL;
  const baseVideoeUrl = dataBaseUrl + "public/videos/";
  const [errorMsg, setErrorMsg] = useState(null);
  const fetchCollection = async (collection_slug) => {
    const url = "collection-products";
    let formData = new FormData();
    formData.append('collection_slug', collection_slug);
    let response = await ProductService.postData(url, formData);
    if (response.status === 200) {
      setProducts(response.data.data);
      setProductList(response.data.data.product_data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)));
      setErrorMsg(null);
    } else if (response.status === 202) {
      setErrorMsg(response.message);
    } else {
      setErrorMsg('Something went wrong. We are finding out the solution please wait.');
    }
  }
  useEffect(() => {
    if (collection_slug) {
      fetchCollection(collection_slug);
    }
  }, [collection_slug]);
  useEffect(() => {
    if (products.collection_banner_image) {
      setBannerBg(dataBaseUrl + products.collection_banner_image);
    } else {
      setBannerBg('/images/products/product-innerheader.webp');
    }
  }, [products, bannerBg, dataBaseUrl]);
  useEffect(() => {
    if (products.collection_description) {
      setCollectionDesc(products.collection_description);
    }
  }, [products]);
  const breadcrumbsData = [
    {
      name: 'Home',
      link: '/'
    },
    {
      name: 'Watches',
      link: '/watches'
    },
    {
      name: 'Collections',
      link: '/watches/collections'
    }
  ];
  const applyFilters = (val) => {
    return;
  }
  return (
    <>
      <HelmetProvider> <Helmet>
        <title>{products.collection_meta_title ? products.collection_meta_title : `Eisbach Watches |  ${collection_slug}`} </title>
        <meta name="description" content={products.collection_meta_description ? (products.collection_meta_description) : 'TRUST YOUR-' + collection_slug} />
        <meta name="keywords" content={products.collection_meta_keywords ? products.collection_meta_keywords : "TIDRON, UT, E1, 360GM-T"}  ></meta>
        <link rel="canonical" href={process.env.REACT_APP_URL_CUSTOM + "watches/collection/" + collection_slug} />
        <link rel="alternate" hreflang="x-default" href={process.env.REACT_APP_URL + "watches/collection/" + collection_slug} />
        <meta property="og:title" content={products.collection_meta_title ? products.collection_meta_title : `Eisbach ${collection_slug}`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={products.collection_meta_description ? (products.collection_meta_description) : 'TRUST YOUR-' + collection_slug} />
        <meta property="og:url" content={process.env.REACT_APP_URL_CUSTOM + "watches/collection/" + collection_slug} />
        <meta property="og:image" content="https://www.eisbachwatches.com/images/logo/eisbach-watches.png"></meta>
      </Helmet></HelmetProvider>
      {products && Object.keys(products).length > 0 ? (
        <>
          <div className="video-banner-wrap">
            {products.collection_video_poster_image || products.collection_video ? (
              <VideoBanner
                poster={dataBaseUrl + products.collection_video_poster_image}
                srcType="mp4"
                videoUrl={products.collection_video ? baseVideoeUrl + products.collection_video : ''}
                title_first={products.collection_name_first}
                title_second={products.collection_name_second}
                title={products.collection_name}
                subTitle=''
                breadcrumbsData={breadcrumbsData}
              />
            ) : (
              <PageLoader />
            )}
            {products.product_data ?
              <ProductsFilters
                multiDataArray={false}
                dataArrayOne={products.product_data}
                filteredDataOne={productList}
                setFilteredDataOne={setProductList}
                applyFilters={applyFilters}
              />
              : <PageLoader />}
          </div>
          {products.product_data ?
            <section>
              <div className="site-container category">
                <div className="row gx-2 gx-md-3 gy-3 mt-0 mb-0">
                  {productList.length > 0 ? (
                    <>
                      {productList.map((product) => {
                        const { id, name, slug, featured_image, featured_image_alt_text, item_code, limited_edition_status } = product;
                        return (
                          <div key={'trend-' + id} className="col-6 col-sm-4 col-md-4 col-lg-3 h-100">
                            <div className="product-item draw-border h-100">
                              <div className="options-wrap">
                                <div>
                                  {limited_edition_status === "1" ? (
                                    <div className="lmtd-pill">
                                      <span className='lmtd-text'>Limited Edition</span>
                                    </div>
                                  ) : ''}
                                </div>
                              </div>
                              <Link to={'/watches/' + slug + '/' + item_code} className="link item-link" >
                                <div className="item_image">
                                  <LazyLoadImage src={dataBaseUrl + featured_image} className="img-fluid" alt={featured_image_alt_text} threshold={200} />
                                </div>
                              </Link>
                              <Link to={'/watches/' + slug + '/' + item_code} className="link item-link" >
                                <div className="item_content">
                                  <p className="modal-id mb-0">{item_code}</p>
                                  <div className="title mb-2">{name}</div>
                                  {/* <p className="price"><span className="dollar-icon">$</span>{Price}</p>  */}
                                </div>
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <div className='pt-4'>
                      <h3 className='sec-title-sm text-danger text-center'>Product not found for selected category</h3>
                    </div>
                  )}
                </div>
              </div>
            </section>
            : <PageLoader />}
          {products.collection_back_video ? (
            <React.Suspense fallback={<PageLoader />} >
              <CompanyVideo srcUrl={baseVideoeUrl + products.collection_back_video} poster={products.back_video_poster_image ? dataBaseUrl + products.back_video_poster_image : "/images/fjort-back-video-poster.webp"} />
            </React.Suspense>) : <PageLoader />}
          <section>
            <div className="site-container">
              <div className="story">
                <div className="story-content">
                  {products ? (
                    <div className="text-center text-md-start">{parse(collectionDesc)} </div>
                  ) : ('')}
                </div>
                {products.gallery && products.gallery.length > 0 ? (
                  <div className="row g-3 mt-3 mb-3">
                    {products.gallery.map((data, index) => {
                      let imgUrl = replaceCrmUrl(data.original);                     
                      return (
                        <div className="col-sm-6" key={"gallery-img" + index}>
                          <div className="gallery-img">
                            <LazyLoadImage src={dataBaseUrl + imgUrl} alt={products.collection_name_second + "_gallery_" + index} width="742" height="495" className='h-auto mw-100' threshold={200} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : ''}
              </div>
            </div>
          </section>
        </>
      ) : errorMsg !== null ?
        <div className="text-center p-4">
          <h4 className="heading-four">{errorMsg}</h4>
        </div>
        : (
          <PageLoader />
        )}
    </>
  );
};
export default Categories;