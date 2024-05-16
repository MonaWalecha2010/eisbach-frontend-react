import React, {useState, useEffect} from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import AnimatedLink from '../templates/animatedLink';
import VideoBanner from '../templates/videoBanner';
import PopupModal from '../templates/popupModal';
import ProductService from '../../services/product.service';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { PlayIcon } from '../svgIcons';
const TheCollections= () =>{
    const [collections, setCollections] = useState([]);
    const [modalData, setModalData]= useState([]);  
    const [show, setShow] = useState(false);
    const websiteVideoeUrl = process.env.REACT_APP_VIDEO_URL;
    const dataBaseUrl =process.env.REACT_APP_BASE_API_URL;
    const baseVideoeUrl =dataBaseUrl+'public/videos/'; 
    const fetchCollections = async () => {      
        const url ="collections";
        let response = await ProductService.getAllData(url); 
        if (response.status === 200) { 
          setCollections(response.data.data);
        }   
    }
    useEffect(() => {   
        fetchCollections();    
    }, []);
    const getModalData = (id) => {        
        const modalData = collections.filter((curElem) => {
            return curElem.id === id;
        });
        setModalData(modalData);
    };
    const showModal=(id)=>{ 
        getModalData(id);     
        setShow(true);
    }; 
    const hideModal=(id)=>{
        setModalData();    
        setShow(false); 
    };
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
    return(
        <>
            <HelmetProvider> <Helmet>
                <title>Eisbach Watches | Collections </title> 
                <meta name="description" content="Explore our collection of German engineered and Swiss-made automatic Diver and GMT watches. Perfect for style, durability, and functionality seekers" /> 
                <meta name="keywords" content="Eisbach, TIDRON, UT, E1, 360GM-T, Diver, Watches, Trigalight, GMT, Fjord, Greenland"  ></meta>
                <link rel="canonical" href={process.env.REACT_APP_URL_CUSTOM+"watches/collections"}  />
                <link rel="alternate" hreflang="x-default" href={process.env.REACT_APP_URL+"watches/collections"}  />
                <meta property="og:title" content="Eisbach Watches Collections" />
                <meta property="og:type" content="website" />
				<meta property="og:description" content="Explore our collection of German engineered and Swiss-made automatic Diver and GMT watches. Perfect for style, durability, and functionality seekers" />
                <meta property="og:url" content={process.env.REACT_APP_URL_CUSTOM+"watches/collections"}/>
                <meta property="og:image" content="https://www.eisbachwatches.com/images/logo/eisbach-watches.png"></meta>
            </Helmet></HelmetProvider> 
            <VideoBanner
                poster="/images/collections-poster.webp"
                srcType="mp4"
                videoUrl={websiteVideoeUrl+"/videos/BSD_FRONT2.mp4"}
                title_first="The" 
                title_second="Collections" 
                title="The Collections" 
                subTitle=""
                breadcrumbsData={breadcrumbsData} 
            />
            <div className="mt-3 mt-md-4 mb-4">
            {collections && collections.map((collection)=>{                
                const {id, collection_name_first, collection_name_second, tagline, banner_image, featured_image,featured_image_alt_text, slug} = collection;
                return(
                    <section key={"collection-"+id}>
                        <div className="site-container">
                            <div className="collection-wrap ">
                                <div className="collection-caption">
                                    <h3 className="heading-two text-black fw-md mb-2 text-lg-start">{collection_name_first} <span className="text-blue">{collection_name_second}</span></h3>
                                    <div className="pb-1 desc">{tagline}</div>
                                    <div className="collection-links">
                                        <AnimatedLink linkClass="rounded-blue" linkVal={"/watches/collection/"+slug} linkText="Explore the Collection" iconColor="#ffffff" /> 
                                        <div className='animated-btn-warp'>
                                            <button type='button' className='btn rounded-blue-thin' onClick={()=>showModal(id)} >
                                                <span className='d-flex align-items-center justify-content-center'><span className='me-2 text'>Watch Video</span> <PlayIcon color='#03A9F4' /></span>
                                                <span className='line-1'></span>
                                                <span className='line-2'></span>
                                                <span className='line-3'></span>
                                                <span className='line-4'></span>
                                            </button>
                                        </div>                                        
                                    </div>
                                </div>
                                <div className="collection-image-group" >
                                    <div className="bg-img position-relative" style={{ backgroundImage: 'url('+dataBaseUrl+banner_image+')'}}>
                                        <div className="watch-group">
                                            <LazyLoadImage src={dataBaseUrl+featured_image} alt={featured_image_alt_text} title={featured_image_alt_text} threshold={200} />
                                        </div>
                                    </div>
                                                                
                                </div>
                            </div>
                        </div>
                    </section>
                );
            })}
            </div>            
            {modalData && modalData.map((data, index) => {       
                const { id, video_link } = data;                                     
                var modalContent="<video className='video' controls={true} autoPlay playsInline muted loop ><source src="+baseVideoeUrl+video_link+" type='video/mp4' /></video>";                 
                var popupId="collectionVideoModal"+id;        
                return(           
                  <PopupModal
                    key={'wrap-'+id} 
                    modalId={popupId} 
                    show={show}
                    title='' 
                    showHeader={false} 
                    content={modalContent} 
                    showFooter={false} 
                    closeModal={hideModal} 
                    classes={'modal-full-width'}            
                  />          
                );
            })}          
        </>
    );
}  
export default TheCollections;