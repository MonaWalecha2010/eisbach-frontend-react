import React, {useState, useEffect, useRef} from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import ProductService from '../../services/product.service';
import PageLoader from '../templates/pageLoader';
import VideoBanner from '../templates/videoBanner';
import ProductsFilters from '../templates/productFilters';
import ProductList from '../templates/productList';
import AuthService from '../../services/auth.service';
import parse from 'html-react-parser';
import { RightArrow } from '../svgIcons';
const TidronUTCollectionProducts= () =>{
    const e1Ref = useRef(null);
    const utRef = useRef(null);
    const tidronE1Ref = useRef(null);
    const tidronUtRef = useRef(null);
    const collectionModalFirst= "iStock-157835634.webp";
    const collectionModalSecond= "iStock-174773789.webp";   
    const collectionBanner='all-image.webp';
    const [productsUt, setProductsUt] = useState([]);
    const [productsE1, setProductsE1] = useState([]);
    const [collectionsProductsUt, setCollectionsProductsUt] = useState([]);
    const [collectionsProductsE1, setCollectionsProductsE1] = useState([]);   
    const dataBaseUrl =process.env.REACT_APP_BASE_API_URL;
    const baseVideoeUrl =dataBaseUrl+'public/videos/';
    const [isfilterApplied, setIsfilterApplied]=useState(false);
    const breadcrumbsData=[
        {
            name:'Home',
            link: '/'
        },
        {
            name:'Watches',
            link:'/watches'
        }
    ];
    useEffect(() => {        
        tidronUtRef.current.scrollIntoView({behavior: 'smooth', block: 'start' });                          
    },[]);
    const fetchCollectionsUt = async () => {      
        const user = AuthService.getCurrentUser();
        if(user){
            const url = "all-collections-ut-products-auth";
            const token = user.token;
            let formData = new FormData();
            let response = await AuthService.postDataWithToken(url, formData,  token); 
            fetchUtData(response);   
        }else{
            const url ="all-collections-ut-products";
            let response = await ProductService.getAllData(url); 
            fetchUtData(response);  
        }
    }
    const fetchUtData=(res)=>{        
        if (res.status === 200) {
            setProductsUt(res.data.data.product_data)  
            setCollectionsProductsUt(res.data.data);                                
        }else{
            return;
        }    
    }
    useEffect(() => {             
        fetchCollectionsUt();
    },[]);
    const fetchCollectionsE1 = async () => {      
        const user = AuthService.getCurrentUser();
        if(user){
            const url = "all-collections-E1-products-auth";
            const token = user.token;
            let formData = new FormData();
            let response = await AuthService.postDataWithToken(url, formData,  token); 
            fetctE1Data(response);   
        }else{
            const url ="all-collections-E1-products";
            let response = await ProductService.getAllData(url); 
            fetctE1Data(response);   
        }
    }; 
    const fetctE1Data=(res)=>{        
        if (res.status === 200) {
            setProductsE1(res.data.data.product_data)  
            setCollectionsProductsE1(res.data.data);                                  
        }else{
            return;
        }    
    }  
    useEffect(() => {           
        fetchCollectionsE1();   
    }, []);    
    const executeScroll = (ref) => {
        ref.current.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'start', alignToTop: true});
    }
    const applyFilters=(val)=>{
        setIsfilterApplied(val);
    }
    return(
        <>
            <HelmetProvider> <Helmet>
                <title>Eisbach Watches | TIDRON-UT-360gm-t </title>
                <meta name="description" content="Elevate your style with Eisbach Watches TIDRON-UT-360GM-T collection - a fusion of German engineering and Swiss-made quality" />        
                <link rel="canonical" href={process.env.REACT_APP_URL_CUSTOM+"watches/tidron-ut-360gm-t"} />
                <link rel="alternate" hreflang="x-default" href={process.env.REACT_APP_URL+"watches/tidron-ut-360gm-t"} />
                <meta property="og:title" content="Eisbach TIDRON-UT-360gm-t" />
                <meta property="og:type" content="website" />
				<meta property="og:description" content="Elevate your style with Eisbach Watches TIDRON-UT-360GM-T collection - a fusion of German engineering and Swiss-made quality" />
                <meta property="og:url" content={process.env.REACT_APP_URL_CUSTOM+"watches/tidron-ut-360gm-t"}/>
                <meta property="og:image" content="https://www.eisbachwatches.com/images/logo/eisbach-watches.png"></meta>
            </Helmet></HelmetProvider>
            <div className="video-banner-wrap">
                <VideoBanner 
                    poster="/images/poster_image_IFD.webp" 
                    srcType="mp4"
                    videoUrl={baseVideoeUrl+"IFD_SV_New.mp4"} 
                    title_first="All" 
                    title_second="The Watches" 
                    title="All The Watches" 
                    subTitle=""
                    breadcrumbsData={breadcrumbsData}
                />
                {collectionsProductsUt.product_data && collectionsProductsE1.product_data?(
                    <ProductsFilters
                        multiDataArray={true}
                        dataArrayOne={collectionsProductsUt.product_data}
                        dataArrayTwo={collectionsProductsE1.product_data}
                        filteredDataOne={productsUt}
                        filteredDataTwo={productsE1}
                        setFilteredDataOne={setProductsUt}
                        setFilteredDataTwo={setProductsE1}
                        applyFilters={applyFilters} 
                    />
                ):""}
            </div>     
            <div className="mt-2 mb-3">                       
                <section ref={tidronUtRef} id="tidron-ut-360gm-t" className={isfilterApplied===false?'UT-min-Height scroll-padding-sm':''}>
                {Object.keys(collectionsProductsUt).length>0?(
                    <>                    
                        <div className="row p-0 m-0 mt-lg-3">              
                            <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12 align-self-center text-center text-md-start">
                                <div className="mw-475 mw-sm-100 ms-200 mb-4 mb-md-0">
                                    <h4 className="sec-title-sm">{collectionsProductsUt.collection_name_first}<span className="text-blue"> {collectionsProductsUt.collection_name_last}</span></h4>
                                    <div className=" mt-3 mb-3 ">
                                        {parse(collectionsProductsUt.collection_description)}
                                    </div>
                                    <div className='animated-btn-warp mt-3'>
                                        <button type="button" className='btn rounded-blue' onClick={()=>executeScroll(utRef)} >
                                            <span className='d-flex align-items-center'><span className='me-2 text'>Explore the Collection </span><RightArrow color='white' /></span>
                                            <span className='line-1'></span>
                                            <span className='line-2'></span>
                                            <span className='line-3'></span>
                                            <span className='line-4'></span>
                                        </button>
                                    </div>                                    
                                </div>    
                            </div>
                            <div className="col-xl-7 col-lg-7 col-md-6 col-sm-12 all-watches-modal p-md-0">
                                {collectionModalFirst!==''?(
                                    <div className="cover-image border_TL br-sm-TRBL bg-white " style={{backgroundImage:'url(images/'+collectionModalFirst+')', backgroundPosition:'80% top'}}></div>
                                ):(
                                    <div className="cover-image border_TL br-sm-TRBL bg-white " style={{backgroundImage:'url('+dataBaseUrl+collectionsProductsUt.collection_model_image+')',backgroundPosition:'80% top'}}></div>
                                )}
                            </div>
                        </div>                    
                        <div ref={utRef} className="site-container mt-5">
                            {productsUt && productsUt.length>0?(
                                <ProductList listData={productsUt} showWishlist={true} />
                            ):(
                                <div className='pt-4'> 
                                    <h3 className='sec-title-sm text-danger text-center'>Product not found for selected category</h3>
                                </div>
                            )}                        
                        </div>
                    </>
                ):(<PageLoader />)}
                </section>
                <section className="pt-4 pt-md-3 pb-0 pb-md-3">
                    <div className="collection-center-banner" style={{backgroundImage:'url(images/'+collectionBanner+')', backgroundPosition:'27% center', minHeight:'15.75rem'}} ></div>
                </section>
                <section ref={tidronE1Ref} id="tidron-e1" className={isfilterApplied===false?'mh-100-vh scroll-padding-sm':''}> 
                {Object.keys(collectionsProductsE1).length>0?(
                    <>                    
                        <div className="row p-0 m-0" >
                            <div className="col-xl-7 col-lg-7 col-md-6 col-sm-12 all-watches-modal order-2 order-md-1 p-md-0">                            
                                {collectionModalSecond!==''?(
                                    <div className="full-height cover-image border_RB br-sm-TRBL bg-white" style={{backgroundImage:'url(images/'+collectionModalSecond+')', backgroundPosition:'center top'}}></div>
                                ):(
                                    <div className="cover-image border_RB br-sm-TRBL bg-white" style={{backgroundImage:'url('+dataBaseUrl+collectionsProductsE1.collection_model_image+')', backgroundPosition:'center 85%'}}></div>
                                )}
                            </div>
                            <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12 align-self-center order-1 order-md-2">
                                <div className="mw-475 mw-sm-100 ms-100 pe-3 pe-xl-0 mt-4 mt-md-0">
                                    <h4 className="sec-title-sm">TIDRON<span className="text-blue"> E1</span></h4>
                                    <div className=" mt-3 mb-3 ">
                                        {parse(collectionsProductsE1.collection_description)}
                                    </div>
                                    <div className='animated-btn-warp mt-3'>
                                        <button type="button" className='btn rounded-blue' onClick={()=>executeScroll(e1Ref)}>
                                            <span className='d-flex align-items-center'><span className='me-2 text'>Explore the Collection </span><RightArrow color='white' /></span>
                                            <span className='line-1'></span>
                                            <span className='line-2'></span>
                                            <span className='line-3'></span>
                                            <span className='line-4'></span>
                                        </button>
                                    </div>                                    
                                </div>    
                            </div>
                        </div>                   
                        <div ref={e1Ref} className="site-container mt-5">
                            {productsE1 && productsE1.length>0?(
                                <ProductList listData={productsE1} showWishlist={true} />
                            ):(
                                <div className='pt-4'> 
                                    <h3 className='sec-title-sm text-danger text-center'>Product not found for selected category</h3>
                                </div>
                            )}                        
                        </div>
                    </>
                ):(<PageLoader />)} 
                </section>                           
            </div> 
        </>
    );
}  
export default TidronUTCollectionProducts;