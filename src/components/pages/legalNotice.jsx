import React, { useState , useEffect  } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import SinglePageHeader from "../templates/singlePageHeader";
import ProductService from '../../services/product.service';
import parse from 'html-react-parser';
const LegalNotice =()=>{
    const[legalNoticeData, setLegalNoticeData]=useState({});
    const[legalNoticeContent, setLegalNoticeContent]=useState('');    
    const fetchLegalNoticeData = async () => {
        const url ="legal-note";
        let response = await ProductService.getAllData(url);        
        if (response.status === 200) { 
            setLegalNoticeData(response.data.data);
            setLegalNoticeContent(response.data.data.content);
        }   
    }
    useEffect(() => {      
        fetchLegalNoticeData();      
    }, []); 
    
    return(
        <>
        <HelmetProvider> <Helmet>
            <title className="pege-meta-title">{legalNoticeData?legalNoticeData.meta_title:"Eisbach Watches Legal Notice"}</title>
            <link rel="canonical" href={process.env.REACT_APP_URL_CUSTOM+"legal-notice"} />
            <link rel="alternate" hreflang="x-default" href={process.env.REACT_APP_URL+"legal-notice"} />
            <meta name="description" content={legalNoticeData?legalNoticeData.meta_description:'We are constantly developing the content of this website and endeavor to provide accurate information..'} />
            <meta name="keywords" content={legalNoticeData?legalNoticeData.meta_keywords:"Eisbach, Legal, Notice, Liability, References, protection, watches"}  ></meta>
            <meta property="og:title" content={legalNoticeData?legalNoticeData.meta_title:"Eisbach Watches Legal Notice"} />
            <meta property="og:type" content="website" />
            <meta prropety="og:description" content={legalNoticeData?legalNoticeData.meta_description:'We are constantly developing the content of this website and endeavor to provide accurate information..'} />
            <meta property="og:url" content={process.env.REACT_APP_URL_CUSTOM+"legal-notice"}/>
            <meta property="og:image" content="https://www.eisbachwatches.com/images/logo/eisbach-watches.png"></meta>
        </Helmet></HelmetProvider>
        {legalNoticeData?(
            <>
                <SinglePageHeader PageTitle={legalNoticeData.title} PageTitleFirst="Legal" PageTitleSecond="Notice" bgImage="images/terms.webp" bgPosition="center" />
                <section>
                    <div className="site-container">                        
                        <div className="policy-content">
                            {parse(legalNoticeContent)}
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

export default  LegalNotice;