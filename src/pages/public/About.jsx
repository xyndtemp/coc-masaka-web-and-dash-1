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
      
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our History</h2>
            <p className="text-gray-600 mb-4">
              Founded in 1980, Church of Christ Masaka has been serving the community
              for over four decades. What started as a small gathering has grown into
              a vibrant congregation dedicated to spreading God's word.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              Our mission is to share the gospel of Jesus Christ, nurture spiritual
              growth, and serve our community through acts of love and compassion.
            </p>
          </div>
        </div>

        <div className="bg-gray-100 p-8 rounded-lg mb-16">
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-medium mb-2">Biblical Truth</h3>
              <p className="text-gray-600">
                We are committed to teaching and living according to God's Word.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Community</h3>
              <p className="text-gray-600">
                We foster meaningful relationships and support one another.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Service</h3>
              <p className="text-gray-600">
                We serve our community with love and compassion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default About;