import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "SmartBuilds — Lead Leakage Audit",
  description:
    "A 10-minute audit for Indian real estate teams to find where enquiries are leaking before becoming site visits.",
};

export default function AuditPage() {
  return (
    <main className="audit-landing-page">
      <section className="audit-landing-hero">
        <div className="audit-landing-bg" aria-hidden="true" />
        <div className="audit-landing-shell">
          <div className="audit-landing-copy">
            <p className="audit-landing-badge">
              REAL ESTATE LEAD LEAKAGE AUDIT
            </p>

            <h1 className="audit-landing-title">
              <span>Your Ads Are Getting Leads.</span>
              <span>But Are Those Leads Becoming Site Visits?</span>
            </h1>

            <p className="audit-landing-subtitle">
              We audit your Instagram, WhatsApp, website, portal, call, and ad
              enquiry flow to find where leads may be getting lost before site
              visits.
            </p>

            <div className="audit-landing-actions">
              <a className="audit-landing-button audit-landing-button-primary" href="#book-audit">
                Book 10-Minute Audit
              </a>
              <a className="audit-landing-button audit-landing-button-secondary" href="#audit-areas">
                See What We Check
              </a>
            </div>

            <p className="audit-landing-note">
              No commitment. No long pitch. Just a clear view of your lead
              flow.
            </p>
          </div>

          <div className="audit-board-frame">
            <div className="audit-board-scroll">
              <Image
                className="audit-board-image"
                src="/dashboard.png"
                alt="Lead Leakage Audit Board showing source to site visit ratio, leak alerts, follow-ups, and owner daily report"
                width={1672}
                height={941}
                priority
                sizes="(min-width: 1280px) 780px, (min-width: 1024px) 58vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="audit-landing-section" id="audit-areas">
        <div className="audit-landing-section-inner">
          <p className="audit-landing-eyebrow">What We Check</p>
          <h2 className="audit-landing-section-title">
            Source, response, follow-up, and site-visit leakage in one view.
          </h2>
          <p className="audit-landing-section-copy">
            The audit traces each enquiry from first touch to visit booking, so
            your team can see whether the problem is source quality, assignment,
            missed follow-up, or unclear reporting.
          </p>
        </div>
      </section>

      <section className="audit-landing-cta" id="book-audit">
        <div className="audit-landing-cta-inner">
          <p className="audit-landing-eyebrow">10-Minute Audit</p>
          <h2 className="audit-landing-section-title">
            Find where your real estate enquiries are leaking.
          </h2>
          <a className="audit-landing-button audit-landing-button-primary" href="https://cal.com">
            Book 10-Minute Audit
          </a>
        </div>
      </section>
    </main>
  );
}
