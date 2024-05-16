import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import {useFormik} from 'formik';
import ProductService from '../../services/product.service';
import { RightArrow } from '../svgIcons';
const ContactUsForm = () => {
	const[isdisabled, setIsdisabled]=useState(false);
	const[successful, setSuccessful]=useState();
	const[showMessage, setShowMessage]=useState(false);
  	const[message, setMessage]=useState('');	
	const validateForm = data => {
		const errors = {};		
		if (!data.first_name) {
		    errors.first_name = 'Please enter first name.';
		} else if (data.first_name.length > 20) {
		    errors.first_name = 'Name cannot exceed 20 characters.';
		}
		if (!data.email) {
		    errors.email = 'Please enter email id.';
		}else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
		    errors.email = 'Invalid email address.';
		}
		if (!data.telephone) {
	      errors.telephone = 'Please enter telephone number.';
	    }else if(!/^[0-9\b]+$/.test(data.telephone)){
	      errors.telephone = 'Please enter a valid telephone number.';
	    }else if(data.telephone.length < 8 || data.telephone.length > 12) {
	      errors.telephone = 'Telephone number should be in between 8 to 12 digits.';
	    }	    
		return errors;
	};	
	const handelPhoneInput=(event)=>{
		if (!/[0-9]/.test(event.key)) {
			event.preventDefault();
		}
	}	
	const formik=useFormik({
	    initialValues:{ 
		    first_name:'',
		    last_name:'',
		    email:'',
		    telephone:'',		   
		    message:'',
		    terms_nd_condition:'', 
	    },
	    validate:validateForm,	   
	    onSubmit: (values, { resetForm }) => {	
			setIsdisabled(true);   	
	      	const API_URL = "contact-us";
	      	let formData = new FormData();
	      			      
		    formData.append('name', values.first_name+' '+values.last_name); 
		    formData.append('email', values.email);
		    formData.append('phone', values.telephone);			    
		    formData.append('message', values.message);
		    formData.append('terms_nd_condition', values.terms_nd_condition===true?1:0);			
	      	ProductService.postData( 
	        	API_URL,
	        	formData,      
	      	).then((response) => {							
		        if (response.data.success === true) {
					setShowMessage(true);
		            setMessage(response.data.message);
		            setSuccessful(response.data.success);
		            setTimeout(() => {							            	
		              	resetForm();
						setIsdisabled(false);						              
		            }, 2000);
					setTimeout(() => {
						setShowMessage(false);		              
		            }, 5000);		            		                       
		        }else {					
					setShowMessage(true);
					setIsdisabled(false);
		            setMessage(response.data.message);
		            setSuccessful(response.data.success);
					setTimeout(() => {
						setShowMessage(false);             
		            }, 5000);
		        }		        
	        },);		    
	    }
	});
	return(
		<>
			<Form onSubmit={formik.handleSubmit} id="contactForm" className="form">
	            <div className="form-body">
	            	<div className="row g-2">            
		                <div className="col-sm-6 mb-2">
		                  <input className="form-control" name="first_name" type="text" id="first_name" placeholder="First Name"
		                    value={formik.values.first_name}
		                    onChange={formik.handleChange} 
		                    onBlur={formik.handleBlur}>                    
		                  </input>
		                  {formik.touched.first_name && formik.errors.first_name ? <span className="error" style={{color:'red'}}>{formik.errors.first_name}</span> : null}                        
		                </div>
		                <div className="col-sm-6 mb-2">
		                  <input className="form-control" name="last_name" type="text" id="last_name" placeholder="Last Name"
		                    value={formik.values.last_name}
		                    onChange={formik.handleChange} 
		                    onBlur={formik.handleBlur}>                    
		                  </input>							                                          
		                </div>
		                <div className="col-sm-6 mb-2">
		                  <input className="form-control" type="text" name="email" id="EmailId" placeholder="Email"
		                    value={formik.values.email}
		                    onChange={formik.handleChange} onBlur={formik.handleBlur}>
		                  </input>
		                  {formik.touched.email && formik.errors.email ? <span className="error" style={{color:'red'}}>{formik.errors.email}</span> : null}
		                </div>
		                <div className="col-sm-6 mb-2">
		                  <input className="form-control" name="telephone" type="text" id="Telephone" placeholder="Phone"
		                    value={formik.values.telephone}
		                    onChange={formik.handleChange} 
		                    onBlur={formik.handleBlur}
							onKeyDown={(event)=>handelPhoneInput(event)}>                    
		                  </input>
		                  {formik.touched.telephone && formik.errors.telephone ? <span className="error" style={{color:'red'}}>{formik.errors.telephone}</span> : null}						                                          
		                </div>		                
		                <div className="col-sm-12 mb-2">
		                	<textarea className="form-control mb-0" rows="6" name="message" type="textarea" id="Message" placeholder="Message"
		                    	value={formik.values.message}
		                    	onChange={formik.handleChange} 
		                    	onBlur={formik.handleBlur}>                    
		                  	</textarea>								                					                  
		                </div>
		                <div className="col-sm-12 mb-3">
			                <div className="field-wrap form-check">
			                	<label className="form-check-label" htmlFor="terms_nd_condition">I have read and agreed to all the <a className="link text-blue" href="/terms-of-use">Terms of use </a> and <a className="link text-blue" href="/privacy-policy">Privacy policy</a>.</label>
				                <input className="form-check-input" type="checkbox" name="terms_nd_condition" id="terms_nd_condition"
				                  checked={formik.values.terms_nd_condition}
				                  value={formik.values.terms_nd_condition}
				                  onChange={formik.handleChange} 
				                  onBlur={formik.handleBlur}
				                />                   
				            </div>
				        </div>
				        <div className="mt-0 col-sm-12 mb-2 text-center">
							<div className='animated-btn-warp'>
								<button type='submit' className='btn rounded-blue' disabled={isdisabled&&isdisabled===true?true:false}>
								<span className='d-flex align-items-center justify-content-center'><span className='me-2 text'>Submit</span> <RightArrow color='white' /></span>
								<span className='line-1'></span>
								<span className='line-2'></span>
								<span className='line-3'></span>
								<span className='line-4'></span>
								</button>
							</div>		                  	
		                </div>
		                <div className="mt-3 col-sm-12 mb-2">
		                	{message?(
		                		<>
		                			{successful===true && showMessage===true ?(
			                			<div className="alert-success mb-2 text-center">{message}</div>
					                ):successful===false && showMessage===true?(
					                	<div className="alert-danger mb-2 text-center">{message}</div>
					              	):''}
		                		</>
		                	):('')}
			              	
			            </div>
		            </div>
	            </div>
	        </Form>	        
		</>
	);
}
export default ContactUsForm;