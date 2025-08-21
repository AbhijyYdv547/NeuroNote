import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";

export const navItems = [
  { label: "About", href: "#hero" },
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Testimonials", href: "#testimonials" },
];

export const features = [
  {
    icon: <BotMessageSquare />,
    text: "Collaborative Text Editing",
    description:
      "Edit documents together in real-time using Tiptap and Hocuspocus, ensuring smooth, conflict-free teamwork.",
  },
  {
    icon: <Fingerprint />,
    text: "Team Chat Integration",
    description:
      "Communicate with your team right inside NeuroNote with built-in chat for seamless discussions and decisions.",
  },
  {
    icon: <ShieldHalf />,
    text: "Secure Authentication",
    description:
      "Your work is safe with cookie-based authentication and role-based access, built for privacy and security.",
  },
  {
    icon: <BatteryCharging />,
    text: "Real-Time Synchronization",
    description:
      "Instant updates across text, chat, and rooms so everyone stays on the same page, literally.",
  },
  {
    icon: <PlugZap />,
    text: "Room-Based Collaboration",
    description:
      "Create or join rooms to organize your team’s notes, conversations, and documents in one place.",
  },
  {
    icon: <GlobeLock />,
    text: "Future-Ready Features",
    description:
      "Planned support for video calls, integrations, and advanced analytics to make teamwork even more powerful.",
  },
];


export const workflowHighlights = [
  {
    label: "Sync Latency",
    description: "Real-time collaboration with near-instant updates across devices."
  },
  {
    label: "Data Integrity",
    description: "Conflict resolution powered by Hocuspocus ensures no data loss."
  },
  {
    label: "Security",
    description: "Your notes are encrypted in transit and at rest for maximum safety."
  },
  {
    label: "Device Support",
    description: "Collaborate seamlessly on web, tablet, and mobile devices."
  }
];


export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "User Guide" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Support" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Collaboration Tools" },
  { href: "#", text: "AI Integration" },
  { href: "#", text: "Export Options" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Webinars" },
  { href: "#", text: "Beta Testing" },
  { href: "#", text: "Feedback" },
];