import type { HTMLAttributes } from "react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useScrollToElement } from "./scroll";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const items: Array<{ href: string; label: string; isRoute?: boolean }> = [
  { href: "#how", label: "How It Works" },
  { href: "#qualification", label: "Benefits" },
  { href: "#faq", label: "FAQ" },
];

export function Navigation() {
  const { scrollToElement, scrollToTop } = useScrollToElement();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHeader, setIsPastHeader] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        <div className="relative flex lg:grid lg:grid-cols-[1.6fr_1fr] justify-between lg:justify-start gap-8 lg:gap-12 items-center w-full">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              onClick={scrollToTop}
              className="h-[37px] flex items-center py-2"
            >
              <Logo className={cn("h-8 transition-colors duration-300 ease-in-out", isMenuOpen ? "!text-foreground" : textColor)} />
            </Link>
          </div>

          {/* Right side - Nav links and Sign In */}
          <div className="flex items-center justify-end gap-4">
            {/* Center nav links - Desktop only */}
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

            {/* Sign In - Desktop only */}
            <Link
              to="/signin"
              className={`hidden lg:flex h-[37px] font-semibold items-center justify-center px-4 py-2 rounded-full transition-all duration-300 ease-in-out whitespace-nowrap ${
                isPastHeader
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground border border-primary"
                  : "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
              }`}
            >
              Sign In
            </Link>

            {/* Hamburger Menu Button - Mobile only */}
            <button
              className="lg:hidden p-2 focus:outline-none relative z-[70]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <X className={`h-6 w-6 text-foreground`} />
              ) : (
                <Menu className={`h-6 w-6 ${textColor}`} />
              )}
            </button>
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

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 bg-background/95 backdrop-blur-md z-[60] transition-all duration-300 ease-in-out",
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <div className="flex flex-col h-full pt-20 px-4">
          {/* Mobile Role Switcher - At the top */}
          <div className="mb-8">
            <ToggleGroup
              type="single"
              value={isPropertyManager ? "property-manager" : "landlord"}
              onValueChange={(value) => {
                setIsMenuOpen(false);
                if (value === "property-manager") {
                  scrollToTop();
                  navigate("/for-property-managers");
                } else if (value === "landlord") {
                  scrollToTop();
                  navigate("/");
                }
              }}
              className="rounded-full p-1 bg-muted border border-border w-full"
            >
              <ToggleGroupItem
                value="landlord"
                aria-label="Landlord"
                className={cn(
                  "flex-1 h-12 px-4 py-2 text-sm font-semibold transition-all duration-300 ease-in-out rounded-full",
                  isPropertyManager
                    ? "text-muted-foreground hover:bg-primary/90 hover:text-primary-foreground border border-transparent hover:border-primary"
                    : "bg-primary hover:bg-primary/90 text-primary-foreground border border-primary"
                )}
              >
                Landlord
              </ToggleGroupItem>
              <ToggleGroupItem
                value="property-manager"
                aria-label="Property Manager"
                className={cn(
                  "flex-1 h-12 px-4 py-2 text-sm font-semibold transition-all duration-300 ease-in-out rounded-full",
                  isPropertyManager
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground border border-primary"
                    : "text-muted-foreground hover:bg-primary/90 hover:text-primary-foreground border border-transparent hover:border-primary"
                )}
              >
                Property Manager
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex flex-col space-y-6">
            {items.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={(e) => {
                  setIsMenuOpen(false);
                  if (!item.isRoute) {
                    e.preventDefault();
                    scrollToElement(item.href.replace("#", ""), {
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
                className="text-xl font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
            {/* Mobile Sign In Link */}
            <Link
              to="/signin"
              onClick={() => setIsMenuOpen(false)}
              className="text-xl font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Sign In
            </Link>
          </nav>
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
      className={cn("font-emilio font-black text-2xl text-foreground", className)}
      {...props}
    >
      Rent Capital
    </div>
  );
}
