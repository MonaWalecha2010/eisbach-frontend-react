import React from 'react';
import axios from 'axios';
import PageLoader from './templates/pageLoader';
import { Helmet, HelmetProvider } from "react-helmet-async";
import './../sass/home-page.scss';

const RestHome1 = React.lazy(() => import('./homeSegments/Variants-Tidron'));
const RestHome2 = React.lazy(() => import('./homeSegments/E1-EWorld-NewsLetter'))

export default function Home({ Slider }) {
    const [globalData, setGlobalData] = React.useState({ meta_title: null, meta_description: null, meta_keywords: null, });
    const [slidersData, setSlidersData] = React.useState([{
        id: null,
        title_first: null,
        background_image: null,
        slider_watch_image: null,
    }]);
    React.useEffect(() => {
        
        const fields = ['meta_title', 'meta_description', 'meta_keywords'].join(',');
        const fieldsSlider = ['id', 'title_first', 'background_image', 'slider_watch_image'].join(',');
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_URL_CUSTOM}custom-endpoints/global-data`, {
                    params: { fields },
                });
                setGlobalData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);                
            }
        };
        const fetchDataSlider = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_URL_CUSTOM}custom-endpoints/homepage-slider`, {
                    params: { fieldsSlider },
                });
                setSlidersData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        fetchDataSlider();
    }, []);

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{globalData.meta_title || 'GERMAN ENGINEERED - SWISS MADE PRECISION TIME INSTRUMENTS'}</title>
                    <link rel="canonical" href={process.env.REACT_APP_URL_CUSTOM} />
                    <link rel="alternate" hreflang="x-default" href={process.env.REACT_APP_URL} />
                    <meta name="description" content={globalData.meta_description || "We made Precision automatic Tool Watches and professional Divers. Designed with Functionality and Sophistication. Watches that tell a story. We made it for you!"} />
                    <meta name="keywords" content={globalData.meta_keywords || "Eisbach, Watches, TIDRON, UT, E1, 360GM-T"}></meta>
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content='GERMAN ENGINEERED - SWISS MADE PRECISION TIME INSTRUMENTS' />
                    <meta property="og:description" content='We made Precision automatic Tool Watches and professional Divers. Designed with Functionality and Sophistication. Watches that tell a story. We made it for you!' />
                    <meta property="og:url" content={process.env.REACT_APP_URL_CUSTOM} />
                    <meta property="og:image" content="https://www.eisbachwatches.com/images/logo/eisbach-watches.png"></meta>
                    <link rel="preload" as="image" href={process.env.REACT_APP_URL_CUSTOM + slidersData[0].background_image} />
                    <link rel="preload" as="image" href={process.env.REACT_APP_URL_CUSTOM + slidersData[0].slider_watch_image} />
                </Helmet>
            </HelmetProvider>
            <Slider slidersData={slidersData} />
            <React.Suspense fallback={<PageLoader />} >
                <RestHome1 />
                <RestHome2 />
            </React.Suspense>
        </>
    )
}
