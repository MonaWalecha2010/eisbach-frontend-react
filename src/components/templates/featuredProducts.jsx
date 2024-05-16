import React from 'react';
import { Link } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-multi-carousel/lib/styles.css';
import AnimatedButton from './animatedButton';
const FeaturedProducts= ({productsData, secClass, brXl=6, brSm=2, carouselProductClass="carousel-product-wrap", draggable=true, arrowOutside=false, showButton=true, isLmtd=false, isShowDots=false}) =>{
   const baseImageUrl=process.env.REACT_APP_BASE_API_URL;
   const responsive = {
      xl: {
         breakpoint: { max: 9000, min: 992 },
         items: brXl,
         slidesToSlide: brXl
      }, 
      lg: {
         breakpoint: { max: 1199, min: 992 },
         items: 5,
         slidesToSlide: 5
      },      
      md: {
         breakpoint: { max: 991, min: 768 },
         items: 4,
         slidesToSlide: 4
      },
      sm: {
         breakpoint: { max: 767, min: 560 },
         items: 3,
         slidesToSlide: 3
      },
      xs: {
         breakpoint: { max: 559, min: 421},
         items: 2,
         slidesToSlide: 2
      },
      bs: {
         breakpoint: { max: 420, min: 0 },
         items: brSm,
         slidesToSlide: brSm,
         partialVisibilityGutter: brSm===1?102:0
      }
   };   
   const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => { 
      const { carouselState: { currentSlide } } = rest;    
     return (      
      <div className="carousel-button-group">         
         <button aria-label="left-arrow-button" className={currentSlide === 0 ? 'arrow--left disable' : 'arrow--left'} onClick={() => previous()}> 
            <img className='icon-img' src="/svg/angle-left.svg" alt="angle-left" width="8" />  
         </button>
         <button aria-label="right-arrow-button" className="arrow--right" onClick={() => next()}>
            <img className='icon-img' src="/svg/angle-right.svg" alt="angle-right" width="8" />            
         </button>       
      </div>
     );
   };
   const CustomDot = ({ active, onClick }) => {
      return (
        <li onClick={() => onClick()} className="link">
          <button 
            className={`custom-dot ${active ? "custom-dot--active" : ""}`}
            onClick={() => onClick()}
            aria-label={`${active ? "CustomDotActive" : "CustomDot"}`}
          />
        </li>
      );
   };  
   return(
      <div className={'product-carousel '+ secClass}>
         <Carousel           
            swipeable={true}
            draggable={draggable}
            keyBoardControl={true}
            arrows={false}
            showDots={isShowDots}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={false}                 
            autoPlaySpeed={5000}          
            customTransition="transform 2000ms ease-in-out"  
            containerClass="products-carousel site-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}          
            renderDotsOutside={true}
            partialVisible={brSm===1?true:false}
            renderButtonGroupOutside={arrowOutside}
            customButtonGroup={<ButtonGroup />}
            dotListClass="custom-dot-list-style"
            customDot={<CustomDot />}                     
         >         
            {productsData && productsData.map((product)=>{
               const  {id, name, featured_image, slug, item_code, night_view_image , featured_image_alt_text, night_image_alt_text} = product;                          
               return(                  
                  <div key={'product-'+id} className={"product-wrap "+carouselProductClass}>
                     {isLmtd===true?(
                        <div className='lmtd-pill'>
                           <span className='lmtd-text'>Limited Edition</span>
                        </div>
                     ):''}
                     <div className={night_view_image!==null?'img-wrap w-100 hover-view':'img-wrap without-hover-view w-100'}> 
                        <Link to={'/watches/'+slug+'/'+item_code} className="img-link day-img" tabIndex="-1">
                           <LazyLoadImage src={baseImageUrl+featured_image} alt={featured_image_alt_text} title={featured_image_alt_text} loading="lazy" threshold={200} />
                        </Link>                       
                        {night_view_image!==null?(
                        <Link to={'/watches/'+slug+'/'+item_code} className="img-link night-img" tabIndex="-1">
                           <img src={baseImageUrl+night_view_image} alt={night_image_alt_text} title={night_image_alt_text} />
                        </Link>
                        ):('')}
                     </div>
                     <div className="product-desc">
                        <div className="mb-2"><Link to={'/watches/'+slug+'/'+item_code} ><span className="title">{name}</span></Link></div>
                        {/*   <p className="price mb-2"><span className="dollar-icon">$</span>{Price}</p>   */}   
                        {showButton===true?(<>
                           <AnimatedButton link={`/watches/${slug}/${item_code}`} label="Explore Product" iconImage="/svg/right-arrow-blue.svg" iconAlt="arrow right" iconClass=''btnclass="rounded-blue-thin btn-sm"  wrapperClass='' />
                        </>):''}                        
                     </div>
                  </div>                  
               );
           })}         
         </Carousel>
      </div>
   );
}  
export default FeaturedProducts;