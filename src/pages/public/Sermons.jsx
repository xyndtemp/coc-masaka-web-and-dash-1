import SEOHead from "../../components/SEOHead";
import PublicLayout from "../../components/layouts/PublicLayout";

const Sermons = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Sermons - Church of Christ Masaka",
    "description": "Listen to our latest sermons and messages from Church of Christ Masaka."
  };

  return (
    <PublicLayout>
      <SEOHead
        title="Sermons - Church of Christ Masaka"
        description="Listen to our latest sermons and messages from Church of Christ Masaka."
        canonicalUrl="https://cocmasaka.org/sermons"
      />
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-6">Sermons</h1>
        <p className="text-xl mb-8">Sermons page content coming soon...</p>
      </div>
    </PublicLayout>
  );
};

export default Sermons;