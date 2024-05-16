import React, {useState, useRef, useMemo} from 'react';
import useOnScreen from '../../utils/useOnScreen';
import classNames from 'classnames';
import { PlayIcon, PauseIcon } from '../svgIcons';
const CompanyVideo = (props) => { 
   const companyVideo = useRef(null); 
   const [position, setPosition] = useState({ x: 0, y: 0 });
   const [clicked, setClicked] = useState(false);
   const [hidden, setHidden] = useState(false);  
   const showControls= props.showControls?props.showControls:false;
   const srcType= props.srcType?props.srcType:'mp4'
   const vidClass=props.vidClass?props.vidClass:"company-video-wrap"; 
   // const playEvent = props.playVideo?props.playVideo:false;
   const onVideoSection = useOnScreen(companyVideo, '0px');
   const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseenter", onMouseEnter);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseup", onMouseUp);      
   };
   const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
   };   
   useMemo(()=>{
      if(onVideoSection===true && companyVideo.current.paused===true){
         companyVideo.current.play();
         companyVideo.current.playsInline = true;
      }
   },[onVideoSection]);
   const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });         
      setHidden(false);
   };
   const onMouseDown = () => {
      setClicked(true);
      setHidden(true);
   };
   const onMouseUp = () => {
      setClicked(false);
   };
   const onMouseLeave = () => {
      setHidden(true);
   };
   const onMouseEnter = () => {
      setHidden(false);
   };  
   const cursorClasses = classNames("sec-Video_PlayButton", {
      "cursor--clicked": clicked,
      "cursor--hidden": hidden
   });
   const playVideo=()=>{           
      if (companyVideo.current.paused) { 
         companyVideo.current.play();
      }
      else  { 
         companyVideo.current.pause(); 
      }
   }  
   return (
      <section className={"position-relative "+ vidClass} onMouseEnter={()=>addEventListeners()} onMouseLeave={()=>removeEventListeners()}>
         <video className={"video"} controls={showControls} poster={props.poster} ref={companyVideo} playsInline muted loop controlsList="nodownload notimeline play volume fullscreen" >           
            <source src={props.srcUrl} type={"video/"+srcType} title="Company Video"  />
            {props.srcUrlTwo?<source src={props.srcUrlTwo} type={"video/"+props.srcTypeTwo} title="Company Video"  />:''}
         </video>        
         <div className={cursorClasses} onClick={()=>playVideo()} style={{ left: `${position.x}px`, top: `${position.y}px` }}>
            <div className="sec-Video_Spinner">
               <svg version="1.1" id="Layer_1" x="0px" y="0px" width="6.25rem" height="6.25rem" viewBox="0 0 80 80" enableBackground="new 0 0 100 100" xmlSpace="preserve">
                  <g>
                     <circle className="path" fill="none" stroke="#fff" strokeWidth="7" cx="40.453" cy="40.563" r="35" />
                  </g>                    
               </svg>               
            </div>
            <div className="sec-Video_Play">
               {companyVideo?.current?.paused===true ?(<PlayIcon color='#eee' />):(<PauseIcon color='#eee' />)}
            </div>
         </div>     
      </section>
   );
};
export default CompanyVideo;