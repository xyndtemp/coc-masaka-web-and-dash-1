import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ title, description, canonicalUrl }) => {
  const schemaOrgWebPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: canonicalUrl,
  };

  const schemaOrgOrganization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GreenField Organization',
    url: 'https://www.greenfield-org.com',
    logo: 'https://www.greenfield-org.com/logo.png',
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* OpenGraph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/og-image.svg" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content="/og-image.svg" />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgWebPage)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgOrganization)}
      </script>
    </Helmet>
  );
};

export default SEOHead;