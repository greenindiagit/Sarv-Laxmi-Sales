import React from "react";
import LegalLayout from "./legal-layout";
import "./quick.css"

const Disclaimer = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <LegalLayout title="Disclaimer">
            <p className="text-muted">
              <strong>Last Updated:</strong> June 2026
            </p>

            <p>
              Welcome to <strong>Sarv Laxmi Sales Corporation</strong>. By
              accessing and using this website, you acknowledge and agree to the
              terms and conditions outlined in this Disclaimer.
            </p>

            <hr />

            <h5>General Information</h5>
            <p>
              The information provided on this website is for general business
              and informational purposes only. While we make every effort to
              ensure that the information is accurate and up to date, Sarv Laxmi
              Sales Corporation makes no warranties regarding the accuracy,
              completeness, or reliability of the information displayed.
            </p>

            <h5>Product Specifications</h5>
            <p>
              Product images, colours, dimensions, specifications, and packaging
              shown on this website are for reference purposes only. Actual
              products may vary due to manufacturing improvements, product
              updates, or display settings.
            </p>

            <h5>Customization Services</h5>
            <p>
              We provide customized security seals including logo printing,
              laser marking, barcodes, QR codes, serial numbering, and colour
              options according to customer requirements. Customers are
              responsible for approving all artwork before production.
            </p>

            <h5>Intellectual Property</h5>
            <p>
              All content on this website, including text, graphics, logos,
              product images, and designs, is the property of Sarv Laxmi Sales
              Corporation unless otherwise stated. Unauthorized use,
              reproduction, or distribution is strictly prohibited.
            </p>

            <h5>Third-Party Links</h5>
            <p>
              This website may contain links to third-party websites. We are not
              responsible for the content, privacy policies, or practices of
              these external websites.
            </p>

            <h5>Limitation of Liability</h5>
            <p>
              Sarv Laxmi Sales Corporation shall not be liable for any direct,
              indirect, incidental, or consequential damages arising from the
              use of this website or reliance on its content.
            </p>

            <h5>Product Usage</h5>
            <p>
              Our security seals are designed to provide tamper-evident
              protection. They are not intended to prevent forced entry or
              destructive unauthorized access.
            </p>

            <h5>Pricing and Availability</h5>
            <p>
              Product prices, availability, specifications, and delivery
              timelines are subject to change without prior notice. All orders
              are subject to acceptance and stock availability.
            </p>

            <h5>Changes to This Disclaimer</h5>
            <p>
              We reserve the right to modify this Disclaimer at any time without
              prior notice. Changes become effective immediately after they are
              published on this page.
            </p>

            <h5>Contact Us</h5>

            <div className="card mt-3 shadow-sm">
              <div className="card-body">
                <h5>Sarv Laxmi Sales Corporation</h5>

                <p className="mb-2">
                  <strong>Address:</strong>
                  <br />
                  Plot No. 2, Ground Floor, Kh. No. 408,
                  <br />
                  Sultanpur, Gadaipur,
                  <br />
                  New Delhi – 110030, India
                </p>

                <p className="mb-1">
                  <strong>Phone:</strong>{" "}
                  <a href="tel:+918115131513">+91 81-1513-1513</a>
                </p>

                <p className="mb-1">
                  <strong>Email:</strong>{" "}
                  <a href="mailto:otlseals@gmail.com">otlseals@gmail.com</a>
                </p>

                <p className="mb-0">
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

export default Disclaimer;
