import { Link } from "react-router-dom";
import { RightArrow } from "../svgIcons";
const AnimatedLink =(props)=>{
    return(
        <div className='animated-btn-warp'>
            <Link className={`btn ${props.linkClass}`} to={props.linkVal} rel={`${props.rel?props.rel:''} `}>
                <span className='d-flex align-items-center'>
                    <span className="me-2 text">{props.linkText} </span>
                    <RightArrow color={props.iconColor} />
                </span>
                <span className='line-1'></span>
                <span className='line-2'></span>
                <span className='line-3'></span>
                <span className='line-4'></span>
            </Link>
        </div>
    );
}
export default AnimatedLink;