import SEOHead from "../../components/SEOHead";
import PublicLayout from "../../components/layouts/PublicLayout";

const Radio = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RadioSeries",
    "name": "Let The Bible Speak - Church of Christ Masaka",
    "description": "Listen to our radio program Let The Bible Speak from Church of Christ Masaka."
  };

  return (
    <PublicLayout>
      <SEOHead
        title="Let The Bible Speak - Church of Christ Masaka"
        description="Listen to our radio program Let The Bible Speak from Church of Christ Masaka."
        canonicalUrl="https://cocmasaka.org/radio"
      />
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-6">Let The Bible Speak</h1>
        <p className="text-xl mb-8">Radio program content coming soon...</p>
      </div>
    </PublicLayout>
  );
};

export default Radio;