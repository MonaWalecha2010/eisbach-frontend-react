import React, { useState, useEffect  } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import SinglePageHeader from "../templates/singlePageHeader";
import ProductService from '../../services/product.service';
import parse from 'html-react-parser';
const TermsOfUse =()=>{
    const [termsData, setTermsData]=useState({});
    const [pageContent, setPageContent]=useState('');    
    const fetchTermsData = async () => {
        const url ="terms-and-conditions";
        let response = await ProductService.getAllData(url);        
        if (response.status === 200) { 
            setTermsData(response.data.data);
            setPageContent(response.data.data.content);
        }   
    }    
    useEffect(() => {      
        fetchTermsData();      
    }, []);
 return(
    <>
        <HelmetProvider> <Helmet>
            <title>{termsData?termsData.meta_title:"Eisbach Watches | TERMS AND CONDITIONS"}</title>
            <meta name="description" content={termsData?termsData.meta_description:"Our Terms and Conditions provide the framework for using our products and services. Learn about our policies to ensure a seamless experience."} />
            <meta name="keywords" content={termsData?termsData.meta_keywords:"Eisbach, Terms, Conditions, Acknowledgement, Prices, Pre-orders, Billing, Taxes, Copyright"}  ></meta>
            <link rel="canonical" href={process.env.REACT_APP_URL_CUSTOM+"terms-of-use"} />
            <link rel="alternate" hreflang="x-default" href={process.env.REACT_APP_URL+"terms-of-use"} />
            <meta property="og:title" content="Eisbach Terms and Conditions" />
            <meta property="og:type" content="website" />
            <meta property="og:description" content="Our Terms and Conditions provide the framework for using our products and services. Learn about our policies to ensure a seamless experience." />
            <meta property="og:url" content={process.env.REACT_APP_URL_CUSTOM+"terms-of-use"}/>
            <meta property="og:image" content="https://www.eisbachwatches.com/images/logo/eisbach-watches.png"></meta>
        </Helmet></HelmetProvider> 
        {termsData?(
            <>
                <SinglePageHeader PageTitle={termsData.title} PageTitleFirst="Terms" PageTitleSecond="And Conditions" bgImage="images/terms.webp" bgPosition="center" />
                <section>
                    <div className="site-container">                                               
                        <div className="policy-content">
                            <div className="">
                             {parse(pageContent)}
                            </div>                               
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
export default TermsOfUse;