import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Privacy = () => {
  return (
    <div className="bg-white flex flex-col overflow-x-hidden min-h-screen w-full">
      <Header />
      
      <main className="w-full flex flex-col items-center max-w-[1200px] mx-auto mt-[120px] md:mt-[180px] px-4 md:px-8 pb-20">
        <div className="w-full max-w-[900px]">
          {/* Title */}
          <h1 className="text-black text-[clamp(42px,5.5vw,68px)] font-medium leading-none tracking-tight mb-4">
            Privacy Policy
          </h1>
          
          <p className="text-[#797B8A] text-base md:text-lg mb-8">
            Kendall Square Technology and Services Pvt. Ltd.
          </p>
          
          <p className="text-[#797B8A] text-sm md:text-base mb-12">
            Last updated: 19th November 2025
          </p>

          {/* Introduction */}
          <div className="mb-12">
            <p className="text-black text-base md:text-lg leading-relaxed">
              At Kiora Care, your trust matters to us. This Privacy Policy explains how we collect, use, store, and protect information when you visit kiora.care, operated by Kendall Square Technology and Services Pvt. Ltd. ("we", "us", "our"). By using our Website, you agree to the practices described below.
            </p>
          </div>

          {/* Section 1 */}
          <section className="mb-10">
            <h2 className="text-black text-[clamp(28px,4vw,36px)] font-semibold mb-6">
              1. Information We Collect
            </h2>
            
            <div className="mb-6">
              <h3 className="text-black text-[clamp(20px,2.5vw,24px)] font-semibold mb-4">
                1.1. Information You Provide
              </h3>
              <p className="text-black text-base md:text-lg leading-relaxed mb-4">
                When you submit the contact form, we collect:
              </p>
              <ul className="list-disc list-inside text-black text-base md:text-lg leading-relaxed space-y-2 ml-4">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Address</li>
                <li>Any message or information you voluntarily share</li>
              </ul>
              <p className="text-black text-base md:text-lg leading-relaxed mt-4">
                We use this information to respond to your request or to provide information you have asked for.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-black text-[clamp(20px,2.5vw,24px)] font-semibold mb-4">
                1.2. Information Collected Automatically
              </h3>
              <p className="text-black text-base md:text-lg leading-relaxed mb-4">
                When you browse the Website, we may collect:
              </p>
              <ul className="list-disc list-inside text-black text-base md:text-lg leading-relaxed space-y-2 ml-4">
                <li>IP address</li>
                <li>Browser and device details</li>
                <li>Pages visited, links clicked, and time spent</li>
                <li>Cookies and analytics data (through tools like Google Analytics or similar platforms)</li>
              </ul>
              <p className="text-black text-base md:text-lg leading-relaxed mt-4">
                This helps us improve the Website and understand usage patterns. We do not collect any medical or health information through the public website.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="text-black text-[clamp(28px,4vw,36px)] font-semibold mb-6">
              2. How We Use Your Information
            </h2>
            <p className="text-black text-base md:text-lg leading-relaxed mb-4">
              Your information may be used to:
            </p>
            <ul className="list-disc list-inside text-black text-base md:text-lg leading-relaxed space-y-2 ml-4 mb-4">
              <li>Respond to enquiries submitted through the contact form</li>
              <li>Improve Website content, design, and user experience</li>
              <li>Monitor Website traffic and performance</li>
              <li>Enhance Website security</li>
              <li>Comply with legal obligations under Indian law, including the Digital Personal Data Protection (DPDP) Act, 2023</li>
            </ul>
            <p className="text-black text-base md:text-lg leading-relaxed">
              We do not sell or rent your information to third parties.
            </p>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="text-black text-[clamp(28px,4vw,36px)] font-semibold mb-6">
              3. Cookies and Tracking Technologies
            </h2>
            <p className="text-black text-base md:text-lg leading-relaxed mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc list-inside text-black text-base md:text-lg leading-relaxed space-y-2 ml-4 mb-4">
              <li>Make the Website function properly</li>
              <li>Understand how visitors engage with content</li>
              <li>Improve performance and user experience</li>
            </ul>
            <p className="text-black text-base md:text-lg leading-relaxed">
              You may choose to disable cookies in your browser settings, though some features may not work as intended.
            </p>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <h2 className="text-black text-[clamp(28px,4vw,36px)] font-semibold mb-6">
              4. Sharing of Information
            </h2>
            <p className="text-black text-base md:text-lg leading-relaxed mb-4">
              We may share your information only in the following situations:
            </p>
            <ul className="list-disc list-inside text-black text-base md:text-lg leading-relaxed space-y-2 ml-4 mb-4">
              <li><strong>Service Providers:</strong> Vendors who support Website hosting, analytics, email communication, or related infrastructure.</li>
              <li><strong>Legal Requirements:</strong> If required by law, regulation, or governmental authority.</li>
              <li><strong>Business Changes:</strong> In the event of a merger, acquisition, or restructuring, your information may be transferred to the new entity.</li>
            </ul>
            <p className="text-black text-base md:text-lg leading-relaxed">
              We do not share your information with third parties for marketing or advertising purposes.
            </p>
          </section>

          {/* Section 5 */}
          <section className="mb-10">
            <h2 className="text-black text-[clamp(28px,4vw,36px)] font-semibold mb-6">
              5. How We Secure Your Data
            </h2>
            <p className="text-black text-base md:text-lg leading-relaxed mb-4">
              We take the protection of your information seriously. Kiora Care uses a combination of technical, organisational, and process-level safeguards to secure your data, including:
            </p>
            <ul className="list-disc list-inside text-black text-base md:text-lg leading-relaxed space-y-2 ml-4 mb-4">
              <li>Encrypted connections between your browser and our servers</li>
              <li>Access-controlled storage systems that limit data visibility to authorised personnel</li>
              <li>Regular security reviews and continuous monitoring for potential vulnerabilities</li>
              <li>Role-based access controls ensuring information is handled only for legitimate purposes</li>
              <li>Due-diligence checks on third-party vendors to ensure strong data protection standards</li>
              <li>Data minimisation and limited retention, collecting only what is necessary and retaining it only as long as needed</li>
              <li>Secure backup and recovery processes to prevent accidental loss</li>
            </ul>
            <p className="text-black text-base md:text-lg leading-relaxed">
              These safeguards help ensure that your personal information is handled responsibly and protected in accordance with applicable Indian data protection laws.
            </p>
          </section>

          {/* Section 6 */}
          <section className="mb-10">
            <h2 className="text-black text-[clamp(28px,4vw,36px)] font-semibold mb-6">
              6. Data Retention
            </h2>
            <p className="text-black text-base md:text-lg leading-relaxed mb-4">
              We retain your information:
            </p>
            <ul className="list-disc list-inside text-black text-base md:text-lg leading-relaxed space-y-2 ml-4 mb-4">
              <li>Only for as long as necessary to fulfil the purpose for which it was collected</li>
              <li>For improving or analysing Website performance</li>
              <li>As required by applicable laws and regulations</li>
            </ul>
            <p className="text-black text-base md:text-lg leading-relaxed">
              After this period, your information is securely deleted or anonymised.
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-10">
            <h2 className="text-black text-[clamp(28px,4vw,36px)] font-semibold mb-6">
              7. Your Rights
            </h2>
            <p className="text-black text-base md:text-lg leading-relaxed mb-4">
              Under Indian law, including the DPDP Act, you have the right to:
            </p>
            <ul className="list-disc list-inside text-black text-base md:text-lg leading-relaxed space-y-2 ml-4 mb-4">
              <li>Access the personal information we hold about you</li>
              <li>Request corrections or updates</li>
              <li>Ask for deletion of your personal information</li>
              <li>Withdraw consent for communication</li>
            </ul>
            <p className="text-black text-base md:text-lg leading-relaxed">
              You may exercise these rights by writing to: <a href="mailto:care@kiora.care" className="text-primary hover:underline">care@kiora.care</a>
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-10">
            <h2 className="text-black text-[clamp(28px,4vw,36px)] font-semibold mb-6">
              8. Third-Party Websites
            </h2>
            <p className="text-black text-base md:text-lg leading-relaxed">
              Our Website may link to external sites. We are not responsible for their privacy practices or content. We encourage you to review their respective privacy policies.
            </p>
          </section>

          {/* Section 9 */}
          <section className="mb-10">
            <h2 className="text-black text-[clamp(28px,4vw,36px)] font-semibold mb-6">
              9. Children's Privacy
            </h2>
            <p className="text-black text-base md:text-lg leading-relaxed">
              The Website is intended for use by adults. We do not knowingly collect personal information from individuals under 18 years of age.
            </p>
          </section>

          {/* Section 10 */}
          <section className="mb-10">
            <h2 className="text-black text-[clamp(28px,4vw,36px)] font-semibold mb-6">
              10. Changes to This Privacy Policy
            </h2>
            <p className="text-black text-base md:text-lg leading-relaxed">
              We may update this Privacy Policy periodically. Any changes will be posted here with an updated "Last updated" date. We encourage you to review this page occasionally.
            </p>
          </section>

          {/* Section 11 */}
          <section className="mb-10">
            <h2 className="text-black text-[clamp(28px,4vw,36px)] font-semibold mb-6">
              11. Contact Us
            </h2>
            <p className="text-black text-base md:text-lg leading-relaxed ">
              For questions, concerns, or privacy-related requests, please reach out to:
            </p>
            <p className="text-black text-base md:text-lg leading-relaxed">
              Kendall Square Technology and Services Pvt. Ltd.
            </p>
            <p className="text-black text-base md:text-lg leading-relaxed">
              Email: <a href="mailto:care@kiora.care" className="text-primary hover:underline">care@kiora.care</a>
            </p>
          </section>
        </div>
      </main>

      <div className="w-full px-4 md:px-4 lg:px-6 max-w-full overflow-x-hidden">
        <Footer />
      </div>
    </div>
  );
};

export default Privacy;


