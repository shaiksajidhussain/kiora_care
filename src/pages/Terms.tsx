import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="bg-background flex flex-col overflow-x-hidden min-h-screen w-full">
      <Header />
      
      <main className="w-full flex flex-col items-center max-w-[1200px] mx-auto mt-[120px] md:mt-[180px] px-4 md:px-8 pb-20">
        <div className="w-full max-w-[900px]">
          {/* Title */}
          <h1 className="text-foreground text-[clamp(42px,5.5vw,68px)] font-medium leading-none tracking-tight mb-4">
            Terms of Use
          </h1>
          
          <p className="text-muted-foreground text-base md:text-lg mb-8">
            Kendall Square Technology and Services Pvt. Ltd.
          </p>

          {/* Introduction */}
          <div className="mb-12">
            <p className="text-foreground text-base md:text-lg leading-relaxed">
              Welcome to kiora.care. This website ("Site") is operated by Kendall Square Technology and Services Pvt. Ltd. ("Company", "we", "us", or "our"). By accessing or using the Site, or submitting information through our contact form, you agree to comply with these Terms of Use ("Terms"). If you do not agree to these Terms, please do not use the Site.
            </p>
          </div>

          {/* Section 1 */}
          <section className="mb-10">
            <h2 className="text-foreground text-[clamp(28px,4vw,36px)] font-semibold mb-6">
              1. About the Company and Website
            </h2>
            <p className="text-foreground text-base md:text-lg leading-relaxed">
              Kendall Square Technology and Services Pvt. Ltd. provides information related to renal care and kidney health through the Site. The content on the Site is for general informational and educational purposes only. It is not medical advice and should not be used as a substitute for consultation with a qualified healthcare professional.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="text-foreground text-[clamp(28px,4vw,36px)] font-semibold mb-6">
              2. Eligibility
            </h2>
            <p className="text-foreground text-base md:text-lg leading-relaxed mb-4">
              By using the Site, you confirm that you are:
            </p>
            <ul className="list-disc list-inside text-foreground text-base md:text-lg leading-relaxed space-y-2 ml-4">
              <li>At least 18 years of age, and</li>
              <li>Legally capable of entering into a binding agreement under Indian law.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="text-foreground text-[clamp(28px,4vw,36px)] font-semibold mb-6">
              3. Use of the Site
            </h2>
            <p className="text-foreground text-base md:text-lg leading-relaxed mb-4">
              You agree to use the Site only for lawful purposes. You must not:
            </p>
            <ul className="list-disc list-inside text-foreground text-base md:text-lg leading-relaxed space-y-2 ml-4 mb-4">
              <li>Misuse or interfere with the security, functionality, or accessibility of the Site</li>
              <li>Upload or transmit harmful content, including viruses or malware</li>
              <li>Attempt to gain unauthorised access to Company systems or data</li>
              <li>Use automated tools (bots, scrapers, crawlers) to extract data without prior consent</li>
            </ul>
            <p className="text-foreground text-base md:text-lg leading-relaxed">
              The Company reserves the right to restrict or terminate access to anyone who violates these Terms.
            </p>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <h2 className="text-foreground text-[clamp(28px,4vw,36px)] font-semibold mb-6">
              4. Information You Provide
            </h2>
            <p className="text-foreground text-base md:text-lg leading-relaxed mb-4">
              When you submit your information through the contact form on the Site, you agree that:
            </p>
            <ul className="list-disc list-inside text-foreground text-base md:text-lg leading-relaxed space-y-2 ml-4 mb-4">
              <li>The information you provide is accurate and truthful</li>
              <li>The Company may use this information to respond to your query or provide information you requested</li>
            </ul>
            <p className="text-foreground text-base md:text-lg leading-relaxed">
              Use of your information is governed by our Privacy Policy, which forms an integral part of these Terms.
            </p>
          </section>

          {/* Section 5 */}
          <section className="mb-10">
            <h2 className="text-foreground text-[clamp(28px,4vw,36px)] font-semibold mb-6">
              5. Intellectual Property
            </h2>
            <p className="text-foreground text-base md:text-lg leading-relaxed mb-4">
              All content on the Site—including text, graphics, images, logos, and design—is owned by Kendall Square Technology and Services Pvt. Ltd. or its licensors. You may not copy, reproduce, distribute, modify, or create derivative works without prior written permission from the Company.
            </p>
            <p className="text-foreground text-base md:text-lg leading-relaxed">
              You may use information from the Site for personal, non-commercial purposes only, provided content is not altered and the Company is cited as the source.
            </p>
          </section>

          {/* Section 6 */}
          <section className="mb-10">
            <h2 className="text-foreground text-[clamp(28px,4vw,36px)] font-semibold mb-6">
              6. No Medical Advice
            </h2>
            <p className="text-foreground text-base md:text-lg leading-relaxed">
              Information on the Site is for general awareness only and is not medical advice, diagnosis, or treatment. For any health concerns, consult a qualified medical professional. Kendall Square Technology and Services Pvt. Ltd. is not responsible for decisions or actions you take based on content on the Site.
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-10">
            <h2 className="text-foreground text-[clamp(28px,4vw,36px)] font-semibold mb-6">
              7. Third-Party Links
            </h2>
            <p className="text-foreground text-base md:text-lg leading-relaxed">
              The Site may include links to external websites for convenience. These links do not constitute endorsement by Kendall Square Technology and Services Pvt. Ltd., and the Company is not responsible for the content, accuracy, or privacy practices of third-party sites.
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-10">
            <h2 className="text-foreground text-[clamp(28px,4vw,36px)] font-semibold mb-6">
              8. Limitation of Liability
            </h2>
            <p className="text-foreground text-base md:text-lg leading-relaxed mb-4">
              To the fullest extent permitted under Indian law, Kendall Square Technology and Services Pvt. Ltd. shall not be liable for:
            </p>
            <ul className="list-disc list-inside text-foreground text-base md:text-lg leading-relaxed space-y-2 ml-4 mb-4">
              <li>Indirect, incidental, special, or consequential damages</li>
              <li>Losses arising from your use or inability to use the Site</li>
              <li>Errors, inaccuracies, or delays in content</li>
            </ul>
            <p className="text-foreground text-base md:text-lg leading-relaxed">
              Your sole and exclusive remedy for dissatisfaction with the Site is to discontinue use.
            </p>
          </section>

          {/* Section 9 */}
          <section className="mb-10">
            <h2 className="text-foreground text-[clamp(28px,4vw,36px)] font-semibold mb-6">
              9. Indemnification
            </h2>
            <p className="text-foreground text-base md:text-lg leading-relaxed">
              You agree to indemnify, defend, and hold harmless Kendall Square Technology and Services Pvt. Ltd., its officers, employees, and affiliates from any claims, liabilities, losses, or expenses arising from:
            </p>
            <ul className="list-disc list-inside text-foreground text-base md:text-lg leading-relaxed space-y-2 ml-4 mt-4">
              <li>Your misuse of the Site</li>
              <li>Your breach of these Terms</li>
              <li>Your violation of applicable laws</li>
            </ul>
          </section>

          {/* Section 10 */}
          <section className="mb-10">
            <h2 className="text-foreground text-[clamp(28px,4vw,36px)] font-semibold mb-6">
              10. Changes to These Terms
            </h2>
            <p className="text-foreground text-base md:text-lg leading-relaxed">
              Kendall Square Technology and Services Pvt. Ltd. may update these Terms from time to time. Changes are effective upon posting on this page. Continued use of the Site constitutes acceptance of the updated Terms.
            </p>
          </section>

          {/* Section 11 */}
          <section className="mb-10">
            <h2 className="text-foreground text-[clamp(28px,4vw,36px)] font-semibold mb-6">
              11. Governing Law and Jurisdiction
            </h2>
            <p className="text-foreground text-base md:text-lg leading-relaxed">
              These Terms are governed by the laws of India. Any disputes arising from or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka, unless otherwise required by applicable law.
            </p>
          </section>

          {/* Section 12 */}
          <section className="mb-10">
            <h2 className="text-foreground text-[clamp(28px,4vw,36px)] font-semibold mb-6">
              12. Contact Information
            </h2>
            <p className="text-foreground text-base md:text-lg leading-relaxed ">
              For any questions regarding these Terms, please contact:
            </p>
            <p className="text-foreground text-base md:text-lg leading-relaxed ">
              Kendall Square Technology and Services Pvt. Ltd.
            </p>
            <p className="text-foreground text-base md:text-lg leading-relaxed">
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

export default Terms;

