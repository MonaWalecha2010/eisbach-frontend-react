import React, { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { Routes, Route, } from "react-router-dom";
import PageLoader from "../templates/pageLoader";

const Categories = React.lazy(() => import('../pages/categories'));
const Product = React.lazy(() => import('../pages/product'));
const Watches = React.lazy(() => import('../pages/watches'));
const Straps = React.lazy(() => import('../pages/straps'));
const Accessories = React.lazy(() => import('../pages/accessories'));
const Services = React.lazy(() => import('../pages/services'));
const Technology = React.lazy(() => import('../pages/technology'));
const Blog = React.lazy(() => import('../pages/blog'));
const About = React.lazy(() => import('../pages/about'));
const WhyUS = React.lazy(() => import('../pages/whyUs'));
const Contact = React.lazy(() => import('../pages/contact'));
const PrivacyPolicy = React.lazy(() => import('../pages/privacyPolicy'));
const Terms = React.lazy(() => import('../pages/termsOfUse'));
const LegalNotice = React.lazy(() => import('../pages/legalNotice'));
const Cookies = React.lazy(() => import('../pages/cookies'));
const Search = React.lazy(() => import('../pages/search'));
const TheCollections = React.lazy(() => import('../pages/collections'));
const AllCollectionsProducts = React.lazy(() => import('../pages/allCollectionsProducts'));
const MensCollectionProducts = React.lazy(() => import('../pages/mensWatches'));
const WomensCollectionProducts = React.lazy(() => import('../pages/womensWatches'));
const TidronE1CollectionProducts = React.lazy(() => import('../pages/tidronE1'));
const TidronUTCollectionProducts = React.lazy(() => import('../pages/tidronUt'));
const Warranty = React.lazy(() => import('../pages/warranty'));
const FAQS = React.lazy(() => import('../pages/faq'));



const Root = () => {
	const rootLocation = useLocation();
	useLayoutEffect(() => {
		if (rootLocation?.hash?.length === 0) {
			document.documentElement.scrollTo(0, 0);
		}
	}, [rootLocation.pathname]);
	return (
		<React.Suspense fallback={<PageLoader />}>
			<Routes>
				<Route exact path="/watches/collection/:collection_slug" element={<Categories />} ></Route>
				<Route exact path="/watches/collections" element={<TheCollections />} ></Route>
				<Route exact path="/watches/all" element={<AllCollectionsProducts />} ></Route>
				<Route exact path="/watches/men" element={<MensCollectionProducts />} ></Route>
				<Route exact path="/watches/women" element={<WomensCollectionProducts />} ></Route>
				<Route exact path="/watches/tidron-e1" element={<TidronE1CollectionProducts />} ></Route>
				<Route exact path="/watches/tidron-ut-360gm-t" element={<TidronUTCollectionProducts />} ></Route>
				<Route exact path="/watches/:collection_slug/:item_code" element={<Product />} ></Route>
				<Route exact path="/straps/:collection_slug/:item_code" element={<Product />} ></Route>
				<Route exact path="/watches" element={<Watches />} ></Route>
				<Route exact path="/straps" element={<Straps />} ></Route>
				<Route exact path="/accessories" element={<Accessories />} ></Route>
				<Route exact path="/services" element={<Services />} ></Route>
				<Route exact path="/technology" element={<Technology />} ></Route>
				<Route exact path="/blog" element={<Blog />} ></Route>
				<Route exact path="/about" element={<About />} ></Route>
				<Route exact path="/why-us" element={<WhyUS />} ></Route>
				<Route exact path="/contact" element={<Contact />} />
				<Route exact path="/terms-of-use" element={<Terms />} />
				<Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
				<Route exact path="/accessibility" element={<Cookies />} />
				<Route exact path="/cookies" element={<Cookies />} />
				<Route exact path="/search/:searchText" element={<Search />} ></Route>
				<Route exact path="/search" element={<Search />} ></Route>
				<Route exact path="/legal-notice" element={<LegalNotice />} />
				<Route exact path="/warranty" element={<Warranty />} />
				<Route exact path="/faq" element={<FAQS />} />
				<Route exact path="*" element={<FAQS />} ></Route>
			</Routes>
		</React.Suspense>
	);
}
export default Root;