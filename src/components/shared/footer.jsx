import React, { useState, useEffect } from "react";
import { Link, } from "react-router-dom";
import { RightArrow } from "../svgIcons.jsx";
import axios from "axios";
import PageLoader from "../templates/pageLoader.jsx";

const FooterSites = React.lazy(() => import('./footer.slave.jsx'));

const Footer = () => {
  const [backToTop, setBackToTop] = useState(false);
  const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handleBackToTopButton = () => { setBackToTop(window.scrollY > 700); };
  const [globalData, setGlobalData] = React.useState({ copyright: null, contact_phone: null, contact_email: null, facebook_url: null, instagram_url: null, youtube_url: null, twitter_url: null, tiktok_url: null, linkedin_url: null, pinterest_url: null });

  useEffect(() => {
    window.addEventListener("scroll", handleBackToTopButton);
    return () => {
      window.removeEventListener("scroll", handleBackToTopButton);
    };
  });

  React.useEffect(() => {
    const fields = ['copyright', 'contact_phone', 'contact_email', 'facebook_url', 'instagram_url', 'youtube_url', 'twitter_url', 'tiktok_url', 'linkedin_url', 'pinterest_url'].join(',');    
    const fetchData = async () => {  
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL_CUSTOM}custom-endpoints/global-data?fields=${fields}`);          
        setGlobalData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <footer className="footer">
        <div className="site-container footer-one">
          <React.Suspense fallback={<PageLoader />} >
            <FooterSites globalData={globalData} />
          </React.Suspense>
        </div>
        <div className="copyright-wrap mt-2">
          <div className="site-container footer-one">
            <div className="row m-0 gx-0">
              <div className="col-sm-7 col-md-6 text-center text-sm-start order-2 order-sm-1 ps-0 pe-0">
                <p className="ft-text mt-1 mb-0">{globalData.copyright ? (globalData.copyright) : '©  Eisbach - 2022. All Right Reserved.'} </p>
              </div>
              <div className="col-sm-5 col-md-6 order-1 order-sm-2 ps-0 pe-0">
                <ul className="list-style-none justify-content-sm-end mb-2 mb-md-0 ps-0">
                  <li><Link to="/terms-of-use" className="ft-link" >Terms of use</Link><span className="ft-text ms-3">|</span></li>
                  <li><Link to="/privacy-policy" className="ft-link" >Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className={backToTop === true ? "back-to-top show" : "back-to-top"} onClick={() => scrollToTop()}><RightArrow color="#4B4B4B" /></div>
      {/*  Google Tag Manager (noscript)  */}
      <noscript><iframe title="eisbach GA" src="https://www.googletagmanager.com/ns.html?id=GTM-P3N3BNH"
        height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
      {/*   End Google Tag Manager (noscript)  */}
    </>
  );
}

export default Footer