import React from "react";
import { NavLink, Link, useLocation, useMatch, } from "react-router-dom";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { CloseIcon, DownloadIcon } from "../svgIcons"
import axios from "axios";
import PageLoader from "../templates/pageLoader";
import MySVGLogo from "../../utils/eisbach-watches";
import classNames from "classnames";

const GlobalSearchForm = React.lazy(() => import('../forms/globalSearchForm'));
const DesktopNav = React.lazy(() => import('./DesktopNav'));
const WatchesMegaMenu = React.lazy(() => import('../templates/megaMenu'));

const menuData = [
	{
		id: 1,
		name: "Watches",
		link: "watches",
		submenu: null
	},
	{
		id: 2,
		name: "Our Collection",
		link: "watches",
		submenu: {
			type: 'megamenu'
		}
	},
	{
		id: 3,
		name: "Services",
		link: "services",
		submenu: null
	},
	{
		id: 4,
		name: "Technology",
		link: "technology",
		submenu: null
	},
	{
		id: 5,
		name: "Contact",
		link: "contact",
		submenu: null
	},
];
const NavigationRoutes = () => {
	const location = useLocation();
	const { pathname } = location;
	const [scroll, setScroll] = React.useState(false);
	const [appContact, setAppCont] = React.useState(null);
	const [showSearch, setShowSearch] = React.useState(false);
	const [showMegaMenu, setShowMegaMenu] = React.useState(false);
	const [mobileMenuShow, setMobileMenuShow] = React.useState(false);
	const [showMegaMenuMobile, setShowMegaMenuMobile] = React.useState(false);
	const [deviceWidth, setDeviceWidth] = React.useState(window.innerWidth);

	const toggleMobileMegaMenu = () => { setShowMegaMenuMobile(!showMegaMenuMobile); }
	const showMobileMenu = () => { setMobileMenuShow(true); }
	const hideMobileMenu = () => { setMobileMenuShow(false); }
	const handleClose = () => setShowSearch(false);
	const handleShow = () => { setShowSearch(true); if (mobileMenuShow) { hideMobileMenu(); } }
	
	let productDetail = useMatch("/watches/:collection_slug/:item_code");
    let strapDetail = useMatch("/straps/:collection_slug/:item_code");
	let collection = useMatch("/watches/collection/:collection_slug");
	let search = useMatch("/search/:searchText");
	let about = useMatch("/about");	
	const myClass = {
		navClass: classNames({
			'home-nav': (productDetail===null && strapDetail===null && about===null && search===null && ['/search' ].some((pattern) => !pathname.includes(pattern))) || collection!==null,
			'white-bg': scroll || showMegaMenu || showSearch || ((productDetail!==null || strapDetail!==null || about!==null || search!==null || ['/search' ].some((pattern) => pathname.includes(pattern))) && collection===null),
			'fixed-top': scroll,
		}),
		fill: classNames({	
			'#fff': !showMegaMenu && !showSearch && !scroll,		
			'#14244B': showMegaMenu || showSearch || (productDetail!==null && collection===null) || strapDetail!==null ||  about!==null || search!==null,			
		}),
		width: classNames({
			'125px': deviceWidth <= 1024 || scroll,
			'175px': deviceWidth > 1024 && !scroll,
		}),
		height: classNames({
			'49px': deviceWidth <= 1024 || scroll,
			'69px': deviceWidth > 1024 && !scroll,
		})
	}
	
	React.useEffect(() => { (showSearch) ? handleClose() : (mobileMenuShow) && hideMobileMenu(); }, [location]);
	React.useEffect(() => {
		const foo = [() => setDeviceWidth(window.innerWidth), () => setScroll(window.scrollY > 100)];
		window.addEventListener('resize', foo[0]);
		window.addEventListener('scroll', foo[1]);
		return () => {
			window.removeEventListener('resize', foo[0]);
			window.removeEventListener('scroll', foo[1]);
		};
	}, []);
	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${process.env.REACT_APP_URL_CUSTOM}custom-endpoints/global-data`, { params: { fields: ['contact_phone'].join(',') }, });				
				setAppCont(response?.data?.contact_phone);
			} catch (error) { console.error('Error fetching data:', error); }
		};
		fetchData();
	}, []);
	return (
		<>
			<div className="d-none d-sm-none d-md-none d-lg-block">
				<React.Suspense fallback={<PageLoader />} >
					<DesktopNav menuData={menuData} appLogo={<MySVGLogo fill={myClass.fill} width={myClass.width} height={myClass.height} />} appContact={appContact} headerClass={myClass.navClass} handleShow={handleShow} setShowMegaMenu={setShowMegaMenu} showMegaMenu={showMegaMenu} />
				</React.Suspense>
			</div>
			<div className="d-md-block d-lg-none">
				<div className={`site-header ${myClass.navClass} `}>
					<div className="site-container">
						<nav className={'navbar navbar-expand-lg white-bg'} id="site_navigation">
							<div className={mobileMenuShow === true ? "d-none" : "d-flex container-fluid ps-0 pe-0"}>
								<a className="navbar-brand" href="/" aria-label="Eisbach watches brand" >
									<MySVGLogo fill={myClass.fill} width={myClass.width} height={myClass.height} />
								</a>
								<ul className="d-inline-flex ps-0 pb-0 mb-0 align-items-center contact-links ms-auto me-4">
									{location.pathname.indexOf("/search") === 0 ? (
										<li>
											<Link className="icon" to={"/search"} >
												<img className="icon-img d-inline-block" src="/svg/search.svg" alt="search" width="17" />
											</Link>
										</li>
									) : (
										<li>
											<span className="icon" onClick={handleShow}>
												<img className="icon-img d-inline-block" src="/svg/search.svg" alt="search" width="17" />
											</span>
										</li>
									)}
									<li>
										<a className="icon link" aria-label="call us" href={appContact ? ('tel:+' + appContact) : 'tel:+0097366700710'}>
											<img className="icon-img d-inline-block" src="/svg/phone.svg" alt="phone" width="17" />

										</a>
									</li>
								</ul>
								<button aria-label="toggle-navigation" className="navbar-toggler" type="button" onClick={() => showMobileMenu()}>
									<span className="button-menu">
										<span className="label">
											<span></span>
											<span></span>
											<span></span>
										</span>
									</span>
								</button>
							</div>
							<div className={mobileMenuShow === true ? "mobile-menu show" : "mobile-menu"}>
								<div className="d-flex align-items-center space-between ps-3 pe-3">
									<a className="navbar-brand" href="/" >
										<img src="/images/logo/Eisbatch_logo_white_sm.svg" alt="Eisbach Watches" title="Eisbach Watches" width="125" height="49" />
									</a>
									<div>
										<button aria-label="close-menu" className="btn close-menu p-2" onClick={() => hideMobileMenu()}>
											<CloseIcon color="#fff" />
										</button>
									</div>
								</div>
								<div className="pt-5 ps-3 pe-3">
									<ul className="navbar-nav m-auto mb-2 mb-lg-0 transparent">
										{menuData && menuData.map((menu) => {
											const { id, name, link, submenu } = menu;
											return (
												<li className="nav-item mb-3" key={'menu-item-' + id}>
													{submenu && submenu !== null ? (
														<>
															{submenu.type === 'dropdown' ? (
																<div className="dropdown">
																	<NavLink className="nav-link dropdown-toggle" to={link} id={"mob-list-submenu" + id} >
																		<span className="me-2">{name} </span>
																		<img className={`align-middle icon-img small`} src="/svg/angle-down.svg" alt="angle-down" width="12" />
																	</NavLink>
																	<ul className="dropdown_menu dropdown_menu--animated dropdown_menu-6 transparent" aria-labelledby={"mob-list-submenu" + id}>
																		{submenu.data.map((item) => {
																			const { id, name, link } = item;
																			return (
																				<li key={"sub-item-" + id}>
																					<Link className="dropdown-item" to={link} >{name}</Link>
																				</li>
																			);
																		})}
																	</ul>
																</div>
															) : (
																<div className={showMegaMenuMobile === true ? "dropdown mega-dropdown show" : "dropdown mega-dropdown hide"}>
																	<div id={"mob-mega-submenu" + id} onClick={() => toggleMobileMegaMenu()} className="w-100 d-flex space-between">
																		<span className="nav-link me-3" to={link}  >{name} </span>
																		<img className={`link align-middle icon-img small`} src="/svg/angle-down.svg" alt="angle-down" width="12" />

																	</div>
																	<div className="mt-3 dropdown_menu dropdown_menu--animated dropdown_menu-6 mega-menu" aria-labelledby={"mob-mega-submenu" + id}>
																		<React.Suspense fallback={<PageLoader />} >
																			<WatchesMegaMenu click={toggleMobileMegaMenu} />
																		</React.Suspense>
																	</div>
																</div>
															)}
														</>
													) : (
														<div>
															<NavLink to={link} className={({ isActive }) => (isActive ? "active nav-link" : 'nav-link')}  >
																{name}
															</NavLink>
														</div>
													)}
												</li>
											);
										})}
									</ul>
								</div>
							</div>
						</nav>
					</div>
				</div>
			</div>
			<Offcanvas className="offcanvas-top search-here" id="offcanvasTopSearch"
				show={showSearch}
				onHide={handleClose}
				backdrop={false}
				keyboard={true}
				placement="top"
				scroll={true}
			>
				<Offcanvas.Body>
					<div className="site-container">
						<div className="position-relative">
							<span onClick={handleClose} className="link position-absolute top-right pt-2">
								<CloseIcon />
							</span>
						</div>
						<React.Suspense fallback={<PageLoader />} >
							<GlobalSearchForm showRecommended={true} resMessage="" click={handleClose} searchedText="" showHeading={true} />
						</React.Suspense>
					</div>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
}
const CallToActionOne = () => {
	const [catalogue, setCatalogue] = React.useState(null);
	const dataBaseUrl = process.env.REACT_APP_BASE_API_URL;
	React.useEffect(() => {		
		const fields = ['catalogue'].join(',');	
		const fetchData = async () => {			
			try {
				const response = await axios.get(`${process.env.REACT_APP_URL_CUSTOM}custom-endpoints/global-data?fields=${fields}`);	
				setCatalogue(response.data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
	}, []);
	return (		
		catalogue ? (			
			<a href={dataBaseUrl+catalogue?.catalogue} id="catalogOne" target="_blank" rel="noreferrer" className="cta-link link">
				<button className="btn cta-vertical-button me-2" type="button">
					<DownloadIcon />
					<span className="ms-2 text">Download Catalogue </span>
				</button>				
			</a>) :''
		
	);
}
const MemoNav = React.memo(NavigationRoutes)
export default function Navigation() { return <><MemoNav /><CallToActionOne /></> };

