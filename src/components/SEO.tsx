import type React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

interface SEOProps {
	title?: string;
	description?: string;
	image?: string;
	article?: boolean;
}

const SEO: React.FC<SEOProps> = ({ title, description, image, article }) => {
	const { t, i18n } = useTranslation();

	const siteName = t("seo.site_name");
	const defaultTitle = t("seo.default_title");

	const seo = {
		title: title ? `${title} | ${siteName}` : `${siteName} | ${defaultTitle}`,
		description: description || t("seo.default_description"),
		image: `${window.location.origin}${image || "/terminal_512x512.png"}`,
		url: window.location.href,
	};

	return (
		<Helmet>
			<html lang={i18n.language} />
			<title>{seo.title}</title>
			<meta name="description" content={seo.description} />
			<meta name="image" content={seo.image} />

			{seo.url && <meta property="og:url" content={seo.url} />}
			{(article ? true : null) && <meta property="og:type" content="article" />}
			{seo.title && <meta property="og:title" content={seo.title} />}
			{seo.description && (
				<meta property="og:description" content={seo.description} />
			)}
			{seo.image && <meta property="og:image" content={seo.image} />}

			<meta name="twitter:card" content="summary_large_image" />
			{seo.title && <meta name="twitter:title" content={seo.title} />}
			{seo.description && (
				<meta name="twitter:description" content={seo.description} />
			)}
			{seo.image && <meta name="twitter:image" content={seo.image} />}
		</Helmet>
	);
};

export default SEO;
