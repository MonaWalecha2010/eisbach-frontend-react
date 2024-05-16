import React, {useState,useEffect} from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import {useParams} from 'react-router-dom';
import PageLoader from '../templates/pageLoader';
import ProductList from '../templates/productList';
import GlobalSearchForm from "../forms/globalSearchForm";
import ProductService from '../../services/product.service';
const Search= () =>{
   const {searchText} = useParams();  
   const [searchResults, setSearchResults]=useState([]);   
   const [recommended, setRecommended]=useState(false);
   const [resMessage, setResMessage]  = useState(null);     
   const getSearchData = async (search_text) => {      
      const url ="search-product";
      let formData = new FormData();
      formData.append('search', search_text); 
      let response = await ProductService.postData(url, formData); 
      if(response.data.success===true){
         if(response.data.data.length>0){
            setSearchResults(response.data.data);            
            setResMessage(null);
            setRecommended(false)
         }else{
            setRecommended(true);
            setResMessage('No search results found for '+searchText);
         }
      }else{
         setResMessage('Something went wrong. We are finding the solution please wait.');
      } 
   }    
   useEffect(() => {
       if(searchText!==undefined){
         setRecommended(false);
         setSearchResults([]);  
         getSearchData(searchText);     
      }else{
         setResMessage(null);         
         setRecommended(true);         
         setSearchResults([]);
      }
   }, [searchText]);   
   return(
   <>
      <HelmetProvider> <Helmet>
         <title className="pege-meta-title">Eisbach Watches </title>
         <meta name="description" content='GERMAN ENGINEERED - SWISS MADE PRECISION TIME INSTRUMENTS' />
         <link rel="canonical" href={process.env.REACT_APP_URL_CUSTOM+"search"} />
         <link rel="alternate" hreflang="x-default" href={process.env.REACT_APP_URL+"search"} />
         <meta property="og:title" content="Eisbach Watches" />
         <meta property="og:description" content="GERMAN ENGINEERED - SWISS MADE PRECISION TIME INSTRUMENTS" />
         <meta property="og:url" content={process.env.REACT_APP_URL_CUSTOM+"search"}/>
      </Helmet></HelmetProvider>
      <div className="site-container">
        <GlobalSearchForm showRecommended={recommended} resMessage={resMessage} click={getSearchData} searchedText={searchText} showHeading={true} />
      </div>
      {searchResults.length>0?(
         <div className="site-container mt-5 mb-5">
            <ProductList listData={searchResults} />
         </div>
      ):(<>
         {searchText!==undefined && recommended===false && resMessage===null?(<PageLoader />):''}
         </>
      )}        
   </>
   );
}  
export default Search;