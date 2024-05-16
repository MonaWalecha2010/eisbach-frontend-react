import React, { useState, useEffect, useContext } from "react";
import { NavLink, Link, useLocation, useMatch } from "react-router-dom";
import WatchesMegaMenu from "../templates/megaMenu";
export default function DesktopNav({ menuData, headerClass, appLogo, appContact, handleShow, setShowMegaMenu, showMegaMenu }) {
    const location = useLocation();
    let watches = useMatch("/watches/:collection_slug");
    let productDetail = useMatch("/watches/:collection_slug/:item_code");
    let strapDetail = useMatch("/straps/:collection_slug/:item_code");
    const toggleDesktopMegaMenu = () => {
        setShowMegaMenu(!showMegaMenu);
    }
    const hideDesktopMegaMenu = () => {
        if (showMegaMenu === true) {
            setShowMegaMenu(false);
        }
    }
    return (
        <div className={'site-header ' + headerClass}>
            <div className="site-container">
                <nav className={location.pathname === '/' || location.pathname === '/watches' || watches !== null || productDetail === null || strapDetail===null ? 'navbar navbar-expand-lg' : 'navbar navbar-expand-lg white-bg'} id="site_navigation">
                    <div className="container-fluid gx-lg-0 gx-xl-2">
                        <a className="navbar-brand" aria-label="Eisbach watches brand" href="/"  >
                            {appLogo}
                            {/* <img src={appLogo} alt="Eisbach Watches" title="Eisbach Watches" /> */}
                        </a>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav m-lg-auto mb-2 mb-lg-0 transparent desktop-menu">
                                {menuData && menuData.map((menu) => {
                                    const { id, name, link, submenu } = menu;
                                    return (
                                        <li className="nav-item" key={'menu-item-' + id}>
                                            {submenu && submenu !== null ? (
                                                <>
                                                    {submenu.type === 'dropdown' ? (
                                                        <div className="dropdown">
                                                            <NavLink className="nav-link dropdown-toggle" to={link} id={"list-submenu" + id} >
                                                                <span className="me-2">{name} </span><img className={`icon-img small`} src="/svg/angle-down.svg" alt="angle-down" width="12" />
                                                            </NavLink>
                                                            <ul className="RBL-shadow dropdown_menu dropdown_menu--animated dropdown_menu-6 transparent" aria-labelledby={"list-submenu" + id}>
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
                                                        <div className={showMegaMenu === true ? "dropdown mega-dropdown show" : "dropdown mega-dropdown hide"} onMouseEnter={() => setShowMegaMenu(true)} onMouseLeave={() => setShowMegaMenu(false)} onClick={() => toggleDesktopMegaMenu()}>
                                                            <div id={"dmega-submenu" + id} className="d-inline-block">
                                                                <span className="nav-link me-0" to={link} >{name} </span>
                                                                <img className={`align-middle icon-img small`} src="/svg/angle-down.svg" alt="angle-down" width="12" />
                                                            </div>
                                                            <div className="dropdown_menu dropdown_menu--animated dropdown_menu-6 transparent mega-menu desktop" aria-labelledby={"dmega-submenu" + id} >
                                                                <WatchesMegaMenu click={hideDesktopMegaMenu} />
                                                            </div>
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <div className="stroke">
                                                    <NavLink to={link} className={({ isActive }) => (isActive ? "active nav-link" : 'nav-link stroke')}  >
                                                        {name}
                                                    </NavLink>
                                                </div>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className="d-md-none d-lg-block desktop-icons-wrap">
                                <ul className="d-flex ps-0 pb-0 mb-0 align-items-center justify-content-end contact-links">
                                    {location.pathname.indexOf("/search") === 0 ? (
                                        <li>
                                            <Link className="icon" to={"/search"} >
                                                <img className="icon-img d-inline-block" src="/svg/search.svg" alt="search" width="17" />
                                                <span className="ms-2 icon-text"> Search </span>
                                            </Link>
                                        </li>
                                    ) : (
                                        <li>
                                            <span className="icon d-inline-flex align-items-center" onClick={handleShow}>
                                                <img className="icon-img d-inline-block" src="/svg/search.svg" alt="search" width="17" />
                                                <span className="ms-2 icon-text"> Search </span>
                                            </span>
                                        </li>
                                    )}
                                    <li>
                                        <a className="icon link" aria-label="call us" href={appContact ? ('tel:+' + appContact) : 'tel:+0097366700710'}>
                                            <img className="icon-img d-inline-block" src="/svg/phone.svg" alt="phone" width="17" />
                                            <span className="ms-2 icon-text">Call Us</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}