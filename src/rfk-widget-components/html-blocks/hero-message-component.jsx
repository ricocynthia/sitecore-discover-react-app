// Recommendation Widget declaration
import { useState } from "react";

const RfkHeroMessage = ({
	appearance,
    cssContent,
    htmlContent,
    loaded,
	loading
}) => {
    const innerHTML = {
		__html: `<style>${cssContent}</style><div data-rfkid class="${appearance?.css_names.join(' ')}">${htmlContent}</div>`
	}
	return (
        <div>
		{ !loading ?  (<div dangerouslySetInnerHTML={innerHTML}/>) : ( <div> Loading ... </div > )
		}
		</div>
	)
};

export default RfkHeroMessage;