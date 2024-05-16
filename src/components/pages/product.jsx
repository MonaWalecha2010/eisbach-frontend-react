import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Helmet, HelmetProvider } from "react-helmet-async";
import ProductService from '../../services/product.service';
import AuthService from '../../services/auth.service';
import Modal from 'react-bootstrap/Modal';
import 'react-image-gallery/styles/css/image-gallery.css';
import parse from 'html-react-parser';
import PageLoader from '../templates/pageLoader';
import ProductGallary from '../templates/productGallary';
import MultiCarousel from "react-multi-carousel";
import { AngleRight, AngleLeft, AngleRightSm, RightArrow, PlayIcon } from "../svgIcons"
import { replaceCrmUrl } from '../../utils/utils';
const StarpModal = React.lazy(() => import('../templates/starpModal'));
const FeaturedProducts = React.lazy(() => import('../templates/featuredProducts'));
const EnquiryForm = React.lazy(() => import('../forms/enquiryForm'));
const PopupModal = React.lazy(() => import('../templates/popupModal'));
const GallaryModal = React.lazy(() => import('../templates/gallaryModal'));
const PageNotFound = React.lazy(() => import('./pageNotFound'));
const Product = () => {
	const { collection_slug, item_code } = useParams();
	const [showStarpModal, setShowStarpModal] = useState(false);
	const [pageType, setPageType] = useState(null);
	const [productDetails, setProductDetails] = useState({});
	const [relatedProducts, setRelatedProducts] = useState([]);
	const [currentProduct, setCurrentProduct] = useState({});
	const [productFeatures, setProductFeatures] = useState({});
	const [productFeatureImage, setProductFeatureImage] = useState(null);
	const [modalData, setModalData] = useState(null);
	const [productDesc, setProductDesc] = useState('');
	const dataBaseUrl = process.env.REACT_APP_BASE_API_URL;
	const imageBaseUrl = process.env.REACT_APP_GALLARY_URL;
	const overviewRef = useRef(null);
	const featuresRef = useRef(null);
	const storyRef = useRef(null);
	const [activeRef, setActiveRef] = useState(overviewRef);
	const [masonryImages, setmasonryImages] = useState([]);
	const [nightMode, setNightMode] = useState(false);
	const [showStoryModal, setShowStoryModal] = useState(false);
	const [storyVideoContent, setStoryVideoContent] = useState(null);
	const [galleryModalShow, setGalleryModalShow] = useState(false);
	const [currGalleryIndex, setCurrGallaryIndex] = useState(0);
	const [message, setMessage] = useState(null);
	const executeScroll = (ref) => {
		ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start', alignToTop: true });
		setActiveRef(ref);
	}
	const fetchProduct = async (item_code) => {
		const user = AuthService.getCurrentUser();
		if (user) {
			const url = "product-detail-auth";
			const token = user.token;
			let formData = new FormData();
			formData.append('item_code', item_code);
			let response = await AuthService.postDataWithToken(url, formData, token);
			setupProductPageData(response);
		} else {
			const url = "product-detail";
			let formData = new FormData();
			formData.append('item_code', item_code);
			let response = await ProductService.postData(url, formData);
			setupProductPageData(response);
		}
	}
	const setupProductPageData = (response) => {
		if (response && response.data.success) {
			setProductDetails(response.data.data);
			setPageType(response.data.data.product_line_type === "strap" ? "straps" : "watches");
			setModalData(response.data.data.other_options);
			setmasonryImages(response.data.data.merchandising_images);
			let mid = Math.ceil(response.data.data.key_features.length / 2);
			const obj = {
				left: response.data.data.key_features.slice(0, mid),
				right: response.data.data.key_features.slice(mid)
			};
			setProductFeatures(obj);
			setProductFeatureImage(response.data.data.key_featured_image);
			if (response.data.data.is_steel === "1" || response.data.data.is_rubber === "1") {
				setCurrentProduct(...response.data.data.other_options.filter((item) => item.active_status === 1));
			} else if (response.data.data.is_steel === "0" && response.data.data.is_rubber === "0") {
				setCurrentProduct(response.data.data);
			}
		} else {
			setMessage(response.data.message);
			return;
		}
	}
	const fetchRelatedProducts = async (product_id) => {
		const url = "related-products";
		let formData = new FormData();
		formData.append('product_id', product_id);
		let response = await ProductService.postData(url, formData);
		if (response.status === 200) {
			setRelatedProducts(response.data.data);
		}
	}
	useEffect(() => {
		if (item_code) {
			fetchProduct(item_code);
		}
	}, [item_code]);
	useEffect(() => {
		if (productDetails !== undefined) {
			let p_id = productDetails.id;
			fetchRelatedProducts(p_id);
		}
	}, [productDetails]);

	const chooseStarpModalShow = () => {
		setShowStarpModal(true);
	};
	const chooseStarpModalHide = () => {
		setShowStarpModal(false);
	};
	const [isEnquiry, setIsEnquiry] = React.useState(false);
	function openEnquiryModal() {
		setIsEnquiry(true);
	}
	function closeEnquiryModal() {
		setIsEnquiry(false);
	}
	const getFilteredProduct = (id) => {
		if (id) {
			setCurrentProduct(...productDetails.other_options.filter((item) => item.id === id));
			setTimeout(() => {
				setShowStarpModal(false);
			}, 300);
		}
	};
	useEffect(() => {
		if (currentProduct.description) {
			setProductDesc(currentProduct.description)
		}
	}, [currentProduct]);
	const responsive = {
		desktop: {
			breakpoint: { max: 9000, min: 891 },
			items: 3,
			slidesToSlide: 3,
			partialVisibilityGutter: 500
		},
		tablet: {
			breakpoint: { max: 890, min: 577 },
			items: 2,
			slidesToSlide: 2
		},
		mobile: {
			breakpoint: { max: 576, min: 0 },
			items: 1,
			slidesToSlide: 1
		}
	};
	const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
		return (
			<div className="carousel-button-group">
				<button className="arrow--left" onClick={() => previous()}>
					<span className="icon">
						<AngleLeft color="#fff" />
					</span>
				</button>
				<button className="arrow--right" onClick={() => next()}>
					<span className="icon">
						<AngleRight color="#fff" />
					</span>
				</button>
			</div>
		);
	};
	const [scroll, setScroll] = useState(false);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			setScroll(window.scrollY > 100);
		});
	}, []);
	const changeViewMode = () => {
		setNightMode(!nightMode);
	}
	const playStoryVideo = (video_link) => {
		var videoContent = "<video className='video' controls={true} autoPlay playsInline muted loop ><source src=" + dataBaseUrl + video_link + " type='video/mp4' /></video>";
		setStoryVideoContent(videoContent);
		setShowStoryModal(true);
	}
	const hideStoryModal = () => {
		setShowStoryModal(false);
	};
	const showmasonryImageModal = (currentIndex) => {
		setCurrGallaryIndex(currentIndex);
		setGalleryModalShow(true);
	}
	const closemasonryImageModal = () => {
		setGalleryModalShow(false);
	}
	const productStructuredData = {
		"@context": "http://schema.org",
		"@type": "Product",
		"name": currentProduct ? currentProduct?.name : '',
		"image": [
			currentProduct ? dataBaseUrl + currentProduct?.featured_image : productDetails?.meta_title,
			currentProduct ? dataBaseUrl + currentProduct?.night_view_image : '',
			currentProduct ? dataBaseUrl + currentProduct?.story_image : '',
		],
		"description": productDetails ? productDetails?.story_description : productDetails?.meta_description,
		"sku": currentProduct ? currentProduct?.item_code : '',
		"brand": {
			"@type": "Brand",
			"name": "Eisbach Watches"
		},
		"offers": {
			"@type": "Offer",
			"url": window.location.href,
			"priceCurrency": "USD",
			"price": '$$$',
			"itemCondition": "https://schema.org/UsedCondition",
			"availability": "https://schema.org/InStock"
		}
	};
	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title name="title" >{productDetails.meta_title ? productDetails?.meta_title : collection_slug ? collection_slug : 'Eisbach Watches'}</title>
					<meta name="description" content={productDetails?.meta_description !== null ? productDetails.meta_description : 'The Perfect GMT Watch for the Nomadic Adventurer..'} />
					<meta name="keywords" content={productDetails?.meta_keywords ? productDetails?.meta_keywords : "TIDRON, UT, E1, 360GM-T, Waterproof, Trigalight, GMT, Watch, "}  ></meta>
					<meta property="og:type" content="product" />
					<meta property="og:image" content={currentProduct ? dataBaseUrl + currentProduct?.featured_image : "https://www.eisbachwatches.com/images/logo/eisbach-watches.png"} />
					<meta property="og:title" content={productDetails?.meta_title ? productDetails?.meta_title : currentProduct?.name} />
					<meta property="og:description" content={productDetails?.meta_description !== null ? productDetails.meta_description : productDetails?.story_description} />
					<meta property="og:url" content={`${process.env.REACT_APP_URL_CUSTOM}${pageType}/${collection_slug}/${item_code}`} />
					{pageType !== null && item_code !== null ? (<>
						<link rel="canonical" href={`${process.env.REACT_APP_URL_CUSTOM}${pageType}/${collection_slug}/${item_code}`} />
						<link rel="alternate" hreflang="x-default" href={`${process.env.REACT_APP_URL}${pageType}/${collection_slug}/${item_code}`} />
					</>) : ('')}
					{
						currentProduct ? currentProduct?.name :
							<script type="application/ld+json">
								{JSON.stringify(productStructuredData)}
							</script>
					}
				</Helmet>
			</HelmetProvider>
			<div className={scroll === true ? 'product-navigation fixed' : 'product-navigation'}>
				<div className="site-container">
					<ul className="product-tabs">
						<li className={activeRef === overviewRef ? 'active link' : 'link'} onClick={() => executeScroll(overviewRef)} >Overview</li>
						<li className={activeRef === featuresRef ? 'active link' : 'link'} onClick={() => executeScroll(featuresRef)}>Features</li>
						<li className={activeRef === storyRef ? 'active link' : 'link'} onClick={() => executeScroll(storyRef)}>Story</li>
					</ul>
				</div>
			</div>
			{Object.keys(productDetails).length > 0 ? (<>
				<section ref={overviewRef} className={nightMode === true ? "m-0 product-viewer dark-mode scroll-padding" : "m-0 product-viewer scroll-padding"} id={productDetails.id}>
					<div className="site-container">
						<div className="row gx-5">
							<div className=" col-md-6 col-sm-12 m-sm-auto m-md-0  gallary-wrap pb-3 pb-md-0 position-relative">
								<div className="pt-4 d-flex align-items-center space-between other-options me-sm-5">
									{productDetails.product_line_type !== null && productDetails.product_line_type !== 'strap' ? (
										<label className="switch me-3">
											<input type="checkbox" id="togBtn" onChange={changeViewMode} />
											<div className="switch-slider round">
												<span className="on">Day Mode</span>
												<span className="off">Night Mode</span>
											</div>
										</label>
									) : ''}
									{productDetails.limited_edition_status === "1" ? (
										<div className="lmtd-pill mb-0">
											<span className='lmtd-text'>Limited Edition</span>
										</div>
									) : ''}
								</div>
								<div className="product-options">
									{/*	{  currentUser ? currentProduct.wishlist_status === 0 ? <span className="icon link login" onClick={()=>addTowishList(currentProduct.item_code)}><i className="material-icons favorite_border">favorite_border</i></span> : <span className="icon link" onClick={()=>removeTowishList(currentProduct.item_code)}><i className="material-icons favorite">favorite</i></span>
									:
									currentUserWishlist.includes(currentProduct.item_code) ? <span className="icon link" onClick={()=>removeTowishList(currentProduct.item_code)}><i className="material-icons favorite">favorite</i></span> : <span className="icon link" onClick={()=>addTowishList(currentProduct.item_code)}><i className="material-icons favorite_border">favorite_border</i></span>
								}	*/}
								</div>
								{productDetails.is_steel === "1" && productDetails.is_rubber === "1" && (currentProduct.gallery_images || currentProduct.night_gallery_images) ? (
									<ProductGallary name={productDetails.name} gallaryData={currentProduct} nightMode={nightMode} />
								) : (
									<>
										{productDetails.gallery_images || productDetails.night_gallery_images ? (
											<ProductGallary name={productDetails.name} gallaryData={productDetails} nightMode={nightMode} />
										) : ('')}
									</>
								)}
							</div>
							<div className="col-md-6 col-sm-12 m-sm-auto m-md-0 align-self-center product-detail-wrap pb-3 pb-md-0">
								{currentProduct ? (
									<div className="product-description">
										<div className="pt-2 pb-2 ps-0 breadcrumbs">
											<Link to="/" className="link text-gray">Home </Link>
											<span className='ms-1 me-1 mb-1'><AngleRightSm /></span>
											{productDetails.product_line_type === 'strap' ? (
												<Link to="/straps" className="link text-gray">Straps </Link>) : (
												<span className='d-inline-flex align-items-center'>
													<Link to="/watches" className="link text-gray">Watches </Link>
													<span className='ms-1 me-1 mb-1'><AngleRightSm /></span>
													<Link to={productDetails.category === 'TIDRON E1' ? '/watches/tidron-e1' : '/watches/tidron-ut-360gm-t'} className="link text-gray"> {productDetails.category}</Link>
												</span>)
											}
											<span className='ms-1 me-1 mb-1'><AngleRightSm /></span>
											<span className="link text-black"> {currentProduct.name}</span>
										</div>
										<p className="model mb-1">{currentProduct.item_code}</p>
										<h1 className="title fw-md text-md-start mb-1">{currentProduct.name_first} <span className="text-blue">{currentProduct.name_second}</span></h1>
										<div className="material">{currentProduct.type} {currentProduct.color} {productDetails.product_line_type !== null ? productDetails.product_line_type : ''}</div>
										{productDetails.is_steel === "1" && productDetails.is_rubber === "1" ? (
											<div className="choose-strap" onClick={() => chooseStarpModalShow()}>
												<span className="strap-thumbnail">
													<img className="me-2" src={currentProduct.strap_image ? (dataBaseUrl + currentProduct.strap_image) : ('')} alt={currentProduct.strap_image_alt_text} />
												</span>
												<span className="d-inline-flex align-items-center"><span className="link">Change </span></span>
											</div>
										) : ('')}
										<div className='animated-btn-warp mt-3 mb-2 mb-md-0'>
											<button type='button' className='btn btn-sm rounded-black' onClick={() => openEnquiryModal()}>
												<span className='d-flex align-items-center justify-content-center'><span className='me-2 text'>Make An Enquiry</span>
													<RightArrow color="#fff" />
												</span>
												<span className='line-1'></span>
												<span className='line-2'></span>
												<span className='line-3'></span>
												<span className='line-4'></span>
											</button>
										</div>
										<div className="accordion accordion-flush mt-3 spec-wrap" id="techSpecAndPolicies">
											<div className="accordion-item">
												<h5 className="accordion-header" id="headingOne">
													<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#techSpec" aria-expanded="false" aria-controls="collapseOne">
														Tech Spec
													</button>
												</h5>
												<div id="techSpec" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#techSpecAndPolicies">
													<div className="accordion-body">
														{productDetails.specifications.length > 0 && productDetails.specifications[0].label !== null ? (
															<table className="table table-bordered">
																<tbody>
																	{productDetails.specifications && productDetails.specifications.map((specification, index) => {
																		const { label, value } = specification;
																		return (
																			<tr key={'spec-row' + index}>
																				<th scope="row">{label}</th>
																				<td>{value}</td>
																			</tr>
																		);
																	})}
																</tbody>
															</table>
														) : (
															<p>No specifications are added for this product.</p>
														)}
													</div>
												</div>
											</div>
										</div>
										{(productDetails.material_type === "steel" || productDetails.material_type === null) ? (
											<div className="warrenty-wrap mt-4">
												<Link to="/warranty">
													<div className="warrenty-icon">
														<object id="warranrty" data="images/icons/warranty.svg" type="image/svg+xml" aria-labelledby="international warranty"></object>
													</div>
												</Link>
												<Link to="/terms-of-use">
													<div className="warrenty-icon">
														<object id="warranrty" data="images/icons/shipping.svg" type="image/svg+xml" aria-labelledby="international warranty"></object>
													</div>
												</Link>
											</div>
										) : productDetails.material_type === "rubber" ?
											<div className="warrenty-wrap mt-4">
												<Link to="/terms-of-use">
													<div className="warrenty-icon">
														<object id="warranrty" data="images/icons/shipping.svg" type="image/svg+xml" aria-labelledby="international warranty"></object>
													</div>
												</Link>
											</div>
											: ""}
									</div>
								) : ('')}
							</div>
						</div>
					</div>
				</section>
				<section className="mt-3 mt-lg-4 scroll-padding" ref={storyRef}>
					<div className="site-container">
						<div className="story">
							{productDetails.story_title_first || productDesc ? (
								<div className="story-content">
									<div>
										<h2 className="sec-title fw-md text-md-start text-black mb-3">{productDetails.story_title_first} <span className="text-blue">{productDetails.story_title_second}</span></h2>
										<div className="list-style-watch dark-watch">{parse(productDesc)}</div>
									</div>
								</div>
							) : ('')}
						</div>
					</div>
					{masonryImages.length > 0 ? (
						<>
							<MultiCarousel id="masonryImages" className="multislide-carousel masonry-carousel"
								responsive={responsive}
								autoPlay={true}
								infinite={true}
								partialVisible={false}
								autoPlaySpeed={3000}
								keyBoardControl={true}
								customTransition="transform 2000ms ease-in-out"
								transitionDuration={3000}
								arrows={false}
								showDots={false}
								renderButtonGroupOutside={false}
								customButtonGroup={<ButtonGroup />}
							>
								{masonryImages.map((image, index) => {
									const { original } = image;
									let fileUrl = replaceCrmUrl(original);
									return (
										<div key={'masonry-item-' + index} className="masonry-item">
											<div className="img-wrap" style={{ backgroundImage: 'url(' + dataBaseUrl + fileUrl + ')' }} onClick={() => showmasonryImageModal(index)} ></div>
										</div>
									);
								})}
							</MultiCarousel>
							{galleryModalShow === true ? (
								<React.Suspense fallback={<PageLoader />} >
									<GallaryModal name={productDetails.story_title_second} gallaryModalData={masonryImages} galleryModalShow={galleryModalShow} currentIndex={currGalleryIndex} closeModal={closemasonryImageModal} />
								</React.Suspense>) : ''}
						</>
					) : ('')}
				</section>
				{Object.keys(productFeatures).length > 0 && productFeatureImage !== null ? (
					<section id="product_Features" ref={featuresRef} className="mt-3 scroll-padding">
						<div className="site-container pb-3">
							<h2 className="sec-title fw-md">Watch <span className="text-blue">Features</span></h2>
						</div>
						<div className="site-container pt-lg-4">
							<div className="row mb-5 key-features-row">
								{productDetails.product_line_type === null || productDetails.product_line_type === 'strap' ? (<>
									<div className="col-sm-12 col-md-12 col-lg-3 col-xl-3  ms-xl-auto order-2 order-lg-1 order-xl-1">
										<div className="key-features">
											{productFeatures.left.map((feature, index) => {
												const { label, value, image } = feature;
												let featureImageUrl = replaceCrmUrl(image);
												return (
													<div key={'key-feature' + index} className="feature">
														<div className="feature-icon">
															<img src={dataBaseUrl + featureImageUrl} alt={label} title={label} />
														</div>
														<div className="feature-content">
															<h3 className="feature-name">{label}</h3>
															<p className="feature-desc">{value}</p>
														</div>
													</div>
												);
											})}
										</div>
									</div>
									<div className="col-sm-6 col-md-6 col-lg-6 col-xl-4 ms-auto me-auto mb-4 mb-lg-0 order-1 order-lg-3 order-xl-2 align-self-center">
										<div className="strap-key-featured-image" style={{ backgroundImage: 'url(' + dataBaseUrl + productFeatureImage + ')' }}>
										</div>
									</div>
									<div className="col-sm-12 col-md-12 col-lg-3 col-xl-3 me-xl-auto  strap-features-right order-3 order-lg-2 order-xl-3">
										<div className="key-features w-auto">
											{productFeatures.right.map((feature, index) => {
												const { label, value, image } = feature;
												let fileUrl_1 = replaceCrmUrl(image);
												return (
													<div key={'key-feature' + index} className="feature">
														<div className="feature-icon">
															<img src={dataBaseUrl + fileUrl_1} alt={label} title={label} />
														</div>
														<div className="feature-content">
															<h3 className="feature-name">{label}</h3>
															<p className="feature-desc">{value}</p>
														</div>
													</div>
												);
											})}
										</div>
									</div>
								</>
								) : (<>
									<div className="col-sm-12 col-md-12 col-lg-4 order-2 order-lg-1">
										<div className="key-features">
											{productFeatures.left.map((feature, index) => {
												const { label, value, image } = feature;
												let fileUrl_2 = replaceCrmUrl(image);
												return (
													<div key={'key-feature' + index} className="feature">
														<div className="feature-icon">
															<object id={label} data={dataBaseUrl + fileUrl_2} type="image/svg+xml" aria-labelledby={label}></object>
														</div>
														<div className="feature-content">
															<h3 className="feature-name">{label}</h3>
															<p className="feature-desc">{value}</p>
														</div>
													</div>
												);
											})}
										</div>
									</div>
									<div className="col-sm-12 col-md-12 ms-auto me-auto mb-3 mb-lg-0 col-lg-4 align-self-start order-1 order-lg-2">
										<div className="key-featured-image">
											<img className="mw-100 p-img" src={dataBaseUrl + productFeatureImage} alt={productDetails.key_featured_image_alt_text} />
											<img className="mw-100 img-shadow" src="/images/shadow-image-small.webp" alt="shadow" />
										</div>
									</div>
									<div className="col-sm-12 col-md-12 col-lg-4 order-3 order-lg-3">
										<div className="key-features ps-lg-5">
											{productFeatures.right.map((feature, index) => {
												const { label, value, image } = feature;
												let featureImageUrl_1 = replaceCrmUrl(image);
												return (
													<div key={'key-feature' + index} className="feature">
														<div className="feature-icon">
															<object id={label} data={dataBaseUrl + featureImageUrl_1} type="image/svg+xml" aria-labelledby={label} ></object>
														</div>
														<div className="feature-content">
															<h3 className="feature-name">{label}</h3>
															<p className="feature-desc">{value}</p>
														</div>
													</div>
												);
											})}
										</div>
									</div>
								</>)}
							</div>
							{(currentProduct.story_image !== null || productDetails.story_poster_image !== null) && productDetails.story_video !== null ? (
								<div className="story-video position-relative">
									{productDetails.product_line_type === null || productDetails.product_line_type === 'strap' ? (
										<div className="story-video-poster" style={{ backgroundImage: 'url(' + dataBaseUrl + productDetails.story_poster_image + ')' }} onClick={() => playStoryVideo(productDetails.story_video)}></div>
									) : (
										<div className="story-video-poster" style={{ backgroundImage: 'url(' + dataBaseUrl + currentProduct.story_image + ')' }} onClick={() => playStoryVideo(productDetails.story_video)}></div>
									)}
									<div className="play-btn-wrap">
										<button type="button" className="btn play-btn" onClick={() => playStoryVideo(productDetails.story_video)}>
											<PlayIcon color='#03A9F4' />
										</button>
									</div>
									<div className="story-video-content">
										<div className="desc">{productDetails.story_description}</div>
									</div>
								</div>
							) : ('')}
						</div>
					</section>
				) : ('')}
				{relatedProducts.length > 0 ? (
					<section className="related-products mt-3 mb-4">
						<div className="site-container pb-4">
							<h2 className="sec-title fw-md">You May <span className="text-blue">Also Like</span></h2>
						</div>
						<React.Suspense fallback={<PageLoader />} >
							<FeaturedProducts productsData={relatedProducts} secClass="products-wrap" />
						</React.Suspense>
					</section>
				) : ('')}
			</>) : (<>
				{message === null ? <PageLoader /> :
					<React.Suspense fallback={<PageLoader />} ><PageNotFound title="Something Went Wrong" errorMessage={message} /></React.Suspense>}
			</>)}
			{showStarpModal === true && modalData !== null ? (
				<React.Suspense fallback={<PageLoader />} >
					<StarpModal
						modalId="starpModal"
						show={showStarpModal}
						showHeader={false}
						modalData={modalData}
						closeModal={chooseStarpModalHide}
						classes={'modal-full-width custom-modal'}
						click={getFilteredProduct}
					/>
				</React.Suspense>
			) : ''}
			{isEnquiry === true ? (
				<Modal
					id="EnquiryModal"
					show={isEnquiry}
					onHide={closeEnquiryModal}
					className="modal-full-width custom-modal"
					size="xl"
					backdrop={true}
					backdropClassName=""
				>
					<Modal.Header closeButton className="p-0 border-0">
					</Modal.Header>
					<Modal.Body>
						<div className="enquiry-container">
							{currentProduct ? (
								<div className="row product-description pt-0 pt-md-3">
									<div className="col-sm-10 col-md-4 col-lg-4 ms-auto me-auto mb-4 mb-md-0">
										<div className="gray-bg p-3 text-center border_TRBL">
											<div className="p-img m-auto">
												<img src={dataBaseUrl + currentProduct.featured_image} alt={currentProduct.name} title={currentProduct.name} />
											</div>
											<div className="pt-3 text-center">
												<h3 className="title mb-2">{currentProduct.name_first} <span className="text-blue">{currentProduct.name_second}</span></h3>
												<p className="material mb-0">{currentProduct.type} - {currentProduct.color}</p>
												<p className="model mb-0">Item Code: {currentProduct.item_code}</p>
											</div>
										</div>
									</div>
									<div className="col-sm-10 col-md-8 col-lg-8 ms-auto me-auto">
										<h5 className="heading text-black ps-3 ps-lg-5 text-center text-md-start"><span className="text-blue">Personal </span>Data</h5>
										<React.Suspense fallback={<PageLoader />} ><EnquiryForm productId={currentProduct.id} click={closeEnquiryModal} /></React.Suspense>
									</div>
								</div>
							) : ('')}
						</div>
					</Modal.Body>
				</Modal>
			) : ''}
			{showStoryModal === true && storyVideoContent !== null ? (
				<React.Suspense fallback={<PageLoader />} >
					<PopupModal
						modalId="productStoryVideo"
						show={showStoryModal}
						title=''
						showHeader={false}
						content={storyVideoContent}
						showFooter={false}
						closeModal={hideStoryModal}
						classes={'modal-full-width'}
					/>
				</React.Suspense>
			) : ('')}
		</>
	);
}
export default Product;