import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";


 export const navItems = [
        {
            name: "Features",
            link: "#features",
        },
        {
            name: "Workflow",
            link: "#workflow",
        },
        {
            name: "Demo",
            link: "#demo",
        },
        {
            name: "FAQs",
            link: "#faqs",
        },
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

export const faqItems = [
  {
    label: "What is NeuroNote?",
    description: "NeuroNote is a collaborative note-taking platform that combines real-time editing with AI assistance to help teams stay aligned and productive."
  },
  {
    label: "Do I need an account to use NeuroNote?",
    description: "Yes, creating an account lets you securely join rooms, collaborate with your team, and save your notes in one place."
  },
  {
    label: "Can I use NeuroNote on mobile devices?",
    description: "Absolutely! NeuroNote works seamlessly on desktop, tablet, and mobile browsers with full feature support."
  },
  {
    label: "Is my data secure?",
    description: "All data is encrypted in transit and at rest, and we use industry-standard practices to ensure your notes remain private and secure."
  },
  {
    label: "Does NeuroNote support AI-powered features?",
    description: "Yes! NeuroNote includes AI-powered summarization and grammar suggestions to help you create clear and concise notes effortlessly."
  }

];


