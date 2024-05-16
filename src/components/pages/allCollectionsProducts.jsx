import React from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import CollectionsProducts from '../templates/collectionsProducts';
const AllCollectionsProducts= () =>{     
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
                <title>Eisbach | TIDRON UT 360GM-T | TIDRON E1 </title>
                <meta name="description" content="Discover our collection of TIDRON UT 360GM-T and TIDRON E1, Swiss made automatic Tool watches, dedicated to Precision and Balance " />        
                <link rel="canonical" href={process.env.REACT_APP_URL_CUSTOM+"watches/all"} />
                <link rel="alternate" hreflang="x-default" href={process.env.REACT_APP_URL+"watches/all"} />
                <meta property="og:title" content="Eisbach | TIDRON UT 360GM-T | TIDRON E1" />
                <meta property="og:type" content="website" />
				<meta property="og:description" content="Discover our collection of TIDRON UT 360GM-T and TIDRON E1, Swiss made automatic Tool watches, dedicated to Precision and Balance" />
                <meta property="og:url" content={process.env.REACT_APP_URL_CUSTOM+"watches/all"} />
                <meta property="og:image" content="https://www.eisbachwatches.com/images/logo/eisbach-watches.png"></meta>
            </Helmet></HelmetProvider>            
            <CollectionsProducts
                poster="/images/poster_image_IFD.webp"
                video="IFD_SV_New.mp4"
                title_first="All" 
                title_second="Watches" 
                title="All The Watches" 
                subTitle=""
                breadcrumbsData={breadcrumbsData}
                collectionBanner="all-image.webp"
                bgPositionBanner="27% center" 
                collectionModalFirst="iStock-157835634.webp" 
                collectionModalSecond=''
                bgPositionFirst="80% top"
                bgPositionSec="center 85%"
            />
        </>
    );
}  
export default AllCollectionsProducts;