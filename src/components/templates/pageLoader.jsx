import React from "react";
const PageLoader = () => {	
	return(    
		<section className="loader-container">
      <div className="site-container">
        <div className="spinner"></div>
      </div>  
    </section>
	);
}
export default React.memo(PageLoader);