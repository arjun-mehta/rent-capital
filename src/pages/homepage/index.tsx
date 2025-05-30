import { Estimate } from "./estimate";
import { Footer } from "./footer";
import { Header } from "./header";
import { How } from "./how";
import { Navigation } from "./navigation";
import { Qualification } from "./qualification";
import { Questions } from "./questions";

export function HomePage() {
  return (
    <>
      <Navigation />
      <Header />
      <Estimate />
      <How />
      <Qualification />
      <Questions />
      <Footer />
    </>
  );
}
