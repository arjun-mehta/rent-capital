import { Header } from "./header";
import { How } from "./how";
import { Navigation } from "./navigation";
import { Qualification } from "./qualification";

export function HomePage() {
  return (
    <>
      <Navigation />
      <Header />
      <How />
      <Qualification />
    </>
  );
}
