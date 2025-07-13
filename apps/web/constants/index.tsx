import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";

export const navItems = [
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
];

export const features = [
  {
    icon: <BotMessageSquare />,
    text: "AI-Powered Assistance",
    description:
      "Get intelligent content suggestions, auto-completion, and smart summarization powered by advanced AI technology.",
  },
  {
    icon: <Fingerprint />,
    text: "Rich Text Editor",
    description:
      "Create beautiful, structured notes with Tiptap's powerful rich-text editor supporting markdown, embeds, and mentions.",
  },
  {
    icon: <ShieldHalf />,
    text: "Conflict-Free Collaboration",
    description:
      "Work simultaneously with your team using Hocuspocus for seamless real-time editing without conflicts.",
  },
  {
    icon: <BatteryCharging />,
    text: "Real-Time Synchronization",
    description:
      "See changes instantly as your team collaborates, with automatic saving and sync across all devices.",
  },
  {
    icon: <PlugZap />,
    text: "Seamless Export Options",
    description:
      "Export your collaborative notes to PDF or Markdown format for easy sharing and archival.",
  },
  {
    icon: <GlobeLock />,
    text: "Secure & Responsive",
    description:
      "Built with modern React and Next.js for a fast, secure, and responsive experience across all devices.",
  },
];

export const checklistItems = [
  {
    title: "Real-time Collaborative Editing",
    description:
      "Edit notes simultaneously with your team using Tiptap's rich-text editor and Hocuspocus for seamless conflict resolution.",
  },
  {
    title: "AI-Powered Content Enhancement",
    description:
      "Leverage Gemini API for intelligent summarization, content suggestions, and automated note enhancement (coming soon).",
  },
  {
    title: "Rich Content Support",
    description:
      "Create dynamic notes with markdown, embeds, mentions, and rich formatting to capture ideas exactly as you envision them.",
  },
  {
    title: "Export & Share Effortlessly",
    description:
      "Export your collaborative notes to PDF or Markdown format and share your work with anyone, anywhere.",
  },
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