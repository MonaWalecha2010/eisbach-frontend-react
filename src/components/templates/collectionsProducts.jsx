import React, {useState, useEffect, useRef} from 'react';
import ProductService from '../../services/product.service';
import AuthService from '../../services/auth.service';
import PageLoader from './pageLoader';
import VideoBanner from '../templates/videoBanner';
import ProductsFilters from '../templates/productFilters';
import ProductList from './productList';
import parse from 'html-react-parser';
import { RightArrow } from '../svgIcons';
const CollectionsProducts= (props) =>{  
    const utRef = useRef(null);
    const e1Ref = useRef(null);
    const collectionModalFirst=  props.collectionModalFirst?props.collectionModalFirst:'';
    const collectionModalSecond=  props.collectionModalSecond?props.collectionModalSecond:'';
    const collectionBanner=  props.collectionBanner?props.collectionBanner:'all-image.webp';
    const [productsUt, setProductsUt] = useState([]);
    const [productsE1, setProductsE1] = useState([]);
    const [collectionsProductsUt, setCollectionsProductsUt] = useState([]);
    const [collectionsProductsE1, setCollectionsProductsE1] = useState([]);    
    const dataBaseUrl =process.env.REACT_APP_BASE_API_URL;
    const baseVideoeUrl =dataBaseUrl+'public/videos/';
    const [isfilterApplied, setIsfilterApplied]=useState(false); 
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
        ref.current.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'start', alignToTop: true});
    } 
    const applyFilters=(val)=>{
        setIsfilterApplied(val);
    }   
    return(
        <> 
            <div className="video-banner-wrap">      
                <VideoBanner 
                    poster={props.poster}
                    srcType="mp4"
                    videoUrl={baseVideoeUrl+props.video} 
                    title_first={props.title_first} 
                    title_second={props.title_second}
                    title={props.title}
                    subTitle=""
                    breadcrumbsData={props.breadcrumbsData}
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
            <section id="tidron-ut-360gm-t" className={isfilterApplied===false?'mh-100-vh':''}>
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
                                <div className="cover-image border_TL br-sm-TRBL bg-white " style={{backgroundImage:'url(images/'+collectionModalFirst+')', backgroundPosition:props.bgPositionFirst?props.bgPositionFirst:'center top'}}></div>
                            ):(
                                <div className="cover-image border_TL br-sm-TRBL bg-white " style={{backgroundImage:'url('+dataBaseUrl+collectionsProductsUt.collection_model_image+')',backgroundPosition:props.bgPositionFirst?props.bgPositionFirst:'center top'}}></div>
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
                <div className="collection-center-banner" style={{backgroundImage:'url(images/'+collectionBanner+')', backgroundPosition:props.bgPositionBanner?props.bgPositionBanner:'27% center', minHeight:'15.75rem'}} ></div>
            </section>
            <section id="tidron-e1" className={isfilterApplied===false?'mh-100-vh':''}> 
            {Object.keys(collectionsProductsE1).length>0?(
                <>                    
                    <div className="row p-0 m-0" >
                        <div className="col-xl-7 col-lg-7 col-md-6 col-sm-12 all-watches-modal order-2 order-md-1 p-md-0">                            
                            {collectionModalSecond!==''?(
                                <div className={props.bgsecondClass?props.bgsecondClass+" cover-image border_RB br-sm-TRBL bg-white":"cover-image border_RB br-sm-TRBL bg-white "} style={{backgroundImage:'url(images/'+collectionModalSecond+')', backgroundPosition:props.bgPositionSec?props.bgPositionSec:'center center'}}></div>
                            ):(
                                <div className="cover-image border_RB br-sm-TRBL bg-white " style={{backgroundImage:'url('+dataBaseUrl+collectionsProductsE1.collection_model_image+')', backgroundPosition:props.bgPositionSec?props.bgPositionSec:'center center'}}></div>
                            )}
                        </div>
                        <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12 align-self-center order-1 order-md-2">
                            <div className="mw-475 mw-sm-100 ms-100 pe-3 pe-xl-0 mt-4 mt-md-0">
                                <h4 className="sec-title-sm">TIDRON<span className="text-blue"> E1</span></h4>
                                <div className=" mt-3 mb-3 ">
                                    {parse(collectionsProductsE1.collection_description)}
                                </div>
                                <div className='animated-btn-warp mt-3'>
                                    <button type="button" className='btn rounded-blue' onClick={()=>executeScroll(e1Ref)} >
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
        </>
    );
}  
export default CollectionsProducts;