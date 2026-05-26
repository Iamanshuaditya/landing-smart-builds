"use client";

import { useState, useEffect, useRef } from "react";

// ─── Dashboard Mock Data ──────────────────────────────────────────────────────

const dashboardMetrics = [
  { label: "Total Enquiries", value: "142", trend: "+12%", accent: "#3B82F6" },
  { label: "WhatsApp Leads", value: "87", trend: "+8%", accent: "#60A5FA" },
  { label: "Follow-ups Due", value: "34", trend: "today", accent: "#F59E0B" },
  { label: "Overdue Leads", value: "19", trend: "urgent", accent: "#EF4444" },
  { label: "Site Visits Booked", value: "23", trend: "+5", accent: "#22C55E" },
  { label: "Leads Lost", value: "41", trend: "follow-up", accent: "#9CA3AF" },
];

const sourceBreakdown = [
  { source: "Instagram Ads", enquiries: 38, siteVisits: 11, ratio: "29%" },
  { source: "Meta Ads", enquiries: 44, siteVisits: 9, ratio: "20%" },
  { source: "WhatsApp", enquiries: 28, siteVisits: 8, ratio: "29%" },
  { source: "Property Portals", enquiries: 19, siteVisits: 3, ratio: "16%" },
  { source: "Google Calls", enquiries: 13, siteVisits: 4, ratio: "31%" },
];

const recentActivity = [
  { type: "visit", lead: "Priya Sharma", source: "Instagram", agent: "Rahul", time: "10:30 AM" },
  { type: "followup", lead: "Vikram Patel", source: "Meta Ads", agent: "Neha", time: "9:45 AM" },
  { type: "new", lead: "Ankit Gupta", source: "WhatsApp", agent: "Rahul", time: "9:15 AM" },
  { type: "lost", lead: "Sunita Reddy", source: "Portal", agent: "Neha", time: "Yesterday" },
];

const ownerReportItems = [
  { label: "New Enquiries Today", value: "12", status: "up" },
  { label: "Site Visits This Week", value: "18", status: "up" },
  { label: "Overdue Follow-ups", value: "19", status: "alert" },
  { label: "Conversion Rate", value: "24%", status: "neutral" },
];

// ─── Animated Counter Hook ────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1200, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// ─── Animated Dashboard Card ───────────────────────────────────────────────────

