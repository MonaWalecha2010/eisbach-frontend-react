import { Link } from "react-router-dom";
const AnimatedButton=({link, label, iconImage, hoverIcon, iconSize, iconAlt, iconClass, btnclass, wrapperClass})=>{
    return(
        <div className={`animated-btn-warp ${wrapperClass}`}>
            <Link to={link} className={`btn ${btnclass?btnclass:'rounded-white-blue'}`} >
                <span className={`d-flex align-items-center text ${hoverIcon?'hover-effect':''}`}>{label} 
                    {iconImage && <img src={iconImage} className={`ms-2 icon show ${iconClass}`} alt={iconAlt} width={iconSize?iconSize:"17"} />}
                    {hoverIcon && <img src={hoverIcon} className={`ms-2 icon on-hover ${iconClass}`} alt={iconAlt} width={iconSize?iconSize:"17"} />}
                </span>                
                <span className='line-1'></span>
                <span className='line-2'></span>
                <span className='line-3'></span>
                <span className='line-4'></span>
            </Link>
        </div>
    );
}
export default AnimatedButton;