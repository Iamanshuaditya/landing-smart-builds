import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SmartBuilds — Real Estate Lead Leakage Audit",
  description:
    "We audit your Instagram, WhatsApp, website, portal, and ad enquiry flow to find where leads may be getting lost before site visits.",
};

export default function AuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}