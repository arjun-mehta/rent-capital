import { ArrowRightIcon } from "lucide-react";
import type { SVGProps } from "react";
import { Link } from "react-router-dom";
import { useScrollToElement } from "./scroll";

const items = [
  { href: "#how", label: "How it works" },
  { href: "#qualification", label: "Qualification" },
  { href: "#faq", label: "FAQ" },
];

export function Navigation() {
  const { scrollToElement, scrollToTop } = useScrollToElement();

  return (
    <nav className="w-full py-4 px-4 sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
      <ul className="flex w-full justify-between md:justify-start md:max-w-fit mx-auto items-center gap-4 text-sm text-muted-foreground">
        <li>
          <Link
            to="/"
            onClick={scrollToTop}
            className="h-[37px] flex items-center justify-center md:px-4 py-2"
          >
            <Logo className="h-8" />
          </Link>
        </li>
        {items.map((item) => (
          <li className="hidden md:block" key={item.href}>
            <Link
              to={item.href}
              onClick={(e) =>
                scrollToElement(item.href.replace("#", ""), {
                  behavior: "smooth",
                  block: "start",
                })
              }
              className="h-[37px] flex items-center justify-center px-4 py-2"
            >
              {item.label}
            </Link>
          </li>
        ))}

        <li className="ml-8">
          <Link
            to="/signin"
            className="h-[37px] flex font-semibold items-center bg-foreground text-primary rounded-full justify-center px-4 py-2"
          >
            Apply Now{" "}
            <ArrowRightIcon className="size-4 ml-1" strokeWidth={2.5} />
          </Link>
        </li>
      </ul>
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
        fontFamily="Poppins, sans-serif"
        letterSpacing="-0.5"
        textAnchor={isLeftAligned ? "start" : "middle"}
      >
        Rent Capital
      </text>
    </svg>
  );
}
