import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import {useFormik} from 'formik';
import ProductService from '../../services/product.service';
import { EnvelopOpenSm } from '../svgIcons';
const NewsletterForm = (props) => {
	const[isdisabled, setIsdisabled]=useState(false);
	const [showMessage, setShowMessage]= useState(false)
	const[successful, setSuccessful]=useState();
  	const[message, setMessage]=useState(null);
	const validateForm = data => {
		const errors = {};		
		if (!data.email) {
		    errors.email = 'Please enter email id.';		    
		}else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
		    errors.email = 'Invalid email address.';
		}
		if(data.terms===false){
			errors.terms = 'Please select terms and conditions.';	
		}
		return errors;
	};
	const formik=useFormik({
	    initialValues:{ 	
		    email:'',
		    terms:false		   
	    },
	    enableReinitialize: true,
	    validate:validateForm,	    
	    onSubmit: (values, { resetForm }) => { 
			setIsdisabled(true);	              
	      	const API_URL = "newsletter-subscription";
	      	let formData = new FormData();	      
		    formData.append('email', values.email);
		    formData.append('terms', values.terms===true?1:0);
			ProductService.postData( 
				API_URL,
				formData,      
			).then((response) => { 		      		            
				if (response.data.success === true) {			        	
					setMessage(response.data.message);
					setSuccessful(true);
					setTimeout(() => {							            	
						resetForm();
						setIsdisabled(false);														              
					}, 2000);
					if(props.isModal===true){
						setTimeout(() => {
							props.click();
						}, 5000);
					}			            
				}
				else if (response.data.success ===false) {
					setIsdisabled(false);
					setMessage(response.data.message);	
					setShowMessage(true);				
					setSuccessful(false);					
					setTimeout(() => {
						setShowMessage(false);
						resetForm();             
					}, 5000);
				}
				if(response.status === 403){
					setIsdisabled(false);
					setMessage(response?.data?.error?.email[0]);
					setShowMessage(true);				
					setSuccessful(false);					
					setTimeout(() => {
						setShowMessage(false);
						resetForm();             
					}, 5000);
				}
			},);	    	
	    }    
	});
	return(
		<>
			<Form onSubmit={formik.handleSubmit} id="subscribe" className="form">
				<div className="row-wrap">			               
		            <div className="form-group mb-3">                    
		              	<div className="input-group">                      
			                <input className="form-control" id="email" name="email" type="text"  placeholder="Enter Email..." aria-label="email"
			                	value={formik.values.email}
								onChange={formik.handleChange} onBlur={formik.handleBlur}
			                />
			                <div className="input-group-addon"><EnvelopOpenSm /></div>
		              	</div>						 		              	
		            </div>
		            <span className="d-block d-md-none mb-3"> 
		            	{formik.touched.email && formik.errors.email ? <span className="text-danger mb-3" >{formik.errors.email}</span> : null}          	
		        		<div className="field-wrap form-check">
		        			<input className="form-check-input me-2" type="checkbox" name="terms" id="terms"
			                  checked={formik.values.terms}
			                  value={formik.values.terms}
			                  onChange={formik.handleChange} 
			                  onBlur={formik.handleBlur}
			                />
			            	<label className="form-check-label" htmlFor="terms">I have read and agreed to all the <a className="link text-blue" href="/terms-of-use">Terms of use </a> and <a className="link text-blue" href="/privacy-policy">Privacy policy</a>.</label>	                                   
			            </div>	            
			            {formik.touched.terms && formik.errors.terms ? <span className="text-danger mt-2">{formik.errors.terms}</span> : null}
			        </span>		            
	            </div> 
	            <span className="d-none d-md-block mb-3">
					{formik.touched.email && formik.errors.email ? <span className="text-danger mt-2" >{formik.errors.email}</span> : null}							      	
	        		<div className="field-wrap form-check mt-2">
	        			<input className="form-check-input me-2" type="checkbox" name="terms" id="terms-lg"
		                  checked={formik.values.terms}
		                  value={formik.values.terms}
		                  onChange={formik.handleChange} 
		                  onBlur={formik.handleBlur}
		                />
		            	<label className="form-check-label" htmlFor="terms-lg">I have read and agreed to all the <a className="link text-blue" href="/terms-of-use">Terms of use </a> and <a className="link text-blue" href="/privacy-policy">Privacy policy</a>.</label>	                                   
		            </div>	            
		            {formik.touched.terms && formik.errors.terms ? <span className="text-danger mt-2" >{formik.errors.terms}</span> : null}
		        </span>
				<div className='animated-btn-warp d-flex w-100 justify-content-center justify-content-lg-start'>
					<button className={`btn rounded-blue-thin ${props.isModal===true?'btn-sm':''}`} type="submit" disabled={isdisabled!==undefined && isdisabled===true?true:false} >
						<span className='d-flex align-items-center justify-content-center text'>Subscribe <img src="/svg/right-arrow-blue.svg" className='ms-2 icon show' alt="right-arrow-blue" width="17" /></span>
						<span className='line-1'></span>
						<span className='line-2'></span>
						<span className='line-3'></span>
						<span className='line-4'></span>
					</button>
				</div>		       	
	            {message!==null?(
            		<div className="w-100 pt-3">
            			{successful===true ?(
                			<div className="alert-success mb-2 bg-light">{message}</div>
		                ):successful===false && showMessage===true?(
		                	<div className="alert-danger mb-2 bg-light">{message}</div>
		              	):''}
            		</div>
            	):('')}         
	        </Form>
	        
		</>
	);
}
export default NewsletterForm;