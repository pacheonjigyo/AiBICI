import * as React from "react";

import { useObserver } from "mobx-react";
import { usePageEffect } from "../../core/page.js";
import Footer from "../../layout/components/Footer.js";

import { Page } from "./components/index.js";

import "./index.css";

export default function Work(): JSX.Element {
  usePageEffect({ title: "아비치" });

  React.useEffect(() => {
    const images = document.getElementsByClassName("fadeIn");

    if (images.length === 0) {
      return;
    }

    const myObserver = new IntersectionObserver(
      (entries: any, observer: any) => {
        entries.forEach((entry: any) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fadeInAnimationShort");
          }
        });
      },
      {},
    );

    for (let i = 0; i < images.length; i++) {
      myObserver.observe(images[i]);
    }
  }, []);

  return useObserver(() => (
    <>
      <Page />

      <Footer />
    </>
  ));
}