function DashboardCard() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useCountUp(87, 1400, isVisible);

  return (
    <div
      ref={ref}
      className={`audit-dashboard-card ${isVisible ? "audit-dashboard-visible" : ""}`}
      aria-label="Lead flow dashboard preview"
    >
      {/* Header */}
      <div className="audit-dash-header">
        <div>
          <p className="audit-dash-title">Lead Control Room</p>
          <p className="audit-dash-subtitle">Live overview — May 2026</p>
        </div>
        <div className="audit-dash-live">
          <span className="audit-live-dot" />
          <span>Live</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="audit-metrics-grid">
        {dashboardMetrics.map((m, i) => (
          <div className="audit-metric-item" key={m.label} style={{ animationDelay: `${i * 60}ms` }}>
            <span className="audit-metric-dot" style={{ backgroundColor: m.accent }} />
            <div className="audit-metric-body">
              <span className="audit-metric-value">{m.value}</span>
              <span className="audit-metric-label">{m.label}</span>
            </div>
            {m.trend !== "today" && m.trend !== "urgent" && m.trend !== "follow-up" && (
              <span className="audit-metric-trend">{m.trend}</span>
            )}
            {m.trend === "urgent" && (
              <span className="audit-metric-trend audit-trend-urgent">⚠</span>
            )}
          </div>
        ))}
      </div>

      {/* Source Breakdown */}
      <div className="audit-section-block">
        <p className="audit-block-title">Source → Site Visit Ratio</p>
        {sourceBreakdown.map((row) => (
          <div className="audit-source-row" key={row.source}>
            <span className="audit-source-name">{row.source}</span>
            <div className="audit-source-bar-wrap">
              <div
                className="audit-source-bar"
                style={{ width: `${isVisible ? row.ratio : "0%"}`, backgroundColor: "#3B82F6" }}
              />
            </div>
            <span className="audit-source-ratio">{row.ratio}</span>
            <span className="audit-source-visits">{row.siteVisits} visits</span>
          </div>
        ))}
      </div>

      {/* Activity Feed */}
      <div className="audit-section-block">
        <p className="audit-block-title">Recent Activity</p>
        {recentActivity.map((item) => (
          <div className="audit-activity-row" key={item.lead}>
            <span className={`audit-activity-dot audit-activity-${item.type}`} />
            <span className="audit-activity-lead">{item.lead}</span>
            <span className="audit-activity-source">{item.source}</span>
            <span className="audit-activity-agent">{item.agent}</span>
            <span className="audit-activity-time">{item.time}</span>
          </div>
        ))}
      </div>

      {/* Owner Report Strip */}
      <div className="audit-owner-strip">
        <p className="audit-block-title">Owner Daily Report</p>
        <div className="audit-owner-grid">
          {ownerReportItems.map((item) => (
            <div className="audit-owner-item" key={item.label}>
              <span className="audit-owner-value">{item.value}</span>
              <span className="audit-owner-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Audit Page Component ─────────────────────────────────────────────────────

export default function AuditPage() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true));

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="audit-page">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="audit-hero" ref={heroRef}>
        <div className="audit-hero-bg" aria-hidden="true" />
        <div className="audit-container">
          <div className="audit-hero-grid">
            {/* Left: Copy */}
            <div className={`audit-hero-copy ${isVisible ? "audit-fade-up" : ""}`}>
              <span className="smart-badge">Real Estate Lead Leakage Audit</span>

              <h1 className="audit-headline">
                Your Ads Are Getting Leads.
                <br />
                <span className="audit-headline-accent">But Are Those Leads Becoming Site Visits?</span>
              </h1>

              <p className="audit-subheadline">
                We audit your Instagram, WhatsApp, website, portal, and ad enquiry flow
                to find where leads may be getting lost before site visits.
              </p>

              <div className="audit-hero-actions">
                <a href="#book-audit" className="smart-button smart-button-primary audit-cta-primary">
                  Book 10-Minute Audit
                </a>
                <a href="#audit-areas" className="smart-button smart-button-secondary">
                  See What We Check
                </a>
              </div>

              <p className="audit-hero-footnote">
                No commitment. No long pitch. Just a clear view of your lead flow.
              </p>
            </div>

            {/* Right: Dashboard */}
            <div className={`audit-hero-dashboard ${isVisible ? "audit-fade-left" : ""}`}>
              <DashboardCard />
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem Section ──────────────────────────────────────── */}
      <section className="audit-section audit-problem-section">
        <div className="audit-container">
          <h2 className="audit-section-title audit-title-center">
            Most Real Estate Teams Don&apos;t Have a Lead Problem.
            <br />
            <span className="audit-title-muted">They Have a Tracking Problem.</span>
          </h2>

          <div className="audit-problem-grid">
            {[
              { step: "01", title: "Ads generate enquiries", desc: "Meta, Instagram, Google — enquiries start coming in." },
              { step: "02", title: "Enquiries go to WhatsApp", desc: "Every lead lands in a WhatsApp chat or phone call log." },
              { step: "03", title: "Sales team follows up manually", desc: "Agents pick up chats, but tracking is inconsistent." },
              { step: "04", title: "Some leads get missed", desc: "Without a system, follow-ups depend on individual memory." },
              { step: "05", title: "Owner lacks source visibility", desc: "Which ad or portal actually produced site visits is unclear." },
              { step: "06", title: "Old leads disappear", desc: "Weeks-old enquiries sit unread while the team focuses on new ones." },
            ].map((card) => (
              <div className="audit-problem-card" key={card.step}>
                <span className="audit-problem-step">{card.step}</span>
                <h3 className="audit-problem-title">{card.title}</h3>
                <p className="audit-problem-desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Audit ────────────────────────────────────────── */}
      <section className="audit-section audit-audit-section" id="audit-areas">
        <div className="audit-container">
          <p className="audit-section-eyebrow">The Audit</p>
          <h2 className="audit-section-title">
            6 Areas We Check in Your Enquiry Flow
          </h2>
          <p className="audit-section-desc">
            Each audit card represents a point where leads typically leak before a site visit is booked.
          </p>

          <div className="audit-cards-grid">
            {[
              {
                num: "01",
                title: "Ad → WhatsApp Flow",
                desc: "Check whether ad enquiries are source-tagged or entering WhatsApp blindly.",
                tag: "Source Tracking",
              },
              {
                num: "02",
                title: "WhatsApp Lead Handling",
                desc: "Check whether leads are assigned, followed up, labeled, and tracked in one place.",
                tag: "Lead Assignment",
              },
              {
                num: "03",
                title: "Follow-Up Discipline",
                desc: "Check whether every lead has a next follow-up date and overdue visibility.",
                tag: "Follow-Up Control",
              },
              {
                num: "04",
                title: "Site Visit Tracking",
                desc: "Check whether enquiries are connected to booked, confirmed, visited, no-show, and lost stages.",
                tag: "Visit Pipeline",
              },
              {
                num: "05",
                title: "Source ROI",
                desc: "Check whether Instagram, Meta ads, portals, Google calls, and website enquiries are tracked separately.",
                tag: "Marketing ROI",
              },
              {
                num: "06",
                title: "Owner Visibility",
                desc: "Check whether the owner or sales head can see daily lead status without asking the team manually.",
                tag: "Control Room",
              },
            ].map((card) => (
              <div className="audit-card" key={card.num}>
                <div className="audit-card-top">
                  <span className="audit-card-num">{card.num}</span>
                  <span className="audit-card-tag">{card.tag}</span>
                </div>
                <h3 className="audit-card-title">{card.title}</h3>
                <p className="audit-card-desc">{card.desc}</p>
                <div className="audit-card-line" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Before vs After ─────────────────────────────────────── */}
      <section className="audit-section audit-comparison-section">
        <div className="audit-container">
          <h2 className="audit-section-title audit-title-center">
            Before SmartBuilds vs. After
          </h2>

          <div className="audit-comparison-grid">
            <div className="audit-comparison-col audit-comparison-before">
              <div className="audit-comp-header audit-comp-before-header">
                <span>Before SmartBuilds</span>
              </div>
              <ul className="audit-comp-list">
                {[
                  "Leads scattered across WhatsApp, calls, portals, and Instagram DMs",
                  "No clear owner visibility — reports are verbal",
                  "Follow-ups depend on individual memory",
                  "Old leads forgotten after a few days",
                  "No source-to-site-visit tracking",
                  "Team reports manually — data is always stale",
                ].map((item) => (
                  <li className="audit-comp-item audit-comp-item-before" key={item}>
                    <span className="audit-comp-icon" aria-hidden="true">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="audit-comparison-divider" aria-hidden="true">
              <span>→</span>
            </div>

            <div className="audit-comparison-col audit-comparison-after">
              <div className="audit-comp-header audit-comp-after-header">
                <span>After SmartBuilds</span>
              </div>
              <ul className="audit-comp-list">
                {[
                  "Every lead enters one tracked pipeline",
                  "Agent ownership is clear and assigned",
                  "Follow-ups and overdue leads are always visible",
                  "Site visits tracked from enquiry to visit",
                  "Sources compared by actual site visits, not just enquiries",
                  "Owner gets a daily report — no need to ask",
                ].map((item) => (
                  <li className="audit-comp-item audit-comp-item-after" key={item}>
                    <span className="audit-comp-icon" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10-Minute Audit Process ──────────────────────────────── */}
      <section className="audit-section audit-process-section">
        <div className="audit-container">
          <p className="audit-section-eyebrow">The Process</p>
          <h2 className="audit-section-title">
            What Happens In The 10-Minute Audit?
          </h2>

          <div className="audit-steps-grid">
            {[
              { num: "01", title: "We review your visible lead entry points", desc: "Instagram, WhatsApp, website, portal, ad forms — we map what you already have." },
              { num: "02", title: "We map how enquiries currently enter your team", desc: "Where does a new enquiry land? Who sees it first? How is it assigned?" },
              { num: "03", title: "We identify possible leakage points", desc: "We show you where leads are most likely disappearing before a site visit." },
              { num: "04", title: "We show what a tracked system would look like", desc: "A live preview of how your lead flow would look with proper tracking." },
              { num: "05", title: "You decide if it is worth fixing", desc: "No pressure. If it makes sense, we discuss next steps. If not, you leave with clarity." },
            ].map((step, i) => (
              <div className="audit-step" key={step.num}>
                <div className="audit-step-num-row">
                  <span className="audit-step-num">{step.num}</span>
                  {i < 4 && <div className="audit-step-connector" aria-hidden="true" />}
                </div>
                <h3 className="audit-step-title">{step.title}</h3>
                <p className="audit-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="audit-process-note">
            <p>
              <strong>No pressure. No long pitch.</strong> Just a clear view of where leads may be
              leaking before site visits.
            </p>
          </div>
        </div>
      </section>

      {/* ── Who This Is For ─────────────────────────────────────── */}
      <section className="audit-section audit-qualify-section">
        <div className="audit-container">
          <h2 className="audit-section-title audit-title-center">
            Is This Audit for You?
          </h2>

          <div className="audit-qualify-grid">
            <div className="audit-qualify-col">
              <div className="audit-qualify-header audit-qualify-for">
                <span className="audit-qualify-icon" aria-hidden="true">✓</span>
                <span>This audit is for:</span>
              </div>
              <ul className="audit-qualify-list">
                {[
                  "Builders running Meta or Instagram ads",
                  "Real estate teams using WhatsApp for enquiries",
                  "Channel partners handling multiple projects",
                  "Brokers managing multiple agents",
                  "Teams receiving leads from property portals",
                  "Owners who want daily visibility over the pipeline",
                  "Sales heads managing follow-ups and site visits",
                ].map((item) => (
                  <li className="audit-qualify-item" key={item}>
                    <span className="audit-qualify-dot" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="audit-qualify-col">
              <div className="audit-qualify-header audit-qualify-not">
                <span className="audit-qualify-icon audit-qualify-icon-no" aria-hidden="true">✕</span>
                <span>Probably not for:</span>
              </div>
              <ul className="audit-qualify-list">
                {[
                  "Solo agents with very low enquiry volume",
                  "People not currently generating leads from ads or portals",
                  "Teams not ready to improve follow-up discipline",
                  "Those looking for a CRM without changing existing habits",
                ].map((item) => (
                  <li className="audit-qualify-item audit-qualify-item-no" key={item}>
                    <span className="audit-qualify-dot audit-qualify-dot-no" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── System Preview / Proof ──────────────────────────────── */}
      <section className="audit-section audit-proof-section">
        <div className="audit-container">
          <p className="audit-section-eyebrow">System Preview</p>
          <h2 className="audit-section-title">
            What SmartBuilds Looks Like When It&apos;s Running
          </h2>
          <p className="audit-section-desc">
            Built for real estate teams where WhatsApp, ads, calls, and site visits
            need to be tracked in one place.
          </p>

          <div className="audit-proof-grid">
            <div className="audit-proof-card">
              <div className="audit-proof-mock audit-proof-pipeline">
                <div className="audit-proof-label">Lead Pipeline</div>
                <div className="audit-proof-pipeline-stages">
                  {["New", "Contacted", "Qualified", "Visit Booked", "Visited", "Lost"].map((stage) => (
                    <div className="audit-proof-stage" key={stage}>
                      <span className="audit-proof-stage-name">{stage}</span>
                      <span className="audit-proof-stage-count">{[18, 12, 9, 6, 8, 4][["New", "Contacted", "Qualified", "Visit Booked", "Visited", "Lost"].indexOf(stage)]}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="audit-proof-caption">Every enquiry moves through tracked stages</p>
            </div>

            <div className="audit-proof-card">
              <div className="audit-proof-mock audit-proof-followup">
                <div className="audit-proof-label">Follow-Up Dashboard</div>
                {[
                  { lead: "Kavita Nair", agent: "Rahul", due: "Today", priority: "high" },
                  { lead: "Mohit Shah", agent: "Neha", due: "Today", priority: "medium" },
                  { lead: "Lakshmi Iyer", agent: "Rahul", due: "Tomorrow", priority: "low" },
                  { lead: "Aditya Bose", agent: "Vikas", due: "Overdue 2d", priority: "urgent" },
                ].map((row) => (
                  <div className="audit-proof-followup-row" key={row.lead}>
                    <span className={`audit-proof-priority audit-proof-priority-${row.priority}`} />
                    <span className="audit-proof-followup-lead">{row.lead}</span>
                    <span className="audit-proof-followup-agent">{row.agent}</span>
                    <span className={`audit-proof-followup-due audit-proof-followup-due-${row.priority}`}>{row.due}</span>
                  </div>
                ))}
              </div>
              <p className="audit-proof-caption">Follow-ups visible by agent and priority</p>
            </div>

            <div className="audit-proof-card">
              <div className="audit-proof-mock audit-proof-source">
                <div className="audit-proof-label">Source → Site Visit Report</div>
                {sourceBreakdown.map((row) => (
                  <div className="audit-proof-source-row" key={row.source}>
                    <span className="audit-proof-source-name">{row.source}</span>
                    <span className="audit-proof-source-enq">{row.enquiries} enquiries</span>
                    <span className="audit-proof-source-visit">{row.siteVisits} visits</span>
                    <span className="audit-proof-source-ratio">{row.ratio}</span>
                  </div>
                ))}
              </div>
              <p className="audit-proof-caption">Know which source actually produces site visits</p>
            </div>

            <div className="audit-proof-card">
              <div className="audit-proof-mock audit-proof-owner">
                <div className="audit-proof-label">Owner Daily Report</div>
                <div className="audit-proof-owner-stats">
                  {ownerReportItems.map((item) => (
                    <div className="audit-proof-owner-stat" key={item.label}>
                      <span className="audit-proof-owner-val">{item.value}</span>
                      <span className="audit-proof-owner-lbl">{item.label}</span>
                    </div>
                  ))}
                </div>
                <div className="audit-proof-owner-note">
                  Sent every morning at 9:00 AM
                </div>
              </div>
              <p className="audit-proof-caption">Owner sees the full picture — every morning</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────── */}
      <section className="audit-section audit-cta-section" id="book-audit">
        <div className="audit-container">
          <div className="audit-final-cta">
            <span className="smart-badge">Free 10-Minute Audit</span>
            <h2 className="audit-cta-title">
              Want to See Where Your Leads May Be Leaking?
            </h2>
            <p className="audit-cta-desc">
              Book a 10-minute audit. We&apos;ll show you whether your enquiry flow is properly
              tracked from source to site visit.
            </p>
            <a href="https://cal.com" className="smart-button smart-button-primary audit-cta-btn" target="_blank" rel="noopener noreferrer">
              Book My Audit
            </a>
            <p className="audit-cta-footnote">
              Best for teams already getting enquiries from ads, Instagram, WhatsApp,
              portals, Google, or website forms.
            </p>
          </div>
        </div>
      </section>

      {/* ── Sticky Mobile CTA ───────────────────────────────────── */}
      <div className="audit-sticky-cta">
        <a href="#book-audit" className="smart-button smart-button-primary audit-sticky-btn">
          Book 10-Minute Audit →
        </a>
      </div>
    </div>
  );
}
