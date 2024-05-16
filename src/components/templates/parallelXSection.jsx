import React, {useEffect, useRef, useMemo} from 'react';
import { Fade } from "react-awesome-reveal";
import parse from 'html-react-parser';
import useOnScreen from '../../utils/useOnScreen';
const ParallelXSection = ({parallelXData}) => {    
    const parallelX = useRef(null);   
    const gallaryUrl= process.env.REACT_APP_GALLARY_URL;
    const websiteVideoeUrl = process.env.REACT_APP_VIDEO_URL;
    const onParalleX = useOnScreen(parallelX, '0px');    
    useMemo(()=>{
        if(onParalleX===true && parallelX.current.paused===true){
            parallelX.current.play();
            parallelX.current.playsInline = true;
        }
    },[onParalleX]);
    return(
        <div className='animated-block-bg position-relative'>                
                <video ref={parallelX} className={"video"} controls={false} poster={`${gallaryUrl}/images/parallax_tidron-ut-video-poster.webp`} playsInline muted loop > <source src={websiteVideoeUrl+"/videos/Tidron_Ut_Night_Day_Black.mp4"} type='video/mp4' /></video>
                <div className='position-absolute center animated-blocks md-static'>                
                    <div className='row m-0 lt-black-bg text-center text-sm-start'>
                        <div className='col-sm-9 col-md-4 col-lg-5 col-xxl-4'>
                            <Fade delay="50" duration="1000" triggerOnce={true}>
                                <div className='pb-3 pb-sm-0 animated-block block1'>
                                    <div className='blink-circle'></div>
                                    <p className='ps-lg-3 text text-white'>{parse(parallelXData.first_paragraph)}</p>                                    
                                </div>
                            </Fade>
                            <Fade delay="200" duration="1000" className='d-none d-lg-block' triggerOnce={true} >
                                <div className='animated-block block2'>
                                    <div className='blink-circle'></div>
                                    <p className='ps-lg-3 text text-white'>{parse(parallelXData.third_paragraph)}</p>
                                </div>
                            </Fade> 
                        </div>
                        <div className='col-sm-9 col-md-4 d-block d-lg-none'>
                            <Fade delay="80" duration="1000" triggerOnce={true}>
                                <div className='pb-3 pb-sm-0 animated-block block2'>
                                    <div className='blink-circle'></div>
                                    <p className='text text-white'>{parse(parallelXData.third_paragraph)}</p>                                    
                                </div>
                            </Fade>
                        </div>                        
                        <div className='col-sm-9 col-md-4 col-lg-4 offset-lg-3 offset-xxl-4 align-self-center'>
                            <Fade delay="150" duration="1000" triggerOnce={true} >
                                <div className='pb-3 pb-sm-0 p-lg-3 p-xl-5 animated-block block3'>
                                    <div className='blink-circle'></div>
                                    <p className='ps-lg-3 text text-white'>{parse(parallelXData.second_paragraph)}</p>                                    
                                </div>
                            </Fade>    
                        </div>
                    </div>
                </div>    
            </div>
    );
};
export default ParallelXSection;