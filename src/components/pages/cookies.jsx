import React, { useState , useEffect  } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import SinglePageHeader from "../templates/singlePageHeader";
import ProductService from '../../services/product.service';
import parse from 'html-react-parser';
const Cookies =()=>{
    const[cookiesData, setCookiesData]=useState({});
    const[cookiesContent, setCookiesContent]=useState('');    
    const fetchCookiesData = async () => {
        const url ="cookies";
        let response = await ProductService.getAllData(url);        
        if (response.status === 200) { 
            setCookiesData(response.data.data);
            setCookiesContent(response.data.data.content);
        }   
    }
    useEffect(() => {      
        fetchCookiesData();      
    }, []);     
    return(
        <>
        <HelmetProvider> <Helmet>
            <title className="pege-meta-title">{cookiesData?cookiesData.meta_title:"Eisbach Watches Cookies"}</title>
            <link rel="canonical" href={process.env.REACT_APP_URL_CUSTOM+"cookies"} />
            <link rel="alternate" hreflang="x-default" href={process.env.REACT_APP_URL+"cookies"} />
            <meta name="description" content={cookiesData?cookiesData.meta_description:'Learn more about how Eisbach Watches uses cookies to enhance your shopping experience. We explain the types of cookies we use and why.'} />
            <meta name="keywords" content={cookiesData?cookiesData.meta_keywords:"Eisbach, cookies, Analytics, _gat, Advertising, watches"}  ></meta>
            <meta property="og:title" content={cookiesData?cookiesData.meta_title:"Eisbach Watches Cookies"} />
            <meta property="og:type" content="website" />
            <meta property="og:description" content={cookiesData?cookiesData.meta_description:'Learn more about how Eisbach Watches uses cookies to enhance your shopping experience. We explain the types of cookies we use and why.'} />
            <meta property="og:url" content={process.env.REACT_APP_URL_CUSTOM+"cookies"}/>
            <meta property="og:image" content="https://www.eisbachwatches.com/images/logo/eisbach-watches.png"></meta>
        </Helmet></HelmetProvider>
        {cookiesData?(
            <>                
                <SinglePageHeader PageTitle={cookiesData.title} PageTitleFirst="Website" PageTitleSecond="Cookies" bgImage="images/cookies.webp" bgPosition="50% center" />
                <section>
                    <div className="site-container">
                        <div className="policy-content">
                            {parse(cookiesContent)}
                        </div>                
                    </div>
                </section>
            </>
        ):(
            <>
            </>
        )}  
        
    </>
 );
}

export default Cookies;