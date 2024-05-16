import React from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import CollectionsProducts from '../templates/collectionsProducts';
const MensCollectionProducts= () =>{
    const dataBaseUrl = process.env.REACT_APP_BASE_API_URL;  
    const baseVideoeUrl =dataBaseUrl+'public/videos/';     
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
                <title>Eisbach Watches | Men's </title>
                <meta name="description" content="Experience the fusion of style and function with Eisbach Watches' Men's Collection. Our Diver and GMT watches are precision-engineered for the modern adventurer" />        
                <link rel="canonical" href={process.env.REACT_APP_URL_CUSTOM+"watches/men"} />
                <link rel="alternate" hreflang="x-default" href={process.env.REACT_APP_URL+"watches/men"} />
                <meta property="og:title" content="Men's Watches" />
                <meta property="og:type" content="website" />
				<meta property="og:description" content="Experience the fusion of style and function with Eisbach Watches' Men's Collection. Our Diver and GMT watches are precision-engineered for the modern adventurer" />
                <meta property="og:url" content={process.env.REACT_APP_URL_CUSTOM+"watches/men"}/>
                <meta property="og:image" content="https://www.eisbachwatches.com/images/logo/eisbach-watches.png"></meta>
            </Helmet></HelmetProvider>
            <CollectionsProducts 
                poster="/images/poster_image_IFD.webp"                
                video="IFD_SV_New.mp4"
                title_first="" 
                title_second="Men's"
                title="Men's" 
                subTitle=""
                breadcrumbsData={breadcrumbsData}
                collectionBanner="iStock-1263074523.webp"
                bgPositionBanner="90% center"
                collectionModalFirst="iStock-157835634.webp"
                bgPositionFirst="75% 25px"
                collectionModalSecond="iStock-174773789.webp"
                bgPositionSec="center top" 
                bgsecondClass="full-height"                
            />
        </>
    );
}  
export default MensCollectionProducts;