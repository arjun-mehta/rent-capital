import { useEffect } from "react";

export function useScrollToElement() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToElement = (
    elementId: string,
    options: ScrollIntoViewOptions = {}
  ) => {
    const element = document.getElementById(elementId);

    if (element) {
      element.scrollIntoView({
        ...options,
        behavior: "smooth",
      });
    }
  };

  return { scrollToTop, scrollToElement };
}
