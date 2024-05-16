import React, {useState, useEffect} from 'react';
import Form from "react-bootstrap/Form";
import {useFormik} from 'formik';
import ProductService from '../../services/product.service';
import { RightArrow } from '../svgIcons';
const EnquiryForm = (props) => {
	const productId=props.productId;
	const[CountyCodes, setCountyCodes]=useState([]);
	const[isdisabled, setIsdisabled]=useState(false);
	const fetchCountyCodes = async () => {
		const url ="country-code";
		let response = await ProductService.getAllData(url);
		if (response.status === 200) { 
			setCountyCodes(response.data.data);
		}		  
	} 
	useEffect(() => {      
	  fetchCountyCodes();      
	}, []);
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
	    }else if(data.telephone.length < 8 || data.telephone.length > 12 ) {
	      errors.telephone = 'Telephone number should be in between 8 to 12 digits.';
	    }
	    if (!data.subject) {
	      errors.subject = 'Please select subject.';
	    }	    
		if (!data.country) {
			errors.country = 'Please enter country.';
		}
		if (!data.city) {
			errors.city = 'Please enter city.';
		}
		if (!data.zip_code) {
			errors.zip_code = 'Please enter zip_code.';
		}
		if (!data.street) {
			errors.street = 'Please enter street address.';
		}				
		return errors;
	};
	const handelPhoneInput=(event)=>{
		if (!/[0-9]/.test(event.key)) {
			event.preventDefault();
		}
	}
	const[successful, setSuccessful]=useState();
  	const[message, setMessage]=useState(''); 
	const formik=useFormik({
	    initialValues:{ 
		    first_name:'',
		    last_name:'',
		    email:'',
			country_code:'US',
		    telephone:'',
		    subject:'',			    
			country: 'United States',			
			city: '',
			zip_code:'',
			street:'',
			additional_info:'',					
		    concern:'', 
		    terms_nd_condition:'',       
	    },
	    validate:validateForm,	   
	    onSubmit: (values, { resetForm }) => {
	      	const API_URL = "product-queries";
			setIsdisabled(true);
	      	let formData = new FormData();
	      	if(productId){
		      	formData.append('product_id',productId); 
			    formData.append('first_name', values.first_name); 
			    formData.append('last_name', values.last_name); 
			    formData.append('email', values.email);
				formData.append('country_code', values.country_code);
				formData.append('country', values.country);
				formData.append('city', values.city);
				formData.append('zip_code', values.zip_code);
				formData.append('street', values.street);
				formData.append('additional_info', values.additional_info);			
			    formData.append('phone', values.telephone);
			    formData.append('subject', values.subject); 						
			    formData.append('concern', values.concern);
			    formData.append('terms_nd_condition', values.terms_nd_condition===true?1:0);							    
		      	ProductService.postData( 
		        	API_URL,
		        	formData,      
		      	).then((response) => {		      		            
			        if (response.data.success === true) {
			            setMessage(response.data.message);
			            setSuccessful(response.data.success);
			            setTimeout(() => {	
			            	props.click();	            	
			              	resetForm();
							setIsdisabled(false);		              
			            }, 4000);
			            		                       
			        }else {
			            setMessage(response.error);
			            setSuccessful(response.data.success);
						setIsdisabled(false);
			        }
			        if(response.status === 403)
					{
						setMessage(response?.data?.error);
						// console.log(response?.data?.error)
					}
		        },);		      	
		    }
	    }
	});	
	return(
		<>
			<Form onSubmit={formik.handleSubmit} id="enquiryForm" className="form">
	            <div className="form-body">	
	            	<div className="row">            
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
							<div className="input-group">
								<div className="input-group-prepend country-code">
									<select className="" name="country_code" id="country_code"  aria-label="Country Code" 
										value={formik.values.country_code}
										onChange={formik.handleChange} 
										onBlur={formik.handleBlur}>	
										<option value="+1" disabled defaultValue>+1</option>					
										{CountyCodes.map((value, index) => (  
											<option key={"country-code-"+index} value={value.code}>{value.code+' ('+value.country_code+')'}</option>
										))}							
									</select>
								</div>
								<input className="form-control" name="telephone" type="text" id="Telephone" placeholder="Telephone"
									value={formik.values.telephone}
									onChange={formik.handleChange} 
									onBlur={formik.handleBlur}
									onKeyPress={(event)=>handelPhoneInput(event)}
								>                    
								</input>
							</div>
		                  	{formik.touched.telephone && formik.errors.telephone ? <span className="error" style={{color:'red'}}>{formik.errors.telephone}</span> : null}						                                          
		                </div>
						<div className='col-sm-6 mb-2'>
							<select className="form-select" name="country" id="country"  aria-label="Country" 
								value={formik.values.country}
								onChange={formik.handleChange} 
								onBlur={formik.handleBlur}>	
								<option value="" disabled defaultValue>United States</option>					
								{CountyCodes.map((country, index) => (  
									<option key={"country-"+index} value={country.country_name}>{country.country_name}</option>
								))}							
							</select>
							{formik.touched.country && formik.errors.country ? <span className="error" style={{color:'red'}}>{formik.errors.country}</span> : null}
						
						</div>
						<div className='col-sm-6 mb-2'>
							<input className="form-control" name="city" type="text" id="City" placeholder="City"
								value={formik.values.city}
								onChange={formik.handleChange} 
								onBlur={formik.handleBlur} 
							/>
							{formik.touched.city && formik.errors.city ? <span className="error" style={{color:'red'}}>{formik.errors.city}</span> : null}
 
						</div>
						<div className='col-sm-6 mb-2'>
							<input className="form-control" name="zip_code" type="text" id="Zip_Code" placeholder="Zip Code"
								value={formik.values.zip_code}
								onChange={formik.handleChange} 
								onBlur={formik.handleBlur} 
							/>
							{formik.touched.zip_code && formik.errors.zip_code ? <span className="error" style={{color:'red'}}>{formik.errors.zip_code}</span> : null}
 
						</div>
						<div className='col-sm-6 mb-2'>
							<input className="form-control" name="street" type="text" id="street" placeholder="Street"
								value={formik.values.street}
								onChange={formik.handleChange} 
								onBlur={formik.handleBlur} 
							/> 
							{formik.touched.street && formik.errors.street ? <span className="error" style={{color:'red'}}>{formik.errors.street}</span> : null}
						</div>
						<div className="col-sm-12 mb-2">
		                  <input className="form-control" name="additional_info" type="text" id="Address" placeholder="Additional Info"
		                    value={formik.values.additional_info}
		                    onChange={formik.handleChange} 
		                    onBlur={formik.handleBlur} /> 
		                </div>
		                <div className="col-sm-12 mb-2">
			                <select id="subject" className="form-select" name="subject" required
						    	value={formik.values.subject}
						    	onChange={formik.handleChange} 
						    	onBlur={formik.handleBlur}						    >
						    	<option value="" disabled defaultValue>Choose subject *</option>
						        <option value="Technical">Technical</option>
						        <option value="Material">Material</option>
						        <option value="Design">Design</option>
						        <option value="Price">Price</option>
						        <option value="Price">Type</option>
						    </select>
						    {formik.touched.subject && formik.errors.subject ? <span className="error" style={{color:'red'}}>{formik.errors.subject}</span> : null}
						</div>
		                <div className="col-sm-12 mb-2">
		                	<textarea className="form-control" rows="1" name="concern" type="textarea" id="Concern" placeholder="Type Your Concern"
		                    	value={formik.values.concern}
		                    	onChange={formik.handleChange} 
		                    	onBlur={formik.handleBlur}>                    
		                  	</textarea>								                					                  
		                </div>
		                <div className="col-sm-12 mb-2">
			                <div className="field-wrap form-check">
			                	<label className="form-check-label" htmlFor="terms_nd_condition">I have read and agreed to all the <a className="link text-blue" href="/terms-of-use">terms of use </a> and <a className="link text-blue" href="/privacy-policy">privacy policy</a>.</label>
				                <input className="form-check-input" type="checkbox" name="terms_nd_condition" id="terms_nd_condition"
				                  checked={formik.values.terms_nd_condition}
				                  value={formik.values.terms_nd_condition}
				                  onChange={formik.handleChange} 
				                  onBlur={formik.handleBlur}
				                />                   
				            </div>
				        </div>

				        <div className="mt-3 col-sm-12 col-md-2 col-lg-3 mb-2 text-center text-md-start">
							<div className='animated-btn-warp'>
								<button type='submit' className='btn rounded-blue' disabled={isdisabled!==undefined && isdisabled===true?true:false}>
									<span className='d-flex align-items-center justify-content-center'> <span className='me-2 text'>Send</span> <RightArrow color='white' /></span>
									<span className='line-1'></span>
									<span className='line-2'></span>
									<span className='line-3'></span>
									<span className='line-4'></span>
								</button>
							</div>
		                </div>
		                <div className="mt-3 col-sm-12 col-md-8 col-lg-8 mb-2 text-center text-md-start">
		                	{message?(
		                		<>
		                			{successful===true ?(
			                			<div className="alert-success mb-2">{message}</div>
					                ):(
					                	<div className="alert-danger mb-2">{message}</div>
					              	)}
		                		</>
		                	):('')}
			              	
			            </div>
		            </div>
	            </div>
	        </Form>	        
		</>
	);
}
export default EnquiryForm;