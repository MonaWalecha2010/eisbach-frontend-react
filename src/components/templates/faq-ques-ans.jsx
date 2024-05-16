import React from "react";
import { Link } from "react-router-dom";
import { AngleRight } from "../svgIcons";
const FaqQuesAns =(props) =>{    
    return(       
        <div className='mt-4'>
            <p className='text-black mb-2'>Did this answer your question?</p>
            <p className='lh-1 faq-ans mb-2'>
                <Link to={'/faq'} className="text-black link fw-bold me-4" data-bs-toggle="collapse" data-bs-target={"#"+props.faqId}>YES 
                    <span className="ms-2 mb-1"><AngleRight color="#03A9F4" /></span></Link> 
                <Link to={'/faq-contact'} className="text-black link fw-bold"> NO <span className="ms-2 mb-1"><AngleRight color="#03A9F4" /></span></Link>
            </p>
            <p className='text-sm'>Note: click yes to return to the FAQ; click no to contact us.</p>
        </div>
    );
}
export default FaqQuesAns;