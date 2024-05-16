import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from "react-router-dom";
const ProductList= ({listData, showWishlist=false, reloadData, colCount=4}) =>{
   const baseImageUrl=process.env.REACT_APP_BASE_API_URL;
   const getFilename=(fileUrl)=>{
		var filename = fileUrl.split('/').pop();
		return filename.substr(0, filename.lastIndexOf('.'));
	}; 
   return( 
      <div className="row gx-3 gy-3">
         {listData && listData.map((data, index)=>{                 
            const {item_code, slug,label ,name,  featured_image, featured_image_alt_text, limited_edition_status, product_line_type}=data;            
            var altText=featured_image_alt_text
            if(featured_image_alt_text===undefined){
               altText = getFilename(featured_image);
            }            
            let linktype= product_line_type==="strap"?'/straps/':'/watches/';
            let productLink = linktype+slug+'/'+item_code;
            if(slug!==undefined){
               productLink=linktype+slug+'/'+item_code;
            }else{
               productLink='/watches/product/'+item_code;
            }
            return(                 
               <div key={'search-item-'+index} className={colCount===5?"col-6 col-sm-4 col-md-4 col-lg-3 col-xl-20 h-100":"col-6 col-sm-4 col-md-4 col-lg-3 h-100"}>
                  <div className="product-item draw-border h-100">
                     <div className="options-wrap">
                        <div>
                           {limited_edition_status==="1"?(
                              <div className="lmtd-pill">
                                 <span className='lmtd-text'>Limited Edition</span>                      
                              </div>
                           ):''}
                        </div>                            
                     </div>              
                     <Link to={productLink} className="link item-link" >
                        <div className="item_image">
                          <LazyLoadImage src={baseImageUrl+featured_image} className="img-fluid" alt={altText} title={altText} threshold={200} />
                        </div>
                        <div className="item_content">
                          <p className="modal-id mb-0">{item_code!==null?item_code:''}</p>
                          <div className="title mb-2">{label?label:name}</div>                        
                        </div>
                     </Link>
                  </div> 
               </div>
            ); 
         })} 
      </div>
   );
}  
export default ProductList;