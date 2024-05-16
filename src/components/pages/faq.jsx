import React, {useEffect, useRef, useState} from 'react';
import AnimatedLink from '../templates/animatedLink';
import { Helmet, HelmetProvider } from "react-helmet-async";
import ImageBanner from '../templates/imageBanner';
import FaqQuesAns from '../templates/faq-ques-ans';
import { AngleDownXs } from '../svgIcons';
const FAQS= () =>{    
	const buyOnRef = useRef(null);
    const PaymentRef = useRef(null);    
    const ServiceMaintenanceRef = useRef(null);
    const WarrantyRef = useRef(null);
    const TechnicalFeaturesRef = useRef(null);
    const SpecialDiscountsRef = useRef(null);
    const [orderPartOne, setOrderPartOne] = useState(false);
    const [orderPartTwo, setOrderPartTwo] = useState(false);
    const [showMorePayment, setShowMorePayment] = useState(false);    
    const [techPartOne, setTechPartOne] = useState(false);
    const [techPartTwo, setTechPartTwo] = useState(false);
    const [showserviceMaintenance, setShowserviceMaintenance] = useState(false);
    const [showWarranty, setShowWarranty] = useState(false);   
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); 
    const executeScroll = (ref) => {
		ref.current.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'start', alignToTop: true});
	}
    const showOrderData=(event)=>{
        let element = event.currentTarget;
        element.clicks = (element.clicks || 0) + 1;        
        if(element.clicks===1){
            setOrderPartOne(true);
        }else if(element.clicks===2){
            setOrderPartTwo(true);
        }else{
            return;
        }        
    }
    const showTechData=(event)=>{
        let element = event.currentTarget;
        element.clicks = (element.clicks || 0) + 1;        
        if(element.clicks===1){
            setTechPartOne(true);
        }else if(element.clicks===2){
            setTechPartTwo(true);
        }else{
            return;
        }        
    }
    return(
        <>
            <HelmetProvider> <Helmet>
                <title>Frequently Asked Questions | Get Answers Here | Eisbach Watches</title>
                <link rel="canonical" href={process.env.REACT_APP_URL_CUSTOM+"faq"} />
                <link rel="alternate" hreflang="x-default" href={process.env.REACT_APP_URL+"faq"} />
                <meta name="description" content='Find answers to common questions about Eisbach Watches, from shipping and returns to warranty information. Get the information you need to make your decision' />
                <meta name="keywords" content="Eisbach, Payment, Service, Maintenance, Warranty, Technical, Discounts, trigalight, emergency"  ></meta>  
                <meta property="og:title" content="Frequently Asked Questions | Get Answers Here" />
                <meta property="og:type" content="website" />
				<meta property="og:description" content="Find answers to common questions about Eisbach Watches, from shipping and returns to warranty information. Get the information you need to make your decision" />
                <meta property="og:url" content={process.env.REACT_APP_URL_CUSTOM+"faq"}/> 
                <meta property="og:image" content="https://www.eisbachwatches.com/images/logo/eisbach-watches.png"></meta>            
            </Helmet></HelmetProvider>
            <div className='faq-bg'>
                <ImageBanner poster={'images/Faq-banner.webp'} title_first="Frequently " title_second="Asked Questions" title="Frequently Asked Questions" subTitle="FAQ" bgPosition="center" />
                <section>
                    <div className='site-container faq-warp'>
                        <h2 className='mt-4 title'>What are your opening hours?</h2>
                        <p>We are open six days a week: from Saturday to Thursday, from 9 am to 5 pm (GMT+3). We are closed on public holidays. Our phone lines are open six days a week: from Saturday to Thursday, from 9 am to 5 pm (GMT+3). </p>
                        <p className='mb-3'>If you would like to make an appointment, please email us at <a className='text-blue' target="_blank" rel="noreferrer nofollow" href="mailto:hello@eisbachwatches.com">hello@eisbachwatches.com</a> so we can book an appointment, and one of our Eisbach Team Members will be available to assist you.</p>

                        <div className="accordion accordion-flush pt-5 faq-accordion" id="FaqCategories">
                            <div className="accordion-item border-0">
                                <h2 className="accordion-header" id="chooseCat">
                                    <button className="accordion-button blue-bg collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#chooseCategory" aria-expanded="false" aria-controls="chooseCategory">Choose A Category </button>
                                </h2>
                                <div id="chooseCategory" className="accordion-collapse collapse" aria-labelledby="chooseCat" data-bs-parent="#FaqCategories">
                                    <div className="accordion-body">
                                        <ul className='pt-2 list-unstyled'>                                            
                                            <li className='link mb-3 d-flex align-items-center border-bottom' onClick={()=>executeScroll(buyOnRef)}>
                                                <h6 className='sec-title-sm'>Order online at Eisbachwatches.com</h6>                                                
                                            </li>
                                            <li className='link mb-3 d-flex align-items-center border-bottom' onClick={()=>executeScroll(PaymentRef)}>
                                                <h6 className='sec-title-sm'>Payment</h6>                                                
                                            </li>
                                            <li className='link mb-3 d-flex align-items-center border-bottom' onClick={()=>executeScroll(ServiceMaintenanceRef)}>
                                                <h6 className='sec-title-sm'>Service and Maintenance</h6>                                                
                                            </li>
                                            <li className='link mb-3 d-flex align-items-center border-bottom' onClick={()=>executeScroll(WarrantyRef)}>
                                                <h6 className='sec-title-sm'>Warranty</h6>                                                
                                            </li>
                                            <li className='link mb-3 d-flex align-items-center border-bottom' onClick={()=>executeScroll(TechnicalFeaturesRef)}>
                                                <h6 className='sec-title-sm'>Technical Features</h6>
                                            </li>
                                            <li className='link mb-0 d-flex align-items-center' onClick={()=>executeScroll(SpecialDiscountsRef)}>
                                                <h6 className='sec-title-sm'>Special Discounts</h6>
                                            </li>                                            
                                        </ul>                     
                                    </div>
                                </div>
                            </div>                    
                        </div>                        
                        <div ref={buyOnRef} id="buyOnWrap" className='mb-4 scroll-padding'>
                            <h2 className='mt-4 title'>Order online at <span ><a className='text-blue' href="https://www.eisbachwatches.com/">Eisbachwatches.com</a></span></h2>
                            <div className="accordion accordion-flush mt-3 faq-accordion" id="buyOnEisbach">
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="receiveOrderHeading">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#receiveOrder" aria-expanded="false" aria-controls="receiveOrder">How soon will I receive my order?</button>
                                    </h2>
                                    <div id="receiveOrder" className="accordion-collapse collapse" aria-labelledby="receiveOrderHeading" data-bs-parent="#buyOnEisbach">
                                        <div className="accordion-body">
                                            <p className='fw-300'>From the moment we confirm your order, we need two to five days to process your order. Once your package is ready to ship, we will send you an email with a tracking number.</p>
                                            <FaqQuesAns faqId="receiveOrder" />
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="orderDeliveredHeading">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#orderDelivered" aria-expanded="false" aria-controls="orderDelivered">How will my order be delivered? </button>
                                    </h2>
                                    <div id="orderDelivered" className="accordion-collapse collapse" aria-labelledby="orderDeliveredHeading" data-bs-parent="#buyOnEisbach">
                                        <div className="accordion-body">
                                            <p>For security reasons, we ship all packages in unbranded shipping boxes. Your signature is required upon receipt of the shipment.</p>
                                            <FaqQuesAns faqId="orderDelivered" />    
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="shippingCompanyHeading">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#shippingCompany" aria-expanded="false" aria-controls="shippingCompany">Which shipping company do you use?</button>
                                    </h2>
                                    <div id="shippingCompany" className="accordion-collapse collapse" aria-labelledby="shippingCompanyHeading" data-bs-parent="#buyOnEisbach">
                                        <div className="accordion-body">
                                            <p>We are proud to partner with DHL to provide exceptional service and fast delivery. For this reason, your signature is required upon receipt of the shipment (or an alternative in accordance with applicable COVID-19 regulations).</p>    
                                            <FaqQuesAns faqId="shippingCompany" />
                                        </div>
                                    </div>
                                </div> 
                                {orderPartOne===true?(<>                                                               
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="trackOrderHeading">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#trackOrder" aria-expanded="false" aria-controls="trackOrder">Can I track my order? </button>
                                    </h2>
                                    <div id="trackOrder" className="accordion-collapse collapse" aria-labelledby="trackOrderHeading" data-bs-parent="#buyOnEisbach">
                                        <div className="accordion-body">
                                            <p>We will email you as soon as your package is ready for shipment. This email will contain a DHL tracking number and a link to follow the shipment's progress on the DHL website.</p>   
                                            <FaqQuesAns faqId="trackOrder"  /> 
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="pickUpOrderHeading">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#pickUpOrder" aria-expanded="false" aria-controls="pickUpOrder">Can I pick up my online order at your office?  </button>
                                    </h2>
                                    <div id="pickUpOrder" className="accordion-collapse collapse" aria-labelledby="pickUpOrderHeading" data-bs-parent="#buyOnEisbach">
                                        <div className="accordion-body">
                                            <p>Of course. You are welcome to visit us during our open hours.</p> 
                                            <FaqQuesAns faqId="pickUpOrder" />    
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="changeDeliveryDateHeading">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#changeDeliveryDate" aria-expanded="false" aria-controls="changeDeliveryDate">Can I change the delivery date?</button>
                                    </h2>
                                    <div id="changeDeliveryDate" className="accordion-collapse collapse" aria-labelledby="changeDeliveryDateHeading" data-bs-parent="#buyOnEisbach">
                                        <div className="accordion-body">
                                            <p>Using our carrier's tracking number, you can track the package and change the delivery date if necessary.</p> 
                                            <FaqQuesAns faqId="changeDeliveryDate" />   
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="changeDeliveryAddressH">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#changeDeliveryAddress" aria-expanded="false" aria-controls="changeDeliveryAddress">Can I change my delivery address?</button>
                                    </h2>
                                    <div id="changeDeliveryAddress" className="accordion-collapse collapse" aria-labelledby="changeDeliveryAddressH" data-bs-parent="#buyOnEisbach">
                                        <div className="accordion-body">
                                            <p>After your order is confirmed, we cannot change the mailing address for security reasons.</p>  
                                            <FaqQuesAns faqId="changeDeliveryAddress" />  
                                        </div>
                                    </div>
                                </div>
                                </>):''}
                                {orderPartTwo===true?(<>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="cancelOrderHeading">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#cancelOrder" aria-expanded="false" aria-controls="cancelOrder">Can I change or cancel my order? </button>
                                    </h2>
                                    <div id="cancelOrder" className="accordion-collapse collapse" aria-labelledby="cancelOrderHeading" data-bs-parent="#buyOnEisbach">
                                        <div className="accordion-body">
                                            <p>Once your order is confirmed, we cannot make changes due to security reasons.</p> 
                                            <FaqQuesAns  faqId="cancelOrder" />   
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="preOrderPurchaseHeading">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#preOrderPurchase" aria-expanded="false" aria-controls="preOrderPurchase">What is a pre-order purchase?</button>
                                    </h2>
                                    <div id="preOrderPurchase" className="accordion-collapse collapse" aria-labelledby="preOrderPurchaseHeading" data-bs-parent="#buyOnEisbach">
                                        <div className="accordion-body">
                                            <p>Our products may occasionally be unavailable. A pre-order means that the product is currently unavailable, but we will have it in stock soon. The date indicated on the pre-order is the estimated date the product will be available. If this date changes, we will get in touch with you with a new estimate.</p>  
                                            <p>The transaction is instantaneous when you order a model currently on pre-order, and your account will be charged.</p> 
                                            <FaqQuesAns faqId="preOrderPurchase" /> 
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="returnOrderHeading">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#returnOrder" aria-expanded="false" aria-controls="returnOrder">Can I return my purchase? What is the return period? How do I return an order and get a refund?</button>
                                    </h2>
                                    <div id="returnOrder" className="accordion-collapse collapse" aria-labelledby="returnOrderHeading" data-bs-parent="#buyOnEisbach">
                                        <div className="accordion-body">
                                            <p>After delivery, we hope you like your new Eisbach watch or strap, but if you change your mind for any reason, you may write us at <a className='text-blue' target="_blank" rel="noreferrer nofollow" href="mailto:hello@eisbachwatches.com">hello@eisbachwatches.com</a> and ask for a refund within 14 days of the delivery date. We provide DHL return services and will give you pre-paid return labels.</p>  
                                            <p>The transaction is instantaneous when you order a model currently on pre-order, and your account will be charged.</p>
                                            <FaqQuesAns faqId="returnOrder" />  
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="contactForOrderHeading">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#contactForOrder" aria-expanded="false" aria-controls="contactForOrder">Who can I contact for questions about my order? </button>
                                    </h2>
                                    <div id="contactForOrder" className="accordion-collapse collapse" aria-labelledby="contactForOrderHeading" data-bs-parent="#buyOnEisbach">
                                        <div className="accordion-body">
                                            <p>You can contact us by phone or email at <a className='text-blue' target="_blank" rel="noreferrer nofollow" href="mailto:hello@eisbachwatches.com">hello@eisbachwatches.com</a> if you have any questions.</p> 
                                            <FaqQuesAns faqId="contactForOrder" /> 
                                        </div>
                                    </div>
                                </div>
                                </>):''}
                            </div>
                            {orderPartOne===false || orderPartTwo===false ?(
                                <div className='text-center'>
                                    <button type='button' className="btn view-more btn-transparent me-2 text-uppercase" onClick={(e)=>showOrderData(e)}>
                                        <span>More Results</span> 
                                        <span className='circle'><AngleDownXs /></span>
                                    </button>
                                </div>
                            ):''}                       
                        </div>
                        <div ref={PaymentRef} id="PaymentWarp" className='mb-4 scroll-padding'>
                            <h2 className='mt-4 title'>Pay<span className='text-blue'>ment</span></h2>
                            <div className="accordion accordion-flush mt-3 faq-accordion" id="Payment">
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="securedPaymentHeading">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#securedPayment" aria-expanded="false" aria-controls="securedPayment">How do I know that my payment is secured?</button>
                                    </h2>
                                    <div id="securedPayment" className="accordion-collapse collapse" aria-labelledby="securedPaymentHeading" data-bs-parent="#PaymentWarp">
                                        <div className="accordion-body">
                                            <p>Your personal information is safeguarded by Eisbach Watches using administrative, technological, and physical methods to prevent loss, theft, and abuse, as well as unauthorized access, disclosure, modification, and destruction. Eisbach Watches use Secure Sockets Layer (SSL) encryption whenever personal data is gathered online. However, keep in mind that sending data via the Internet is not entirely safe. Eisbach Watches will take reasonable precautions and place security measures to secure your personal information. Still, we cannot ensure the security of any information you communicate to the website. If you send any information at your own risk, Eisbach Watches will not be held responsible. To find out more about how we use and safeguard your data, see our Privacy Policy.</p>
                                            <p>All holders of credit/debit cards are subject to validation, verification, and authorization checks by the card issuer. Contact your card issuer immediately to fix the situation if they have not let you pay Eisbach Watches with your payment card.</p> 
                                            <FaqQuesAns faqId="securedPayment" />                   
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="SecureThreeDH">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#SecureThreeD" aria-expanded="false" aria-controls="SecureThreeD">What is 3D secure?</button>
                                    </h2>
                                    <div id="SecureThreeD" className="accordion-collapse collapse" aria-labelledby="SecureThreeDH" data-bs-parent="#PaymentWarp">
                                        <div className="accordion-body">
                                            <p>If you pay with a credit or debit card, your bank might need 3D Secure verification to verify your identity.</p>
                                            <p>How does it function? You could be transferred to a 3D Secure authentication page throughout the ordering process, where you'll be prompted to verify your identity using a contact method you've given to your bank. You will be directly sent to your Eisbach Watches order confirmation page after verifying your payment. You'll get an email as soon as your order is accepted.</p>  
                                            <FaqQuesAns faqId="SecureThreeD" />  
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="confirmIdentityH">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#confirmIdentity" aria-expanded="false" aria-controls="confirmIdentity">How will my bank confirm my identity?</button>
                                    </h2>
                                    <div id="confirmIdentity" className="accordion-collapse collapse" aria-labelledby="confirmIdentityH" data-bs-parent="#PaymentWarp">
                                        <div className="accordion-body">
                                            <p>Please get in touch with your bank to understand their 3D Secure authentication procedure and confirm that they have your most recent contact information.</p>  
                                            <FaqQuesAns faqId="confirmIdentity" />  
                                        </div>
                                    </div>
                                </div>
                                {showMorePayment===true?(<>
                                    <div className="accordion-item border-0">
                                        <h2 className="accordion-header" id="OrderPlacementIssueH">
                                            <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#OrderPlacementIssue" aria-expanded="false" aria-controls="confiOrderPlacementIssuermIdentity">What should I do if I am having issues with placing the order?</button>
                                        </h2>
                                        <div id="OrderPlacementIssue" className="accordion-collapse collapse" aria-labelledby="OrderPlacementIssueH" data-bs-parent="#PaymentWarp">
                                            <div className="accordion-body">
                                                <p>You can always call or email Eisbach Watches at <a className='text-blue' target="_blank" rel="noreferrer nofollow" href="mailto:hello@eisbachwatches.com">hello@eisbachwatches.com</a> as an alternative to online shopping.</p> 
                                                <FaqQuesAns faqId="OrderPlacementIssue" />   
                                            </div>
                                        </div>
                                    </div> 
                                    <div className="accordion-item border-0">
                                        <h2 className="accordion-header" id="refundPolicyH">
                                            <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#refundPolicy" aria-expanded="false" aria-controls="refundPolicy">What is the refund policy? </button>
                                        </h2>
                                        <div id="refundPolicy" className="accordion-collapse collapse" aria-labelledby="refundPolicyH" data-bs-parent="#PaymentWarp">
                                            <div className="accordion-body">
                                                <p>Eisbach Watches will check that the returned Eisbach Watches product complies with the terms of the return policies after receiving a return. Eisbach Watches will enforce strict quality control. The Eisbach Watches products will be returned to the customer or the gift recipient, as appropriate, if the products do not pass quality control criteria. Eisbach Watches may also refuse the return or provide a partial refund.</p> 
                                                <p>Eisbach Watches will conduct the required refund if the returned product passes the quality check. This procedure may take up to 14 days.</p>  
                                                <FaqQuesAns faqId="refundPolicy" /> 
                                            </div>
                                        </div>
                                    </div> 
                                    <div className="accordion-item border-0">
                                        <h2 className="accordion-header" id="deleteAccountH">
                                            <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#deleteAccount" aria-expanded="false" aria-controls="deleteAccount">How can I close and delete my Eisbach Watches account?</button>
                                        </h2>
                                        <div id="deleteAccount" className="accordion-collapse collapse" aria-labelledby="deleteAccountH" data-bs-parent="#PaymentWarp">
                                            <div className="accordion-body">
                                                <p>For more information on this matter, please email us at <a className='text-blue' target="_blank" rel="noreferrer nofollow" href="mailto:hello@eisbachwatches.com">hello@eisbachwatches.com</a> or call us by phone.</p>
                                                <FaqQuesAns faqId="deleteAccount" />    
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item border-0">
                                        <h2 className="accordion-header" id="importdutiesH">
                                            <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#importduties" aria-expanded="false" aria-controls="importduties">Will I pay import duties or taxes on orders delivered outside Bahrain?</button>
                                        </h2>
                                        <div id="importduties" className="accordion-collapse collapse" aria-labelledby="importdutiesH" data-bs-parent="#PaymentWarp">
                                            <div className="accordion-body">
                                                <p>Our delivery fees worldwide include the cost of shipping the products to you. This does not include import duties and administrative expenses for clearing the products upon entry into your country.</p>
                                                <p>The buyer should be aware of potential fees and pay any applicable import tax and duty before the products are delivered to their country. If merchandise is returned to Eisbach Watches as a consequence of a payment being declined, all following fees, such as import duties and processing fees, will be subtracted from any refund given. Don't hesitate to get in touch with us at <a className='text-blue' target="_blank" rel="noreferrer nofollow" href="mailto:hello@eisbachwatches.com">hello@eisbachwatches.com</a> or the customs office in your country for further information on this.</p> 
                                                <FaqQuesAns faqId="importduties" />   
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item border-0">
                                        <h2 className="accordion-header" id="chargedVATHeading">
                                            <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#chargedVAT" aria-expanded="false" aria-controls="chargedVAT">Will I be charged VAT?</button>
                                        </h2>
                                        <div id="chargedVAT" className="accordion-collapse collapse" aria-labelledby="chargedVATHeading" data-bs-parent="#PaymentWarp">
                                            <div className="accordion-body">
                                                <p>Where appropriate, any orders sent to Bahrain will automatically be charged 10% Bahrain VAT. Per Bahrain Customs and Excise regulations, orders shipped to locations outside Bahrain are free from paying VAT. We will not honor requests to add an inaccurate value on a customs invoice, since we cannot do so. All additional import taxes and duties on items shipped to the buyer's country are the responsibility of the buyer. Any additional fees will be deducted from any refund given if merchandise is returned to Eisbach Watches as a consequence of payment being rejected.</p> 
                                                <FaqQuesAns faqId="chargedVAT" />   
                                            </div>
                                        </div>
                                    </div>
                                </>):''}                                      
                            </div>
                            {showMorePayment===false?(
                                <div className='text-center'>
                                    <button type='button' className="btn view-more btn-transparent me-2 text-uppercase" onClick={()=>setShowMorePayment(true)}>
                                        <span>More Results</span> 
                                        <span className='circle'><AngleDownXs /></span>
                                    </button>
                                </div>
                            ):''}                           
                        </div>
                        <div ref={ServiceMaintenanceRef} id="ServiceWarp" className='mb-4 scroll-padding'>
                            <h2 className='mt-4 title'>Service and<span className='text-blue'> Maintenance</span></h2>
                            <div className="accordion accordion-flush mt-3 faq-accordion" id="ServiceMaintenance">
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="WatchServicedH">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#WatchServiced" aria-expanded="false" aria-controls="WatchServiced">How frequently should I have my watch serviced?</button>
                                    </h2>
                                    <div id="WatchServiced" className="accordion-collapse collapse" aria-labelledby="WatchServicedH" data-bs-parent="#ServiceMaintenance">
                                        <div className="accordion-body">
                                            <p>Your watch can keep its functionality and reliability over time with regular, well-executed maintenance. Increase the lifespan of your timepiece and protect your investment by following the service deadlines advised by Eisbach Watches and making sure that the Eisbach Watches service facility carries out servicing. We advise a maintenance service every two years, which involves cleaning the case and metal bracelet, replacing all gaskets, testing the water resistance, and inspecting the movement parameters and watch functions.</p>
                                            <p>We recommend a full service every four to six years. It includes disassembling, cleaning, and replacing standard parts of the movement (e.g., some hands), reassembling, lubricating, adjusting, and setting the functional parameters of the movement, as well as replacing all gaskets and testing water resistance. The full service also includes cleaning and refurbishing* the metal bracelet, if necessary. *Excludes models with DLC surface treatments.</p>
                                            <FaqQuesAns faqId="WatchServiced" />                   
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="RepairMaintenanceH">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#RepairMaintenance" aria-expanded="false" aria-controls="RepairMaintenance">Where can I send my Eisbach watch if it requires repair or maintenance? </button>
                                    </h2>
                                    <div id="RepairMaintenance" className="accordion-collapse collapse" aria-labelledby="RepairMaintenanceH" data-bs-parent="#ServiceMaintenance">
                                        <div className="accordion-body">
                                            <p>For further assistance, please email us at <a className='text-blue' target="_blank" rel="noreferrer nofollow" href="mailto:service@eisbachwatches.com">service@eisbachwatches.com</a> or call our Eisbach Watches Team by phone.</p>
                                            <FaqQuesAns faqId="RepairMaintenance" />   
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="SerialNumberHeading">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#SerialNumber" aria-expanded="false" aria-controls="SerialNumber">What is a serial number?</button>
                                    </h2>
                                    <div id="SerialNumber" className="accordion-collapse collapse" aria-labelledby="SerialNumberHeading" data-bs-parent="#ServiceMaintenance">
                                        <div className="accordion-body">
                                            <p>You may identify your watch by using its serial number, which is an identification number. It can be found on the case back of your watch or on the Watch documents you have received with your watch purchase, such as the certificate of international warranty. </p> 
                                            <FaqQuesAns faqId="SerialNumber" />   
                                        </div>
                                    </div>
                                </div>
                                {showserviceMaintenance===true?(<>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="ReferenceNumberH">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#ReferenceNumber" aria-expanded="false" aria-controls="ReferenceNumber">What is a reference number?</button>
                                    </h2>
                                    <div id="ReferenceNumber" className="accordion-collapse collapse" aria-labelledby="ReferenceNumberH" data-bs-parent="#ServiceMaintenance">
                                        <div className="accordion-body">
                                            <p>A reference number identifies each Eisbach watch model. The reference number can be found on the case back, or on the Watch documents you have received with your watch purchase, such as the certificate of international warranty.</p> 
                                            <FaqQuesAns faqId="ReferenceNumber" />   
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="GenuineWatchHeading">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#GenuineWatch" aria-expanded="false" aria-controls="GenuineWatch">How can I be sure that I am buying a genuine Eisbach Watch? </button>
                                    </h2>
                                    <div id="GenuineWatch" className="accordion-collapse collapse" aria-labelledby="GenuineWatchHeading" data-bs-parent="#ServiceMaintenance">
                                        <div className="accordion-body">
                                            <p>Our online shop sells only genuine Eisbach timepieces. All Eisbach watches have a distinctive serial number that can be compared to the watch's model reference by contacting us at <a className='text-blue' target="_blank" rel="noreferrer nofollow" href="mailto:service@eisbachwatches.com">service@eisbachwatches.com</a>.</p>
                                            <FaqQuesAns faqId="GenuineWatch" />    
                                        </div>
                                    </div>
                                </div>
                                </>):(
                                    <div className='text-center'>
                                        <button type='button' className="btn view-more btn-transparent me-2 text-uppercase" onClick={()=>setShowserviceMaintenance(true)}>
                                            <span>More Results</span> 
                                            <span className='circle'><AngleDownXs /></span>
                                        </button>
                                    </div>
                                )}                                   
                            </div>                            
                        </div>
                        <div ref={WarrantyRef} id="WarrantyWarp" className='mb-4 scroll-padding'>
                            <h2 className='mt-4 title'>War<span className='text-blue'>ranty</span></h2>
                            <div className="accordion accordion-flush mt-3 faq-accordion" id="WarranntyFaqs">
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="WarrantyTimePeriodH">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#WarrantyTimePeriod" aria-expanded="false" aria-controls="WarrantyTimePeriod">How long do you give Warranty on your Watches?</button>
                                    </h2>
                                    <div id="WarrantyTimePeriod" className="accordion-collapse collapse" aria-labelledby="WarrantyTimePeriodH" data-bs-parent="#WarranntyFaqs">
                                        <div className="accordion-body">
                                            <p>At Eisbach Watches, we provide a limited warranty of 5 years for all our Watches and Steel Straps. </p>
                                            <FaqQuesAns faqId="WarrantyTimePeriod" />                   
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="WarrantyCoversH">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#WarrantyCovers" aria-expanded="false" aria-controls="WarrantyCovers">What does your Warranty covers? </button>
                                    </h2>
                                    <div id="WarrantyCovers" className="accordion-collapse collapse" aria-labelledby="WarrantyCoversH" data-bs-parent="#WarranntyFaqs">
                                        <div className="accordion-body">
                                            <p>Our Warranty covers any defects in materials or workmanship (“Manufacturer’s Defect”).</p>
                                            <FaqQuesAns faqId="WarrantyCovers" />   
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="WarrantyValidH">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#WarrantyValid" aria-expanded="false" aria-controls="WarrantyValid">Where is your Warrany valid?</button>
                                    </h2>
                                    <div id="WarrantyValid" className="accordion-collapse collapse" aria-labelledby="WarrantyValidH" data-bs-parent="#WarranntyFaqs">
                                        <div className="accordion-body">
                                            <p>Our warranty is a international valid limited Warranty.</p> 
                                            <FaqQuesAns faqId="WarrantyValid" />   
                                        </div>
                                    </div>
                                </div>
                                {showWarranty?(<>
                                    <div className="accordion-item border-0">
                                        <h2 className="accordion-header" id="WarrantyCoverH">
                                            <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#WarrantyCover" aria-expanded="false" aria-controls="WarrantyCover">What des your Warranty covers? </button>
                                        </h2>
                                        <div id="WarrantyCover" className="accordion-collapse collapse" aria-labelledby="WarrantyCoverH" data-bs-parent="#WarranntyFaqs">
                                            <div className="accordion-body">
                                                <p>We will repair or replace (at our discretion, with an identical or reasonably equivalent style), free of charge including shipping costs, any component that our service team finds to be a Manufacturer’s Defect. </p> 
                                                <FaqQuesAns faqId="WarrantyCover" />   
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item border-0">
                                        <h2 className="accordion-header" id="WarrantyNotCoversH">
                                            <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#WarrantyNotCovers" aria-expanded="false" aria-controls="WarrantyNotCovers">What is not covered by this warranty?</button>
                                        </h2>
                                        <div id="WarrantyNotCovers" className="accordion-collapse collapse" aria-labelledby="WarrantyNotCoversH" data-bs-parent="#WarranntyFaqs">
                                            <div className="accordion-body">
                                                <p>This limited Warranty does not cover or apply to:  normal wear and tear, accident, abuse, neglect, blows, shocks, crushing, improper use or storage, incidental and consequential damages, Straps other than metal bracelets, tampering, unauthorized modifications or repairs, and of course loss or theft.</p>
                                                <FaqQuesAns faqId="WarrantyNotCovers" />    
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item border-0">
                                        <h2 className="accordion-header" id="WarrantyClaimsH">
                                            <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#WarrantyClaims" aria-expanded="false" aria-controls="WarrantyClaims">How do we handle claims?</button>
                                        </h2>
                                        <div id="WarrantyClaims" className="accordion-collapse collapse" aria-labelledby="WarrantyClaimsH" data-bs-parent="#WarranntyFaqs">
                                            <div className="accordion-body">
                                                <p>Within 14 days of submission of your request (please provide Eisbach Watches with your original proof of purchase), we will evaluate your request and advise if our service team finds that the damage is covered under our warranty. </p>
                                                <p>If it is determined that your Eisbach Watch has a Manufacturer’s Defect, we will replace your Eisbach Watch at no cost to you.</p>
                                                <FaqQuesAns faqId="WarrantyClaims" />    
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item border-0">
                                        <h2 className="accordion-header" id="MakeClaimH">
                                            <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#MakeClaim" aria-expanded="false" aria-controls="MakeClaim">How to make a claim?</button>
                                        </h2>
                                        <div id="MakeClaim" className="accordion-collapse collapse" aria-labelledby="MakeClaimH" data-bs-parent="#WarranntyFaqs">
                                            <div className="accordion-body">
                                                <p>If you want to submit a claim, please contact us at <a className='text-blue' target="_blank" rel="noreferrer nofollow" href="mailto:hello@eisbachwatches.com">hello@eisbachwatches.com</a>.</p>
                                                <FaqQuesAns faqId="MakeClaim" />    
                                            </div>
                                        </div>
                                    </div> 
                                </>):(
                                    <div className='text-center'>
                                        <button type='button' className="btn view-more btn-transparent me-2 text-uppercase" onClick={()=>setShowWarranty(true)}>
                                            <span>More Results</span> 
                                            <span className='circle'><AngleDownXs /></span>
                                        </button>
                                    </div>
                                )}                                 
                            </div>                            
                        </div>                        
                        <div ref={TechnicalFeaturesRef} id="TechnicalFeaturesWarp" className='mb-4 scroll-padding'>
                            <h2 className='mt-4 title'>Technical<span className='text-blue'> Features</span></h2>
                            <div className="accordion accordion-flush mt-3 faq-accordion" id="TechnicalFeatures">
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="MaxWaterResistH">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#MaxWaterResist" aria-expanded="false" aria-controls="MaxWaterResist">What is the maximum water resistance of your watches?</button>
                                    </h2>
                                    <div id="MaxWaterResist" className="accordion-collapse collapse" aria-labelledby="MaxWaterResistH" data-bs-parent="#TechnicalFeatures">
                                        <div className="accordion-body">
                                            <p>You'd be ecstatic to know that you can go swimming, snorkeling, or diving with your Eisbach watch without fear of water damage.</p>
                                            <p>Our TIDRON E1 Models are waterproof up to 30 ATM/1000 ft/300m depth and the TIDRON UT 360GM-T Models up to 50 ATM/1650 ft/500m depth The water depths always concern the maximum guaranteed static compressive stress test that the Eisbach Watch can withstand.</p> 
                                            <FaqQuesAns faqId="MaxWaterResist" />                  
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="PIlluminationH">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#PIllumination" aria-expanded="false" aria-controls="PIllumination">What is Tritium H3 trigalight permanent illumination?</button>
                                    </h2>
                                    <div id="PIllumination" className="accordion-collapse collapse" aria-labelledby="PIlluminationH" data-bs-parent="#TechnicalFeatures">
                                        <div className="accordion-body">
                                            <p>In order to read the time in low light conditions, our Tidron "T" models are equipped with trigalight illumination, widely regarded as the world's best permanent and most reliable form of illumination for watches.</p>   
                                            <FaqQuesAns faqId="PIllumination" /> 
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="BlueIlluminationH">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#BlueIllumination" aria-expanded="false" aria-controls="BlueIllumination">Why are you using mainly blue illuminations? </button>
                                    </h2>
                                    <div id="BlueIllumination" className="accordion-collapse collapse" aria-labelledby="BlueIlluminationH" data-bs-parent="#TechnicalFeatures">
                                        <div className="accordion-body">
                                            <p>Eisbach Tidron “T” watches are equipped with blue illumination - desirable in a diver’s watch.</p>
                                            <p>The blue light remains visible to a greater depth underwater than green.</p>
                                            <FaqQuesAns faqId="BlueIllumination" />    
                                        </div>
                                    </div>
                                </div>
                                {techPartOne===true?(<>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="SafeIlluminationH">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#SafeIllumination" aria-expanded="false" aria-controls="SafeIllumination">Is Tritium illumination safe?</button>
                                    </h2>
                                    <div id="SafeIllumination" className="accordion-collapse collapse" aria-labelledby="SafeIlluminationH" data-bs-parent="#TechnicalFeatures">
                                        <div className="accordion-body">
                                            <p>You do not need to worry because tritium illumination is completely safe. The radiation emitted by tritium is so low that it is absolutely harmless to humans.</p>
                                            <p>Eisbach watches source tritium illumination from the Swiss company "trigalight-mb-microtec“, the founders and market leaders of tritium illumination technology.</p>
                                            <FaqQuesAns faqId="SafeIllumination" />  
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="permanentIlluminationH">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#permanentIllumination" aria-expanded="false" aria-controls="permanentIllumination">Is the trigalight illumination permanent? </button>
                                    </h2>
                                    <div id="permanentIllumination" className="accordion-collapse collapse" aria-labelledby="permanentIlluminationH" data-bs-parent="#TechnicalFeatures">
                                        <div className="accordion-body">
                                            <p>Yes, trigalight provides permanent illumination in the dark, unlike standard illuminations such as Super LumiNova that need to be exposed to light to charge and glow for several hours.</p> 
                                            <FaqQuesAns faqId="permanentIllumination" />   
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="T25T100H">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#T25T100" aria-expanded="false" aria-controls="T25T100">What is the difference between T25 and T 100? </button>
                                    </h2>
                                    <div id="T25T100" className="accordion-collapse collapse" aria-labelledby="T25T100H" data-bs-parent="#TechnicalFeatures">
                                        <div className="accordion-body">
                                            <p>The symbol "T" indicates the total amount of radioactive material measured in millicuries.</p>
                                            <p>Eisbach has T25 and T100 Tritium watches in its offer.</p>  
                                            <FaqQuesAns faqId="T25T100" />
                                        </div>
                                    </div>
                                </div>                                
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="SLIlluminationH">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#SLIllumination" aria-expanded="false" aria-controls="SLIllumination">Do you also manufacture watches with Super-LumiNova Illumination?</button>
                                    </h2>
                                    <div id="SLIllumination" className="accordion-collapse collapse" aria-labelledby="SLIlluminationH" data-bs-parent="#TechnicalFeatures">
                                        <div className="accordion-body">
                                            <p>Yes, on our Tidron WAI and Black Sea Diver S-Line in BGW9.</p>
                                            <p>Besides serving an important practical function – illumination- Super-LumiNova also gives every watch an artistic edge.</p>
                                            <p>Containing no radioactive material, Super-LumiNova must be charged to emit light.</p>
                                            <p>The portion of your watch that is overlaid using the highest level of Super-Luminova will begin to glow in the dark.</p> 
                                            <FaqQuesAns faqId="SLIllumination" />  
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="SLChargingH">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#SLCharging" aria-expanded="false" aria-controls="SLCharging">How many times can Super-LumiNova be charged? </button>
                                    </h2>
                                    <div id="SLCharging" className="accordion-collapse collapse" aria-labelledby="SLChargingH" data-bs-parent="#TechnicalFeatures">
                                        <div className="accordion-body">
                                            <p>Super-LumiNova can be charged multiple times without limit. </p>
                                            <p>Super-LumiNova’s bright and long-lasting light depends on the amount of light exposure the watch can absorb and recharge.</p>  
                                            <FaqQuesAns faqId="SLCharging" />  
                                        </div>
                                    </div>
                                </div>                                
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="GlowAsPicturesH">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#GlowAsPictures" aria-expanded="false" aria-controls="GlowAsPictures">Will my watch glow as shown in the pictures?</button>
                                    </h2>
                                    <div id="GlowAsPictures" className="accordion-collapse collapse" aria-labelledby="GlowAsPicturesH" data-bs-parent="#TechnicalFeatures">
                                        <div className="accordion-body">
                                            <p>On our website, we showcase our items using both photography and computer-generated visuals. We've done everything we can to represent the colors and lighting correctly and fairly. Please be aware that depending on your screen's settings and resolution, actual items can differ somewhat.</p>
                                            <p>Please get in touch with us by email at <a className='text-blue' target="_blank" rel="noreferrer nofollow" href="mailto:hello@eisbachwatches.com">hello@eisbachwatches.com</a> if you have any concerns about this.</p> 
                                            <FaqQuesAns faqId="GlowAsPictures" />  
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="DLCCoatingH">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#DLCCoating" aria-expanded="false" aria-controls="DLCCoating">What is DLC coating?</button>
                                    </h2>
                                    <div id="DLCCoating" className="accordion-collapse collapse" aria-labelledby="DLCCoatingH" data-bs-parent="#TechnicalFeatures">
                                        <div className="accordion-body">
                                            <p>Our DLC coating (Diamond-Like Carbon) is an advanced thin-film coating method. </p>
                                            <p>Exploiting the inherent strengths of this method. We can produce thin films that combine the distinctive properties of two carbon allotropes: Diamond and Graphite.</p>
                                            <p>DLC coatings significantly improve hardness.</p>   
                                            <FaqQuesAns faqId="DLCCoating" />
                                        </div>
                                    </div>
                                </div>
                                </>):''}
                                {techPartTwo===true?(<>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="CrownLocatedH">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#CrownLocated" aria-expanded="false" aria-controls="CrownLocated">Why is the crown located at 4 o’clock?</button>
                                    </h2>
                                    <div id="CrownLocated" className="accordion-collapse collapse" aria-labelledby="CrownLocatedH" data-bs-parent="#TechnicalFeatures">
                                        <div className="accordion-body">
                                            <p>The Eisbach Tidron crown is situated at 4 o'clock to prevent pressure on the back of the diver's hand.</p> 
                                            <FaqQuesAns faqId="CrownLocated" />  
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="DateWindowH">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#DateWindow" aria-expanded="false" aria-controls="DateWindow">Why is the date window at 4 o’clock? </button>
                                    </h2>
                                    <div id="DateWindow" className="accordion-collapse collapse" aria-labelledby="DateWindowH" data-bs-parent="#TechnicalFeatures">
                                        <div className="accordion-body">
                                            <p>Well, it improves readability. To afford the eye some relief while focusing, we have deliberately avoided intrusive printing in the vicinity of this area. </p>  
                                            <FaqQuesAns faqId="DateWindow" /> 
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="ResistantBezelH">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#ResistantBezel" aria-expanded="false" aria-controls="ResistantBezel">Is your Bezel wear-resistant? </button>
                                    </h2>
                                    <div id="ResistantBezel" className="accordion-collapse collapse" aria-labelledby="ResistantBezelH" data-bs-parent="#TechnicalFeatures">
                                        <div className="accordion-body">
                                            <p>Our Tidron models have a unique diver ring installed. </p>
                                            <p>It is made from highly resilient and sea-water-resistant 316L Stainless Steel.</p>
                                            <p>A high wear-resistant Ceramic inlet is fitted in our Tidron E1 Black Sea Diver, Greenland Ice Diver, and Ice Fjord Diver, as well as in all UT 360GM-T Models. </p>  
                                            <FaqQuesAns faqId="ResistantBezel" /> 
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="BazelClicksH">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#BazelClicks" aria-expanded="false" aria-controls="BazelClicks">How many clicks does the bezel have?</button>
                                    </h2>
                                    <div id="BazelClicks" className="accordion-collapse collapse" aria-labelledby="BazelClicksH" data-bs-parent="#TechnicalFeatures">
                                        <div className="accordion-body">
                                            <p>The unidirectional aspect of the Tidron E1 Diver watches, and the bidirectional Tidron UT 360GM-T watches with 120 clicks of the ring ensure precision during the crucial decompression phases.</p> 
                                            <FaqQuesAns faqId="BazelClicks" />  
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="WhereMovementsMadeH">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#WhereMovementsMade" aria-expanded="false" aria-controls="WhereMovementsMade">Where are the movements made?</button>
                                    </h2>
                                    <div id="WhereMovementsMade" className="accordion-collapse collapse" aria-labelledby="WhereMovementsMadeH" data-bs-parent="#TechnicalFeatures">
                                        <div className="accordion-body">
                                            <p>We are using only high-quality and super reliable Swiss-made Movements. Our Tidron E1 series is equipped with the famous Sellita SW200-1 and the Tidron UT 360GM-T Models with the highly accurate Soprod C125 GMT engine. </p>
                                            <FaqQuesAns faqId="WhereMovementsMade" />   
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="HowAccurateEWHeading">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#HowAccurateEW" aria-expanded="false" aria-controls="HowAccurateEW">How accurate are Eisbach watches?</button>
                                    </h2>
                                    <div id="HowAccurateEW" className="accordion-collapse collapse" aria-labelledby="HowAccurateEWHeading" data-bs-parent="#TechnicalFeatures">
                                        <div className="accordion-body">
                                            <p>Our Tidron E1 automatic diving watches are powered by a Sellita SW200-1 movement. It is a Swiss movement that has a rate deviation of +/-12 seconds per day, according to the manufacturer.</p>
                                            <p>Our Tidron UT 360GM-T watches are powered by a Soprod C125 movement. It is a Swiss movement that has a rate deviation of +/-7 seconds per day in the R7 Elabore Edition, according to the manufacturer's specifications.</p>  
                                            <FaqQuesAns faqId="HowAccurateEW" /> 
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="FKMRubberH">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#FKMRubber" aria-expanded="false" aria-controls="FKMRubber">Why do you use FKM rubber for the straps? </button>
                                    </h2>
                                    <div id="FKMRubber" className="accordion-collapse collapse" aria-labelledby="FKMRubberH" data-bs-parent="#TechnicalFeatures">
                                        <div className="accordion-body">
                                            <p>At Eisbach Watches, we take our commitment to high-quality design and material all the way to your watch straps. That includes premium FKM Rubber! That's the most expensive Rubber material available because it is the best on the market.</p>  
                                            <FaqQuesAns faqId="FKMRubber" /> 
                                        </div>
                                    </div>
                                </div> 
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="AdditionalHelpH">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#AdditionalHelp" aria-expanded="false" aria-controls="GlowAAdditionalHelpsPictures">How do I change my strap or bracelet? </button>
                                    </h2>
                                    <div id="AdditionalHelp" className="accordion-collapse collapse" aria-labelledby="AdditionalHelpH" data-bs-parent="#TechnicalFeatures">
                                        <div className="accordion-body">
                                            <p>Although changing our straps is simple, if you need additional help, please call us by phone or email us at <a className='text-blue' target="_blank" rel="noreferrer nofollow" href="mailto:service@eisbachwatches.com">service@eisbachwatches.com</a>.</p> 
                                            <FaqQuesAns faqId="AdditionalHelp" />  
                                        </div>
                                    </div>
                                </div>
                                </>):''}                                   
                            </div>
                            {techPartOne===false || techPartTwo===false ?(
                                <div className='text-center'>
                                    <button type='button' className="btn view-more btn-transparent me-2 text-uppercase" onClick={(e)=>showTechData(e)}>
                                        <span>More Results</span> 
                                        <span className='circle'><AngleDownXs /></span>
                                    </button>
                                </div>
                            ):''}                           
                        </div>                     
                        <div ref={SpecialDiscountsRef} id="SpecialDiscountWarp" className='mb-4 scroll-padding'>
                            <h2 className='mt-4 title'>Special<span className='text-blue'> Discounts</span></h2>
                            <div className="accordion accordion-flush mt-3 faq-accordion" id="SpecialDiscount">
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="DiscountToAFHeading">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#DiscountToAF" aria-expanded="false" aria-controls="DiscountToAF">Do you provide discounts to members of the armed forces and emergency services? </button>
                                    </h2>
                                    <div id="DiscountToAF" className="accordion-collapse collapse" aria-labelledby="DiscountToAFHeading" data-bs-parent="#SpecialDiscount">
                                        <div className="accordion-body">
                                            <p>Yes, we offer a 10% discount to all members of the emergency services, as well as military members from all US, UK, Europe, India and GCC Military Units as well as National Guards.</p>
                                            <p>Email us at hello@eisbachwatches.com with your proof of service if you'd like to take advantage of this promotion and we'll send you a unique discount code. This 10% promotion can only be applied to full priced watches and to maximum 3 Watches per Order. If you wish to claim any other discount, this discount cannot be combined with any other. </p>
                                            <p>It's at the discretion of Eisbach Watch that the discount doesn't apply to all models.</p>
                                            <FaqQuesAns faqId="DiscountToAF" />                  
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="QuestionEisbachH">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#QuestionEisbach" aria-expanded="false" aria-controls="QuestionEisbach">Who should I contact if I have a question about my Eisbach Watch? </button>
                                    </h2>
                                    <div id="QuestionEisbach" className="accordion-collapse collapse" aria-labelledby="QuestionEisbachH" data-bs-parent="#SpecialDiscount">
                                        <div className="accordion-body">
                                            <p>For more information on this matter, please email us at <a className='text-blue' target="_blank" rel="noreferrer nofollow" href="mailto:hello@eisbachwatches.com">hello@eisbachwatches.com</a> or call us by phone.</p> 
                                            <FaqQuesAns faqId="QuestionEisbach" />   
                                        </div>
                                    </div>
                                </div>                                                                    
                            </div>                            
                        </div>
                    </div>
                </section>
            </div>
            <div className="border-block-wrap large ps-3 pe-3 ">
                <div className="cover-image-wrap position-relative mb-0 mb-md-4 border_RBLT faq-contact-bg">                        
                    <div className="cover-image border_RBLT br-md-TR p-5 pb-0 w-100 clear-both" style={{backgroundImage:'url(images/Faq-contact-bg.webp)', backgroundPosition:'center'}}></div>
                    <div className="position-absolute w-100 h-100 d-flex align-items-end align-lg-items-center p-3 p-sm-4 p-lg-5" >                                                         
                        <div className="mw-28 w-100 p-3 me-auto ms-lg-4">
                            <h3 className="sec-title-sm text-white mb-3 mb-lg-4"><span className="text-blue">Need </span>more help</h3>
                            <AnimatedLink linkClass="rounded-blue" iconColor="#ffffff" linkVal="/contact#FaqContact" linkText="Contact Us" />
                        </div>                  
                    </div>
                </div>
            </div>
        </>
    );
}  
export default FAQS;