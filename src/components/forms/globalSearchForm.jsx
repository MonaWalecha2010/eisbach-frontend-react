import React, {useState,useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import {useFormik} from 'formik';
import ProductService from '../../services/product.service';
import ProductList from '../templates/productList';
import FeaturedProducts from '../templates/featuredProducts';
const GlobalSearchForm = (props) => {
	const showRecommended=props.showRecommended;	
	const searched_text = props.searchedText;	
	const [recommendedProducts, setRecommendedProducts]=useState([]);   	 	
  	const navigate = useNavigate(); 
  	const location = 	useLocation();
	const validateForm = data => {
		const errors = {};		
		if (!data.search_text) {
		    errors.search_text = 'Please enter search keyword or data.';
		} 				
		return errors;
	};
	const formik=useFormik({
    initialValues:{ 
	    search_text:searched_text	?searched_text:''	           
    },
    enableReinitialize: true,
    validate:validateForm,	   
    onSubmit: (values, { resetForm }) => {
    	var searchText=values.search_text;
    	if(!(/search/.test(location.pathname))){
				props.click();				
			}				
			navigate('/search/'+searchText);
		}
	});	
  const getRecommendedProductsList = async () => {
    const url ="recommended-products-list";
    let response = await ProductService.getAllData(url); 
		if (response.status === 200) { 
			setRecommendedProducts(response.data.data);
		}  
	}
 	useEffect(() => {
    if(showRecommended===true){
      getRecommendedProductsList();     
    }      
 	}, [showRecommended]);	
	return(
		<>	
			<div className="search-wrap">
				<Form onSubmit={formik.handleSubmit} id="searchForm" className="form w-100">
					{props.showHeading===true?(<div className="heading-three text-blue mb-3 text-center">SEARCH</div>):('')}			    	
					<div className="input-group rounded">
						<input type="search" className="form-control" name="search_text" id="search_text" 
							placeholder="What are you looking for?"
						  	aria-label="Search" 	
							aria-describedby="search-addon" 
							autoFocus 
							value={formik.values.search_text} 
							onChange={formik.handleChange} 
							onBlur={formik.handleBlur} 
						/> 
						<span className="input-group-text border-0" id="search-addon" >
							<button type="submit" className="btn-transparent icon search" >
								<img className="ms-2 icon-img d-inline-block" src="/svg/search.svg" alt="search" width="17" />
							</button>
						</span>
					</div>
					{formik.touched.search_text && formik.errors.search_text ? <span className="error" style={{color:'red'}}>{formik.errors.search_text}</span> : null}
				</Form>
		    </div> 
		    {showRecommended===true?(		    		
		    	<div className="text-center mt-4 mb-5">
		        {props.resMessage?(
		        	<p className="mb-3 text-danger">{props.resMessage}</p>
		        ):''}
		    			 
					<div className='d-none d-lg-block'>
					<h3 className="heading-four mb-3">Suggested Search</h3>	    	
		    			<ProductList listData={recommendedProducts} />
					</div>
					<div className='d-block d-lg-none featured-category bg-white' >
						<h3 className="heading-four mb-3">Suggested Search</h3>						
						<FeaturedProducts productsData={recommendedProducts} secClass="products-wrap" />						
					</div>
		    	</div> 	
		    ):('')}    
		</>
	);
}
export default GlobalSearchForm;