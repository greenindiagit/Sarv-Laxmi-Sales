import React from "react";
import LegalLayout from "./legal-layout";
import "./quick.css";
const PrivacyPolicy = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <h1 className="text-center fw-bold mb-3"></h1>
          <LegalLayout title="Privacy Policy">
            <p className="text-muted">
              <strong>Effective Date:</strong> June 2026
            </p>

            <p>
              At <strong>Sarv Laxmi Sales Corporation</strong>, we value your
              privacy and are committed to protecting your personal information.
              This Privacy Policy explains how we collect, use, store, and
              safeguard the information you provide when you visit our website
              or interact with our business.
            </p>

            <hr />

            <h5>1. Information We Collect</h5>

            <h5 className="mt-1">Personal Information</h5>
            <ul>
              <li>Full Name</li>
              <li>Company Name</li>
              <li>Email Address</li>
              <li>Phone Number</li>
              <li>Shipping & Billing Address</li>
              <li>GST Number (if applicable)</li>
            </ul>

            <h5 className="mt-1">Business Information</h5>
            <ul>
              <li>Product Enquiries</li>
              <li>Purchase Orders</li>
              <li>Quotation Requests</li>
              <li>Customer Feedback</li>
              <li>Communication Records</li>
            </ul>

            <h5 className="mt-1">Technical Information</h5>
            <p>When you visit our website, we may automatically collect:</p>

            <ul>
              <li>IP Address</li>
              <li>Browser Type</li>
              <li>Device Information</li>
              <li>Operating System</li>
              <li>Pages Visited</li>
              <li>Date & Time of Visit</li>
              <li>Cookies and Analytics Data</li>
            </ul>

            <h5 className="mt-1">2. How We Use Your Information</h5>

            <p>We use your information to:</p>

            <ul>
              <li>Process enquiries and orders</li>
              <li>Provide quotations</li>
              <li>Deliver products and services</li>
              <li>Respond to customer support requests</li>
              <li>Improve our website and services</li>
              <li>Send order updates</li>
              <li>Send product information (where permitted)</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h5 className="mt-1">3. Cookies</h5>

            <p>Our website may use cookies to:</p>

            <ul>
              <li>Improve website performance</li>
              <li>Remember user preferences</li>
              <li>Analyze website traffic</li>
              <li>Enhance user experience</li>
            </ul>

            <p>
              You may disable cookies through your browser settings, although
              some website features may not function properly.
            </p>

            <h5 className="mt-1">4. Sharing of Information</h5>

            <p>We do not sell, rent, or trade your personal information.</p>

            <p>We may share information only with:</p>

            <ul>
              <li>Courier & Logistics Partners</li>
              <li>Payment Service Providers</li>
              <li>Government Authorities (where legally required)</li>
              <li>
                Trusted Technology Service Providers supporting our website and
                business operations
              </li>
            </ul>

            <p>
              All such parties are expected to protect your information
              appropriately.
            </p>

            <h5 className="mt-1">5. Data Security</h5>

            <p>
              We implement appropriate administrative, technical, and physical
              security measures to safeguard your personal information from
              unauthorized access, misuse, loss, or disclosure.
            </p>

            <p>
              However, no method of internet transmission or electronic storage
              is completely secure, and we cannot guarantee absolute security.
            </p>

            <h5 className="mt-1">6. Data Retention</h5>

            <p>We retain your information only for as long as necessary to:</p>

            <ul>
              <li>Complete business transactions</li>
              <li>Maintain customer records</li>
              <li>Meet legal, tax, and regulatory requirements</li>
              <li>Resolve disputes</li>
            </ul>

            <h5 className="mt-1">7. Third-Party Links</h5>

            <p>
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices or content of external
              websites. We encourage you to review their privacy policies before
              providing any personal information.
            </p>

            <h5 className="mt-1">8. Your Rights</h5>

            <p>Subject to applicable laws, you may have the right to:</p>

            <ul>
              <li>Access your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Withdraw consent for marketing communications</li>
              <li>Request information about how your data is processed</li>
            </ul>

            <p>
              To exercise these rights, please contact us using the details
              below.
            </p>

            <h5 className="mt-1">9. Children's Privacy</h5>

            <p>
              Our website and products are intended for business and commercial
              use. We do not knowingly collect personal information from
              individuals under the age of 18.
            </p>

            <h5 className="mt-1">10. Policy Updates</h5>

            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be published on this page along with the revised effective
              date.
            </p>

            <h5 className="mt-1">11. Contact Us</h5>

            <div className="card shadow-sm mt-3">
              <div className="card-body">
                <h5 className="fw-bold">Sarv Laxmi Sales Corporation</h5>

                <p className="text-muted">Security Sealing Solutions</p>

                <p>
                  <strong>Address:</strong>
                  <br />
                  Plot No. 2, Ground Floor, Kh. No. 408,
                  <br />
                  Sultanpur, Gadaipur,
                  <br />
                  New Delhi – 110030, India
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  <a href="tel:+918115131513">+91 81-1513-1513</a>
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:otlseals@gmail.com">otlseals@gmail.com</a>
                </p>

                <p>
                  <strong>Website:</strong>{" "}
                  <a
                    href="https://www.sarvlaxmisales.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.sarvlaxmisales.com
                  </a>
                </p>
              </div>
            </div>
          </LegalLayout>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
