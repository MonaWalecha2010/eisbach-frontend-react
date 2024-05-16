import React, { useState, useEffect  } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import SinglePageHeader from "../templates/singlePageHeader";
import ProductService from '../../services/product.service';
import parse from 'html-react-parser';
const Warranty= () =>{
    const [warrantyData, setWarrantyData]=useState({});
    const [pageContent, setPageContent]=useState('');   
    const fetchTermsData = async () => {
        const url ="warranty-info";
        let response = await ProductService.getAllData(url);        
        if (response.status === 200) { 
            setWarrantyData(response.data.data);
            setPageContent(response.data.data.content);
        }   
    }    
    useEffect(() => {      
        fetchTermsData(); 
    }, []);    
    return(
        <>
            <HelmetProvider> <Helmet>
                <title>{warrantyData?warrantyData.meta_title:"Eisbach Watches | Warranty Information"}</title>
                <meta name="description" content={warrantyData?warrantyData.meta_description:"Shop with confidence knowing that Eisbach Watches provides a 5 years limited warranty for all our timepieces. Learn more about our international warranty "} /> 
                <meta name="keywords" content={warrantyData?warrantyData.meta_keywords:"Eisbach, International, Warranty, claims, Repairs, Contact, Defect, Watch"}  ></meta>       
                <link rel="canonical" href={process.env.REACT_APP_URL_CUSTOM+"warranty"} />
                <link rel="alternate" hreflang="x-default" href={process.env.REACT_APP_URL+"warranty"} />
                <meta property="og:title" content="Eisbach watches Warranty Information" />
                <meta property="og:type" content="website" />
				<meta property="og:description" content="Shop with confidence knowing that Eisbach Watches provides a 5 years limited warranty for all our timepieces. Learn more about our international warranty" />
                <meta property="og:url" content={process.env.REACT_APP_URL_CUSTOM+"warranty"}/>  
                <meta property="og:image" content="https://www.eisbachwatches.com/images/logo/eisbach-watches.png"></meta>              
            </Helmet></HelmetProvider>         
            <SinglePageHeader PageTitle={warrantyData.title} PageTitleFirst="International" PageTitleSecond="Warranty Information" bgImage="images/warranty.webp" bgPosition="center" />
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
    );
}  
export default Warranty;