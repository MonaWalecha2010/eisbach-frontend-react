import React from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import ComingSoon from '../templates/comingSoon';
const Acessories= () =>{
    return(
        <>
            <HelmetProvider> <Helmet>
                <title className="pege-meta-title">Eisbach | Acessories</title>
                <link rel="canonical" href={process.env.REACT_APP_URL_CUSTOM+"accessories"} />
                <link rel="alternate" hreflang="x-default" href={process.env.REACT_APP_URL+"accessories"} />
                <meta name="description" content='Currently there is no content on this page, it will come soon..' /> 
                <meta property="og:url" content={process.env.REACT_APP_URL_CUSTOM+"accessories"}/>  
                <meta property="og:title" content="Acessoriess" />  
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://www.eisbachwatches.com/images/logo/eisbach-watches.png"></meta>           
            </Helmet></HelmetProvider>
           <ComingSoon /> 
        </>
    );
}  
export default Acessories;