import React from "react";

const LegalPage = () => {
  return (
    <div className="legal-documents">
      <section id="privacy-policy" className="py-6 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
          <p>Replace this text with your Privacy Policy content.</p>
        </div>
      </section>

      <section id="terms-of-service" className="py-6 bg-gray-200">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
          <p>Replace this text with your Terms of Service content.</p>
        </div>
      </section>

      <section id="cookie-policy" className="py-6 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">Cookie Policy</h2>
          <p>Replace this text with your Cookie Policy content.</p>
        </div>
      </section>
    </div>
  );
};

export default LegalPage;
