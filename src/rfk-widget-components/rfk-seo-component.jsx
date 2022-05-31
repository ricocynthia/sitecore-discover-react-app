// Recommendation Widget declaration
import { useEffect, useState } from "react";

const RfkSeoComponent = ({
    appearance,
    cssContent,
    htmlContent,
	loaded,
	loading
}) => {
    //TODO: Figure out how to add meta tags to page
    // also do we need to use some sort of life cycle hook
    // to make sure that the seo data is being set before the page is crawled?
    document.title = appearance?.variables?.title?.value ?? 'Back Up Title';
	return (
        <div>
		{ !loading ?  (<div>done loading seo
        </div>) : ( <div> Loading ... </div > )
		}
		</div>
	)
};

export default RfkSeoComponent;