import React from "react";
import { Link } from "react-router-dom";
import { FacebookIcon, InstagramIcon, LinkedinIcon, TiltokIcon, PinterestIcon, YoutubeIcon, TwitterIcon, RightArrow } from "../svgIcons";
import PageLoader from "../templates/pageLoader";


const NewsletterForm = React.lazy(() => import('../forms/newsletterForm'));

const logoWhiteLg = "/images/logo/Eisbatch_logo_white.svg";
const collectionsLinks = [
    { to: "/watches/men", label: "Men's" },
    { to: "/watches/women", label: "Women's" },
    { to: "/watches/tidron-e1", label: "Tidron E1" },
    { to: "/watches/tidron-ut-360gm-t", label: "Tidron Ut" },
];

const supportLinks = [
    { to: "/terms-of-use", label: "Terms of use" },
    { to: "/privacy-policy", label: "Privacy Policy" },
    { to: "/cookies", label: "Cookies" },
    { to: "/legal-notice", label: "Legal Notice" },
    { to: "/contact", label: "Contact" },
];

const quickLinks = [
    { to: "/watches", label: "Watches" },
    { to: "/services", label: "Services" },
    { to: "/technology", label: "Technology" },
    { to: "/about", label: "About" },
    { to: "/why-us", label: "Why-us" },
    { to: "/straps", label: "Straps" },
    { to: "/accessories", label: "Accessories" },
    { to: "/warranty", label: "Warranty" },
    { to: "/faq", label: "FAQS" },
];

const RenderSocialLinks = ({ globalData }) => { 
    const socialLinks = [
        { icon: <FacebookIcon />, url: globalData?.data?.facebook_url },
        { icon: <InstagramIcon />, url: globalData?.data?.instagram_url },
        { icon: <YoutubeIcon />, url: globalData?.data?.youtube_url },
        { icon: <TwitterIcon />, url: globalData?.data?.twitter_url },
        { icon: <TiltokIcon />, url: globalData?.data?.tiktok_url },
        { icon: <LinkedinIcon />, url: globalData?.data?.linkedin_url },
        { icon: <PinterestIcon />, url: globalData?.data?.pinterest_url }
    ];
    return (
        <ul className="social-links p-0 mb-0">
            {socialLinks.map((link, index) =>
                link.url ? (
                    <li key={index}>
                        <a
                            href={link.url}
                            className="link"
                            aria-label={link.icon}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                        >
                            {link.icon}
                        </a>
                    </li>
                ) : null
            )}
        </ul>
    );
};
const FooterColumn = ({ title, links, classes, listStyle }) => (
    <div className="text-center text-sm-start">
        <div className="ft-title">{title}</div>
        <ul className={listStyle ? listStyle : "ft-list"}>
            {links.map((link, index) => (
                <li key={index} >
                    <Link to={link.to} className={classes}>
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);
const FooterSites = ({ globalData }) => (    
    <div className="row gy-2 gy-md-3 gy-lg-0 gx-0 pt-3 pb-3 pt-md-4 pb-md-4 pt-lg-5 pb-lg-5">
        <div className="col-sm-4 col-md-4 col-lg-3 col-xl-3 order-1 order-md-1 order-lg-1">
            <div className="text-center text-sm-start">
                <a className="d-block footer-brand" aria-label="Eisbach watches brand" href="/"  >
                    <img src={logoWhiteLg} alt="Eisbach Watches" title="Eisbach Watches" />
                </a>
                <p className="mb-1 mb-sm-3 ft-text">Eisbach Watches a Brand of KPSE<br /> WLL Bl. 338, <br />Rd.3801, Bldg.15/ 9074 <br />Manama - Bahrain</p>
                {globalData ? (<>                    
                    <p className="mb-0 mb-sm-2 ft-text">Tel. <a className="ft-link" href={"tel:+" + globalData?.data?.contact_phone}>{'+' + globalData?.data?.contact_phone}</a></p>
                    <p className="ft-text">Email. <a className="ft-link" href={"mailto:" + globalData?.data?.contact_email}>{globalData?.data?.contact_email}</a></p>
                </>) : ''}
            </div>
        </div>
        <div className="col-sm-3 col-md-3 col-lg-2 col-xl-2 order-2  order-md-2 order-lg-2 offset-sm-1 offset-md-1 offset-lg-0">
            <FooterColumn title="Collections" links={collectionsLinks} classes="ft-link text-uppercase" />
        </div>
        <div className="col-sm-3 col-md-3 col-lg-2 col-xl-2 order-3 order-md-2 order-lg-3 offset-sm-1 offset-md-1 offset-lg-0 d-none d-sm-block">
            <FooterColumn title="Support" links={supportLinks} classes={"ft-link"} />
        </div>
        <div className="col-sm-3 col-md-4 col-lg-2 col-xl-2 order-4 order-md-2 order-lg-4">
            <FooterColumn title="Quick Links" links={quickLinks} listStyle="ft-list list-style-disc" classes={"ft-link"} />
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3 order-5 order-md-5 order-lg-5 offset-sm-2 offset-md-0">
            <div className="ft-block5 text-center text-sm-start">
                <div className="form-title text-white mb-3 mb-lg-4">Sign up for exclusive offers, news and promotions</div>
                <React.Suspense fallback={<PageLoader />} >
                    <NewsletterForm isModal={false} />
                </React.Suspense>
            </div>
            <RenderSocialLinks globalData={globalData} />
        </div>
    </div>
)

export default FooterSites;