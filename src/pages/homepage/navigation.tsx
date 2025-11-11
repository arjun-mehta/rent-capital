import type { SVGProps } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useScrollToElement } from "./scroll";

const items: Array<{ href: string; label: string; isRoute?: boolean }> = [
  { href: "/for-property-managers", label: "For Property Managers", isRoute: true },
  { href: "#how", label: "How It Works" },
  { href: "#qualification", label: "Qualification" },
  { href: "#faq", label: "FAQ" },
];

export function Navigation() {
  const { scrollToElement, scrollToTop } = useScrollToElement();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`w-full py-4 sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/10 backdrop-blur-md" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8 lg:gap-12 items-center w-full">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              onClick={scrollToTop}
              className="h-[37px] flex items-center py-2"
            >
              <Logo className="h-8" />
            </Link>
          </div>

          {/* Right side - Nav links and Sign In */}
          <div className="flex items-center justify-end gap-4">
            {/* Center nav links */}
            <div className="hidden lg:flex items-center gap-4 text-sm text-muted-foreground flex-1 justify-center">
              {items.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={(e) => {
                    if (!item.isRoute) {
                      e.preventDefault();
                      scrollToElement(item.href.replace("#", ""), {
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                  className="h-[37px] flex items-center justify-center px-4 py-2 whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Sign In */}
            <Link
              to="/signin"
              className="h-[37px] flex font-semibold items-center justify-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-foreground hover:bg-white/20 transition-all whitespace-nowrap"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function Logo({
  align = "center",
  ...props
}: SVGProps<SVGSVGElement> & { align?: "left" | "center" }) {
  const isLeftAligned = align === "left";
  
  return (
    <svg
      viewBox="0 0 160 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <text
        x={isLeftAligned ? "0" : "80"}
        y="24"
        fill="currentColor"
        fontSize="22"
        fontWeight="700"
        fontFamily="Georgia, serif"
        letterSpacing="-0.5"
        textAnchor={isLeftAligned ? "start" : "middle"}
      >
        Rent Capital
      </text>
    </svg>
  );
}
