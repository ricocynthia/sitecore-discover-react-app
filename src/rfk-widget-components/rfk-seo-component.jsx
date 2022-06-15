import { Helmet } from "react-helmet";

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
		{ !loading ?  (
            <Helmet>
  <title>{appearance?.variables?.title?.value}</title>
  <meta name='description' content={appearance?.variables?.description?.value} />
</Helmet>) : ( <div> Loading ... </div > )
		}
		</div>
	)
};

export default RfkSeoComponent;