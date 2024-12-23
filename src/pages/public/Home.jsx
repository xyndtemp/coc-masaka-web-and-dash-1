import SEOHead from "../../components/SEOHead";
import PublicLayout from "../../components/layouts/PublicLayout";

const Home = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Church of Christ Masaka",
    "url": "https://cocmasaka.org",
    "logo": "https://cocmasaka.org/coc.png",
    "description": "Welcome to Church of Christ Masaka - A community of believers dedicated to spreading God's word."
  };

  return (
    <PublicLayout>
      <SEOHead
        title="Church of Christ Masaka - Welcome"
        description="Welcome to Church of Christ Masaka - A community of believers dedicated to spreading God's word."
        canonicalUrl="https://cocmasaka.org"
      />
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-6">Welcome to Church of Christ Masaka</h1>
        <p className="text-xl mb-8">A community of believers dedicated to spreading God's word.</p>
      </div>
    </PublicLayout>
  );
};

export default Home;