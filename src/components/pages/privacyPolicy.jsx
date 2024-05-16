import React, { useState , useEffect  } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import SinglePageHeader from "../templates/singlePageHeader";
import ProductService from '../../services/product.service';
import parse from 'html-react-parser';
const PrivacyPolicy =()=>{
    const[privacyData, setPrivacyData]=useState({});
    const[privacyContent, setPrivacyContent]=useState('');    
    const fetchPrivacyData = async () => {
        const url ="privacy-policy";
        let response = await ProductService.getAllData(url);        
        if (response.status === 200) { 
            setPrivacyData(response.data.data);
            setPrivacyContent(response.data.data.content);
        }   
    }
    useEffect(() => {      
        fetchPrivacyData();      
    }, []);     
    return(
        <>
        <HelmetProvider> <Helmet>
            <title className="pege-meta-title">{privacyData?privacyData.meta_title:"Eisbach Watches | Privacy Policy"}</title>
            <meta name="description" content={privacyData?privacyData.meta_description:'At Eisbach Watches, we take your privacy seriously. Learn more about how we protect your personal data and maintain your trust when you shop with us'} />
            <link rel="canonical" href={process.env.REACT_APP_URL_CUSTOM+"privacy-policy"} />
            <link rel="alternate" hreflang="x-default" href={process.env.REACT_APP_URL+"privacy-policy"} />
            <meta name="keywords" content={privacyData?privacyData.meta_keywords:"Eisbach, Privacy, ReCAPTCHA, Controller, Analytical, Hosting, Newsletter, Advertising, Marketing"}  ></meta>
            <meta property="og:title" content={privacyData?privacyData.meta_title:"Eisbach Privacy Policy"} />
            <meta property="og:type" content="website" />
            <meta property="og:description" content={privacyData?privacyData.meta_description:'At Eisbach Watches, we take your privacy seriously. Learn more about how we protect your personal data and maintain your trust when you shop with us'} />
            <meta property="og:url" content={process.env.REACT_APP_URL_CUSTOM+"privacy-policy"}/>
            <meta property="og:image" content="https://www.eisbachwatches.com/images/logo/eisbach-watches.png"></meta>
        </Helmet></HelmetProvider>
        {privacyData?(
            <>
                <SinglePageHeader PageTitle={privacyData.title} PageTitleFirst="Privacy" PageTitleSecond="Policy" bgImage="images/privcay.webp" bgPosition="47% center" />
                <section>
                    <div className="site-container">                       
                        <div className="policy-content">
                            {parse(privacyContent)}
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

export default  PrivacyPolicy;