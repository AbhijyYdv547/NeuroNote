"use client";

import {
    resourcesLinks,
    platformLinks,
    communityLinks,
} from "../../constants/index";

const Footer = () => {
    return (
        <footer className="border-t border-border py-16 bg-background text-foreground px-6 sm:px-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 max-w-7xl mx-auto">
                <div>
                    <h4 className="text-sm font-semibold mb-4">Resources</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        {resourcesLinks.map((link, i) => (
                            <li key={i}>
                                <a className="hover:text-foreground transition" href={link.href}>
                                    {link.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="text-sm font-semibold mb-4">Platform</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        {platformLinks.map((link, i) => (
                            <li key={i}>
                                <a className="hover:text-foreground transition" href={link.href}>
                                    {link.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="text-sm font-semibold mb-4">Community</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        {communityLinks.map((link, i) => (
                            <li key={i}>
                                <a className="hover:text-foreground transition" href={link.href}>
                                    {link.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="mt-10 text-center text-xs text-muted-foreground">
                © {new Date().getFullYear()} NeuroNote — All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
