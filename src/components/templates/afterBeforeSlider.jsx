import React, {useState, useRef} from 'react';
import '../../sass/after-before-slider.scss';
const AfterBeforeSlider = (props) => {		
	const divisor = useRef(null);
	const circle = useRef(null);
    const rangeSlider = useRef(null);
    const [divisorWidth, setDivisorWidth]=useState('50%');
    const [circleLeft, setCircleLeft]=useState('50%');
    const [sliderVal, setSliderVal]=useState("50");
	const updateSlider=()=> {
        setSliderVal(rangeSlider.current.value);
        setDivisorWidth(rangeSlider.current.value+"%");
        setCircleLeft(rangeSlider.current.value+"%");

    }
	return(
		<div className="portfolio-slider">                               
            <div id="trigaSlider" className="parent">
                <div className="circle" id="circle" ref={circle} style={{left:circleLeft}}></div>                         
                <img src={props.afterImage} alt={props.afterImageAlt} title={props.afterImageAlt} />                                
                <div className="box" id="box" ref={divisor} style={{width:divisorWidth}}>
                    <div className="child">
                        <img src={props.beforeImage} alt={props.beforeImageAlt} title={props.beforeImageAlt}  /> 
                    </div>
                </div>
                <input type="range" min="0" max="100" value={sliderVal} className="slider" id="slider" ref={rangeSlider} onInput={()=>updateSlider()} aria-labelledby="trigaSlider" />                                        
            </div>                                            
        </div>
	);
}
export default AfterBeforeSlider;
