import React, { useEffect } from "react";

const TermsCondition = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <h1 className="text-center">Terms and Conditions for UsedCarWale</h1>
      </div>
      <div className="row mt-3">
        <div className="col-md-12">
          <section className="section">
            <h3>Account Registration</h3>
            <ul>
              <li>●
                Users must register and create an account to post ads or list
                vehicles on UsedCarWale.
              </li>
              <li>●
                The information provided during registration must be accurate,
                complete, and up-to-date.
              </li>
            </ul>
          </section>
          <section className="section">
            <h3>Types of Listings</h3>
            <ul>
              <li>●
                Free Ads: Users can post free ads to list their used cars for a
                limited time, with basic visibility on the platform.
              </li>
              <li>●
                Free Listing plan is open only for individuals or private party
                sellers who list their car for sale on UsedCarWale.
              </li>
              <li>●
                Dealers, brokers or those individuals who trade in used cars are
                not eligible.
              </li>
            </ul>
          </section>
          <section className="section">
            <h3>Ad Content Guidelines</h3>
            <ul>
              <li>●
                Ads must contain accurate, honest, and up-to-date information
                about the vehicle being sold.
              </li>
              <li>●
                Misleading, false, or fraudulent information is strictly
                prohibited.
              </li>
              <li>●
                All images and descriptions must represent the actual vehicle
                being listed.
              </li>
              <li>●
                Users are responsible for the content of their ads and ensuring
                it complies with applicable laws.
              </li>
            </ul>
          </section>
          <section className="section">
            <h3>Fees and Payments</h3>
            <ul>
              <li>●
                Fees for paid ads are non-refundable and must be paid upfront
                before the ad is published.
              </li>
              <li>●
                UsedCarWale reserves the right to change the pricing for paid
                ads at any time, with prior notice.
              </li>
              <li>●
                Any applicable taxes or charges will be borne by the user.
              </li>
            </ul>
          </section>
          <section className="section">
            <h3>Ad Approval and Moderation</h3>
            <ul>
              <li>●
                All ads are subject to review and approval by UsedCarWale before
                being published.
              </li>
              <li>●
                UsedCarWale reserves the right to reject, modify, or remove any
                ad that violates these terms or is deemed inappropriate, without
                prior notice.
              </li>
            </ul>
          </section>
          <section className="section">
            <h3>Listing Duration and Renewal</h3>
            <ul>
              <li>●
                Free ads have a set duration, after which they will be
                automatically removed unless renewed by the user.
              </li>
              <li>●
                Paid ads may offer extended durations and may be renewed at an
                additional cost.
              </li>
            </ul>
          </section>
          <section className="section">
            <h3>Buyer and Seller Responsibilities</h3>
            <ul>
              <li>●
                Sellers must ensure that they have legal ownership of the
                vehicle being listed.
              </li>
              <li>●
                Buyers are responsible for verifying the authenticity and
                condition of the vehicle before purchase.
              </li>
              <li>●
                UsedCarWale is not responsible for the accuracy of listings or
                any transactions between buyers and sellers.
              </li>
            </ul>
          </section>
          <section className="section">
            <h3>Prohibited Activities</h3>
            <ul>
              <li>●
                Users may not list stolen, illegal, or unregistered vehicles.
              </li>
              <li>●
                No ad may contain offensive, abusive, or defamatory content.
              </li>
              <li>●
                Users may not use the platform for spamming, scamming, or any
                unlawful activities.
              </li>
            </ul>
          </section>
          <section className="section">
            <h3>Liability Limitation</h3>
            <ul>
              <li>●
                UsedCarWale is not liable for any direct or indirect damages
                resulting from transactions or interactions between users on the
                platform.
              </li>
              <li>●
                The platform acts solely as a marketplace for connecting buyers
                and sellers.
              </li>
            </ul>
          </section>
          <section className="section">
            <h3>Privacy Policy</h3>
            <ul>
              <li>●
                Users' personal information is collected, used, and protected in
                accordance
              </li>
              <li>●
                Users' personal information is collected, used, and protected in
                accordance with UsedCarWale's Privacy Policy.
              </li>
              <li>●
                Users agree to the sharing of their contact information with
                potential buyers or sellers.
              </li>
              <li>●
                Users authorise Usedcarwale to SMS or call in connection with
                car advertisement.
              </li>
            </ul>
          </section>
          <section className="section">
            <h3>Termination of Service</h3>
            <ul>
              <li>●
                UsedCarWale reserves the right to terminate or suspend any user
                account that violates these terms or engages in prohibited
                activities.
              </li>
              <li>●
                Users may terminate their account at any time by contacting
                customer support.
              </li>
            </ul>
          </section>
          <section className="section">
            <h3>Amendments to Terms</h3>
            <ul>
              <li>●
                UsedCarWale reserves the right to amend these terms and
                conditions at any time, with prior notice to users.
              </li>
              <li>●
                Continued use of the platform after any amendments indicates
                acceptance of the new terms.
              </li>
            </ul>
          </section>
          <section className="section">
            <h3>Governing Law</h3>
            <ul>
              <li>●
                These terms and conditions are governed by and construed in
                accordance with the laws of India, New Delhi.
              </li>
              <li>●
                Any disputes arising from the use of the platform will be
                subject to the exclusive jurisdiction of the courts in Delhi /
                New Delhi.
              </li>
              <li>●
                The existence of a dispute, if any, shall not constitute a claim
                against UsedCarWale.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsCondition;
