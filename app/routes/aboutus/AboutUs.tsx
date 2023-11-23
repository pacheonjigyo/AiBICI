import { useObserver } from "mobx-react";
import { usePageEffect } from "../../core/page.js";
import { Contact } from "./components/index.js";

export default function AboutUs(): JSX.Element {
  usePageEffect({ title: "ABOUT" });

  return useObserver(() => (
    <>
      {/* <Intro /> */}
      {/* <Mission /> */}
      <Contact />
    </>
  ));
}
