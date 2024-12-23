import SEOHead from "../../components/SEOHead";
import PublicLayout from "../../components/layouts/PublicLayout";

const About = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Church of Christ Masaka",
    "description": "Learn about Church of Christ Masaka's history, mission, and values."
  };

  return (
    <PublicLayout>
      <SEOHead
        title="About - Church of Christ Masaka"
        description="Learn about Church of Christ Masaka's history, mission, and values."
        canonicalUrl="https://cocmasaka.org/about"
      />
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="text-xl mb-8">About page content coming soon...</p>
      </div>
    </PublicLayout>
  );
};

export default About;