import SEOHead from "../../components/SEOHead";
import PublicLayout from "../../components/layouts/PublicLayout";

const Contact = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact - Church of Christ Masaka",
    "description": "Get in touch with Church of Christ Masaka. Find our contact information and location."
  };

  return (
    <PublicLayout>
      <SEOHead
        title="Contact - Church of Christ Masaka"
        description="Get in touch with Church of Christ Masaka. Find our contact information and location."
        canonicalUrl="https://cocmasaka.org/contact"
      />
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-xl mb-8">Contact page content coming soon...</p>
      </div>
    </PublicLayout>
  );
};

export default Contact;