import type { HTMLAttributes } from "react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useScrollToElement } from "./scroll";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

const items: Array<{ href: string; label: string; isRoute?: boolean }> = [
  { href: "#how", label: "How It Works" },
  { href: "#qualification", label: "Benefits" },
  { href: "#faq", label: "FAQ" },
];

export function Navigation() {
  const { scrollToElement, scrollToTop } = useScrollToElement();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHeader, setIsPastHeader] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine if we're on the property managers page
  const isPropertyManager = location.pathname === "/for-property-managers";

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      setIsScrolled(scrollY > 0);
      // Check if scrolled past the header image section (approximately viewport height)
      // Using a slightly lower threshold for smoother transition
      setIsPastHeader(scrollY > viewportHeight * 0.7);
    };

    window.addEventListener("scroll", handleScroll);
    // Check on mount
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = isPastHeader ? "text-foreground" : "text-white";
  const navBg = isPastHeader 
    ? "bg-background/95 backdrop-blur-md" 
    : isScrolled 
    ? "bg-white/10 backdrop-blur-md" 
    : "bg-transparent";

  return (
    <nav className={`w-full py-4 sticky top-0 z-50 transition-all duration-300 ease-in-out ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative grid lg:grid-cols-[1.6fr_1fr] gap-8 lg:gap-12 items-center w-full">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              onClick={scrollToTop}
              className="h-[37px] flex items-center py-2"
            >
              <Logo className={`h-8 transition-colors duration-300 ease-in-out ${textColor}`} />
            </Link>
          </div>

          {/* Right side - Nav links and Sign In */}
          <div className="flex items-center justify-end gap-4">
            {/* Center nav links */}
            <div className={`hidden lg:flex items-center gap-4 text-sm transition-colors duration-300 ease-in-out ${textColor} flex-1 justify-center`}>
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
                  className="h-[37px] flex items-center justify-center px-4 py-2 whitespace-nowrap transition-colors duration-300 ease-in-out"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Sign In */}
            <Link
              to="/signin"
              className={`h-[37px] flex font-semibold items-center justify-center px-4 py-2 rounded-full transition-all duration-300 ease-in-out whitespace-nowrap ${
                isPastHeader
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground border border-primary"
                  : "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
              }`}
            >
              Sign In
            </Link>
          </div>

          {/* Center - Role Switcher (absolutely positioned) */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
              <ToggleGroup
                type="single"
                value={isPropertyManager ? "property-manager" : "landlord"}
                onValueChange={(value) => {
                  if (value === "property-manager") {
                    scrollToTop();
                    navigate("/for-property-managers");
                  } else if (value === "landlord") {
                    scrollToTop();
                    navigate("/");
                  }
                }}
              className={cn(
                "rounded-full p-1 transition-all duration-300 ease-in-out",
                isPastHeader
                  ? "bg-muted border border-border"
                  : "bg-white/10 backdrop-blur-md border border-white/20"
              )}
            >
              <ToggleGroupItem
                value="landlord"
                aria-label="Landlord"
                className={cn(
                  "h-[37px] px-4 py-2 text-sm font-semibold transition-all duration-300 ease-in-out rounded-full whitespace-nowrap",
                  isPropertyManager
                    ? isPastHeader
                      ? "text-muted-foreground hover:bg-primary/90 hover:text-primary-foreground border border-transparent hover:border-primary"
                      : "text-white/70 hover:bg-white/20 hover:text-white border border-transparent hover:border-white/20"
                    : isPastHeader
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground border border-primary"
                    : "bg-white/20 text-white border border-white/20 hover:bg-white/30"
                )}
              >
                Landlord
              </ToggleGroupItem>
              <ToggleGroupItem
                value="property-manager"
                aria-label="Property Manager"
                className={cn(
                  "h-[37px] px-4 py-2 text-sm font-semibold transition-all duration-300 ease-in-out rounded-full whitespace-nowrap",
                  isPropertyManager
                    ? isPastHeader
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground border border-primary"
                      : "bg-white/20 text-white border border-white/20 hover:bg-white/30"
                    : isPastHeader
                    ? "text-muted-foreground hover:bg-primary/90 hover:text-primary-foreground border border-transparent hover:border-primary"
                    : "text-white/70 hover:bg-white/20 hover:text-white border border-transparent hover:border-white/20"
                )}
              >
                Property Manager
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function Logo({
  align = "center",
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { align?: "left" | "center" }) {
  return (
    <div
      className={`font-emilio font-black text-2xl text-foreground ${className || ""}`}
      {...props}
    >
      Rent Capital
    </div>
  );
}
