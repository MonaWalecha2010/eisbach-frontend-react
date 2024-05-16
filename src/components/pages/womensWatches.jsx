import React from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import CollectionsProducts from '../templates/collectionsProducts';
const WomensCollectionProducts= () =>{    
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
                <title>Eisbach Watches | Women's </title>
                <meta name="description" content="Discover the perfect luxury GMT or Diver watch for the modern woman with Eisbach Watches Women's collection - designed for both style and functionality." />        
                <link rel="canonical" href={process.env.REACT_APP_URL_CUSTOM+"watches/women"} />
                <link rel="alternate" hreflang="x-default" href={process.env.REACT_APP_URL+"watches/women"} />
                <meta property="og:title" content="Women's Watches" />
                <meta property="og:type" content="website" />
				<meta property="og:description" content="Discover the perfect luxury GMT or Diver watch for the modern woman with Eisbach Watches Women's collection - designed for both style and functionality." />
                <meta property="og:url" content={process.env.REACT_APP_URL_CUSTOM+"watches/women"}/>
                <meta property="og:image" content="https://www.eisbachwatches.com/images/logo/eisbach-watches.png"></meta>
            </Helmet></HelmetProvider> 
            <CollectionsProducts
                poster="/images/poster_image_UT_women.webp"                
                video="TIDRON_UT_360GM-WATCH.mp4"
                title_first="" 
                title_second="Women's" 
                title="Women's" 
                subTitle=""
                breadcrumbsData={breadcrumbsData}
                collectionBanner="women.webp"
                bgPositionBanner="13% center" 
                collectionModalFirst="iStock-1131567221.webp" 
                collectionModalSecond="iStock-854304532.webp"
                bgPositionFirst="center top"
                bgPositionSec="center center"
            />                
            
        </>
    );
}  
export default WomensCollectionProducts;