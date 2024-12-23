import SEOHead from "../../components/SEOHead";
import PublicLayout from "../../components/layouts/PublicLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
      
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">Welcome to Church of Christ Masaka</h1>
          <p className="text-xl mb-8 max-w-2xl">Join us in worship and fellowship as we grow together in faith and understanding of God's word.</p>
          <Link to="/contact">
            <Button size="lg">Visit Us</Button>
          </Link>
        </div>
      </div>

      {/* Service Times */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Service Times</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Sunday Worship</h3>
              <p>10:00 AM - 12:00 PM</p>
            </div>
            <div className="text-center p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Bible Study</h3>
              <p>Wednesday 6:00 PM - 7:30 PM</p>
            </div>
            <div className="text-center p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Youth Service</h3>
              <p>Saturday 4:00 PM - 5:30 PM</p>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Home;