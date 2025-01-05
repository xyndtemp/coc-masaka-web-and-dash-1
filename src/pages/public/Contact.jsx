import SEOHead from "../../components/SEOHead";
import PublicLayout from "../../components/layouts/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail } from "lucide-react";

const Contact = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact - Church of Christ Masaka",
    "description": "Get in touch with Church of Christ Masaka. Find our contact information and location."
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
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
      
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 mr-4 text-primary" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-gray-600">Jakanwa Road, after Old Abattoir, Masaka</p>
                  <p className="text-gray-600">P.O.Box 424, Maraba</p>
                  <p className="text-gray-600">Karu L.G. Area, Nasarawa State</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="w-6 h-6 mr-4 text-primary" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-gray-600">+256 123 456 789</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="w-6 h-6 mr-4 text-primary" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600">info@cocmasaka.org</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  className="min-h-[150px]"
                  required
                />
              </div>
              <Button type="submit">Send Message</Button>
            </form>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Contact;