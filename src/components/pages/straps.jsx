import React, {useState, useEffect} from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import ImageBanner from '../templates/imageBanner';
import PageLoader from '../templates/pageLoader';
import ProductService from '../../services/product.service';
import ProductList from '../templates/productList';
const Straps= () =>{
    const [strapsData, setStrapsData] = useState({}); 
    const colCount=5;   
    const fetchStraps = async () => { 
        const url ="strap-products";
        let response = await ProductService.getAllData(url); 
        if (response.status === 200) { 
          setStrapsData(response.data.data.product_data); 
        }   
    }
    useEffect(() => {   
        fetchStraps();    
    }, []);
    const breadcrumbsData=[
        {
            name:'Home',
            link: '/'
        }
    ];
    return(
        <>
            <HelmetProvider> <Helmet>
                <title className="pege-meta-title">Straps and Bracelets</title>
                <link rel="canonical" href={process.env.REACT_APP_URL_CUSTOM+"straps"} />
                <link rel="alternate" hreflang="x-default" href={process.env.REACT_APP_URL+"straps"} />
                <meta name="description" content='Unleash your individual style with Eisbach Watches Straps and Bracelets collection. Crafted from FKM Rubber and 316L Stainless Steel for function and fashion' />
                <meta name="keywords" content="Eisbach, Rubber, Steel, Bracelet, Gunmetal, Carbon"  ></meta>
                <meta property="og:title" content="Straps and Bracelets" />
                <meta property="og:type" content="website" />
				<meta property="og:description" content="Unleash your individual style with Eisbach Watches Straps and Bracelets collection. Crafted from FKM Rubber and 316L Stainless Steel for function and fashion" />
                <meta property="og:url" content={process.env.REACT_APP_URL_CUSTOM+"straps"}/>
                <meta property="og:image" content="https://www.eisbachwatches.com/images/logo/eisbach-watches.png"></meta>
            </Helmet></HelmetProvider>
            <ImageBanner poster={'images/Strap_banner_new.webp'} title_first="Str" title_second="aps" title="Straps" subTitle="" breadcrumbsData={breadcrumbsData} bgPosition="55% center" />
            <section className="pt-0">
                <div className="site-container mt-3 mb-3 straps-list">
                    {Object.keys(strapsData).length>0?(
                        <ProductList listData={strapsData} showWishlist={true} colCount={colCount} />
                    ):(<PageLoader />)}
                </div>
            </section>           
        </>
    );
}  
export default Straps;