import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './sass/app.scss';
import Home from './components/home';
import Slider from './components/homeSegments/Slider';
import NavigationRoutesCTA from './components/shared/navbar-CTA';
import PageLoader from './components/templates/pageLoader';
const MyRoot = React.lazy(() => import('./components/shared/root'));
const Footer = React.lazy(() => import('./components/shared/footer'));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavigationRoutesCTA />
      <Routes>
        <Route exact path="/" element={<Home Slider={Slider} />} ></Route>
        <Route path="/*" element={<React.Suspense fallback={<PageLoader />} ><MyRoot /></React.Suspense>} ></Route>
      </Routes>
      <React.Suspense fallback={<PageLoader />} >
        <Footer />
      </React.Suspense>
    </BrowserRouter>
  </React.StrictMode>
);


