import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "38", label: "New enquiries today" },
  { value: "21", label: "Follow-ups due" },
  { value: "14", label: "Site visits this week" },
];

const leadDetails = [
  ["Lead", "Arjun Mehta"],
  ["Source", "WhatsApp"],
  ["Agent", "Neha"],
  ["Status", "Site Visit Booked"],
  ["Next", "Tomorrow 11:00 AM"],
];

function ArrowIcon() {
  return (
    <span className="smart-hero-arrow" aria-hidden="true">
      <svg viewBox="0 0 14 14" focusable="false">
        <path
          d="M4 10L10 4M5.5 4H10V8.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    </span>
  );
}

function FloatingStats() {
  return (
    <dl className="smart-floating-stats" aria-label="Lead control activity">
      {stats.map((stat, index) => (
        <div
          className={`smart-floating-stat smart-floating-stat-${index + 1}`}
          key={stat.label}
        >
          <dt className="smart-stat-number">{stat.value}</dt>
          <dd className="smart-stat-label">{stat.label}</dd>
        </div>
      ))}
    </dl>
  );
}

function LeadCard({ className = "" }: { className?: string }) {
  return (
    <aside
      className={`smart-lead-card ${className}`}
      aria-label="Booked lead dashboard preview"
    >
      <div className="smart-lead-rows">
        {leadDetails.map(([label, value]) => (
          <div className="smart-lead-row" key={label}>
            <span className="smart-lead-label">{label}</span>
            {label === "Status" ? (
              <span className="smart-status-pill">{value}</span>
            ) : (
              <span className="smart-lead-value">{value}</span>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05070a] text-white">
      <section className="smart-hero" aria-label="SmartBuilds hero">
        <div className="smart-hero-image" aria-hidden="true" />
        <div className="smart-hero-wordmark" aria-hidden="true">
          SmartBuilds
        </div>
        <div className="smart-hero-left-gradient" aria-hidden="true" />
        <div className="smart-hero-bottom-gradient" aria-hidden="true" />

        <nav className="smart-hero-nav" aria-label="Primary navigation">
          <div className="smart-nav-pills" aria-label="Landing sections">
            <Link href="/" className="smart-nav-pill">
              Home
            </Link>
            <Link href="/audit" className="smart-nav-pill">
              Problem
            </Link>
            <Link href="/audit#audit-areas" className="smart-nav-pill">
              System
            </Link>
            <Link href="/audit#book-audit" className="smart-nav-pill">
              Audit
            </Link>
          </div>

          <Link
            href="/"
            className="smart-nav-mark"
            aria-label="SmartBuilds Home"
          >
            <Image src="/logo.png" alt="" width={34} height={34} priority />
          </Link>

          <Link href="/audit#book-audit" className="smart-nav-action">
            <span className="smart-nav-action-long">Contact / Book Audit</span>
            <span className="smart-nav-action-short">Book Audit</span>
          </Link>
        </nav>

        <div className="smart-hero-inner">
          <div className="smart-hero-copy">
            <h1 className="smart-hero-headline">
              <span>Stop losing</span>
              <span>property enquiries</span>
              <span>after they arrive.</span>
            </h1>
            <p className="smart-hero-subheadline">
              SmartBuilds tracks every enquiry from WhatsApp, ads, portals,
              calls, and website forms &mdash; until it becomes a site visit.
            </p>
            <div className="smart-hero-actions">
              <Link
                className="smart-hero-button smart-hero-button-primary"
                href="/audit#book-audit"
              >
                <span>Book Audit</span>
                <ArrowIcon />
              </Link>
              <Link
                className="smart-hero-button smart-hero-button-secondary"
                href="/audit#audit-areas"
              >
                See System
              </Link>
            </div>
          </div>

          <FloatingStats />
          <LeadCard className="smart-proof-card" />
        </div>
      </section>
    </main>
  );
}
