import React from "react";
import { Logo } from "./navigation";
import { AnimationChild, AnimationParent } from "./animations";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Platform",
      links: [
        { label: "How It Works", href: "#how-it-works" },
        { label: "Who We Help", href: "#who-we-help" },
        { label: "Why Rent Capital", href: "#why-us" },
        { label: "Pricing", href: "#pricing" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
      ],
    },
  ];

  return (
    <footer className="pb-8 w-full max-w-[1080px] mx-auto px-4">
      <div className="border-t border-border pt-16">
        <AnimationParent className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-16">
          <AnimationChild className="md:col-span-2">
            <div className="mb-6">
              <Logo className="h-8" align="left" />
            </div>
            <p className="text-muted-foreground mb-4 max-w-xs">
              Providing landlords with the financial tools they need to grow
              their portfolio and unlock capital from their rental income.
            </p>
          </AnimationChild>

          {sections.map((section, index) => (
            <AnimationChild key={index} className="md:col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-foreground">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </AnimationChild>
          ))}
        </AnimationParent>

        <div className="border-t border-border pt-8 flex text-sm flex-col md:flex-row justify-between items-center">
          <div className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {currentYear}{" "}
            <span className="font-poppins font-semibold">Rent Capital</span>. All
            rights reserved.
          </div>

          <div className="flex space-x-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
